import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

// Dynamically import non-critical sections for better code splitting
const About = dynamic(() => import('@/components/sections/About'));
const Rooms = dynamic(() => import('@/components/sections/Rooms'));
const Experiences = dynamic(() => import('@/components/sections/Experiences'));
const Weddings = dynamic(() => import('@/components/sections/Weddings'));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'));

/**
 * Giovanni Village Homepage - LUXURY EDITION
 * Ultra-premium five-star resort website
 * Benchmark: Aman Resorts, Six Senses, Four Seasons, Taj Hotels
 */
export default function Home() {
  return (
    <>
      {/* Fixed Navigation */}
      <Header />

      {/* Main Content */}
      <main className="overflow-hidden">
        {/* Hero - Full Viewport */}
        <Hero />

        {/* About - Centered Editorial */}
        <About />

        {/* Rooms - Asymmetric Layout */}
        <Rooms />

        {/* Experiences - Editorial Grid */}
        <Experiences />

        {/* Weddings - Full-Bleed Emotional */}
        <Weddings />

        {/* Testimonials - Quote Carousel */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </>
  );
}
