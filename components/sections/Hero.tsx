'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import EditorialHero from '@/components/themes/editorial/Hero';
import ModernistHero from '@/components/themes/modernist/Hero';
import CinematicHero from '@/components/themes/cinematic/Hero';

/**
 * Theme dispatcher for the homepage Hero. Picks the correct visual variant
 * based on the active theme. Falls back to editorial during SSR / first paint
 * to avoid hydration mismatches.
 */
const Hero = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <EditorialHero />;
  if (theme === 'modernist') return <ModernistHero />;
  if (theme === 'cinematic') return <CinematicHero />;
  return <EditorialHero />;
};

export default Hero;
