'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/lib/data';
import { getWhatsAppLink } from '@/lib/utils';

interface NavLeaf { label: string; href: string }
interface NavGroup { label: string; children: NavLeaf[] }
type NavItem = NavLeaf | NavGroup;

const NAV: NavItem[] = [
  { label: 'Stays', href: '/rooms' },
  { label: 'Dining', href: '/dining' },
  { label: 'Spa & Wellness', href: '/spa' },
  { label: 'Experiences', href: '/experiences' },
  {
    label: 'Celebrations',
    children: [
      { label: 'Weddings', href: '/weddings' },
      { label: 'Meetings & Events', href: '/events' },
      { label: 'Private Celebrations', href: '/celebrations' },
    ],
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

const isGroup = (n: NavItem): n is NavGroup => 'children' in n;

/** Pages that don't render a dark hero image; the header should default to
 *  its scrolled (dark-on-light) state on these routes. */
const FLAT_PATHS = ['/privacy', '/terms', '/cancellation', '/disclaimer'];

const RetreatHeader = () => {
  const pathname = usePathname() || '/';
  const isFlat = FLAT_PATHS.includes(pathname);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(isFlat);

  useEffect(() => {
    if (isFlat) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isFlat]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? 'bg-[color:var(--color-bg)]/85 backdrop-blur-md shadow-[0_1px_0_var(--color-border)]' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:h-20 md:px-10">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={`flex h-11 w-11 items-center justify-center rounded-full transition ${
              scrolled
                ? 'text-[color:var(--color-text)] hover:bg-[color:var(--color-bg-alt)]'
                : 'text-white bg-white/10 backdrop-blur-md hover:bg-white/20'
            }`}
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <Link href="/" aria-label="Giovanni Village" className="flex items-center">
            <Image
              src="/images/logo/gvr-final-logo.webp"
              alt="Giovanni Village"
              width={220}
              height={70}
              priority
              className={`object-contain transition-all duration-500 ${
                scrolled ? 'h-9 md:h-10' : 'h-11 md:h-14'
              }`}
              style={{ width: 'auto' }}
            />
          </Link>

          <Link
            href={getWhatsAppLink(siteConfig.contact.whatsapp, 'Hello Giovanni Village, I would like to enquire about a stay or event.')}
            target="_blank"
            rel="noreferrer"
            className={`hidden md:inline-flex items-center rounded-full px-5 py-2.5 text-[11px] tracking-[0.22em] uppercase transition ${
              scrolled
                ? 'bg-[color:var(--color-accent)] text-[color:var(--color-accent-contrast)] hover:bg-[color:var(--color-brass)] hover:text-[color:var(--color-forest)]'
                : 'bg-white text-[color:var(--color-forest)] hover:bg-[color:var(--color-brass)] hover:text-white'
            }`}
            style={{ fontFamily: 'var(--font-eyebrow)' }}
          >
            Enquire
          </Link>

          <Link
            href={getWhatsAppLink(siteConfig.contact.whatsapp, 'Hello Giovanni Village, I would like to enquire about a stay or event.')}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex h-11 items-center rounded-full px-5 text-[10px] tracking-[0.2em] uppercase transition md:hidden ${
              scrolled
                ? 'bg-[color:var(--color-accent)] text-[color:var(--color-accent-contrast)]'
                : 'bg-white text-[color:var(--color-forest)]'
            }`}
            style={{ fontFamily: 'var(--font-eyebrow)' }}
          >
            Enquire
          </Link>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu-panel"
            // The carpet unroll — pool image revealed left-to-right via clip-path
            // with a long, expo-out ease that feels deliberate rather than
            // animated. No literal rolling object — restraint reads as luxury.
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            exit={{ clipPath: 'inset(0 100% 0 0)' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[70] text-[color:var(--color-bg)] will-change-[clip-path]"
          >
            {/* Aerial pool with the Giovanni logo etched in the floor — slow
                zoom-out adds cinematic depth so the image feels alive */}
            <motion.div
              initial={{ scale: 1.08 }}
              animate={{ scale: 1.0 }}
              exit={{ scale: 1.08 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src="/images/menu-pool-logo.webp"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
            {/* Darken only the left strip where menu items sit; let the pool +
                Giovanni-logo etching breathe in the centre/right of the screen */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, rgba(8, 22, 28, 0.80) 0%, rgba(8, 22, 28, 0.50) 35%, rgba(8, 22, 28, 0.18) 60%, rgba(8, 22, 28, 0.10) 100%)',
              }}
            />
            {/* Subtle vignette at top/bottom for the eyebrow + address rows */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(8, 22, 28, 0.32) 0%, rgba(8, 22, 28, 0) 12%, rgba(8, 22, 28, 0) 86%, rgba(8, 22, 28, 0.32) 100%)',
              }}
            />
            <div className="relative flex h-full flex-col px-6 py-6 md:px-16 md:py-10">
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between"
              >
                <p
                  className="text-[11px] tracking-[0.3em] uppercase opacity-70"
                  style={{ fontFamily: 'var(--font-eyebrow)' }}
                >
                  Explore Giovanni
                </p>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full p-2 transition hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </motion.div>

              <nav className="my-auto">
                <ul className="space-y-1 md:space-y-3">
                  {NAV.map((item, i) => {
                    const baseDelay = 0.85 + i * 0.06;
                    if (isGroup(item)) {
                      // A nested group — render the parent label as a small
                      // eyebrow above its children. Children sit one indent
                      // in, slightly smaller than top-level entries.
                      return (
                        <motion.li
                          key={item.label}
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 12 }}
                          transition={{ duration: 0.9, delay: baseDelay, ease: [0.16, 1, 0.3, 1] }}
                          className="py-1"
                        >
                          <p
                            className="text-[10px] tracking-[0.32em] uppercase text-white/55"
                            style={{ fontFamily: 'var(--font-eyebrow)' }}
                          >
                            {item.label}
                          </p>
                          <ul className="mt-1 md:mt-2 space-y-1 md:space-y-2">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setOpen(false)}
                                  className="display-italic block text-3xl leading-[1.1] transition hover:text-[color:var(--color-brass)] md:text-5xl"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.li>
                      );
                    }
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        // Items rise softly from below — more cinematic than
                        // the previous left-slide. Stagger begins as the unroll
                        // crosses 60% width, so items appear as the carpet
                        // reaches their position.
                        transition={{ duration: 0.9, delay: baseDelay, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="display-italic block text-4xl leading-[1.1] transition hover:text-[color:var(--color-brass)] md:text-6xl"
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-2 text-sm opacity-80 md:flex-row md:items-center md:justify-between"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <p>{siteConfig.contact.address.street}</p>
                <p>{siteConfig.contact.phone} · {siteConfig.contact.email}</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {open && (
          <motion.div
            key="menu-edge"
            // A single hair-thin brass line that travels at the leading edge of
            // the unroll. This is the entire "carpet" cue — no chunky cylinder,
            // just a quiet golden seam that suggests the cloth being laid down.
            initial={{ x: '-2px', opacity: 0 }}
            animate={{ x: '100vw', opacity: 1 }}
            exit={{ x: '-2px', opacity: 0 }}
            transition={{
              x: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.4 },
            }}
            aria-hidden
            className="pointer-events-none fixed inset-y-0 left-0 z-[72] w-px will-change-transform"
            style={{
              boxShadow: '0 0 18px 2px rgba(201, 169, 97, 0.55), 0 0 36px 6px rgba(201, 169, 97, 0.25)',
              background:
                'linear-gradient(to bottom, transparent 0%, rgba(248, 222, 162, 0.85) 18%, rgba(255, 240, 195, 0.95) 50%, rgba(248, 222, 162, 0.85) 82%, transparent 100%)',
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default RetreatHeader;
