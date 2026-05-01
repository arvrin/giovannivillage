'use client';

import { motion } from 'framer-motion';
import { Hotel, Leaf, Utensils, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Eyebrow from '../ui/Eyebrow';
import { about } from '@/lib/data';

const icons = {
  hotel: Hotel,
  leaf: Leaf,
  utensils: Utensils,
  spa: Sparkles,
};

const About = () => {
  return (
    <Section id="about" className="bg-[var(--color-background-primary)] py-20 md:py-28 lg:py-32">
      <Container maxWidth="wide">
        {/* Image left, content right */}
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="relative h-[500px] overflow-hidden lg:col-span-3 lg:h-[680px]"
          >
            <Image
              src="/images/hero/landscape-2.jpg"
              alt="Giovanni Village resort"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </motion.div>

          <div className="flex flex-col justify-center lg:col-span-2 lg:pl-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <Eyebrow color="muted" className="mb-6">
                {about.subtitle}
              </Eyebrow>
              <h2
                className="mb-8 font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)]"
                style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}
              >
                {about.title}
              </h2>
            </motion.div>

            <div className="space-y-5">
              {about.content.slice(0, 3).map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
                  className="text-base md:text-lg text-[var(--color-text-secondary)]"
                  style={{ lineHeight: 1.7 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          className="mx-auto mt-24 md:mt-32 grid max-w-6xl gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12"
        >
          {about.highlights.map((highlight, index) => {
            const Icon = icons[highlight.icon as keyof typeof icons];
            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
                className="text-center"
              >
                <div className="mb-6 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-champagne)] text-[var(--color-bronze)] transition-transform duration-500 hover:scale-110">
                    <Icon className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="mb-3 font-heading text-xl font-bold text-[var(--color-text-primary)]" style={{ lineHeight: 1.3 }}>
                  {highlight.title}
                </h3>
                <p className="text-base text-[var(--color-text-secondary)]" style={{ lineHeight: 1.7 }}>
                  {highlight.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
};

export default About;
