import type { Metadata, Viewport } from 'next';
import { Onest, Hurricane } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/data';
import ClientLayout from '@/components/providers/ClientLayout';

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
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
