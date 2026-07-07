import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Giovanni Village is a luxury wildlife resort on 23 acres at the edge of Ratapani Tiger Reserve, twenty minutes from Bhopal — mango groves, lily ponds, a working organic farm, and forest-view suites.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Giovanni Village — Luxury Wildlife Resort in Bhopal',
    description: 'Twenty-three acres on the edge of Ratapani Tiger Reserve — groves, lily ponds, a working farm, and forest-view suites.',
    url: '/about',
    images: ['/images/og/og-default.jpg'],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
