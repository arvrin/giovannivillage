'use client';

import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PageHero from '@/components/ui/PageHero';
import IntroBlock from '@/components/ui/IntroBlock';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { restaurants, siteConfig } from '@/lib/data';

const highlights = [
  {
    title: 'Farm-to-Table',
    description: 'Ingredients sourced from our own organic Royalton Farms within the resort.',
  },
  {
    title: 'Telescopic Nights',
    description: 'Stargaze through telescopes at Pihu while dining under an open sky.',
  },
  {
    title: 'Self-Service BBQ',
    description: 'Grill your own — or relax while we do — at our self-barbecue stations.',
  },
];

export default function DiningPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image="/Gourmet-By-The-Woods.jpg"
          alt="Gourmet By The Woods"
          eyebrow="Culinary Excellence"
          title="Restaurants & Dining"
          description="Indulge in gourmet dining without stepping out of the resort. Four signature venues — fine dining to casual cafés, rooftop romance to bistro nights."
        />

        <Container>
          <IntroBlock title="A Gastronomic Journey">
            <p>
              From world-renowned chefs at Gourmet By The Woods to telescope dinners under the stars at Pihu —
              every meal at Giovanni Village is an experience worth lingering over.
            </p>
          </IntroBlock>

          <div className="space-y-24 md:space-y-32 mt-24 mb-24">
            {restaurants.map((r, idx) => (
              <div
                key={r.id}
                className={`grid gap-10 lg:gap-16 lg:grid-cols-2 items-center ${
                  idx % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-lg overflow-hidden">
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest text-[var(--color-bronze)] mb-4"
                    style={{ letterSpacing: '0.15em' }}
                  >
                    {r.tagline}
                  </p>
                  <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                    {r.name}
                  </h2>
                  <p className="text-base md:text-lg text-[var(--color-text-secondary)] mb-6" style={{ lineHeight: 1.7 }}>
                    {r.description}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {r.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-[var(--color-bronze)]/30 bg-[var(--color-champagne)]/30 px-4 py-1.5 text-sm text-[var(--color-text-secondary)]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div className="bg-[var(--color-background-secondary)] rounded-lg p-12 md:p-16 mb-24">
            <SectionHeader title="Dining Highlights" eyebrow="At a Glance" />
            <div className="mt-12 grid md:grid-cols-3 gap-10">
              {highlights.map((h) => (
                <div key={h.title} className="text-center">
                  <h3 className="font-heading text-2xl font-bold mb-3">{h.title}</h3>
                  <p className="text-base text-[var(--color-text-secondary)]" style={{ lineHeight: 1.7 }}>
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Reservations */}
          <div className="text-center max-w-3xl mx-auto pb-16">
            <SectionHeader
              title="Reserve Your Table"
              eyebrow="Bookings"
              description="For reservations and special dining arrangements, please contact our F&B team."
            />
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="cta"
                size="lg"
                href={`tel:${siteConfig.contact.phoneSecondary.replace(/\s/g, '')}`}
              >
                Call F&amp;B Team
              </Button>
              <Button variant="cta-outline" size="lg" href="/contact">
                Send a Message
              </Button>
            </div>
            <p className="mt-6 text-sm text-[var(--color-text-tertiary)]">
              F&amp;B:{' '}
              <a href={`tel:${siteConfig.contact.phoneSecondary}`} className="text-[var(--color-bronze)] hover:underline">
                {siteConfig.contact.phoneSecondary}
              </a>
            </p>
          </div>
        </Container>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
