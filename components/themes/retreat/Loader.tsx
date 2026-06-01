'use client';

import { motion } from 'framer-motion';

interface LoaderProps {
  progress: number;
}

/**
 * Retreat loader — ivory backdrop, slow zoom on logo, script greeting,
 * brass hairline progress. Matches the retreat tone of the public site.
 */
const RetreatLoader = ({ progress }: LoaderProps) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[color:var(--color-bg)]">
      <motion.img
        src="/images/logo/gvr-final-logo.webp"
        alt="Giovanni Village"
        className="h-24 md:h-32 w-auto"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.215, 0.61, 0.355, 1] }}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-10 flex flex-col items-center"
      >
        <span
          className="text-[10px] tracking-[0.42em] uppercase text-[color:var(--color-text-tertiary)]"
          style={{ fontFamily: 'var(--font-eyebrow)' }}
        >
          A soft welcome
        </span>
        <p
          className="mt-3 display-italic text-[1.6rem] md:text-[2rem] leading-none text-[color:var(--color-text)]"
          style={{ fontWeight: 300 }}
        >
          to <span className="font-script">Giovanni</span> Village
        </p>
      </motion.div>

      <div className="mt-12 h-px w-48 md:w-64 overflow-hidden bg-[color:var(--color-border)]">
        <motion.div
          className="h-full"
          style={{ background: 'var(--color-brass)' }}
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default RetreatLoader;
