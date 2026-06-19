import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RetreatHome from '@/components/themes/retreat/Home';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { HotelSchema, OrganizationSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  // Title intentionally left undefined so the root `metadata.title.default`
  // is used (Giovanni Village Resort — Best Luxury Wildlife Resort in Bhopal)
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
  },
};

/**
 * Giovanni Village homepage. Retreat is the only design that ships.
 */
export default function Home() {
  return (
    <>
      <HotelSchema />
      <OrganizationSchema />
      <Header />

      <main className="overflow-hidden">
        <RetreatHome />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
