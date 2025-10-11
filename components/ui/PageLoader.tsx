'use client';

import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PageLoader - LUXURY SPLASH SCREEN - EXPERT EDITION
 * Shows centered logo while page loads
 * Logo smoothly transitions to navbar position with perfect timing
 */
const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (hasVisited) {
      // Skip loader if already visited in this session
      setIsLoading(false);
      setShowContent(true);
      return;
    }

    // Mark as visited for this session
    sessionStorage.setItem('hasVisited', 'true');
    setIsLoading(true);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Wait for actual page load + minimum display time
    const handleLoad = () => {
      setProgress(100);
      const startTime = Date.now();
      const minDisplayTime = 2000;

      const timeElapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - timeElapsed);

      setTimeout(() => {
        setIsLoading(false);
        // Delay showing main content until logo has transitioned
        setTimeout(() => setShowContent(true), 600);
      }, remainingTime + 500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.215, 0.61, 0.355, 1],
            delay: 1.0 // Background fades AFTER logo starts moving
          }}
          className="fixed inset-0 z-[100] bg-[var(--color-ivory)]"
        >
          {/* Centered Container for Initial Logo Position */}
          <div className="absolute inset-0 flex items-center justify-center">

            {/* Logo - NO WRAPPER, Direct layoutId transition */}
            <motion.img
              layoutId="main-logo"
              src="/images/logo/gvr-final-logo.png"
              alt="Giovanni Village Resort"
              className="h-48 w-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.215, 0.61, 0.355, 1],
                delay: 0.2
              }}
              style={{
                filter: 'drop-shadow(0 8px 32px rgba(0, 0, 0, 0.08))',
              }}
            />

            {/* Supporting Elements - Positioned Absolutely Below Logo */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center"
              style={{ marginTop: '140px' }} // Below the h-48 logo
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.215, 0.61, 0.355, 1]
              }}
            >
              {/* Elegant Loading Text */}
              <motion.p
                className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-6"
                style={{ letterSpacing: '2.5px' }}
              >
                Welcome
              </motion.p>

              {/* Progress Bar */}
              <div className="w-64 h-px bg-[var(--color-champagne)]/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--color-bronze)]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          </div>

          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-champagne) 1px, transparent 0)`,
                backgroundSize: '48px 48px',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(PageLoader);
