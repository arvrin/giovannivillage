'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { sisterProperties } from '@/lib/data';

/**
 * Monograph "Stays by Giovanni" section. Two boutique city homes (Giovanni
 * House + Giovanni Suites) presented as a quiet aside before the closing
 * invitation — for the guest whose trip is about Bhopal city, not the resort.
 */
const StaysByGiovanni = () => {
  return (
    <section className="relative bg-[var(--color-bg-alt)] py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9 }}
          className="mb-14 max-w-3xl md:mb-20"
        >
          <p
            className="mb-5 text-[10px] sm:text-xs font-medium uppercase text-[var(--color-text-tertiary)]"
            style={{ letterSpacing: '0.3em' }}
          >
            — Stays by Giovanni
          </p>
          <h2
            className="text-[var(--color-text)]"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
            }}
          >
            Two more boutique homes, in the city.
          </h2>
          <p
            className="mt-6 max-w-xl text-base md:text-lg text-[var(--color-text-secondary)]"
            style={{ lineHeight: 1.7, fontWeight: 300 }}
          >
            If you&rsquo;re in Bhopal for a different reason — work, a wedding,
            a weekend — Giovanni House and Giovanni Suites in Arera Colony
            carry the same hospitality, in the heart of the city.
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          {sisterProperties.map((p, idx) => (
            <motion.a
              key={p.id}
              href={p.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: idx * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              className="group block"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-6">
                <p
                  className="mb-3 text-[10px] sm:text-xs font-medium uppercase text-[var(--color-text-secondary)]"
                  style={{ letterSpacing: '0.3em' }}
                >
                  {p.tagline}
                </p>
                <h3
                  className="text-[var(--color-text)] text-2xl md:text-3xl"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                  }}
                >
                  {p.name}
                </h3>
                <p
                  className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"
                  style={{ fontWeight: 300 }}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {p.location}
                </p>
                <p
                  className="mt-5 text-base text-[var(--color-text-secondary)]"
                  style={{ lineHeight: 1.7, fontWeight: 300 }}
                >
                  {p.description}
                </p>
                <span
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent-hover)]"
                  style={{ letterSpacing: '0.25em' }}
                >
                  Book {p.name}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaysByGiovanni;
