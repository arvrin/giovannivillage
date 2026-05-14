'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { siteConfig } from '@/lib/data';

const TILES = [
  '/images/rooms/king-pool-garden.jpg',
  '/images/dining/gourmet-by-the-woods.jpg',
  '/images/about/landscape-1.jpg',
  '/images/rooms/royal-suite.jpg',
  '/images/about/landscape-3.jpg',
  '/images/dining/pihu.jpg',
];

const InstagramStrip = () => {
  return (
    <section className="bg-[color:var(--color-bg)] py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 md:px-16">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-baseline gap-4">
              <span className="h-px w-12 bg-[color:var(--color-border-strong)]" />
              <span
                className="text-[11px] tracking-[0.36em] uppercase text-[color:var(--color-text-tertiary)]"
                style={{ fontFamily: 'var(--font-eyebrow)' }}
              >
                Social
              </span>
            </div>
            <h2 className="display-italic text-3xl leading-tight md:text-4xl">
              <span className="font-script">Letters</span> from the estate.
            </h2>
          </div>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-[color:var(--color-text)] transition hover:text-[color:var(--color-brass)]"
            style={{ fontFamily: 'var(--font-eyebrow)' }}
          >
            <Instagram className="h-4 w-4" />
            @giovannivillage
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-6 md:gap-3">
          {TILES.map((src, i) => (
            <motion.a
              key={src + i}
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-md"
            >
              <Image
                src={src}
                alt="Instagram tile"
                fill
                sizes="(max-width:768px) 50vw, 200px"
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-[color:var(--color-forest)]/0 text-[10px] tracking-[0.28em] uppercase text-transparent transition group-hover:bg-[color:var(--color-forest)]/55 group-hover:text-[color:var(--color-bg)]">
                View
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramStrip;
