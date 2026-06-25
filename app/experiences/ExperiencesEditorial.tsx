'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Signature {
  eyebrow: string;
  lead: string;
  accent: string;
  tail: string;
  body: string;
  meta: string;
  img: string;
}

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
  },
  {
    eyebrow: 'Farm-to-table',
    lead: 'Breakfast where',
    accent: 'it',
    tail: 'was grown',
    body:
      'Eggs from the henhouse, an hour ago. Hand-pulled coffee. Warm baked things from our oven. Set at Royalton Farms inside the estate, where the milk arrives before you do.',
    meta: 'Royalton Farms · Daily',
    img: '/images/experiences/farm-produce.webp',
  },
  {
    eyebrow: 'The land',
    lead: 'The hour',
    accent: 'the herd',
    tail: 'comes in',
    body:
      'A late-afternoon walk to the farm shed as the light goes gold. The smell of the milk, still warm. The way the cows look at you. The same milk, bottled fresh for tomorrow’s coffee.',
    meta: '4:30 PM · Optional',
    img: '/images/about/landscape-1.webp',
  },
  {
    eyebrow: 'From our farm',
    lead: 'Walk where',
    accent: 'the food',
    tail: 'begins',
    body:
      'A guided tour through Royalton Farms — the fields, the kitchen garden, the dairy, the bees. The quiet engine of how dinner gets to your plate.',
    meta: 'Guided · 60 min',
    img: '/images/_library/homepage-tiles/wellness-landscape.webp',
  },
  {
    eyebrow: 'Cuisine',
    lead: 'A',
    accent: 'telescope',
    tail: 'between courses',
    body:
      'Saturn at the soup course, the Pleiades by dessert. Pihu’s rooftop, a working telescope, and a tasting menu under a sky that hasn’t met a city light.',
    meta: 'Weekend evenings · Pre-book',
    img: '/images/dining/pihu.webp',
  },
  {
    eyebrow: 'Lake',
    lead: 'Catch',
    accent: 'your',
    tail: 'dinner',
    body:
      'An afternoon at the lake, a rod, the patience. Whatever you bring back, the kitchen will cook for you the way you ask — lemon-grilled, tandoor-charred, or Bhopali-spiced.',
    meta: 'Afternoon · Chefs cook your catch',
    img: '/images/about/landscape-3.webp',
  },
  {
    eyebrow: 'Coals',
    lead: 'The dinner',
    accent: 'you',
    tail: 'cook yourself',
    body:
      'Light a fire under the trees. The kitchen sends the meats, the marinades, the breads, the chimichurri. You handle the grill. The smoke does the storytelling.',
    meta: 'Evening · Reserve a station',
    img: '/images/weddings/gourmet-lawn.webp',
  },
  {
    eyebrow: 'After dark',
    lead: 'A film,',
    accent: 'under',
    tail: 'the leaves',
    body:
      'Love seats, freshly-popped popcorn, the sound of cicadas behind the soundtrack. Pick your film at check-in — the open-air theatre runs to your evening.',
    meta: 'Evenings · By request',
    img: '/images/hero/landscape-3.webp',
  },
  {
    eyebrow: 'For the kids',
    lead: 'An afternoon',
    accent: 'at',
    tail: 'the chef’s pass',
    body:
      'Little ones at the kitchen, aprons and all, building a dish from our farm produce under the chef’s eye. They leave with a plate they cooked themselves — and the apron.',
    meta: 'Ages 6–14 · Pre-book',
    img: '/Gourmet-By-The-Woods.webp',
  },
  {
    eyebrow: 'Heritage',
    lead: 'The story',
    accent: 'behind',
    tail: 'the village',
    body:
      'A guided look at the Giovanni factory — where the brand began, what we make today, the people who make it. A small detour into the family business.',
    meta: 'Guided · By appointment',
    img: '/images/about/about-hero-original.webp',
  },
];

