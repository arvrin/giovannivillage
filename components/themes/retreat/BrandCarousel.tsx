'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import type { Brand } from '@/lib/brands';

interface BrandCarouselProps {
  brands: Brand[];
  /** Called when the user clicks any link inside the carousel. The menu uses
   *  this to close itself when a brand is opened. */
  onLinkClick?: () => void;
  /** Auto-advance interval in ms. */
  intervalMs?: number;
}

const BrandCarousel = ({
  brands,
  onLinkClick,
  intervalMs = 5000,
}: BrandCarouselProps) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (paused || brands.length <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % brands.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [paused, brands.length, intervalMs]);

  if (brands.length === 0) return null;
  const b = brands[active];

  const go = (dir: number) =>
    setActive((i) => (i + dir + brands.length) % brands.length);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
    setPaused(false);
  };

  return (
    <div
      className="relative touch-pan-y select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
        <AnimatePresence mode="wait">
          <motion.div
            key={b.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <div
              className={`relative aspect-[5/3] w-full overflow-hidden ${
                b.isLogo ? 'bg-[color:var(--color-forest)]' : ''
              }`}
            >
              {b.isLogo ? (
                <div className="flex h-full w-full items-center justify-center p-10">
                  <Image
                    src={b.image}
                    alt={b.name}
                    width={260}
                    height={140}
                    className="h-full w-auto max-h-24 object-contain"
                  />
                </div>
              ) : (
                <Image
                  src={b.image}
                  alt={b.name}
                  fill
                  sizes="(max-width:768px) 100vw, 40vw"
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <span
                className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-[9px] tracking-[0.3em] uppercase text-white backdrop-blur-md"
                style={{ fontFamily: 'var(--font-eyebrow)' }}
              >
                {b.tagline}
              </span>
            </div>

            <div className="flex flex-col gap-2 p-5">
              <h3 className="display-italic text-2xl leading-tight text-white">
                <span className="font-script">{b.name.split(' ')[0]}</span>{' '}
                {b.name.split(' ').slice(1).join(' ')}
              </h3>
              {b.location && (
                <p
                  className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-white/60"
                  style={{ fontFamily: 'var(--font-eyebrow)' }}
                >
                  <MapPin className="h-3 w-3" />
                  {b.location}
                </p>
              )}
              <p
                className="mt-1 text-[13px] leading-[1.65] text-white/80"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {b.description}
              </p>
              <div className="mt-3">
                {b.href ? (
                  <Link
                    href={b.href}
                    target={b.external ? '_blank' : undefined}
                    rel={b.external ? 'noreferrer' : undefined}
                    onClick={onLinkClick}
                    className="font-eyebrow inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white transition hover:text-[color:var(--color-brass)]"
                  >
                    Explore {b.name.split(' ')[1] ?? b.name}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <span
                    className="font-eyebrow text-[10px] uppercase tracking-[0.28em] text-white/55"
                  >
                    Studio · website soon
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {brands.map((br, i) => (
          <button
            key={br.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${br.name}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active
                ? 'w-7 bg-[color:var(--color-brass)]'
                : 'w-1.5 bg-white/30 hover:bg-white/55'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandCarousel;
