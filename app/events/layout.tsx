import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meetings & Events',
  description:
    'Corporate meetings, conferences and offsites at Giovanni Village Resort, Bhopal — eleven venues from a lakeside boardroom to banquet halls and open lawns, with stay, dining and team experiences.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Meetings & Events — Giovanni Village Resort',
    description: 'Eleven venues for offsites and conferences — from a lakeside boardroom to open lawns, with stay and dining.',
    url: '/events',
    images: ['/images/og/og-default.jpg'],
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
