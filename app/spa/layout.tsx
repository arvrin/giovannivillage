import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Elysium Spa',
  description:
    'Elysium Spa at Giovanni Village Resort, Bhopal — forest-oil massages, warm-stone therapies and couples\' treatments in a wellness sanctuary on the edge of Ratapani Tiger Reserve.',
  alternates: { canonical: '/spa' },
  openGraph: {
    title: 'Elysium Spa — Giovanni Village Resort',
    description: 'Forest oils, warm stone, unhurried hands — a spa built for the long way home.',
    url: '/spa',
    images: ['/images/og/og-default.jpg'],
  },
};

export default function SpaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
