'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { getWhatsAppLink } from '@/lib/utils';
import type { CityStay } from '@/lib/city-stays';

const CityStayHero = ({ stay }: { stay: CityStay }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Lazy-start the video when the browser is idle so it doesn't compete with
  // the LCP image. Matches the retreat Hero pattern.
  useEffect(() => {
    if (!stay.heroVideo) return;
    const v = videoRef.current;
    if (!v) return;
    const start = () => {
      v.load();
      v.muted = true;
      v.play().catch(() => {});
    };
    if ('requestIdleCallback' in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(start);
    } else {
      setTimeout(start, 200);
    }
  }, [stay.heroVideo]);

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
          className={`object-cover transition-opacity duration-1000 ${
            stay.heroVideo && videoReady ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {stay.heroVideo && (
          <video
            ref={videoRef}
            poster={stay.hero}
            muted
            loop
            playsInline
            preload="none"
            onLoadedData={() => setVideoReady(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={stay.heroVideo} type="video/mp4" />
          </video>
        )}
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
              <Button variant="light" size="lg" href={stay.bookingUrl} external>
                Check dates
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="light-outline"
                size="lg"
                href={getWhatsAppLink(
                  stay.whatsapp,
                  `Hello ${stay.name}, I'd like to enquire about a stay.`,
                )}
                external
              >
                Talk to us
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CityStayHero;
