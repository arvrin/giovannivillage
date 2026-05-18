import type { Metadata } from 'next';
import CityStayPage from '@/components/themes/retreat/city-stay/CityStayPage';
import { giovanniHouse } from '@/lib/city-stays';

export const metadata: Metadata = {
  title: 'Giovanni House — Boutique Homestay in Arera Colony, Bhopal',
  description:
    'Eight king suites in the leafiest pocket of Bhopal. By the same family that runs Giovanni Village Resort. From ₹2,250/night, breakfast included.',
};

export default function HousePage() {
  return <CityStayPage stay={giovanniHouse} />;
}
