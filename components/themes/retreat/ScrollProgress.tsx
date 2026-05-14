'use client';

import { motion, useScroll } from 'framer-motion';

/**
 * Hair-thin scroll progress bar pinned at the top of the viewport.
 * Replaces the previous left-side vertical rail.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[color:var(--color-brass)]"
    />
  );
};

export default ScrollProgress;
