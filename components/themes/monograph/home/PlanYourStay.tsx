'use client';

import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/data';

/**
 * Section 08 — Plan Your Stay. Quiet final invitation. No form fields here
 * (full form lives at /contact). Three pathways: direct booking, concierge
 * call, WhatsApp.
 */
const PlanYourStay = () => {
  const phoneRaw = siteConfig.contact.phone.replace(/[^\d+]/g, '');
  const whatsappRaw = siteConfig.contact.whatsapp.replace(/[^\d]/g, '');

  return (
    <section className="relative bg-[var(--color-bg)] py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <p
            className="mb-6 text-[10px] sm:text-xs font-medium uppercase text-[var(--color-text-tertiary)]"
            style={{ letterSpacing: '0.3em' }}
          >
            — One last thing
          </p>
          <h2
            className="text-[var(--color-text)]"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)',
              lineHeight: 1.1,
            }}
          >
            Plan your stay.
          </h2>
          <p
            className="mt-8 mx-auto max-w-xl text-base md:text-lg text-[var(--color-text-secondary)]"
            style={{ lineHeight: 1.75, fontWeight: 300 }}
          >
            Reach our concierge directly. Best rate guaranteed when you book
            with us.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center">
            <a
              href={siteConfig.booking.resort}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium uppercase bg-[var(--color-accent)] text-[var(--color-text-inverse)] hover:bg-[var(--color-accent-hover)] transition-colors"
              style={{ letterSpacing: '0.2em', minWidth: '220px' }}
            >
              Reserve a Room
            </a>
            <a
              href={`tel:${phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium uppercase border border-[var(--color-text)] text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-text-inverse)] transition-colors"
              style={{ letterSpacing: '0.2em', minWidth: '220px' }}
            >
              <Phone className="h-4 w-4" />
              Speak to the Concierge
            </a>
          </div>

          <a
            href={`https://wa.me/${whatsappRaw}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 text-[10px] sm:text-xs font-medium uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            style={{ letterSpacing: '0.25em' }}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Or WhatsApp · {siteConfig.contact.whatsapp}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PlanYourStay;
