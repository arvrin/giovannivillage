import type { Metadata } from 'next';
import CityStayPage from '@/components/themes/retreat/city-stay/CityStayPage';
import { giovanniSuites } from '@/lib/city-stays';

export const metadata: Metadata = {
  title: 'Giovanni Suites — Boutique Homestay in Arera Colony, Bhopal',
  description:
    'A boutique homestay in Arera Colony, Bhopal — four named room categories (Amaltas, Gulmohar, Razz, Rangrez), breakfast included. By the family that runs Giovanni Village Resort. From ₹2,250/night.',
  alternates: { canonical: '/suites' },
  openGraph: {
    title: 'Giovanni Suites — Boutique Homestay, Arera Colony, Bhopal',
    description:
      'Four rooms named for the trees and language of central India. Long weekends, family visits, wedding-guest stays — under one roof in Arera.',
    url: '/suites',
    images: ['/images/city-stays/suites/hero.webp'],
  },
};

export default function SuitesPage() {
  return <CityStayPage stay={giovanniSuites} />;
}
