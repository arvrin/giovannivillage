'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
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

/* Ordering note (performance, not editorial): the FIRST line must carry the
   longest description of the set. Each rotation re-creates the <p> as a new
   DOM node, and a later, larger paint would become a new LCP candidate —
   with the largest line first, LCP settles at the initial paint. */
const HERO_LINES: HeroLine[] = [
  {
    lead: 'fall asleep to the',
    script: 'forest',
    tail: '.',
    description:
      'Ten room categories at the edge of Ratapani Tiger Reserve — five hundred square kilometres of teak forest just past the gate, and a naturalist who knows where the leopards drink.',
  },
  {
    script: 'remember',
    tail: 'what slow feels like.',
    description:
      'A luxury estate folded into twenty-three acres of forest — for the wedding of a lifetime, a weekend that resets you, or a safari you came for and a sunset you stayed for.',
  },
  {
    lead: 'remember what',
    script: 'fresh',
    tail: 'tastes like.',
    description:
      'Royalton Farms is inside our gates. The vegetables walk in by sunrise, the milk arrives still warm, and the kitchens cook from whatever the land gave today.',
  },
  {
    script: 'marry',
    tail: 'by the lakeside.',
    description:
      'Eleven venues across twenty-three acres — from a pillarless 10,000 sq ft hall to a lakeside lawn with sunset pheras — and a planner who only does your wedding.',
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

  // Rotation fades the SAME two DOM nodes out, swaps their text, and fades
  // back in. Never re-create these elements (the old AnimatePresence-keyed
  // swap did): each freshly-mounted headline/description registers as a NEW
  // largest-contentful-paint candidate, so in lab conditions (no user input,
  // which is what freezes LCP) every rotation pushed the page's LCP later.
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    if (HERO_LINES.length <= 1) return;
    let swapTimer: number | undefined;
    const id = window.setInterval(() => {
      setFaded(true);
      swapTimer = window.setTimeout(() => {
        setActiveLine((i) => (i + 1) % HERO_LINES.length);
        setFaded(false);
      }, 500);
    }, ROTATION_INTERVAL);
    return () => {
      window.clearInterval(id);
      if (swapTimer) window.clearTimeout(swapTimer);
    };
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
        {/* No `poster` attr — it re-downloads the hero image raw (428KB,
            unoptimized) next to the next/image version above. */}
        <video
          ref={videoRef}
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
          {/* CSS entrance (.gv-hero-enter), not framer-motion: this block is
              the LCP element, and a motion.div holds it at opacity:0 until
              React hydrates — ~3s of pure render delay on mobile. */}
          <div
            className="gv-hero-enter max-w-3xl text-white"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}
          >
            <h1 className="display-italic text-[clamp(2rem,7vw,5.5rem)] leading-[1.08] text-white">
              A place to{' '}
              <motion.span
                animate={{ opacity: faded ? 0 : 1, y: faded ? -8 : 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block align-baseline"
              >
                {line.lead ? <>{line.lead} </> : null}
                <span className="font-script">{line.script}</span>
                {line.tail.startsWith('.') ? line.tail : ` ${line.tail}`}
              </motion.span>
            </h1>
            {/* Min-h reserves the largest description's height so the CTAs below
                don't shift when the line swaps. */}
            <div className="mt-6 min-h-[6.5rem] max-w-md md:min-h-[7.5rem]">
              <motion.p
                animate={{ opacity: faded ? 0 : 1, y: faded ? -6 : 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[15px] leading-[1.85] text-white/90 md:text-base"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {line.description}
              </motion.p>
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
          </div>

        </div>
      </div>
    </section>
  );
};

export default RetreatHero;
