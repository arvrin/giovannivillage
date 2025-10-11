/**
 * Giovanni Village Design System - LUXURY EDITION
 * Ultra-Premium design tokens for five-star luxury resort
 * Benchmark: Aman Resorts, Six Senses, Four Seasons, Taj Hotels
 */

export const colors = {
  // Primary Palette - Earthy Luxury (refined, warmer neutrals)
  primary: {
    champagne: '#E8DCC4',    // Lighter, warmer champagne
    ivory: '#FDFBF7',        // Warmer white (never pure #FFFFFF)
    bronze: '#8B7355',       // Deeper bronze
    charcoal: '#2A2826',     // Warmer black (never pure #000000)
  },

  // Accent Palette - Use SPARINGLY (2% of design for CTAs only)
  accent: {
    gold: '#C9A961',         // Muted, elegant gold
    clay: '#A67C52',         // Terracotta accent
    forestGreen: '#3A4F41',  // Deep, sophisticated green
  },

  // Background Layers (90% neutral tones)
  background: {
    primary: '#FDFBF7',      // Ivory - main background
    secondary: '#E8DCC4',    // Champagne - sections
    overlay: 'rgba(42, 40, 38, 0.6)', // Charcoal 60% - image overlays
  },

  // Text Hierarchy
  text: {
    primary: '#2A2826',      // Charcoal - main body text
    secondary: '#8B7355',    // Bronze - supporting text
    tertiary: '#A67C52',     // Clay - captions, small text
    inverse: '#FDFBF7',      // Ivory - text on dark backgrounds
  },

  // Functional Colors (refined, muted)
  functional: {
    success: '#6B8E6B',      // Muted green
    error: '#A64B4B',        // Muted red
    whatsapp: '#25d366',     // WhatsApp green (brand color)
  },
};

export const typography = {
  fonts: {
    heading: "'Playfair Display', serif",   // Editorial, elegant serif
    body: "'Manrope', sans-serif",          // Modern, clean sans-serif
  },

  // Luxury Typography Scale - Editorial Excellence
  sizes: {
    // Headings - Playfair Display (Larger, more impactful)
    h1: {
      mobile: '3rem',      // 48px (mobile)
      desktop: '6rem',     // 96px (desktop) - HERO IMPACT
    },
    h2: {
      mobile: '2.5rem',    // 40px
      desktop: '4rem',     // 64px - Section headings
    },
    h3: {
      mobile: '2rem',      // 32px
      desktop: '2.625rem', // 42px - Subsection headings
    },
    h4: {
      mobile: '1.5rem',    // 24px
      desktop: '1.875rem', // 30px
    },
    h5: {
      mobile: '1.25rem',   // 20px
      desktop: '1.5rem',   // 24px
    },

    // Body Text - Manrope (Generous, readable)
    body: {
      large: '1.375rem',   // 22px - Intro paragraphs
      base: '1.125rem',    // 18px - Standard body
      small: '0.875rem',   // 14px - Small text, uppercase labels
      caption: '0.75rem',  // 12px - Captions, letter-spacing: 2px
    },

    // Special Typography
    pullQuote: '2rem',     // 32px italic - Testimonials, quotes
  },

  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Generous Line Heights (1.7-1.8 for body)
  lineHeights: {
    tight: 1.2,          // Headings
    snug: 1.4,           // Subheadings
    normal: 1.7,         // Body text (luxury standard)
    relaxed: 1.8,        // Large body text
    loose: 2,            // Special cases
  },

  // Letter Spacing (uppercase elements)
  letterSpacing: {
    tight: '-0.025em',   // Large headings
    normal: '0',         // Body text
    wide: '0.5px',       // Small text
    wider: '1.5px',      // Button text
    widest: '2px',       // Uppercase captions
  },
};

// Luxury Spacing Scale - GENEROUS white space
export const spacing = {
  xs: '0.75rem',     // 12px
  sm: '1.5rem',      // 24px
  md: '3rem',        // 48px - Standard section spacing
  lg: '4.5rem',      // 72px
  xl: '7.5rem',      // 120px - Between major sections
  '2xl': '11.25rem', // 180px
  '3xl': '15rem',    // 240px - Hero sections
};

// Border Radius - Minimal (luxury is subtle)
export const borderRadius = {
  none: '0',
  sm: '0.125rem',  // 2px - Barely perceptible
  md: '0.25rem',   // 4px - Subtle
  lg: '0.5rem',    // 8px - Cards only
  full: '9999px',  // Circular elements
};

// Shadows - Soft & Subtle (using charcoal color)
export const shadows = {
  sm: '0 2px 8px rgba(42, 40, 38, 0.04)',
  md: '0 4px 20px rgba(42, 40, 38, 0.08)',
  lg: '0 8px 32px rgba(42, 40, 38, 0.12)',
  none: 'none',
};

// Transitions - Slow & Sophisticated (luxury easing)
export const transitions = {
  base: '600ms cubic-bezier(0.215, 0.61, 0.355, 1)',     // Hover states
  slow: '800ms cubic-bezier(0.215, 0.61, 0.355, 1)',     // Standard animations
  slowest: '1200ms cubic-bezier(0.215, 0.61, 0.355, 1)', // Page transitions, images
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const zIndex = {
  base: 1,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
};

// Luxury Animation Configurations - Subtle & Sophisticated
export const animations = {
  // Page transition (1.2s slow fade)
  page: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 1.2, ease: [0.215, 0.61, 0.355, 1] },
  },

  // Element reveal (fade + move up)
  reveal: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
  },

  // Image reveal (fade + subtle scale)
  image: {
    initial: { opacity: 0, scale: 1.05 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1.4, ease: [0.215, 0.61, 0.355, 1] },
  },

  // Hover state (subtle scale)
  hover: {
    scale: 1.02,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
  },

  // Stagger children (100-150ms delays)
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  },
};

// Content Constraints - Luxury Grid System
export const container = {
  maxWidth: '1440px',    // Maximum content width
  padding: {
    mobile: '1.5rem',    // 24px side padding (mobile)
    tablet: '5rem',      // 80px side padding (tablet)
    desktop: '7.5rem',   // 120px side padding (desktop)
  },
};
