'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X } from 'lucide-react';

type ThemeName = 'editorial' | 'modernist' | 'cinematic' | 'monograph' | 'retreat';

interface ThemeOption {
  id: ThemeName;
  label: string;
  blurb: string;
  swatches: [string, string, string];
}

const OPTIONS: ThemeOption[] = [
  {
    id: 'editorial',
    label: 'Editorial',
    blurb: 'Refined sanctuary · Aman / Capella',
    swatches: ['#FDFBF7', '#E8DCC4', '#C9A961'],
  },
  {
    id: 'modernist',
    label: 'Modernist',
    blurb: 'Geometric architectural · Belmond / Bulgari',
    swatches: ['#F8F6F1', '#1F2A24', '#0F0F0E'],
  },
  {
    id: 'cinematic',
    label: 'Cinematic',
    blurb: 'Fashion-editorial dark · EDITION / Faena',
    swatches: ['#0F0F0E', '#1A1818', '#C9A961'],
  },
  {
    id: 'monograph',
    label: 'Monograph',
    blurb: 'Editorial layout · Modernist palette',
    swatches: ['#F8F6F1', '#ECE7DC', '#1F2A24'],
  },
  {
    id: 'retreat',
    label: 'Retreat',
    blurb: 'Editorial × Modernist · Onest + Hurricane',
    swatches: ['#FDFBF7', '#C9A961', '#1F2A24'],
  },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('preview') === '0') setHidden(true);
    }
  }, []);

  if (!mounted || hidden) return null;

  const current = (theme as ThemeName) || 'editorial';

  return (
    <div className="fixed bottom-5 left-5 z-[80] font-sans">
      <AnimatePresence mode="wait" initial={false}>
        {!open ? (
          <motion.button
            key="trigger"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(true)}
            aria-label="Open design switcher"
            className="group flex items-center gap-2 rounded-full bg-black/85 px-4 py-2.5 text-sm text-white shadow-lg backdrop-blur-sm transition hover:bg-black"
          >
            <Palette className="h-4 w-4" />
            <span className="font-medium uppercase tracking-wider text-xs" style={{ letterSpacing: '0.1em' }}>
              Design — {current}
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: [0.215, 0.61, 0.355, 1] }}
            className="w-[320px] rounded-xl bg-black/90 p-4 text-white shadow-2xl backdrop-blur-md"
            role="dialog"
            aria-label="Design switcher"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60" style={{ letterSpacing: '0.15em' }}>
                Choose Design
              </p>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close switcher"
                className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="space-y-1.5">
              {OPTIONS.map((opt) => {
                const active = opt.id === current;
                return (
                  <li key={opt.id}>
                    <button
                      onClick={() => {
                        setTheme(opt.id);
                      }}
                      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                        active ? 'bg-white/10' : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex shrink-0 -space-x-1">
                        {opt.swatches.map((c, i) => (
                          <span
                            key={i}
                            className="h-5 w-5 rounded-full ring-1 ring-white/20"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{opt.label}</p>
                        <p className="truncate text-[11px] text-white/55">{opt.blurb}</p>
                      </div>
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full transition ${
                          active ? 'bg-emerald-400' : 'bg-transparent ring-1 ring-white/30'
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-3 border-t border-white/10 pt-3 text-[10px] leading-relaxed text-white/40">
              Preview only. Switch designs to compare. Persists per-device.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
