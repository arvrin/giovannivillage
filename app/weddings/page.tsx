'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PageHero from '@/components/ui/PageHero';
import IntroBlock from '@/components/ui/IntroBlock';
import SectionHeader from '@/components/ui/SectionHeader';
import ImageCard from '@/components/ui/ImageCard';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import FaqBlock from '@/components/ui/FaqBlock';
import { weddings, weddingVenues, siteConfig } from '@/lib/data';

/** Editorial one-liner row replacing the icon-tile grid.
 *  Each event type is a single italicised noun + a short hand-written line. */
const eventTypes = [
  { title: 'Weddings', line: 'Lakeside pheras at sunset; sangeet in a thousand-bulb hall.' },
  { title: 'Conferences', line: 'Pillarless halls and poolside boardrooms with the lake outside.' },
  { title: 'Concerts', line: 'Outdoor stages, big sound, and forest acoustics.' },
  { title: 'Private gatherings', line: 'Anniversaries, birthdays, milestone dinners under marigolds.' },
];

export default function WeddingsPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image="/w1.webp"
          alt="Weddings & Events at Giovanni Village"
          eyebrow="Celebrations"
          title="The wedding that found its setting"
          description="Pillarless halls, lakeside lawns, forest clearings. Held under marigold canopies, with a dedicated planner shaping every hour."
          video="/videos/evening-lounge.mp4"
        />

        <Container>
          <IntroBlock title="The estate has many rooms">
            <p>
              Mehndi by the lily pond. Haldi under marigold archways. Pheras at the lake at sunset. Sangeet in a thousand-bulb hall. The estate stages each function in the venue it deserves, and the planner makes the day disappear into yours.
            </p>
          </IntroBlock>

          {/* Event types — editorial row, no icon tiles */}
          <div className="mt-20 mb-24">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl">
              {eventTypes.map(({ title, line }) => (
                <li key={title} className="flex gap-6 items-baseline">
                  <span
                    aria-hidden
                    className="h-px w-8 flex-shrink-0 bg-[var(--color-border-strong)] translate-y-3"
                  />
                  <div>
                    <h3 className="display-italic text-2xl md:text-3xl mb-2 text-[var(--color-text)]">
                      {title}
                    </h3>
                    <p
                      className="text-[15px] leading-[1.75] text-[var(--color-text-secondary)]"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {line}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Venues */}
          <SectionHeader title="Six venues, twenty ceremonies" eyebrow="The spaces" />
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
            <SectionHeader title="What's in your hands when you arrive" eyebrow="Included" />
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
              title="Let's talk through your date"
              eyebrow="Tell the planner"
              description="A short call, a few dates, the vibe you're after. We send a proposal in 48 hours and a free one-night stay if you'd like to walk the venues yourself."
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

        <FaqBlock topic="weddings" />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
