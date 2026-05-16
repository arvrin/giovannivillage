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
}

/**
 * Reusable looping silent background video with poster crossfade.
 * Matches the load pattern used by the hero and estate sections.
 */
const VideoBlock = ({ src, poster, alt = '', className = '', defer = true }: VideoBlockProps) => {
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
    if (!defer) {
      start();
      return;
    }
    // Only load the video once it scrolls near the viewport — saves cellular bandwidth.
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
  }, [defer]);

  return (
    <div ref={containerRef} className={`relative h-full w-full overflow-hidden ${className}`}>
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="100vw"
        className={`object-cover transition-opacity duration-[1200ms] ${ready ? 'opacity-0' : 'opacity-100'}`}
      />
      <video
        ref={videoRef}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        onLoadedData={() => setReady(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ${ready ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBlock;
