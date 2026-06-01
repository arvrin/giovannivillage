'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Ambient background music — gentle rains.
 *
 * Goal: get sound playing as early and seamlessly as possible without
 * fighting browser autoplay policy.
 *
 * Strategy (in order, each step falls through to the next if blocked):
 *   1. Try unmuted autoplay the instant we mount (parallel with the
 *      page loader). Returning visitors with high media-engagement
 *      get sound from frame one.
 *   2. If that fails, start MUTED autoplay so the element is already
 *      "playing" silently — most browsers allow this.
 *   3. On the very first user interaction (pointerdown / touchstart /
 *      keydown / wheel), unmute and crossfade up to volume. Because
 *      the element is already playing, switching `muted: false` does
 *      NOT require a fresh activation gesture on most browsers.
 *   4. Re-attempt on `visibilitychange` and `pageshow` (bfcache) too,
 *      so coming back to the tab can wake the sound up.
 *
 * The mute toggle persists a hard preference — a visitor who muted
 * before is never auto-started.
 */

const SRC = '/audio/ambient-rain.mp3';
const TARGET_VOLUME = 0.32;
const FADE_MS = 2400;
const STORAGE_KEY = 'gv-music'; // 'on' | 'off'

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRafRef = useRef<number | null>(null);
  // Has the audio reached audible playback at least once?
  const audibleRef = useRef(false);
  const gestureCleanupRef = useRef<(() => void) | null>(null);
  const [mounted, setMounted] = useState(false);
  const [userMuted, setUserMuted] = useState(false);
  const [audible, setAudible] = useState(false);

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
      // easeInOutQuad
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      a.volume = Math.max(0, Math.min(1, from + (target - from) * eased));
      if (t < 1) {
        fadeRafRef.current = requestAnimationFrame(step);
      } else {
        a.volume = target;
        onDone?.();
      }
    };
    fadeRafRef.current = requestAnimationFrame(step);
  };

  // ── Lifecycle ─────────────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);

    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    const startMuted = stored === 'off';
    setUserMuted(startMuted);

    const audio = new Audio(SRC);
    audio.loop = true;
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';
    // Setting a property on HTMLMediaElement helps some browsers (iOS Safari)
    // treat this as an in-page media element rather than a download.
    audio.setAttribute('playsinline', '');
    audio.volume = 0;
    audioRef.current = audio;

    // If the user explicitly muted on a previous visit, do nothing.
    if (startMuted) {
      return () => {
        audio.pause();
        audioRef.current = null;
      };
    }

    // Try unmuted first; fall back to muted; arm gesture for unmute.
    const tryUnmutedPlay = async () => {
      const a = audioRef.current;
      if (!a || audibleRef.current) return;
      a.muted = false;
      a.volume = 0;
      try {
        await a.play();
        // Sound is permitted — fade up.
        audibleRef.current = true;
        setAudible(true);
        fadeTo(TARGET_VOLUME, FADE_MS);
        cleanupGesture();
      } catch {
        // Most likely autoplay blocked. Fall through to muted attempt.
        tryMutedPlay();
      }
    };

    const tryMutedPlay = async () => {
      const a = audioRef.current;
      if (!a || audibleRef.current) return;
      a.muted = true;
      // Pre-warm target volume so unmute is instant.
      a.volume = TARGET_VOLUME;
      try {
        await a.play();
        // Silent playback running — wait for any gesture to unmute.
        armGesture();
      } catch {
        // Even muted play was rejected (rare). Still arm gesture; first
        // tap will retry from scratch with sound.
        armGesture();
      }
    };

    const onFirstGesture = () => {
      const a = audioRef.current;
      if (!a || audibleRef.current) {
        cleanupGesture();
        return;
      }
      const wasPlaying = !a.paused;
      a.muted = false;
      if (!wasPlaying) {
        a.volume = 0;
      } else {
        // Hold current (pre-warmed) volume to avoid a click, but force
        // through the fade from 0 for a smoother transition.
        a.volume = 0;
      }
      a.play()
        .then(() => {
          audibleRef.current = true;
          setAudible(true);
          fadeTo(TARGET_VOLUME, 1800);
          cleanupGesture();
        })
        .catch(() => {
          // Shouldn't happen post-gesture, but harmless to retry on the next.
        });
    };

    const armGesture = () => {
      if (gestureCleanupRef.current) return;
      const opts: AddEventListenerOptions = { passive: true, capture: true };
      const evs: (keyof WindowEventMap)[] = [
        'pointerdown',
        'touchstart',
        'keydown',
        'wheel',
        'click',
      ];
      evs.forEach((e) => window.addEventListener(e, onFirstGesture, opts));
      gestureCleanupRef.current = () => {
        evs.forEach((e) => window.removeEventListener(e, onFirstGesture, opts));
        gestureCleanupRef.current = null;
      };
    };

    const cleanupGesture = () => {
      gestureCleanupRef.current?.();
    };

    // ── Kick off (in parallel with PageLoader; do NOT wait for it) ──────
    tryUnmutedPlay();

    // Some browsers grant activation after the tab gets focus / bfcache
    // restore. Retry on these.
    const onVisible = () => {
      if (document.visibilityState === 'visible' && !audibleRef.current) {
        tryUnmutedPlay();
      }
    };
    const onPageShow = () => {
      if (!audibleRef.current) tryUnmutedPlay();
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('pageshow', onPageShow);

    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('pageshow', onPageShow);
      cleanupGesture();
      if (fadeRafRef.current) cancelAnimationFrame(fadeRafRef.current);
      audio.pause();
      audioRef.current = null;
      audibleRef.current = false;
    };
  }, []);

  // ── Manual mute toggle ─────────────────────────────────────────────────
  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (userMuted) {
      // Unmuting after a previous explicit mute.
      setUserMuted(false);
      localStorage.setItem(STORAGE_KEY, 'on');
      audio.muted = false;
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          audibleRef.current = true;
          setAudible(true);
          fadeTo(TARGET_VOLUME, 1500);
        })
        .catch(() => {});
    } else {
      // Muting — fade to silence then pause.
      setUserMuted(true);
      localStorage.setItem(STORAGE_KEY, 'off');
      fadeTo(0, 800, () => {
        audio.pause();
        audibleRef.current = false;
        setAudible(false);
      });
    }
  };

  if (!mounted) return null;

  // The icon reflects user intent (muted vs not). The gold dot indicates
  // audible playback is actually happening right now.
  const showAsMuted = userMuted;

  return (
    <button
      onClick={toggle}
      aria-label={showAsMuted ? 'Turn on ambient sound' : 'Mute ambient sound'}
      title={showAsMuted ? 'Sound on' : 'Sound off'}
      className="fixed z-[60] flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-colors hover:bg-[rgba(31,42,36,0.75)]"
      style={{
        bottom: 'calc(104px + env(safe-area-inset-bottom))',
        right: 'max(1.5rem, env(safe-area-inset-right))',
        background: 'rgba(31, 42, 36, 0.6)',
        border: '1px solid rgba(255,255,255,0.2)',
        color: '#FDFBF7',
      }}
    >
      {showAsMuted ? (
        <VolumeX className="h-4 w-4" strokeWidth={1.6} />
      ) : (
        <span className="relative flex items-center justify-center">
          <Volume2 className="h-4 w-4" strokeWidth={1.6} />
          {audible && (
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
