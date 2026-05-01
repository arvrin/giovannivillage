'use client';

import { motion } from 'framer-motion';
import { Users, MapPin, Calendar, Star } from 'lucide-react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Button from '../ui/Button';
import Eyebrow from '../ui/Eyebrow';
import { weddings } from '@/lib/data';

const highlights = [
  { icon: Users, label: 'Up to 5,000 Guests', value: 'Capacity' },
  { icon: MapPin, label: 'Five Venues', value: 'Indoor & Outdoor' },
  { icon: Calendar, label: 'Year-Round', value: 'All Seasons' },
  { icon: Star, label: 'Dedicated Planner', value: 'Full Service' },
];

const Weddings = () => {
  return (
    <Section id="weddings" className="relative overflow-hidden">
      {/* Full-bleed hero */}
      <div className="relative h-[70vh] md:h-[80vh] lg:h-[85vh]">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: 'url(/w1.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-charcoal)]/40 via-[var(--color-charcoal)]/50 to-[var(--color-charcoal)]/70" />

        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
            >
              <Eyebrow color="white" className="mb-6">
                Weddings & Celebrations
              </Eyebrow>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
              className="mb-8 font-heading text-4xl md:text-5xl lg:text-7xl font-semibold text-white"
              style={{ letterSpacing: '-0.025em', lineHeight: 1.05, textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
            >
              {weddings.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
              className="mb-10 text-lg md:text-xl lg:text-2xl text-white/90"
              style={{ lineHeight: 1.7, textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}
            >
              {weddings.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <Button size="lg" variant="cta" href="/weddings">
                Plan Your Wedding
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-[var(--color-background-secondary)]">
        <Container>
          <div className="py-20 md:py-24 lg:py-28">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 md:gap-10">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                    className="text-center"
                  >
                    <div className="mb-6 flex justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-ivory)] text-[var(--color-bronze)]">
                        <Icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                    </div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[var(--color-text-tertiary)]" style={{ letterSpacing: '0.15em' }}>
                      {item.value}
                    </p>
                    <p className="font-heading text-lg font-semibold text-[var(--color-text-primary)]">
                      {item.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              className="mx-auto max-w-3xl mt-16"
            >
              <h3 className="mb-8 text-center font-heading text-2xl md:text-3xl font-semibold">What We Offer</h3>
              <div className="grid gap-3 md:grid-cols-2 md:gap-4">
                {weddings.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-bronze)]" />
                    <span className="text-base text-[var(--color-text-secondary)]" style={{ lineHeight: 1.7 }}>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="mt-12 text-center">
              <p className="mb-6 text-base text-[var(--color-text-secondary)]">
                Ready to plan your dream celebration?
              </p>
              <Button variant="cta-outline" size="lg" href="/contact">
                Request a Proposal
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
};

export default Weddings;
