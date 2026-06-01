import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reservations, weddings, events and general enquiries at Giovanni Village Resort, Bhopal. Call +91 90390 37300 or email reservations@giovannivillage.com.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Giovanni Village Resort',
    description: 'A line to your corner of the estate.',
    url: '/contact',
    images: ['/images/about/about-hero-original.webp'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
