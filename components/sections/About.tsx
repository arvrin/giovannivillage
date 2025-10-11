'use client';

import { motion } from 'framer-motion';
import { Hotel, Leaf, Utensils, Sparkles } from 'lucide-react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import { about } from '@/lib/data';
import { animations } from '@/lib/design-tokens';

const icons = {
  hotel: Hotel,
  leaf: Leaf,
  utensils: Utensils,
  spa: Sparkles,
};

/**
 * About Section - LUXURY EDITION
 * Centered Editorial Layout with generous white space
 * Text-led storytelling with supporting imagery
 */
const About = () => {
  return (
    <Section id="about" className="bg-[var(--color-background-primary)] py-20 md:py-28 lg:py-32">
      <Container maxWidth="wide">
        {/* Two Column Layout - Image Left (60%), Content Right (40%) */}
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12 xl:gap-16">
          {/* Left Column - Image (3/5 = 60%) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="relative h-[600px] overflow-hidden lg:col-span-3 lg:h-[750px] xl:h-[850px]"
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: 'url(/f0.png)',
                filter: 'grayscale(5%) brightness(0.95)',
              }}
            />
          </motion.div>

          {/* Right Column - Content (2/5 = 40%) */}
          <div className="flex flex-col justify-center lg:col-span-2 lg:pl-8">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)]"
              style={{ letterSpacing: '0.15em', marginRight: '-0.15em' }}
            >
              {about.subtitle}
            </motion.p>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="mb-8 font-heading text-4xl font-bold leading-tight text-[var(--color-text-primary)] md:text-5xl lg:text-6xl xl:text-7xl"
              style={{ letterSpacing: '-0.025em', lineHeight: '1.1' }}
            >
              {about.title}
            </motion.h2>

            {/* Content Paragraphs */}
            <div className="space-y-5">
              {about.content.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + index * 0.1,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg lg:text-xl"
                  style={{ lineHeight: 1.7 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights - Elegant Grid (Below Content) with generous spacing */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}

          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="mx-auto mt-32 grid max-w-6xl gap-12 md:mt-40 md:grid-cols-2 lg:grid-cols-4 lg:gap-16"
        >
          {about.highlights.map((highlight, index) => {
            const Icon = icons[highlight.icon as keyof typeof icons];
            return (
              <motion.div
                key={highlight.title}
                animate={{ opacity: 1, y: 0 }}

                transition={{
                  duration: 0.6,
                  delay: 0.7 + index * 0.1,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="group text-center"
              >
                {/* Icon - larger, more presence */}
                <div className="mb-8 flex justify-center">
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-full transition-all duration-600 group-hover:scale-110"
                    style={{
                      backgroundColor: 'var(--color-champagne)',
                      color: 'var(--color-bronze)',
                    }}
                  >
                    <Icon className="h-9 w-9" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title - bolder, larger */}
                <h3
                  className="mb-4 font-heading text-2xl font-bold text-[var(--color-text-primary)]"
                  style={{ lineHeight: 1.3 }}
                >
                  {highlight.title}
                </h3>

                {/* Description - larger text */}
                <p
                  className="text-lg text-[var(--color-text-secondary)]"
                  style={{ lineHeight: 1.7 }}
                >
                  {highlight.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Optional: Divider for next section */}
        <motion.div
          animate={{ opacity: 1, scaleX: 1 }}

          transition={{
            duration: 1,
            delay: 1,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="mx-auto mt-32 h-px w-32 bg-[var(--color-champagne)] md:mt-40"
        />
      </Container>
    </Section>
  );
};

export default About;
