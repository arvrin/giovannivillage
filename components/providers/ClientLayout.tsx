'use client';

import { usePathname } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import PageLoader from '../ui/PageLoader';
import BackgroundMusic from '../ui/BackgroundMusic';

/**
 * Wraps the app in client-only providers.
 * Retreat is the production design. The other four themes (editorial,
 * modernist, cinematic, monograph) remain in the codebase but are no longer
 * reachable from the UI — the switcher widget is no longer mounted.
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/';
  // No ambient music inside the admin portal — it's a work tool.
  const isAdmin = pathname.startsWith('/admin');

  return (
    <ThemeProvider
      attribute="class"
      themes={['editorial', 'modernist', 'cinematic', 'monograph', 'retreat']}
      defaultTheme="retreat"
      enableSystem={false}
      storageKey="giovanni-theme"
    >
      <PageLoader />
      {children}
      {!isAdmin && <BackgroundMusic />}
    </ThemeProvider>
  );
}
