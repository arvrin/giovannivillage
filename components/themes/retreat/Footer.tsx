'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/data';

/** A different closing line by route, so the footer doesn't feel boilerplate. */
function getFooterCopy(pathname: string): { eyebrow: string; line: React.ReactNode } {
  const map: Record<string, { eyebrow: string; line: React.ReactNode }> = {
    '/': { eyebrow: 'Giovanni Village', line: <>Slow stays, <span className="font-script">wild</span> mornings.</> },
    '/about': { eyebrow: 'The estate', line: <>A house that learned to <span className="font-script">listen</span>.</> },
    '/rooms': { eyebrow: 'The stays', line: <>Eight rooms, each opening to <span className="font-script">green</span>.</> },
    '/dining': { eyebrow: 'The kitchens', line: <>Four kitchens, <span className="font-script">one</span> long meal.</> },
    '/spa': { eyebrow: 'Elysium', line: <>A long way <span className="font-script">home</span>.</> },
    '/experiences': { eyebrow: 'The doings', line: <>Ways to <span className="font-script">lose</span> the day.</> },
    '/weddings': { eyebrow: 'Celebrations', line: <>The wedding that <span className="font-script">found</span> its setting.</> },
    '/gallery': { eyebrow: 'In pictures', line: <>Frames from the <span className="font-script">estate</span>.</> },
    '/contact': { eyebrow: 'A note', line: <>A line to your <span className="font-script">corner</span> of the estate.</> },
  };
  if (map[pathname]) return map[pathname];
  if (pathname.startsWith('/rooms/')) return map['/rooms'];
  return map['/'];
}

const COL_A = [
  { label: 'Stays', href: '/rooms' },
  { label: 'Dining', href: '/dining' },
  { label: 'Spa & Wellness', href: '/spa' },
  { label: 'Experiences', href: '/experiences' },
];
const COL_B = [
  { label: 'Celebrations', href: '/weddings' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Questions', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];
const COL_C = [
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cancellation', href: '/cancellation' },
  { label: 'Disclaimer', href: '/disclaimer' },
];
const COL_MENUS = [
  { label: 'Restaurant Menu', href: '/menus/giovanni-restaurant-menu-2026.pdf' },
  { label: 'Bar & Beverages', href: '/menus/giovanni-bar-menu-2026.pdf' },
  { label: 'Spa Menu', href: '/menus/giovanni-spa-menu.pdf' },
];

const RetreatFooter = () => {
  const pathname = usePathname() || '/';
  const { eyebrow, line } = getFooterCopy(pathname);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <footer className="bg-[color:var(--color-bg)] pt-24 pb-10">
      <div className="mx-auto max-w-[1440px] px-4 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10"
        >
          <div className="md:col-span-4">
            <p
              className="mb-4 text-[11px] tracking-[0.36em] uppercase text-[color:var(--color-text-tertiary)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              {eyebrow}
            </p>
            <h2 className="display-italic text-3xl leading-[1.15]">
              {line}
            </h2>

            <ul
              className="mt-8 space-y-3 text-sm text-[color:var(--color-text-secondary)]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-brass)]" />
                <span>
                  {siteConfig.contact.address.street},<br />
                  {siteConfig.contact.address.city}, {siteConfig.contact.address.state}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[color:var(--color-brass)]" />
                <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[color:var(--color-brass)]" />
                <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
              </li>
            </ul>

            <div className="mt-6 flex gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-forest)] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-brass)]"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-forest)] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-brass)]"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-4 md:grid-cols-2">
            {[COL_A, COL_B, COL_C].slice(0, 2).map((col, i) => (
              <ul
                key={i}
                className="space-y-3"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {col.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[color:var(--color-text)] transition hover:text-[color:var(--color-brass)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
            <div className="col-span-2 mt-2 border-t border-[color:var(--color-border)] pt-6">
              <p
                className="mb-3 text-[10px] tracking-[0.36em] uppercase text-[color:var(--color-text-tertiary)]"
                style={{ fontFamily: 'var(--font-eyebrow)' }}
              >
                Menus
              </p>
              <ul
                className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {COL_MENUS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-[color:var(--color-text)] transition hover:text-[color:var(--color-brass)]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <ul
              className="col-span-2 mt-2 grid grid-cols-2 gap-3 border-t border-[color:var(--color-border)] pt-6 md:col-span-2"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {COL_C.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-xs text-[color:var(--color-text-secondary)] transition hover:text-[color:var(--color-brass)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="rounded-lg bg-[color:var(--color-bg-card)] p-8">
              <p
                className="mb-2 text-[10px] tracking-[0.36em] uppercase text-[color:var(--color-text-tertiary)]"
                style={{ fontFamily: 'var(--font-eyebrow)' }}
              >
                Newsletter
              </p>
              <h3 className="display-italic text-2xl">
                <span className="font-script">Letters</span> from the forest
              </h3>
              <p
                className="mt-2 text-sm text-[color:var(--color-text-secondary)]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                A few times a year, when the air changes or a new menu lands — a quiet note from the estate. Nothing more.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSent(true);
                }}
                className="mt-6 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="flex-1 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg)] px-5 py-3 text-sm placeholder:text-[color:var(--color-text-tertiary)] focus:border-[color:var(--color-forest)] focus:outline-none"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
                <button
                  type="submit"
                  className="rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-[11px] tracking-[0.28em] uppercase text-[color:var(--color-accent-contrast)] transition hover:bg-[color:var(--color-accent-hover)]"
                  style={{ fontFamily: 'var(--font-eyebrow)' }}
                >
                  {sent ? 'Subscribed ✓' : 'Sign up'}
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        <p
          className="mt-16 text-center text-[10px] tracking-[0.4em] uppercase text-[color:var(--color-text-tertiary)]"
          style={{ fontFamily: 'var(--font-eyebrow)' }}
        >
          © {new Date().getFullYear()} Giovanni Village · A Venture of Sudesh The Village Resort
        </p>
      </div>
    </footer>
  );
};

export default RetreatFooter;
