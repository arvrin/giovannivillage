'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Phone, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';
import type { CityStay } from '@/lib/city-stays';

const PlanStay = ({ stay }: { stay: CityStay }) => {
  return (
    <section className="bg-[color:var(--color-bg-alt)] py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-5 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p
            className="text-[11px] tracking-[0.4em] uppercase text-[color:var(--color-text-tertiary)]"
            style={{ fontFamily: 'var(--font-eyebrow)' }}
          >
            Plan your stay
          </p>
          <h2 className="mt-3 display-italic text-3xl leading-[1.05] md:text-5xl md:leading-[1.02]">
            We&apos;re a <span className="font-script">message</span> away.
          </h2>
          <p
            className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.85] text-[color:var(--color-text-secondary)] md:text-base"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Tell us your dates and how many of you — we&apos;ll pick the right
            room, arrange the airport pickup, and have breakfast waiting.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={stay.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-3 rounded-full bg-[color:var(--color-accent)] px-7 text-[11px] tracking-[0.28em] uppercase text-[color:var(--color-accent-contrast)] transition hover:bg-[color:var(--color-brass)] hover:text-[color:var(--color-forest)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              Check live rates
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href={getWhatsAppLink(
                stay.whatsapp,
                `Hello ${stay.name}, I'd like to enquire about a stay.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-3 rounded-full border border-[color:var(--color-forest)] px-7 text-[11px] tracking-[0.28em] uppercase text-[color:var(--color-forest)] transition hover:bg-[color:var(--color-forest)] hover:text-white"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp us
            </Link>
            <a
              href={`tel:${stay.phone.replace(/\s/g, '')}`}
              className="inline-flex h-12 items-center gap-3 rounded-full px-5 text-[11px] tracking-[0.28em] uppercase text-[color:var(--color-text)] transition hover:bg-[color:var(--color-bg)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              <Phone className="h-3.5 w-3.5" />
              {stay.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlanStay;
