'use client';

import { motion } from 'framer-motion';
import { Hotel, Leaf, Utensils, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { about } from '@/lib/data';

const icons = {
  hotel: Hotel,
  leaf: Leaf,
  utensils: Utensils,
  spa: Sparkles,
};

/**
 * Cinematic About — moody full-bleed panel with parallax suggestion.
 * Editorial copy floats over a dark image with gold rule accents and
 * dramatic Cormorant headline.
 */
const CinematicAbout = () => {
  return (
    <Section id="about" className="relative bg-black overflow-hidden">
      {/* Image background */}
      <div className="absolute inset-0">
        <Image
          src="/images/about/landscape-2.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          style={{ filter: 'brightness(0.4) saturate(0.85)' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.4)_0%,_rgba(0,0,0,0.85)_70%,_rgba(0,0,0,0.95)_100%)]" />
      </div>

      <Container className="relative z-10 py-24 md:py-32 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0 }}
          className="mb-12 text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[var(--color-accent)]" />
            <span
              className="text-[10px] font-medium uppercase text-[var(--color-accent)]"
              style={{ letterSpacing: '0.4em' }}
            >
              The Sanctuary
            </span>
            <span className="h-px w-10 bg-[var(--color-accent)]" />
          </div>
          <h2
            className="text-white"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 300,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              lineHeight: 1.05,
              textShadow: '0 4px 24px rgba(0,0,0,0.6)',
            }}
          >
            An <span className="italic font-extralight">escape</span> into the wild
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p
            className="text-base md:text-lg text-white/80"
            style={{ lineHeight: 1.85, fontWeight: 300 }}
          >
            {about.content[0]}
          </p>
        </motion.div>

        {/* Pillars in cinematic style — gold-bordered cells */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {about.highlights.map((h, i) => {
            const Icon = icons[h.icon as keyof typeof icons];
            return (
              <div
                key={h.title}
                className="border border-[var(--color-accent)]/20 bg-black/40 backdrop-blur-sm p-7 transition-colors duration-500 hover:border-[var(--color-accent)]/60"
              >
                <div className="mb-5 flex items-center justify-between">
                  <Icon className="h-5 w-5 text-[var(--color-accent)]" strokeWidth={1.25} />
                  <span
                    className="text-[10px] font-medium text-[var(--color-accent)]/70"
                    style={{ letterSpacing: '0.3em' }}
                  >
                    0{i + 1}
                  </span>
                </div>
                <h3
                  className="text-white mb-3"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 400,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    fontSize: '1rem',
                    lineHeight: 1.3,
                  }}
                >
                  {h.title}
                </h3>
                <p className="text-sm text-white/70" style={{ lineHeight: 1.6 }}>
                  {h.description}
                </p>
              </div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
};

export default CinematicAbout;
