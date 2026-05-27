'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import VideoBlock from '@/components/themes/retreat/VideoBlock';

const PILLARS = [
  {
    eyebrow: 'Weddings',
    lead: 'A celebration the',
    accent: 'canopy',
    tail: 'remembers',
    body: 'Pillarless banquet halls, lakeside lawns, and forest clearings — held under marigold archways with five distinct venues and capacity from twenty to five thousand. A dedicated planner curates every detail.',
    img: '/images/weddings/gourmet-lawn.webp',
    href: '/weddings',
    meta: '05 Venues · Up to 5,000 guests',
  },
  {
    eyebrow: 'Staycation',
    lead: 'The',
    accent: 'weekend',
    tail: 'that resets you',
    body: 'A short drive from Bhopal, a long way from the calendar. Forest-view suites with plunge pools, breakfast on the lawn, afternoons that disappear gently. Pet-friendly across the estate.',
    img: '/images/rooms/junior-plunge-pool.webp',
    video: '/videos/suite-reveal.mp4',
    href: '/rooms',
    meta: '08 Suites · Pet-friendly',
  },
  {
    eyebrow: 'Cuisine',
    lead: 'Four kitchens,',
    accent: 'one',
    tail: 'philosophy',
    body: 'Gourmet By The Woods plates fine dining under the canopy. Pihu does rooftop romance. Berry & Beans is for slow mornings. The Den is for telescopic nights.',
    img: '/images/dining/gourmet-by-the-woods.webp',
    video: '/videos/dining-arrival.mp4',
    href: '/dining',
    meta: '04 Restaurants',
  },
  {
    eyebrow: 'Wellness',
    lead: 'Slow hours at',
    accent: 'Elysium',
    tail: '',
    body: 'A spa built for surrender — long rituals of forest oils and warm stone. Yoga on the lawn. Meditation in the grove. The day ends quieter than it began.',
    img: '/n1.webp',
    href: '/spa',
    meta: 'Elysium Spa · Open daily',
  },
  {
    eyebrow: 'Wildlife',
    lead: 'The',
    accent: 'reserve',
    tail: ', when you want it',
    body: 'Naturalist-led safaris into Ratapani — five hundred square kilometres of teak forest, leopard, sloth bear and one of India’s healthiest tiger populations. Five minutes from the gate.',
    img: '/images/experiences/wildlife/tiger-face.webp',
    href: '/experiences',
    meta: 'Ratapani Tiger Reserve · 5 km',
  },
  {
    eyebrow: 'Events',
    lead: 'Conferences in',
    accent: 'clearings',
    tail: '',
    body: 'Corporate offsites, intimate launches, milestone birthdays. Pillarless halls with daylight, lakeside cocktail lawns, and a kitchen that quietly handles a thousand plates.',
    img: '/images/weddings/the-forum.webp',
    href: '/weddings',
    meta: 'Indoor + Outdoor',
  },
];

const TheSenses = () => {
  return (
    <section className="relative bg-[color:var(--color-bg)] py-24 md:py-36">
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
              The Giovanni story
            </span>
          </div>
          <h2 className="display-italic text-3xl leading-[1.15] md:text-5xl md:leading-[1.1]">
            Six reasons people come. <span className="font-script">One reason</span> they return.
          </h2>
          <p
            className="mt-6 max-w-xl text-[15px] leading-[1.85] text-[color:var(--color-text-secondary)] md:text-base"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Giovanni was built to hold many lives gently — the wedding planner’s,
            the bride’s, the toddler chasing a peacock across the lawn, the
            couple slipping into a plunge pool after a forest drive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-20">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.eyebrow}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.06 }}
              className="group relative"
            >
              <Link href={p.href} className="block">
                <div className="relative aspect-[5/4] overflow-hidden rounded-lg">
                  {p.video ? (
                    <VideoBlock
                      src={p.video}
                      poster={p.img}
                      alt={`${p.lead} ${p.accent} ${p.tail}`}
                      className="transition duration-[1400ms] group-hover:scale-[1.04]"
                    />
                  ) : (
                    <Image
                      src={p.img}
                      alt={`${p.lead} ${p.accent} ${p.tail}`}
                      fill
                      sizes="(max-width:768px) 100vw, 50vw"
                      priority={i < 2}
                      className="object-cover transition duration-[1400ms] group-hover:scale-[1.04]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/30" />
                  <span
                    className="absolute left-5 top-5 rounded-full bg-[color:var(--color-forest)] px-3.5 py-1.5 text-[10px] tracking-[0.32em] uppercase text-white"
                    style={{ fontFamily: 'var(--font-eyebrow)' }}
                  >
                    {p.eyebrow}
                  </span>
                  <p
                    className="absolute bottom-5 left-5 text-[10px] tracking-[0.32em] uppercase text-white"
                    style={{ fontFamily: 'var(--font-eyebrow)', textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
                  >
                    {p.meta}
                  </p>
                </div>

                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <h3 className="display-italic text-2xl leading-[1.15] md:text-[2rem]">
                      {p.lead}{' '}
                      <span className="font-script">{p.accent}</span>
                      {p.tail ? ` ${p.tail}` : ''}
                    </h3>
                    <p
                      className="mt-3 max-w-lg text-[15px] leading-[1.85] text-[color:var(--color-text-secondary)]"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {p.body}
                    </p>
                  </div>
                  <span className="mt-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-border-strong)] text-[color:var(--color-text)] transition group-hover:bg-[color:var(--color-forest)] group-hover:text-[color:var(--color-bg)] group-hover:border-[color:var(--color-forest)]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheSenses;
