'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const PROMISES = [
  { v: '23', l: 'Acres of estate' },
  { v: '10', l: 'Room categories' },
  { v: '05', l: 'Event venues' },
  { v: '03', l: 'Restaurants' },
];

const Discover = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

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
    <section className="relative bg-[color:var(--color-bg)] py-24 md:py-36">
      <div className="mx-auto max-w-[1280px] px-5 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-baseline gap-4"
        >
          <span className="h-px w-12 bg-[color:var(--color-border-strong)]" />
          <span
            className="text-[11px] tracking-[0.36em] uppercase text-[color:var(--color-text-tertiary)]"
            style={{ fontFamily: 'var(--font-eyebrow)' }}
          >
            The estate
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9 }}
            className="relative aspect-[4/3] overflow-hidden rounded-md md:col-span-7"
          >
            <Image
              src="/images/weddings/cocktail-lawn.webp"
              alt="Estate lawn set for an evening cocktail celebration"
              fill
              sizes="(max-width:768px) 100vw, 800px"
              priority={false}
              className={`object-cover transition-opacity duration-1000 ${loaded ? 'opacity-0' : 'opacity-100'}`}
            />
            <video
              ref={videoRef}
              poster="/images/weddings/cocktail-lawn.webp"
              muted
              loop
              playsInline
              preload="none"
              onLoadedData={() => setLoaded(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            >
              <source src="/Giovanni-Video-Presentation.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative bg-[color:var(--color-bg-card)] p-8 md:col-span-6 md:col-start-7 md:-mt-24 md:p-14 md:ml-[-8%] rounded-md shadow-[var(--shadow-md)]"
          >
            <h2 className="display-italic text-[2.1rem] leading-[1.12] md:text-[3rem] md:leading-[1.08]">
              A place that holds <span className="font-script">every kind</span> of guest.
            </h2>
            <div
              className="mt-6 space-y-4 text-[15px] leading-[1.85] text-[color:var(--color-text-secondary)]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <p>
                Brides, naturalists, weekending families, second-honeymooners,
                conference delegates, toddlers chasing peacocks — Giovanni
                Village holds them all without losing its quiet.
              </p>
              <p>
                Ten acres of mango groves and lily ponds, ten room categories
                that face green, three dining venues, eleven event spaces, and a
                spa built for the long way home.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-y-6 border-t border-[color:var(--color-border)] pt-8">
              {PROMISES.map((s) => (
                <div key={s.l}>
                  <dt className="display-italic text-[2rem] leading-none" style={{ fontWeight: 400 }}>
                    {s.v}
                  </dt>
                  <dd
                    className="mt-2 text-[10px] tracking-[0.3em] uppercase text-[color:var(--color-text-tertiary)]"
                    style={{ fontFamily: 'var(--font-eyebrow)' }}
                  >
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Discover;
