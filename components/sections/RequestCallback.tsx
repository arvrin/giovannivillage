'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Button from '../ui/Button';
import Eyebrow from '../ui/Eyebrow';
import { siteConfig } from '@/lib/data';

/**
 * Request a Call Back — homepage lead form.
 * Submits via mailto: as a no-backend fallback. Wire to a real endpoint
 * (Formspree, your CRM, an /api/contact route) when available.
 */
const RequestCallback = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Call back request — ${name || 'Website'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nMobile: ${mobile}\n\n${message}`
    );
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <Section
      id="request-callback"
      className="bg-[var(--color-background-secondary)] py-20 md:py-28"
    >
      <Container maxWidth="default">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <Eyebrow color="muted" className="mb-6">Let us plan your stay</Eyebrow>
            <h2
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)]"
              style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}
            >
              Request a Call Back
            </h2>
            <p className="mt-6 text-lg text-[var(--color-text-secondary)] md:text-xl" style={{ lineHeight: 1.7 }}>
              Share a few details and our concierge team will get in touch within a working day to help plan your stay, event, or celebration.
            </p>
            <div className="mt-8 space-y-2 text-sm text-[var(--color-text-secondary)]">
              <p>
                <span className="font-medium text-[var(--color-text-primary)]">Concierge:</span>{' '}
                <a href={`tel:${siteConfig.contact.phone}`} className="text-[var(--color-bronze)] hover:underline">
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p>
                <span className="font-medium text-[var(--color-text-primary)]">Email:</span>{' '}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-[var(--color-bronze)] hover:underline">
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="space-y-6 rounded-lg bg-[var(--color-background-primary)] p-8 md:p-10 shadow-sm"
          >
            <div>
              <label htmlFor="rcb-name" className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
                Name
              </label>
              <input
                id="rcb-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-b-2 border-[var(--color-text-tertiary)]/30 bg-transparent px-1 py-3 outline-none transition-colors focus:border-[var(--color-bronze)]"
              />
            </div>
            <div>
              <label htmlFor="rcb-mobile" className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
                Mobile Number
              </label>
              <input
                id="rcb-mobile"
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full border-b-2 border-[var(--color-text-tertiary)]/30 bg-transparent px-1 py-3 outline-none transition-colors focus:border-[var(--color-bronze)]"
              />
            </div>
            <div>
              <label htmlFor="rcb-message" className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
                Message
              </label>
              <textarea
                id="rcb-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none border-b-2 border-[var(--color-text-tertiary)]/30 bg-transparent px-1 py-3 outline-none transition-colors focus:border-[var(--color-bronze)]"
              />
            </div>
            <Button type="submit" variant="cta" size="lg" fullWidth>
              Send
            </Button>
          </motion.form>
        </div>
      </Container>
    </Section>
  );
};

export default RequestCallback;
