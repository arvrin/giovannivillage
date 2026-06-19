import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dining',
  description:
    'Three dining venues at Giovanni Village Resort, Bhopal — Gourmet By The Woods (fine dining under the forest canopy), Pihu (rooftop telescope dinners) and Gazebo by the Lake. Farm-to-table from our own Royalton organic farm.',
  alternates: { canonical: '/dining' },
  openGraph: {
    title: 'Dining — Giovanni Village Resort',
    description: 'Three forest-and-lake dining venues, telescope dinners, and farm-to-table cooking from our own organic farm.',
    url: '/dining',
    images: ['/images/og/og-default.jpg'],
  },
};

export default function DiningLayout({ children }: { children: React.ReactNode }) {
  return children;
}
