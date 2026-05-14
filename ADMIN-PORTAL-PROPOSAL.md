# Admin Portal — Proposal & Phase 1 Plan

A backend portal for the Giovanni team to handle leads, run SOPs, and (later) plug into banquet management, housekeeping, restaurant reservations, etc.

This document is the recommendation for **Phase 1**. It's deliberately small. We ship the lead inbox + SOP library first, then bolt on the operational tools when each one has a clear owner.

---

## 1. Recommendation in one paragraph

**Build the admin as `/admin/*` routes inside this same Next.js project.** Use **Supabase** for the database, auth (magic-link email), and storage. Use **shadcn/ui** for the admin look-and-feel (kept deliberately utilitarian, opposite of the public site — dense, fast, no animation theatre). Public forms hit a `/api/leads` route that writes straight into the `leads` table. Team members log in at `/admin` and work from there.

That's the whole architecture. One repo, one deploy, one bill, full type sharing between public site and admin.

---

## 2. Why this approach (vs the alternatives)

| Option | Verdict | Why |
|---|---|---|
| **Same Next.js app + `/admin` routes** ✅ | **Pick this** | One codebase, one deploy, share types between contact form & admin. Authenticated routes are easy with middleware. |
| Separate Next.js admin repo | Skip for now | Doubles deploy/auth work for no win at this scale. Revisit if the admin grows into 10+ modules. |
| No-code (Retool, ToolJet, Airtable) | Skip | Locks operational data inside a third-party tool. The team can't iterate on the form/data shape without going through us. |
| Custom dashboard on the existing FreakingMinds CRM | Skip | FM CRM is a separate product. Coupling Giovanni's operations to it adds a migration we may not want later. |

---

## 3. Tech stack

| Concern | Choice | Notes |
|---|---|---|
| Hosting | Same Vercel project | Add a `/admin` subpath. |
| Database | **Supabase Postgres** | Free tier handles the first year easily. Row-level security gives staff/admin separation. |
| Auth | **Supabase Auth, magic-link email** | No passwords to manage. Staff click an email link and they're in. |
| UI library | **shadcn/ui** | Drop-in components (DataTable, Sheet, Form, Toast, Dialog). Themed in the same Tailwind setup. |
| Forms | **react-hook-form** + **zod** | Already paired well with shadcn. |
| Email notifications | **Resend** | Notify the concierge inbox + reply-to leads when status changes. |
| File storage | Supabase Storage | SOPs with attachments, lead docs. |

> Everything except shadcn is already on a free/cheap tier. shadcn is code-copied, not a dependency.

---

## 4. Data model (Phase 1)

Four tables. That's it.

### `users`
The Giovanni team. Created on first magic-link sign-in.
```
id          uuid (pk, supabase auth.users)
name        text
email       text unique
role        enum('admin', 'concierge', 'planner', 'staff')
created_at  timestamptz
```

### `leads`
Every prospect that touches the business — website form, walk-in, WhatsApp, IG DM, phone.
```
id            uuid pk
source        enum('website', 'whatsapp', 'instagram', 'phone', 'walk_in', 'partner', 'referral')
name          text
email         text
phone         text
interest      enum('stay', 'wedding', 'event', 'dining', 'spa', 'corporate', 'other')
party_size    int          -- guests / pax
dates         daterange    -- check-in/out or event date window
budget_inr    int          -- optional indicative budget
message       text         -- the form/whatsapp message body
status        enum('new', 'contacted', 'qualified', 'proposal_sent', 'booked', 'lost', 'archived')
assigned_to   uuid fk users
created_at    timestamptz
updated_at    timestamptz
```

### `lead_notes`
Activity timeline on a lead — calls made, emails sent, follow-ups, file uploads.
```
id          uuid pk
lead_id     uuid fk leads
author_id   uuid fk users
type        enum('note', 'call', 'email', 'whatsapp', 'status_change', 'file')
body        text
metadata    jsonb         -- {old_status, new_status} etc.
created_at  timestamptz
```

