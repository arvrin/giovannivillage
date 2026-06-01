import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meetings & Events',
  description:
    'Corporate offsites, conferences, brand activations and board meetings at Giovanni Village Resort, Bhopal. Five indoor air-conditioned halls (incl. the 9,500 sq ft pillarless Aria Grand) and seven outdoor settings, with AV, breakaway rooms and a dedicated events team.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Meetings & Events — Giovanni Village Resort',
    description:
      'A different rhythm from a conference centre — pillarless halls, breakaway rooms, full AV, and the estate after-hours.',
    url: '/events',
    images: ['/images/weddings/the-forum.webp'],
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
