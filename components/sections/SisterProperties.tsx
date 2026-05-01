'use client';

import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import ImageCard from '../ui/ImageCard';
import { sisterProperties } from '@/lib/data';

const SisterProperties = () => {
  return (
    <Section
      id="stays-by-giovanni"
      className="bg-[var(--color-background-primary)] py-20 md:py-28 lg:py-32"
    >
      <Container>
        <SectionHeader
          eyebrow="Stays by Giovanni"
          title="Two more boutique stays in the city"
          description="Visiting Bhopal city instead? Stay at one of our boutique homes in Arera Colony — same Giovanni hospitality, urban convenience."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-10">
          {sisterProperties.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <ImageCard
                image={p.image}
                alt={p.name}
                aspect="video"
                eyebrow={p.tagline}
                title={p.name}
                meta={
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[var(--color-bronze)]" />
                    {p.location}
                  </span>
                }
                description={p.description}
                href={p.bookingUrl}
                external
                footer={
                  <span className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-[var(--color-bronze)]" style={{ letterSpacing: '0.1em' }}>
                    Book {p.name}
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </span>
                }
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default SisterProperties;
