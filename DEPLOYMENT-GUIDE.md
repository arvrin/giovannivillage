# Giovanni Village Resort - Deployment & Maintenance Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Hosting & Deployment](#hosting--deployment)
4. [Domain & DNS Configuration](#domain--dns-configuration)
5. [Backend & CMS Options](#backend--cms-options)
6. [Database Requirements](#database-requirements)
7. [Email Configuration](#email-configuration)
8. [Security & Firewall](#security--firewall)
9. [Analytics & Monitoring](#analytics--monitoring)
10. [Backup & Version Control](#backup--version-control)
11. [Performance Optimization](#performance-optimization)
12. [Cost Breakdown](#cost-breakdown)
13. [Maintenance Schedule](#maintenance-schedule)
14. [Implementation Timeline](#implementation-timeline)
15. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Project Name:** Giovanni Village Resort Website
**Type:** Luxury Resort Marketing Website
**Repository:** https://github.com/arvrin/giovannivillage.git
**Framework:** Next.js 15.5.4 (React 19)
**Pages:** 14 total pages
**Build Time:** ~2 minutes
**Bundle Size:** ~183KB (First Load JS)

### Key Features
- ✅ Responsive luxury design
- ✅ Cinematic video hero with lazy loading
- ✅ Dynamic room pages with SSG
- ✅ Image optimization (AVIF/WebP)
- ✅ Code splitting with dynamic imports
- ✅ WhatsApp integration
- ✅ Mobile-first approach
- ✅ SEO optimized

---

## Technology Stack

### Frontend
```json
{
  "framework": "Next.js 15.5.4",
  "language": "TypeScript",
  "styling": "Tailwind CSS + Custom CSS Variables",
  "animations": "Framer Motion",
  "icons": "Lucide React",
  "fonts": "Google Fonts (Playfair Display, Manrope, Cormorant Garamond)",
  "build_tool": "Turbopack"
}
```

### Dependencies
```json
{
  "next": "15.5.4",
  "react": "19.0.0",
  "react-dom": "19.0.0",
  "framer-motion": "^11.15.0",
  "lucide-react": "^0.468.0",
  "tailwindcss": "^3.4.1",
  "typescript": "^5"
}
```

### Development Tools
- **Node.js:** v18+ or v20+ (LTS recommended)
- **Package Manager:** npm or pnpm
- **Git:** Version control
- **VS Code:** Recommended IDE

---

## Hosting & Deployment

### Option 1: Vercel (Recommended) ⭐

**Why Vercel:**
- Native Next.js support (same team)
- Zero-config deployment
- Automatic CI/CD from GitHub
- Global CDN with edge caching
- Free SSL certificates
- Serverless functions support
- Instant rollbacks
- Preview deployments for PRs

**Pricing:**
| Plan | Price | Features |
|------|-------|----------|
| Hobby | Free | Personal projects, 100GB bandwidth |
| Pro | $20/mo | Commercial use, 1TB bandwidth, Analytics |
| Enterprise | Custom | Custom infrastructure, SLA |

**Recommended:** Pro Plan ($20/month)

**Setup Steps:**
```bash
# 1. Install Vercel CLI (optional)
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel --prod

# Or use the Vercel Dashboard:
# - Go to vercel.com
# - Click "Import Project"
# - Connect GitHub repository
# - Deploy automatically
```

**Vercel Configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "framework": "nextjs"
}
```

**Environment Variables (if needed):**
```bash
# Add in Vercel Dashboard > Settings > Environment Variables
NEXT_PUBLIC_SITE_URL=https://giovannivillage.com
SENDGRID_API_KEY=your_sendgrid_key
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

---

### Option 2: Netlify

**Pricing:** Pro Plan $19/month
**Bandwidth:** 100GB/month
**Build Minutes:** 300/month

**Setup:**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

### Option 3: Traditional VPS (Not Recommended)

**Providers:** DigitalOcean, AWS EC2, Linode

**Server Requirements:**
- **OS:** Ubuntu 22.04 LTS
- **CPU:** 2 vCPU
- **RAM:** 2GB minimum, 4GB recommended
- **Storage:** 50GB SSD
- **Cost:** $12-24/month

**Setup Script:**
```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Install PM2
sudo npm install -g pm2

# 4. Clone repository
git clone https://github.com/arvrin/giovannivillage.git
cd giovannivillage

# 5. Install dependencies
npm install

# 6. Build
npm run build

# 7. Start with PM2
pm2 start npm --name "giovanni" -- start
pm2 save
pm2 startup

# 8. Install Nginx
sudo apt install nginx -y

# 9. Configure Nginx
sudo nano /etc/nginx/sites-available/giovanni
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name giovannivillage.com www.giovannivillage.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**SSL with Certbot:**
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d giovannivillage.com -d www.giovannivillage.com
```

---

## Domain & DNS Configuration

### Domain Registration

**Recommended Registrars:**
- **Namecheap:** $10-12/year, good UI
- **Google Domains:** $12/year (migrating to Squarespace)
- **Cloudflare Registrar:** At-cost pricing (~$8-10/year)
- **GoDaddy:** $15-20/year (more expensive)

**Purchase:** giovannivillage.com or your preferred domain

---

### DNS Configuration for Vercel

**Add these records in your domain registrar:**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | Auto |
| CNAME | www | cname.vercel-dns.com | Auto |

**Alternative (Nameserver method):**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Verification:**
```bash
# Check DNS propagation
dig giovannivillage.com
nslookup giovannivillage.com

# Or use online tools:
# https://dnschecker.org
```

---

### SSL Certificate

**Automatic via Vercel/Netlify:**
- Uses Let's Encrypt
- Free forever
- Auto-renewal every 90 days
- No action required

**Manual SSL (VPS only):**
```bash
# Certbot auto-renewal
sudo certbot renew --dry-run
```

---

## Backend & CMS Options

### Current Implementation: Static Content

**Content Location:** `/lib/data.ts`

**Pros:**
- ✅ No backend required
- ✅ Fast performance
- ✅ No database costs
- ✅ Version controlled with git

**Cons:**
- ❌ Requires developer to update content
- ❌ No content editor UI
- ❌ Must redeploy for changes

**Update Process:**
```bash
# 1. Edit content
vim lib/data.ts

# 2. Commit
git add lib/data.ts
git commit -m "Update content"

# 3. Push (auto-deploys on Vercel)
git push origin main
```

---

### Option A: Sanity CMS (Recommended for CMS) ⭐

**Why Sanity:**
- Real-time collaboration
- Structured content
- Image optimization built-in
- Powerful query language (GROQ)
- Version history
- Live preview

**Pricing:**
| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | 3 users, 10GB assets, unlimited API calls |
| Growth | $99/mo | 10 users, 50GB assets, advanced features |
| Business | $949/mo | Unlimited users, 500GB assets, SLA |

**Recommended:** Free or Growth ($99/month)

**Setup:**
```bash
# 1. Install Sanity CLI
npm install -g @sanity/cli

# 2. Initialize Sanity Studio
sanity init

# 3. Create schemas (example: Room)
# schemas/room.js
export default {
  name: 'room',
  title: 'Room',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }]
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    }
  ]
}

# 4. Deploy Studio
sanity deploy

# 5. Install client in Next.js
npm install @sanity/client @sanity/image-url

# 6. Create lib/sanity.ts
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})
```

**Integration Example:**
```typescript
// app/rooms/[slug]/page.tsx
import { client } from '@/lib/sanity'

export async function generateStaticParams() {
  const rooms = await client.fetch(`*[_type == "room"]{ "slug": slug.current }`)
  return rooms
}

export default async function RoomPage({ params }: { params: { slug: string } }) {
  const room = await client.fetch(
    `*[_type == "room" && slug.current == $slug][0]`,
    { slug: params.slug }
  )

  return <div>{room.title}</div>
}
```

---

### Option B: Strapi

**Pricing:** Free (self-hosted) or $99/month (cloud)

**Requires:**
- Node.js server
- PostgreSQL or MongoDB
- 1GB RAM minimum

**Setup:**
```bash
npx create-strapi-app@latest giovanni-cms
cd giovanni-cms
npm run develop
```

---

### Option C: Contentful

**Pricing:**
- Free: 1 user, 25K records
- Team: $489/month, 10 users

**Best For:** Enterprise projects

---

## Database Requirements

### When You Need a Database:
- ✅ Using a CMS (Sanity, Strapi, Contentful)
- ✅ User authentication/accounts
- ✅ Booking system
- ✅ Contact form submissions storage
- ✅ Analytics/tracking

### When You Don't:
- Current static implementation
- Content updated via code
- No user-generated content

---

### Option 1: Vercel Postgres (Recommended)

**Powered by:** Neon.tech

**Pricing:**
| Plan | Price | Storage | Connections |
|------|-------|---------|-------------|
| Hobby | Free | 256MB | 100 |
| Pro | $20/mo | 5GB | 1000 |

**Setup:**
```bash
# 1. Install Vercel Postgres
npm install @vercel/postgres

# 2. Create database in Vercel Dashboard
# Settings > Storage > Create Database > Postgres

# 3. Use in code
import { sql } from '@vercel/postgres'

export async function getContacts() {
  const { rows } = await sql`SELECT * FROM contacts`
  return rows
}
```

**Schema Example:**
```sql
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### Option 2: Supabase

**Features:** PostgreSQL + Auth + Storage + Realtime

**Pricing:**
| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | 500MB database, 1GB storage, 50K monthly active users |
| Pro | $25/mo | 8GB database, 100GB storage, unlimited API requests |

**Setup:**
```bash
npm install @supabase/supabase-js

# lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

---

### Option 3: MongoDB Atlas

**Best For:** Unstructured data, flexible schemas

**Pricing:**
| Tier | Price | Storage |
|------|-------|---------|
| Free (M0) | $0 | 512MB |
| Shared (M2) | $9/mo | 2GB |
| Dedicated (M10) | $57/mo | 10GB |

---

## Email Configuration

### Contact Form Backend Implementation

**Step 1: Create API Route**

```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json()

  // Validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  // Send email (example with SendGrid)
  // await sendEmail({ name, email, phone, message })

  return NextResponse.json({ success: true })
}
```

---

### Option 1: SendGrid (Recommended) ⭐

**Pricing:**
| Plan | Price | Emails/Month |
|------|-------|--------------|
| Free | $0 | 100/day (3K/month) |
| Essentials | $19.95/mo | 50K |
| Pro | $89.95/mo | 100K |

**Setup:**
```bash
npm install @sendgrid/mail

# .env.local
SENDGRID_API_KEY=SG.xxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@giovannivillage.com
SENDGRID_TO_EMAIL=info@giovannivillage.com
```

**Implementation:**
```typescript
// lib/email.ts
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function sendContactEmail(data: {
  name: string
  email: string
  phone?: string
  message: string
}) {
  const msg = {
    to: process.env.SENDGRID_TO_EMAIL!,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: `New Contact Form Submission from ${data.name}`,
    text: `
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone || 'Not provided'}
      Message: ${data.message}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  }

  await sgMail.send(msg)
}
```

---

### Option 2: Resend

**Modern, developer-friendly**

**Pricing:**
| Plan | Price | Emails/Month |
|------|-------|--------------|
| Free | $0 | 100/day |
| Pro | $20/mo | 50K |

**Setup:**
```bash
npm install resend

# Implementation
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'Giovanni Village <noreply@giovannivillage.com>',
  to: 'info@giovannivillage.com',
  subject: 'New Contact Form',
  html: '<p>Message content</p>'
})
```

---

### Option 3: Custom Domain Email (Professional)

**Google Workspace:**
- **Cost:** $6/user/month
- **Features:** Gmail, Calendar, Drive (30GB)
- **Email:** info@giovannivillage.com

**Zoho Mail:**
- **Cost:** Free (5 users, 5GB) or $1/user/month
- **Features:** Basic email hosting

**Setup DNS Records:**
```
MX    @    mx.zoho.com         Priority: 10
MX    @    mx2.zoho.com        Priority: 20
TXT   @    v=spf1 include:zoho.com ~all
CNAME mail mail.zoho.com
```

---

### Spam Protection

**reCAPTCHA v3:**
```bash
npm install react-google-recaptcha-v3

# components/ContactForm.tsx
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const { executeRecaptcha } = useGoogleReCaptcha()

const handleSubmit = async (e) => {
  const token = await executeRecaptcha('contact_form')

  await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify({ ...formData, recaptchaToken: token })
  })
}
```

---

## Security & Firewall

### Vercel Built-in Security

**Automatic Protection:**
- ✅ DDoS mitigation
- ✅ WAF (Web Application Firewall)
- ✅ SSL/TLS encryption (TLS 1.3)
- ✅ Edge network security
- ✅ Rate limiting (configurable)
- ✅ CORS headers
- ✅ Security headers

---

### Additional Security Layer: Cloudflare

**Why Add Cloudflare:**
- Additional DDoS protection
- Advanced bot management
- Rate limiting rules
- Analytics and insights
- CDN caching

**Pricing:**
| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | Basic DDoS, CDN |
| Pro | $20/mo | Advanced security, WAF |
| Business | $200/mo | Custom rules, 100% uptime |

**Setup:**
```bash
# 1. Change nameservers at domain registrar to:
ns1.cloudflare.com
ns2.cloudflare.com

# 2. Configure SSL/TLS mode: Full (Strict)

# 3. Enable these features:
- Auto Minify (HTML, CSS, JS)
- Brotli compression
- HTTP/3 (QUIC)
- 0-RTT Connection Resumption
```

---

### Security Best Practices

**1. Environment Variables:**
```bash
# Never commit to git
# Add to .gitignore
.env
.env.local
.env.production

# Use Vercel environment variables for production
```

**2. Content Security Policy:**
```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}
```

**3. API Rate Limiting:**
```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const rateLimit = new Map()

export function middleware(request: NextRequest) {
  const ip = request.ip ?? 'unknown'
  const limit = rateLimit.get(ip) ?? { count: 0, resetTime: Date.now() + 60000 }

  if (Date.now() > limit.resetTime) {
    limit.count = 0
    limit.resetTime = Date.now() + 60000
  }

  limit.count++

  if (limit.count > 100) { // 100 requests per minute
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }

  rateLimit.set(ip, limit)
  return NextResponse.next()
}
```

**4. Input Validation:**
```typescript
// Use Zod for validation
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10).max(1000),
})

