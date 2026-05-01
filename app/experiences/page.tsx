import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import ImageCard from '@/components/ui/ImageCard';
import Eyebrow from '@/components/ui/Eyebrow';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { activities, siteConfig } from '@/lib/data';

export const metadata = {
  title: 'Resort Experiences — Giovanni Village',
  description:
    'Ratapani safaris, telescope dinners, lakeside fishing, organic farm breakfast, open-air theatre and more — twenty-plus curated experiences at Giovanni Village Resort.',
};

const featured = activities.slice(0, 3);
const rest = activities.slice(3);

export default function ExperiencesPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image="/n1.jpg"
          alt="Resort Experiences at Giovanni Village"
          eyebrow="Countryside Chronicles"
          title="Resort Experiences"
          description="From tiger safaris in Ratapani to telescope dinners under the stars — Giovanni isn't just a resort, it's a world of immersive moments."
        />

        <Container>
          {/* Featured experiences */}
          <SectionHeader
            title="Signature Experiences"
            eyebrow="Don't Miss"
            description="The three things every Giovanni guest should make time for."
          />
          <div className="mt-16 mb-24 grid gap-8 md:grid-cols-3">
            {featured.map((a) => (
              <ImageCard
                key={a.id}
                image={a.image}
                alt={a.title}
                aspect="4/3"
                eyebrow={a.category}
                title={a.title}
                description={a.description}
              />
            ))}
          </div>

          {/* Full activity list */}
          <SectionHeader title="Every Way to Spend Your Day" eyebrow="More to Do" />
          <div className="mt-16 mb-24 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <div key={a.id} className="group flex gap-5 items-start">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-[var(--color-champagne)]/30">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Eyebrow color="bronze" className="mb-1.5">{a.category}</Eyebrow>
                  <h3 className="font-heading text-lg font-semibold mb-1.5" style={{ lineHeight: 1.3 }}>
                    {a.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]" style={{ lineHeight: 1.6 }}>
                    {a.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[var(--color-charcoal)] rounded-lg p-12 md:p-16 mb-16 text-center text-white">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              Plan your stay
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto" style={{ lineHeight: 1.7 }}>
              Some experiences require pre-booking — reach out to our concierge to put together your itinerary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg" href={siteConfig.booking.resort}>
                Book Your Stay
              </Button>
              <Button variant="cta-outline" size="lg" href="/contact">
                Talk to Concierge
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
