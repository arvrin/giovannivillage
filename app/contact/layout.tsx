import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach Giovanni Village Resort, Bhopal — reservations, directions and enquiries. On Kolar Road at the edge of Ratapani Tiger Reserve, twenty minutes from the city.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — Giovanni Village Resort',
    description: 'Reservations, directions and enquiries for Giovanni Village, on the edge of Ratapani Tiger Reserve.',
    url: '/contact',
    images: ['/images/og/og-default.jpg'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
