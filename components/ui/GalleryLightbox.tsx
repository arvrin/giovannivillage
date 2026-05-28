'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryItem } from '@/lib/gallery-types';

interface Props {
  items: GalleryItem[];
  /** Index of the currently open item, or null when closed */
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}

const SWIPE_THRESHOLD = 50; // px

/**
 * Full-screen image/video viewer with prev/next, keyboard nav,
 * mobile swipe, and accessible focus handling.
 */
export default function GalleryLightbox({ items, index, onClose, onNavigate }: Props) {
  const isOpen = index !== null && index >= 0 && index < items.length;
  const current = isOpen ? items[index] : null;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  // Track which sources we've already loaded so re-opens don't re-download.
  const [warmedSrcs] = useState<Set<string>>(() => new Set());

  const goPrev = useCallback(() => {
    if (index === null || items.length === 0) return;
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null || items.length === 0) return;
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  // Keyboard navigation + focus management
  useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', onKey);

    // Lock scroll on the page behind the modal
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen, onClose, goPrev, goNext]);

  // Warm adjacent images so the next/prev jump feels instant
  useEffect(() => {
    if (!isOpen || index === null) return;
    [items[(index + 1) % items.length], items[(index - 1 + items.length) % items.length]].forEach(
      (it) => {
        if (it && it.type !== 'video' && !warmedSrcs.has(it.src)) {
          const img = new window.Image();
          img.src = it.src;
          warmedSrcs.add(it.src);
        }
      },
    );
  }, [isOpen, index, items, warmedSrcs]);

  if (!isOpen || !current) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const dx = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx > 0) goPrev();
    else goNext();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${current.title} (${index + 1} of ${items.length})`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close */}
      <button
        ref={closeButtonRef}
        type="button"
        aria-label="Close gallery"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/70 md:right-6 md:top-6"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Counter */}
      <div
        className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-black/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white md:left-6 md:top-6"
        style={{ fontFamily: 'var(--font-eyebrow)' }}
      >
        {index + 1} / {items.length}
      </div>

      {/* Prev */}
      <button
        type="button"
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/70 md:left-6 md:h-14 md:w-14"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>

      {/* Next */}
      <button
        type="button"
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/70 md:right-6 md:h-14 md:w-14"
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      {/* Media */}
      <div
        className="relative flex h-full max-h-[92vh] w-full max-w-[92vw] flex-col items-center justify-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex w-full flex-1 items-center justify-center">
          {current.type === 'video' ? (
            <video
              key={current.src}
              src={current.src}
              poster={current.poster}
              controls
              autoPlay
              playsInline
              className="max-h-full max-w-full rounded-lg shadow-2xl"
            />
          ) : (
            <Image
              key={current.src}
              src={current.src}
              alt={current.title}
              width={current.width}
              height={current.height}
              priority
              sizes="92vw"
              className="max-h-[78vh] w-auto rounded-lg object-contain shadow-2xl"
            />
          )}
        </div>
        <div
          className="mt-6 text-center text-white"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <p className="font-heading text-xl md:text-2xl">{current.title}</p>
          {current.caption && (
            <p
              className="mt-2 text-sm text-white/70"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {current.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
