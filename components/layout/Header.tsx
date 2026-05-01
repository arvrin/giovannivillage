'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import EditorialHeader from '@/components/themes/editorial/Header';
import ModernistHeader from '@/components/themes/modernist/Header';
import CinematicHeader from '@/components/themes/cinematic/Header';

/**
 * Theme dispatcher for the site Header. Each theme has its own navigation
 * philosophy:
 *  - Editorial: centered logo + hamburger drawer
 *  - Modernist: top meta strip + horizontal nav + CTA
 *  - Cinematic: black mast + side drawer + dramatic wordmark
 */
const Header = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <EditorialHeader />;
  if (theme === 'modernist') return <ModernistHeader />;
  if (theme === 'cinematic') return <CinematicHeader />;
  return <EditorialHeader />;
};

export default Header;
