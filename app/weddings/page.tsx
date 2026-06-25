'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Users, Sparkles } from 'lucide-react';
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
import WeddingMomentVideo from '@/components/themes/retreat/WeddingMomentVideo';
import { weddingVenues, siteConfig } from '@/lib/data';
import { getWhatsAppLink } from '@/lib/utils';
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp-messages';

const ceremonies = [
  { title: 'Mehndi', line: 'Morning haldi greens by the lily pond, with marigold canopies above.' },
  { title: 'Haldi', line: 'A turmeric afternoon under the mango grove. Petals from Royalton Farms.' },
  { title: 'Sangeet', line: 'A thousand bulbs in a pillarless hall, with a dance floor that the chairs lift away from.' },
  { title: 'Pheras', line: 'A lakeside mandap, four fires at dusk, the bride’s side and the groom’s side meeting on the lawn.' },
  { title: 'Reception', line: 'The celebration after the vows — a pillarless hall or a lakeside lawn, dinner under the canopy, and a dance floor that runs late.' },
  { title: 'Vidaai', line: 'Petal showers from Royalton baskets, flamingo statues at the gate, breakfast packed for the road.' },
];

const includes = [
  {
    eyebrow: 'A planner who only does your wedding',
    body: 'One named human, on email, on phone, from the proposal to the vidaai. Not a desk that gets passed around.',
  },
  {
    eyebrow: 'Decor from Royalton Farms',
    body: 'Marigolds, mango leaves, hibiscus — grown a few steps from where they go on the mandap. No flower flown in to fade by Sunday.',
  },
  {
    eyebrow: 'Live food stations & branded buffets',
    body: 'Tandoor, chaat, live juice, paan — the chefs come to the lawn. The buffets carry the estate’s name on the front.',
  },
  {
    eyebrow: 'On-site rooms for every guest',
    body: 'Rooms across ten categories in the resort, plus eight more at Giovanni House and Giovanni Suites in Arera Colony. The family stays under one roof.',
  },
  {
    eyebrow: 'Eleven venues, one estate',
    body: 'Five pillarless indoor halls, six lawns and lakesides. A different ceremony in a different room, all within the gates.',
  },
  {
    eyebrow: 'Capacity from twenty to two thousand',
    body: 'The Aria Grand seats 2,000; the lakeside deck seats twenty. We size the team to your guest list.',
  },
];

const planSteps = [
  {
    icon: Calendar,
    label: 'Tell us the date',
    body: 'A short call, a few date options, the vibe you’re after. We turn around a costed proposal in 48 hours.',
  },
  {
    icon: Users,
    label: 'Walk the venues',
    body: 'Drive up for a free one-night stay so you can see the lawns, taste the kitchen, and meet the planner before signing.',
  },
  {
    icon: Sparkles,
    label: 'We hold the rest',
    body: 'Decor, F&B, rooms, planning calls. Your job from here is to show up — we hold the date, the people, and the day itself.',
  },
];

