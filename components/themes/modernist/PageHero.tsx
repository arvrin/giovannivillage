'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Container from '@/components/ui/Container';

interface PageHeroProps {
  image: string;
  alt?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  height?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
  spacing?: 'none' | 'standard';
  className?: string;
  /** 2-digit numerical prefix shown above the title (Modernist signature). */
  index?: string;
}

/**
 * Modernist PageHero — asymmetric, sharp, bold.
 * Image and content sit side-by-side instead of overlapping. Title is set in
 * stacked uppercase with a numbered prefix.
 */
const ModernistPageHero = ({
  image,
  alt = '',
  eyebrow,
  title,
  description,
  children,
  spacing = 'standard',
  index,
}: PageHeroProps) => {
  return (
    <section
      className={cn(
        'relative w-full bg-[var(--color-bg)]',
        spacing === 'standard' ? 'mb-16 md:mb-24' : '',
      )}
    >
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-0 items-stretch">
        {/* Content column */}
        <Container className="lg:pl-12 lg:pr-12">
          <div className="flex h-full min-h-[420px] flex-col justify-end pt-32 md:pt-40 lg:pt-48 pb-12 md:pb-16">
            {(eyebrow || index) && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8 flex items-center gap-4"
              >
                {index && (
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-text-tertiary)]">
                    {index}
                  </span>
                )}
                {eyebrow && (
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-text-secondary)]">
                    {eyebrow}
                  </span>
                )}
                <span className="h-px flex-1 bg-[var(--color-border-strong)]" />
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[var(--color-text)]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--weight-heading)' as unknown as number,
                letterSpacing: 'var(--tracking-heading)',
                textTransform: 'var(--transform-heading)' as React.CSSProperties['textTransform'],
                fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
                lineHeight: 1,
              }}
            >
              {title}
            </motion.h1>

            {description && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-8 max-w-xl text-base md:text-lg text-[var(--color-text-secondary)]"
                style={{ lineHeight: 1.6 }}
              >
                {description}
              </motion.p>
            )}

            {children && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                {children}
              </motion.div>
            )}
          </div>
        </Container>

        {/* Image column */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[560px]"
        >
          <Image src={image} alt={alt} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 55vw" />
        </motion.div>
      </div>
    </section>
  );
};

export default ModernistPageHero;
