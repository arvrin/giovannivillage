'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import EditorialFooter from '@/components/themes/editorial/Footer';
import ModernistFooter from '@/components/themes/modernist/Footer';
import CinematicFooter from '@/components/themes/cinematic/Footer';

/**
 * Theme dispatcher for the site Footer. Same content, dramatically different
 * presentations across the three designs.
 */
const Footer = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <EditorialFooter />;
  if (theme === 'modernist') return <ModernistFooter />;
  if (theme === 'cinematic') return <CinematicFooter />;
  return <EditorialFooter />;
};

export default Footer;
