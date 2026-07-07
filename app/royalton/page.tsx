import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PageHero from '@/components/ui/PageHero';
import IntroBlock from '@/components/ui/IntroBlock';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { siteConfig } from '@/lib/data';
import { getWhatsAppLink } from '@/lib/utils';

export const metadata = {
  title: 'Royalton Farms',
  description:
    'Royalton Farms — the working organic farm inside Giovanni Village Resort, Bhopal. Fields, dairy, henhouse and orchards that supply the resort kitchens, with seasonal farm tours and a Junior Chef Academy.',
  alternates: { canonical: '/royalton' },
  openGraph: {
    title: 'Royalton Farms — Giovanni Village Resort',
    description: 'The working organic farm inside the estate — fields, dairy, orchards, farm tours, and farm-to-table cooking.',
    url: '/royalton',
    images: ['/images/og/og-default.jpg'],
  },
};

const seasons = [
  {
    label: 'Summer',
    months: 'Mar – Jun',
    body: 'Alphonso, Dasheri and Langra mangoes from the old trees. Sun-warmed tomatoes, summer cucumbers, hibiscus that finishes its bloom by late May. The dairy quietens. Breakfast spreads onto the lawn.',
  },
  {
    label: 'Monsoon',
    months: 'Jul – Sep',
    body: 'Bhutta sweetcorn, green chickpeas in the pod, water chestnut from the lake side. The eggs deepen, the milk thickens. The kitchen quietly shortens the menu and lets the rain decide.',
  },
  {
    label: 'Winter',
    months: 'Oct – Feb',
    body: 'The slow Malwa season — root vegetables, mustard greens, citrus, leafy salads. Cold-pressed honey from the bees. Bonfires after dinner; dawn walks through the kitchen garden in fog.',
  },
];

const fields = [
  { label: 'The kitchen garden', body: 'Herbs, salad leaves, chillies, the tomatoes that finish on the vine. Picked at sunrise; on the plate by lunch.' },
  { label: 'The mango grove', body: 'Older trees that the family planted before the resort. Alphonso, Dasheri, Langra. Cared for slowly, harvested by hand.' },
  { label: 'The dairy & henhouse', body: 'A small herd, a careful flock. The 4:30 PM milking is real work; guests who join it walk back with a flask still warm from the cow.' },
  { label: 'The orchard & beehives', body: 'Lemon and guava trees, two beehives that the gardener moves twice a year. Honey gets bottled for the kitchen, never sold.' },
];

