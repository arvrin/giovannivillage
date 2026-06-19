import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Private Celebrations',
  description:
    'Intimate private celebrations at Giovanni Village Resort, Bhopal — birthdays, anniversaries and milestone evenings across six settings, between the lake and the forest, with bespoke menus and decor.',
  alternates: { canonical: '/celebrations' },
  openGraph: {
    title: 'Private Celebrations — Giovanni Village Resort',
    description: 'Intimate milestone evenings — six settings between lake and forest, with bespoke menus and decor.',
    url: '/celebrations',
    images: ['/images/og/og-default.jpg'],
  },
};

export default function CelebrationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
