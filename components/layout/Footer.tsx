'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { siteConfig, footer } from '@/lib/data';

/**
 * Footer - LUXURY EDITION
 * Minimal, elegant footer with essential information
 * Sophisticated grid layout with brand signature
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-charcoal)] pt-16 pb-8 text-[var(--color-text-inverse)] md:pt-20 md:pb-10 lg:pt-24 lg:pb-12">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-24">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.img
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              src="/images/logo/gvr-final-logo.png"
              alt={siteConfig.name}
              className="mb-6 h-16 w-auto brightness-0 invert md:h-20"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="mb-8 max-w-md text-base leading-relaxed text-[var(--color-text-inverse)]/80"
              style={{ lineHeight: 1.7 }}
            >
              {footer.about}
            </motion.p>

            {/* Signature */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="font-heading text-lg italic text-[var(--color-gold)]"
            >
              {footer.signature}
            </motion.p>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-gold)]">
              Explore
            </h3>
            <ul className="space-y-3">
              {footer.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-text-inverse)]/80 transition-colors duration-300 hover:text-[var(--color-gold)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-gold)]">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-gold)]" />
                <div className="space-y-1">
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="block text-sm text-[var(--color-text-inverse)]/80 transition-colors duration-300 hover:text-[var(--color-gold)]"
                  >
                    {siteConfig.contact.phone}
                  </a>
                  <p className="text-xs text-[var(--color-text-inverse)]/60">Concierge</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-gold)]" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm text-[var(--color-text-inverse)]/80 transition-colors duration-300 hover:text-[var(--color-gold)]"
                >
                  {siteConfig.contact.email}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-gold)]" />
                <p className="text-sm text-[var(--color-text-inverse)]/80">
                  {siteConfig.contact.address.street}
                  <br />
                  {siteConfig.contact.address.city}, {siteConfig.contact.address.state}
                </p>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-8 flex gap-4">
              {[
                { icon: Facebook, href: siteConfig.social.facebook, label: 'Facebook' },
                { icon: Instagram, href: siteConfig.social.instagram, label: 'Instagram' },
                { icon: Twitter, href: siteConfig.social.twitter, label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-text-inverse)]/20 text-[var(--color-text-inverse)]/60 transition-all duration-300 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.6,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="my-12 h-px bg-[var(--color-text-inverse)]/10"
        />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.7,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="flex flex-col items-center justify-between gap-2 md:flex-row md:gap-4"
        >
          {/* Copyright */}
          <p className="text-sm text-[var(--color-text-inverse)]/60">
            © {currentYear} {siteConfig.name}. All rights reserved. | Built by{' '}
            <a
              href="https://freakingminds.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-gold)] transition-colors duration-300 hover:text-white"
            >
              Freaking Minds
            </a>
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {footer.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[var(--color-text-inverse)]/60 transition-colors duration-300 hover:text-[var(--color-gold)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
