import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Elysium Spa',
  description:
    'Elysium Spa at Giovanni Village Resort — Ayurvedic therapies, signature massages, couple spa packages and pain-relief rituals. Forest oils, warm stone, and the unhurried hands. Bhopal\'s only wildlife-resort spa on the edge of Ratapani.',
  alternates: { canonical: '/spa' },
  openGraph: {
    title: 'Elysium Spa — Giovanni Village Resort',
    description: 'A long way home. Forest oils, warm stone, and the unhurried hands.',
    url: '/spa',
    images: ['/n1.webp'],
  },
};

export default function SpaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
