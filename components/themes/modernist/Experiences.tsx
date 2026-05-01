'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { experiences } from '@/lib/data';

/**
 * Modernist Experiences — full-width row of four equal panels separated by
 * razor lines. Each panel has a square image, a numbered eyebrow, a title and
 * an arrow link. No rounded corners.
 */
const ModernistExperiences = () => {
  return (
    <Section id="experiences" className="bg-[var(--color-bg)] py-20 md:py-24 lg:py-28">
      <Container maxWidth="wide">
        <div className="mb-12 grid lg:grid-cols-12 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="text-[10px] font-semibold uppercase text-[var(--color-text-tertiary)]" style={{ letterSpacing: '0.3em' }}>
                03 / Experiences
              </span>
              <span className="h-px flex-1 bg-[var(--color-border-strong)]" />
            </div>
            <h2
              className="text-[var(--color-text)]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: 1,
              }}
            >
              Days <span className="italic font-light">designed</span> to be remembered.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 text-base md:text-lg text-[var(--color-text-secondary)]"
            style={{ lineHeight: 1.6 }}
          >
            From Ratapani safari mornings to telescope dinners at Pihu —
            twenty-plus curated rituals across the estate.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className="bg-[var(--color-bg)]"
            >
              <Link href="/experiences" className="group block">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <span
                    className="text-[10px] font-semibold uppercase text-[var(--color-text-tertiary)] block mb-3"
                    style={{ letterSpacing: '0.3em' }}
                  >
                    0{i + 1}
                  </span>
                  <h3
                    className="text-[var(--color-text)] mb-3"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      fontSize: '1.05rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {exp.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-5" style={{ lineHeight: 1.6 }}>
                    {exp.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors"
                    style={{ letterSpacing: '0.25em' }}
                  >
                    Explore
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/experiences"
            className="inline-flex items-center gap-3 border-b border-[var(--color-text)] pb-1 text-xs font-semibold uppercase text-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
            style={{ letterSpacing: '0.25em' }}
          >
            All 22 Experiences
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
};

export default ModernistExperiences;
