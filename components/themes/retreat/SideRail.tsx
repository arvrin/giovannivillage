'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Facebook } from 'lucide-react';
import { siteConfig } from '@/lib/data';

const SideRail = () => {
  const { scrollYProgress } = useScroll();
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-[max(0.75rem,env(safe-area-inset-left))] z-30 hidden w-[60px] md:flex md:flex-col md:items-center md:justify-between md:py-32"
    >
      <div className="pointer-events-auto flex flex-col items-center gap-3">
        <span
          className="font-eyebrow text-[10px] tracking-[0.3em] text-[color:var(--color-text-tertiary)]"
          style={{ writingMode: 'vertical-rl' }}
        >
          GIOVANNI · BHOPAL
        </span>
      </div>

      <div className="relative h-[40vh] w-[1px] bg-[color:var(--color-border)]">
        <motion.div
          className="absolute inset-x-0 top-0 bg-[color:var(--color-forest)]"
          style={{ height: lineHeight, width: '1px' }}
        />
      </div>

      <div className="pointer-events-auto flex flex-col gap-2">
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-forest)] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-brass)]"
        >
          <Instagram className="h-4 w-4" />
        </a>
        <a
          href={siteConfig.social.facebook}
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-forest)] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-brass)]"
        >
          <Facebook className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default SideRail;
