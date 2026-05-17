'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface Moment {
  id: string;
  hour: string;
  caption: string;
  image: string;
  alt: string;
}

const moments: Moment[] = [
  {
    id: 'sunrise',
    hour: 'Sunrise',
    caption: 'Yoga on the deck. Tea brought up.',
    image: '/images/experiences/landscapes/57.jpg',
    alt: 'Morning at Giovanni Village',
  },
  {
    id: 'morning',
    hour: 'Mid-morning',
    caption: 'Safari at Ratapani. A sambar deer at the edge of the road.',
    image: '/images/experiences/wildlife/safari-elephants.jpg',
    alt: 'Safari at Ratapani sanctuary',
  },
  {
    id: 'afternoon',
    hour: 'Afternoon',
    caption: 'Lakeside lunch at Pihu. Forest in every direction.',
    image: '/images/dining/pihu.webp',
    alt: 'Lakeside dining at Pihu',
  },
  {
    id: 'evening',
    hour: 'Evening',
    caption: 'An hour at Elysium. Frangipani in the air.',
    image: '/n1.jpg',
    alt: 'Spa treatment at Elysium',
  },
  {
    id: 'night',
    hour: 'Night',
    caption: 'Dinner under the stars at The Den.',
    image: '/images/dining/the-den.webp',
    alt: 'Evening dining at The Den',
  },
];

/**
 * Section 03 — A Day Here. Vertical timeline of five moments. Each moment is
 * a full-width image with a single line of caption beside an "hour marker."
 * The narrative spine of the walkthrough.
 */
const ADayHere = () => {
  return (
    <section className="relative bg-[var(--color-bg)] py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9 }}
          className="mb-16 text-center md:mb-24"
        >
          <p
            className="mb-5 text-[10px] sm:text-xs font-medium uppercase text-[var(--color-text-tertiary)]"
            style={{ letterSpacing: '0.3em' }}
          >
            — A walkthrough
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
            A day here.
          </h2>
          <p
            className="mt-6 mx-auto max-w-2xl text-base md:text-lg text-[var(--color-text-secondary)]"
            style={{ lineHeight: 1.7, fontWeight: 300 }}
          >
            From the first light on the deck to dinner beneath the stars — a
            slow, deliberate unfolding.
          </p>
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          {moments.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
              className={`grid gap-8 md:gap-12 lg:gap-16 md:grid-cols-12 ${
                i % 2 === 0 ? '' : 'md:[&>*:first-child]:order-2'
              }`}
            >
              <div className="md:col-span-7 lg:col-span-8">
                <div className="relative aspect-[4/3] md:aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={m.image}
                    alt={m.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-5 lg:col-span-4 flex md:items-end">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-px w-8 bg-[var(--color-text)]/40" />
                    <span
                      className="text-[10px] sm:text-xs font-medium uppercase text-[var(--color-text-secondary)]"
                      style={{ letterSpacing: '0.3em' }}
                    >
                      {String(i + 1).padStart(2, '0')} · {m.hour}
                    </span>
                  </div>
                  <p
                    className="text-[var(--color-text)] text-2xl md:text-3xl"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 500,
                      letterSpacing: '-0.01em',
                      lineHeight: 1.25,
                      fontStyle: 'italic',
                    }}
                  >
                    {m.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 flex items-center justify-center md:mt-32"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-sm font-medium uppercase text-[var(--color-text)] hover:text-[var(--color-accent-hover)] transition-colors"
            style={{ letterSpacing: '0.25em' }}
          >
            Plan a stay
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ADayHere;
