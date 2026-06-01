import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import FaqBlock from '@/components/ui/FaqBlock';
import ExperiencesEditorial from './ExperiencesEditorial';
import { siteConfig } from '@/lib/data';

export const metadata = {
  title: 'Resort Experiences — Giovanni Village',
  description:
    'Ten signature experiences and ten on-property pleasures at Giovanni Village Resort — from Ratapani safaris and rooftop telescope dinners to lake-side fishing, farm-to-table breakfasts and a 4:30 AM milking walk.',
};

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
          description="A safari before breakfast. A telescope before bed. The food grown a few steps from your plate. Stories the days here keep telling, long after you’ve left."
          video="/videos/twilight-path.mp4"
        />

        {/* Wildlife showcase — the reserve at the gate */}
        <Container>
          <SectionHeader
            title="The reserve at the gate"
            eyebrow="Ratapani · five minutes away"
            description="Five hundred square kilometres of teak forest. One of India’s healthiest tiger populations. A naturalist who knows where the leopards drink."
          />
          <div className="mt-12 mb-20 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {[
              { src: '/images/experiences/wildlife/tiger-log.webp', alt: 'Tiger resting on log' },
              { src: '/images/experiences/wildlife/safari-elephants.webp', alt: 'Safari elephants' },
              { src: '/images/experiences/wildlife/tiger-face.webp', alt: 'Tiger face' },
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
        </Container>

        <ExperiencesEditorial />

        {/* CTA */}
        <Container>
          <div className="bg-[var(--color-bg-deep)] rounded-[var(--radius-md)] p-10 md:p-14 my-16 text-center text-[var(--color-bg-deep-text)]">
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
              Tell us how you want to spend your days
            </h2>
            <p
              className="text-base md:text-lg opacity-80 mb-8 max-w-2xl mx-auto"
              style={{ lineHeight: 1.7 }}
            >
              Some experiences require pre-booking. Share what you’re hoping for and
              our concierge will line up the safaris, the farm mornings, the dinners to fit.
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

        <FaqBlock topic="experiences" />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