// In API route
const result = contactSchema.safeParse(data)
if (!result.success) {
  return NextResponse.json(
    { error: result.error.errors },
    { status: 400 }
  )
}
```

---

## Analytics & Monitoring

### Option 1: Vercel Analytics (Recommended)

**Features:**
- Real User Monitoring (RUM)
- Web Vitals tracking
- Audience insights
- Custom events

**Pricing:**
| Plan | Price | Events/Month |
|------|-------|--------------|
| Hobby | Free | Limited |
| Pro | $10/mo | 100K |
| Enterprise | Custom | Unlimited |

**Setup:**
```bash
npm install @vercel/analytics

# app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

### Option 2: Google Analytics 4

**Pricing:** Free

**Setup:**
```bash
# Get GA4 Measurement ID from Google Analytics

# app/layout.tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

---

### Option 3: Plausible Analytics

**Privacy-focused, GDPR compliant**

**Pricing:** $9/month (10K pageviews)

**Setup:**
```bash
# Add to app/layout.tsx
<Script
  defer
  data-domain="giovannivillage.com"
  src="https://plausible.io/js/script.js"
/>
```

---

### Uptime Monitoring

**UptimeRobot (Recommended):**
- **Pricing:** Free (50 monitors, 5-min intervals)
- **Features:** HTTP/HTTPS monitoring, email alerts, status page

**Setup:**
1. Create account at uptimerobot.com
2. Add monitor for https://giovannivillage.com
3. Configure alert contacts
4. Set check interval to 5 minutes

**Alternatives:**
- **Pingdom:** $15/month
- **StatusCake:** Free tier available
- **Better Uptime:** $10/month

---

### Error Tracking: Sentry

**Pricing:**
- Developer: Free (5K errors/month)
- Team: $26/month (50K errors/month)

**Setup:**
```bash
npm install @sentry/nextjs

