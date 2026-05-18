'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { CityStay } from '@/lib/city-stays';

const Nearby = ({ stay }: { stay: CityStay }) => {
  return (
    <section className="bg-[color:var(--color-bg)] py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-2xl"
        >
          <div className="mb-4 flex items-baseline gap-4">
            <span className="h-px w-12 bg-[color:var(--color-border-strong)]" />
            <span
              className="text-[11px] tracking-[0.36em] uppercase text-[color:var(--color-text-tertiary)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              Nearby
            </span>
          </div>
          <h2 className="display-italic text-3xl leading-[1.1] md:text-[2.6rem] md:leading-[1.05]">
            Reasons to <span className="font-script">leave</span> the room.
          </h2>
        </motion.div>

        <ul className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {stay.nearby.map((p, i) => (
            <motion.li
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="flex items-start gap-5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-bg-alt)] text-[color:var(--color-forest)]">
                <MapPin className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="display-italic text-xl leading-tight">{p.name}</h3>
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--color-text-tertiary)]"
                    style={{ fontFamily: 'var(--font-eyebrow)' }}
                  >
                    {p.distanceKm} km
                  </span>
                </div>
                <p
                  className="mt-1.5 text-[14px] leading-[1.7] text-[color:var(--color-text-secondary)]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {p.detail}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Nearby;
