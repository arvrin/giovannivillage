import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Giovanni Village Resort — a luxury wildlife retreat on the edge of Ratapani Tiger Reserve, Bhopal. Ten acres of mango groves, lily ponds and lakeside paths; Royalton Farms inside the gates; a venture of Sudesh The Village Resort.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Giovanni Village Resort',
    description:
      'A house that learned to listen. Ten acres on the edge of Ratapani Tiger Reserve, with Royalton Farms inside the estate.',
    url: '/about',
    images: ['/images/about/about-hero-original.webp'],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
