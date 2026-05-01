'use client';

import { useState, useEffect, memo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import EditorialLoader from '@/components/themes/editorial/Loader';
import ModernistLoader from '@/components/themes/modernist/Loader';
import CinematicLoader from '@/components/themes/cinematic/Loader';

/**
 * PageLoader — splash screen with two triggers:
 *   1) First visit of the session → full splash (waits for window.load + min display)
 *   2) Theme switch via the design toggle → brief flash of the new theme's loader
 *      so the client can preview each design's intro.
 *
 * The themed splash itself lives in components/themes/<theme>/Loader.tsx and is
 * picked by useTheme() at render time.
 */

const FIRST_VISIT_MIN_MS = 1400;
const FIRST_VISIT_HOLD_MS = 250;
const THEME_SWITCH_MS = 900;
const THEME_SWITCH_HOLD_MS = 180;

type ThemeName = 'editorial' | 'modernist' | 'cinematic';

const PageLoader = () => {
  const { theme, resolvedTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const prevThemeRef = useRef<string | null>(null);
  const initialEffectRanRef = useRef(false);
  const animRafRef = useRef<number | null>(null);
  const animTimerRef = useRef<number | null>(null);

  // Helper — run a progress animation, then hide.
  const runLoaderAnimation = (durationMs: number, holdMs: number) => {
    if (animRafRef.current) cancelAnimationFrame(animRafRef.current);
    if (animTimerRef.current) window.clearTimeout(animTimerRef.current);

    setProgress(0);
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, (elapsed / durationMs) * 100);
      setProgress(next);
      if (next < 100) {
        animRafRef.current = requestAnimationFrame(tick);
      } else {
        animTimerRef.current = window.setTimeout(() => setActive(false), holdMs);
      }
    };
    animRafRef.current = requestAnimationFrame(tick);
  };

  // First-visit splash
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('gv-loaded') === '1') return;

    sessionStorage.setItem('gv-loaded', '1');
    setActive(true);

    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const docReady = document.readyState === 'complete';
      const target = docReady ? 100 : Math.min(85, (elapsed / FIRST_VISIT_MIN_MS) * 100);
      setProgress((p) => (target > p ? p + Math.max(0.6, (target - p) * 0.18) : p));
      animRafRef.current = requestAnimationFrame(tick);
    };
    animRafRef.current = requestAnimationFrame(tick);

    const finish = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, FIRST_VISIT_MIN_MS - elapsed);
      animTimerRef.current = window.setTimeout(() => {
        setProgress(100);
        animTimerRef.current = window.setTimeout(() => setActive(false), FIRST_VISIT_HOLD_MS);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    return () => {
      if (animRafRef.current) cancelAnimationFrame(animRafRef.current);
      if (animTimerRef.current) window.clearTimeout(animTimerRef.current);
      window.removeEventListener('load', finish);
    };
  }, []);

  // Theme-switch flash
  useEffect(() => {
    const name = (theme || resolvedTheme || 'editorial') as ThemeName;

    // Skip the very first effect call (hydration); just record theme.
    if (!initialEffectRanRef.current) {
      initialEffectRanRef.current = true;
      prevThemeRef.current = name;
      return;
    }
    if (prevThemeRef.current === name) return;

    prevThemeRef.current = name;
    setActive(true);
    runLoaderAnimation(THEME_SWITCH_MS, THEME_SWITCH_HOLD_MS);
  }, [theme, resolvedTheme]);

  const which = (theme || resolvedTheme || 'editorial') as ThemeName;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          className="fixed inset-0 z-[100] pointer-events-auto"
        >
          {which === 'modernist' && <ModernistLoader progress={progress} />}
          {which === 'cinematic' && <CinematicLoader progress={progress} />}
          {(which === 'editorial' || (which !== 'modernist' && which !== 'cinematic')) && (
            <EditorialLoader progress={progress} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(PageLoader);
