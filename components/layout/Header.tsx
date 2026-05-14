'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import EditorialHeader from '@/components/themes/editorial/Header';
import ModernistHeader from '@/components/themes/modernist/Header';
import CinematicHeader from '@/components/themes/cinematic/Header';
import RetreatHeader from '@/components/themes/retreat/Header';

/**
 * Theme dispatcher for the site Header. Retreat is the production default;
 * the other variants remain in the codebase but are no longer reachable
 * from the live UI (no switcher mounted).
 */
const Header = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <RetreatHeader />;
  if (theme === 'editorial') return <EditorialHeader />;
  if (theme === 'modernist') return <ModernistHeader />;
  if (theme === 'cinematic') return <CinematicHeader />;
  return <RetreatHeader />;
};

export default Header;
