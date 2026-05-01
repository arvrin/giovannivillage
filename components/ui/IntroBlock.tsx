'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface IntroBlockProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

const IntroBlock = ({ title, children, className }: IntroBlockProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
    className={cn('mx-auto max-w-4xl text-center', className)}
  >
    <h2
      className="text-3xl md:text-4xl lg:text-5xl mb-8 text-[var(--color-text-primary)]"
      style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 'var(--weight-heading)' as unknown as number,
        letterSpacing: 'var(--tracking-heading)',
        textTransform: 'var(--transform-heading)' as React.CSSProperties['textTransform'],
        lineHeight: 1.1,
      }}
    >
      {title}
    </h2>
    <div
      className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)] space-y-6"
      style={{ lineHeight: 1.8 }}
    >
      {children}
    </div>
  </motion.div>
);

export default IntroBlock;
