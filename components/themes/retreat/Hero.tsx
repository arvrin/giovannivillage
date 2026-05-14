'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { hero } from '@/lib/data';

const RetreatHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <section className="relative isolate h-[100svh] min-h-[680px] w-full overflow-hidden bg-[color:var(--color-forest)] text-[color:var(--color-bg)]">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 18, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <Image
          src={hero.images[0]}
          alt="Giovanni Village — luxury wildlife resort in Bhopal"
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${videoReady ? 'opacity-0' : 'opacity-100'}`}
        />
        <video
          ref={videoRef}
          poster={hero.images[0]}
          muted
          loop
          playsInline
          preload="none"
          onLoadedData={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/videos/hero-aerial.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-between px-5 pb-12 pt-28 md:px-16 md:pb-20 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-3 self-start text-white"
        >
          <MapPin className="h-3.5 w-3.5" />
          <span
            className="text-[10px] tracking-[0.4em] uppercase md:text-[11px]"
            style={{ fontFamily: 'var(--font-eyebrow)', textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}
          >
            Bhopal · Madhya Pradesh
          </span>
        </motion.div>

        <div className="flex flex-col items-start gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-3xl text-white"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}
          >
            <p
              className="mb-4 text-[10px] tracking-[0.4em] uppercase opacity-90 md:text-[11px]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              Wildlife Retreat · Wedding Estate · Quiet Staycation
            </p>
            <h1 className="display-italic text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1.08] text-white">
              A place to <span className="font-script">remember</span> what slow feels like.
            </h1>
            <p
              className="mt-6 max-w-md text-[15px] leading-[1.85] text-white/90 md:text-base"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              An uber-luxury estate folded into ten acres of forest — for the
              wedding of a lifetime, a weekend that resets you, or a safari you
              came for and a sunset you stayed for.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/rooms"
                className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-[11px] tracking-[0.28em] uppercase text-[color:var(--color-forest)] transition hover:bg-[color:var(--color-brass)] hover:text-white"
                style={{ fontFamily: 'var(--font-eyebrow)' }}
              >
                Plan a stay
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/weddings"
                className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-[11px] tracking-[0.28em] uppercase text-white backdrop-blur-md transition hover:bg-white/20"
                style={{ fontFamily: 'var(--font-eyebrow)' }}
              >
                Host a celebration
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default RetreatHero;
