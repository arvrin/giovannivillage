import type { Metadata } from 'next';
import CityStayPage from '@/components/themes/retreat/city-stay/CityStayPage';
import { giovanniSuites } from '@/lib/city-stays';

export const metadata: Metadata = {
  title: 'Giovanni Suites — Boutique Homestay in Arera Colony, Bhopal',
  description:
    'A boutique homestay in Arera Colony, Bhopal — four named room categories (Amaltas, Gulmohar, Razz, Rangrez), breakfast included. By the family that runs Giovanni Village Resort. From ₹2,250/night.',
};

export default function SuitesPage() {
  return <CityStayPage stay={giovanniSuites} />;
}
