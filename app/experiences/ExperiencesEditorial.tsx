'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface Signature {
  eyebrow: string;
  lead: string;
  accent: string;
  tail: string;
  body: string;
  meta: string;
  img: string;
  alt: string;
}

/**
 * The headline experiences only — the few worth a full editorial spread with a
 * real photo. The complete list of twenty-odd activities lives in the icon
 * marquee above, so this section stays curated rather than re-listing them.
 * Add a card back here only when it has a correct, specific image.
 */
const SIGNATURES: Signature[] = [
  {
    eyebrow: 'Wildlife',
    lead: 'The reserve,',
    accent: 'opens',
    tail: 'before dawn',
    body:
      'Ratapani holds one of India’s healthiest tiger populations — plus leopard, sloth bear, and 200-plus bird species. Naturalist-led safaris leave before the world wakes and return in time for breakfast.',
    meta: 'Pre-book · 6–8 AM & 1–3 PM slots',
    img: '/images/experiences/safari-jeep.webp',
    alt: 'A naturalist-led safari jeep in Ratapani Tiger Reserve at dawn',
  },
  {
    eyebrow: 'Farm-to-table',
    lead: 'Breakfast where',
    accent: 'it',
    tail: 'was grown',
    body:
      'Eggs from the henhouse, an hour ago. Hand-pulled coffee. Warm baked things from our oven. Set at Royalton Farms inside the estate, where the milk arrives before you do.',
    meta: 'Royalton Farms · Daily',
    img: '/images/royalton/farm-5.webp',
    alt: 'Fresh produce growing in the fields at Royalton Farms',
  },
  {
    eyebrow: 'Cuisine',
    lead: 'A table at the',
    accent: 'water’s',
    tail: 'edge',
    body:
      'Set by the lily pond as the light fails — the water catching the last of the sky, lanterns coming up one by one, and a dinner in no hurry to end.',
    meta: 'Lakeside · Evenings',
    img: '/images/dining/lakeside-dinner.webp',
    alt: 'A lantern-lit dinner table set beside the lily pond at dusk',
  },
  {
    eyebrow: 'On the water',
    lead: 'Catch your own',
    accent: 'dinner',
    tail: '',
    body:
      'Borrow a rod, drop a line off the lily-pond deck. Whatever the lake gives up, the kitchen cooks the way you like it — a lunch you reeled in yourself.',
    meta: 'Lakeside · Daytime',
    img: '/images/experiences/lakeside-fishing.webp',
    alt: 'Fishing from the lily-pond deck at Giovanni Village',
  },
];

export default function ExperiencesEditorial() {
  return (
    <section className="relative bg-[color:var(--color-bg)] py-20 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-3xl"
        >
          <div className="mb-4 flex items-baseline gap-4">
            <span className="h-px w-12 bg-[color:var(--color-border-strong)]" />
            <span
              className="text-[11px] tracking-[0.36em] uppercase text-[color:var(--color-text-tertiary)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              Stories the days here tell
            </span>
          </div>
          <h2 className="display-italic text-3xl leading-[1.15] md:text-5xl md:leading-[1.1]">
            The experiences worth planning a <span className="font-script">day</span> around.
          </h2>
          <p
            className="mt-6 max-w-xl text-[15px] leading-[1.85] text-[color:var(--color-text-secondary)] md:text-base"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Most of what you can do here is in the strip above — small, hand-built,
            yours to choose between. These four are the ones we’d plan a day around.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 md:gap-x-8 lg:grid-cols-4">
          {SIGNATURES.map((s, i) => (
            <motion.article
              key={s.eyebrow + s.accent}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className="group relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  priority={i < 2}
                  className="object-cover transition duration-[1400ms] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/30" />
                <span
                  className="absolute left-5 top-5 rounded-full bg-[color:var(--color-forest)] px-3.5 py-1.5 text-[10px] tracking-[0.32em] uppercase text-white"
                  style={{ fontFamily: 'var(--font-eyebrow)' }}
                >
                  {s.eyebrow}
                </span>
                <p
                  className="absolute bottom-5 left-5 text-[10px] tracking-[0.32em] uppercase text-white"
                  style={{ fontFamily: 'var(--font-eyebrow)', textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
                >
                  {s.meta}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="display-italic text-2xl leading-[1.15] md:text-[1.75rem]">
                  {s.lead}{' '}
                  <span className="font-script">{s.accent}</span>
                  {s.tail ? ` ${s.tail}` : ''}
                </h3>
                <p
                  className="mt-3 text-[15px] leading-[1.85] text-[color:var(--color-text-secondary)]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {s.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
