import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weddings & Events',
  description:
    'Twelve event venues at Giovanni Village Resort — five indoor (incl. the 9,500 sq ft pillarless Aria Grand) and seven outdoor (incl. Sudesh I, Sudesh II, Cocktail Lawn, Gourmet Lake Side Lawn). Capacity from twenty guests to five thousand, with a dedicated planner.',
  alternates: { canonical: '/weddings' },
  openGraph: {
    title: 'Weddings & Events — Giovanni Village Resort',
    description:
      'Twelve venues, twenty ceremonies. From a 20-person mandap to a 5,000-guest reception, all on one estate.',
    url: '/weddings',
    images: ['/images/weddings/aria-grand-hall.webp'],
  },
};

export default function WeddingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
