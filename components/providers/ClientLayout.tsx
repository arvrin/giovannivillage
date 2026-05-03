'use client';

import { ThemeProvider } from 'next-themes';
import PageLoader from '../ui/PageLoader';
import ThemeSwitcher from '../ThemeSwitcher';

/**
 * Wraps the app in client-only providers:
 * - next-themes: persistent design-toggle between Editorial / Modernist / Cinematic
 * - PageLoader: initial splash
 * - ThemeSwitcher: floating preview widget (auto-hides for non-preview deploys)
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      themes={['editorial', 'modernist', 'cinematic', 'monograph']}
      defaultTheme="editorial"
      enableSystem={false}
      storageKey="giovanni-theme"
    >
      <PageLoader />
      {children}
      <ThemeSwitcher />
    </ThemeProvider>
  );
}
