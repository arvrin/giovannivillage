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
    return [
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/our-rooms', destination: '/rooms', permanent: true },
      { source: '/accommodations', destination: '/rooms', permanent: true },
      { source: '/restaurant', destination: '/dining', permanent: true },
      { source: '/business-and-events', destination: '/weddings', permanent: true },
      { source: '/resort-experiences', destination: '/experiences', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/get-in-touch', destination: '/contact', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/terms-conditions', destination: '/terms', permanent: true },
      { source: '/return-refund-policy', destination: '/cancellation', permanent: true },
    ];
  },
};

export default nextConfig;
