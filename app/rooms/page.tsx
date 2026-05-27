import Image from 'next/image';
import Link from 'next/link';
import { Users, Maximize, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { rooms, siteConfig } from '@/lib/data';

export const metadata = {
  title: 'Rooms & Suites — Giovanni Village Resort',
  description:
    'Choose from eight distinct rooms and suites at Giovanni Village Resort in Bhopal — from King Rooms with garden views to Royal Suites with private plunge pools.',
};

export default function RoomsIndexPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image="/r1.webp"
          alt="Giovanni Village Rooms & Suites"
          eyebrow="The rooms"
          title="Rooms for slow mornings and softer days."
          description="Plunge pools open to the sky. Baths under uncovered stars. Decks the forest leans over. Each suite at the edge of Ratapani is built around a different way of taking your time."
          video="/videos/suite-reveal.mp4"
        />

        <Container>
          <div className="grid gap-12 lg:gap-16 mb-24">
            {rooms.map((room, index) => (
              <div
                key={room.id}
                className={`grid gap-10 lg:gap-16 lg:grid-cols-2 items-center ${
                  index % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div>
                  <h2
                    className="font-heading text-3xl md:text-4xl font-bold mb-4"
                    style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}
                  >
                    {room.name}
                  </h2>
                  <div className="flex flex-wrap gap-6 mb-5 text-[var(--color-text-secondary)]">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[var(--color-bronze)]" />
                      <span className="text-sm">{room.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize className="h-4 w-4 text-[var(--color-bronze)]" />
                      <span className="text-sm">{room.area}</span>
                    </div>
                  </div>
                  <p
                    className="text-base md:text-lg text-[var(--color-text-secondary)] mb-6"
                    style={{ lineHeight: 1.7 }}
                  >
                    {room.description}
                  </p>
                  {/* Feature list removed — one well-written description is enough.
                     Specifics live on the room detail page. */}
                  <div className="mb-8" />
                  <div className="flex flex-wrap gap-4 items-center">
                    <Link
                      href={`/rooms/${room.id}`}
                      className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-[var(--color-bronze)] hover:text-[var(--color-gold)] transition-colors"
                      style={{ letterSpacing: '0.1em' }}
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Button variant="cta" size="md" href={siteConfig.booking.resort}>
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="bg-[var(--color-background-secondary)] rounded-lg p-12 md:p-16 text-center mb-16">
            <SectionHeader
              title="Not sure which one is yours?"
              eyebrow="Talk to a human"
              description="Tell our concierge a little about your trip — anniversaries, allergies, the dog you’re bringing. We’ll match you to the room that fits."
            />
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="cta"
                size="lg"
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              >
                Call Concierge
              </Button>
              <Button variant="cta-outline" size="lg" href={siteConfig.booking.resort}>
                Check Live Availability
              </Button>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
