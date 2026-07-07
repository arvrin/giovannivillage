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
import ExperienceMarquee from './ExperienceMarquee';
import { siteConfig, activities } from '@/lib/data';
import { getWhatsAppLink } from '@/lib/utils';
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp-messages';

export const metadata = {
  title: 'Resort Experiences',
  description:
    'Twenty experiences across Giovanni Village Resort, Bhopal — Ratapani tiger safaris, rooftop telescope dinners at Pihu, lake-side fishing, farm-to-table breakfasts at Royalton Farms, a 4:30 PM milking walk, and quieter on-property pleasures.',
  alternates: { canonical: '/experiences' },
  openGraph: {
    title: 'Experiences — Giovanni Village Resort',
    description:
      'Twenty experiences from the estate — safaris at dawn, dinners under the stars, mornings at the farm.',
    url: '/experiences',
    images: ['/images/experiences/safari-jeep.webp'],
  },
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
            description="Five hundred square kilometres of teak forest. One of India’s healthiest tiger populations. Our naturalist-led jeeps leave from the gate before the world wakes."
          />
          <div className="mt-12 mb-20 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:items-center md:gap-5">
            {/* Tiger walking — left (landscape photo framed to the tall card) */}
            <div className="relative order-2 aspect-[3/4] overflow-hidden rounded-[var(--radius-md)] sm:order-1">
              <Image
                src="/images/experiences/wildlife/tiger-walking.webp"
                alt="A Bengal tiger walking through the grassland near Ratapani"
                fill
                className="object-cover object-[60%_50%] transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 28vw"
              />
            </div>

            {/* Safari video — the centerpiece, taller than the stills */}
            <div className="relative order-1 col-span-2 aspect-[9/16] overflow-hidden rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] sm:order-2 sm:col-span-1">
              <video
                src="/videos/jungle-safari.mp4"
                poster="/videos/jungle-safari-poster.webp"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="A jungle safari drive through Ratapani Tiger Reserve"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <span
                className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.26em] text-white backdrop-blur-sm"
                style={{ fontFamily: 'var(--font-eyebrow)' }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brass)]" />
                Live from the reserve
              </span>
            </div>

            {/* Giovanni safari jeep — right */}
            <div className="relative order-3 aspect-[3/4] overflow-hidden rounded-[var(--radius-md)]">
              <Image
                src="/images/experiences/wildlife/giovanni-safari-jeep.webp"
                alt="Guests on a Giovanni Village safari jeep at Ratapani"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 28vw"
              />
            </div>
          </div>

          {/* Every experience — animated, swipeable icon marquee */}
          <SectionHeader
            title="Twenty ways to spend the day"
            eyebrow="Every experience"
            className="mt-8"
          />
        </Container>

        <div className="mt-10 mb-8 md:mt-12">
          <ExperienceMarquee items={activities} />
        </div>

        {/* All experiences at a glance — static grid so the full count is visible on one screen */}
        <Container>
          <div className="mb-16">
            <p
              className="mb-6 text-center text-sm uppercase text-[var(--color-text-tertiary)]"
              style={{ letterSpacing: '0.15em' }}
            >
              All {activities.length} experiences, at a glance
            </p>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {activities.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-alt)] px-4 py-3"
                >
                  <Image
                    src={a.image}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 shrink-0 object-contain"
                  />
                  <span className="text-sm text-[var(--color-text)]" style={{ lineHeight: 1.3 }}>
                    {a.title}
                  </span>
                </li>
              ))}
            </ul>
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
              <Button variant="primary" size="lg" href={siteConfig.booking.resort}>
                Book Your Stay
              </Button>
              <Button
                variant="light-outline"
                size="lg"
                href={getWhatsAppLink(siteConfig.contact.whatsapp, WHATSAPP_MESSAGES.experiences)}
                external
              >
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
