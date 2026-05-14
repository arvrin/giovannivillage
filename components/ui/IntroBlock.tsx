'use client';

import { ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface IntroBlockProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

const renderRetreatTitle = (title: ReactNode) => {
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
  const { theme } = useTheme();
  const isRetreat = theme === 'retreat';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
      className={cn('mx-auto max-w-4xl text-center', className)}
    >
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl mb-8',
          isRetreat ? 'display-italic text-[var(--color-text)]' : 'text-[var(--color-text-primary)]',
        )}
        style={
          isRetreat
            ? { lineHeight: 1.05 }
            : {
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--weight-heading)' as unknown as number,
                letterSpacing: 'var(--tracking-heading)',
                textTransform: 'var(--transform-heading)' as React.CSSProperties['textTransform'],
                lineHeight: 1.1,
              }
        }
      >
        {isRetreat ? renderRetreatTitle(title) : title}
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
