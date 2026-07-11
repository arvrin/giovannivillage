'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Hotel, Leaf, Utensils, Flower2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { about } from '@/lib/data';
import EstateFrames from './EstateFrames';

const iconMap = {
  hotel: Hotel,
  leaf: Leaf,
  utensils: Utensils,
  spa: Flower2,
};

const stats = [
  { value: '23', label: 'Acres of estate' },
  { value: '50-yr', label: 'Old trees standing guard' },
  { value: '16 lakh', label: 'Litres of rain, harvested' },
  { value: '8', label: 'Heirloom mango varieties' },
  { value: '5 km', label: 'To Ratapani' },
  { value: '2,000', label: 'Guests at one time' },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image="/a1.webp"
          alt="About Giovanni Village Resort"
          eyebrow="The estate"
          title={about.title}
          description={about.subtitle}
        />

        <Container>
          {/* Editorial: image + content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-24 md:mb-32">
            <div className="relative h-[340px] sm:h-[440px] lg:h-[680px] rounded-lg overflow-hidden">
              <Image
                src="/images/about/landscape-1.webp"
                alt="Giovanni Village Resort"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-1000"
                priority
              />
            </div>
            <div className="flex flex-col justify-center space-y-6">
              {about.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg md:text-xl text-[var(--color-text-secondary)]"
                  style={{ lineHeight: 1.8 }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* The Legend */}
          <div className="mx-auto mb-24 max-w-3xl text-center md:mb-32">
            <SectionHeader
              title="The story you tell forever"
              eyebrow="The legend of Giovanni"
            />
            <div className="mt-10 space-y-6">
              {about.legend.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg md:text-xl text-[var(--color-text-secondary)]"
                  style={{ lineHeight: 1.8 }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>

        {/* The Grand Mantra of Oneness — full-bleed manifesto */}
        <div className="mb-24 bg-[var(--color-charcoal)] py-20 text-white md:mb-32 md:py-28">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p
                className="mb-8 text-[11px] uppercase tracking-[0.36em] text-white/50"
                style={{ fontFamily: 'var(--font-eyebrow)' }}
              >
                {about.mantra.eyebrow}
              </p>
              <p
                className="display-italic mb-12 text-3xl leading-[1.15] md:text-5xl md:leading-[1.1]"
              >
                We are not built of <span className="font-script">stone</span>;
                <br />
                we are built of <span className="font-script">heartbeat</span>.
              </p>
              <div className="space-y-7">
                {about.mantra.lines.map((line, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: index * 0.06 }}
                    className="text-base text-white/80 md:text-lg"
                    style={{ lineHeight: 1.85 }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
              <p
                className="display-italic mt-14 text-2xl text-[var(--color-gold,#C9A961)] md:text-3xl"
                style={{ lineHeight: 1.2 }}
              >
                {about.mantra.close}
              </p>
            </div>
          </Container>
        </div>

        <Container>
          {/* The Gond */}
          <div className="mx-auto mb-24 max-w-3xl md:mb-32">
            <SectionHeader
              title="The keepers of this forest"
              eyebrow="The Gond"
            />
            <div className="mt-10 space-y-6">
              {about.gond.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg text-[var(--color-text-secondary)] md:text-xl"
                  style={{ lineHeight: 1.8 }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <SectionHeader title="Four hours of the estate" eyebrow="A day, told four ways" />
          <div className="mt-16 mb-24 md:mb-32 grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {about.highlights.map((highlight, index) => {
              const Icon = iconMap[highlight.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
                  className="text-center"
                >
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-champagne)] text-[var(--color-bronze)] transition-transform duration-500 hover:scale-110">
                      <Icon className="h-9 w-9" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-3">{highlight.title}</h3>
                  <p className="text-base text-[var(--color-text-secondary)]" style={{ lineHeight: 1.7 }}>
                    {highlight.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="mb-24 md:mb-32 rounded-lg bg-[var(--color-background-secondary)] p-10 md:p-16">
            <p
              className="mb-10 text-center text-[11px] uppercase tracking-[0.36em] text-[var(--color-text-tertiary)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              The estate at a glance
            </p>
            <div className="grid grid-cols-2 gap-y-10 text-center md:grid-cols-3 md:gap-y-12 md:[&>*:not(:nth-child(3n+1))]:border-l md:[&>*]:border-[var(--color-border)]">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="px-2 md:px-6"
                >
                  <p
                    className="display-italic mb-3 text-5xl text-[var(--color-bronze)] md:text-6xl"
                    style={{ fontWeight: 500, lineHeight: 1 }}
                  >
                    {s.value}
                  </p>
                  <p
                    className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
                    style={{ fontFamily: 'var(--font-eyebrow)' }}
                  >
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image gallery — rotating frames, no image repeated across frames */}
          <SectionHeader title="Frames from the estate" eyebrow="A glimpse" />
          <EstateFrames />

          {/* Promise */}
          <div className="text-center max-w-3xl mx-auto pb-16">
            <SectionHeader
              title="The reason people return"
              eyebrow="What it actually feels like"
              description="The food on the lawn at breakfast — grown a few steps away at Royalton Farms. The night-jar at the plunge pool. A planner who remembers your aunt’s name. Long days, softer evenings, and the small hospitality that hides the work behind it. Because here, slow is the new luxury — and nature is the ultimate medicine."
            />
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button variant="primary" size="lg" href="/rooms">
                Plan a Stay
              </Button>
              <Button variant="outline" size="lg" href="/contact">
                Talk to the Concierge
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
