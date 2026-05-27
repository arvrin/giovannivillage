'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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

      {/* Logo + tagline */}
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <Image
            src="/images/logo/gvr-final-logo.webp"
            alt="Giovanni Village Resort"
            width={200}
            height={68}
            priority
            className="h-16 md:h-20 w-auto"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 text-[10px] font-medium uppercase text-[var(--color-text-tertiary)]"
          style={{ letterSpacing: '0.4em' }}
        >
          Resort & Spa
        </motion.p>
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