# sentry.config.js generated automatically

# Initialize
npx @sentry/wizard@latest -i nextjs
```

---

## Backup & Version Control

### Git Repository

**Current Setup:**
- **Platform:** GitHub
- **URL:** https://github.com/arvrin/giovannivillage.git
- **Branch:** main
- **Workflow:** Direct push or PR-based

**Backup Strategy:**
```bash
# Automatic via GitHub
- Every commit is backed up
- Full history preserved
- Can revert to any previous state

# Additional safety
git remote add backup git@backup-server:giovanni.git
git push backup main
```

---

### Asset Backup

**Images & Static Files:**
- Stored in `/public` folder
- Tracked by git (part of repository)
- Deployed with every build
- Additional backup via Vercel's deployment archive

**Recommendation:**
```bash
# Periodic backup of public folder
tar -czf backup-$(date +%Y%m%d).tar.gz public/
# Upload to cloud storage (S3, Dropbox, etc.)
```

---

### Database Backup (If applicable)

**Automated Backups:**
- **Vercel Postgres:** Automatic daily backups (7-day retention)
- **Supabase:** Point-in-time recovery (7 days on Free, 30 days on Pro)
- **MongoDB Atlas:** Continuous backup on paid plans

**Manual Backup Script:**
```bash
# PostgreSQL
pg_dump -h your-db-host -U username -d database > backup-$(date +%Y%m%d).sql

