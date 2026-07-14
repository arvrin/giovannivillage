'use client';

import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PageHero from '@/components/ui/PageHero';
import IntroBlock from '@/components/ui/IntroBlock';
import SectionHeader from '@/components/ui/SectionHeader';
import VenueGrid from '@/components/ui/VenueGrid';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import FaqBlock from '@/components/ui/FaqBlock';
import { weddingVenues, siteConfig } from '@/lib/data';
import { getWhatsAppLink } from '@/lib/utils';
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp-messages';

const formats = [
  { title: 'Conferences & AGMs', line: 'Pillarless, AV-ready halls with breakaway rooms for working sessions.' },
  { title: 'Corporate Offsites', line: 'Stay-and-work formats — boardroom mornings, forest afternoons, dinners under the canopy.' },
  { title: 'Brand Activations', line: 'Indoor + outdoor venues in combination, custom builds for launches and experiential moments.' },
  { title: 'Board Meetings', line: 'The Forum — a purpose-built boardroom overlooking the pool, with intimate dining alongside.' },
];

// The Aria Grand shown in three corporate configurations — same pillarless hall.
const ariaSetups = [
  {
    src: '/images/events/aria-conference-theatre.webp',
    label: 'Theatre · up to 2,000',
    alt: 'The Aria Grand set theatre-style facing a stage and LED wall for a conference plenary',
    caption: 'A full-width plenary facing the stage and LED wall. The pillarless span keeps the screen in every sightline.',
  },
  {
    src: '/images/events/aria-conference-banquet.webp',
    label: 'Banquet rounds',
    alt: 'The Aria Grand set with banquet rounds for a corporate gala dinner',
    caption: 'Round tables for gala dinners and awards nights, with a full stage and centre aisle.',
  },
  {
    src: '/images/events/aria-conference-boardroom.webp',
    label: 'Hollow square · leadership',
    alt: 'The Aria Grand set in a hollow square for a corporate leadership summit',
    caption: 'A hollow square for leadership summits and AGMs — one table, everyone in the room, screen in view.',
  },
];

const included = [
  'AV, lighting and stage setup as standard',
  'High-speed Wi-Fi across every venue',
  'Breakaway rooms for working groups',
  'Custom F&B from Royalton Farms inside the estate',
  'Corporate group room rates with billed accommodation',
  'Dedicated events manager from RFP to wrap-up',
  'Branded signage and printed collateral coordination',
  'Single-point billing with GST invoicing',
];

