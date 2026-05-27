'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/**
 * Section 06 — Elysium. Spa as a single signature ritual, not a treatment
 * list. Asymmetric split with the spa hero image on one side and a quiet
 * column of copy + CTA on the other.
 */
const Elysium = () => {
  return (
    <section className="relative bg-[var(--color-bg-alt)] py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-12 md:gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
            className="md:col-span-6 lg:col-span-7 order-2 md:order-1"
          >
            <div className="relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/n1.webp"
                alt="An Elysium spa treatment at Giovanni Village"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, delay: 0.1 }}
            className="md:col-span-6 lg:col-span-5 order-1 md:order-2"
          >
            <p
              className="mb-5 text-[10px] sm:text-xs font-medium uppercase text-[var(--color-text-tertiary)]"
              style={{ letterSpacing: '0.3em' }}
            >
              — Elysium Spa
            </p>
            <h2
              className="text-[var(--color-text)]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                fontSize: 'clamp(2rem, 3.8vw, 3.25rem)',
                lineHeight: 1.1,
              }}
            >
              An hour at Elysium.
            </h2>
            <p
              className="mt-8 text-base md:text-lg text-[var(--color-text-secondary)]"
              style={{ lineHeight: 1.75, fontWeight: 300 }}
            >
              Frangipani in the air. Hands on the shoulders. The forest, just
              beyond the linen curtain. One ritual, distilled — pick yours when
              you arrive.
            </p>
            <div className="mt-10">
              <Link
                href="/spa"
                className="group inline-flex items-center gap-2 text-sm font-medium uppercase text-[var(--color-text)] hover:text-[var(--color-accent-hover)] transition-colors"
                style={{ letterSpacing: '0.25em' }}
              >
                Reserve a treatment
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Elysium;
