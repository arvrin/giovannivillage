'use client';

import { usePathname } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { MotionConfig } from 'framer-motion';
import PageLoader from '../ui/PageLoader';
import BackgroundMusic from '../ui/BackgroundMusic';

/**
 * Wraps the app in client-only providers.
 *
 * - ThemeProvider is locked to retreat (the only design that ships) but stays
 *   in the tree because a couple of components still read `useTheme()` for
 *   conditional styling.
 * - MotionConfig with `reducedMotion="user"` tells framer-motion to honour the
 *   OS-level prefers-reduced-motion preference — animations collapse to
 *   instant for users who've asked for it.
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/';
  // No ambient music inside the admin portal — it's a work tool.
  const isAdmin = pathname.startsWith('/admin');

  return (
    <ThemeProvider
      attribute="class"
      themes={['retreat']}
      defaultTheme="retreat"
      forcedTheme="retreat"
      enableSystem={false}
      storageKey="giovanni-theme"
    >
      <MotionConfig reducedMotion="user">
        <PageLoader />
        {children}
        {!isAdmin && <BackgroundMusic />}
      </MotionConfig>
    </ThemeProvider>
  );
}
