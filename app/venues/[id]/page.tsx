import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Users, Maximize, ArrowLeft, ArrowUpRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import PageHero from '@/components/ui/PageHero';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { venues, siteConfig, type VenueUseCase } from '@/lib/data';
import { getWhatsAppLink } from '@/lib/utils';
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp-messages';
import { BreadcrumbSchema, VenueSchema } from '@/components/seo/StructuredData';

const USE_CASE_LINKS: Record<VenueUseCase, { label: string; href: string }> = {
  wedding: { label: 'Weddings', href: '/weddings' },
  corporate: { label: 'Meetings & Events', href: '/events' },
  intimate: { label: 'Private Celebrations', href: '/celebrations' },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const venue = venues.find((v) => v.id === id);
  if (!venue) return {};
  const description = `${venue.name} at Giovanni Village Resort, Bhopal — ${venue.specs}. ${venue.description.slice(0, 130)}`;
  return {
    title: venue.name,
    description,
    alternates: { canonical: `/venues/${venue.id}` },
    openGraph: {
      title: `${venue.name} — Giovanni Village Resort`,
      description,
      url: `/venues/${venue.id}`,
      images: [venue.image],
    },
  };
}

export async function generateStaticParams() {
  return venues.map((v) => ({ id: v.id }));
}

export default async function VenueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const venue = venues.find((v) => v.id === id);
  if (!venue) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Venues', href: '/venues' },
          { name: venue.name, href: `/venues/${venue.id}` },
        ]}
      />
      <VenueSchema venue={venue} />
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image={venue.image}
          video={venue.video}
          alt={venue.name}
          eyebrow={venue.type === 'indoor' ? 'Indoor venue' : 'Outdoor venue'}
          title={venue.name}
        />

        <Container>
          <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
            <Link
              href="/venues"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-bronze)] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>All venues</span>
            </Link>

            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-[var(--color-text-secondary)]">
              <span className="inline-flex items-center gap-2">
                <Maximize className="h-4 w-4 text-[var(--color-bronze)]" />
                {venue.specs}
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-[var(--color-bronze)]" />
                {venue.capacity}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-24">
            {/* Main content */}
            <div className="lg:col-span-2">
              <p
                className="display-italic text-2xl md:text-3xl text-[var(--color-text)] mb-10"
                style={{ lineHeight: 1.35 }}
              >
                {venue.description}
              </p>

              {/* Good for — links into the relevant intent pages */}
              <div className="mb-16">
                <p
                  className="mb-4 text-[10px] tracking-[0.32em] uppercase text-[var(--color-text-tertiary)]"
                  style={{ fontFamily: 'var(--font-eyebrow)' }}
                >
                  Good for
                </p>
                <div className="flex flex-wrap gap-3">
                  {venue.useCases.map((uc) => {
                    const link = USE_CASE_LINKS[uc];
                    return (
                      <Link
                        key={uc}
                        href={link.href}
                        className="font-eyebrow inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-forest)] transition hover:bg-[var(--color-background-secondary)] hover:text-[color:var(--color-brass)]"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-[var(--color-border)] pt-6 text-base text-[var(--color-text-secondary)]" style={{ lineHeight: 1.85 }}>
                Part of Giovanni Village Resort — the estate kitchen, the farm at Royalton,
                in-house decor and a single dedicated planner come with every venue. Tell us
                your dates and guest count and we&apos;ll shape the rest around you.
              </div>
            </div>

            {/* Enquiry sidebar */}
            <aside>
              <div className="sticky top-28 bg-[var(--color-background-secondary)] p-8 rounded-lg">
                <p
                  className="text-[10px] tracking-[0.32em] uppercase text-[var(--color-text-tertiary)] mb-3"
                  style={{ fontFamily: 'var(--font-eyebrow)' }}
                >
                  Enquire
                </p>
                <p className="display-italic text-3xl text-[var(--color-text)] mb-2" style={{ lineHeight: 1.1 }}>
                  {venue.name}
                </p>
                <p className="text-sm text-[var(--color-text-tertiary)] mb-8">{venue.specs}</p>

                <div className="space-y-3">
                  <Button
                    variant="primary"
                    fullWidth
                    size="lg"
                    external
                    href={getWhatsAppLink(siteConfig.contact.whatsapp, WHATSAPP_MESSAGES.venueEnquiry(venue.name))}
                  >
                    Enquire on WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    size="lg"
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                  >
                    Call the events team
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-[var(--color-text-tertiary)]/20 space-y-2 text-sm">
                  <p
                    className="text-[10px] tracking-[0.28em] uppercase text-[var(--color-text-tertiary)] mb-3"
                    style={{ fontFamily: 'var(--font-eyebrow)' }}
                  >
                    Reach us directly
                  </p>
                  <p className="text-[var(--color-text)]">{siteConfig.contact.phone}</p>
                  <p className="text-[var(--color-text-secondary)] text-xs">{siteConfig.contact.email}</p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
