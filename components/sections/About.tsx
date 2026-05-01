'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import EditorialAbout from '@/components/themes/editorial/About';
import ModernistAbout from '@/components/themes/modernist/About';
import CinematicAbout from '@/components/themes/cinematic/About';

const About = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <EditorialAbout />;
  if (theme === 'modernist') return <ModernistAbout />;
  if (theme === 'cinematic') return <CinematicAbout />;
  return <EditorialAbout />;
};

export default About;
