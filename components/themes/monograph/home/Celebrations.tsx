'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/**
 * Section 07 — Celebrations. A single wedding moment, not a venue grid.
 * Full-bleed image with overlay headline and one CTA.
 */
const Celebrations = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-bg-deep)]">
      <div className="relative h-[80vh] min-h-[560px] w-full">
        <Image
          src="/images/weddings/hero.jpg"
          alt="A wedding celebration at Giovanni Village"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ filter: 'brightness(0.78)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(15,26,20,0.2) 0%, rgba(15,26,20,0.0) 30%, rgba(15,26,20,0.6) 100%)',
          }}
        />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-6 pb-16 md:pb-24 lg:pb-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
              className="max-w-2xl"
            >
              <p
                className="mb-6 text-[10px] sm:text-xs font-medium uppercase text-white/80"
                style={{ letterSpacing: '0.3em' }}
              >
                — Celebrations
              </p>
              <h2
                className="text-white"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  fontSize: 'clamp(2rem, 4.2vw, 3.75rem)',
                  lineHeight: 1.1,
                  textShadow: '0 4px 24px rgba(0,0,0,0.45)',
                }}
              >
                Say yes, in the lap of nature.
              </h2>
              <p
                className="mt-8 max-w-xl text-base md:text-lg text-white/85"
                style={{ lineHeight: 1.7, fontWeight: 300 }}
              >
                Pillarless banquet halls. Lakeside pheras at sunset. Cocktail
                evenings under the stars. Six venues. One unforgettable day.
              </p>
              <div className="mt-10">
                <Link
                  href="/weddings"
                  className="group inline-flex items-center gap-2 text-sm font-medium uppercase text-white hover:text-[var(--color-bg-alt)] transition-colors"
                  style={{ letterSpacing: '0.25em' }}
                >
                  Plan your celebration
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Celebrations;
