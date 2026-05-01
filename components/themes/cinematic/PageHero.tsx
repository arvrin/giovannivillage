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
}

const heightClass = {
  sm: 'h-[60vh] min-h-[440px]',
  md: 'h-[80vh] min-h-[560px]',
  lg: 'h-[88vh] min-h-[600px]',
};

/**
 * Cinematic PageHero — full-bleed dark, gold rule accents, dramatic centered
 * Cormorant uppercase title with italic emphasis.
 */
const CinematicPageHero = ({
  image,
  alt = '',
  eyebrow,
  title,
  description,
  height = 'md',
  children,
  spacing = 'standard',
  className,
}: PageHeroProps) => {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-black',
        heightClass[height],
        spacing === 'standard' ? 'mb-16 md:mb-20' : '',
        className,
      )}
    >
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="100vw"
        style={{ filter: 'brightness(0.78) saturate(0.95)' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.15)_0%,_rgba(0,0,0,0.4)_70%,_rgba(0,0,0,0.7)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

      <div className="absolute inset-0 flex items-center justify-center">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="mx-auto max-w-5xl text-center"
          >
            {eyebrow && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="mb-8 flex items-center justify-center gap-3"
              >
                <span className="h-px w-10 bg-[var(--color-accent)]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--color-accent)]">
                  {eyebrow}
                </span>
                <span className="h-px w-10 bg-[var(--color-accent)]" />
              </motion.div>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-white"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--weight-heading)' as unknown as number,
                letterSpacing: 'var(--tracking-heading)',
                textTransform: 'var(--transform-heading)' as React.CSSProperties['textTransform'],
                fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                lineHeight: 1.05,
                textShadow: '0 4px 24px rgba(0,0,0,0.6)',
              }}
            >
              {title}
            </motion.h1>
            {description && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.0, delay: 1.0 }}
                className="mt-8 mx-auto max-w-2xl text-base md:text-xl text-white/80"
                style={{ lineHeight: 1.7, fontWeight: 300 }}
              >
                {description}
              </motion.p>
            )}
            {children && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.2 }}
                className="mt-10 flex flex-wrap gap-4 justify-center"
              >
                {children}
              </motion.div>
            )}
          </motion.div>
        </Container>
      </div>
    </div>
  );
};

export default CinematicPageHero;
