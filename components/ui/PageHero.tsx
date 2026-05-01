'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import EditorialPageHero from '@/components/themes/editorial/PageHero';
import ModernistPageHero from '@/components/themes/modernist/PageHero';
import CinematicPageHero from '@/components/themes/cinematic/PageHero';

interface PageHeroProps {
  image: string;
  alt?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  height?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
  spacing?: 'none' | 'standard';
  className?: string;
  /** Optional ordinal shown by Modernist (e.g. "01"). Other themes ignore. */
  index?: string;
}

/**
 * Theme dispatcher for interior page heroes. The three variants share a
 * common API but render dramatically different layouts.
 */
const PageHero = (props: PageHeroProps) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <EditorialPageHero {...props} />;
  if (theme === 'modernist') return <ModernistPageHero {...props} />;
  if (theme === 'cinematic') return <CinematicPageHero {...props} />;
  return <EditorialPageHero {...props} />;
};

export default PageHero;
