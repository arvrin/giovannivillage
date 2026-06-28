'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface DiningImageSwitcherProps {
  /** Two (or more) photos of the same venue to cross-fade between. */
  images: string[];
  alt: string;
  /** Time each photo holds before fading to the next, ms. */
  intervalMs?: number;
}

/**
 * A dining-card image that quietly cross-fades between a couple of photos of
 * the same venue (e.g. the Pihu rooftop or the lakeside Gazebo, seen two ways).
 * Pauses when off-screen. Mirrors the dining card's aspect so it drops in where
 * a single <Image> used to sit.
 */
export default function DiningImageSwitcher({
  images,
  alt,
  intervalMs = 3000,
}: DiningImageSwitcherProps) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  // Only animate while the card is in (or near) the viewport.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '200px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || images.length <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [visible, images.length, intervalMs]);

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] lg:aspect-[5/4] rounded-lg overflow-hidden bg-[var(--color-background-secondary)]"
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? alt : ''}
          fill
          priority={i === 0}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover transition-opacity duration-[1500ms] ease-out ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
}
