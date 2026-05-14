'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import EditorialFooter from '@/components/themes/editorial/Footer';
import ModernistFooter from '@/components/themes/modernist/Footer';
import CinematicFooter from '@/components/themes/cinematic/Footer';
import RetreatFooter from '@/components/themes/retreat/Footer';

/**
 * Theme dispatcher for the site Footer. Retreat is the production default.
 */
const Footer = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <RetreatFooter />;
  if (theme === 'editorial') return <EditorialFooter />;
  if (theme === 'modernist') return <ModernistFooter />;
  if (theme === 'cinematic') return <CinematicFooter />;
  return <RetreatFooter />;
};

export default Footer;