export default function EventsPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image="/images/events/aria-conference-theatre.webp"
          alt="The Aria Grand at Giovanni Village set theatre-style for a conference"
          eyebrow="Meetings & Events"
          title="The boardroom that opens to a lake"
          description="A different rhythm from a conference centre. Pillarless halls, breakaway rooms, an AV team that knows what they’re doing, and after-hours the same estate guests get."
          video="/videos/twilight-path.mp4"
        />

        <Container>
          <IntroBlock title="Built for the kind of business that gets done outdoors">
            <p>
              Eleven venues across five indoor halls and six outdoor settings — the same estate that hosts two-thousand-guest weddings hosts the 20-person leadership offsite, the 200-delegate conference, the half-day board meeting with a working lunch on the lawn.
            </p>
            <p>
              We run RFPs cleanly. One events manager, one quote, one invoice. The team knows the AV vendors, the catering rhythm, and the room block dynamics so you don’t have to.
            </p>
          </IntroBlock>

          {/* Formats */}
          <SectionHeader title="The formats we handle" eyebrow="Four shapes a corporate stay can take" className="mt-24" />
          <div className="mt-12 mb-24 grid md:grid-cols-2 gap-8">
            {formats.map((f) => (
              <div key={f.title} className="border-l-2 border-[var(--color-bronze)] pl-6 py-2">
                <h3 className="font-heading text-xl md:text-2xl mb-3" style={{ letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                  {f.title}
                </h3>
                <p className="text-base text-[var(--color-text-secondary)]" style={{ lineHeight: 1.75 }}>
                  {f.line}
                </p>
              </div>
            ))}
          </div>

          {/* The Aria Grand, configured — one pillarless hall, three corporate setups */}
          <SectionHeader
            title="One hall, every configuration"
            eyebrow="The Aria Grand, set for business"
            description="The 9,500 sq ft pillarless Aria Grand reconfigures completely — a 2,000-seat plenary in the morning, banquet rounds for the gala, a hollow square for the board. Same room, no columns in a single sightline."
            className="mt-24"
          />
          <div className="mt-12 mb-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ariaSetups.map((s) => (
              <figure key={s.src} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mt-3">
                  <p
                    className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-bronze)]"
                    style={{ fontFamily: 'var(--font-eyebrow)' }}
                  >
                    {s.label}
                  </p>
                  <p
                    className="mt-1 text-sm text-[var(--color-text-secondary)]"
                    style={{ lineHeight: 1.6 }}
                  >
                    {s.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Venues — same 12 with corporate framing */}
          <SectionHeader
            title="Spaces for every business shape"
            eyebrow="The spaces"
            description="The venues that hold two-thousand-guest weddings also hold twenty-person boardrooms — reconfigured for theatre, classroom, U-shape or banquet seating per your brief."
          />

          <div className="mt-12 mb-6">
            <p
              className="mb-1 text-[11px] uppercase tracking-[0.3em] text-[var(--color-bronze)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              Indoor · Air-Conditioned
            </p>
            <h3 className="display-italic text-2xl leading-tight md:text-3xl">Halls and meeting rooms</h3>
          </div>
          <VenueGrid
            venues={weddingVenues.filter((v) => v.type === 'indoor' && v.useCases.includes('corporate'))}
            intent="corporate"
            className="mb-20"
          />

          <div className="mt-12 mb-6">
            <p
              className="mb-1 text-[11px] uppercase tracking-[0.3em] text-[var(--color-bronze)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              Outdoor
            </p>
            <h3 className="display-italic text-2xl leading-tight md:text-3xl">Lawns and lakesides</h3>
          </div>
          <VenueGrid
            venues={weddingVenues.filter((v) => v.type === 'outdoor' && v.useCases.includes('corporate'))}
            intent="corporate"
            className="mb-10"
          />
          <div className="mb-24 text-center">
            <Button variant="outline" size="md" href="/venues">
              Explore all venues
            </Button>
          </div>

          {/* What's included */}
          <div className="bg-[var(--color-background-secondary)] rounded-lg p-12 md:p-16 mb-24">
            <SectionHeader title="What's included from RFP to wrap-up" eyebrow="Standard with every event" />
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {included.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-bronze)]" />
                  <span className="text-base text-[var(--color-text-secondary)]" style={{ lineHeight: 1.7 }}>
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center max-w-3xl mx-auto pb-16">
            <SectionHeader
              title="Send us the brief"
              eyebrow="Talk to the events team"
              description="Share the date, the headcount and the format — we’ll come back with a proposal, room block and a planning timeline within a working day."
            />
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                href={getWhatsAppLink(siteConfig.contact.whatsapp, WHATSAPP_MESSAGES.corporateEvent)}
                external
              >
                Request a Proposal
              </Button>
              <Button
                variant="outline"
                size="lg"
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              >
                Call Events Team
              </Button>
            </div>
            <p className="mt-6 text-sm text-[var(--color-text-tertiary)]">
              Events:{' '}
              <a href={`tel:${siteConfig.contact.phone}`} className="text-[var(--color-bronze)] hover:underline">
                {siteConfig.contact.phone}
              </a>{' '}
              · Email:{' '}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-[var(--color-bronze)] hover:underline">
                {siteConfig.contact.email}
              </a>
            </p>
          </div>
        </Container>

        <FaqBlock topic="weddings" />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
