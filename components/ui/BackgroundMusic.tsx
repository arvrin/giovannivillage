'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Ambient background music — "gentle rains".
 *
 * Behaviour:
 *  - Waits for the `gv-loader-done` event (fired by PageLoader as the splash
 *    leaves), then *attempts* autoplay.
 *  - Browsers block audio-with-sound until the user grants "user activation".
 *    Only real interactions count — click / tap / keydown. Scroll and
 *    mousemove explicitly DO NOT. So the gesture fallback listens for
 *    pointerdown / keydown / touchend only, and keeps the listeners armed
 *    until a play() call actually succeeds (a failed attempt must not burn
 *    the listeners).
 *  - Fades volume in over ~3s so it never "pops" in.
 *  - A small mute toggle, bottom-left, persisted in localStorage — a
 *    returning visitor who muted it is not auto-started.
 */

const SRC = '/audio/ambient-rain.mp3';
const TARGET_VOLUME = 0.32;
const FADE_MS = 3000;
const STORAGE_KEY = 'gv-music'; // 'on' | 'off'

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRafRef = useRef<number | null>(null);
  const startedRef = useRef(false);
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
      const a = audioRef.current;
      if (!a) return;
      const t = Math.min(1, (now - start) / ms);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      a.volume = from + (target - from) * eased;
      if (t < 1) {
        fadeRafRef.current = requestAnimationFrame(step);
      } else {
        a.volume = target;
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

    let gestureCleanup: (() => void) | null = null;

    // Try to start playback. On success: fade in, clear gesture listeners.
    // On failure: leave gesture listeners armed for the next real interaction.
    const tryPlay = () => {
      const a = audioRef.current;
      if (!a || startedRef.current) return;
      a.volume = 0;
      a.play()
        .then(() => {
          startedRef.current = true;
          setPlaying(true);
          fadeTo(TARGET_VOLUME, FADE_MS);
          gestureCleanup?.();
          gestureCleanup = null;
        })
        .catch(() => {
          // Still blocked — keep the gesture listeners armed.
        });
    };

    // Listen ONLY for events that grant user activation. Crucially NOT
    // scroll/mousemove — those never unlock audio and would just waste
    // the attempt. No { once } either — we keep listening until a play()
    // actually succeeds.
    const armGestureFallback = () => {
      if (gestureCleanup) return; // already armed
      const opts: AddEventListenerOptions = { passive: true, capture: true };
      window.addEventListener('pointerdown', tryPlay, opts);
      window.addEventListener('keydown', tryPlay, opts);
      window.addEventListener('touchend', tryPlay, opts);
      gestureCleanup = () => {
        window.removeEventListener('pointerdown', tryPlay, opts);
        window.removeEventListener('keydown', tryPlay, opts);
        window.removeEventListener('touchend', tryPlay, opts);
      };
    };

    const onLoaderDone = () => {
      if (startMuted || startedRef.current) return;
      // Attempt straight autoplay; if blocked, arm the gesture fallback.
      const a = audioRef.current;
      if (!a) return;
      a.volume = 0;
      a.play()
        .then(() => {
          startedRef.current = true;
          setPlaying(true);
          fadeTo(TARGET_VOLUME, FADE_MS);
        })
        .catch(() => {
          armGestureFallback();
        });
    };

    window.addEventListener('gv-loader-done', onLoaderDone, { once: true });
    // Fallback if the event never fires (edge case).
    const fallbackTimer = window.setTimeout(onLoaderDone, 2600);

    return () => {
      window.removeEventListener('gv-loader-done', onLoaderDone);
      window.clearTimeout(fallbackTimer);
      gestureCleanup?.();
      if (fadeRafRef.current) cancelAnimationFrame(fadeRafRef.current);
      audio.pause();
      audioRef.current = null;
      startedRef.current = false;
    };
  }, []);

  // ── Mute toggle ───────────────────────────────────────────────────────
  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      setMuted(false);
      localStorage.setItem(STORAGE_KEY, 'on');
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          startedRef.current = true;
          setPlaying(true);
          fadeTo(TARGET_VOLUME, 1600);
        })
        .catch(() => {});
    } else {
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
      className="fixed bottom-5 left-5 z-[70] flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-colors"
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
