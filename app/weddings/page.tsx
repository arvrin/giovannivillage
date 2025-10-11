'use client';

import Image from 'next/image';
import { Heart, Users, Calendar, CheckCircle2, Sparkles, Camera } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { weddings, siteConfig } from '@/lib/data';

const eventTypes = [
  {
    title: 'Weddings',
    description: 'Intimate ceremonies to grand celebrations with up to 500 guests',
    icon: Heart,
  },
  {
    title: 'Corporate Events',
    description: 'Professional meetings, conferences, and team-building retreats',
    icon: Users,
  },
  {
    title: 'Social Celebrations',
    description: 'Anniversaries, birthdays, and milestone celebrations',
    icon: Calendar,
  },
  {
    title: 'Private Parties',
    description: 'Exclusive gatherings in stunning natural settings',
    icon: Sparkles,
  },
];

const venues = [
  {
    name: 'Garden Lawn',
    capacity: '300-500 guests',
    description: 'Open-air venue surrounded by lush greenery, perfect for grand celebrations',
    features: ['Outdoor setting', 'Natural backdrop', 'Customizable layout', 'Evening ambiance'],
  },
  {
    name: 'Banquet Hall',
    capacity: '150-300 guests',
    description: 'Elegant indoor space with modern amenities and climate control',
    features: ['Air-conditioned', 'AV equipment', 'Stage setup', 'Dance floor'],
  },
  {
    name: 'Poolside Deck',
    capacity: '100-150 guests',
    description: 'Contemporary setting with pool views for intimate gatherings',
    features: ['Pool views', 'Sunset backdrop', 'Lounge seating', 'Bar setup'],
  },
  {
    name: 'Forest Pavilion',
    capacity: '50-100 guests',
    description: 'Exclusive woodland venue for intimate ceremonies and events',
    features: ['Private setting', 'Forest views', 'Intimate atmosphere', 'Photo opportunities'],
  },
];

