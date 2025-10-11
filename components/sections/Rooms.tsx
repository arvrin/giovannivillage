'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { rooms } from '@/lib/data';

/**
 * Rooms Section - REDESIGNED LUXURY EDITION
 * Full-width image showcase with elegant overlays
 * Horizontal scroll cards with premium imagery
 */
const Rooms = () => {
  return (
    <Section id="rooms" className="bg-[var(--color-background-secondary)] py-20 md:py-28 lg:py-32">
      <Container maxWidth="wide">
        {/* Section Header - Compact */}
        <div className="mb-16 md:mb-20">
          <div className="flex justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)]"
              style={{ letterSpacing: '0.15em' }}
            >
              Accommodations
            </motion.p>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="text-center font-heading text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl lg:text-6xl xl:text-7xl"
            style={{ letterSpacing: '-0.025em', lineHeight: '1.1' }}
          >
            Luxury Rooms & Suites
          </motion.h2>
        </div>

        {/* Rooms Grid - 3 Equal Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.15,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="group relative overflow-hidden"
            >
              {/* Image Container - Compact */}
              <div className="relative mb-5 h-[400px] overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                  className="h-full w-full"
                >
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${room.image})`,
                      filter: 'grayscale(5%) brightness(0.95)',
                    }}
                  />
                </motion.div>

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Room Title Overlay - Top */}
                <div className="absolute top-0 left-0 right-0 p-5">
                  <h3 className="font-heading text-2xl font-bold text-white md:text-3xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                    {room.name}
                  </h3>
                </div>
              </div>

              {/* Content Below Image - Compact */}
              <div className="space-y-4">
                {/* Description */}
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] md:text-base" style={{ lineHeight: 1.6 }}>
                  {room.description}
                </p>

                {/* Capacity & Area */}
                <div className="flex gap-3 text-xs text-[var(--color-text-tertiary)] md:text-sm">
                  {'capacity' in room && <span>{room.capacity}</span>}
                  {'area' in room && <span>• {room.area}</span>}
                </div>

                {/* Features Pills - Compact */}
                <div className="flex flex-wrap gap-2">
                  {room.features.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-[var(--color-bronze)]/20 bg-[var(--color-champagne)]/30 px-3 py-1 text-xs text-[var(--color-text-secondary)]"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Bottom Row - View Details + Price */}
                <div className="flex items-center justify-between gap-4 border-t border-[var(--color-champagne)]/50 pt-5">
                  {/* View Details Button */}
                  <button className="group/btn inline-flex items-center text-sm font-semibold uppercase tracking-wider text-[var(--color-bronze)] transition-all duration-300 hover:text-[var(--color-gold)]">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>

                  {/* Price Badge - Minimal */}
                  <div className="inline-flex items-center rounded-full border border-[var(--color-bronze)] bg-transparent px-3 py-1 transition-all duration-300 hover:bg-[var(--color-bronze)] group-hover:border-[var(--color-gold)]">
                    <p className="whitespace-nowrap text-sm font-medium text-[var(--color-bronze)] transition-colors duration-300 group-hover:text-white">
                      ₹{room.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="mt-16 text-center"
        >
          <Button
            variant="primary"
            size="lg"
            className="shadow-lg transition-transform duration-600 hover:scale-105"
            style={{
              backgroundColor: 'var(--color-gold)',
              color: 'var(--color-charcoal)',
              fontWeight: 500,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              fontSize: '0.875rem',
            }}
          >
            Book Your Stay
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
};

export default Rooms;
