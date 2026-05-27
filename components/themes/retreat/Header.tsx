'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/lib/data';
import { getWhatsAppLink } from '@/lib/utils';

const NAV = [
  { label: 'Stays', href: '/rooms' },
  { label: 'Dining', href: '/dining' },
  { label: 'Spa & Wellness', href: '/spa' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Celebrations', href: '/weddings' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-[color:var(--color-forest)] text-[color:var(--color-bg)]"
          >
            <div className="flex h-full flex-col px-6 py-6 md:px-16 md:py-10">
              <div className="flex items-center justify-between">
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
              </div>

              <nav className="my-auto">
                <ul className="space-y-2 md:space-y-4">
                  {NAV.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.08 + i * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="display-italic block text-4xl leading-[1.1] transition hover:text-[color:var(--color-brass)] md:text-6xl"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div
                className="flex flex-col gap-2 text-sm opacity-80 md:flex-row md:items-center md:justify-between"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <p>{siteConfig.contact.address.street}</p>
                <p>{siteConfig.contact.phone} · {siteConfig.contact.email}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RetreatHeader;
