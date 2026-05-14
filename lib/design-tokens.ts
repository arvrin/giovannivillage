/**
 * Giovanni Village Design System — RETREAT (5th & final design)
 *
 * Token architecture (mirrors `app/globals.css` and `DESIGN-SYSTEM.md`):
 *
 *   Layer 1 — PRIMITIVES   raw hex values, Tailwind-style scale.
 *                          Reference these ONLY in the semantic layer below.
 *   Layer 2 — SEMANTIC     role-based intent. Components use ONLY these.
 *
 * Pairings (which text token sits on which surface) are documented in
 * DESIGN-SYSTEM.md §5 with WCAG contrast ratios.
 */

// ─────────────────────────────────────────────────────────────────────────
// Layer 1: PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────

export const primitives = {
  ivory: {
    50:  '#FDFBF7',
  },
  champagne: {
    100: '#ECE3CB',
    200: '#DDCFAE',
    300: '#C4B492',
  },
  forest: {
    100: '#4A5550',
    500: '#2E3B2A',
    900: '#1F2A24',
    950: '#0F1A14',
  },
  brass: {
    300: '#E0C98C',
    500: '#C9A961',
    700: '#B08754',
    900: '#8B7355',
  },
  functional: {
    success: '#6B8E6B',
    error: '#A64B4B',
    whatsapp: '#25D366',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// Layer 2: SEMANTIC TOKENS
// ─────────────────────────────────────────────────────────────────────────

export const colors = {
  /** Surface tokens — backgrounds & large containers */
  surface: {
    default: primitives.ivory[50],          // page background
    alt: primitives.champagne[100],         // alternating section
    card: primitives.champagne[200],        // overlap card on cream
    inverse: primitives.forest[900],        // dark section
  },

  /** Text tokens — pair with surfaces (see DESIGN-SYSTEM §5) */
  text: {
    onSurface: primitives.forest[900],      // body on light
    onSurfaceMuted: primitives.forest[100], // long-form copy
    onSurfaceFaint: primitives.brass[900],  // eyebrows/captions
    onSurfaceInverse: primitives.ivory[50], // text on dark
  },

  /** Accent tokens — the CTA system */
  accent: {
    primary: primitives.brass[500],           // every primary pill
    primaryHover: primitives.brass[700],
    onPrimary: primitives.forest[900],        // text on primary
    secondary: primitives.forest[900],        // secondary CTA / dark fill
    onSecondary: primitives.ivory[50],
    scriptAccent: primitives.brass[500],      // Hurricane brass
  },

  /** Border & overlay tokens */
  border: {
    subtle: 'rgba(31, 42, 36, 0.18)',
    strong: 'rgba(31, 42, 36, 0.45)',
    overlay: 'rgba(15, 26, 20, 0.55)',
  },

  functional: primitives.functional,
} as const;

// ─────────────────────────────────────────────────────────────────────────
// Typography
// ─────────────────────────────────────────────────────────────────────────

export const typography = {
  fonts: {
    display: 'var(--font-retreat-sans)',
    body:    'var(--font-retreat-sans)',
    script:  'var(--font-retreat-script)',
    eyebrow: 'var(--font-retreat-sans)',
  },
  weights: {
    light: 300,      // display headings
    regular: 400,    // body
    medium: 500,     // labels, eyebrows
    semibold: 600,
  },
  scale: {
    displayHero: '5.5rem',
    displayLg:   '3.5rem',
    displayMd:   '2.5rem',
    displaySm:   '2rem',
    titleLg:     '1.75rem',
    titleMd:     '1.25rem',
    bodyLg:      '1.125rem',
    bodyBase:    '1rem',
    bodySm:      '0.875rem',
    eyebrow:     '0.6875rem',
  },
  lineHeights: {
    tight: 1.05,
    snug:  1.15,
    normal: 1.7,
    relaxed: 1.85,
  },
  letterSpacing: {
    display: '-0.03em',
    body:    '0',
    eyebrow: '0.22em',
    label:   '0.36em',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// Spacing, radii, shadows, motion
// ─────────────────────────────────────────────────────────────────────────

export const spacing = {
  xs:    '0.75rem',
  sm:    '1.5rem',
  md:    '3rem',
  lg:    '4.5rem',
  xl:    '7.5rem',
  '2xl': '11.25rem',
  '3xl': '15rem',
} as const;

export const radii = {
  sm:   '0.25rem',
  md:   '0.625rem',
  lg:   '1rem',
  pill: '9999px',
} as const;

export const shadows = {
  sm: '0 2px 10px rgba(46, 59, 42, 0.06)',
  md: '0 8px 28px rgba(46, 59, 42, 0.10)',
  lg: '0 16px 48px rgba(46, 59, 42, 0.16)',
} as const;

export const transitions = {
  base:    '600ms cubic-bezier(0.215, 0.61, 0.355, 1)',
  slow:    '900ms cubic-bezier(0.215, 0.61, 0.355, 1)',
  slowest: '1400ms cubic-bezier(0.215, 0.61, 0.355, 1)',
} as const;

export const breakpoints = {
  sm:    '640px',
  md:    '768px',
  lg:    '1024px',
  xl:    '1280px',
  '2xl': '1536px',
} as const;

export const zIndex = {
  base:   1,
  rail:   30,
  header: 50,
  drawer: 70,
  modal:  80,
  toast:  90,
} as const;

export const motion = {
  reveal: {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
  },
  imageReveal: {
    initial: { scale: 1.08 },
    animate: { scale: 1 },
    transition: { duration: 14, ease: 'easeOut' },
  },
  cardHover: { scale: 1.04 },
  stagger: { staggerChildren: 0.08, delayChildren: 0.05 },
} as const;

export const container = {
  maxWidth: '1440px',
  padding: {
    mobile:  '1.25rem',
    tablet:  '2rem',
    desktop: '4rem',
  },
} as const;
