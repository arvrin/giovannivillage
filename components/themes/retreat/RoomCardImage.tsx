'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface RoomCardImageProps {
  /** All images to cycle through. First image is the lead/eager-loaded one. */
  images: string[];
  alt: string;
  /** Interval between transitions, ms. */
  intervalMs?: number;
}

/**
 * A room-card image that quietly cross-fades through the room gallery.
 * Pauses when the card is off-screen (cheap perf win — 8 rooms × ~10 images
 * would otherwise all be animating in the background).
 */
const RoomCardImage = ({
  images,
  alt,
  intervalMs = 2500,
}: RoomCardImageProps) => {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  // Only animate when the card is in (or near) the viewport.
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
      className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[var(--color-background-secondary)]"
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? alt : ''}
          fill
          priority={i === 0}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover transition-opacity duration-[1200ms] ease-out hover:scale-105 ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
};

export default RoomCardImage;
