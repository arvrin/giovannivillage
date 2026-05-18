'use client';

import { motion } from 'framer-motion';
import type { CityStay } from '@/lib/city-stays';

const Included = ({ stay }: { stay: CityStay }) => {
  return (
    <section className="bg-[color:var(--color-bg)] py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-10 max-w-2xl"
        >
          <div className="mb-4 flex items-baseline gap-4">
            <span className="h-px w-12 bg-[color:var(--color-border-strong)]" />
            <span
              className="text-[11px] tracking-[0.36em] uppercase text-[color:var(--color-text-tertiary)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              Included in every room
            </span>
          </div>
          <h2 className="display-italic text-3xl leading-[1.1] md:text-[2.6rem] md:leading-[1.05]">
            The <span className="font-script">basics</span>, done quietly well.
          </h2>
        </motion.div>

        <ul
          className="grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2 lg:grid-cols-3"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {stay.included.map((item) => (
            <li key={item} className="flex items-baseline gap-3 text-[14px] text-[color:var(--color-text-secondary)]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-brass)]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Included;
