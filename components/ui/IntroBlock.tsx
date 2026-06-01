'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface IntroBlockProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Render the last word of a string title in Hurricane brass-script — matches
 *  the homepage's signature treatment. Skipped for ReactNode titles, where the
 *  caller is expected to compose the script accent themselves. */
const renderTitle = (title: ReactNode) => {
  if (typeof title !== 'string') return title;
  const trimmed = title.trim();
  const lastSpace = trimmed.lastIndexOf(' ');
  if (lastSpace <= 0) {
    return <span className="font-script">{trimmed}</span>;
  }
  return (
    <>
      {trimmed.slice(0, lastSpace)}{' '}
      <span className="font-script">{trimmed.slice(lastSpace + 1)}</span>
    </>
  );
};

const IntroBlock = ({ title, children, className }: IntroBlockProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
      className={cn('mx-auto max-w-4xl text-center', className)}
    >
      <h2
        className="display-italic text-3xl md:text-4xl lg:text-5xl mb-8 text-[var(--color-text)]"
        style={{ lineHeight: 1.05 }}
      >
        {renderTitle(title)}
      </h2>
      <div
        className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)] space-y-6"
        style={{ lineHeight: 1.8 }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default IntroBlock;
