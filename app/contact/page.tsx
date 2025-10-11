'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { siteConfig } from '@/lib/data';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)] pt-24 pb-16">
        {/* Hero Section - LUXURY EDITION */}
        <div className="relative h-[70vh] md:h-[80vh] lg:h-[85vh] mb-32 md:mb-40 lg:mb-48">
          <Image
            src="/c1.jpg"
            alt="Contact Giovanni Village Resort"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 pb-24 md:pb-32">
            <Container>
              <div className="flex justify-start mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-white/80" style={{ letterSpacing: '2.5px' }}>
                  Get in Touch
                </p>
              </div>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-10" style={{ lineHeight: '1.1', letterSpacing: '-0.025em' }}>
                Your Exclusive Retreat Awaits
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl" style={{ lineHeight: '1.6' }}>
                Contact Us
              </p>
            </Container>
          </div>
        </div>

        <Container>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 mb-32 md:mb-40">
            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-10" style={{ lineHeight: '1.1' }}>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 border-b-2 border-[var(--color-text-tertiary)]/30 bg-transparent focus:border-[var(--color-bronze)] outline-none transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 border-b-2 border-[var(--color-text-tertiary)]/30 bg-transparent focus:border-[var(--color-bronze)] outline-none transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border-b-2 border-[var(--color-text-tertiary)]/30 bg-transparent focus:border-[var(--color-bronze)] outline-none transition-colors"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-b-2 border-[var(--color-text-tertiary)]/30 bg-transparent focus:border-[var(--color-bronze)] outline-none transition-colors resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full bg-[var(--color-gold)] hover:bg-[var(--color-bronze)] text-[var(--color-charcoal)]"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-10">
              <div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-10" style={{ lineHeight: '1.1' }}>Contact Information</h2>
              </div>

              {/* Concierge */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-bronze)]/10 flex items-center justify-center">
                    <Phone className="h-8 w-8 text-[var(--color-bronze)]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold mb-2" style={{ lineHeight: '1.2' }}>Concierge</h3>
                  <a href="tel:+919039037300" className="text-lg text-[var(--color-text-secondary)] hover:text-[var(--color-bronze)] transition-colors">
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>

              {/* F&B */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-bronze)]/10 flex items-center justify-center">
                    <Phone className="h-8 w-8 text-[var(--color-bronze)]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold mb-2" style={{ lineHeight: '1.2' }}>F&amp;B</h3>
                  <a href="tel:+919039037302" className="text-lg text-[var(--color-text-secondary)] hover:text-[var(--color-bronze)] transition-colors">
                    {siteConfig.contact.phoneSecondary}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-bronze)]/10 flex items-center justify-center">
                    <Mail className="h-8 w-8 text-[var(--color-bronze)]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold mb-2" style={{ lineHeight: '1.2' }}>Email</h3>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-lg text-[var(--color-text-secondary)] hover:text-[var(--color-bronze)] transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-bronze)]/10 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-[var(--color-bronze)]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold mb-2" style={{ lineHeight: '1.2' }}>Address</h3>
                  <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.7' }}>
                    {siteConfig.contact.address.street}<br />
                    {siteConfig.contact.address.city}, {siteConfig.contact.address.state}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-bronze)]/10 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-[var(--color-bronze)]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold mb-2" style={{ lineHeight: '1.2' }}>Reception Hours</h3>
                  <p className="text-lg text-[var(--color-text-secondary)]">
                    24/7 - Always at your service
                  </p>
                </div>
              </div>

              {/* Job Inquiries */}
              <div className="pt-8 border-t border-[var(--color-text-tertiary)]/20">
                <p className="text-base text-[var(--color-text-secondary)]">
                  For Job Related Queries, write to us at{' '}
                  <a href="mailto:hr@giovannivillage.com" className="text-[var(--color-bronze)] hover:underline font-medium">
                    hr@giovannivillage.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="w-full h-[500px] md:h-[600px] bg-[var(--color-background-secondary)] rounded-lg overflow-hidden shadow-lg">
            <iframe
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
