'use client';

import PageLoader from '../ui/PageLoader';

/**
 * ClientLayout - Wraps children with client-side components
 * Includes PageLoader for luxury splash screen
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageLoader />
      {children}
    </>
  );
}
