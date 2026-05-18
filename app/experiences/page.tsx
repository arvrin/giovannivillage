import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import Eyebrow from '@/components/ui/Eyebrow';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { activities, siteConfig } from '@/lib/data';

export const metadata = {
  title: 'Resort Experiences — Giovanni Village',
  description:
    'Ratapani safaris, telescope dinners, lakeside fishing, organic farm breakfast, open-air theatre and more — twenty-plus curated experiences at Giovanni Village Resort.',
};

const safariActivity = activities.find((a) => a.id === 'ratapani-safari')!;
const featured = [
  safariActivity,
  activities.find((a) => a.id === 'telescope-dinner')!,
  activities.find((a) => a.id === 'farm-breakfast')!,
];
const featuredIds = new Set(featured.map((a) => a.id));
const rest = activities.filter((a) => !featuredIds.has(a.id));

export default function ExperiencesPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image="/images/experiences/safari-jeep.webp"
          alt="Ratapani Sanctuary safari"
          eyebrow="The doings"
          title="Ways to lose the day"
          description="A safari before breakfast. A telescope before bed. Twenty quiet things between."
          video="/videos/twilight-path.mp4"
        />

        <Container>
          {/* Wildlife showcase — three landscape photos in a row */}
          <SectionHeader
            title="The reserve at the gate"
            eyebrow="Ratapani · five minutes away"
            description="Five hundred square kilometres of teak forest. One of India's healthiest tiger populations. A naturalist who knows where the leopards drink."
          />
          <div className="mt-12 mb-20 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {[
              { src: '/images/experiences/wildlife/tiger-log.jpg', alt: 'Tiger resting on log' },
              { src: '/images/experiences/wildlife/safari-elephants.jpg', alt: 'Safari elephants' },
              { src: '/images/experiences/wildlife/tiger-face.jpg', alt: 'Tiger face' },
            ].map((p) => (
              <div key={p.src} className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-md)]">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>

          {/* Featured experiences (icon cards) */}
          <SectionHeader
            title="Three rituals worth a morning"
            eyebrow="Don't leave without"
            description="The three things repeat guests come back for. Each takes about ninety minutes and changes how the rest of the day feels."
          />
          <div className="mt-12 mb-20 grid gap-6 md:grid-cols-3">
            {featured.map((a) => (
              <div
                key={a.id}
                className="group bg-[var(--color-bg-alt)] rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)] transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Icon container with neutral bg so transparent PNG icon is visible */}
                <div className="relative h-44 md:h-52 flex items-center justify-center bg-[var(--color-bg)]">
                  <Image
                    src={a.image}
                    alt={a.title}
                    width={140}
                    height={140}
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-7 md:p-8">
                  <Eyebrow color="bronze" className="mb-3">{a.category}</Eyebrow>
                  <h3
                    className="text-lg md:text-xl text-[var(--color-text)] mb-3"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 'var(--weight-heading)' as unknown as number,
                      letterSpacing: 'var(--tracking-heading)',
                      textTransform: 'var(--transform-heading)' as React.CSSProperties['textTransform'],
                      lineHeight: 1.25,
                    }}
                  >
                    {a.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]" style={{ lineHeight: 1.7 }}>
                    {a.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Full activity list — icon next to text, two/three column responsive */}
          <SectionHeader title="Twenty quiet things to do" eyebrow="The full list" />
          <div className="mt-12 mb-20 grid gap-x-8 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <div key={a.id} className="flex gap-5 items-start">
                <div className="relative h-20 w-20 shrink-0 flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-bg-alt)] border border-[var(--color-border)]">
                  <Image
                    src={a.image}
                    alt={a.title}
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Eyebrow color="bronze" className="mb-1.5">{a.category}</Eyebrow>
                  <h3
                    className="text-base md:text-lg text-[var(--color-text)] mb-1.5"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 'var(--weight-heading)' as unknown as number,
                      letterSpacing: 'var(--tracking-heading)',
                      textTransform: 'var(--transform-heading)' as React.CSSProperties['textTransform'],
                      lineHeight: 1.3,
                    }}
                  >
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
          <div className="bg-[var(--color-bg-deep)] rounded-[var(--radius-md)] p-10 md:p-14 mb-16 text-center text-[var(--color-bg-deep-text)]">
            <h2
              className="text-2xl md:text-3xl mb-4"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--weight-heading)' as unknown as number,
                letterSpacing: 'var(--tracking-heading)',
                textTransform: 'var(--transform-heading)' as React.CSSProperties['textTransform'],
                lineHeight: 1.1,
              }}
            >
              Plan your stay
            </h2>
            <p className="text-base md:text-lg opacity-80 mb-8 max-w-2xl mx-auto" style={{ lineHeight: 1.7 }}>
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
