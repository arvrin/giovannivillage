# Giovanni Village Resort

Public website + lightweight admin portal for **Giovanni Village** — a luxury wildlife resort on the edge of Ratapani Tiger Reserve, Bhopal (a venture of Sudesh The Village Resort).

Sister boutique stays — Giovanni House and Giovanni Suites in Arera Colony, Bhopal — are surfaced under `/house` and `/suites` as separate single-page sites.

---

## Stack

- **Framework** — Next.js 15 (App Router) + React 19 + Turbopack
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4 + design tokens in `lib/design-tokens.ts`
- **Animation** — Framer Motion
- **Data** — Supabase (Postgres + auth tables, admin pages use the service-role client to bypass RLS)
- **Email** — Resend (lead notifications)
- **Integrations** — Google Sheets sync (Vercel cron), IPMS247 booking embeds
- **Deployed on** — Vercel

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

Required env vars in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
GOOGLE_SERVICE_ACCOUNT_KEY=
CRON_SECRET=
ADMIN_AUTH_SECRET=                 # 32+ random chars (openssl rand -base64 48)
ADMIN_PHONE_WHITELIST=             # optional, comma-separated 10-digit numbers
```

## Project layout

```
app/
  (public site routes — homepage, rooms, dining, spa, etc.)
  admin/                  Phone-whitelist gated admin portal
  api/                    Public lead form + admin auth + cron endpoints
  faq/                    Aggregated FAQ page

components/
  layout/                 Header, Footer (production)
  themes/retreat/         The retreat design — only theme that ships
  ui/                     Shared UI primitives (Button, Container, FaqBlock, GalleryLightbox, …)
  providers/              ClientLayout

lib/
  data.ts                 Hotel content (rooms, restaurants, weddings, activities, copy)
  faqs.ts                 FAQ catalogue with FAQPage JSON-LD helpers
  gallery.ts              Image + video manifest (119 items, 7 categories)
  admin-auth.ts           HMAC-signed cookie session + phone-whitelist
  supabase/               Server + browser Supabase clients
  city-stays.ts           Boutique House + Suites city-stay data

public/
  images/                 Photography
  videos/                 Ambient + hero clips
  menus/                  Restaurant, bar, spa PDFs
```

## Admin portal

- Phone-whitelist login at `/admin/login`
- HMAC-SHA256 signed `gv-admin-session` cookie, 30-day expiry
- All admin reads use the Supabase service-role client (bypass RLS)
- Routes:
  - `/admin` — dashboard
  - `/admin/leads` — list + detail
  - `/admin/leads/sheet` — live Google-Sheets-synced sheet
  - `/admin/sops` — operating procedures
  - `/admin/team`
  - `/admin/integrations/sheets` — sync status

## Scripts

```bash
npm run dev          # dev server
npm run build        # production build
npm run start        # serve production build
npm run lint         # eslint
```

## Deployment

- `main` branch auto-deploys to Vercel
- Cron: `vercel.json` runs `/api/sync/sheets` daily at 03:00 UTC
- 301 redirects from legacy WordPress URLs are in `next.config.ts`
