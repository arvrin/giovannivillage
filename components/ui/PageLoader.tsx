'use client';

import { useEffect, memo } from 'react';

/**
 * PageLoader — bookkeeping for the first-visit splash.
 *
 * The splash itself is 100% static HTML + CSS (layout.tsx + globals.css):
 * it appears with the very first paint (its logo is the page's LCP element)
 * and dismisses itself via a compositor-driven CSS animation on a fixed
 * clock. Nothing about its lifecycle depends on React — on slow devices the
 * main thread can be pegged by hydration for many seconds, which used to
 * hold the old JS-driven curtain (and the site's LCP) hostage.
 *
 * All this component does now:
 *  - mark the session so returning navigations skip the splash entirely
 *    (the inline script in layout.tsx reads the same flag pre-paint), and
 *  - remove the splash classes after its CSS fade has finished (harmless if
 *    late — the animation ends in `visibility: hidden` regardless).
 */

/** Splash lifetime from CSS apply: 1.6s hold + 0.5s fade (globals.css). */
const SPLASH_TOTAL_MS = 2100;

const PageLoader = ({ disabled = false }: { disabled?: boolean }) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Splash suppressed for this route (e.g. the /menus QR landing). Clear
    // any pre-hydration splash and mark the session loaded so no splash
    // appears later either.
    if (disabled) {
      document.documentElement.classList.remove('gv-pre-loading');
      try {
        sessionStorage.setItem('gv-loaded', '1');
      } catch {
        /* ignore */
      }
      return;
    }

    // Returning visitor — the inline script never added the class, but make
    // sure regardless.
    if (sessionStorage.getItem('gv-loaded') === '1') {
      document.documentElement.classList.remove('gv-pre-loading');
      return;
    }

    sessionStorage.setItem('gv-loaded', '1');

    // Tidy the classes once the CSS self-dismissal is over. Timing is
    // best-effort: the animation has already hidden the splash, so a timer
    // delayed by a busy main thread costs nothing visible.
    const remaining = Math.max(0, SPLASH_TOTAL_MS - performance.now()) + 600;
    const t = window.setTimeout(() => {
      document.documentElement.classList.remove('gv-pre-loading');
    }, remaining);
    return () => window.clearTimeout(t);
  }, [disabled]);

  return null;
};

export default memo(PageLoader);
