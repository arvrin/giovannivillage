'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * "Frames from the estate" — three frames that slowly rotate through a
 * curated pool of the estate's best photography. One frame cross-fades at a
 * time (round-robin), and a frame never receives an image that another frame
 * is currently showing. Honors prefers-reduced-motion by staying static.
 */

const POOL: { src: string; alt: string }[] = [
  { src: '/images/about/landscape-1.webp', alt: 'Mango groves across the estate' },
  { src: '/images/about/landscape-2.webp', alt: 'Lily ponds on the resort grounds' },
  { src: '/images/about/landscape-3.webp', alt: 'Lakeside path through the resort grounds' },
  { src: '/images/hero/hero-1.webp', alt: 'The forest canopy path to the estate' },
  { src: '/images/hero/landscape-2.webp', alt: 'Golden hour over the groves' },
  { src: '/images/hero/landscape-3.webp', alt: 'The forest at first light' },
  { src: '/images/experiences/open-air-theatre.webp', alt: 'The open-air theatre after dark' },
  { src: '/images/dining/gourmet-garden.webp', alt: 'The glass pavilion of Gourmet By The Woods from the garden' },
  { src: '/images/weddings/pihu-deck.webp', alt: 'An evening on the Pihu Deck by the pond' },
];

const INTERVAL_MS = 2200;
const FADE_S = 0.7;

const EstateFrames = () => {
  // Indices into POOL for the three frames.
  const [current, setCurrent] = useState<number[]>([0, 1, 2]);
  const ptrRef = useRef(3); // next pool candidate
  const turnRef = useRef(0); // which frame changes next

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      setCurrent((prev) => {
        const next = [...prev];
        // Advance to the next pool image not shown in ANY frame right now.
        let p = ptrRef.current % POOL.length;
        while (next.includes(p)) p = (p + 1) % POOL.length;
        next[turnRef.current % next.length] = p;
        ptrRef.current = p + 1;
        turnRef.current += 1;
        return next;
      });
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-16 mb-24 md:mb-32 grid md:grid-cols-3 gap-8">
      {current.map((poolIdx, frame) => {
        const img = POOL[poolIdx];
        return (
          <div key={frame} className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <AnimatePresence>
              <motion.div
                key={img.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: FADE_S, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default EstateFrames;
