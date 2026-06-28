'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/lib/data';
import { HOME_PAGE_BRANDS } from '@/lib/brands';
import BrandCarousel from './BrandCarousel';

interface NavLeaf { label: string; href: string }

interface NavSection {
  /** Eyebrow shown above the group of links. */
  eyebrow: string;
  items: NavLeaf[];
}

/** The menu nav, grouped into three readable chunks instead of a flat list of ten. */
const NAV_SECTIONS: NavSection[] = [
  {
    eyebrow: 'The Resort',
    items: [
      { label: 'Stays', href: '/rooms' },
      { label: 'Dining', href: '/dining' },
      { label: 'Spa & Wellness', href: '/spa' },
      { label: 'Experiences', href: '/experiences' },
    ],
  },
  {
    eyebrow: 'Celebrations',
    items: [
      { label: 'Weddings', href: '/weddings' },
      { label: 'Meetings & Events', href: '/events' },
      { label: 'Private Celebrations', href: '/celebrations' },
    ],
  },
  {
    eyebrow: 'Discover',
    items: [
      { label: 'Gallery', href: '/gallery' },
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

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

          {/* Spacer keeps the logo centred now that the Enquire button is removed. */}
          <div className="h-11 w-11" aria-hidden />
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
            {/* Two columns now share the screen — keep the left dark for the nav
                and let the right stay quieter but still legible for the brand cards. */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, rgba(8, 22, 28, 0.82) 0%, rgba(8, 22, 28, 0.62) 45%, rgba(8, 22, 28, 0.52) 100%)',
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
                transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
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

              <div className="min-h-0 flex-1 grid grid-cols-1 gap-12 overflow-y-auto py-8 md:grid-cols-12 md:gap-10 md:overflow-visible md:py-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {/* Left: nav grouped into three sections so ten items read as three
                    chunks. Each section gets its own delay so they cascade in.
                    On desktop the nav scrolls independently; on mobile the whole
                    grid scrolls together. */}
                <nav className="md:col-span-7 md:h-full md:overflow-y-auto md:py-8 md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden">
                  <div className="space-y-8 md:space-y-10">
                    {NAV_SECTIONS.map((section, sIdx) => {
                      const sectionDelay = 0.22 + sIdx * 0.1;
                      return (
                        <motion.div
                          key={section.eyebrow}
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 12 }}
                          transition={{ duration: 0.8, delay: sectionDelay, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <p
                            className="mb-3 text-[10px] tracking-[0.36em] uppercase text-white/55 md:mb-4"
                            style={{ fontFamily: 'var(--font-eyebrow)' }}
                          >
                            {section.eyebrow}
                          </p>
                          <ul className="space-y-1 md:space-y-2">
                            {section.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  onClick={() => setOpen(false)}
                                  className="display-italic block text-3xl leading-[1.1] transition hover:text-[color:var(--color-brass)] md:text-[2.75rem]"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      );
                    })}
                  </div>
                </nav>

                {/* Right: auto-cycling carousel of the Giovanni family of brands.
                    One card at a time so each brand gets a proper write-up; pauses
                    on hover; dot indicators below. */}
                <motion.aside
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="md:col-span-5 md:self-center"
                >
                  <p
                    className="mb-4 text-[10px] tracking-[0.36em] uppercase text-white/55 md:mb-5"
                    style={{ fontFamily: 'var(--font-eyebrow)' }}
                  >
                    The Giovanni family
                  </p>
                  <BrandCarousel
                    brands={HOME_PAGE_BRANDS}
                    onLinkClick={() => setOpen(false)}
                  />
                </motion.aside>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-2 text-sm opacity-80 md:flex-row md:items-center md:justify-between"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${siteConfig.contact.address.street}, ${siteConfig.contact.address.city}, ${siteConfig.contact.address.state}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-4 transition hover:underline hover:opacity-100"
                >
                  {siteConfig.contact.address.street}
                </a>
                <p>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                    className="underline-offset-4 transition hover:underline"
                  >
                    {siteConfig.contact.phone}
                  </a>
                  {' · '}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="underline-offset-4 transition hover:underline"
                  >
                    {siteConfig.contact.email}
                  </a>
                </p>
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
