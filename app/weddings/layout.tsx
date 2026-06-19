import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weddings',
  description:
    'Wedding venues at Giovanni Village Resort, Bhopal — twelve settings including five pillarless banquet halls (up to the 9,500 sq ft Aria Grand) and seven lakeside lawns, with an in-house planner, decor and catering.',
  alternates: { canonical: '/weddings' },
  openGraph: {
    title: 'Weddings & Celebrations — Giovanni Village Resort',
    description: 'Twelve venues — pillarless halls and lakeside lawns — with planner, decor and catering, on the edge of Ratapani.',
    url: '/weddings',
    images: ['/images/og/og-default.jpg'],
  },
};

export default function WeddingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
