import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Users, Maximize, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { rooms, siteConfig } from '@/lib/data';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = rooms.find((r) => r.id === slug);
  if (!room) return {};
  const title = `${room.name}`;
  const description = `${room.name} at Giovanni Village Resort, Bhopal. ${room.description.slice(0, 140)}`;
  return {
    title,
    description,
    alternates: { canonical: `/rooms/${room.id}` },
    openGraph: {
      title: `${room.name} — Giovanni Village Resort`,
      description,
      url: `/rooms/${room.id}`,
      images: [room.image],
    },
  };
}

const standardAmenities = [
  'Air Conditioning',
  'Flat Screen TV',
  'Mini Bar',
  'Coffee/Tea Maker',
  'Premium Toiletries',
  'Hair Dryer',
  '24/7 Room Service',
  'Complimentary Wi-Fi',
  'Iron & Ironing Board',
  'In-room Safe',
];

export async function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.id }));
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = rooms.find((r) => r.id === slug);
  if (!room) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Rooms', href: '/rooms' },
          { name: room.name, href: `/rooms/${room.id}` },
        ]}
      />
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image={room.image}
          alt={room.name}
          eyebrow="The suite"
          title={room.name}
        />

        <Container>
          <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-bronze)] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>All suites</span>
            </Link>

            {/* Info strip — clean, no longer overlapping the headline */}
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-[var(--color-text-secondary)]">
              <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-[var(--color-bronze)]" />{room.capacity}</span>
              <span className="inline-flex items-center gap-2"><Maximize className="h-4 w-4 text-[var(--color-bronze)]" />{room.area}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-24">
            {/* Main content */}
            <div className="lg:col-span-2">
              {room.rich && (
                <p
                  className="mb-3 text-[11px] tracking-[0.36em] uppercase text-[var(--color-text-tertiary)]"
                  style={{ fontFamily: 'var(--font-eyebrow)' }}
                >
                  {room.rich.subtitle}
                </p>
              )}
              <p
                className="display-italic text-2xl md:text-3xl text-[var(--color-text)] mb-10"
                style={{ lineHeight: 1.35 }}
              >
                {room.description}
              </p>

              {room.rich && (
                <>
                  <p
                    className="mb-12 text-base md:text-lg text-[var(--color-text-secondary)]"
                    style={{ fontFamily: 'var(--font-body)', lineHeight: 1.85 }}
                  >
                    {room.rich.intro}
                  </p>

                  {/* Editorial sections */}
                  <div className="mb-16 space-y-10">
                    {room.rich.sections.map((s) => (
                      <div key={s.heading} className="border-t border-[var(--color-border)] pt-6">
                        <h3
                          className="display-italic text-xl md:text-2xl text-[var(--color-text)]"
                          style={{ fontWeight: 500, lineHeight: 1.25 }}
                        >
                          {s.heading}
                        </h3>
                        <p
                          className="mt-3 text-base text-[var(--color-text-secondary)]"
                          style={{ fontFamily: 'var(--font-body)', lineHeight: 1.8 }}
                        >
                          {s.body}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Suite specifications */}
                  <div className="mb-16">
                    <SectionHeader title="Suite specifications" eyebrow="The details" align="left" size="md" />
                    <dl className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                      {room.rich.specs.map((spec) => (
                        <div key={spec.label} className="border-b border-[var(--color-border)] pb-4">
                          <dt
                            className="text-[10px] tracking-[0.32em] uppercase text-[var(--color-text-tertiary)]"
                            style={{ fontFamily: 'var(--font-eyebrow)' }}
                          >
                            {spec.label}
                          </dt>
                          <dd
                            className="mt-1.5 text-base text-[var(--color-text)]"
                            style={{ fontFamily: 'var(--font-body)' }}
                          >
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/* Distinction closer */}
                  {room.rich.distinction && (
                    <div className="mb-16 bg-[var(--color-background-secondary)] rounded-lg p-8 md:p-10">
                      <p
                        className="mb-3 text-[10px] tracking-[0.32em] uppercase text-[var(--color-bronze)]"
                        style={{ fontFamily: 'var(--font-eyebrow)' }}
                      >
                        {room.rich.distinction.label}
                      </p>
                      <p
                        className="text-base md:text-lg italic text-[var(--color-text)]"
                        style={{ fontFamily: 'var(--font-body)', lineHeight: 1.8 }}
                      >
                        {room.rich.distinction.body}
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Photo gallery */}
              {room.gallery && room.gallery.length > 0 && (
                <div className="mb-16">
                  <SectionHeader title="A few quiet frames" eyebrow="The suite in pictures" align="left" size="md" />
                  <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
                    {room.gallery.map((src, idx) => (
                      <div
                        key={src}
                        className="relative aspect-[4/3] overflow-hidden rounded-lg group"
                      >
                        <Image
                          src={src}
                          alt={`${room.name} — photo ${idx + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What's distinct about this suite */}
              <div className="mb-16">
                <SectionHeader title="What sets this room apart" eyebrow="Worth knowing" align="left" size="md" />
                <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {room.features.map((feature) => (
                    <li key={feature} className="flex items-baseline gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brass)] flex-shrink-0" />
                      <span className="text-[var(--color-text)]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* In every suite */}
              <div className="mb-12">
                <SectionHeader title="In every suite" eyebrow="The basics, done well" align="left" size="md" />
                <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-[var(--color-text-secondary)]">
                  {standardAmenities.map((amenity) => (
                    <li key={amenity} className="flex items-baseline gap-3">
                      <span className="h-1 w-1 rounded-full bg-[var(--color-border-strong)] flex-shrink-0" />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Booking sidebar */}
            <aside>
              <div className="sticky top-28 bg-[var(--color-background-secondary)] p-8 rounded-lg">
                <p
                  className="text-[10px] tracking-[0.32em] uppercase text-[var(--color-text-tertiary)] mb-3"
                  style={{ fontFamily: 'var(--font-eyebrow)' }}
                >
                  From
                </p>
                <p className="display-italic text-5xl md:text-6xl text-[var(--color-text)]" style={{ lineHeight: 1 }}>
                  ₹{room.price.toLocaleString()}
                </p>
                <p className="text-sm text-[var(--color-text-tertiary)] mt-2 mb-8">per night, inclusive of breakfast</p>

                <div className="space-y-3">
                  <Button variant="primary" fullWidth size="lg" href={siteConfig.booking.resort}>
                    Reserve this suite
                  </Button>
                  <Button variant="outline" fullWidth size="lg" href={siteConfig.booking.resort}>
                    Check live availability
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-[var(--color-text-tertiary)]/20 space-y-2 text-sm">
                  <p
                    className="text-[10px] tracking-[0.28em] uppercase text-[var(--color-text-tertiary)] mb-3"
                    style={{ fontFamily: 'var(--font-eyebrow)' }}
                  >
                    Prefer to speak to a human
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
