'use client';

import Image from 'next/image';
import { Sparkles, Heart, Leaf, Moon } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { siteConfig } from '@/lib/data';

const treatments = [
  {
    title: 'Massage Therapy',
    description: 'Traditional and contemporary massage techniques for deep relaxation and muscle relief',
    duration: '60-90 minutes',
    icon: Sparkles,
  },
  {
    title: 'Ayurvedic Treatments',
    description: 'Ancient healing therapies using natural herbs and oils for holistic wellness',
    duration: '75-120 minutes',
    icon: Leaf,
  },
  {
    title: 'Yoga Sessions',
    description: 'Guided yoga practices in serene natural settings for mind-body balance',
    duration: '60 minutes',
    icon: Heart,
  },
  {
    title: 'Meditation',
    description: 'Mindfulness and meditation sessions to achieve inner peace and clarity',
    duration: '45-60 minutes',
    icon: Moon,
  },
];

const spaServices = [
  {
    category: 'Body Treatments',
    services: [
      'Swedish Massage',
      'Deep Tissue Massage',
      'Hot Stone Therapy',
      'Aromatherapy Massage',
      'Body Scrubs & Wraps',
    ],
  },
  {
    category: 'Facial Treatments',
    services: [
      'Anti-Aging Facial',
      'Deep Cleansing Facial',
      'Hydrating Treatment',
      'Brightening Therapy',
      'Organic Facial',
    ],
  },
  {
    category: 'Wellness Programs',
    services: [
      'Detox Program',
      'Stress Relief Package',
      'Weight Management',
      'Sleep Enhancement',
      'Immunity Boost',
    ],
  },
  {
    category: 'Specialty Services',
    services: [
      'Couple\'s Spa Experience',
      'Prenatal Massage',
      'Reflexology',
      'Indian Head Massage',
      'Crystal Healing',
    ],
  },
];

