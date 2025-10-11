import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Check, Users, Maximize, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { rooms } from '@/lib/data';

export async function generateStaticParams() {
  return rooms.map((room) => ({
    slug: room.id,
  }));
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = rooms.find((r) => r.id === slug);

  if (!room) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        {/* Hero Image */}
        <div className="relative h-[60vh] md:h-[70vh]">
          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Back Button */}
          <div className="absolute top-24 left-0 right-0">
            <Container>
              <Link
                href="/#rooms"
                className="inline-flex items-center gap-2 text-white hover:text-[var(--color-gold)] transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Rooms</span>
              </Link>
            </Container>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 pb-12">
            <Container>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {room.name}
              </h1>
              <div className="flex flex-wrap gap-6 text-white/90">
                {'capacity' in room && (
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>{room.capacity}</span>
                  </div>
                )}
                {'area' in room && (
                  <div className="flex items-center gap-2">
                    <Maximize className="h-5 w-5" />
                    <span>{room.area}</span>
                  </div>
                )}
              </div>
            </Container>
          </div>
        </div>

        {/* Content */}
        <Container className="py-16 md:py-24">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-xl leading-relaxed text-[var(--color-text-secondary)]">
                  {room.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-12">
                <h2 className="font-heading text-3xl font-semibold mb-6">
                  Room Features
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {room.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--color-text-secondary)]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-12">
                <h2 className="font-heading text-3xl font-semibold mb-6">
                  Standard Amenities
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
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
                  ].map((amenity, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[var(--color-bronze)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--color-text-secondary)]">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-[var(--color-background-secondary)] p-8 rounded-lg">
                <div className="mb-6">
                  <p className="text-sm text-[var(--color-text-tertiary)] mb-2">Starting from</p>
                  <p className="text-4xl font-heading font-bold text-[var(--color-text-primary)]">
                    ₹{room.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-[var(--color-text-tertiary)]">per night</p>
                </div>

                <div className="space-y-4">
                  <Button
                    variant="primary"
                    className="w-full bg-[var(--color-gold)] hover:bg-[var(--color-bronze)] text-[var(--color-charcoal)]"
                    size="lg"
                  >
                    Book Now
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-[var(--color-bronze)] text-[var(--color-bronze)] hover:bg-[var(--color-bronze)] hover:text-white"
                    size="lg"
                  >
                    Check Availability
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-[var(--color-text-tertiary)]/20">
                  <h3 className="font-semibold mb-4">Need Help?</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    Our reservations team is here to assist you
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">Call: +91 90390 37300</p>
                    <p className="font-medium">Email: reservations@giovannivillage.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
