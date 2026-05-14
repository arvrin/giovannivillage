import type { Metadata } from 'next';
import {
  Playfair_Display,
  Manrope,
  Bricolage_Grotesque,
  Inter_Tight,
  Cormorant_Garamond,
  Inter,
  Tenor_Sans,
  Fraunces,
  Onest,
  Hurricane,
} from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/data';
import ClientLayout from '@/components/providers/ClientLayout';

/* Editorial theme — current default. Refined editorial luxury (Aman / Capella). */
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-editorial-heading',
  display: 'swap',
});
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-editorial-body',
  display: 'swap',
});

/* Modernist theme — geometric architectural (Belmond / Bulgari / Mandarin). */
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-modernist-heading',
  display: 'swap',
});
const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-modernist-body',
  display: 'swap',
});

/* Cinematic theme — fashion-editorial dark luxe (EDITION / Faena / Soho House). */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cinematic-heading',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cinematic-body',
  display: 'swap',
});

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

/* Kept for backwards-compat with any retreat components still pointing at
   the older Fraunces/Tenor variables. Both resolve to Onest now. */
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-retreat-display',
  display: 'swap',
  axes: ['SOFT', 'opsz'],
});
const tenor = Tenor_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-retreat-label',
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

const fontVars = [
  playfair.variable,
  manrope.variable,
  bricolage.variable,
  interTight.variable,
  cormorant.variable,
  inter.variable,
  tenor.variable,
  fraunces.variable,
  onest.variable,
  hurricane.variable,
].join(' ');

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