export default function SpaPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)] pt-24 pb-16">
        {/* Hero Section - LUXURY EDITION */}
        <div className="relative h-[70vh] md:h-[80vh] lg:h-[85vh] mb-32 md:mb-40 lg:mb-48">
          <Image
            src="https://giovannivillage.com/wp-content/uploads/2021/08/masseur-doing-massage-on-woman-body-in-the-spa-sal-UGDXK58.jpg"
            alt="Elysium Spa at Giovanni Village"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 pb-24 md:pb-32">
            <Container>
              <p className="text-sm font-semibold uppercase tracking-widest text-white/80 mb-8" style={{ letterSpacing: '2.5px' }}>
                Wellness & Rejuvenation
              </p>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-10" style={{ lineHeight: '1.1', letterSpacing: '-0.025em' }}>
                Elysium Spa & Wellness
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl" style={{ lineHeight: '1.6' }}>
                Rejuvenate your body and mind with signature treatments in a serene natural setting
              </p>
            </Container>
          </div>
        </div>

        <Container>
          {/* Introduction */}
          <div className="max-w-4xl mx-auto text-center mb-32 md:mb-40">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-10" style={{ lineHeight: '1.1' }}>
              Your Wellness Sanctuary
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed text-[var(--color-text-secondary)] mb-8" style={{ lineHeight: '1.8' }}>
              Elysium Spa at Giovanni Village is a haven of tranquility where ancient healing
              traditions meet modern wellness practices. Surrounded by lush greenery and the
              soothing sounds of nature, our spa offers a transformative experience.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.8' }}>
              Our expert therapists use premium organic products and time-honored techniques
              to restore balance, relieve stress, and enhance your overall well-being.
            </p>
          </div>

          {/* Main Treatments */}
          <div className="mb-32 md:mb-40">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-20" style={{ lineHeight: '1.1' }}>
              Signature Treatments
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
              {treatments.map((treatment, index) => {
                const Icon = treatment.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-8 bg-[var(--color-background-secondary)] rounded-lg transition-transform duration-500 hover:scale-105"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-bronze)]/10 flex items-center justify-center">
                      <Icon className="h-10 w-10 text-[var(--color-bronze)]" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold mb-4" style={{ lineHeight: '1.2' }}>
                      {treatment.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] mb-4" style={{ lineHeight: '1.7' }}>
                      {treatment.description}
                    </p>
                    <p className="text-sm font-medium text-[var(--color-text-tertiary)]">
                      Duration: {treatment.duration}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Services Menu */}
          <div className="mb-32 md:mb-40">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-20" style={{ lineHeight: '1.1' }}>
              Our Spa Menu
            </h2>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {spaServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-[var(--color-background-secondary)] p-10 md:p-12 rounded-lg"
                >
                  <h3 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-[var(--color-bronze)]" style={{ lineHeight: '1.2' }}>
                    {service.category}
                  </h3>
                  <ul className="space-y-4">
                    {service.services.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-4">
                        <div className="h-2 w-2 rounded-full bg-[var(--color-bronze)]" />
                        <span className="text-base md:text-lg text-[var(--color-text-secondary)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Spa Features */}
          <div className="bg-[var(--color-background-secondary)] rounded-lg p-16 md:p-20 mb-32 md:mb-40">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-20" style={{ lineHeight: '1.1' }}>
              The Elysium Experience
            </h2>
            <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[var(--color-bronze)]/10 flex items-center justify-center">
                  <Leaf className="h-12 w-12 text-[var(--color-bronze)]" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4" style={{ lineHeight: '1.2' }}>Natural Products</h3>
                <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.7' }}>
                  100% organic, sustainably sourced essential oils and herbal treatments
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[var(--color-bronze)]/10 flex items-center justify-center">
                  <Heart className="h-12 w-12 text-[var(--color-bronze)]" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4" style={{ lineHeight: '1.2' }}>Expert Therapists</h3>
                <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.7' }}>
                  Certified professionals trained in traditional and modern wellness techniques
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[var(--color-bronze)]/10 flex items-center justify-center">
                  <Sparkles className="h-12 w-12 text-[var(--color-bronze)]" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4" style={{ lineHeight: '1.2' }}>Serene Setting</h3>
                <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.7' }}>
                  Treatment rooms with forest views and sounds of nature for complete relaxation
                </p>
              </div>
            </div>
          </div>

          {/* Wellness Programs */}
          <div className="mb-32 md:mb-40">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-10" style={{ lineHeight: '1.1' }}>
                Customized Wellness Journeys
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed text-[var(--color-text-secondary)] mb-16 md:mb-20" style={{ lineHeight: '1.8' }}>
                Our wellness programs are tailored to your specific needs and goals. Whether you're
                seeking stress relief, detoxification, or simply a day of pampering, we create
                personalized treatment plans just for you.
              </p>
              <div className="grid md:grid-cols-2 gap-8 lg:gap-10 text-left">
                <div className="bg-[var(--color-background-secondary)] p-8 md:p-10 rounded-lg">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4" style={{ lineHeight: '1.2' }}>Half-Day Retreat</h3>
                  <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] mb-3" style={{ lineHeight: '1.7' }}>
                    3-4 hours of curated treatments including massage, facial, and meditation
                  </p>
                  <p className="text-base font-medium text-[var(--color-text-tertiary)]">
                    Perfect for quick rejuvenation
                  </p>
                </div>
                <div className="bg-[var(--color-background-secondary)] p-8 md:p-10 rounded-lg">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4" style={{ lineHeight: '1.2' }}>Full-Day Escape</h3>
                  <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] mb-3" style={{ lineHeight: '1.7' }}>
                    Complete wellness experience with multiple therapies, yoga, and healthy meals
                  </p>
                  <p className="text-base font-medium text-[var(--color-text-tertiary)]">
                    Ideal for deep relaxation
                  </p>
                </div>
                <div className="bg-[var(--color-background-secondary)] p-8 md:p-10 rounded-lg">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4" style={{ lineHeight: '1.2' }}>Weekend Wellness</h3>
                  <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] mb-3" style={{ lineHeight: '1.7' }}>
                    2-3 day program combining spa treatments, yoga, meditation, and nutrition
                  </p>
                  <p className="text-base font-medium text-[var(--color-text-tertiary)]">
                    Total mind-body transformation
                  </p>
                </div>
                <div className="bg-[var(--color-background-secondary)] p-8 md:p-10 rounded-lg">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4" style={{ lineHeight: '1.2' }}>Couple's Retreat</h3>
                  <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] mb-3" style={{ lineHeight: '1.7' }}>
                    Shared spa experiences in our private couple's suite with champagne
                  </p>
                  <p className="text-base font-medium text-[var(--color-text-tertiary)]">
                    Perfect for romantic getaways
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking CTA */}
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-10" style={{ lineHeight: '1.1' }}>
              Book Your Spa Experience
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed text-[var(--color-text-secondary)] mb-12" style={{ lineHeight: '1.8' }}>
              Begin your journey to wellness and relaxation. Our spa concierge will help you
              choose the perfect treatments for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Button
                variant="primary"
                size="lg"
                className="bg-[var(--color-gold)] hover:bg-[var(--color-bronze)] text-[var(--color-charcoal)]"
              >
                Book Spa Appointment
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[var(--color-bronze)] text-[var(--color-bronze)] hover:bg-[var(--color-bronze)] hover:text-white"
              >
                View Treatment Menu
              </Button>
            </div>
            <p className="text-base text-[var(--color-text-tertiary)]">
              Call Concierge: <a href={`tel:${siteConfig.contact.phone}`} className="text-[var(--color-bronze)] hover:underline">{siteConfig.contact.phone}</a>
            </p>
          </div>
        </Container>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
