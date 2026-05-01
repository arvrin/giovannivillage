import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Check, Users, Maximize, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { rooms, siteConfig } from '@/lib/data';

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
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image={room.image}
          alt={room.name}
          eyebrow="Accommodation"
          title={room.name}
          description={
            <span className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-base md:text-lg">
              <span className="inline-flex items-center gap-2"><Users className="h-5 w-5" />{room.capacity}</span>
              <span className="inline-flex items-center gap-2"><Maximize className="h-5 w-5" />{room.area}</span>
            </span>
          }
        />

        <Container>
          <div className="mb-8">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-bronze)] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>All Rooms & Suites</span>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-24">
            {/* Main content */}
            <div className="lg:col-span-2">
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-12" style={{ lineHeight: 1.7 }}>
                {room.description}
              </p>

              {/* Photo gallery */}
              {room.gallery && room.gallery.length > 0 && (
                <div className="mb-12">
                  <SectionHeader title="Photo Gallery" align="left" size="md" />
                  <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
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

              {/* Features */}
              <div className="mb-12">
                <SectionHeader title="Room Features" align="left" size="md" />
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {room.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--color-text-secondary)]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-12">
                <SectionHeader title="Standard Amenities" align="left" size="md" />
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {standardAmenities.map((amenity) => (
                    <div key={amenity} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[var(--color-bronze)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--color-text-secondary)]">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking sidebar */}
            <aside>
              <div className="sticky top-28 bg-[var(--color-background-secondary)] p-8 rounded-lg">
                <p className="text-sm text-[var(--color-text-tertiary)] mb-2">Starting from</p>
                <p className="text-4xl font-heading font-bold text-[var(--color-text-primary)]" style={{ lineHeight: 1.1 }}>
                  ₹{room.price.toLocaleString()}
                </p>
                <p className="text-sm text-[var(--color-text-tertiary)] mb-6">per night</p>

                <div className="space-y-3">
                  <Button variant="cta" fullWidth size="lg" href={siteConfig.booking.resort}>
                    Book Now
                  </Button>
                  <Button variant="cta-outline" fullWidth size="lg" href={siteConfig.booking.resort}>
                    Check Availability
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-[var(--color-text-tertiary)]/20 space-y-2 text-sm">
                  <p className="font-semibold mb-3">Need help?</p>
                  <p className="text-[var(--color-text-secondary)]">Call: {siteConfig.contact.phone}</p>
                  <p className="text-[var(--color-text-secondary)]">Email: {siteConfig.contact.email}</p>
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
