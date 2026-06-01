# Launch playbook

Everything needed to take Giovanni Village live. Audited end-to-end across nine phases (cleanup → code hygiene → content → UX/a11y → responsiveness → SEO → security → performance → launch).

---

## Environment variables — required on Vercel

Set every one of these under **Vercel → Project → Settings → Environment Variables**, applied to all environments (Production, Preview, Development) unless noted.

| Variable | Where to get it | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API | Public, safe to expose |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same screen | Public, safe to expose |
| `SUPABASE_SERVICE_ROLE_KEY` | Same screen, "service_role" | **Secret — never expose** |
| `ADMIN_AUTH_SECRET` | Generate: `openssl rand -base64 48` | **Secret — never expose** |
| `ADMIN_PHONE_WHITELIST` | Comma-separated 10-digit phone numbers | Optional; defaults to a single seed number |
| `RESEND_API_KEY` | Resend dashboard | For lead-notification emails |
| `LEAD_NOTIFY_TO` | Operations email(s) | Comma-separated. Defaults to `reservations@giovannivillage.com` |
| `LEAD_NOTIFY_FROM` | Verified sender on Resend | Format: `"Giovanni Website <noreply@giovannivillage.com>"` |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | GCP service account JSON, single-line | For the Sheets sync cron |
| `CRON_SECRET` | Generate: `openssl rand -base64 32` | Protects `/api/sync/sheets` cron endpoint |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 property → "G-XXXXXXXXXX" | Add at cutover if you want analytics from day 1 |

After saving env vars, **redeploy** (Deployments → ⋯ → Redeploy, with **Use existing build cache** unchecked) so the new env vars actually load.

---

## Domain cutover (the day you go live)

The site currently lives at `https://giovannivillage.vercel.app/`. The production domain `giovannivillage.com` still serves the old WordPress site. When you're ready to flip:

### Pre-cutover (do these before changing DNS)

- [ ] Confirm all required env vars are set in Vercel Production
- [ ] In the codebase, `siteConfig.url` in `lib/data.ts` is already `https://giovannivillage.com` — that's correct for production
- [ ] Verify Vercel build is green on `main` branch
- [ ] Export WordPress sitemap (`giovannivillage.com/sitemap.xml`) — needed for the 301 audit below

### Cutover steps (do these in order)

1. **Vercel → Domains** — add `giovannivillage.com` to the project. Vercel will issue an SSL cert automatically once DNS resolves.
2. **At your DNS provider** — point the A record (or CNAME) of `giovannivillage.com` to Vercel's IP/host. The change usually propagates in minutes; can take up to 24h worst-case.
3. **Wait for Vercel to issue the cert** (check the Domains tab — green "Active" badge).
4. **Submit `https://giovannivillage.com/sitemap.xml`** to Google Search Console.
5. **Use the URL Inspection tool** in Search Console to fetch the homepage; verify Google sees the new content.

### Post-cutover (within 7 days)

- [ ] Audit WordPress URLs vs. our routes. For any URL on the WP site that doesn't have a 1:1 match here, add a 301 redirect to `next.config.ts` (existing redirects are in place for `/about-us`, `/our-rooms`, `/contact-us`, etc.)
- [ ] Verify Google Analytics is receiving page-view events (Real Time report)
- [ ] Watch Vercel function logs for errors (`/api/leads`, `/api/sync/sheets`, `/api/admin/auth/login`)
- [ ] Watch Vercel **Observability** tab for any 5xx errors
- [ ] Submit a test lead via the contact form, verify:
  - Row appears in Supabase `leads` table
  - Email arrives at `LEAD_NOTIFY_TO`
- [ ] Sign in to `/admin/login` with a whitelisted phone, walk through every admin page

---

## Known carryovers (resolve before or shortly after launch)

These are flagged as deliberate trade-offs by the client during the audit. Each is documented for closure.

