import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Royalton Farms',
  description:
    'The working organic farm inside Giovanni Village Resort, Bhopal — fields, dairy, henhouse and orchards that quietly supply our three kitchens. Farm tours, 4:30 PM milking walks, and farm-to-table breakfasts open to staying guests.',
  alternates: { canonical: '/royalton' },
  openGraph: {
    title: 'Royalton Farms — the organic farm inside Giovanni Village',
    description:
      'A working farm, not a tourist attraction first. The slow, careful supply chain behind every plate at Giovanni Village.',
    url: '/royalton',
    images: ['/images/experiences/farm-produce.webp'],
  },
};

export default function RoyaltonLayout({ children }: { children: React.ReactNode }) {
  return children;
}
