'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface SignatureMoment {
  id: string;
  index: string;
  title: string;
  caption: string;
  image: string;
  alt: string;
}

const signatureMoments: SignatureMoment[] = [
  {
    id: 'telescope',
    index: '01',
    title: 'Telescopic Dinners',
    caption:
      'Dinner under a working telescope on the rooftop at Pihu — the Milky Way overhead, a curated tasting menu in front of you.',
    image: '/images/dining/pihu.jpg',
    alt: 'Rooftop telescopic dining at Pihu',
  },
  {
    id: 'junior-chef',
    index: '02',
    title: 'Junior Chef',
    caption:
      'Children, in toques, at the kitchen pass. A two-hour lesson with our chef, ending in plated dishes the family eats together.',
    image: '/Gourmet-By-The-Woods.jpg',
    alt: 'Fine dining at Gourmet By The Woods — the Junior Chef experience',
  },
  {
    id: 'forest-trail',
    index: '03',
    title: 'Forest Trail with the Naturalist',
    caption:
      'A pre-dawn walk into Ratapani with someone who knows the names — bird calls, paw prints, the language of the forest.',
    image: '/images/experiences/wildlife/tiger-log.jpg',
    alt: 'Forest trail at Ratapani sanctuary',
  },
];

/**
 * Section 04 — Signature Moments. Three editorial vignettes (not a grid),
 * each presented as a full-width image + caption stripe. Cherry-picked from
 * the broader experience list.
 */
const SignatureMoments = () => {
  return (
    <section className="relative bg-[var(--color-bg-alt)] py-24 md:py-32 lg:py-40">
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
            — Three things only here
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
            Signature moments.
          </h2>
        </motion.div>

        <div className="space-y-20 md:space-y-32">
          {signatureMoments.map((m) => (
            <motion.article
              key={m.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <div className="relative aspect-[3/2] md:aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={m.image}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-12 md:gap-12">
                <div className="md:col-span-4">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[var(--color-text)]/40" />
                    <span
                      className="text-[10px] sm:text-xs font-medium uppercase text-[var(--color-text-secondary)]"
                      style={{ letterSpacing: '0.3em' }}
                    >
                      Moment {m.index}
                    </span>
                  </div>
                  <h3
                    className="mt-4 text-[var(--color-text)] text-2xl md:text-3xl"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2,
                    }}
                  >
                    {m.title}
                  </h3>
                </div>
                <p
                  className="md:col-span-8 text-base md:text-lg text-[var(--color-text-secondary)]"
                  style={{ lineHeight: 1.7, fontWeight: 300 }}
                >
                  {m.caption}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 flex items-center justify-center md:mt-32"
        >
          <Link
            href="/experiences"
            className="group inline-flex items-center gap-2 text-sm font-medium uppercase text-[var(--color-text)] hover:text-[var(--color-accent-hover)] transition-colors"
            style={{ letterSpacing: '0.25em' }}
          >
            Browse all experiences
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SignatureMoments;
