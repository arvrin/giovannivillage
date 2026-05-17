'use client';

import { motion } from 'framer-motion';
import { Hotel, Leaf, Utensils, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { about } from '@/lib/data';

const icons = {
  hotel: Hotel,
  leaf: Leaf,
  utensils: Utensils,
  spa: Sparkles,
};

/**
 * Modernist About — asymmetric editorial spread.
 * Left: stacked numerical pillars with razor-thin dividers.
 * Right: anchor headline + body. No card backgrounds, just typography on space.
 */
const ModernistAbout = () => {
  return (
    <Section
      id="about"
      className="bg-[var(--color-bg-alt)] py-20 md:py-24 lg:py-28"
    >
      <Container maxWidth="wide">
        {/* Section meta */}
        <div className="mb-12 flex items-center gap-4">
          <span
            className="text-[10px] font-semibold uppercase text-[var(--color-text-tertiary)]"
            style={{ letterSpacing: '0.3em' }}
          >
            01 / The Estate
          </span>
          <span className="h-px flex-1 bg-[var(--color-border-strong)]" />
        </div>

        {/* Asymmetric two column */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-7 relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src="/images/about/landscape-1.webp"
              alt="Giovanni Village estate"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <span className="h-px w-6 bg-white" />
              <span
                className="text-[10px] font-medium uppercase text-white"
                style={{ letterSpacing: '0.3em' }}
              >
                Bhopal · MP · India
              </span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 lg:pt-6"
          >
            <h2
              className="text-[var(--color-text)] mb-8"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1,
              }}
            >
              A wildlife <span className="italic font-light">retreat</span> in the city of lakes.
            </h2>
            <div className="space-y-5 text-base md:text-lg text-[var(--color-text-secondary)]" style={{ lineHeight: 1.7 }}>
              {about.content.slice(0, 3).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Pillars / stats — modernist horizontal grid with dividers */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-16 md:mt-20 grid grid-cols-2 lg:grid-cols-4 border-y border-[var(--color-border-strong)]"
        >
          {about.highlights.map((h, i) => {
            const Icon = icons[h.icon as keyof typeof icons];
            return (
              <div
                key={h.title}
                className={`px-5 py-7 md:px-6 md:py-9 ${i > 0 ? 'lg:border-l border-[var(--color-border-strong)]' : ''} ${i % 2 === 1 ? 'border-l border-[var(--color-border-strong)] lg:border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0 border-[var(--color-border-strong)]' : ''}`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <Icon className="h-5 w-5 text-[var(--color-text-secondary)]" strokeWidth={1.5} />
                  <span
                    className="text-[10px] font-semibold text-[var(--color-text-tertiary)]"
                    style={{ letterSpacing: '0.3em' }}
                  >
                    0{i + 1}
                  </span>
                </div>
                <h3
                  className="text-[var(--color-text)] mb-2"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    fontSize: '0.95rem',
                    lineHeight: 1.3,
                  }}
                >
                  {h.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]" style={{ lineHeight: 1.55 }}>
                  {h.description}
                </p>
              </div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
};

export default ModernistAbout;
