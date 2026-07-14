import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'giovannivillage.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    // Security headers applied to every response. CSP is intentionally
    // skipped for now — Next.js + Framer Motion + inline styles + the
    // Google Maps iframe on /contact would all require either nonces
    // (complex) or 'unsafe-inline' (no real win). Revisit when there's a
    // change that makes it worth the audit.
    const securityHeaders = [
      // Force HTTPS for 2 years, with subdomains. Preload-eligible.
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      // Prevent clickjacking by disallowing cross-origin frame embedding.
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      // Don't sniff content types — closes MIME-confusion vectors.
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      // Send full referrer to same-origin; only the origin for cross-origin.
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      // Disable browser features we don't use — surface-area reduction.
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()',
      },
    ];
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    // 301s from the old WordPress URLs (giovannivillage.com) to the new routes,
    // so search rankings and inbound links survive the cutover. Sourced from
    // the WP export's published pages + nav menu. Next normalises trailing
    // slashes, so `/about-us/` matches `/about-us` here.
    return [
      // ── Top-level content pages ─────────────────────────────────────────
      { source: '/home', destination: '/', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/our-rooms', destination: '/rooms', permanent: true },
      { source: '/accommodations', destination: '/rooms', permanent: true },
      { source: '/accommodations-2', destination: '/rooms', permanent: true },
      { source: '/restaurant', destination: '/dining', permanent: true },
      // "Business and Events" was the old MICE/corporate page → new meetings page.
      { source: '/business-and-events', destination: '/events', permanent: true },
      { source: '/resort-experiences', destination: '/experiences', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/get-in-touch', destination: '/contact', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/terms-conditions', destination: '/terms', permanent: true },
      { source: '/return-refund-policy', destination: '/cancellation', permanent: true },

      // ── Named venue / dining / spa pages (had their own URLs + rankings) ─
      { source: '/aria', destination: '/venues/aria-grand', permanent: true },
      { source: '/the-forum', destination: '/venues/the-forum', permanent: true },
      { source: '/sudesh-lawns', destination: '/venues', permanent: true },
      { source: '/elysium-the-spa', destination: '/spa', permanent: true },
      { source: '/jungle-safari', destination: '/blog/ratapani-tiger-reserve-guide', permanent: true },
      { source: '/pihu', destination: '/dining', permanent: true },
      { source: '/gourmet-by-the-woods', destination: '/dining', permanent: true },
      { source: '/berry-and-beans', destination: '/dining', permanent: true },
      { source: '/the-den', destination: '/dining', permanent: true },

      // ── Per-room slug remaps (old WP room slugs → new room ids) ──────────
      { source: '/rooms/king-room-pool-view-garden-view', destination: '/rooms/king-room-pool-garden', permanent: true },
      { source: '/rooms/king-room-with-private-garden', destination: '/rooms/king-room-private-garden', permanent: true },
      { source: '/rooms/junior-suite-with-private-garden', destination: '/rooms/junior-suite-deck-private-garden', permanent: true },
      { source: '/rooms/junior-suite-with-private-balcony-and-garden-view', destination: '/rooms/junior-suite-deck-garden', permanent: true },
      { source: '/rooms/royal-suite-with-plunge-pool-and-private-garden', destination: '/rooms/royal-suite-plunge-pool', permanent: true },
      { source: '/rooms/presidential-suite-with-plunge-pool-and-private-garden', destination: '/rooms/royal-suite-plunge-pool', permanent: true },
      { source: '/rooms/master-suite-with-lake-view', destination: '/rooms/master-suite-bath-tub', permanent: true },
      { source: '/rooms/master-suite-with-plunge-pool', destination: '/rooms/master-suite-bath-tub', permanent: true },

      // ── Old WooCommerce / booking-engine pages → booking-intent route ────
      { source: '/booking', destination: '/rooms', permanent: true },
      { source: '/search-availability', destination: '/rooms', permanent: true },
      { source: '/search-availability-2', destination: '/rooms', permanent: true },
      { source: '/shop', destination: '/rooms', permanent: true },
      { source: '/cart', destination: '/rooms', permanent: true },
      { source: '/checkout', destination: '/rooms', permanent: true },
    ];
  },
};

export default nextConfig;