# MongoDB
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/database"
```

---

## Performance Optimization

### Current Implementation

**Implemented Optimizations:**
- ✅ Next.js Image optimization (AVIF/WebP)
- ✅ Code splitting with dynamic imports
- ✅ Static Site Generation (SSG)
- ✅ Edge caching via Vercel CDN
- ✅ Compressed assets (Gzip/Brotli)
- ✅ Tree-shaking unused code
- ✅ Font optimization (Google Fonts)
- ✅ Lazy loading for images and videos

**Build Output:**
```
Route (app)                            Size  First Load JS
┌ ○ /                               7.44 kB         183 kB
├ ○ /about                           2.8 kB         179 kB
├ ○ /contact                        12.4 kB         178 kB
├ ○ /dining                         3.62 kB         179 kB
├ ○ /gallery                        2.24 kB         178 kB
├ ● /rooms/[slug]                     13 kB         179 kB
├ ○ /spa                            4.08 kB         180 kB
└ ○ /weddings                       4.49 kB         180 kB
```

---

### Target Performance Metrics

**Lighthouse Scores (Goal):**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

**Core Web Vitals (Goal):**
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

---

### Additional Optimizations

**1. Video Optimization:**
```bash
# Current video should be optimized
ffmpeg -i input.mp4 \
  -vcodec h264 \
  -crf 28 \
  -preset medium \
  -vf "scale=1920:-2" \
  -acodec aac \
  -b:a 128k \
  output.mp4

