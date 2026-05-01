'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import { hero, siteConfig } from '@/lib/data';

/**
 * Modernist Hero — asymmetric architectural layout.
 * Inspiration: Belmond, Bulgari, Mandarin Oriental.
 * Image column hosts the cinematic loop; on mobile it becomes a static
 * landscape (no video) for performance.
 */
const ModernistHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (typeof window === 'undefined' || window.matchMedia('(max-width: 767px)').matches) return;
    const start = () => {
      v.load();
      v.play().catch(() => {});
    };
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback;
    if (idle) idle(start);
    else setTimeout(start, 250);
  }, []);

  return (
    <section className="relative w-full bg-[var(--color-bg)] pt-16 md:pt-[109px]">
      <div className="grid grid-rows-[55vh_auto] lg:h-[calc(100vh-109px)] lg:min-h-[560px] lg:grid-cols-[60%_40%] lg:grid-rows-1">
        {/* Media column */}
        <div className="relative overflow-hidden bg-black">
          {/* Static poster — instant render */}
          <Image
            src="/images/hero/landscape-2.jpg"
            alt="Giovanni Village"
            fill
            className="object-cover"
            priority
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 60vw"
            style={{ filter: 'saturate(0.95)' }}
          />
          {/* Video — desktop only, fades over the poster */}
          <motion.video
            ref={videoRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: videoLoaded ? 1 : 0 }}
            transition={{ duration: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
            className="absolute inset-0 h-full w-full object-cover hidden md:block"
            src="/Giovanni-Video-Presentation.mp4"
            poster="/images/hero/landscape-2.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            onLoadedData={() => setVideoLoaded(true)}
            style={{ filter: 'saturate(0.92)' }}
          />
          {/* Sticky destination strip */}
          <div className="absolute left-4 top-1/2 hidden -translate-y-1/2 -rotate-90 origin-center md:block z-10">
            <p
              className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/85 whitespace-nowrap"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.55)' }}
            >
              Bhopal · Madhya Pradesh · India
            </p>
          </div>
          {/* Bottom-left number */}
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10">
            <p
              className="text-xs font-medium uppercase tracking-[0.3em] text-white/85"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.55)' }}
            >
              01 / Resort
            </p>
          </div>
        </div>

        {/* Content column */}
        <div className="relative flex flex-col justify-between bg-[var(--color-bg)] px-7 py-10 sm:px-10 md:px-14 md:py-14 lg:px-16 lg:py-16">
          {/* Top row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center justify-between"
          >
            <Eyebrow color="bronze">Estd · Resort & Spa</Eyebrow>
            <span className="h-px w-16 bg-[var(--color-border-strong)]" />
          </motion.div>

          {/* Headline */}
          <div className="flex-1 flex flex-col justify-center py-10">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-[var(--color-text)]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--weight-heading)' as unknown as number,
                letterSpacing: 'var(--tracking-heading)',
                textTransform: 'var(--transform-heading)' as React.CSSProperties['textTransform'],
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                lineHeight: 1,
              }}
            >
              <span className="block">A wildlife</span>
              <span className="block">retreat in</span>
              <span className="block">Bhopal.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-8 max-w-md text-base md:text-lg text-[var(--color-text-secondary)]"
              style={{ lineHeight: 1.6 }}
            >
              Resort. Spa. Banquet. Experience luxury in the lap of nature.
            </motion.p>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="grid grid-cols-3 border-t border-b border-[var(--color-border-strong)] py-5"
          >
            {[
              { v: '10', l: 'Acres' },
              { v: '8', l: 'Suites' },
              { v: '5K', l: 'Guests' },
            ].map((s) => (
              <div key={s.l} className="border-l first:border-l-0 border-[var(--color-border-strong)] pl-4">
                <p
                  className="text-[var(--color-text)]"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                    fontWeight: 500,
                    lineHeight: 1,
                  }}
                >
                  {s.v}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-tertiary)]">
                  {s.l}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              size="lg"
              variant="cta"
              href={siteConfig.booking.resort}
              className="group inline-flex items-center justify-center gap-2"
            >
              {hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <a
              href={siteConfig.tour360}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-2 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              360° Tour
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ModernistHero;
