'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const VENUES = [
  { name: 'Cocktail', tail: 'Lawn', cap: '500', img: '/images/weddings/cocktail-lawn.jpg' },
  { name: 'Poolside', tail: 'Lawn', cap: '300', img: '/images/weddings/poolside-lawn.jpg' },
  { name: 'The Aria', tail: 'Hall', cap: '1,200', img: '/images/weddings/the-aria.jpg' },
  { name: 'Sudesh', tail: 'Lawns', cap: '5,000', img: '/images/weddings/sudesh-lawns.png' },
];

const Celebrations = () => {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-bg-alt)] py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div className="mb-4 flex items-baseline gap-4">
              <span className="h-px w-12 bg-[color:var(--color-border-strong)]" />
              <span
                className="text-[11px] tracking-[0.36em] uppercase text-[color:var(--color-text-tertiary)]"
                style={{ fontFamily: 'var(--font-eyebrow)' }}
              >
                Celebrations
              </span>
            </div>
            <h2 className="display-italic text-3xl leading-[1.15] md:text-[3.2rem] md:leading-[1.1]">
              The wedding that <span className="font-script">found</span> its setting.
            </h2>
            <p
              className="mt-6 max-w-xl text-[15px] leading-[1.85] text-[color:var(--color-text-secondary)] md:text-base"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Five venues, twenty distinct ceremonies. Mehndi by the lily pond,
              haldi under marigold canopies, pheras on the lawn, sangeet in a
              pillarless hall lit by a thousand bulbs. A dedicated planner shapes
              every detail; we handle the rest.
            </p>
            <Link
              href="/weddings"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[color:var(--color-accent)] px-6 py-3.5 text-[11px] tracking-[0.28em] uppercase text-[color:var(--color-accent-contrast)] transition hover:bg-[color:var(--color-accent-hover)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              Plan your wedding
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9 }}
            className="relative hidden h-44 w-52 shrink-0 overflow-hidden rounded-md md:block"
          >
            <Image
              src="/images/weddings/hero.jpg"
              alt="Wedding setup at Giovanni"
              fill
              sizes="220px"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {VENUES.map((v, i) => (
            <motion.article
              key={v.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-md bg-[color:var(--color-bg)]"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={v.img}
                  alt={v.name}
                  fill
                  sizes="320px"
                  priority={i < 2}
                  className="object-cover transition duration-[1400ms] group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                <div
                  className="absolute inset-x-4 bottom-4 text-white"
                  style={{ textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}
                >
                  <p
                    className="text-[9px] tracking-[0.32em] uppercase opacity-85"
                    style={{ fontFamily: 'var(--font-eyebrow)' }}
                  >
                    Capacity {v.cap}
                  </p>
                  <h3 className="mt-1 display-italic text-xl leading-tight md:text-2xl">
                    <span className="font-script">{v.name}</span> {v.tail}
                  </h3>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <ul
          className="mt-12 grid grid-cols-2 gap-y-4 md:grid-cols-4"
          style={{ fontFamily: 'var(--font-eyebrow)' }}
        >
          {[
            { v: '05', l: 'Venues' },
            { v: '5K', l: 'Max guests' },
            { v: '20+', l: 'Ceremony styles' },
            { v: '01', l: 'Dedicated planner' },
          ].map((s) => (
            <li key={s.l} className="border-l border-[color:var(--color-border-strong)] pl-5">
              <p className="display-italic text-3xl leading-none text-[color:var(--color-forest)]" style={{ fontWeight: 400 }}>
                {s.v}
              </p>
              <p className="mt-2 text-[10px] tracking-[0.3em] uppercase text-[color:var(--color-text-tertiary)]">
                {s.l}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Celebrations;
