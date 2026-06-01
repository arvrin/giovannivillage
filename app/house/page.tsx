import type { Metadata } from 'next';
import CityStayPage from '@/components/themes/retreat/city-stay/CityStayPage';
import { giovanniHouse } from '@/lib/city-stays';

export const metadata: Metadata = {
  title: 'Giovanni House — Boutique Homestay in Arera Colony, Bhopal',
  description:
    'A boutique homestay in Arera Colony, Bhopal — three categories of king suite, breakfast included. By the same family that runs Giovanni Village Resort. From ₹2,250/night.',
  alternates: { canonical: '/house' },
  openGraph: {
    title: 'Giovanni House — Boutique Homestay, Arera Colony, Bhopal',
    description:
      'A city address for the short business trip or the night before a wedding. The same hand-crafted hospitality as Giovanni Village, closer to the airport.',
    url: '/house',
    images: ['/images/city-stays/house/hero.webp'],
  },
};

export default function HousePage() {
  return <CityStayPage stay={giovanniHouse} />;
}
