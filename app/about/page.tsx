'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Hotel, Leaf, Utensils, Sparkles } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { about } from '@/lib/data';

const iconMap = {
  hotel: Hotel,
  leaf: Leaf,
  utensils: Utensils,
  spa: Sparkles,
};

const stats = [
  { value: '10', label: 'Acres of estate' },
  { value: '20', label: 'Minutes from the city' },
  { value: '5 km', label: 'To Ratapani' },
  { value: '5,000', label: 'For the wedding' },
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
            <div className="relative h-[500px] lg:h-[680px] rounded-lg overflow-hidden">
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
          <div className="bg-[var(--color-background-secondary)] rounded-lg p-12 md:p-16 mb-24 md:mb-32">
            <div className="grid md:grid-cols-4 gap-12 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <p
                    className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-bronze)] mb-3"
                    style={{ lineHeight: 1.05 }}
                  >
                    {s.value}
                  </p>
                  <p className="text-base md:text-lg text-[var(--color-text-secondary)]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image gallery */}
          <SectionHeader title="Frames from the estate" eyebrow="A glimpse" />
          <div className="mt-16 mb-24 md:mb-32 grid md:grid-cols-3 gap-8">
            {[
              { src: '/images/about/landscape-1.webp', alt: 'Nature Views' },
              { src: '/images/about/landscape-2.webp', alt: 'Garden Landscape' },
              { src: '/images/about/landscape-3.webp', alt: 'Resort Grounds' },
            ].map((img) => (
              <div key={img.src} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Promise */}
          <div className="text-center max-w-3xl mx-auto pb-16">
            <SectionHeader
              title="The reason people return"
              eyebrow="What it actually feels like"
              description="The food on the lawn at breakfast — grown a few steps away at Royalton Farms. The night-jar at the plunge pool. A planner who remembers your aunt’s name. Long days, softer evenings, and the small hospitality that hides the work behind it."
            />
          </div>
        </Container>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
