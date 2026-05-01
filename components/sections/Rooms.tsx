'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import EditorialRooms from '@/components/themes/editorial/Rooms';
import ModernistRooms from '@/components/themes/modernist/Rooms';
import CinematicRooms from '@/components/themes/cinematic/Rooms';

const Rooms = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <EditorialRooms />;
  if (theme === 'modernist') return <ModernistRooms />;
  if (theme === 'cinematic') return <CinematicRooms />;
  return <EditorialRooms />;
};

export default Rooms;
