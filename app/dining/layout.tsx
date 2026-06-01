import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dining',
  description:
    'Three signature dining venues at Giovanni Village Resort — Gourmet By The Woods (fine dining), Pihu (rooftop telescope dinners), Gazebo by the Lake (intimate lakeside service). Farm-to-fire cuisine from Royalton Farms inside the estate.',
  alternates: { canonical: '/dining' },
  openGraph: {
    title: 'Dining at Giovanni Village Resort',
    description:
      'Three tables, one philosophy: produce from Royalton Farms, plated under our trees.',
    url: '/dining',
    images: ['/Gourmet-By-The-Woods.webp'],
  },
};

export default function DiningLayout({ children }: { children: React.ReactNode }) {
  return children;
}
