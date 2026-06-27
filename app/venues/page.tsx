import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import ImageCard from '@/components/ui/ImageCard';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { venues, siteConfig } from '@/lib/data';
import { BreadcrumbSchema, VenuesListSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Venues',
  description:
    'Eleven venues across Giovanni Village Resort, Bhopal — five pillarless air-conditioned indoor halls and six lawns, lakesides and decks. From the 10,000 sq ft Aria Grand to intimate lakeside lawns, sized for twenty-guest ceremonies to two-thousand-guest weddings.',
  alternates: { canonical: '/venues' },
  openGraph: {
    title: 'Venues — Giovanni Village Resort',
    description:
      'Eleven venues, one estate — pillarless indoor halls, lawns, lakesides and decks for weddings, conferences and private celebrations.',
    url: '/venues',
    images: ['/images/weddings/aria-grand-hall.webp'],
  },
};

const indoor = venues.filter((v) => v.type === 'indoor');
const outdoor = venues.filter((v) => v.type === 'outdoor');

function VenueTeaserGrid({ items }: { items: typeof venues }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {items.map((v) => (
        <ImageCard
          key={v.id}
          image={v.image}
          video={v.video}
          alt={v.name}
          aspect="video"
          title={v.name}
          meta={`${v.specs} · ${v.capacity}`}
          href={`/venues/${v.id}`}
        />
      ))}
    </div>
  );
}

export default function VenuesIndexPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Venues', href: '/venues' }]} />
      <VenuesListSchema venues={venues} />
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image="/images/weddings/aria-grand-hall.webp"
          alt="Venues at Giovanni Village Resort"
          eyebrow="The venues"
          title="Eleven venues, one estate."
          description="Pillarless air-conditioned halls, lawns nestled in old trees, lakeside decks and a rooftop under the sky. The same estate stages a twenty-guest ceremony and a two-thousand-guest reception — each function in the venue it deserves."
        />

        <Container>
          <div className="mt-8 mb-6">
            <p
              className="mb-1 text-[11px] uppercase tracking-[0.3em] text-[var(--color-bronze)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              Indoor · Air-Conditioned
            </p>
            <h2 className="display-italic text-2xl leading-tight md:text-3xl">
              Five pillarless halls and decks
            </h2>
          </div>
          <div className="mb-20">
            <VenueTeaserGrid items={indoor} />
          </div>

          <div className="mt-12 mb-6">
            <p
              className="mb-1 text-[11px] uppercase tracking-[0.3em] text-[var(--color-bronze)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              Outdoor
            </p>
            <h2 className="display-italic text-2xl leading-tight md:text-3xl">
              Six lawns, lakesides and decks
            </h2>
          </div>
          <div className="mb-24">
            <VenueTeaserGrid items={outdoor} />
          </div>

          {/* Where to go next, by occasion */}
          <div className="bg-[var(--color-background-secondary)] rounded-lg p-12 md:p-16 text-center mb-16">
            <SectionHeader
              title="Planning something specific?"
              eyebrow="By occasion"
              description="Each occasion is staged a little differently. Start with the page closest to your event, or talk to the team and we'll shape it around you."
            />
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <Link
                href="/weddings"
                className="font-eyebrow inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-forest)] transition hover:text-[color:var(--color-brass)]"
              >
                Weddings <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/events"
                className="font-eyebrow inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-forest)] transition hover:text-[color:var(--color-brass)]"
              >
                Meetings &amp; Events <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/celebrations"
                className="font-eyebrow inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-forest)] transition hover:text-[color:var(--color-brass)]"
              >
                Private Celebrations <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-10">
              <Button
                variant="primary"
                size="lg"
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              >
                Talk to the events team
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
