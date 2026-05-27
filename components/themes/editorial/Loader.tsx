'use client';

import { motion } from 'framer-motion';

interface LoaderProps {
  progress: number;
}

/**
 * Editorial loader — warm cream backdrop, centered logo, bronze progress rule.
 */
const EditorialLoader = ({ progress }: LoaderProps) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-bg)]">
      <motion.img
        src="/images/logo/gvr-final-logo.webp"
        alt="Giovanni Village Resort"
        className="h-24 md:h-32 w-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.06))' }}
      />
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10 text-[10px] sm:text-xs font-semibold uppercase text-[var(--color-text-tertiary)]"
        style={{ letterSpacing: '0.4em' }}
      >
        Welcome
      </motion.p>
      <div className="mt-6 h-px w-48 sm:w-56 overflow-hidden bg-[var(--color-border)]">
        <motion.div
          className="h-full bg-[var(--color-accent)]"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default EditorialLoader;