### Content
- [ ] **Two new suite types** — homepage and FAQ copy says "ten suites," `lib/data.ts` only defines eight. Client to send name + capacity + area + price + description + photos for the two missing types. Then `/rooms` count matches the copy.
- [ ] **Wedding venues — six need real descriptions + capacities** — the new 12-venue list is structurally in place but Aria Deck, Aria I+II+Deck, Aria III, Pihu Deck, Banquet Lawn currently say "Capacity on request" / one-line stub. Add the real numbers + a sentence per venue.
- [ ] **Gazebo by the Lake** — copy is in place, brand-voice description plausibly written, image is a placeholder (`/images/weddings/lakeside-deck.webp`). Swap in real photo when shoot is available.

### Production
- [ ] **Newcontent integration** — 56 videos + 4 stills from the client sit in `public/Newcontent/` (gitignored). Catalogue + integration plan saved in `memory/giovanni-newcontent-catalog.md`. Defer to post-launch.

### Hardening (P1 — post-launch)
- [ ] **Content Security Policy** — intentionally skipped during launch audit because Next.js + Framer Motion + the Google Maps iframe make CSP brittle. Worth a proper audit later.
- [ ] **Cookie consent banner** — required if any EU traffic. India's DPDPA also requires explicit consent before analytics. GA4 currently fires on every visit. Add a simple banner gating the GA4 init.

### Operations
- [ ] **Rate-limit at scale** — `lib/rate-limit.ts` is an in-memory token bucket, fine for single Vercel function instances. If traffic grows past a few hundred concurrent users, replace the `Map` with Upstash Redis or Vercel KV (interface is unchanged — only the storage backend swaps).

---

## Analytics — Google Analytics 4

A `GoogleAnalytics` component is mounted in the root layout. It loads only when `NEXT_PUBLIC_GA_ID` is set on Vercel. Steps to turn it on:

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Copy the Measurement ID (format `G-XXXXXXXXXX`)
3. Set `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` in Vercel (Production)
4. Redeploy
5. Verify in GA4 → Real Time within ~30 seconds of visiting the site

What's tracked out-of-the-box: page views, session duration, geography, device, source/medium. For lead-conversion tracking, fire a `gtag('event', 'lead_submitted')` from the form success handler — happy to wire that in when you ask.

---

## Error monitoring — Vercel Observability

Already enabled by default on Vercel. Surfaces:
- 4xx/5xx HTTP responses
- Function execution errors with stack traces
- Slow function executions
- Log aggregation across all functions

Access: **Vercel Dashboard → Project → Observability**. Set up email alerts under Observability → Alerts for any 5xx threshold ("> 5 errors in 5 minutes" is a sane default).

---

## Rollback plan

Vercel keeps every deployment immutable. To roll back to a previous version:

1. **Vercel Dashboard → Deployments**
2. Find the last known-good deployment (green check)
3. Click ⋯ → **Promote to Production**

Promotion is instant — no rebuild, no downtime. The previous URL stays alive too, in case anyone has linked to the bad one.

Database rollback (if a migration breaks something) is **manual** via the Supabase dashboard — restore from a daily snapshot under Settings → Database → Backups.

---

## Final-check checklist (run within an hour of going live)

- [ ] `https://giovannivillage.com/` loads, displays the new homepage (not WordPress)
- [ ] `https://giovannivillage.com/admin/login` reachable; sign-in works with a whitelisted number
- [ ] `https://giovannivillage.com/sitemap.xml` returns valid XML with 24+ entries
- [ ] `https://giovannivillage.com/robots.txt` allows `/`, disallows `/admin/` and `/api/`
- [ ] Contact form posts a lead → Supabase row appears + email lands
- [ ] WhatsApp button on the hero opens WhatsApp with the right pre-filled message
- [ ] Restaurant + bar + spa menu PDFs download correctly from `/dining` and `/spa`
- [ ] Maps iframe on `/contact` shows the correct Giovanni Village pin
- [ ] Music starts (or starts on first interaction — browser-policy dependent)
- [ ] Google Analytics → Real Time shows your test visit
- [ ] No 5xx errors in Vercel Observability
- [ ] Mobile: open the carpet menu, browse pages, submit a test lead from a phone on cell data
