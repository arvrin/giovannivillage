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
 * Modernist Header — architectural, geometric.
 * Top thin meta strip · main bar with logo (left), horizontal nav (center),
 * book CTA (right). Razor lines. Mobile collapses to a top sheet, not a side
 * drawer.
 */
const ModernistHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileOpen]);

  return (
    <>
      {/* Top thin meta strip */}
      <div className="fixed top-0 left-0 right-0 z-[55] hidden md:block">
        <div
          className={`border-b transition-colors duration-300 ${
            scrolled ? 'bg-[var(--color-bg)] border-[var(--color-border)]' : 'bg-transparent border-white/15'
          }`}
        >
          <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-8 py-2.5 lg:px-12">
            <p
              className={`text-[10px] font-medium uppercase ${scrolled ? 'text-[var(--color-text-tertiary)]' : 'text-white/75'}`}
              style={{ letterSpacing: '0.3em' }}
            >
              Resort & Spa · Bhopal · Madhya Pradesh
            </p>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              className={`text-[10px] font-medium uppercase transition-colors hover:text-[var(--color-accent)] ${
                scrolled ? 'text-[var(--color-text-secondary)]' : 'text-white/85'
              }`}
              style={{ letterSpacing: '0.3em' }}
            >
              Reservations · {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <motion.header
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'top-0 bg-[var(--color-bg)] border-b border-[var(--color-border)]' : 'top-0 md:top-9 bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 md:h-[72px] max-w-screen-2xl items-center justify-between px-6 md:px-8 lg:px-12">
          {/* Logo */}
          <Link href="/" className="shrink-0 inline-flex items-baseline gap-3">
            <span
              className={`text-base md:text-lg font-medium ${scrolled ? 'text-[var(--color-text)]' : 'text-white md:text-[var(--color-text)]'}`}
              style={{
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Giovanni
            </span>
            <span
              className={`hidden sm:inline text-[10px] font-medium ${scrolled ? 'text-[var(--color-text-tertiary)]' : 'text-white/70 md:text-[var(--color-text-tertiary)]'}`}
              style={{ letterSpacing: '0.3em', textTransform: 'uppercase' }}
            >
              Village
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[11px] font-medium uppercase transition-colors hover:text-[var(--color-accent)] ${
                  scrolled ? 'text-[var(--color-text-secondary)]' : 'text-white/85'
                }`}
                style={{ letterSpacing: '0.22em' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + mobile burger */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="cta"
              href={siteConfig.booking.resort}
              className="hidden sm:inline-flex"
            >
              Reserve
            </Button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className={`lg:hidden flex h-10 w-10 items-center justify-center transition-colors ${
                scrolled
                  ? 'text-[var(--color-text)] hover:bg-[var(--color-bg-alt)]'
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[80] bg-black/50"
            />
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
              className="fixed left-0 right-0 top-0 z-[90] flex max-h-screen flex-col bg-[var(--color-bg)] shadow-xl"
            >
              <div className="flex shrink-0 items-center justify-between px-6 py-5 border-b border-[var(--color-border)]">
                <span
                  className="text-base font-medium uppercase text-[var(--color-text)]"
                  style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.04em', fontWeight: 600 }}
                >
                  Giovanni Village
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center text-[var(--color-text)]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-6 py-8">
                <ul className="space-y-1">
                  {NAV.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 + i * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between border-b border-[var(--color-border)] py-4 text-sm font-medium uppercase text-[var(--color-text)]"
                        style={{ letterSpacing: '0.2em' }}
                      >
                        <span>
                          <span className="text-[var(--color-text-tertiary)] mr-3">
                            0{i + 1}
                          </span>
                          {item.label}
                        </span>
                        <span className="text-[var(--color-text-tertiary)]">→</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="shrink-0 border-t border-[var(--color-border)] px-6 py-5">
                <Button
                  size="lg"
                  variant="cta"
                  fullWidth
                  href={siteConfig.booking.resort}
                >
                  Reserve a Stay
                </Button>
                <div className="mt-4 flex items-center justify-between text-[10px] font-medium uppercase text-[var(--color-text-tertiary)]" style={{ letterSpacing: '0.25em' }}>
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}>{siteConfig.contact.phone}</a>
                  <span>Bhopal · MP</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModernistHeader;