# Considerations:
- Keep under 10MB for hero video
- Use poster image for initial display
- Consider video CDN for large files
```

**2. Image Optimization:**
```bash
# Already handled by Next.js Image component
# Automatic AVIF/WebP generation
# Responsive images with srcset

# For manual optimization:
npm install sharp
# Use sharp library for batch processing
```

**3. Caching Strategy:**
```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.{jpg,jpeg,png,gif,svg,webp,avif}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

---

### Performance Testing

**Tools:**
- **Lighthouse:** Built into Chrome DevTools
- **PageSpeed Insights:** https://pagespeed.web.dev
- **WebPageTest:** https://www.webpagetest.org
- **Vercel Analytics:** Real user monitoring

**Testing Checklist:**
```bash
# 1. Test on different devices
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

# 2. Test on different networks
- Fast 3G
- Slow 3G
- Offline (Service Worker test)

# 3. Test on different browsers
- Chrome
- Safari
- Firefox
- Edge
```

---

## Cost Breakdown

### Minimal Setup (Static Site)
**Best for:** Testing, personal projects

| Service | Cost | Notes |
|---------|------|-------|
| Domain (Namecheap) | $1.25/mo | $15/year |
| Vercel Hobby | FREE | 100GB bandwidth |
| **Total** | **$1.25/mo** | **$15/year** |

---

### Professional Setup (Recommended)
**Best for:** Live production site

| Service | Cost | Notes |
|---------|------|-------|
| Domain | $1.25/mo | giovannivillage.com |
| Vercel Pro | $20/mo | 1TB bandwidth, analytics |
| SendGrid Essentials | $19.95/mo | 50K emails/month |
| Vercel Analytics | $10/mo | 100K events/month |
| UptimeRobot | FREE | Monitoring |
| **Total** | **~$51/mo** | **$612/year** |

---

### Full Setup (CMS + Database)
**Best for:** Frequent content updates, multiple editors

| Service | Cost | Notes |
|---------|------|-------|
| Domain | $1.25/mo | |
| Vercel Pro | $20/mo | |
| Sanity Growth | $99/mo | 10 users, 50GB |
| Vercel Postgres | $20/mo | 5GB database |
| SendGrid Essentials | $19.95/mo | |
| Vercel Analytics | $10/mo | |
| Cloudflare Pro | $20/mo | Optional security |
| Sentry Team | $26/mo | Error tracking |
| **Total** | **~$216/mo** | **$2,592/year** |

---

### Enterprise Setup
**Best for:** High traffic, advanced features

| Service | Cost | Notes |
|---------|------|-------|
| Domain | $1.25/mo | |
| Vercel Enterprise | Custom | 5TB+ bandwidth, SLA |
| Sanity Business | $949/mo | Unlimited users |
| Database (Dedicated) | $100/mo | High performance |
| SendGrid Pro | $89.95/mo | 100K emails |
| Cloudflare Business | $200/mo | Advanced security |
| Sentry Business | $99/mo | |
| **Total** | **~$1,439/mo** | **$17,268/year** |

---

## Maintenance Schedule

### Daily Tasks
- [ ] Monitor uptime status (automatic alerts)
- [ ] Check error logs (if Sentry configured)

### Weekly Tasks
- [ ] Review analytics dashboard
- [ ] Check contact form submissions
- [ ] Monitor site performance (Lighthouse)
- [ ] Review backup status

### Monthly Tasks
- [ ] Update npm dependencies
  ```bash
  npm outdated
  npm update
  ```
- [ ] Security audit
  ```bash
  npm audit
  npm audit fix
  ```
- [ ] Review and optimize images
- [ ] Check SSL certificate expiry (auto-renewal)
- [ ] Review CDN usage and costs
- [ ] Database cleanup (if applicable)

### Quarterly Tasks (Every 3 Months)
- [ ] Major framework updates (Next.js)
  ```bash
  npm install next@latest react@latest react-dom@latest
  ```
- [ ] Content review and updates
- [ ] Performance audit (full Lighthouse test)
- [ ] Security penetration test
- [ ] Review and optimize video files
- [ ] Backup verification (restore test)

### Semi-Annual Tasks (Every 6 Months)
- [ ] Design refresh evaluation
- [ ] SEO audit
- [ ] Accessibility audit (WCAG compliance)
- [ ] Browser compatibility testing
- [ ] Mobile responsiveness review
- [ ] Analytics goals review

