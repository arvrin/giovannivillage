'use client';

import { motion } from 'framer-motion';

interface LoaderProps {
  progress: number;
}

/**
 * Modernist loader — pure ivory backdrop, all-caps wordmark, razor-thin
 * geometric line that draws horizontally as progress fills.
 */
const ModernistLoader = ({ progress }: LoaderProps) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-bg)]">
      {/* Top-left meta strip */}
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <span className="h-px w-8 bg-[var(--color-text)]" />
        <span
          className="text-[10px] font-medium uppercase text-[var(--color-text)]"
          style={{ letterSpacing: '0.4em' }}
        >
          01 / Loading
        </span>
      </div>

      {/* Top-right meta */}
      <div className="absolute top-8 right-8">
        <span
          className="text-[10px] font-medium uppercase text-[var(--color-text-tertiary)]"
          style={{ letterSpacing: '0.4em' }}
        >
          Bhopal · MP
        </span>
      </div>

      {/* Wordmark */}
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] font-medium uppercase text-[var(--color-text-tertiary)]"
          style={{ letterSpacing: '0.4em' }}
        >
          Resort & Spa
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-4 text-[var(--color-text)]"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 500,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            fontSize: 'clamp(1.75rem, 4.5vw, 3rem)',
            lineHeight: 1,
          }}
        >
          Giovanni Village
        </motion.h1>
      </div>

      {/* Progress line */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-72 sm:w-96">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-[10px] font-medium uppercase text-[var(--color-text-tertiary)]"
            style={{ letterSpacing: '0.3em' }}
          >
            Loading
          </span>
          <span className="text-[10px] font-medium tabular-nums text-[var(--color-text-tertiary)]">
            {String(Math.round(progress)).padStart(3, '0')}%
          </span>
        </div>
        <div className="h-px w-full bg-[var(--color-border)]">
          <motion.div
            className="h-full bg-[var(--color-text)]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ModernistLoader;
