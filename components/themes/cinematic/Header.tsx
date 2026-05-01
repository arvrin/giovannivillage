'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { siteConfig } from '@/lib/data';

const NAV = [
  { label: 'About', href: '/about' },
  { label: 'Rooms', href: '/rooms' },
  { label: 'Dining', href: '/dining' },
  { label: 'Spa', href: '/spa' },
  { label: 'Weddings', href: '/weddings' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Cinematic Header — fashion-magazine masthead.
 * A thin top "GLOBAL" strip · centered display wordmark · corner reservations.
 * Inspired by EDITION, Faena. Goes from translucent dark to solid black on scroll.
 */
const CinematicHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-md border-b border-[var(--color-accent)]/20'
            : 'bg-gradient-to-b from-black/40 via-black/15 to-transparent'
        }`}
      >
        {/* Top strip */}
        <div className="hidden md:block border-b border-white/10">
          <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-8 py-2 lg:px-12">
            <p className="text-[10px] font-medium uppercase text-white/55" style={{ letterSpacing: '0.4em' }}>
              · Established · Bhopal · Madhya Pradesh ·
            </p>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              className="text-[10px] font-medium uppercase text-[var(--color-accent)]/90 hover:text-[var(--color-accent)] transition-colors"
              style={{ letterSpacing: '0.4em' }}
            >
              Reservations · {siteConfig.contact.phone}
            </a>
          </div>
        </div>

        {/* Main bar */}
        <div className="mx-auto grid h-16 md:h-20 max-w-screen-2xl grid-cols-3 items-center px-6 md:px-8 lg:px-12">
          {/* Hamburger */}
          <div className="flex justify-start">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center text-white/90 hover:text-[var(--color-accent)] transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Centered wordmark */}
          <Link href="/" className="text-center">
            <p
              className="text-white"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 300,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontSize: 'clamp(0.95rem, 1.6vw, 1.35rem)',
                lineHeight: 1,
              }}
            >
              Giovanni
              <span className="hidden sm:inline italic font-extralight"> · Village</span>
            </p>
          </Link>

          {/* Right reservations */}
          <div className="flex justify-end items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:inline text-[10px] font-medium uppercase text-white/75 hover:text-[var(--color-accent)] transition-colors"
              style={{ letterSpacing: '0.3em' }}
            >
              Concierge
            </Link>
            <Button size="sm" variant="cta" href={siteConfig.booking.resort}>
              Reserve
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Side drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
              className="fixed left-0 top-0 bottom-0 z-[90] flex w-80 md:w-[420px] flex-col bg-[var(--color-bg)] shadow-2xl border-r border-[var(--color-accent)]/20"
            >
              <div className="flex shrink-0 items-center justify-between px-8 py-6 border-b border-[var(--color-accent)]/20">
                <p
                  className="text-white"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 300,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontSize: '1.1rem',
                  }}
                >
                  Giovanni
                </p>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center text-white/85 hover:text-[var(--color-accent)] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-8 py-10">
                <ul className="space-y-1">
                  {NAV.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-4 py-3 transition-colors hover:text-[var(--color-accent)]"
                      >
                        <span
                          className="text-[10px] font-medium uppercase text-[var(--color-accent)]/70"
                          style={{ letterSpacing: '0.3em' }}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className="text-2xl text-white group-hover:text-[var(--color-accent)] transition-colors"
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 300,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="shrink-0 border-t border-[var(--color-accent)]/20 bg-black/40 px-8 py-6">
                <Button size="lg" variant="cta" fullWidth href={siteConfig.booking.resort}>
                  Reserve a Stay
                </Button>
                <div
                  className="mt-5 flex items-center justify-between text-[10px] font-medium uppercase text-[var(--color-accent)]/80"
                  style={{ letterSpacing: '0.3em' }}
                >
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}>
                    {siteConfig.contact.phone}
                  </a>
                  <span>· Bhopal</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CinematicHeader;
