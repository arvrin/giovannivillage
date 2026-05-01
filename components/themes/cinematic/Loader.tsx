'use client';

import { motion } from 'framer-motion';

interface LoaderProps {
  progress: number;
}

/**
 * Cinematic loader — deep black with warm gold accents, dramatic Cormorant
 * wordmark, animated horizontal gold rule.
 */
const CinematicLoader = ({ progress }: LoaderProps) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Subtle radial gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(201,169,97,0.10)_0%,_rgba(0,0,0,0)_60%)]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
          className="h-px w-24 bg-[var(--color-accent)] mb-10 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[10px] font-medium uppercase text-[var(--color-accent)]/90"
          style={{ letterSpacing: '0.5em' }}
        >
          A Wildlife Sanctuary
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4 }}
          className="mt-8 text-white"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1,
          }}
        >
          Giovanni
          <span className="block italic font-extralight mt-1">Village</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.0, delay: 0.7 }}
          className="h-px w-24 bg-[var(--color-accent)] mt-10 origin-center"
        />
      </div>

      {/* Bottom progress */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-72 sm:w-80 text-center">
        <p
          className="text-[10px] font-medium uppercase text-[var(--color-accent)]/70 mb-3"
          style={{ letterSpacing: '0.4em' }}
        >
          Curtain Rises in {Math.max(1, Math.ceil((100 - progress) / 25))}s
        </p>
        <div className="h-px w-full bg-[var(--color-accent)]/15">
          <motion.div
            className="h-full bg-[var(--color-accent)]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
};

export default CinematicLoader;
