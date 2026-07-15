import type { Metadata, Viewport } from 'next';
import { Onest, Hurricane } from 'next/font/google';
import './globals.css';
import { siteConfig, INDEXABLE } from '@/lib/data';
import ClientLayout from '@/components/providers/ClientLayout';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';

/* Retreat theme — Onest (clean modern sans, variable) for body/headings;
   Hurricane (handwritten script) for signature accent words. */
const onest = Onest({
  subsets: ['latin'],
  variable: '--font-retreat-sans',
  display: 'swap',
});
const hurricane = Hurricane({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-retreat-script',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s — Giovanni Village Resort',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: 'Giovanni Village Resort',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: '/images/og/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Aerial view of Giovanni Village Resort',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/images/og/og-default.jpg'],
  },
  robots: {
    index: INDEXABLE,
    follow: INDEXABLE,
    googleBot: {
      index: INDEXABLE,
      follow: INDEXABLE,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Giovanni Village Resort' }],
  creator: 'Giovanni Village Resort',
  publisher: 'A Venture of Sudesh The Village Resort',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8F6F1' },
    { media: '(prefers-color-scheme: dark)', color: '#1F2A24' },
  ],
};

const fontVars = [onest.variable, hurricane.variable].join(' ');

/* Inline script — runs synchronously before <body> parses. If this is a
   first-visit session, marks <html> so the CSS in globals.css can hide page
   content until the React loader takes over. Prevents the hero from
   flashing before the splash. Skipped on /menus (the QR landing page loads
   instantly with no splash). */
const preLoaderScript = `(function(){try{if(sessionStorage.getItem('gv-loaded')!=='1'&&location.pathname.indexOf('/menus')!==0){document.documentElement.classList.add('gv-pre-loading');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preLoaderScript }} />
        {/* Observatory monitoring pixel */}
        <script
          src="https://observatory.goodmantech.co/api/pixel/proj_giovanni-village_mqrucjhq"
          async
        />
      </head>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
