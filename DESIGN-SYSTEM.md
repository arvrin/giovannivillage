# Giovanni Village — Design System

The **Retreat** design language. This document is the source of truth for visual decisions across the entire site (homepage, inner pages, future admin portal).

Structured following the conventions used by **IBM Carbon**, **Material Design 3**, and the visual restraint of **Aman Resorts**.

---

## 1. Brand position

> **Editorial × Modernist.** The warmth of Aman + Capella (ivory & champagne) crossed with the architectural confidence of Belmond + Bulgari (forest & gold).

**Voice:** Slow. Sensorial. Confident. Pages read as short films, not brochures. Headlines are quiet. Accents are gestural — one Hurricane-script word, a brass pill, a single horizontal hairline.

**Three rules we never break:**
1. **No pure black or pure white.** Warm dark `#1F2A24` and warm ivory `#FDFBF7`.
2. **One Hurricane-script word per headline.** Maximum.
3. **Every primary CTA is a brass pill.** Same shape, same color, every page.

---

## 2. Token layering (Carbon convention)

Tokens are organised in three layers. Components reference *semantic* tokens, never raw hex.

```
Layer 1 — Primitives        Layer 2 — Semantic         Layer 3 — Component
(raw values, hex)            (role-based, intent)        (Tailwind / CSS)

#FDFBF7 ─── ivory-50    ─┐
                          ├──→ surface          ──→ class="bg-[var(--color-bg)]"
#ECE3CB ── champagne-100 ─┘                          .gv-button uses these
                                                       
#C9A961 ─── brass-500   ────→ primary          ──→ .gv-button (pill)
#B08754 ─── brass-700   ────→ primary-hover

#1F2A24 ─── forest-900  ──┬─→ on-primary       
                           ├─→ on-surface       (text)
                           └─→ surface-inverse  (deep section bg)
```

---

## 3. Primitives

The raw palette. **You never reference these directly in components** — they exist to feed the semantic layer.

### 3.1 Ivory / Champagne family (warm neutrals)
| Token | Hex | Use |
|---|---|---|
| `ivory-50` | `#FDFBF7` | Lightest surface — page background |
| `champagne-100` | `#ECE3CB` | Alt section background |
| `champagne-200` | `#DDCFAE` | Card / overlap block |
| `champagne-300` | `#C4B492` | Reserved for emphasis containers |

### 3.2 Forest family (dark / contrast)
| Token | Hex | Use |
|---|---|---|
| `forest-100` | `#4A5550` | Mid grey-green (secondary text) |
| `forest-500` | `#2E3B2A` | Mid-tone forest (reserved) |
| `forest-900` | `#1F2A24` | Deep forest — text + dark sections |
| `forest-950` | `#0F1A14` | Pressed/hover state for deep surfaces |

### 3.3 Brass family (the accent)
| Token | Hex | Use |
|---|---|---|
| `brass-300` | `#E0C98C` | Light brass — illustrations only |
| `brass-500` | `#C9A961` | **The brand brass** — every CTA, every script accent |
| `brass-700` | `#B08754` | Brass hover/pressed state |
| `brass-900` | `#8B7355` | Deep bronze — tertiary text only |

### 3.4 Functional
| Token | Hex | Use |
|---|---|---|
| `success-500` | `#6B8E6B` | Form success states |
| `error-500` | `#A64B4B` | Form errors |
| `whatsapp-500` | `#25D366` | WhatsApp button only |

---

## 4. Semantic tokens (Material 3 convention)

Components reference these. They map to CSS variables under `html.retreat` in `app/globals.css`.

### 4.1 Surface tokens (backgrounds & containers)
Following Material 3's *Surface* concept — large low-emphasis areas.

| Semantic name | CSS variable | Maps to | Use |
|---|---|---|---|
| `surface` | `--color-bg` | `ivory-50` | Default page background |
| `surface-alt` | `--color-bg-alt` | `champagne-100` | Alternating section bg |
| `surface-card` | `--color-bg-card` | `champagne-200` | Overlap cards on cream |
| `surface-inverse` | `--color-bg-deep` | `forest-900` | Dark sections |

### 4.2 On-surface tokens (text & icons)
Following Material 3's `on-{role}` pairing. Each is the **only** approved text color for its paired surface.

| Semantic name | CSS variable | Pairs with | Maps to |
|---|---|---|---|
| `on-surface` | `--color-text` | `surface`, `surface-alt`, `surface-card` | `forest-900` |
| `on-surface-muted` | `--color-text-secondary` | (same) — for long-form copy | `forest-100` (`#4A5550`) |
| `on-surface-faint` | `--color-text-tertiary` | (same) — eyebrows, captions only | `brass-900` (`#8B7355`) |
| `on-surface-inverse` | `--color-text-inverse` | `surface-inverse` | `ivory-50` |

### 4.3 Accent / action tokens
The CTA system. **One** primary, **one** secondary, **no** tertiary.

