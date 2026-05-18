'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { CityStay } from '@/lib/city-stays';

const FromTheFamily = ({ stay }: { stay: CityStay }) => {
  return (
    <section className="bg-[color:var(--color-forest)] py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 md:grid-cols-12 md:gap-16 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="md:col-span-7"
        >
          <div className="mb-4 flex items-baseline gap-4">
            <span className="h-px w-12 bg-white/50" />
            <span
              className="text-[11px] tracking-[0.36em] uppercase text-white/70"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              From the family
            </span>
          </div>
          <h2 className="display-italic text-3xl leading-[1.1] md:text-5xl md:leading-[1.05]">
            By the same hands that built{' '}
            <span className="font-script">Giovanni</span> Village.
          </h2>
          <p
            className="mt-6 max-w-xl text-[15px] leading-[1.85] text-white/85 md:text-base"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {stay.name} is one of two boutique city homestays we keep in Bhopal —
            so guests visiting our resort on the edge of Ratapani Tiger Reserve
            can extend their stay into town without leaving the family. Same
            hospitality, smaller footprint, in the city instead of the forest.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-[11px] tracking-[0.28em] uppercase text-[color:var(--color-forest)] transition hover:bg-[color:var(--color-brass)] hover:text-white"
            style={{ fontFamily: 'var(--font-eyebrow)' }}
          >
            Visit Giovanni Village
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9 }}
          className="md:col-span-5"
        >
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-l border-white/25 pl-6">
            <div>
              <dt className="display-italic text-[2rem] leading-none" style={{ fontWeight: 400 }}>
                10
              </dt>
              <dd className="mt-2 text-[10px] tracking-[0.3em] uppercase text-white/70" style={{ fontFamily: 'var(--font-eyebrow)' }}>
                Acres at the Village
              </dd>
            </div>
            <div>
              <dt className="display-italic text-[2rem] leading-none" style={{ fontWeight: 400 }}>
                08
              </dt>
              <dd className="mt-2 text-[10px] tracking-[0.3em] uppercase text-white/70" style={{ fontFamily: 'var(--font-eyebrow)' }}>
                Forest-view suites
              </dd>
            </div>
            <div>
              <dt className="display-italic text-[2rem] leading-none" style={{ fontWeight: 400 }}>
                05
              </dt>
              <dd className="mt-2 text-[10px] tracking-[0.3em] uppercase text-white/70" style={{ fontFamily: 'var(--font-eyebrow)' }}>
                Wedding venues
              </dd>
            </div>
            <div>
              <dt className="display-italic text-[2rem] leading-none" style={{ fontWeight: 400 }}>
                04
              </dt>
              <dd className="mt-2 text-[10px] tracking-[0.3em] uppercase text-white/70" style={{ fontFamily: 'var(--font-eyebrow)' }}>
                Restaurants
              </dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
};

export default FromTheFamily;
