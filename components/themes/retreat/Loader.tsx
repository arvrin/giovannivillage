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
    /* Transparent: the static pre-hydration splash (layout.tsx) owns the
       ivory backdrop AND the logo for the loader's whole lifetime — a second
       React-rendered logo would register as a late LCP candidate. This
       overlay only adds the greeting and progress bar on top; the spacer
       below reserves the logo's slot so the flex geometry matches. */
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className="h-24 md:h-32" aria-hidden />

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
