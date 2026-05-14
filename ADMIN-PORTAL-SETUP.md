# Admin Portal — Setup Guide

Everything you need to do to turn on the admin portal.

---

## 0. What's been built (already in the repo)

- `/api/leads` — public POST endpoint that saves form submissions to the DB and emails the concierge inbox.
- `/admin/login` — magic-link sign-in page.
- `/admin` — dashboard, leads list, lead detail (with timeline + status changer + add-note), SOPs library, SOP detail, team page.
- Middleware that bounces unauthenticated `/admin` requests to `/admin/login`.
- Public contact form (`/contact`) now POSTs to `/api/leads` instead of opening `mailto:`.

## 1. One-time Supabase setup (10 minutes)

Your project ID is `ahlejuecgdwrmfexcamz`.

### 1a. Run the SQL migrations
1. Open the SQL editor: https://supabase.com/dashboard/project/ahlejuecgdwrmfexcamz/sql/new
2. Paste the entire contents of `supabase/migrations/0001_init.sql`. Click **Run**. You should see no errors.
3. Paste the entire contents of `supabase/migrations/0002_seed_sops.sql`. Click **Run**. This creates ~20 pre-populated SOPs covering reservations, front desk, housekeeping, F&B, kitchen, spa, events, experiences, maintenance, security, finance, HR, and general.

### 1b. Configure auth
1. Go to **Authentication → Providers → Email**: enable Email provider, enable **Magic link**.
2. Go to **Authentication → URL configuration**:
   - Site URL: `https://admin.giovannivillage.com` (once DNS is set up — for local dev use `http://localhost:3000`)
   - Redirect URLs: add `https://admin.giovannivillage.com/admin/auth/callback` and `http://localhost:3000/admin/auth/callback`
3. Go to **Authentication → Email templates → Magic link**: customize subject to "Sign in to Giovanni Admin" and the body if you like.

### 1c. Get your API keys
1. Go to **Project Settings → API**.
2. Copy:
   - `Project URL` (e.g. `https://ahlejuecgdwrmfexcamz.supabase.co`)
   - `anon` `public` key (long string starting with `eyJ…`)
   - `service_role` `secret` key (long string starting with `eyJ…`) — **never expose this in client code**

---

## 2. Local environment