| Semantic name | CSS variable | Maps to | Use |
|---|---|---|---|
| `primary` | `--color-accent` | `brass-500` | **Every primary CTA pill** |
| `primary-hover` | `--color-accent-hover` | `brass-700` | Hover state for primary |
| `on-primary` | `--color-accent-contrast` | `forest-900` | Text on primary CTA |
| `secondary` | `--color-forest` | `forest-900` | Secondary fills, eyebrow rule |
| `on-secondary` | (inherited from inverse) | `ivory-50` | Text on dark sections |
| `script-accent` | `--color-brass` | `brass-500` | Hurricane-script accent words |

### 4.4 Border / divider tokens
| Semantic name | CSS variable | Value |
|---|---|---|
| `border-subtle` | `--color-border` | `rgba(31, 42, 36, 0.18)` |
| `border-strong` | `--color-border-strong` | `rgba(31, 42, 36, 0.45)` |
| `overlay-scrim` | `--color-overlay` | `rgba(15, 26, 20, 0.55)` |

---

## 5. Approved pairings & contrast (Material 3 rule)

> Color roles are **only** legible when used as pairs. Never mix.

| Surface | Approved text/icon | WCAG contrast | Notes |
|---|---|---|---|
| `surface` (ivory) | `on-surface` (forest) | **14.0 : 1** AAA | Default page text |
| `surface` (ivory) | `on-surface-muted` (slate) | **8.4 : 1** AAA | Long-form body |
| `surface` (ivory) | `on-surface-faint` (bronze) | **3.9 : 1** AA Large only | Eyebrows ≥11px tracked |
| `surface-alt` (champagne) | `on-surface` | **11.8 : 1** AAA | Section headlines |
| `surface-card` (deeper champagne) | `on-surface` | **9.4 : 1** AAA | Card titles |
| `surface-inverse` (forest) | `on-surface-inverse` (ivory) | **14.0 : 1** AAA | Dark sections |
| `primary` (brass) | `on-primary` (forest) | **6.4 : 1** AAA Large | CTA pills |
| `surface-inverse` (forest) | `primary` (brass) | **3.3 : 1** AA Large | Brass text/icon on dark |
| `surface` (ivory) | `primary` (brass) | **2.2 : 1** ❌ | **Hurricane script only** — never body |

**Why the last row exists:** the Hurricane script word in a headline is intentionally treated as decorative, not informational. The Onest text around it carries the message; the script is the brand flourish.

---

## 6. Typography

Two families. No exceptions.

### 6.1 Onest — the workhorse
- **Loaded via** `next/font/google` → `--font-retreat-sans`
- **Weights used**: 300 (display), 400 (body), 500 (labels)
- **All display headings:** Onest **Light 300** with `letter-spacing: -0.03em`
- **Body:** Onest **Regular 400** with `line-height: 1.7`
- **Eyebrows & labels:** Onest **Medium 500**, `letter-spacing: 0.22em–0.36em`, uppercase

### 6.2 Hurricane — the signature flourish
- **Loaded via** `next/font/google` → `--font-retreat-script`
- **One word per headline only**
- **Always brass-colored** (`script-accent` token)
- **Size auto-corrected** to 1.25× parent so it matches Onest's x-height visually

```tsx
<h2 className="display-italic text-5xl">
  Six reasons people come. <span className="font-script">One reason</span> they return.
</h2>
```

### 6.3 Type scale

| Role | Token | Desktop | Mobile | Class |
|---|---|---|---|---|
| `display-hero` | h1 | 88px (`5.5rem`) | 44px (`2.75rem`) | `text-[clamp(2.5rem,6.5vw,5.5rem)]` |
| `display-lg` | h2 large | 56px | 36px | `text-[clamp(2.25rem,4.5vw,3.5rem)]` |
| `display-md` | h2 std | 40px | 28px | `text-3xl md:text-5xl` |
| `display-sm` | h3 card | 32px | 24px | `text-2xl md:text-[2rem]` |
| `title-md` | h4 | 20px | 18px | `text-xl` |
| `body-lg` | intro p | 18px | 16px | `text-base md:text-lg` |
| `body-base` | p | 16px | 15px | `text-base` |
| `body-sm` | caption | 14px | 13px | `text-sm` |
| `eyebrow` | label | 11px | 10px | `text-[11px] tracking-[0.36em] uppercase` |

### 6.4 Line heights & tracking
| Use | Line-height | Letter-spacing |
|---|---|---|
| Display headings | 1.05 | -0.03em |
| Card headlines | 1.15 | -0.02em |
| Body text | 1.7 | 0 |
| Long-form prose | 1.85 | 0 |
| Eyebrow labels | 1.0 | 0.22em – 0.36em |

---

## 7. Spacing

Following Aman's "generous whitespace" discipline. **Never** crowd sections.

| Token | Value | Use |
|---|---|---|
| `xs` | 12px | Tight gaps inside chips/pills |
| `sm` | 24px | Card inner padding |
| `md` | 48px | Section internal rhythm |
| `lg` | 72px | Between content blocks |
| `xl` | 120px | **Default vertical section padding** |
| `2xl` | 180px | Hero-to-content breathing room |
| `3xl` | 240px | Between major story arcs |

**Container:** max `1440px`, side padding scales `20px → 32px → 64px` (mobile → tablet → desktop).

---

