'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';
import type { CityStay } from '@/lib/city-stays';

const CityStayHero = ({ stay }: { stay: CityStay }) => {
  return (
    <section className="relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden bg-[color:var(--color-forest)] text-white">
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <Image
          src={stay.hero}
          alt={stay.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-between px-5 pb-12 pt-28 md:px-16 md:pb-20 md:pt-32">
        <div />
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="max-w-3xl"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}
          >
            <p
              className="mb-5 text-[11px] tracking-[0.4em] uppercase text-white/85"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              {stay.eyebrow}
            </p>
            <h1 className="display-italic text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.08] text-white">
              {stay.headline.lead}{' '}
              <span className="font-script">{stay.headline.script}</span>{' '}
              {stay.headline.tail}
            </h1>
            <p
              className="mt-5 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[10px] tracking-[0.28em] uppercase text-white/95 backdrop-blur-md"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              <span>{stay.tagline}</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-white/50" />
              <span>{stay.rooms.length} room categories</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-white/50" />
              <span>Arera Colony, Bhopal</span>
            </p>
            <p
              className="mt-6 max-w-md text-[15px] leading-[1.85] text-white/90 md:text-base"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {stay.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={stay.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-[11px] tracking-[0.28em] uppercase text-[color:var(--color-forest)] transition hover:bg-[color:var(--color-brass)] hover:text-white"
                style={{ fontFamily: 'var(--font-eyebrow)' }}
              >
                Check dates
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={getWhatsAppLink(
                  stay.whatsapp,
                  `Hello ${stay.name}, I'd like to enquire about a stay.`,
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-[11px] tracking-[0.28em] uppercase text-white backdrop-blur-md transition hover:bg-white/20"
                style={{ fontFamily: 'var(--font-eyebrow)' }}
              >
                Talk to us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CityStayHero;
