'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import EditorialExperiences from '@/components/themes/editorial/Experiences';
import ModernistExperiences from '@/components/themes/modernist/Experiences';
import CinematicExperiences from '@/components/themes/cinematic/Experiences';

const Experiences = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <EditorialExperiences />;
  if (theme === 'modernist') return <ModernistExperiences />;
  if (theme === 'cinematic') return <CinematicExperiences />;
  return <EditorialExperiences />;
};

export default Experiences;