export default function WeddingsPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)] pt-24 pb-16">
        {/* Hero Section - LUXURY EDITION */}
        <div className="relative h-[70vh] md:h-[80vh] lg:h-[85vh] mb-32 md:mb-40 lg:mb-48">
          <Image
            src="/w1.jpg"
            alt="Weddings at Giovanni Village"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 pb-24 md:pb-32">
            <Container>
              <div className="flex justify-start mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-white/80" style={{ letterSpacing: '2.5px' }}>
                  Events & Celebrations
                </p>
              </div>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-10" style={{ lineHeight: '1.1', letterSpacing: '-0.025em' }}>
                {weddings.title}
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl" style={{ lineHeight: '1.6' }}>
                {weddings.description}
              </p>
            </Container>
          </div>
        </div>

        <Container>
          {/* Introduction */}
          <div className="max-w-4xl mx-auto text-center mb-32 md:mb-40">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-10" style={{ lineHeight: '1.1' }}>
              Where Dreams Come True
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed text-[var(--color-text-secondary)] mb-8" style={{ lineHeight: '1.8' }}>
              Giovanni Village offers the perfect canvas for your special moments. Our stunning
              natural setting, combined with world-class hospitality and attention to detail,
              ensures every event is unforgettable.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.8' }}>
              From intimate gatherings to grand celebrations, we provide multiple venue options,
              expert planning services, and customized experiences tailored to your vision.
            </p>
          </div>

          {/* Event Types */}
          <div className="mb-32 md:mb-40">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-20" style={{ lineHeight: '1.1' }}>
              Events We Host
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
              {eventTypes.map((event, index) => {
                const Icon = event.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-8 bg-[var(--color-background-secondary)] rounded-lg transition-transform duration-500 hover:scale-105"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-bronze)]/10 flex items-center justify-center">
                      <Icon className="h-10 w-10 text-[var(--color-bronze)]" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold mb-4" style={{ lineHeight: '1.2' }}>
                      {event.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.7' }}>
                      {event.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Wedding Features */}
          <div className="mb-32 md:mb-40">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-20" style={{ lineHeight: '1.1' }}>
              Our Wedding Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {weddings.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-5 p-8 bg-[var(--color-background-secondary)] rounded-lg"
                >
                  <CheckCircle2 className="h-8 w-8 text-[var(--color-gold)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold mb-3" style={{ lineHeight: '1.2' }}>{feature}</h3>
                    <p className="text-base leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.7' }}>
                      {feature === 'Multiple venue options' && 'Choose from our Garden Lawn, Banquet Hall, Poolside, or Forest Pavilion'}
                      {feature === 'Capacity up to 500 guests' && 'Accommodate intimate gatherings to grand celebrations'}
                      {feature === 'Dedicated wedding planner' && 'Personal coordinator to bring your vision to life'}
                      {feature === 'Custom catering menus' && 'Curated dining experiences with our expert culinary team'}
                      {feature === 'On-site accommodation' && 'Luxury rooms and suites for guests and wedding party'}
                      {feature === 'Photography & decoration' && 'Professional services and stunning natural backdrops'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Venue Options */}
          <div className="mb-32 md:mb-40">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-20" style={{ lineHeight: '1.1' }}>
              Our Venues
            </h2>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
              {venues.map((venue, index) => (
                <div
                  key={index}
                  className="bg-[var(--color-background-secondary)] rounded-lg overflow-hidden"
                >
                  <div className="p-10 md:p-12">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-heading text-3xl md:text-4xl font-bold" style={{ lineHeight: '1.2' }}>
                        {venue.name}
                      </h3>
                      <span className="text-base font-medium text-[var(--color-text-tertiary)]">
                        {venue.capacity}
                      </span>
                    </div>
                    <p className="text-lg md:text-xl leading-relaxed text-[var(--color-text-secondary)] mb-8" style={{ lineHeight: '1.7' }}>
                      {venue.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {venue.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-[var(--color-bronze)]" />
                          <span className="text-base text-[var(--color-text-secondary)]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Planning Process */}
          <div className="bg-[var(--color-background-secondary)] rounded-lg p-16 md:p-20 mb-32 md:mb-40">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-20" style={{ lineHeight: '1.1' }}>
              Your Event Journey
            </h2>
            <div className="grid md:grid-cols-4 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-bronze)] text-white flex items-center justify-center text-3xl font-bold">
                  1
                </div>
                <h3 className="font-heading text-xl font-bold mb-3" style={{ lineHeight: '1.2' }}>Consultation</h3>
                <p className="text-base leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.7' }}>
                  Share your vision with our event planning team
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-bronze)] text-white flex items-center justify-center text-3xl font-bold">
                  2
                </div>
                <h3 className="font-heading text-xl font-bold mb-3" style={{ lineHeight: '1.2' }}>Planning</h3>
                <p className="text-base leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.7' }}>
                  Detailed planning with venue selection and customization
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-bronze)] text-white flex items-center justify-center text-3xl font-bold">
                  3
                </div>
                <h3 className="font-heading text-xl font-bold mb-3" style={{ lineHeight: '1.2' }}>Execution</h3>
                <p className="text-base leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.7' }}>
                  Flawless coordination on your special day
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-bronze)] text-white flex items-center justify-center text-3xl font-bold">
                  4
                </div>
                <h3 className="font-heading text-xl font-bold mb-3" style={{ lineHeight: '1.2' }}>Celebration</h3>
                <p className="text-base leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.7' }}>
                  Create unforgettable memories with your loved ones
                </p>
              </div>
            </div>
          </div>

          {/* Corporate Events Section */}
          <div className="mb-32 md:mb-40">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10" style={{ lineHeight: '1.1' }}>
                Corporate Events & Conferences
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed text-[var(--color-text-secondary)] text-center mb-16 md:mb-20" style={{ lineHeight: '1.8' }}>
                Our resort provides the perfect setting for productive business gatherings,
                team-building activities, and corporate retreats away from the city.
              </p>
              <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
                <div className="bg-[var(--color-background-secondary)] p-8 md:p-10 rounded-lg">
                  <Users className="h-12 w-12 text-[var(--color-bronze)] mb-6" />
                  <h3 className="font-heading text-2xl font-bold mb-4" style={{ lineHeight: '1.2' }}>Conference Facilities</h3>
                  <p className="text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.7' }}>
                    Modern AV equipment, high-speed internet, and professional setup
                  </p>
                </div>
                <div className="bg-[var(--color-background-secondary)] p-8 md:p-10 rounded-lg">
                  <Calendar className="h-12 w-12 text-[var(--color-bronze)] mb-6" />
                  <h3 className="font-heading text-2xl font-bold mb-4" style={{ lineHeight: '1.2' }}>Team Building</h3>
                  <p className="text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.7' }}>
                    Outdoor activities and collaborative exercises in natural settings
                  </p>
                </div>
                <div className="bg-[var(--color-background-secondary)] p-8 md:p-10 rounded-lg">
                  <Camera className="h-12 w-12 text-[var(--color-bronze)] mb-6" />
                  <h3 className="font-heading text-2xl font-bold mb-4" style={{ lineHeight: '1.2' }}>Business Amenities</h3>
                  <p className="text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.7' }}>
                    Projectors, sound systems, breakout rooms, and catering services
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Preview */}
          <div className="mb-32 md:mb-40">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-20" style={{ lineHeight: '1.1' }}>
              Event Moments
            </h2>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
              <div className="relative h-[350px] md:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://giovannivillage.com/wp-content/uploads/2023/07/ch2.jpg"
                  alt="Wedding Setup"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative h-[350px] md:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://giovannivillage.com/wp-content/uploads/2014/09/conference.jpg"
                  alt="Conference Hall"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative h-[350px] md:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://giovannivillage.com/wp-content/uploads/2021/08/hands-holding-wedding-planner-checklist-PSGQEUR.jpg"
                  alt="Event Planning"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-10" style={{ lineHeight: '1.1' }}>
              Let's Plan Your Event
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed text-[var(--color-text-secondary)] mb-12" style={{ lineHeight: '1.8' }}>
              Our events team is ready to help you create an unforgettable celebration.
              Contact us today to discuss your vision and schedule a venue visit.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Button
                variant="primary"
                size="lg"
                className="bg-[var(--color-gold)] hover:bg-[var(--color-bronze)] text-[var(--color-charcoal)]"
              >
                Schedule a Visit
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[var(--color-bronze)] text-[var(--color-bronze)] hover:bg-[var(--color-bronze)] hover:text-white"
              >
                Download Brochure
              </Button>
            </div>
            <p className="text-base text-[var(--color-text-tertiary)]">
              Call Events Team: <a href={`tel:${siteConfig.contact.phone}`} className="text-[var(--color-bronze)] hover:underline">{siteConfig.contact.phone}</a> |
              Email: <a href={`mailto:${siteConfig.contact.email}`} className="text-[var(--color-bronze)] hover:underline">{siteConfig.contact.email}</a>
            </p>
          </div>
        </Container>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
