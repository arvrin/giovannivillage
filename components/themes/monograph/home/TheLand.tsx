'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Section 02 — The Land. Full-bleed landscape with overlay copy.
 * Establishes the setting: Ratapani sanctuary, lake, forest, twenty
 * minutes from Bhopal.
 */
const TheLand = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-bg-deep)]">
      <div className="relative h-[80vh] min-h-[560px] w-full">
        <Image
          src="/images/hero/landscape-2.jpg"
          alt="Forest and lake at Giovanni Village, on the edge of Ratapani sanctuary"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover"
          style={{ filter: 'brightness(0.78)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(15,26,20,0.15) 0%, rgba(15,26,20,0.0) 35%, rgba(15,26,20,0.55) 100%)',
          }}
        />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-6 pb-16 md:pb-24 lg:pb-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, ease: [0.215, 0.61, 0.355, 1] }}
              className="max-w-2xl"
            >
              <p
                className="mb-6 text-[10px] sm:text-xs font-medium uppercase text-white/80"
                style={{ letterSpacing: '0.3em' }}
              >
                — Where you are
              </p>
              <h2
                className="text-white"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  fontSize: 'clamp(2rem, 4.2vw, 3.75rem)',
                  lineHeight: 1.1,
                  textShadow: '0 4px 24px rgba(0,0,0,0.45)',
                }}
              >
                On the edge of Ratapani.
              </h2>
              <p
                className="mt-8 max-w-xl text-base md:text-lg text-white/85"
                style={{ lineHeight: 1.7, fontWeight: 300 }}
              >
                Giovanni Village rests on a ten-acre estate where the Ratapani
                tiger sanctuary begins. The lake is steps from the lobby; the
                forest, a short walk. Bhopal&rsquo;s city centre is twenty
                minutes away — close enough to leave behind, near enough to
                return to.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheLand;
