import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'A photo gallery of Giovanni Village Resort, Bhopal — forest-view suites, dining venues, wedding lawns, the spa and the organic farm, on the edge of Ratapani Tiger Reserve.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Gallery — Giovanni Village Resort',
    description: 'Frames from the estate — suites, dining, wedding lawns, the spa and the farm.',
    url: '/gallery',
    images: ['/images/og/og-default.jpg'],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