## 8. Shape

| Element | Radius | Token |
|---|---|---|
| **Every CTA** | `9999px` | `radii.pill` — pill, no exceptions |
| Cards | 10px | `radii.md` |
| Large cards / hero images | 16px | `radii.lg` |
| Chips, badges | `9999px` | `radii.pill` |
| Input fields | 10px | `radii.md` |
| Avatars | `9999px` | `radii.pill` |

> The Button component carries a `.gv-button` marker. Under retreat, **all** instances render as pills via a single CSS rule in `globals.css`.

---

## 9. Motion

| Pattern | Curve | Duration |
|---|---|---|
| Section reveal on scroll | `cubic-bezier(0.215, 0.61, 0.355, 1)` | 700ms |
| Card hover lift | same | 600ms |
| Image hover scale | same | 1400ms |
| Hero Ken Burns | linear/easeOut | 14–18s |
| Page transition | same | 800ms |

All motion uses framer-motion's `whileInView` with `viewport={{ once: true, margin: '-60px' }}`. **Always honor** `prefers-reduced-motion`.

---

## 10. Page narrative structure (Aman convention)

Every page tells a story with a defined arc. The homepage:

```
1. Arrival          → Hero (video, headline, "remember slow")
2. Place            → WhereYouAre (coordinates, geography)
3. Soul             → The Estate (the philosophy)
4. Time             → A Day Here (cinematic moments)
5. Senses           → The Senses (6 stories)
6. Cinematic pause  → Ambient Interlude (full-bleed video)
7. Climax           → Celebrations
8. Memory           → Quiet Pleasures (small details)
9. Family           → Giovanni Family (sister brands)
10. Closure         → Instagram + Footer
```

Inner pages follow a compressed version:
```
1. Arrival     → PageHero with script-accent on last word
2. Soul        → IntroBlock (single paragraph + signature accent)
3. Content     → SectionHeader-led blocks
4. Closure     → CTA section (brass pills on forest background)
```

---

## 11. Component primitives

| Component | Source | Notes |
|---|---|---|
| `Button` | `components/ui/Button.tsx` | `.gv-button` marker. Pills under retreat. Variants → primary/cta = brass with forest text; outline/cta-outline = brass border + brass text |
| `PageHero` | `components/themes/retreat/PageHero.tsx` (via dispatcher) | Auto-applies Hurricane to last word of title. Heavy gradient + 0.62 brightness filter on image for legibility |
| `SectionHeader` | `components/ui/SectionHeader.tsx` | Theme-aware. Under retreat, uses `display-italic` + last-word script |
| `IntroBlock` | `components/ui/IntroBlock.tsx` | Same convention as SectionHeader |
| `ScrollProgress` | `components/themes/retreat/ScrollProgress.tsx` | Hair-thin brass bar pinned at top |
| `VideoBlock` | `components/themes/retreat/VideoBlock.tsx` | Reusable looping silent bg-video w/ poster crossfade |
| `AmbientInterlude` | `components/themes/retreat/home/AmbientInterlude.tsx` | Full-bleed cinematic punctuation between sections |

---

## 12. Token implementation map

| Layer | Where |
|---|---|
| CSS custom properties | `app/globals.css` — `html.retreat { … }` block |
| TypeScript tokens | `lib/design-tokens.ts` |
| Font registrations | `app/layout.tsx` (`Onest`, `Hurricane` via `next/font/google`) |
| Component styling | Tailwind utility + arbitrary-value classes referencing CSS vars |

---

## 13. Do / Don't quick reference

| ✅ Do | ❌ Don't |
|---|---|
| Use Onest Light 300 for every heading | Use bold weights on headings — kills the voice |
| Single Hurricane accent per headline | Use script on 2+ words or in body text |
| Brass pills for every primary CTA | Forest pills on dark sections (same color = invisible) |
| Pair tokens per §5 (e.g. `surface` + `on-surface`) | Pick a hex out of context — defeats the system |
| `xl` (120px) vertical padding between sections | Crowd sections — luxury reads as breath |
| Strong dark gradient on every image hero | Trust the image alone — bright zones blow out white text |
| `text-white` on dark-section headings (utility wins) | Rely only on `color: inherit` — Tailwind utilities outrank our CSS |
| Reference semantic tokens (`var(--color-bg)`) | Hardcode hex values in components |

---

## 14. References

Conventions adopted from:
- **IBM Carbon** ([carbondesignsystem.com](https://carbondesignsystem.com/elements/color/overview/)) — token / role / theme / value vocabulary; layering model
- **Material Design 3** ([m3.material.io](https://m3.material.io/styles/color/roles)) — `on-{role}` pairing system; container / accent / surface roles
- **Aman Resorts** ([aman.com](https://www.aman.com)) — warm neutrals over pure white/black; serif body type; generous letter-spacing; photography-as-product; single-accent restraint

---

## 15. Changelog

| Date | Change |
|---|---|
| 2026-05-12 | v2 — restructured with three-layer token system (primitive → semantic → component), added approved pairings + WCAG contrast, narrative structure, references |
| 2026-05-11 | v1 — initial Retreat token + typography spec |