Create `.env.local` in the project root:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://ahlejuecgdwrmfexcamz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Resend (email notifications to concierge)
RESEND_API_KEY=re_...
LEAD_NOTIFY_TO=reservations@giovannivillage.com
LEAD_NOTIFY_FROM=Giovanni Website <noreply@giovannivillage.com>
```

To get a Resend API key: sign up at https://resend.com (free 3,000 emails/month), verify the `giovannivillage.com` domain, then copy the API key from the Resend dashboard.

If you don't want email yet, omit `RESEND_API_KEY` — leads still save to the database, and the concierge can check `/admin/leads`.

Restart the dev server (`npm run dev`) after adding the env file.

---

## 3. First sign-in

1. Make sure your `.env.local` is set and the dev server is running.
2. Visit http://localhost:3000/admin (will redirect to `/admin/login`).
3. Enter `giovannixfmwebdev@gmail.com` (the bootstrap admin email).
4. Check inbox — click the magic link.
5. You land on the dashboard. The schema's trigger automatically created you with role `admin`.

---

## 4. Invite the team

For each team member:
1. Have them visit `/admin/login` with their work email.
2. They'll be created as `staff` automatically (the trigger).
3. To promote someone (e.g. concierge or planner), run in Supabase SQL editor:
   ```sql
   update public.users set role = 'concierge' where email = 'priya@giovannivillage.com';
   ```
   Valid roles: `admin`, `concierge`, `planner`, `staff`. Permission matrix in `DESIGN-SYSTEM.md`-adjacent — see `supabase/migrations/0001_init.sql` RLS policies.

(A team-management UI for role changes is Phase 1.5 — for now SQL.)

---

## 5. Production deploy

### 5a. Vercel
1. The site is already on Vercel (assuming current deploy).
2. Add the env vars from §2 in **Project Settings → Environment Variables**. Tick all three environments (Production / Preview / Development).
3. Redeploy.

### 5b. Subdomain DNS

For `admin.giovannivillage.com`:

1. In Vercel, go to your project → **Settings → Domains → Add Domain** → enter `admin.giovannivillage.com`.
2. Vercel will show you a CNAME target. Copy it (looks like `cname.vercel-dns.com`).
3. In your domain provider's DNS panel, add a record:
   - Type: `CNAME`
   - Name: `admin`
   - Value: (the CNAME from Vercel)
   - TTL: `Auto` or `3600`
4. Wait 5-15 minutes for DNS propagation. Vercel auto-issues an SSL cert.

Once `admin.giovannivillage.com` resolves, **update the Supabase redirect URLs** (§1b step 2) to include the new domain.

---

## 6. Test the lead flow

1. With Resend configured and a verified domain, go to https://giovannivillage.com/contact (or `localhost:3000/contact`).
2. Fill the form, submit.
3. Check:
   - The concierge inbox should have a "New other lead — [name]" email
   - `/admin/leads` should show the new lead at the top with status `new`
4. Click into the lead → change status → add a note → confirm both appear in the timeline.

---

## 8. Google Sheet sync (Phase 1.5 — built, needs GCP setup)

The admin mirrors the **Banquet & Room Enquiry** sheet (5 lead tabs) every 30 minutes.

### 8a. Apply migration

In the Supabase SQL editor, run `supabase/migrations/0003_sheet_sync.sql`:
- Adds enum values (`experience`, `ai_chatbot`, `phone_302`, `sheet_manual`)
- Adds external-tracking columns on `leads`
- Creates `sync_runs` table

### 8b. Create a Google Cloud service account (10 min)

1. Open https://console.cloud.google.com/ — create a project named **giovanni-admin** (or use an existing one).
2. In the project, go to **APIs & Services → Library** → search **Google Sheets API** → click **Enable**.
3. Go to **APIs & Services → Credentials → + Create Credentials → Service Account**.
   - Name: `giovanni-sheet-reader`
   - Role: leave blank (no project roles needed for Sheets API)
   - Click **Done**.
4. Click into the new service account → **Keys** tab → **Add Key → Create New Key → JSON**. A JSON file downloads.
5. **Copy the `client_email`** from the JSON (looks like `giovanni-sheet-reader@…iam.gserviceaccount.com`).
6. Open the live Google Sheet → **Share** → paste the `client_email` → set permission to **Viewer** → Send.

### 8c. Add the key to env

Take the downloaded JSON, convert to single-line, and add to `.env.local`:

```bash
GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...","client_email":"...","client_id":"..."}'
```

The whole JSON object goes on one line, wrapped in single quotes. Newlines in the `private_key` must stay as `\n` literals (don't unescape them).

Restart `npm run dev`.

### 8d. Vercel Cron secret

Add to Vercel project settings → Environment Variables:
```
CRON_SECRET=<some random string, e.g. `openssl rand -hex 32` output>
```
Also add to `.env.local` for local testing.

### 8e. Test the sync

1. Visit http://localhost:3000/admin/integrations/sheets
2. The page should show **Status: Connected** with the service-account email
3. Click **Sync now**
4. Within ~30 seconds you should see a green "success" row in the **Recent sync runs** table, with counts like `+2,847 inserted, 0 updated, 0 skipped`
5. Visit `/admin/leads` — the table should now have thousands of rows

### 8f. Production cron

Once deployed to Vercel, the cron in `vercel.json` runs automatically every 30 minutes. Production Vercel injects the `CRON_SECRET` automatically based on the env var; the `/api/sync/sheets` endpoint validates it.

## 9. Phase 2 backlog (not built yet)

- UI for role/assignment changes (currently SQL)
- Bulk actions (mass-assign, mass-archive)
- SOP editor (currently read-only; admins edit via SQL or Supabase Table Editor)
- WhatsApp Business notifications
- Banquet calendar with date-conflict detection
- F&B reservations module
- Housekeeping room-status board (integrates with IPMS PMS)
- Multi-property switcher (Giovanni House, Giovanni Suites)
- Financial dashboard

---

## Troubleshooting

**Magic link arrives but clicking it does nothing**
→ The redirect URL isn't whitelisted. Add it in Supabase Authentication → URL configuration.

**`/admin` shows "Setup required" notice**
→ `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` missing in `.env.local`.

**Contact form returns 500**
→ Check the dev server logs. Usually `SUPABASE_SERVICE_ROLE_KEY` is missing, or the `leads` table doesn't exist (run migration 0001).

**SOPs page is empty**
→ Run migration 0002.

**No email arrives on form submit**
→ Either `RESEND_API_KEY` is missing, or the domain isn't verified in Resend. The lead still saves to the DB; check `/admin/leads`.
