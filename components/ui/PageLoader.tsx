'use client';

import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import EditorialLoader from '@/components/themes/editorial/Loader';
import ModernistLoader from '@/components/themes/modernist/Loader';
import CinematicLoader from '@/components/themes/cinematic/Loader';

/**
 * PageLoader — once per session, fades in with a theme-aware splash and
 * cleanly dismisses when the page is ready. Each design has its own visual
 * identity (cream serif / ivory geometric / dark gold-rule cinematic).
 */
const MIN_DISPLAY_MS = 1400;
const HOLD_AFTER_LOAD_MS = 250;

const PageLoader = () => {
  const { theme, resolvedTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (sessionStorage.getItem('gv-loaded') === '1') {
      setActive(false);
      return;
    }
    sessionStorage.setItem('gv-loaded', '1');
    setActive(true);

    const startedAt = Date.now();
    let raf: number;

    const tick = () => {
      const elapsed = Date.now() - startedAt;
      const target = document.readyState === 'complete' ? 100 : Math.min(85, (elapsed / MIN_DISPLAY_MS) * 100);
      setProgress((p) => (target > p ? p + Math.max(0.6, (target - p) * 0.18) : p));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      window.setTimeout(() => {
        setProgress(100);
        window.setTimeout(() => setActive(false), HOLD_AFTER_LOAD_MS);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', finish);
    };
  }, []);

  const which = (theme || resolvedTheme || 'editorial') as 'editorial' | 'modernist' | 'cinematic';

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={which}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="fixed inset-0 z-[100]"
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