const AMENITIES: { title: string; body: string }[] = [
  { title: 'Soft-touch swimming pool', body: 'A tranquil oasis amid the grounds — open all day.' },
  { title: 'Cycling', body: 'A small fleet at the front desk; routes shaped by the estate.' },
  { title: 'Manual scooters', body: 'Kick, push, coast — the simple way to get around.' },
  { title: 'Croquet', body: 'On the back lawn, after tea.' },
  { title: 'Frisbee', body: 'Open lawns; bring whoever’s up for it.' },
  { title: 'Badminton & Tennikoit', body: 'Rackets and rings at the activity hut.' },
  { title: 'Board games', body: 'Tambola, Carrom, Foosball, Jenga, Uno, Ludo, Scrabble.' },
  { title: 'Modern Kanche', body: 'The classic marbles game, gently revived.' },
  { title: 'Jhoolas', body: 'Swings tucked under the older trees — multiple, all over.' },
  { title: 'Sunbathing area', body: 'Lounge chairs and shaded corners by the pool.' },
  { title: 'Elysium Spa', body: 'Forest oils, hot stones, Ayurvedic rituals — full menu on the spa page.' },
];

export default function ExperiencesEditorial() {
  return (
    <>
      {/* Ten signatures — editorial spreads */}
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
              Ten ways to spend a <span className="font-script">day</span> at Giovanni.
            </h2>
            <p
              className="mt-6 max-w-xl text-[15px] leading-[1.85] text-[color:var(--color-text-secondary)] md:text-base"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Mornings begin at Royalton Farms — eggs from our hens, mango from
              our trees, milk pulled at first light. The hours that follow find
              their own shape. Each experience is small, hand-built, and yours
              to choose between.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-20">
            {SIGNATURES.map((s, i) => (
              <motion.article
                key={s.eyebrow + s.accent}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: (i % 2) * 0.06 }}
                className="group relative"
              >
                <div className="relative aspect-[5/4] overflow-hidden rounded-lg">
                  <Image
                    src={s.img}
                    alt={`${s.lead} ${s.accent} ${s.tail}`}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
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
                  <h3 className="display-italic text-2xl leading-[1.15] md:text-[2rem]">
                    {s.lead}{' '}
                    <span className="font-script">{s.accent}</span>
                    {s.tail ? ` ${s.tail}` : ''}
                  </h3>
                  <p
                    className="mt-3 max-w-lg text-[15px] leading-[1.85] text-[color:var(--color-text-secondary)]"
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

      {/* Also on the estate — typographic amenity list */}
      <section className="relative bg-[color:var(--color-bg-alt)] py-20 md:py-32">
        <div className="mx-auto max-w-[1280px] px-5 md:px-16">
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
                Also on the estate
              </span>
            </div>
            <h2 className="display-italic text-3xl leading-[1.15] md:text-4xl md:leading-[1.1]">
              The <span className="font-script">small</span> things, all in one place.
            </h2>
            <p
              className="mt-6 max-w-xl text-[15px] leading-[1.85] text-[color:var(--color-text-secondary)]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Not headline experiences — just the texture of a stay. Most need
              no booking; ask at the front desk and a key is handed over.
            </p>
          </motion.div>

          <ul className="grid grid-cols-1 gap-x-12 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {AMENITIES.map((a) => (
              <li
                key={a.title}
                className="border-t border-[color:var(--color-border)] pt-5"
              >
                <h3
                  className="text-base text-[color:var(--color-text)]"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 'var(--weight-heading)' as unknown as number,
                    letterSpacing: 'var(--tracking-heading)',
                    textTransform: 'var(--transform-heading)' as React.CSSProperties['textTransform'],
                    lineHeight: 1.3,
                  }}
                >
                  {a.title}
                </h3>
                <p
                  className="mt-1.5 text-sm text-[color:var(--color-text-secondary)]"
                  style={{ fontFamily: 'var(--font-body)', lineHeight: 1.65 }}
                >
                  {a.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex items-center gap-3">
            <Link
              href="/spa"
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[color:var(--color-text)] hover:text-[color:var(--color-brass)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              The full Elysium Spa menu
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
