'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
}

/**
 * The full experience list as a calm editorial grid — replaced the scrolling
 * marquee so all activities sit visible on one screen. Each card splits its
 * title on the "Label: Name" pattern into an eyebrow + heading, with the
 * activity icon in the champagne circle used across the site.
 */
const ExperienceGrid = ({ items }: { items: Activity[] }) => {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {items.map((a, i) => {
        // "Old School Cool: Croquet" → eyebrow "Old School Cool", name "Croquet".
        // Titles without a colon fall back to the category as the eyebrow.
        const colon = a.title.indexOf(':');
        const eyebrow = colon > -1 ? a.title.slice(0, colon).trim() : a.category;
        const name = colon > -1 ? a.title.slice(colon + 1).trim() : a.title;
        return (
          <motion.li
            key={a.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.07, ease: [0.215, 0.61, 0.355, 1] }}
            className="group flex gap-5 rounded-lg bg-[var(--color-background-secondary)] p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] md:p-7"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--color-champagne)] transition-transform duration-500 group-hover:scale-110">
              <Image
                src={a.image}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </div>
            <div className="min-w-0">
              <p
                className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-bronze)]"
                style={{ fontFamily: 'var(--font-eyebrow)' }}
              >
                {eyebrow}
              </p>
              <h3 className="font-heading text-lg font-bold leading-snug md:text-xl">{name}</h3>
              <p
                className="mt-2 text-sm text-[var(--color-text-secondary)]"
                style={{ lineHeight: 1.65 }}
              >
                {a.description}
              </p>
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
};

export default ExperienceGrid;