export default function WeddingsPage() {
  const ariaGrand = weddingVenues.find((v) => v.id === 'aria-grand');
  const indoorRest = weddingVenues.filter((v) => v.type === 'indoor' && v.id !== 'aria-grand');
  const outdoor = weddingVenues.filter((v) => v.type === 'outdoor');

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image="/images/weddings/real-wedding-poster.webp"
          alt="A Giovanni Village wedding under marigold canopies"
          eyebrow="Weddings"
          title="The wedding that found its setting"
          description="Pillarless halls, lakeside lawns, forest clearings — held under marigold canopies with petals from our own farm, and a planner shaping every hour."
          video="/videos/weddings-real-loop.mp4"
        />

        <Container>
          <IntroBlock title="Twenty ceremonies, one estate">
            <p>
              Mehndi by the lily pond. Haldi under marigold archways. Pheras at the lake at sunset. Sangeet in a thousand-bulb hall. The estate stages each function in the venue it deserves, and the planner makes the day disappear into yours.
            </p>
          </IntroBlock>

          {/* Ceremonies — wedding-specific (replaces confused event-types row) */}
          <div className="mt-20 mb-24">
            <p
              className="mb-6 text-[11px] tracking-[0.36em] uppercase text-[var(--color-text-tertiary)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              Ceremonies
            </p>
            <ul className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 max-w-5xl">
              {ceremonies.map(({ title, line }) => (
                <li key={title} className="flex gap-6 items-baseline">
                  <span
                    aria-hidden
                    className="h-px w-8 flex-shrink-0 bg-[var(--color-border-strong)] translate-y-3"
                  />
                  <div>
                    <h3 className="display-italic text-2xl md:text-3xl mb-2 text-[var(--color-text)]">
                      {title}
                    </h3>
                    <p
                      className="text-[15px] leading-[1.75] text-[var(--color-text-secondary)]"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {line}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>

        {/* Real wedding video — the proof piece */}
        <Container>
          <WeddingMomentVideo
            src="/videos/weddings-real-feature.mp4"
            poster="/images/weddings/real-wedding-poster.webp"
            eyebrow="Behind a Giovanni wedding"
            title="Marigold petals, live tandoors, branded buffets."
            caption="A celebration the team held earlier this year — pom-pom-arch aisles, petals from Royalton Farms baskets, a floral mandap under the canopy, and a Giovanni Village branded buffet with live tandoor and juice stations. Audio on if you want the ambient music."
          />
        </Container>

        <Container>
          {/* Featured venue: Aria Grand */}
          {ariaGrand && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className="mt-24"
            >
              <p
                className="mb-3 text-[11px] tracking-[0.36em] uppercase text-[var(--color-text-tertiary)]"
                style={{ fontFamily: 'var(--font-eyebrow)' }}
              >
                The flagship venue
              </p>
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg lg:col-span-7">
                  <Image
                    src={ariaGrand.image}
                    alt={ariaGrand.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>
                <div className="lg:col-span-5">
                  <h2 className="display-italic text-3xl leading-[1.05] md:text-5xl">
                    <span className="font-script">Aria</span> Grand
                  </h2>
                  <p
                    className="mt-3 text-[11px] tracking-[0.32em] uppercase text-[var(--color-bronze)]"
                    style={{ fontFamily: 'var(--font-eyebrow)' }}
                  >
                    {ariaGrand.specs} · {ariaGrand.capacity}
                  </p>
                  <p
                    className="mt-5 text-[15px] leading-[1.8] text-[var(--color-text-secondary)] md:text-base"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {ariaGrand.description}
                  </p>
                  <div className="mt-7">
                    <Button
                      variant="primary"
                      size="lg"
                      href={getWhatsAppLink(
                        siteConfig.contact.whatsapp,
                        WHATSAPP_MESSAGES.weddingVenue(ariaGrand.name),
                      )}
                      external
                    >
                      Enquire about Aria Grand
                    </Button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* Other indoor venues — tighter grid */}
          <div className="mt-24 mb-6">
            <p
              className="mb-1 text-[11px] uppercase tracking-[0.3em] text-[var(--color-bronze)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              Indoor · Air-Conditioned
            </p>
            <h3 className="display-italic text-2xl leading-tight md:text-3xl">
              Four more pillarless halls and decks
            </h3>
          </div>
          <div className="mb-20 grid md:grid-cols-2 gap-8">
            {indoorRest.map((v) => (
              <ImageCard
                key={v.id}
                image={v.image}
                video={(v as { video?: string }).video}
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
                      WHATSAPP_MESSAGES.weddingVenue(v.name),
                    )}
                    external
                  >
                    Enquire about {v.name}
                  </Button>
                }
              />
            ))}
          </div>

          <div className="mt-12 mb-6">
            <p
              className="mb-1 text-[11px] uppercase tracking-[0.3em] text-[var(--color-bronze)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              Outdoor
            </p>
            <h3 className="display-italic text-2xl leading-tight md:text-3xl">
              Seven lawns, lakesides and decks
            </h3>
          </div>
          <div className="mb-24 grid md:grid-cols-2 gap-8">
            {outdoor.map((v) => (
              <ImageCard
                key={v.id}
                image={v.image}
                video={(v as { video?: string }).video}
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
                      WHATSAPP_MESSAGES.weddingVenue(v.name),
                    )}
                    external
                  >
                    Enquire about {v.name}
                  </Button>
                }
              />
            ))}
          </div>

          {/* What's included — reframed with Giovanni-specific anchors */}
          <div className="bg-[var(--color-background-secondary)] rounded-lg p-10 md:p-16 mb-24">
            <SectionHeader
              title="What we hold for you"
              eyebrow="Included"
              description="A Giovanni wedding isn't a venue rental. The estate, the kitchen, the farm and the planner all show up together."
            />
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
              {includes.map((f) => (
                <div key={f.eyebrow} className="border-t border-[var(--color-border)] pt-5">
                  <h4
                    className="display-italic text-lg leading-tight text-[var(--color-text)] md:text-xl"
                    style={{ fontWeight: 500 }}
                  >
                    {f.eyebrow}
                  </h4>
                  <p
                    className="mt-2 text-sm text-[var(--color-text-secondary)]"
                    style={{ fontFamily: 'var(--font-body)', lineHeight: 1.7 }}
                  >
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* How we plan it — 3-step strip */}
          <div className="mb-24">
            <SectionHeader title="How we plan it" eyebrow="From enquiry to vidaai" />
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {planSteps.map((s, i) => (
                <div key={s.label} className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-forest)] text-white">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <p
                    className="mt-5 text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-tertiary)]"
                    style={{ fontFamily: 'var(--font-eyebrow)' }}
                  >
                    Step 0{i + 1}
                  </p>
                  <h3
                    className="mt-1 display-italic text-2xl leading-tight"
                    style={{ fontWeight: 500 }}
                  >
                    {s.label}
                  </h3>
                  <p
                    className="mt-3 text-sm text-[var(--color-text-secondary)]"
                    style={{ fontFamily: 'var(--font-body)', lineHeight: 1.7 }}
                  >
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center max-w-3xl mx-auto pb-16">
            <SectionHeader
              title="Let's talk through your date"
              eyebrow="Tell the planner"
              description="A short call, a few dates, the vibe you're after. We send a proposal in 48 hours and a free one-night stay if you'd like to walk the venues yourself."
            />
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                href={getWhatsAppLink(siteConfig.contact.whatsapp, WHATSAPP_MESSAGES.wedding)}
                external
              >
                Request a Proposal
              </Button>
              <Button
                variant="outline"
                size="lg"
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              >
                Call Events Team
              </Button>
            </div>
            <p className="mt-6 text-sm text-[var(--color-text-tertiary)]">
              Concierge:{' '}
              <a href={`tel:${siteConfig.contact.phone}`} className="text-[var(--color-bronze)] hover:underline">{siteConfig.contact.phone}</a>{' '}
              · Email:{' '}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-[var(--color-bronze)] hover:underline">{siteConfig.contact.email}</a>
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
