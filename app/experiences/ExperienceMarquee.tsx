'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface MItem {
  id: string;
  title: string;
  image: string;
}

/**
 * One marquee row. Smooth GPU transform (translate3d) auto-scroll — no native
 * scrollLeft, so it never fights the browser. Page-scroll adds a gentle,
 * decaying speed boost. Pointer drag (`touch-action: pan-y` keeps vertical page
 * scroll free) lets the user swipe the row left/right; auto-scroll pauses while
 * dragging or hovering and resumes from wherever it's left.
 */
function MarqueeRow({ items, dir }: { items: MItem[]; dir: 1 | -1 }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    let offset = 0;
    let setWidth = track.scrollWidth / 2;
    let dragging = false;
    let hovering = false;
    let startX = 0;
    let startOffset = 0;
    let boost = 0;
    let lastY = window.scrollY;
    let last = performance.now();
    let raf = 0;

    if (dir < 0) offset = -setWidth;

    const wrap = () => {
      if (setWidth <= 0) return;
      while (offset <= -setWidth) offset += setWidth;
      while (offset > 0) offset -= setWidth;
    };
    const apply = () => {
      track.style.transform = `translate3d(${offset}px,0,0)`;
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (setWidth <= 0) setWidth = track.scrollWidth / 2;
      if (!dragging && !hovering && setWidth > 0) {
        offset += dir * (32 + boost) * dt;
        boost *= Math.pow(0.9, dt * 60);
        wrap();
        apply();
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onScroll = () => {
      const y = window.scrollY;
      boost += Math.min(700, Math.abs(y - lastY) * 14);
      lastY = y;
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      startOffset = offset;
      viewport.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      offset = startOffset + (e.clientX - startX);
      wrap();
      apply();
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      try {
        viewport.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };
    const onResize = () => {
      setWidth = track.scrollWidth / 2;
    };
    const enter = () => {
      hovering = true;
    };
    const leave = () => {
      hovering = false;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    viewport.addEventListener('pointerdown', onDown);
    viewport.addEventListener('pointermove', onMove);
    viewport.addEventListener('pointerup', onUp);
    viewport.addEventListener('pointercancel', onUp);
    viewport.addEventListener('mouseenter', enter);
    viewport.addEventListener('mouseleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      viewport.removeEventListener('pointerdown', onDown);
      viewport.removeEventListener('pointermove', onMove);
      viewport.removeEventListener('pointerup', onUp);
      viewport.removeEventListener('pointercancel', onUp);
      viewport.removeEventListener('mouseenter', enter);
      viewport.removeEventListener('mouseleave', leave);
    };
  }, [dir]);

  const doubled = [...items, ...items];
  return (
    <div
      ref={viewportRef}
      className="overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'pan-y' }}
    >
      <div ref={trackRef} className="flex w-max gap-5 will-change-transform md:gap-6">
        {doubled.map((a, i) => (
          <div
            key={`${a.id}-${i}`}
            className="group flex w-48 shrink-0 select-none flex-col items-center gap-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-7 text-center md:w-56"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-background-secondary)] ring-1 ring-[var(--color-bronze)]/25 transition-all duration-500 group-hover:ring-2 group-hover:ring-[var(--color-bronze)]/60 md:h-28 md:w-28">
              <div className="relative h-14 w-14 md:h-16 md:w-16">
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  className="object-contain"
                  sizes="64px"
                  draggable={false}
                />
              </div>
            </div>
            <p className="text-sm font-medium leading-snug text-[var(--color-text)] md:text-base">
              {a.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Two opposing, scroll-reactive, swipeable rows of the experience icons. */
export default function ExperienceMarquee({ items }: { items: MItem[] }) {
  const mid = Math.ceil(items.length / 2);
  return (
    <div className="space-y-5 md:space-y-6">
      <MarqueeRow items={items.slice(0, mid)} dir={1} />
      <MarqueeRow items={items.slice(mid)} dir={-1} />
    </div>
  );
}
