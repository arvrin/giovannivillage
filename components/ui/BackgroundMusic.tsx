'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Ambient background music — "gentle rains".
 *
 * Behaviour:
 *  - Waits for the `gv-loader-done` event (fired by PageLoader as the splash
 *    leaves) before doing anything.
 *  - Attempts autoplay. Browsers block audio-with-sound autoplay unless the
 *    user has already interacted with the page, so if play() rejects we arm
 *    one-time gesture listeners (pointer / key / touch / scroll) and start on
 *    the first interaction instead.
 *  - Fades volume in over ~3s so it never "pops" in.
 *  - A small mute toggle, bottom-left. The choice persists in localStorage —
 *    if a returning visitor muted it, we don't auto-start.
 */

const SRC = '/audio/ambient-rain.mp3';
const TARGET_VOLUME = 0.32;          // background level — present, not intrusive
const FADE_MS = 3000;
const STORAGE_KEY = 'gv-music';      // 'on' | 'off'

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRafRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  // ── Volume fade helper ────────────────────────────────────────────────
  const fadeTo = (target: number, ms: number, onDone?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRafRef.current) cancelAnimationFrame(fadeRafRef.current);
    const from = audio.volume;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      // ease-in-out
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      audio.volume = from + (target - from) * eased;
      if (t < 1) {
        fadeRafRef.current = requestAnimationFrame(step);
      } else {
        audio.volume = target;
        onDone?.();
      }
    };
    fadeRafRef.current = requestAnimationFrame(step);
  };

  // ── Mount ─────────────────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    const startMuted = stored === 'off';
    setMuted(startMuted);

    const audio = new Audio(SRC);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;
    audioRef.current = audio;

    let started = false;
    let gestureCleanup: (() => void) | null = null;

    const beginPlayback = () => {
      if (started) return;
      const a = audioRef.current;
      if (!a) return;
      started = true;
      a.volume = 0;
      a.play()
        .then(() => {
          setPlaying(true);
          fadeTo(TARGET_VOLUME, FADE_MS);
        })
        .catch(() => {
          // Shouldn't happen here (we only call this post-gesture), but be safe.
          started = false;
        });
      gestureCleanup?.();
    };

    const armGestureFallback = () => {
      const onGesture = () => beginPlayback();
      const opts: AddEventListenerOptions = { once: true, passive: true, capture: true };
      window.addEventListener('pointerdown', onGesture, opts);
      window.addEventListener('keydown', onGesture, opts);
      window.addEventListener('touchstart', onGesture, opts);
      window.addEventListener('scroll', onGesture, opts);
      gestureCleanup = () => {
        window.removeEventListener('pointerdown', onGesture, opts);
        window.removeEventListener('keydown', onGesture, opts);
        window.removeEventListener('touchstart', onGesture, opts);
        window.removeEventListener('scroll', onGesture, opts);
      };
    };

    const onLoaderDone = () => {
      // Respect a prior "off" choice — don't auto-start.
      if (startMuted) return;
      const a = audioRef.current;
      if (!a) return;
      // Try straight autoplay; if blocked, wait for the first user gesture.
      a.volume = 0;
      a.play()
        .then(() => {
          started = true;
          setPlaying(true);
          fadeTo(TARGET_VOLUME, FADE_MS);
        })
        .catch(() => {
          armGestureFallback();
        });
    };

    window.addEventListener('gv-loader-done', onLoaderDone, { once: true });
    // Fallback — if the event never fires (edge case), proceed after 2.6s.
    const fallbackTimer = window.setTimeout(onLoaderDone, 2600);

    return () => {
      window.removeEventListener('gv-loader-done', onLoaderDone);
      window.clearTimeout(fallbackTimer);
      gestureCleanup?.();
      if (fadeRafRef.current) cancelAnimationFrame(fadeRafRef.current);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // ── Mute toggle ───────────────────────────────────────────────────────
  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      // Unmute → play + fade in
      setMuted(false);
      localStorage.setItem(STORAGE_KEY, 'on');
      audio.volume = 0;
      audio.play().then(() => {
        setPlaying(true);
        fadeTo(TARGET_VOLUME, 1600);
      }).catch(() => {});
    } else {
      // Mute → fade out + pause
      setMuted(true);
      localStorage.setItem(STORAGE_KEY, 'off');
      fadeTo(0, 900, () => {
        audio.pause();
        setPlaying(false);
      });
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label={muted ? 'Turn on ambient sound' : 'Mute ambient sound'}
      title={muted ? 'Sound on' : 'Sound off'}
      className="group fixed bottom-5 left-5 z-[70] flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-colors"
      style={{
        background: 'rgba(31, 42, 36, 0.55)',
        border: '1px solid rgba(255,255,255,0.18)',
        color: '#FDFBF7',
      }}
    >
      {muted ? (
        <VolumeX className="h-4 w-4" strokeWidth={1.6} />
      ) : (
        <span className="relative flex items-center justify-center">
          <Volume2 className="h-4 w-4" strokeWidth={1.6} />
          {playing && (
            <span
              className="absolute -right-1.5 -top-1.5 h-1.5 w-1.5 rounded-full"
              style={{ background: '#C9A961' }}
            />
          )}
        </span>
      )}
    </button>
  );
};

export default BackgroundMusic;
