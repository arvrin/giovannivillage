'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Eyebrow from '../ui/Eyebrow';
import { testimonials } from '@/lib/data';

/**
 * Testimonials Section - LUXURY EDITION
 * Full-width quote carousel with elegant transitions
 * Large italic text, minimal design
 */
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <Section className="bg-[var(--color-bg)] py-16 md:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="mb-16 text-center"
          >
            <Eyebrow color="muted">Guest Stories</Eyebrow>
          </motion.div>

          {/* Testimonial Carousel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                className="text-center"
              >
                {/* Quote Icon */}
                <div className="mb-8 flex justify-center">
                  <Quote
                    className="h-9 w-9 md:h-11 md:w-11 text-[var(--color-accent)]"
                    strokeWidth={1.25}
                  />
                </div>

                {/* Quote Text */}
                <blockquote
                  className="mb-10 mx-auto max-w-3xl text-lg md:text-xl lg:text-2xl italic text-[var(--color-text-primary)]"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 400,
                    lineHeight: 1.55,
                    letterSpacing: '-0.005em',
                  }}
                >
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </blockquote>

                {/* Guest Info */}
                <div className="space-y-2">
                  <p className="font-heading text-base md:text-lg font-semibold text-[var(--color-text-primary)]">
                    {currentTestimonial.name}
                  </p>
                  <p
                    className="text-[10px] sm:text-xs font-semibold uppercase text-[var(--color-text-tertiary)]"
                    style={{ letterSpacing: '0.2em' }}
                  >
                    {currentTestimonial.location}
                  </p>

                  {/* Rating Stars */}
                  <div className="flex justify-center gap-1 pt-2">
                    {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="h-3.5 w-3.5 text-[var(--color-accent)]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                onClick={handlePrevious}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-bronze)] text-[var(--color-bronze)] transition-all duration-600 hover:bg-[var(--color-bronze)] hover:text-white"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Progress Indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all duration-600 ${
                      index === currentIndex
                        ? 'w-8 bg-[var(--color-bronze)]'
                        : 'bg-[var(--color-champagne)] hover:bg-[var(--color-bronze)]/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-bronze)] text-[var(--color-bronze)] transition-all duration-600 hover:bg-[var(--color-bronze)] hover:text-white"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="mx-auto mt-16 h-px w-24 bg-[var(--color-champagne)]"
          />
        </div>
      </Container>
    </Section>
  );
};

export default Testimonials;
