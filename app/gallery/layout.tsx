import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photography and video from across Giovanni Village Resort — the rooms, the dining venues, the spa, the Aria Grand, the wedding lawns, Ratapani safari days and the ambient films in between.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Gallery — Giovanni Village Resort',
    description: 'Frames from the estate.',
    url: '/gallery',
    images: ['/images/hero/hero-1.webp'],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
