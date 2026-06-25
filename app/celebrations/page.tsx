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
import { weddingVenues, siteConfig } from '@/lib/data';
import { getWhatsAppLink } from '@/lib/utils';
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp-messages';

const occasions = [
  { title: 'Milestone Birthdays', line: 'Fiftieths, sixtieths, seventieths. A long-table dinner under the trees with the kids running between the lily ponds.' },
  { title: 'Anniversaries', line: 'Silver and gold milestones. Quiet lakeside dinners, a private suite, breakfast at Royalton Farms the next morning.' },
  { title: 'Proposal Evenings', line: 'A telescope under the stars at Pihu, or the lantern-lit Gazebo by the Lake. We handle the choreography.' },
  { title: 'Intimate Gatherings', line: 'Baby showers, griha pravesh, family reunions, retirement dinners. Small numbers, considered details.' },
];

// Subset of venues that work for intimate, smaller-scale celebrations.
const INTIMATE_VENUE_IDS = new Set([
  'cocktail-lawn',
  'gourmet-lake-side-lawn',
  'pool-lawn',
  'pihu-deck',
  'aria-deck',
  'the-forum',
]);

const included = [
  'Bespoke menu shaped to the occasion and the season',
  'Decor consultation — flowers, lanterns, table styling, signage',
  'In-house cake from the patisserie',
  'Private dining setup with attentive but unseen service',
  'Photography on request',
  'Suite stay built into the celebration package',
  'Single dedicated planner from enquiry to evening-of',
];

export default function CelebrationsPage() {
  const venues = weddingVenues.filter((v) => INTIMATE_VENUE_IDS.has(v.id));

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image="/images/weddings/cocktail-lawn.webp"
          alt="Lakeside dinner at Giovanni Village"
          eyebrow="Private celebrations"
          title="The milestone the forest remembers"
          description="The quiet anniversaries between the wedding scale and the everyday — a long table under the trees, a private chef, the lake catching the last light."
          video="/videos/golden-lawn.mp4"
        />

        <Container>
          <IntroBlock title="Built for the celebrations between weddings">
            <p>
              Not every milestone needs a two-thousand-guest hall. A twenty-five-person silver anniversary. A 50th birthday under the canopy. A proposal at the lakeside Gazebo with the lanterns lighting one by one.
            </p>
            <p>
              We hold these the way they’re meant to be held — small, considered, and on the same estate that anchors the headline weddings, with the same kitchen and the same hands.
            </p>
          </IntroBlock>

          {/* Occasions */}
          <SectionHeader title="The occasions we hold" eyebrow="What private looks like, here" className="mt-24" />
          <div className="mt-12 mb-24 grid md:grid-cols-2 gap-8">
            {occasions.map((o) => (
              <div key={o.title} className="border-l-2 border-[var(--color-bronze)] pl-6 py-2">
                <h3 className="font-heading text-xl md:text-2xl mb-3" style={{ letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                  {o.title}
                </h3>
                <p className="text-base text-[var(--color-text-secondary)]" style={{ lineHeight: 1.75 }}>
                  {o.line}
                </p>
              </div>
            ))}
          </div>

          {/* Venues — filtered for intimate scale */}
          <SectionHeader
            title="Six settings for an intimate evening"
            eyebrow="The spaces"
            description="A subset of the estate's venues, chosen for their fit at the 10–200 guest scale. For larger formats — see the Weddings or Meetings & Events pages."
          />
          <div className="mt-12 mb-24 grid md:grid-cols-2 gap-8">
            {venues.map((v) => (
              <ImageCard
                key={v.id}
                image={v.image}
                alt={v.name}
                aspect="video"
                eyebrow={`${v.specs} · ${v.capacity}`}
                title={v.name}
                description={v.description}
                footer={
                  <Button
                    variant="outline"
                    size="md"
                    href={getWhatsAppLink(
                      siteConfig.contact.whatsapp,
                      WHATSAPP_MESSAGES.privateVenue(v.name),
                    )}
                    external
                  >
                    Enquire about {v.name}
                  </Button>
                }
              />
            ))}
          </div>

          {/* What's included */}
          <div className="bg-[var(--color-background-secondary)] rounded-lg p-12 md:p-16 mb-24">
            <SectionHeader title="What's in your hands when you arrive" eyebrow="Included" />
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
              title="Tell us what we’re celebrating"
              eyebrow="Talk to the concierge"
              description="Share the date, the people, and what you’re marking. We’ll come back with a plan — menu, setting, the small details you didn’t know you wanted."
            />
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                href={getWhatsAppLink(siteConfig.contact.whatsapp, WHATSAPP_MESSAGES.privateCelebration)}
                external
              >
                Plan This Celebration
              </Button>
              <Button
                variant="outline"
                size="lg"
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              >
                Call Concierge
              </Button>
            </div>
            <p className="mt-6 text-sm text-[var(--color-text-tertiary)]">
              Concierge:{' '}
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
