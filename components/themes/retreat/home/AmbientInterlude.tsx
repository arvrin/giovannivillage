'use client';

import { motion } from 'framer-motion';
import VideoBlock from '@/components/themes/retreat/VideoBlock';

interface AmbientInterludeProps {
  src: string;
  poster: string;
  eyebrow: string;
  lead: string;
  accent: string;
  tail?: string;
  alt?: string;
  height?: 'sm' | 'md' | 'lg';
}

const heights = {
  sm: 'h-[55vh] min-h-[420px]',
  md: 'h-[72vh] min-h-[520px]',
  lg: 'h-[88vh] min-h-[620px]',
};

/**
 * Full-bleed cinematic punctuation between content sections.
 * A clip from the Giovanni video plays under a soft gradient, with a
 * single editorial line of copy (Onest + Hurricane accent).
 */
const AmbientInterlude = ({
  src,
  poster,
  eyebrow,
  lead,
  accent,
  tail = '',
  alt,
  height = 'md',
}: AmbientInterludeProps) => {
  return (
    <section className={`relative overflow-hidden bg-[color:var(--color-forest)] text-white ${heights[height]}`}>
      <VideoBlock src={src} poster={poster} alt={alt} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/45" />

      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-[1280px] px-5 pb-16 md:px-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9 }}
            className="max-w-3xl"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.55)' }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-white/60" />
              <span
                className="text-[10px] tracking-[0.42em] uppercase opacity-90 md:text-[11px]"
                style={{ fontFamily: 'var(--font-eyebrow)' }}
              >
                {eyebrow}
              </span>
            </div>
            <p className="display-italic text-[clamp(1.9rem,4.5vw,3.6rem)] leading-[1.15]">
              {lead}{' '}
              <span className="font-script">{accent}</span>
              {tail ? ` ${tail}` : ''}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AmbientInterlude;
