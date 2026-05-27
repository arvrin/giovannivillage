'use client';

import { Sparkles, Heart, Leaf, Moon } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PageHero from '@/components/ui/PageHero';
import IntroBlock from '@/components/ui/IntroBlock';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { siteConfig } from '@/lib/data';

const treatments = [
  { title: 'Massage Therapy', description: 'Traditional and contemporary techniques for deep relaxation and muscle relief.', duration: '60–90 min', icon: Sparkles },
  { title: 'Ayurvedic Treatments', description: 'Ancient healing therapies using natural herbs and oils for holistic wellness.', duration: '75–120 min', icon: Leaf },
  { title: 'Yoga Sessions', description: 'Guided practices in serene natural settings for mind-body balance.', duration: '60 min', icon: Heart },
  { title: 'Meditation', description: 'Mindfulness sessions to achieve inner peace and clarity.', duration: '45–60 min', icon: Moon },
];

const spaServices = [
  { category: 'Body Treatments', services: ['Swedish Massage', 'Deep Tissue Massage', 'Hot Stone Therapy', 'Aromatherapy Massage', 'Body Scrubs & Wraps'] },
  { category: 'Facial Treatments', services: ['Anti-Aging Facial', 'Deep Cleansing Facial', 'Hydrating Treatment', 'Brightening Therapy', 'Organic Facial'] },
  { category: 'Wellness Programs', services: ['Detox Program', 'Stress Relief Package', 'Sleep Enhancement', 'Immunity Boost', 'Wellness Retreats'] },
  { category: 'Specialty Services', services: ["Couple's Spa Experience", 'Prenatal Massage', 'Reflexology', 'Indian Head Massage', 'Ayurvedic Shirodhara'] },
];

export default function SpaPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image="/n1.webp"
          alt="Elysium Spa at Giovanni Village"
          eyebrow="Elysium"
          title="A long way home"
          description="Forest oils, warm stone, and the unhurried hands. The spa built for the part of the day where the world ends."
          video="/videos/golden-lawn.mp4"
        />

        <Container>
          <IntroBlock title="The slow hour">
            <p>
              Ancient practice meets the body that needs it now. Ayurveda, deep tissue, breath work — each ritual designed to land you somewhere lower, quieter than where you began.
            </p>
            <p>
              Our therapists know the difference between a treatment and a tonic. You sleep like a child afterward.
            </p>
          </IntroBlock>

          {/* Treatments */}
          <SectionHeader title="Four rituals we know by heart" eyebrow="The treatments" className="mt-24" />
          <div className="mt-16 mb-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {treatments.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.title}
                  className="text-center p-8 bg-[var(--color-background-secondary)] rounded-lg transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-bronze)]/10 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-[var(--color-bronze)]" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3">{t.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4" style={{ lineHeight: 1.7 }}>
                    {t.description}
                  </p>
                  <p className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-widest" style={{ letterSpacing: '0.15em' }}>
                    {t.duration}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Spa menu */}
          <SectionHeader title="The full menu" eyebrow="Browse the whole list" />
          <div className="mt-16 mb-24 grid md:grid-cols-2 gap-8">
            {spaServices.map((service) => (
              <div key={service.category} className="bg-[var(--color-background-secondary)] p-10 rounded-lg">
                <h3 className="font-heading text-2xl md:text-3xl font-bold mb-6 text-[var(--color-bronze)]">
                  {service.category}
                </h3>
                <ul className="space-y-3">
                  {service.services.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-bronze)]" />
                      <span className="text-base text-[var(--color-text-secondary)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Booking CTA */}
          <div className="bg-[var(--color-charcoal)] rounded-lg p-12 md:p-16 mb-24 text-white">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="display-italic font-heading text-3xl md:text-4xl lg:text-5xl mb-6" style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                Block an hour for yourself
              </h2>
              <p className="text-lg text-white/80 mb-10" style={{ lineHeight: 1.7 }}>
                A short conversation with the wellness team and we’ll choose the right ritual — and the right hour of the day — for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="cta"
                  size="lg"
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                >
                  Call Spa Reception
                </Button>
                <Button variant="cta-outline" size="lg" href="/contact">
                  Send a Message
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
