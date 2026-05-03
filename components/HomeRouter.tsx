'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Hero from '@/components/sections/Hero';

const About = dynamic(() => import('@/components/sections/About'));
const Rooms = dynamic(() => import('@/components/sections/Rooms'));
const Experiences = dynamic(() => import('@/components/sections/Experiences'));
const Weddings = dynamic(() => import('@/components/sections/Weddings'));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'));
const SisterProperties = dynamic(() => import('@/components/sections/SisterProperties'));
const RequestCallback = dynamic(() => import('@/components/sections/RequestCallback'));

const MonographHome = dynamic(() => import('@/components/themes/monograph/Home'));

/**
 * Picks the homepage section sequence by active theme.
 *  - Editorial / Modernist / Cinematic → existing 8-section home
 *  - Monograph → new experiential walkthrough (Hero → Land → Day → Moments →
 *    Stay → Spa → Celebrations → Plan)
 *
 * Renders the default home during SSR / first paint to avoid hydration
 * mismatches; swaps in MonographHome on mount when the theme matches.
 */
const HomeRouter = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (mounted && theme === 'monograph') {
    return <MonographHome />;
  }

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
};

export default HomeRouter;
