'use client';

import { motion } from 'framer-motion';
import type { CityStay } from '@/lib/city-stays';

const WhereItSits = ({ stay }: { stay: CityStay }) => {
  return (
    <section className="bg-[color:var(--color-bg)] py-20 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-baseline gap-4"
        >
          <span className="h-px w-12 bg-[color:var(--color-border-strong)]" />
          <span
            className="text-[11px] tracking-[0.36em] uppercase text-[color:var(--color-text-tertiary)]"
            style={{ fontFamily: 'var(--font-eyebrow)' }}
          >
            Where it sits
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7"
          >
            <h2 className="display-italic text-3xl leading-[1.1] md:text-5xl md:leading-[1.05]">
              The leafiest <span className="font-script">corner</span> of Bhopal.
            </h2>
            <p
              className="mt-6 max-w-xl text-[15px] leading-[1.85] text-[color:var(--color-text-secondary)] md:text-base"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Arera Colony is the city&apos;s quietest neighbourhood — broad
              tree-lined streets, the Upper Lake at one end and the MP Nagar
              business district at the other. Close enough to be in town in
              fifteen minutes, far enough that you can hear the morning birds.
            </p>

            <dl
              className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-[color:var(--color-border)] pt-8 md:grid-cols-4"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              {stay.stats.map((s) => (
                <div key={s.label}>
                  <dt className="display-italic text-[1.6rem] md:text-[2rem] leading-none text-[color:var(--color-forest)]" style={{ fontWeight: 400 }}>
                    {s.value}
                  </dt>
                  <dd className="mt-2 text-[10px] tracking-[0.3em] uppercase text-[color:var(--color-text-tertiary)]">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9 }}
            className="md:col-span-5"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[color:var(--color-bg-alt)]">
              <iframe
                src={stay.mapEmbedSrc}
                title={`${stay.name} location`}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <p
              className="mt-4 text-[13px] leading-relaxed text-[color:var(--color-text-secondary)]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {stay.address.line1}
              <br />
              {stay.address.line2}
              {stay.address.pincode ? ` — ${stay.address.pincode}` : ''}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhereItSits;