### `sops`
The team's knowledge base. Markdown content, versioned only by `updated_at` (no full version control in Phase 1).
```
id          uuid pk
slug        text unique
category    enum('reservations', 'kitchen', 'housekeeping', 'spa', 'events', 'maintenance', 'finance', 'hr', 'general')
title       text
body_md     text          -- markdown content
attachments text[]        -- supabase storage paths
last_editor uuid fk users
created_at  timestamptz
updated_at  timestamptz
```

That's a complete operational core for the first 3-6 months.

---

## 5. Screens (Phase 1)

Six screens. Each one a single Next.js page.

1. **`/admin` (login)** — magic-link email box. Nothing else.
2. **`/admin/dashboard`** — counts on top (`new leads this week`, `unassigned`, `bookings this month`), recent activity feed, lead-source pie.
3. **`/admin/leads`** — filterable table. Filters: status, source, interest, assigned to, date range, search. Bulk actions: assign, change status, archive.
4. **`/admin/leads/[id]`** — single lead view. Header with status + assignee. Tabs: *Overview* (form data), *Timeline* (notes feed), *Files*. Right rail: contact actions (call, WhatsApp, email).
5. **`/admin/sops`** — list grouped by category. Search across titles & body.
6. **`/admin/sops/[slug]`** — markdown SOP with a "Edit" button (admins only). Edit mode is a side-by-side markdown editor.

Plus a sidebar that grows: today **Dashboard / Leads / SOPs / Team**. Tomorrow we add Banquet, Restaurants, Housekeeping, etc.

---

## 6. Public-site → admin wiring

Today the contact form does nothing (or emails). After Phase 1:

```
[Contact form / Reserve form]
        │ POST /api/leads
        ▼
   Validate (zod) → INSERT into `leads`
        │
        ├── Resend email to concierge inbox: "New lead — Priya, Wedding for 250"
        └── (optional) WhatsApp Business message to a duty manager number
```

All future channels (WhatsApp Business API, Instagram lead ads, partner referrals) call the same `/api/leads` with a `source` parameter. One inbox.

---

## 7. Roles & permissions

| Role | Leads | SOPs | Team |
|---|---|---|---|
| **admin** | Full CRUD | Full CRUD | Invite, change roles |
| **concierge** | Read all, edit assigned, add notes | Read all | — |
| **planner** | Read events/weddings, edit assigned | Read events SOPs | — |
| **staff** | Read assigned only | Read own department | — |

Enforced with Supabase row-level security policies. No application-layer checks needed beyond UI hiding.

---

## 8. Phase 1 build sequence (suggested ~3 weeks)

| Week | Deliverable |
|---|---|
| **1** | Supabase project + schema + RLS. Auth setup. Admin shell (sidebar, layout, login). `/api/leads` endpoint + hook into the public contact form. Concierge gets emails on every new lead. |
| **2** | Leads list (table, filters, search) + Lead detail (timeline, notes). Status transitions with email/WhatsApp notify. Team invite flow. |
| **3** | SOPs module (list + detail + edit, markdown). Dashboard counts. Polish, mobile pass, on-call rotation. |

After week 3, the team is running daily on the admin. Phase 2 (banquet booking, F&B reservations, housekeeping) starts whenever there's an owner ready to spec it.

---

## 9. What this is NOT (Phase 1 boundaries)

- ❌ No banquet / event calendar yet — that's Phase 2 and needs proper spec (date conflicts, deposits, vendor coordination).
- ❌ No housekeeping / room status — Phase 2+, integrates with IPMS PMS.
- ❌ No financial dashboard — pulls from a separate booking system later.
- ❌ No multi-property switcher (House / Suites) — Phase 2; we'll add a `property_id` column when needed.

Keeping Phase 1 boring is the point. Lead inbox + SOPs = the team starts using it day one.

---

## 10. Open questions for you

1. **Who's the first admin?** Need an email to bootstrap the magic-link auth.
2. **Concierge inbox** — single shared mailbox or per-person notifications?
3. **WhatsApp Business** — already on it or do we start with email-only notifications and add WA later?
4. **Domain** — `admin.giovannivillage.com` or just `giovannivillage.com/admin`?
5. **SOPs we already have** — any existing documents we should bulk-import on day one? PDF / Notion / Google Docs?

Once you answer these I can scaffold the Supabase schema + the admin shell as a follow-up branch.
