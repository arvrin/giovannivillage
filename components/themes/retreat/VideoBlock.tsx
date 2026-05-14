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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const start = () => {
      v.load();
      v.muted = true;
      v.play().catch(() => {});
    };
    if (!defer) {
      start();
      return;
    }
    if ('requestIdleCallback' in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(start);
    } else {
      setTimeout(start, 250);
    }
  }, [defer]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
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
