'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import { hero, siteConfig } from '@/lib/data';
import { scrollToElement } from '@/lib/utils';

/**
 * Cinematic Hero — full-bleed, theatrical, dark.
 * Inspiration: EDITION, Faena, Soho House.
 * Background video with deep gradient overlay, oversize Cormorant headline,
 * gold rule, slow reveal animations.
 */
const CinematicHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-black">
      {/* Background media */}
      <div className="absolute inset-0">
        {/* Image fallback (always present) */}
        <Image
          src="/images/hero/landscape-3.jpg"
          alt="Giovanni Village"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ filter: 'brightness(0.55) saturate(0.9)' }}
        />
        {/* Video overlay */}
        <motion.video
          ref={videoRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: videoLoaded ? 1 : 0 }}
          transition={{ duration: 1.6 }}
          className="absolute inset-0 h-full w-full object-cover"
          src="/Giovanni-Video-Presentation.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setVideoLoaded(true)}
          style={{ filter: 'brightness(0.55) saturate(0.85)' }}
        />
        {/* Gradient overlay for legibility + cinematic vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.2)_0%,_rgba(0,0,0,0.55)_60%,_rgba(0,0,0,0.85)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      {/* Top-left gold rule + label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.0, delay: 0.4 }}
        className="absolute top-28 md:top-32 left-6 md:left-12 hidden sm:flex items-center gap-3"
      >
        <span className="h-px w-10 bg-[var(--color-accent)]" />
        <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--color-accent)]">
          Bhopal · Estd
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="max-w-5xl"
        >
          <Eyebrow color="white" className="mb-8 text-[var(--color-accent)]/90">
            A Wildlife Sanctuary
          </Eyebrow>
          <h1
            className="text-white"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--weight-heading)' as unknown as number,
              letterSpacing: 'var(--tracking-heading)',
              textTransform: 'var(--transform-heading)' as React.CSSProperties['textTransform'],
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              lineHeight: 1,
              textShadow: '0 4px 28px rgba(0,0,0,0.6)',
            }}
          >
            <span className="block">Best Luxury</span>
            <span className="block italic font-extralight">Wildlife Resort</span>
            <span className="block text-[0.55em] tracking-[0.3em] mt-4 text-[var(--color-accent)]">
              · in Bhopal ·
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="mt-10 mx-auto max-w-2xl text-lg md:text-xl text-white/80"
            style={{ lineHeight: 1.6, fontWeight: 300 }}
          >
            Resort. Spa. Banquet. An evening of reverie in the lap of nature.
          </motion.p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.4, ease: [0.215, 0.61, 0.355, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button size="lg" variant="cta" href={siteConfig.booking.resort}>
            {hero.ctaPrimary}
          </Button>
          <Button size="lg" variant="cta-outline" href={siteConfig.tour360}>
            360° Tour
          </Button>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.button
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 1.8 }}
        onClick={() => scrollToElement('about')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-white/70 hover:text-[var(--color-accent)] transition-colors"
        aria-label="Scroll to discover"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.4em]">Discover</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default CinematicHero;
