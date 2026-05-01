'use client';

import { ReactNode } from 'react';
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
        className={cn('text-[var(--color-text-primary)]', titleSize[size])}
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
