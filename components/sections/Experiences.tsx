'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Section from '../ui/Section';
import Container from '../ui/Container';
import { experiences } from '@/lib/data';
import { animations } from '@/lib/design-tokens';

/**
 * Experiences Section - LUXURY EDITION
 * Editorial grid layout with hover reveals
 * Sophisticated 2x2 grid with generous spacing
 */
const Experiences = () => {
  return (
    <Section id="experiences" className="bg-[var(--color-background-primary)] pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-24">
      <Container>
        {/* Section Header - Centered, generous spacing */}
        <div className="mb-24 text-center md:mb-32 lg:mb-40">
          <div className="flex justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)]"
              style={{ letterSpacing: '0.15em' }}
            >
              Experiences
            </motion.p>
          </div>

          <motion.h2
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="mx-auto max-w-4xl text-center font-heading text-5xl font-bold text-[var(--color-text-primary)] md:text-6xl lg:text-7xl xl:text-8xl"
            style={{ letterSpacing: '-0.025em', lineHeight: '1.1' }}
          >
            Curated Experiences
          </motion.h2>

          <motion.p
            animate={{ opacity: 1, y: 0 }}

            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="mx-auto mt-8 max-w-2xl text-center text-xl text-[var(--color-text-secondary)] md:text-2xl"
            style={{ lineHeight: 1.8 }}
          >
            Immerse yourself in nature, wellness, and culinary excellence
          </motion.p>
        </div>

        {/* Experiences Grid - 2x2 with Generous Spacing */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4 + index * 0.15,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="group relative overflow-hidden"
            >
              {/* Image Container with Hover Effect */}
              <div className="relative mb-6 h-[400px] overflow-hidden md:h-[450px] lg:h-[500px]">
                <div className="h-full w-full overflow-hidden">
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{
                      filter: 'grayscale(10%)',
                    }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index < 2}
                  />
                </div>

                {/* Gradient Overlay - Appears on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/80 via-[var(--color-charcoal)]/40 to-transparent opacity-0 transition-opacity duration-600 group-hover:opacity-100" />

                {/* Hover Content - Activities List (Bronze accents, NO gold) */}
                <div className="absolute inset-0 flex items-end p-10 opacity-0 transition-opacity duration-600 group-hover:opacity-100">
                  <div className="space-y-4">
                    {experience.activities.map((activity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3"
                      >
                        <div className="h-2 w-2 rounded-full bg-[var(--color-champagne)]" />
                        <span className="text-base font-medium text-white">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content - Enhanced typography */}
              <div>
                <h3 className="mb-6 font-heading text-3xl font-bold text-[var(--color-text-primary)] md:text-4xl lg:text-5xl" style={{ lineHeight: 1.2 }}>
                  {experience.title}
                </h3>

                <p
                  className="mb-8 text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl"
                  style={{ lineHeight: 1.7 }}
                >
                  {experience.description}
                </p>

                {/* CTA - Bronze only, NO gold on hover */}
                <button className="group/link inline-flex items-center text-sm font-semibold uppercase tracking-wider text-[var(--color-bronze)] opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Divider - Removed for tighter spacing */}
      </Container>
    </Section>
  );
};

export default Experiences;
