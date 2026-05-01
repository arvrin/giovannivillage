'use client';

import { motion } from 'framer-motion';
import { Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { siteConfig, footer } from '@/lib/data';

/**
 * Modernist Footer — geometric, divided by thin rules.
 * Forest green deep panel with stacked uppercase navigation columns.
 */
const ModernistFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-bg-deep)] text-[var(--color-bg-deep-text)]">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-12 pt-16 pb-8 md:pt-20">
        {/* Top section */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-12 border-b border-white/15 pb-12 md:pb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <p
              className="text-2xl md:text-3xl"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                lineHeight: 1.05,
              }}
            >
              Giovanni
              <span className="italic font-light"> · Village</span>
            </p>
            <p className="mt-5 max-w-md text-sm text-white/70" style={{ lineHeight: 1.7 }}>
              {footer.about}
            </p>
            <p
              className="mt-6 text-[10px] font-semibold uppercase text-white/55"
              style={{ letterSpacing: '0.3em' }}
            >
              Estd · Bhopal · Madhya Pradesh
            </p>
          </motion.div>

          {/* Explore */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3 lg:col-start-7"
          >
            <p
              className="text-[10px] font-semibold uppercase text-[var(--color-accent-contrast)] mb-5 opacity-80"
              style={{ letterSpacing: '0.3em' }}
            >
              Explore
            </p>
            <ul className="space-y-3">
              {footer.quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm uppercase text-white/85 hover:text-white transition-colors"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-4"
          >
            <p
              className="text-[10px] font-semibold uppercase text-[var(--color-accent-contrast)] mb-5 opacity-80"
              style={{ letterSpacing: '0.3em' }}
            >
              Contact
            </p>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>{' '}
                <span className="text-white/50 text-xs ml-1">Concierge</span>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="text-white/70" style={{ lineHeight: 1.6 }}>
                {siteConfig.contact.address.street}<br />
                {siteConfig.contact.address.city}, {siteConfig.contact.address.state}
              </li>
            </ul>
            <div className="mt-7 flex gap-2">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center border border-white/30 text-white/75 hover:bg-white hover:text-[var(--color-bg-deep)] transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center border border-white/30 text-white/75 hover:bg-white hover:text-[var(--color-bg-deep)] transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom strip */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[10px] uppercase text-white/55" style={{ letterSpacing: '0.25em' }}>
          <p>© {year} Giovanni Village · All rights reserved</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.legal.map((l) => (
              <Link key={l.label} href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernistFooter;
