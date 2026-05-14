'use client';

import { ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Eyebrow from './Eyebrow';

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  size?: 'md' | 'lg';
  className?: string;
  eyebrowColor?: 'muted' | 'bronze' | 'white';
}

const titleSize = {
  md: 'text-3xl md:text-4xl lg:text-5xl',
  lg: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
};

/** When the title is a string under the retreat theme, render the last word
 *  in Hurricane brass-script to match the homepage signature. */
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

const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = 'center',
  size = 'lg',
  className,
  eyebrowColor = 'muted',
}: SectionHeaderProps) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const { theme } = useTheme();
  const isRetreat = theme === 'retreat';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
      className={cn('max-w-4xl', alignClass, className)}
    >
      {eyebrow && (
        <Eyebrow color={eyebrowColor} className="mb-6">
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          isRetreat ? 'display-italic text-[var(--color-text)]' : 'text-[var(--color-text-primary)]',
          titleSize[size],
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
      {description && (
        <p
          className={cn(
            'mt-6 text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)]',
            align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl',
          )}
          style={{ lineHeight: 1.7 }}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
