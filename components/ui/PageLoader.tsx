'use client';

import { useState, useEffect, memo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RetreatLoader from '@/components/themes/retreat/Loader';

/**
 * PageLoader — single full-screen splash on the first visit of the session.
 * Returning visitors skip the splash and we dispatch `gv-loader-done` so
 * dependent UI (background music gesture-arm, scroll progress) can proceed.
 *
 * The theme is locked to retreat (see ClientLayout's forcedTheme), so this
 * loader is the only one we ship now. Removed the legacy editorial /
 * modernist / cinematic loader plumbing.
 */

const FIRST_VISIT_MIN_MS = 1400;
const FIRST_VISIT_HOLD_MS = 250;

const PageLoader = ({ disabled = false }: { disabled?: boolean }) => {
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const animRafRef = useRef<number | null>(null);
  const animTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Splash suppressed for this route (e.g. the /menus QR landing). Clear any
    // pre-hydration shade, mark the session loaded so no splash appears later,
    // and let dependent UI proceed — but never show the overlay.
    if (disabled) {
      document.documentElement.classList.remove('gv-pre-loading');
      try {
        sessionStorage.setItem('gv-loaded', '1');
      } catch {
        /* ignore */
      }
      window.dispatchEvent(new Event('gv-loader-done'));
      return;
    }

    // Returning visitor — no splash this session. Signal "loader done"
    // immediately so dependent UI (background music) can proceed.
    if (sessionStorage.getItem('gv-loaded') === '1') {
      // Returning visitor — make sure the pre-hydration shade is gone too.
      document.documentElement.classList.remove('gv-pre-loading');
      window.dispatchEvent(new Event('gv-loader-done'));
      return;
    }

    sessionStorage.setItem('gv-loaded', '1');
    setActive(true);
    // Once React's loader is mounted, drop the pre-hydration shade so it
    // doesn't double-tint the React overlay.
    document.documentElement.classList.remove('gv-pre-loading');

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
        animTimerRef.current = window.setTimeout(() => {
          setActive(false);
          window.dispatchEvent(new Event('gv-loader-done'));
        }, FIRST_VISIT_HOLD_MS);
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
  }, [disabled]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          className="fixed inset-0 z-[100] pointer-events-auto"
        >
          <RetreatLoader progress={progress} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(PageLoader);
