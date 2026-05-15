'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PageHero from '@/components/ui/PageHero';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { siteConfig } from '@/lib/data';

interface ContactItem {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  meta?: string;
}

const ContactRow = ({ item }: { item: ContactItem }) => {
  const Icon = item.icon;
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0">
        <div className="w-14 h-14 rounded-full bg-[var(--color-bronze)]/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-[var(--color-bronze)]" />
        </div>
      </div>
      <div>
        <h3 className="font-heading text-lg font-bold mb-1">{item.label}</h3>
        {item.href ? (
          <a
            href={item.href}
            className="text-base text-[var(--color-text-secondary)] hover:text-[var(--color-bronze)] transition-colors"
          >
            {item.value}
          </a>
        ) : (
          <p className="text-base text-[var(--color-text-secondary)]" style={{ lineHeight: 1.6 }}>
            {item.value}
          </p>
        )}
        {item.meta && (
          <p className="text-xs text-[var(--color-text-tertiary)] mt-1">{item.meta}</p>
        )}
      </div>
    </div>
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setError(null);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          interest: 'other',
          source: 'website',
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Could not send your message — please call us instead.');
      }
      setStatus('sent');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
    }
  };

  const contactItems: ContactItem[] = [
    { icon: Phone, label: 'Concierge', value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`, meta: '24/7' },
    { icon: Phone, label: 'F&B', value: siteConfig.contact.phoneSecondary, href: `tel:${siteConfig.contact.phoneSecondary.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: MapPin, label: 'Address', value: `${siteConfig.contact.address.street}, ${siteConfig.contact.address.city}, ${siteConfig.contact.address.state}` },
    { icon: Clock, label: 'Reception', value: '24/7 — always at your service' },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image="/c1.jpg"
          alt="Contact Giovanni Village"
          eyebrow="A note"
          title="A line to your corner of the estate"
          description="Stay, wedding, dinner, or just a question about the safari. Drop us a line — the concierge replies within a working day."
        />

        <Container>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 mb-24">
            {/* Form */}
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-1 py-3 border-b-2 border-[var(--color-text-tertiary)]/30 bg-transparent focus:border-[var(--color-bronze)] outline-none transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-1 py-3 border-b-2 border-[var(--color-text-tertiary)]/30 bg-transparent focus:border-[var(--color-bronze)] outline-none transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-1 py-3 border-b-2 border-[var(--color-text-tertiary)]/30 bg-transparent focus:border-[var(--color-bronze)] outline-none transition-colors"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full px-1 py-3 border-b-2 border-[var(--color-text-tertiary)]/30 bg-transparent focus:border-[var(--color-bronze)] outline-none transition-colors resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <Button
                  type="submit"
                  variant="cta"
                  size="lg"
                  fullWidth
                  loading={status === 'submitting'}
                  disabled={status === 'submitting' || status === 'sent'}
                >
                  {status === 'sent' ? 'Thank you — we’ll be in touch' : 'Send Message'}
                </Button>
                {status === 'sent' && (
                  <p className="text-sm text-[var(--color-text-secondary)] mt-3">
                    Our concierge team has received your message and will respond within one working day.
                  </p>
                )}
                {error && (
                  <p className="text-sm mt-3" style={{ color: 'var(--color-error, #A64B4B)' }}>
                    {error}
                  </p>
                )}
              </form>
            </div>

            {/* Contact info */}
            <div className="space-y-8">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Contact Information
              </h2>
              {contactItems.map((item) => (
                <ContactRow key={item.label} item={item} />
              ))}
              <div className="pt-6 border-t border-[var(--color-text-tertiary)]/20">
                <p className="text-base text-[var(--color-text-secondary)]">
                  For job-related queries, write to{' '}
                  <a href={`mailto:${siteConfig.contact.emailHr}`} className="text-[var(--color-bronze)] hover:underline font-medium">
                    {siteConfig.contact.emailHr}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="w-full h-[500px] md:h-[600px] bg-[var(--color-background-secondary)] rounded-lg overflow-hidden shadow-sm mb-16">
            <iframe
              title="Giovanni Village location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.965446708647!2d77.41!3d23.2599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE1JzM1LjYiTiA3N8KwMjQnMzkuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