### Annual Tasks (Yearly)
- [ ] Domain renewal
- [ ] SSL certificate verification (should auto-renew)
- [ ] Full security audit
- [ ] Disaster recovery drill
- [ ] Technology stack evaluation
- [ ] Performance benchmarking
- [ ] User feedback collection
- [ ] Competitor analysis

---

### Maintenance Commands

**Update Dependencies:**
```bash
# Check for updates
npm outdated

# Update all to latest
npm update

# Update to specific version
npm install next@latest

# Security updates
npm audit fix
```

**Database Maintenance (if applicable):**
```sql
-- PostgreSQL
VACUUM ANALYZE;
REINDEX DATABASE giovanni;

-- Check database size
SELECT pg_size_pretty(pg_database_size('giovanni'));
```

**Clear Caches:**
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules (if issues)
rm -rf node_modules package-lock.json
npm install

# Clear Vercel cache (via dashboard or CLI)
vercel build --force
```

---

## Implementation Timeline

### Phase 1: Initial Deployment (1-2 Days)

**Day 1: Domain & Hosting Setup**
- [ ] Purchase domain ($10-15) - 30 minutes
- [ ] Create Vercel account (Free) - 10 minutes
- [ ] Connect GitHub repository - 15 minutes
- [ ] Configure custom domain in Vercel - 30 minutes
- [ ] Wait for DNS propagation - 1-24 hours
- [ ] Deploy to production - 5 minutes
- [ ] Test all pages and functionality - 1 hour

**Day 2: Verification & Optimization**
- [ ] Verify SSL certificate - 5 minutes
- [ ] Test mobile responsiveness - 30 minutes
- [ ] Run Lighthouse audit - 15 minutes
- [ ] Fix any critical issues - 1-2 hours
- [ ] Set up Vercel Analytics - 15 minutes

**Deliverables:**
✅ Live website at giovannivillage.com
✅ SSL certificate active
✅ All pages functional
✅ Analytics tracking

---

### Phase 2: Email & Communication (1 Day)

**Email Setup (4-6 hours)**
- [ ] Choose email provider (SendGrid recommended) - 30 minutes
- [ ] Create SendGrid account - 15 minutes
- [ ] Verify domain in SendGrid - 1 hour (DNS propagation)
- [ ] Get API key - 5 minutes
- [ ] Implement contact form API route - 1 hour
  ```typescript
  // app/api/contact/route.ts
  ```
- [ ] Add form validation - 30 minutes
- [ ] Test email delivery - 30 minutes
- [ ] Add spam protection (reCAPTCHA) - 1 hour
- [ ] Create email templates - 1 hour

**Deliverables:**
✅ Working contact form
✅ Email notifications
✅ Spam protection

---

### Phase 3: Monitoring & Analytics (Half Day)

**Analytics Setup (2-3 hours)**
- [ ] Install Vercel Analytics - 15 minutes
- [ ] Configure Google Analytics (optional) - 30 minutes
- [ ] Set up conversion goals - 30 minutes
- [ ] Create analytics dashboard - 30 minutes

**Monitoring Setup (1-2 hours)**
- [ ] Create UptimeRobot account - 15 minutes
- [ ] Add uptime monitors - 15 minutes
- [ ] Configure alert contacts - 15 minutes
- [ ] Test alerting - 15 minutes
- [ ] Set up Sentry (optional) - 1 hour

**Deliverables:**
✅ Traffic analytics
✅ Uptime monitoring
✅ Error tracking

---

### Phase 4: CMS Integration (1-2 Weeks) - Optional

**Week 1: CMS Setup**
- [ ] Choose CMS platform (Day 1) - 2 hours
- [ ] Create Sanity project (Day 1) - 1 hour
- [ ] Design content schemas (Day 1-2) - 4-8 hours
  - Rooms
  - Experiences
  - Testimonials
  - Gallery
  - Pages
- [ ] Deploy Sanity Studio (Day 2) - 1 hour
- [ ] Migrate content from code to CMS (Day 3-4) - 8-16 hours

**Week 2: Integration**
- [ ] Install Sanity client in Next.js (Day 1) - 1 hour
- [ ] Update data fetching (Day 1-3) - 8-12 hours
  - Home page
  - About page
  - Room pages
  - Gallery
- [ ] Set up webhooks (Day 3) - 2 hours
- [ ] Test content updates (Day 4) - 4 hours
- [ ] Train content editors (Day 5) - 2 hours

**Deliverables:**
✅ Content management system
✅ Non-technical content editing
✅ Automatic deployments on content updates

---

### Phase 5: Advanced Features (2-4 Weeks) - Optional

**Week 1-2: Booking System**
- [ ] Choose booking platform integration
  - Booking.com API
  - Custom booking system
  - Reservation widget
- [ ] Implement booking flow - 20-40 hours
- [ ] Payment gateway integration - 8-16 hours
- [ ] Email confirmations - 4-8 hours

**Week 3: User Accounts (Optional)**
- [ ] Set up authentication (Clerk/NextAuth) - 8 hours
- [ ] User dashboard - 12 hours
- [ ] Booking history - 8 hours

**Week 4: Admin Panel**
- [ ] Booking management - 12 hours
- [ ] User management - 8 hours
- [ ] Analytics dashboard - 8 hours

---

### Quick Start Guide (Minimum Viable Deployment)

**Total Time: 2-3 hours**

```bash
# 1. Purchase domain (Namecheap) - 15 min
# 2. Create Vercel account - 5 min
# 3. Import GitHub repository - 5 min

