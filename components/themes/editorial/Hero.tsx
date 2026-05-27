'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { hero, siteConfig } from '@/lib/data';
import { scrollToElement } from '@/lib/utils';

/**
 * Hero Section - LUXURY VIDEO EDITION
 * Full viewport cinematic video background with minimal, elegant overlays
 * Benchmark: Aman Resorts, Six Senses hero sections with video
 */
const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Defer the video fetch until the browser is idle — keeps initial paint fast.
  // The poster image is shown immediately; video crossfades in once ready.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof window === 'undefined') return;

    const start = () => {
      video.load();
      video.muted = true;
      video.play().catch(() => {});
    };

    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback;
    if (idle) idle(start);
    else setTimeout(start, 250);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video - Cinematic Loop */}
      <div className="absolute inset-0 bg-black">
        {/* Lightweight poster — shows instantly so the page renders without blocking. */}
        <Image
          src="/f1.webp"
          alt="Giovanni Village Resort"
          fill
          className="object-cover z-[5]"
          style={{ filter: 'grayscale(5%) brightness(0.85)' }}
          priority
          fetchPriority="high"
          sizes="100vw"
        />

        {/* Video — only on desktop (saves ~10MB on mobile). preload="none" defers
            fetch until first paint, then video plays and crossfades over the poster. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: videoLoaded ? 1 : 0 }}
          transition={{ duration: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
          className="absolute inset-0 z-10"
        >
          <video
            ref={videoRef}
            key="hero-video"
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="/f1.webp"
            onLoadedData={() => setVideoLoaded(true)}
            style={{ filter: 'grayscale(5%) brightness(0.85)' }}
          >
            <source src="/Giovanni-Video-Presentation.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Subtle dark gradient for text legibility — applied above both poster and video */}
        <div
          className="absolute inset-0 z-[15] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(42, 40, 38, 0.25), rgba(42, 40, 38, 0.5))',
          }}
        />
      </div>

      {/* Content - Centered, Minimal */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Main Content - Centered, wider for impact */}
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="max-w-5xl px-6"
        >
          {/* Tagline - Refined sizing for mobile and desktop */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white"
            style={{
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.02em',
              textShadow: '0 4px 24px rgba(0, 0, 0, 0.55)',
              lineHeight: 1.1,
              fontWeight: 600,
              maxWidth: '18ch',
              marginInline: 'auto',
            }}
          >
            {hero.tagline}
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="mb-10 font-body text-base sm:text-lg md:text-xl text-white/90"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)', lineHeight: 1.6 }}
          >
            <p>Resort · Spa · Banquet — luxury in the lap of nature.</p>
          </motion.div>

          {/* Single Prominent CTA - 65% from top */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.9,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="flex justify-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                variant="primary"
                href={siteConfig.booking.resort}
                className="min-w-[200px] shadow-lg transition-transform duration-600 hover:scale-105"
                style={{
                  backgroundColor: 'var(--color-gold)',
                  color: 'var(--color-charcoal)',
                  fontWeight: 500,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  fontSize: '0.875rem',
                }}
              >
                {hero.ctaPrimary}
              </Button>
              <Button
                size="lg"
                variant="outline"
                href={siteConfig.tour360}
                className="min-w-[200px] border-white/70 text-white hover:bg-white hover:text-[var(--color-charcoal)]"
                style={{
                  fontWeight: 500,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  fontSize: '0.875rem',
                }}
              >
                360° Tour
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - Bottom, elegant */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 1.4,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={() => scrollToElement('about')}
            className="group flex flex-col items-center gap-2 text-[var(--color-text-inverse)]/70 transition-all duration-600 hover:text-[var(--color-text-inverse)]"
            aria-label="Scroll to discover more"
          >
            <span
              className="text-xs font-medium uppercase tracking-widest"
              style={{ letterSpacing: '2px' }}
            >
              Discover
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
