'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import RetreatHome from '@/components/themes/retreat/Home';

const Hero = dynamic(() => import('@/components/sections/Hero'));
const About = dynamic(() => import('@/components/sections/About'));
const Rooms = dynamic(() => import('@/components/sections/Rooms'));
const Experiences = dynamic(() => import('@/components/sections/Experiences'));
const Weddings = dynamic(() => import('@/components/sections/Weddings'));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'));
const SisterProperties = dynamic(() => import('@/components/sections/SisterProperties'));
const RequestCallback = dynamic(() => import('@/components/sections/RequestCallback'));

const MonographHome = dynamic(() => import('@/components/themes/monograph/Home'));

/**
 * Homepage dispatcher. Retreat is the production default.
 * Editorial / Modernist / Cinematic share the legacy 8-section home;
 * Monograph and Retreat each render their own bespoke flow.
 */
const HomeRouter = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // SSR / first paint = retreat (the default theme), avoid hydration mismatch
  if (!mounted) return <RetreatHome />;

  if (theme === 'monograph') return <MonographHome />;
  if (theme === 'editorial' || theme === 'modernist' || theme === 'cinematic') {
    return (
      <>
        <Hero />
        <About />
        <Rooms />
        <Experiences />
        <Weddings />
        <Testimonials />
        <SisterProperties />
        <RequestCallback />
      </>
    );
  }

  return <RetreatHome />;
};

export default HomeRouter;
