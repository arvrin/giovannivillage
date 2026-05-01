'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import { experiences } from '@/lib/data';

const Experiences = () => {
  return (
    <Section
      id="experiences"
      className="bg-[var(--color-background-primary)] py-20 md:py-28 lg:py-32"
    >
      <Container>
        <SectionHeader
          eyebrow="Experiences"
          title="Curated Experiences"
          description="Immerse yourself in nature, wellness and culinary excellence."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              className="group"
            >
              <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/80 via-[var(--color-charcoal)]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-end p-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <ul className="space-y-2">
                    {experience.activities.map((activity) => (
                      <li key={activity} className="flex items-center gap-3 text-sm text-white">
                        <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-champagne)]" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h3
                  className="mb-3 font-heading text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]"
                  style={{ lineHeight: 1.2 }}
                >
                  {experience.title}
                </h3>
                <p className="text-base md:text-lg text-[var(--color-text-secondary)]" style={{ lineHeight: 1.7 }}>
                  {experience.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          className="mt-12 text-center"
        >
          <Link
            href="/experiences"
            className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-[var(--color-bronze)] hover:text-[var(--color-gold)] transition-colors"
            style={{ letterSpacing: '0.1em' }}
          >
            All experiences
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
};

export default Experiences;
