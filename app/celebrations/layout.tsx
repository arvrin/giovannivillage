import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Private Celebrations',
  description:
    'Milestone birthdays, anniversaries, proposals and intimate gatherings at Giovanni Village Resort, Bhopal. A 20-person table under the trees, a private chef, lakeside dinners — the celebrations between weddings.',
  alternates: { canonical: '/celebrations' },
  openGraph: {
    title: 'Private Celebrations — Giovanni Village Resort',
    description:
      'The milestone the forest remembers. Small-table dinners, anniversary mornings and proposal evenings on a ten-acre estate.',
    url: '/celebrations',
    images: ['/images/weddings/cocktail-lawn.webp'],
  },
};

export default function CelebrationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