# 4. Build command
npm run build

# 5. Deploy
vercel --prod

# 6. Add custom domain in Vercel dashboard - 10 min
# 7. Wait for DNS propagation - 5-60 min
# 8. Test website - 30 min

# Done! Website is live.
```

---

## Troubleshooting

### Common Issues & Solutions

#### 1. Build Errors

**Error:** `Module not found`
```bash
# Solution: Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

**Error:** `Out of memory`
```bash
# Solution: Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

---

#### 2. Deployment Issues

**Error:** `Deployment failed - Build exceeded time limit`
```bash
# Solution: Check for:
- Large images (compress before adding)
- Infinite loops in build process
- Heavy computations during build

# Optimize:
npm run build -- --profile
```

**Error:** `Domain not resolving`
```bash
# Solution: Check DNS records
dig giovannivillage.com
nslookup giovannivillage.com

# Wait 24-48 hours for DNS propagation
# Use https://dnschecker.org to monitor
```

---

#### 3. Performance Issues

**Problem:** Slow page load times
```bash
# Check:
1. Run Lighthouse audit
2. Check image sizes (should be <200KB each)
3. Check video size (should be <10MB)
4. Verify CDN is working

# Solutions:
- Optimize images: use WebP/AVIF
- Lazy load off-screen content
- Enable Brotli compression
- Use Cloudflare CDN
```

**Problem:** High Vercel bandwidth usage
```bash
# Monitor in Vercel dashboard
# Solutions:
- Add Cloudflare CDN
- Optimize images
- Enable caching headers
- Use video CDN for large files
```

---

#### 4. Email Issues

**Problem:** Emails not sending
```bash
# Check:
1. API key is valid
2. Domain is verified in SendGrid
3. From email is authorized
4. Check SendGrid activity logs

# Test with curl:
curl -X POST https://giovannivillage.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test"}'
```

**Problem:** Emails going to spam
```bash
# Solutions:
1. Set up SPF record:
TXT @ "v=spf1 include:sendgrid.net ~all"

2. Set up DKIM (in SendGrid dashboard)

3. Set up DMARC:
TXT _dmarc "v=DMARC1; p=none; rua=mailto:admin@giovannivillage.com"

4. Use authenticated sending domain
```

---

#### 5. Database Issues (if applicable)

**Problem:** Connection timeout
```bash
# Check:
1. Connection string is correct
2. IP whitelist (if applicable)
3. Database is running

# Test connection:
psql -h your-db-host -U username -d database
```

**Problem:** Slow queries
```sql
-- Check slow queries (PostgreSQL)
SELECT query, mean_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Add indexes where needed
CREATE INDEX idx_name ON table_name(column_name);
```

---

#### 6. Mobile Issues

**Problem:** Layout broken on mobile
```bash
# Check:
1. Use Chrome DevTools mobile emulation
2. Test on real devices
3. Check viewport meta tag
4. Verify Tailwind breakpoints

# Common fixes:
- Use responsive Tailwind classes (sm:, md:, lg:)
- Test text overflow (truncate, overflow-hidden)
- Check image aspect ratios
```

---

#### 7. SSL Certificate Issues

**Problem:** Certificate not auto-renewing
```bash
# Vercel: Automatic, no action needed
# VPS: Check Certbot
sudo certbot renew --dry-run

# If fails, reinstall certificate
sudo certbot --nginx -d giovannivillage.com
```

---

### Getting Help

**Official Support:**
- Vercel Support: support@vercel.com (Pro plan)
- Next.js GitHub: https://github.com/vercel/next.js/issues
- Vercel Community: https://github.com/vercel/vercel/discussions

**Documentation:**
- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/docs
- Tailwind CSS: https://tailwindcss.com/docs

**Community:**
- Stack Overflow: Tag `next.js`, `vercel`, `react`
- Discord: Next.js Discord community
- Reddit: r/nextjs, r/reactjs

---

## Emergency Contacts & Resources

### Critical Contacts
```
Domain Registrar: [Your registrar support]
Hosting Support: support@vercel.com
Email Provider: support@sendgrid.com
Database: [Your database provider]
Developer: [Your contact info]
```

### Emergency Rollback
```bash
# Rollback in Vercel Dashboard:
1. Go to Deployments
2. Find last working deployment
3. Click "..." menu
4. Select "Promote to Production"

