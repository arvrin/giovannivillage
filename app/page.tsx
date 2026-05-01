import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const About = dynamic(() => import('@/components/sections/About'));
const Rooms = dynamic(() => import('@/components/sections/Rooms'));
const Experiences = dynamic(() => import('@/components/sections/Experiences'));
const Weddings = dynamic(() => import('@/components/sections/Weddings'));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'));
const SisterProperties = dynamic(() => import('@/components/sections/SisterProperties'));
const RequestCallback = dynamic(() => import('@/components/sections/RequestCallback'));

/**
 * Giovanni Village Homepage
 */
export default function Home() {
  return (
    <>
      <Header />

      <main className="overflow-hidden">
        <Hero />
        <About />
        <Rooms />
        <Experiences />
        <Weddings />
        <Testimonials />
        <SisterProperties />
        <RequestCallback />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
