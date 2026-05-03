'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/**
 * Section 05 — The Stay. Single editorial card replacing the rooms grid.
 * Asymmetric split: full-bleed Royal Suite image, copy and CTA on a quiet
 * card to the right.
 */
const TheStay = () => {
  return (
    <section className="relative bg-[var(--color-bg)] py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9 }}
          className="mb-12 text-center md:mb-16"
        >
          <p
            className="mb-5 text-[10px] sm:text-xs font-medium uppercase text-[var(--color-text-tertiary)]"
            style={{ letterSpacing: '0.3em' }}
          >
            — Where you rest
          </p>
          <h2
            className="text-[var(--color-text)]"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)',
              lineHeight: 1.1,
            }}
          >
            Eight rooms. Eight ways to stay.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
          className="grid gap-0 md:grid-cols-12 md:gap-8 lg:gap-12"
        >
          <div className="md:col-span-8">
            <div className="relative aspect-[4/3] md:aspect-[16/10] w-full overflow-hidden">
              <Image
                src="/images/rooms/royal-suite.jpg"
                alt="Royal Suite at Giovanni Village — lakeside view"
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-4 flex md:items-center">
            <div className="bg-[var(--color-bg-alt)] p-8 md:p-10 lg:p-12 w-full">
              <p
                className="mb-5 text-[10px] sm:text-xs font-medium uppercase text-[var(--color-text-secondary)]"
                style={{ letterSpacing: '0.3em' }}
              >
                Eight suites
              </p>
              <p
                className="text-[var(--color-text)] text-base md:text-lg mb-8"
                style={{ lineHeight: 1.7, fontWeight: 300 }}
              >
                From open-to-sky plunge pools to lakeside Royal Suites — each
                room composed for a different kind of quiet.
              </p>
              <Link
                href="/rooms"
                className="group inline-flex items-center gap-2 text-sm font-medium uppercase text-[var(--color-text)] hover:text-[var(--color-accent-hover)] transition-colors"
                style={{ letterSpacing: '0.25em' }}
              >
                Choose your suite
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TheStay;
