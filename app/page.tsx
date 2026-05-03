import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomeRouter from '@/components/HomeRouter';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

/**
 * Giovanni Village Homepage
 * Section sequence is theme-aware (see HomeRouter).
 */
export default function Home() {
  return (
    <>
      <Header />

      <main className="overflow-hidden">
        <HomeRouter />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
