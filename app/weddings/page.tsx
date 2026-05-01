'use client';

import { Heart, Users, Calendar, Sparkles } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PageHero from '@/components/ui/PageHero';
import IntroBlock from '@/components/ui/IntroBlock';
import SectionHeader from '@/components/ui/SectionHeader';
import ImageCard from '@/components/ui/ImageCard';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { weddings, weddingVenues, siteConfig } from '@/lib/data';

const eventTypes = [
  { title: 'Weddings', description: 'Lakeside pheras, sunset cocktails, big-fat-Indian celebrations.', icon: Heart },
  { title: 'Conferences', description: 'Pillarless halls and pool-side meeting spaces with full AV.', icon: Users },
  { title: 'Concerts', description: 'Outdoor venues for live music and large-format productions.', icon: Sparkles },
  { title: 'Private Parties', description: 'Anniversaries, birthdays, milestone celebrations.', icon: Calendar },
];

export default function WeddingsPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image="/w1.jpg"
          alt="Weddings & Events at Giovanni Village"
          eyebrow="Conferences · Concerts · Weddings · Events"
          title={weddings.title}
          description={weddings.description}
        />

        <Container>
          <IntroBlock title="Where Nature Hosts Your Event">
            <p>
              Manicured lawns that host up to 5,000 guests for grand receptions. A pillarless indoor hall for uninterrupted celebrations. Lakeside pheras with the sunset reflecting on the water. Cocktail parties under the stars with fairy lights in the trees — the possibilities are magical.
            </p>
          </IntroBlock>

          {/* Event types */}
          <div className="mt-24 mb-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventTypes.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="text-center p-8 bg-[var(--color-background-secondary)] rounded-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-bronze)]/10 flex items-center justify-center">
                  <Icon className="h-8 w-8 text-[var(--color-bronze)]" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{title}</h3>
                <p className="text-base text-[var(--color-text-secondary)]" style={{ lineHeight: 1.7 }}>
                  {description}
                </p>
              </div>
            ))}
          </div>

          {/* Venues */}
          <SectionHeader title="Our Venues" eyebrow="Spaces" />
          <div className="mt-16 mb-24 grid md:grid-cols-2 gap-8">
            {weddingVenues.map((v) => (
              <ImageCard
                key={v.id}
                image={v.image}
                alt={v.name}
                aspect="video"
                eyebrow={`${v.specs} · ${v.capacity}`}
                title={v.name}
                description={v.description}
                footer={
                  <Button variant="cta-outline" size="md" href="/contact">
                    Enquire about {v.name}
                  </Button>
                }
              />
            ))}
          </div>

          {/* What we offer */}
          <div className="bg-[var(--color-background-secondary)] rounded-lg p-12 md:p-16 mb-24">
            <SectionHeader title="What We Offer" eyebrow="Inclusions" />
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {weddings.features.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-bronze)]" />
                  <span className="text-base text-[var(--color-text-secondary)]" style={{ lineHeight: 1.7 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center max-w-3xl mx-auto pb-16">
            <SectionHeader
              title="Let's Plan Your Event"
              eyebrow="Get in Touch"
              description="Our events team is ready to bring your vision to life. Schedule a venue visit or share your brief — we will get back within a working day."
            />
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg" href="/contact">
                Request a Proposal
              </Button>
              <Button
                variant="cta-outline"
                size="lg"
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              >
                Call Events Team
              </Button>
            </div>
            <p className="mt-6 text-sm text-[var(--color-text-tertiary)]">
              Concierge:{' '}
              <a href={`tel:${siteConfig.contact.phone}`} className="text-[var(--color-bronze)] hover:underline">{siteConfig.contact.phone}</a>{' '}
              · Email:{' '}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-[var(--color-bronze)] hover:underline">{siteConfig.contact.email}</a>
            </p>
          </div>
        </Container>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
