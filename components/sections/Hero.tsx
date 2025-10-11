'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Button from '../ui/Button';
import { hero } from '@/lib/data';
import { scrollToElement } from '@/lib/utils';

/**
 * Hero Section - LUXURY VIDEO EDITION
 * Full viewport cinematic video background with minimal, elegant overlays
 * Benchmark: Aman Resorts, Six Senses hero sections with video
 */
const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fallbackLoaded, setFallbackLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force load the video
    video.load();

    // Function to play video with aggressive retry
    const playVideo = async () => {
      try {
        video.muted = true; // Ensure muted for autoplay
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Video play attempt failed, retrying...', error);
        // Aggressive retry
        setTimeout(async () => {
          try {
            await video.play();
            setIsPlaying(true);
          } catch (err) {
            console.log('Video play retry failed:', err);
          }
        }, 300);
      }
    };

    // Play when video can start
    const handleCanPlay = () => {
      playVideo();
    };

    // Play when metadata is loaded
    const handleLoadedMetadata = () => {
      playVideo();
    };

    // Play when data is loaded
    const handleLoadedData = () => {
      setVideoLoaded(true);
      playVideo();
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);

    // Initial play attempt
    playVideo();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video - Cinematic Loop */}
      <div className="absolute inset-0 bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: videoLoaded ? 1 : 0 }}
          transition={{ duration: 1.5, ease: [0.215, 0.61, 0.355, 1] }}
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
            preload="metadata"
            onLoadedData={() => setVideoLoaded(true)}
            style={{
              filter: 'grayscale(5%) brightness(0.85)',
            }}
          >
            <source src="/Giovanni-Video-Presentation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Luxury overlay - subtle gradient for text readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(42, 40, 38, 0.25), rgba(42, 40, 38, 0.5))',
            }}
          />
        </motion.div>

        {/* Fallback images while video loads - f0 and f1 with crossfade - LAZY LOADED */}
        {!videoLoaded && fallbackLoaded && (
          <>
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 2, delay: 2 }}
              className="absolute inset-0 z-[5]"
            >
              <Image
                src="/f0.png"
                alt="Hero fallback"
                fill
                className="object-cover"
                style={{ filter: 'grayscale(5%) brightness(0.85)' }}
                priority
                onLoad={() => setFallbackLoaded(true)}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, rgba(42, 40, 38, 0.25), rgba(42, 40, 38, 0.5))',
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 2 }}
              className="absolute inset-0 z-[5]"
            >
              <Image
                src="/f1.jpg"
                alt="Hero fallback"
                fill
                className="object-cover"
                style={{ filter: 'grayscale(5%) brightness(0.85)' }}
                priority
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, rgba(42, 40, 38, 0.25), rgba(42, 40, 38, 0.5))',
                }}
              />
            </motion.div>
          </>
        )}
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
            className="mb-6 text-4xl font-bold leading-tight text-[var(--color-text-inverse)] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            style={{
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
              textShadow: '0 4px 24px rgba(0, 0, 0, 0.6)',
              lineHeight: '1.1',
              fontWeight: 600,
            }}
          >
            {hero.tagline}
          </motion.h1>

          {/* Subtitle - Refined sizing and spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.7,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="mb-10 font-body text-lg font-light text-[var(--color-text-inverse)]/90 sm:text-xl md:mb-12 md:text-2xl lg:text-3xl"
            style={{
              letterSpacing: '0.3px',
              textShadow: '0 2px 16px rgba(0, 0, 0, 0.5)',
              lineHeight: '1.6',
            }}
          >
            <p className="mb-1.5">Resort. Spa. Banquet.</p>
            <p>Experience luxury in the lap of nature.</p>
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
            <Button
              size="lg"
              variant="primary"
              onClick={() => scrollToElement('rooms')}
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
