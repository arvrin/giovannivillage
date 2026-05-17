'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const FRAMES = [
  {
    time: '06:00',
    label: 'Dawn',
    titleLead: 'Coffee on a',
    titleAccent: 'quiet',
    titleTail: 'deck',
    body: 'First light through the teaks. Mist on the lawn. The kettle whistles before the world wakes.',
    img: '/images/rooms/junior-deck-garden.jpg',
  },
  {
    time: '10:30',
    label: 'Mid-morning',
    titleLead: 'A',
    titleAccent: 'walk',
    titleTail: 'through the estate',
    body: 'Mango plantations, lily ponds, lawns set for tea. The naturalist points out a hornbill on the way.',
    img: '/images/weddings/cocktail-lawn.webp',
  },
  {
    time: '13:30',
    label: 'Afternoon',
    titleLead: 'Long lunch at',
    titleAccent: 'Gourmet',
    titleTail: 'By The Woods',
    body: 'Slow Malwa cooking. A bottle of something cold. Light filtering through the canopy.',
    img: '/images/dining/gourmet-by-the-woods.jpg',
  },
  {
    time: '17:00',
    label: 'Golden hour',
    titleLead: 'A',
    titleAccent: 'ceremony',
    titleTail: 'on the lawn',
    body: 'Pheras at sunset by the lake. Marigold runners, lit aisles, vows beneath an old tamarind tree.',
    img: '/images/weddings/gourmet-lawn.webp',
  },
  {
    time: '20:30',
    label: 'Night',
    titleLead: 'Telescope dinner under',
    titleAccent: 'stars',
    titleTail: '',
    body: 'The Den lights its lanterns. A telescope finds Saturn. The forest carries on without you.',
    img: '/images/dining/the-den.jpg',
  },
];

const ADayHere = () => {
  return (
    <section className="bg-[color:var(--color-bg)] py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-baseline justify-between gap-6 flex-wrap"
        >
          <div className="flex items-baseline gap-4">
            <span className="h-px w-12 bg-[color:var(--color-border-strong)]" />
            <span
              className="text-[11px] tracking-[0.36em] uppercase text-[color:var(--color-text-tertiary)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              A day at the estate
            </span>
          </div>
          <h2 className="display-italic max-w-2xl text-3xl leading-[1.05] md:text-5xl">
            From dawn until <span className="font-script">the stars</span> find you.
          </h2>
        </motion.div>

        <div className="relative -mx-5 md:-mx-16">
          <ul
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 md:gap-6 md:px-16"
            style={{ scrollbarWidth: 'none' }}
          >
            {FRAMES.map((f, i) => (
              <motion.li
                key={f.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 + i * 0.08 }}
                className="group relative shrink-0 snap-start basis-[78%] sm:basis-[58%] lg:basis-[34%] xl:basis-[28%]"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <Image
                    src={f.img}
                    alt={`${f.titleLead} ${f.titleAccent} ${f.titleTail}`}
                    fill
                    sizes="480px"
                    priority={i < 2}
                    className="object-cover transition duration-[1400ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/45" />

                  <div className="absolute left-5 top-5 flex items-center gap-3 rounded-full bg-black/50 px-3 py-1.5 text-white backdrop-blur-md">
                    <span
                      className="display-italic text-base leading-none"
                      style={{ fontWeight: 400 }}
                    >
                      {f.time}
                    </span>
                    <span className="h-3 w-px bg-white/40" />
                    <span
                      className="text-[10px] tracking-[0.32em] uppercase"
                      style={{ fontFamily: 'var(--font-eyebrow)' }}
                    >
                      {f.label}
                    </span>
                  </div>

                  <div className="absolute inset-x-5 bottom-5 text-white" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}>
                    <h3
                      className="display-italic text-2xl leading-[1.15] md:text-[1.75rem]"
                      style={{ fontWeight: 400 }}
                    >
                      {f.titleLead}{' '}
                      <span className="font-script" style={{ color: 'var(--color-brass)' }}>
                        {f.titleAccent}
                      </span>
                      {f.titleTail ? ` ${f.titleTail}` : ''}
                    </h3>
                    <p
                      className="mt-2 text-[13px] leading-relaxed text-white/90"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {f.body}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          <div className="mt-2 hidden justify-center gap-1 md:flex">
            {FRAMES.map((f, i) => (
              <span
                key={f.label}
                className="h-1 w-6 rounded-full bg-[color:var(--color-border-strong)]"
                style={{ opacity: 0.3 + i * 0.13 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ADayHere;
