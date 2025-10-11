'use client';

import { motion } from 'framer-motion';
import { Users, MapPin, Calendar, Star } from 'lucide-react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { weddings } from '@/lib/data';

/**
 * Weddings Section - LUXURY EDITION
 * Emotional storytelling with full-screen imagery
 * Romantic grandeur with elegant details
 */
const Weddings = () => {
  const highlights = [
    { icon: Users, label: 'Up to 500 Guests', value: 'Capacity' },
    { icon: MapPin, label: 'Multiple Venues', value: 'Indoor & Outdoor' },
    { icon: Calendar, label: 'Year-Round', value: 'All Seasons' },
    { icon: Star, label: 'Dedicated Planner', value: 'Full Service' },
  ];

  return (
    <Section id="weddings" className="relative overflow-hidden">
      {/* Full-Bleed Hero Image */}
      <div className="relative h-[70vh] md:h-[80vh] lg:h-screen">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          
          transition={{
            duration: 1.4,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="h-full w-full"
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: 'url(/w1.jpg)',
              filter: 'grayscale(10%)',
            }}
          />
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-charcoal)]/40 via-[var(--color-charcoal)]/50 to-[var(--color-charcoal)]/70" />

        {/* Centered Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div className="max-w-4xl">
            <div className="flex justify-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="mb-6 text-sm font-medium uppercase tracking-widest text-white/80"
                style={{ letterSpacing: '0.15em' }}
              >
                Weddings & Celebrations
              </motion.p>
            </div>

            <motion.h2
              animate={{ opacity: 1, y: 0 }}
              
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="mb-8 font-heading text-4xl font-semibold text-white md:text-5xl lg:text-7xl"
              style={{
                letterSpacing: '-0.025em',
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.4)',
              }}
            >
              {weddings.title}
            </motion.h2>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              
              transition={{
                duration: 0.8,
                delay: 0.7,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="mb-10 text-lg text-white/90 md:text-xl lg:text-2xl"
              style={{
                lineHeight: 1.8,
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
              }}
            >
              {weddings.description}
            </motion.p>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              
              transition={{
                duration: 0.8,
                delay: 0.9,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              <Button
                size="lg"
                className="bg-[var(--color-gold)] text-[var(--color-charcoal)] hover:bg-white"
              >
                Plan Your Wedding
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section - Below Image */}
      <div className="bg-[var(--color-background-secondary)]">
        <Container>
          <div className="py-20 md:py-28 lg:py-36">
          {/* Highlights Grid */}
          <div className="mb-16 grid gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  animate={{ opacity: 1, y: 0 }}
                  
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="text-center"
                >
                  <div className="mb-6 flex justify-center">
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: 'var(--color-ivory)',
                        color: 'var(--color-bronze)',
                      }}
                    >
                      <Icon className="h-7 w-7" strokeWidth={1.5} />
                    </div>
                  </div>

                  <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[var(--color-text-tertiary)]">
                    {item.value}
                  </p>
                  <p className="font-heading text-xl font-semibold text-[var(--color-text-primary)]">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Features List */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="mx-auto max-w-3xl"
          >
            <h3 className="mb-8 text-center font-heading text-3xl font-semibold text-[var(--color-text-primary)] md:text-4xl">
              What We Offer
            </h3>

            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              {weddings.features.map((feature, index) => (
                <motion.div
                  key={index}
                  animate={{ opacity: 1, x: 0 }}
                  
                  transition={{
                    duration: 0.6,
                    delay: 0.7 + index * 0.08,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--color-bronze)]" />
                  <span className="text-base text-[var(--color-text-secondary)]">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            
            transition={{
              duration: 0.8,
              delay: 0.9,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="mt-16 text-center"
          >
            <p className="mb-6 text-lg text-[var(--color-text-secondary)]">
              Ready to plan your dream celebration?
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-[var(--color-bronze)] text-[var(--color-bronze)] hover:bg-[var(--color-bronze)] hover:text-white"
            >
              Request a Proposal
            </Button>
          </motion.div>
        </div>
      </Container>
      </div>
    </Section>
  );
};

export default Weddings;
