'use client';

import Image from 'next/image';
import { Hotel, Leaf, Utensils, Sparkles } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { about } from '@/lib/data';

const iconMap = {
  hotel: Hotel,
  leaf: Leaf,
  utensils: Utensils,
  spa: Sparkles,
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)] pt-24 pb-16">
        {/* Hero Section - LUXURY IMAGE HERO */}
        <div className="relative h-[70vh] md:h-[80vh] lg:h-[85vh] mb-32 md:mb-40 lg:mb-48">
          <Image
            src="/a1.jpg"
            alt="About Giovanni Village Resort"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 pb-24 md:pb-32">
            <Container>
              <div className="text-center max-w-5xl mx-auto">
                <div className="flex justify-center mb-8">
                  <p className="text-sm font-semibold uppercase tracking-widest text-white/80" style={{ letterSpacing: '2.5px' }}>
                    Discover Our Story
                  </p>
                </div>
                <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-10" style={{ lineHeight: '1.1', letterSpacing: '-0.025em' }}>
                  {about.title}
                </h1>
                <p className="text-2xl md:text-3xl text-white/90 font-light" style={{ lineHeight: '1.6' }}>
                  {about.subtitle}
                </p>
              </div>
            </Container>
          </div>
        </div>

        <Container>
          {/* Main Content - GENEROUS SPACING */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 mb-32 md:mb-40">
            {/* Left Column - Image */}
            <div className="relative h-[500px] lg:h-[700px] rounded-lg overflow-hidden">
              <Image
                src="https://giovannivillage.com/wp-content/uploads/2023/07/3.jpg"
                alt="Giovanni Village Resort"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
                priority
              />
            </div>

            {/* Right Column - Content - ENHANCED TYPOGRAPHY */}
            <div className="flex flex-col justify-center space-y-8">
              {about.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-xl md:text-2xl leading-relaxed text-[var(--color-text-secondary)]"
                  style={{ lineHeight: '1.8' }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Highlights Grid - LUXURY TREATMENT */}
          <div className="mb-32 md:mb-40">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-16 md:mb-20" style={{ lineHeight: '1.1' }}>
              What Makes Us Special
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
              {about.highlights.map((highlight, index) => {
                const Icon = iconMap[highlight.icon as keyof typeof iconMap];
                return (
                  <div
                    key={index}
                    className="text-center p-8 bg-[var(--color-background-secondary)] rounded-lg transition-transform duration-500 hover:scale-105"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-bronze)]/10 flex items-center justify-center">
                      <Icon className="h-10 w-10 text-[var(--color-bronze)]" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold mb-4" style={{ lineHeight: '1.2' }}>
                      {highlight.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.7' }}>
                      {highlight.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-[var(--color-background-secondary)] rounded-lg p-16 md:p-20 mb-32 md:mb-40">
            <div className="grid md:grid-cols-4 gap-12 text-center">
              <div>
                <p className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-bronze)] mb-4" style={{ lineHeight: '1.1' }}>
                  10
                </p>
                <p className="text-lg text-[var(--color-text-secondary)]">Acres of Lush Estate</p>
              </div>
              <div>
                <p className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-bronze)] mb-4" style={{ lineHeight: '1.1' }}>
                  20
                </p>
                <p className="text-lg text-[var(--color-text-secondary)]">Minutes from City Center</p>
              </div>
              <div>
                <p className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-bronze)] mb-4" style={{ lineHeight: '1.1' }}>
                  24/7
                </p>
                <p className="text-lg text-[var(--color-text-secondary)]">Concierge Service</p>
              </div>
              <div>
                <p className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-bronze)] mb-4" style={{ lineHeight: '1.1' }}>
                  500
                </p>
                <p className="text-lg text-[var(--color-text-secondary)]">Event Capacity</p>
              </div>
            </div>
          </div>

          {/* Image Gallery Grid */}
          <div className="mb-32 md:mb-40">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-20" style={{ lineHeight: '1.1' }}>
              Experience Giovanni Village
            </h2>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
              <div className="relative h-[350px] md:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://giovannivillage.com/wp-content/uploads/2023/07/4.jpg"
                  alt="Nature Views"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative h-[350px] md:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://giovannivillage.com/wp-content/uploads/2023/07/5.jpg"
                  alt="Garden Landscape"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative h-[350px] md:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://giovannivillage.com/wp-content/uploads/2023/07/2.jpg"
                  alt="Resort Grounds"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Our Promise */}
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-10" style={{ lineHeight: '1.1' }}>
              Our Promise to You
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.8' }}>
              At Giovanni Village, we believe in creating memories that last a lifetime.
              Every detail is thoughtfully curated to ensure your stay is nothing short of extraordinary.
              From our attentive staff to our pristine natural surroundings, we promise an experience
              that rejuvenates your mind, body, and soul.
            </p>
          </div>
        </Container>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