# Or via CLI:
vercel rollback [deployment-url]
```

### Status Pages
- Vercel Status: https://www.vercel-status.com
- GitHub Status: https://www.githubstatus.com
- Cloudflare Status: https://www.cloudflarestatus.com

---

## Appendix

### A. Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run linter

# Deployment
vercel                   # Deploy to preview
vercel --prod            # Deploy to production
vercel env pull          # Pull environment variables
vercel logs              # View deployment logs

# Database (PostgreSQL)
psql -h host -U user -d db           # Connect
pg_dump > backup.sql                 # Backup
psql < backup.sql                    # Restore

# Git
git status               # Check status
git add .                # Stage changes
git commit -m "message"  # Commit
git push origin main     # Push to GitHub
git log --oneline        # View history

# Performance
npm run build -- --profile           # Build with profiling
npx next-bundle-analyzer             # Analyze bundle size
npx lighthouse https://example.com   # Run Lighthouse
```

---

### B. Environment Variables Template

```bash
# .env.local (development)
# Copy this to .env.local and fill in your values

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Giovanni Village Resort"

# Email (SendGrid)
SENDGRID_API_KEY=SG.xxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@giovannivillage.com
SENDGRID_TO_EMAIL=info@giovannivillage.com

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=xxxxxxxxxx

# CMS (Sanity) - if using
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=xxxxxxxxxx

# Database (if using)
DATABASE_URL=postgresql://user:pass@host:5432/db
# or
POSTGRES_URL=postgres://user:pass@host/db

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxxxxxxxxx
RECAPTCHA_SECRET_KEY=xxxxxxxxxx

# Sentry (if using)
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
SENTRY_AUTH_TOKEN=xxxxxxxxxx
```

---

### C. Checklist for Going Live

**Pre-Launch Checklist:**
- [ ] All content reviewed and approved
- [ ] Images optimized (<200KB each)
- [ ] Video optimized (<10MB)
- [ ] All links working (no 404s)
- [ ] Contact form tested
- [ ] Mobile responsive on all pages
- [ ] Cross-browser tested (Chrome, Safari, Firefox, Edge)
- [ ] SEO meta tags added
- [ ] Favicon added
- [ ] Analytics installed
- [ ] SSL certificate active
- [ ] Domain configured
- [ ] Error pages customized (404, 500)
- [ ] Performance score >90
- [ ] Accessibility audit passed
- [ ] Security headers configured

**Post-Launch Checklist:**
- [ ] Monitor uptime for 24 hours
- [ ] Check analytics data coming in
- [ ] Test contact form deliverability
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google My Business (for local SEO)
- [ ] Share on social media
- [ ] Monitor error logs
- [ ] Schedule first backup
- [ ] Document admin credentials
- [ ] Train content editors (if CMS)

---

### D. SEO Optimization Checklist

```typescript
// app/layout.tsx - Global SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://giovannivillage.com'),
  title: {
    default: 'Giovanni Village Resort',
    template: '%s | Giovanni Village Resort'
  },
  description: 'Luxury resort in nature',
  keywords: ['luxury resort', 'spa', 'wedding venue', 'nature'],
  authors: [{ name: 'Giovanni Village' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://giovannivillage.com',
    siteName: 'Giovanni Village Resort',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giovanni Village Resort',
    description: 'Luxury resort in nature',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  }
}

// Per-page SEO
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: 'Room Name',
    description: 'Room description',
    openGraph: {
      title: 'Room Name',
      description: 'Room description',
      images: ['/room-image.jpg'],
    }
  }
}
```

**Structured Data (JSON-LD):**
```typescript
// app/layout.tsx
<Script
  id="schema-org"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Resort',
      name: 'Giovanni Village Resort',
      description: 'Luxury resort',
      url: 'https://giovannivillage.com',
      telephone: '+1234567890',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Resort Road',
        addressLocality: 'City',
        postalCode: '12345',
        addressCountry: 'Country'
      }
    })
  }}
/>
```

---

## Document Version

**Version:** 1.0
**Last Updated:** January 2025
**Author:** Claude Code
**Project:** Giovanni Village Resort Website

---

## Quick Reference

**Live Site:** https://giovannivillage.com
**Repository:** https://github.com/arvrin/giovannivillage.git
**Hosting:** Vercel
**Framework:** Next.js 15.5.4
**Support:** [Your support email]

---

**End of Documentation**
