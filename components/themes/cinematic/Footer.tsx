'use client';

import { motion } from 'framer-motion';
import { Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { siteConfig, footer } from '@/lib/data';

/**
 * Cinematic Footer — theatrical curtain call.
 * Centered Cormorant logotype, gold rule accents, dark layered background.
 */
const CinematicFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[var(--color-bg-deep)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(201,169,97,0.08)_0%,_rgba(0,0,0,0)_60%)]" />

      <div className="relative mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-12 pt-20 md:pt-24 pb-10">
        {/* Centered crest */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <h3
            className="mt-4 text-white"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 300,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1,
            }}
          >
            Giovanni{' '}
            <span className="italic font-extralight">· Village</span>
          </h3>
          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[var(--color-accent)]" />
            <span
              className="text-[10px] uppercase text-[var(--color-accent)]"
              style={{ letterSpacing: '0.4em' }}
            >
              {footer.signature}
            </span>
            <span className="h-px w-12 bg-[var(--color-accent)]" />
          </div>
        </motion.div>

        {/* Three column body */}
        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-14 border-t border-[var(--color-accent)]/15 pt-12">
          {/* Visit */}
          <div className="text-center md:text-left">
            <p className="text-[10px] uppercase text-[var(--color-accent)] mb-4" style={{ letterSpacing: '0.4em' }}>
              Visit
            </p>
            <p className="text-sm text-white/75" style={{ lineHeight: 1.8 }}>
              {siteConfig.contact.address.street}<br />
              {siteConfig.contact.address.city}, {siteConfig.contact.address.state}
            </p>
          </div>

          {/* Reservations */}
          <div className="text-center">
            <p className="text-[10px] uppercase text-[var(--color-accent)] mb-4" style={{ letterSpacing: '0.4em' }}>
              Reservations
            </p>
            <p className="text-sm text-white/75 space-y-1.5" style={{ lineHeight: 1.8 }}>
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="block hover:text-[var(--color-accent)] transition-colors">
                {siteConfig.contact.phone}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="block hover:text-[var(--color-accent)] transition-colors">
                {siteConfig.contact.email}
              </a>
            </p>
          </div>

          {/* Explore */}
          <div className="text-center md:text-right">
            <p className="text-[10px] uppercase text-[var(--color-accent)] mb-4" style={{ letterSpacing: '0.4em' }}>
              Explore
            </p>
            <ul className="text-sm text-white/75 space-y-1.5">
              {footer.quickLinks.slice(0, 5).map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-[var(--color-accent)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-10 w-10 items-center justify-center border border-[var(--color-accent)]/30 text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-black transition-colors"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center border border-[var(--color-accent)]/30 text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-black transition-colors"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8 text-[10px] uppercase text-white/45" style={{ letterSpacing: '0.3em' }}>
          <p>© {year} Giovanni Village · All rights reserved</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            {footer.legal.map((l) => (
              <Link key={l.label} href={l.href} className="hover:text-[var(--color-accent)] transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CinematicFooter;
