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