export default function RoyaltonPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image="/images/royalton/farm-2.webp"
          alt="Royalton Farms — the organic farm inside Giovanni Village"
          eyebrow="Royalton Farms"
          title={
            <>
              A working farm, not a{' '}
              <span className="font-script">show</span>.
            </>
          }
          description="Inside the gates of Giovanni Village — 23 acres of fields, dairy, henhouse and orchards that quietly supply every kitchen on the estate."
        />

        <Container>
          <IntroBlock title="The slow supply chain behind every plate">
            <p>
              Royalton Farms is the working organic farm built into the
              Giovanni Village estate. It is not a feature — it is the reason
              breakfast looks the way it does. The vegetables walk in from the
              field the same morning; the eggs are gathered by hand at six;
              the milk, drawn at the afternoon milking, is bottled fresh and chilled for the morning coffee.
            </p>
            <p>
              We don&apos;t pretend the menu is the same year-round. The farm
              shapes the kitchen, and the kitchen tells the truth about what
              the farm just gave. Most days that is generous. A few weeks a
              year, it is honest.
            </p>
          </IntroBlock>

          {/* The farm, in pictures */}
          <div className="mt-16 grid grid-cols-2 gap-3 md:gap-4">
            {[
              { src: '/images/royalton/farm-1.webp', alt: 'Organic cabbages growing at Royalton Farms' },
              { src: '/images/royalton/farm-3.webp', alt: 'Guests walking the fields at Royalton Farms' },
              { src: '/images/royalton/farm-4.webp', alt: 'Beds of vegetables at Royalton Farms' },
              { src: '/images/royalton/farm-6.webp', alt: 'A morning out on Royalton Farms' },
            ].map((p) => (
              <div
                key={p.src}
                className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)]"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 40vw"
                />
              </div>
            ))}
          </div>

          {/* What the farm is */}
          <SectionHeader
            title="What lives on the farm"
            eyebrow="The fields"
            className="mt-24"
          />
          <div className="mt-12 mb-24 grid md:grid-cols-2 gap-x-10 gap-y-8">
            {fields.map((f) => (
              <div
                key={f.label}
                className="border-t border-[color:var(--color-border)] pt-5"
              >
                <h3
                  className="text-base text-[var(--color-text)]"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 'var(--weight-heading)' as unknown as number,
                    letterSpacing: 'var(--tracking-heading)',
                    textTransform: 'var(--transform-heading)' as React.CSSProperties['textTransform'],
                    lineHeight: 1.3,
                  }}
                >
                  {f.label}
                </h3>
                <p
                  className="mt-2 text-sm text-[var(--color-text-secondary)]"
                  style={{ fontFamily: 'var(--font-body)', lineHeight: 1.7 }}
                >
                  {f.body}
                </p>
              </div>
            ))}
          </div>

          {/* Seasons */}
          <div className="bg-[var(--color-background-secondary)] rounded-lg p-12 md:p-16 mb-24">
            <SectionHeader
              title="The same kitchen, three different menus"
              eyebrow="By season"
              description="A working organic farm shapes a kitchen if you let it. We let it. Visit in three different seasons, eat three different meals."
            />
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              {seasons.map((s) => (
                <div key={s.label}>
                  <p
                    className="text-[10px] tracking-[0.32em] uppercase text-[color:var(--color-text-tertiary)]"
                    style={{ fontFamily: 'var(--font-eyebrow)' }}
                  >
                    {s.months}
                  </p>
                  <h3
                    className="mt-2 display-italic text-2xl leading-tight"
                    style={{ fontWeight: 500 }}
                  >
                    {s.label}
                  </h3>
                  <p
                    className="mt-3 text-sm text-[var(--color-text-secondary)]"
                    style={{ fontFamily: 'var(--font-body)', lineHeight: 1.75 }}
                  >
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Things to do at the farm */}
          <SectionHeader
            title="What you can do at the farm"
            eyebrow="For staying guests"
            description="Royalton is built for the supply, not for performance. But guests who are curious are welcome — quietly."
          />
          <div className="mt-12 mb-24 grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'The 4:30 PM milking',
                body: 'Walk to the dairy shed in the late afternoon, as the light goes gold. Help if you want. The same milk is bottled fresh and waiting in your coffee by morning.',
              },
              {
                title: 'The farm tour',
                body: 'A 60-minute guided walk through the fields, the dairy, the kitchen garden, the beehives. With the naturalist.',
              },
              {
                title: 'Farm-to-table breakfast',
                body: 'Eggs from the henhouse an hour ago. Hand-pulled coffee. Warm baked things. Served at Royalton, where the milk arrives before you do.',
              },
            ].map((a) => (
              <div
                key={a.title}
                className="rounded-md border border-[color:var(--color-border)] p-6"
              >
                <h3
                  className="display-italic text-xl leading-tight"
                  style={{ fontWeight: 500 }}
                >
                  {a.title}
                </h3>
                <p
                  className="mt-3 text-sm text-[var(--color-text-secondary)]"
                  style={{ fontFamily: 'var(--font-body)', lineHeight: 1.7 }}
                >
                  {a.body}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center max-w-3xl mx-auto pb-16">
            <SectionHeader
              title="Stay with us to spend a morning here"
              eyebrow="Plan a visit"
              description="The farm is open to guests of Giovanni Village — not as a public attraction, but as part of the estate you sleep on."
            />
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" href="/rooms">
                Plan a stay
              </Button>
              <Button
                variant="outline"
                size="lg"
                href={getWhatsAppLink(
                  siteConfig.contact.whatsapp,
                  'Hello Giovanni Village, I would like to know more about Royalton Farms and a stay.',
                )}
                external
              >
                Ask about the farm
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
