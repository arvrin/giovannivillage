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
import FaqBlock from '@/components/ui/FaqBlock';
import { RestaurantsSchema } from '@/components/seo/StructuredData';
import { restaurants, siteConfig } from '@/lib/data';
import { getWhatsAppLink } from '@/lib/utils';
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp-messages';

const highlights = [
  {
    title: 'Farm to table',
    description: 'The vegetables walk in from Royalton Farms inside the estate. Same morning, same hands.',
  },
  {
    title: 'Telescope nights',
    description: 'A telescope rolls onto the rooftop at Pihu. Saturn at the soup course; the Pleiades by dessert.',
  },
  {
    title: 'Open coals',
    description: 'Self-service grills under the trees — for the nights you want to cook your own dinner.',
  },
];

export default function DiningPage() {
  return (
    <>
      <RestaurantsSchema />
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image="/Gourmet-By-The-Woods.webp"
          alt="Gourmet By The Woods"
          eyebrow="The kitchens"
          title="Three tables, one philosophy"
          description="Produce walks in from Royalton Farms — the working organic farm inside the estate — and our kitchens cook it the same morning. Farm-fresh Malwa cooking at Gourmet By The Woods; rooftop telescope dinners at Pihu; intimate lakeside service at Gazebo by the Lake."
          video="/videos/dining-arrival.mp4"
        />

        <Container>
          <IntroBlock title="Each table keeps its own hour">
            <p>
              Breakfast on the lawn. Long lunch under the canopy. Coffee at four. Telescopes after eight. Three dining venues, one wandering meal that lasts the whole stay — with fresh vegetables cut at four in the morning and on your table the same day.
            </p>
            <p>
              For an occasion of your own, a private dining area can be set on request — a quiet corner of the estate laid for a family dinner, an anniversary, or a small celebration.
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
                  {/* Tag pills removed — description carries the room. */}
                </div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div className="bg-[var(--color-background-secondary)] rounded-lg p-12 md:p-16 mb-24">
            <SectionHeader title="Quiet pleasures at the table" eyebrow="Three you’ll remember" />
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

          {/* Menus */}
          <div className="text-center max-w-3xl mx-auto mb-24">
            <SectionHeader
              title="Browse the menus"
              eyebrow="What's on the table"
              description="Our 2026 collection of restaurant dishes and bar pours — open the PDFs to browse the full lists."
            />
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                href="/menus/giovanni-restaurant-menu-2026.pdf"
                external
              >
                View Restaurant Menu
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="/menus/giovanni-bar-menu-2026.pdf"
                external
              >
                View Bar &amp; Beverages
              </Button>
            </div>
          </div>

          {/* Reservations */}
          <div className="text-center max-w-3xl mx-auto pb-16">
            <SectionHeader
              title="Save us a seat"
              eyebrow="Reservations"
              description="Phone the F&B team or drop us a line. Special menus, anniversaries, allergies — we take care of it ahead of you arriving."
            />
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                href={`tel:${siteConfig.contact.phoneSecondary.replace(/\s/g, '')}`}
              >
                Call F&amp;B Team
              </Button>
              <Button
                variant="outline"
                size="lg"
                href={getWhatsAppLink(siteConfig.contact.whatsapp, WHATSAPP_MESSAGES.dining)}
                external
              >
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

        <FaqBlock topic="dining" />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
