'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface WeddingMomentVideoProps {
  src: string;
  poster: string;
  eyebrow?: string;
  title?: string;
  caption?: string;
}

/**
 * An inline cinematic video module — autoplay-muted with a play/pause +
 * mute/unmute pair of controls. Used on /weddings to show a real Giovanni
 * wedding without forcing audio on the visitor.
 */
const WeddingMomentVideo = ({
  src,
  poster,
  eyebrow,
  title,
  caption,
}: WeddingMomentVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  // Autoplay once the element is on screen — saves bandwidth for users who
  // bounce before scrolling to this section.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => setPlaying(false));
        } else {
          v.pause();
        }
      },
      { rootMargin: '50px' },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
      className="my-24 md:my-32"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 max-w-2xl">
          {eyebrow && (
            <p
              className="mb-3 text-[11px] tracking-[0.36em] uppercase text-[var(--color-text-tertiary)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="display-italic text-3xl leading-[1.1] md:text-5xl md:leading-[1.05]">
              {title}
            </h2>
          )}
        </div>

        <div className="relative aspect-video overflow-hidden rounded-xl bg-black shadow-[var(--shadow-md)]">
          <Image
            src={poster}
            alt=""
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          <video
            ref={ref}
            src={src}
            poster={poster}
            muted={muted}
            loop
            playsInline
            preload="metadata"
            aria-label={title ? `Wedding film — ${title}` : 'Real wedding film at Giovanni Village'}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Subtle bottom gradient for control legibility */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />

          <div className="absolute bottom-4 left-4 flex items-center gap-2 md:bottom-6 md:left-6">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? 'Pause video' : 'Play video'}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? 'Unmute video' : 'Mute video'}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {caption && (
          <p
            className="mt-5 max-w-2xl text-[14px] italic leading-[1.75] text-[var(--color-text-tertiary)]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {caption}
          </p>
        )}
      </div>
    </motion.section>
  );
};

export default WeddingMomentVideo;
