'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { rooms, siteConfig } from '@/lib/data';

/**
 * Modernist Rooms — asymmetric, geometric, horizontally-scrolling cards
 * with numerical indices and razor lines. No rounded corners, no shadows.
 */
const ModernistRooms = () => {
  const featured = rooms.slice(0, 6);

  return (
    <Section id="rooms" className="bg-[var(--color-bg)] py-20 md:py-24 lg:py-28">
      <Container maxWidth="wide">
        {/* Asymmetric header */}
        <div className="mb-12 grid lg:grid-cols-12 lg:gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="mb-6 flex items-center gap-4">
              <span
                className="text-[10px] font-semibold uppercase text-[var(--color-text-tertiary)]"
                style={{ letterSpacing: '0.3em' }}
              >
                02 / Accommodations
              </span>
              <span className="h-px flex-1 bg-[var(--color-border-strong)]" />
            </div>
            <h2
              className="text-[var(--color-text)]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: 1,
              }}
            >
              Rooms <span className="italic font-light">&amp;</span> Suites
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <p
              className="text-base md:text-lg text-[var(--color-text-secondary)]"
              style={{ lineHeight: 1.6 }}
            >
              Eight bespoke configurations — from King Rooms with private
              gardens to Royal Suites with open-to-sky plunge pools. Each set
              against the dense Ratapani forest line.
            </p>
          </motion.div>
        </div>

        {/* Horizontal scroll on desktop, stacked on mobile */}
        <div
          className="-mx-6 sm:-mx-8 lg:-mx-12 px-6 sm:px-8 lg:px-12 grid gap-px bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3 border-y border-[var(--color-border)]"
        >
          {featured.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.215, 0.61, 0.355, 1] }}
              className="bg-[var(--color-bg)]"
            >
              <Link href={`/rooms/${room.id}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-xs font-semibold text-white"
                      style={{ letterSpacing: '0.2em' }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h3
                    className="text-[var(--color-text)]"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      fontSize: '1.1rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {room.name}
                  </h3>
                  <div
                    className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[10px] font-semibold uppercase text-[var(--color-text-tertiary)]"
                    style={{ letterSpacing: '0.22em' }}
                  >
                    <span>{room.capacity}</span>
                    <span>{room.area}</span>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
                    <span
                      className="text-sm font-semibold uppercase text-[var(--color-text)]"
                      style={{ letterSpacing: '0.1em' }}
                    >
                      ₹{room.price.toLocaleString()}
                      <span className="ml-1 text-[10px] text-[var(--color-text-tertiary)]" style={{ letterSpacing: '0.2em' }}>
                        / night
                      </span>
                    </span>
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors"
                      style={{ letterSpacing: '0.22em' }}
                    >
                      View
                      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <p
            className="text-[10px] font-semibold uppercase text-[var(--color-text-tertiary)]"
            style={{ letterSpacing: '0.3em' }}
          >
            08 unique configurations · 5,000 sqft+ private lawns
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="md" variant="cta-outline" href="/rooms">
              All Rooms
            </Button>
            <Button size="md" variant="cta" href={siteConfig.booking.resort}>
              Reserve
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default ModernistRooms;
