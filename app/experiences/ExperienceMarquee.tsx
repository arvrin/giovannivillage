'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface MItem {
  id: string;
  title: string;
  image: string;
}

/**
 * One horizontal marquee row. Auto-scrolls continuously, nudges with page-scroll
 * velocity (opposite per `dir`), and is natively swipeable (overflow-x). The
 * item set is duplicated so the loop is seamless; auto-scroll pauses while the
 * user is touching/hovering so a manual swipe takes over cleanly.
 */
function MarqueeRow({ items, dir }: { items: MItem[]; dir: 1 | -1 }) {
  const ref = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const lastY = useRef(0);
  const inited = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    lastY.current = window.scrollY;
    let raf = 0;
    const step = () => {
      const half = el.scrollWidth / 2;
      if (half > 0) {
        if (!inited.current) {
          if (dir < 0) el.scrollLeft = half;
          inited.current = true;
        }
        const y = window.scrollY;
        const dY = Math.max(-6, Math.min(6, y - lastY.current));
        lastY.current = y;
        if (!paused.current) {
          el.scrollLeft += dir * (0.4 + dY * 0.6);
        }
        if (el.scrollLeft >= half) el.scrollLeft -= half;
        else if (el.scrollLeft < 0) el.scrollLeft += half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const pause = () => {
      paused.current = true;
    };
    const resume = () => {
      paused.current = false;
    };
    el.addEventListener('pointerdown', pause);
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);
    window.addEventListener('pointerup', resume);
    window.addEventListener('pointercancel', resume);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerdown', pause);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
      window.removeEventListener('pointerup', resume);
      window.removeEventListener('pointercancel', resume);
    };
  }, [dir]);

  const doubled = [...items, ...items];
  return (
    <div
      ref={ref}
      className="flex gap-4 overflow-x-auto py-1 cursor-grab active:cursor-grabbing md:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {doubled.map((a, i) => (
        <div
          key={`${a.id}-${i}`}
          className="flex w-32 shrink-0 select-none flex-col items-center gap-3 rounded-[var(--radius-md)] bg-[var(--color-background-secondary)] p-5 text-center md:w-44"
        >
          <div className="relative h-12 w-12 shrink-0 md:h-16 md:w-16">
            <Image
              src={a.image}
              alt={a.title}
              fill
              className="object-contain"
              sizes="64px"
              draggable={false}
            />
          </div>
          <p
            className="text-xs font-medium text-[var(--color-text)] md:text-sm"
            style={{ lineHeight: 1.35 }}
          >
            {a.title}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Two opposing, scroll-reactive, swipeable rows of the experience icons. */
export default function ExperienceMarquee({ items }: { items: MItem[] }) {
  const mid = Math.ceil(items.length / 2);
  return (
    <div className="space-y-4 overflow-hidden md:space-y-6">
      <MarqueeRow items={items.slice(0, mid)} dir={1} />
      <MarqueeRow items={items.slice(mid)} dir={-1} />
    </div>
  );
}
