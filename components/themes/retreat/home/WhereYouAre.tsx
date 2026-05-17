'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const FACTS = [
  { l: '10', u: 'Acres', d: 'Lawns, mango groves, lakeside paths' },
  { l: '20 min', u: 'From the city', d: 'Door to Kolar in half an hour' },
  { l: '5 km', u: 'To Ratapani', d: 'For the morning you choose a safari' },
  { l: '5,000', u: 'Guests', d: 'For the wedding you’ve been planning' },
];

const WhereYouAre = () => {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-forest)] py-24 text-[color:var(--color-bg)] md:py-36">
      <Image
        src="/images/about/landscape-3.webp"
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-forest)]/70 via-[color:var(--color-forest)]/45 to-[color:var(--color-forest)]/70 backdrop-blur-[2px]" />

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-baseline gap-4 opacity-90"
        >
          <span className="h-px w-12 bg-white/60" />
          <span
            className="text-[11px] tracking-[0.36em] uppercase"
            style={{ fontFamily: 'var(--font-eyebrow)' }}
          >
            Where you are
          </span>
        </motion.div>

        <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9 }}
            className="md:col-span-7"
          >
            <h2 className="display-italic text-4xl leading-[1.1] md:text-6xl md:leading-[1.05]">
              An estate at the edge of the forest, <span className="font-script">a city</span> at its doorstep.
            </h2>
            <p
              className="mt-8 max-w-xl text-base leading-[1.85] text-white/90 md:text-lg"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Giovanni Village sits on ten quiet acres at the boundary of the
              Ratapani Reserve — close enough to Bhopal for a quick weekend, far
              enough that the air changes the moment you arrive. Built for slow
              stays, larger-than-life weddings, and everything between.
            </p>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="md:col-span-5 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/25 pt-10"
          >
            {FACTS.map((f) => (
              <div key={f.d}>
                <dt
                  className="text-[10px] tracking-[0.3em] uppercase opacity-70"
                  style={{ fontFamily: 'var(--font-eyebrow)' }}
                >
                  {f.u}
                </dt>
                <dd
                  className="mt-2 display-italic text-3xl md:text-4xl"
                  style={{ fontWeight: 400 }}
                >
                  {f.l}
                </dd>
                <p
                  className="mt-2 text-[12px] leading-snug text-white/65"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {f.d}
                </p>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
};

export default WhereYouAre;
