import Link from 'next/link';
import { Users, Maximize, ArrowUpRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import FaqBlock from '@/components/ui/FaqBlock';
import RoomCardImage from '@/components/themes/retreat/RoomCardImage';
import { rooms, siteConfig } from '@/lib/data';

export const metadata = {
  title: 'Rooms & Suites',
  description:
    'Ten distinct room categories across 40+ rooms at Giovanni Village Resort, Bhopal — from 430ft² King Rooms with garden views to the 1,100ft² Royal Suite with a private open-to-sky plunge pool and 2,000ft² lawn. Patented Natural Latex bedding, farm-to-table breakfast.',
  alternates: { canonical: '/rooms' },
  openGraph: {
    title: 'Rooms & Suites — Giovanni Village Resort',
    description:
      'Ten room categories, from King Rooms to the Royal Suite with a private plunge pool. Each one opens to the forest.',
    url: '/rooms',
    images: ['/r1.webp'],
  },
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
          title="Rooms for long mornings and softer days."
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
                <RoomCardImage
                  images={room.gallery && room.gallery.length > 0 ? [room.image, ...room.gallery] : [room.image]}
                  alt={room.name}
                />


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
                      className="font-eyebrow inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-forest)] transition hover:text-[color:var(--color-brass)]"
                    >
                      View Details
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                    <Button variant="primary" size="md" href={siteConfig.booking.resort}>
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why Giovanni */}
          <div className="mb-24">
            <SectionHeader title="Why Giovanni" eyebrow="The estate, in four words" />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { t: 'Kids-friendly', d: 'Open lawns to run, peacocks to chase, a working farm to visit, and rooms with space for the whole family.' },
                { t: 'Activity-centric', d: 'Safaris, farm mornings, lake fishing, cycling and bonfires — the day fills itself if you let it.' },
                { t: 'Luxury-centric', d: 'Open-to-sky plunge-pool suites, Patented Natural Latex bedding, butler-led service and the Elysium spa.' },
                { t: 'Wildlife at the gate', d: 'Ratapani Tiger Reserve five minutes away — naturalist-led safaris before breakfast.' },
              ].map((c) => (
                <div key={c.t} className="rounded-lg bg-[var(--color-background-secondary)] p-7">
                  <h3 className="font-heading text-xl italic mb-3" style={{ fontWeight: 500 }}>
                    {c.t}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]" style={{ lineHeight: 1.7 }}>
                    {c.d}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="bg-[var(--color-background-secondary)] rounded-lg p-12 md:p-16 text-center mb-16">
            <SectionHeader
              title="Not sure which one is yours?"
              eyebrow="Talk to a human"
              description="Tell our concierge a little about your trip — anniversaries, allergies, the little ones along. We’ll match you to the room that fits."
            />
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              >
                Call Concierge
              </Button>
              <Button variant="outline" size="lg" href={siteConfig.booking.resort}>
                Check Live Availability
              </Button>
            </div>
          </div>
        </Container>

        <FaqBlock topic="rooms" />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
