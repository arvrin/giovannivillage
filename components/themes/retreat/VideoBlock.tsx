'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface VideoBlockProps {
  src: string;
  poster: string;
  alt?: string;
  className?: string;
  /** Defer loading until the user is idle (matches the hero/estate pattern). */
  defer?: boolean;
  /** Load aggressively. Use for above-the-fold heroes. Skips the IntersectionObserver
   *  wait, sets preload="auto", and uses onCanPlay (enough buffered to actually play)
   *  instead of onLoadedData (just first frame decoded) so the fade-in feels solid. */
  eager?: boolean;
}

/**
 * Reusable looping silent background video with poster crossfade.
 * Matches the load pattern used by the hero and estate sections.
 */
const VideoBlock = ({
  src,
  poster,
  alt = '',
  className = '',
  defer = true,
  eager = false,
}: VideoBlockProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    const c = containerRef.current;
    if (!v || !c) return;
    const start = () => {
      v.load();
      v.muted = true;
      v.play().catch(() => {});
    };
    if (eager || !defer) {
      // Above-the-fold heroes — start immediately, don't wait for observer.
      start();
      return;
    }
    // Below-the-fold — only load once it scrolls near the viewport.
    if (typeof IntersectionObserver === 'undefined') {
      setTimeout(start, 250);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );
    io.observe(c);
    return () => io.disconnect();
  }, [defer, eager]);

  // For eager loads use the slightly snappier 700ms crossfade; for lazy ones
  // keep the dreamy 1200ms since the user has been on the page for a while.
  const fadeMs = eager ? 700 : 1200;

  return (
    <div ref={containerRef} className={`relative h-full w-full overflow-hidden ${className}`}>
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="100vw"
        priority={eager}
        className="object-cover transition-opacity ease-out"
        style={{
          transitionDuration: `${fadeMs}ms`,
          opacity: ready ? 0 : 1,
        }}
      />
      <video
        ref={videoRef}
        poster={poster}
        muted
        loop
        playsInline
        preload={eager ? 'auto' : 'none'}
        onCanPlay={() => setReady(true)}
        className="absolute inset-0 h-full w-full object-cover transition-opacity ease-out"
        style={{
          transitionDuration: `${fadeMs}ms`,
          opacity: ready ? 1 : 0,
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBlock;
