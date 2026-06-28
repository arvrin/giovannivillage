'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { hero } from '@/lib/data';

/** Rotating hero lines. Each is anchored to "A place to" — the brand promise —
 *  and finishes on a different pillar of the property (slow living, the farm,
 *  the forest, weddings, the spa). Visitor watching all five gets the full
 *  pitch in under thirty seconds. */
interface HeroLine {
  /** Optional prefix between "A place to" and the scripted accent word. */
  lead?: string;
  /** The Hurricane-script accent word. */
  script: string;
  /** Plain-text tail after the script word, including ending punctuation. */
  tail: string;
  /** Sub-headline rendered below the h1. */
  description: string;
}

const HERO_LINES: HeroLine[] = [
  {
    script: 'remember',
    tail: 'what slow feels like.',
    description:
      'An uber-luxury estate folded into ten acres of forest — for the wedding of a lifetime, a weekend that resets you, or a safari you came for and a sunset you stayed for.',
  },
  {
    lead: 'remember what',
    script: 'fresh',
    tail: 'tastes like.',
    description:
      'Royalton Farms is inside our gates. The vegetables walk in by sunrise, the milk arrives still warm, and the kitchens cook from whatever the land gave today.',
  },
  {
    lead: 'fall asleep to the',
    script: 'forest',
    tail: '.',
    description:
      'Ten room categories at the edge of Ratapani Tiger Reserve — five hundred square kilometres of teak forest just past the gate, and a naturalist who knows where the leopards drink.',
  },
  {
    script: 'marry',
    tail: 'by the lakeside.',
    description:
      'Eleven venues across ten acres — from a pillarless 10,000 sq ft hall to a lakeside lawn with sunset pheras — and a planner who only does your wedding.',
  },
  {
    lead: 'find the long way',
    script: 'home',
    tail: '.',
    description:
      'Elysium Spa: forest oils, warm stone, unhurried hands. The kind of rest a busy life forgets it needs.',
  },
];

/** Time between line swaps, ms. Long enough to read the description. */
const ROTATION_INTERVAL = 4500;

const RetreatHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [activeLine, setActiveLine] = useState(0);

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

  // Rotate the hero line + description.
  useEffect(() => {
    if (HERO_LINES.length <= 1) return;
    const id = setInterval(() => {
      setActiveLine((i) => (i + 1) % HERO_LINES.length);
    }, ROTATION_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const line = HERO_LINES[activeLine];

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
        <div />{/* spacer — no location stamp; the imagery and headline carry the room */}

        <div className="flex flex-col items-start gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-3xl text-white"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}
          >
            <h1 className="display-italic text-[clamp(2rem,7vw,5.5rem)] leading-[1.08] text-white">
              A place to{' '}
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={activeLine}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block align-baseline"
                >
                  {line.lead ? <>{line.lead} </> : null}
                  <span className="font-script">{line.script}</span>
                  {line.tail.startsWith('.') ? line.tail : ` ${line.tail}`}
                </motion.span>
              </AnimatePresence>
            </h1>
            {/* Min-h reserves the largest description's height so the CTAs below
                don't shift when the line swaps. */}
            <div className="mt-6 min-h-[6.5rem] max-w-md md:min-h-[7.5rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={activeLine}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[15px] leading-[1.85] text-white/90 md:text-base"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {line.description}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="light" size="lg" href="/rooms">
                Plan a stay
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
              <Button variant="light-outline" size="lg" href="/weddings">
                Host a celebration
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default RetreatHero;
