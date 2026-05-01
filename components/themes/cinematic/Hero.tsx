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

  // Defer the video fetch until the browser is idle so the page paints
  // instantly via the poster image, then the video crossfades in.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || typeof window === 'undefined') return;
    const start = () => {
      v.load();
      v.muted = true;
      v.play().catch(() => {});
    };
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback;
    if (idle) idle(start);
    else setTimeout(start, 250);
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-black">
      {/* Background media */}
      <div className="absolute inset-0">
        {/* Lightweight poster shows instantly while video loads */}
        <Image
          src="/images/hero/landscape-3.jpg"
          alt="Giovanni Village"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          sizes="100vw"
          style={{ filter: 'brightness(0.88) saturate(1)' }}
        />
        {/* Video — mobile users skip it (saves ~10MB), desktop streams in after first paint */}
        <motion.video
          ref={videoRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: videoLoaded ? 1 : 0 }}
          transition={{ duration: 1.4 }}
          className="absolute inset-0 h-full w-full object-cover"
          src="/Giovanni-Video-Presentation.mp4"
          poster="/images/hero/landscape-3.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          onLoadedData={() => setVideoLoaded(true)}
          style={{ filter: 'brightness(0.88) saturate(0.95)' }}
        />
        {/* Soft vignette + a hint of bottom wash for legibility */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.12)_65%,_rgba(0,0,0,0.35)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/0" />
      </div>


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
              fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
              lineHeight: 1.05,
              textShadow: '0 4px 24px rgba(0,0,0,0.55)',
            }}
          >
            <span className="block">Best Luxury</span>
            <span className="block italic font-extralight">Wildlife Resort</span>
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
