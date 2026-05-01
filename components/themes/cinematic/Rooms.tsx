'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { rooms, siteConfig } from '@/lib/data';

/**
 * Cinematic Rooms — three large dark cards with full-bleed imagery, gold rule
 * accents, and theatrical hover. Background goes deep black so cards float.
 */
const CinematicRooms = () => {
  const featured = rooms.slice(0, 3);

  return (
    <Section id="rooms" className="relative bg-black py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Subtle gold gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,169,97,0.06)_0%,_rgba(0,0,0,0)_55%)]" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[var(--color-accent)]" />
            <span
              className="text-[10px] font-medium uppercase text-[var(--color-accent)]"
              style={{ letterSpacing: '0.4em' }}
            >
              Accommodations
            </span>
            <span className="h-px w-10 bg-[var(--color-accent)]" />
          </div>
          <h2
            className="text-white"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 300,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              lineHeight: 1.05,
            }}
          >
            Bespoke <span className="italic font-extralight">Suites</span>
          </h2>
          <p
            className="mt-6 mx-auto max-w-2xl text-white/70 text-base md:text-lg"
            style={{ lineHeight: 1.7, fontWeight: 300 }}
          >
            Eight uniquely composed rooms and suites — from open-to-sky plunge
            pools to lakeside Royal Suites. Each one a stage of its own.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-7">
          {featured.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <Link
                href={`/rooms/${room.id}`}
                className="group relative block aspect-[3/4] overflow-hidden border border-[var(--color-accent)]/20 hover:border-[var(--color-accent)]/60 transition-colors duration-500"
              >
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ filter: 'brightness(0.85) saturate(0.95)' }}
                />
                {/* Soft dark gradient — keeps title legible without going pitch */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
                {/* Hover gold sheen */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black via-[rgba(201,169,97,0.05)] to-transparent" />

                {/* Top-left index */}
                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <span className="h-px w-6 bg-[var(--color-accent)]" />
                  <span
                    className="text-[10px] font-medium uppercase text-[var(--color-accent)]"
                    style={{ letterSpacing: '0.4em' }}
                  >
                    Suite {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                  <h3
                    className="text-white mb-3"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 300,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      fontSize: '1.5rem',
                      lineHeight: 1.15,
                      textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                    }}
                  >
                    {room.name}
                  </h3>
                  <div className="flex items-center justify-between text-[10px] font-medium uppercase text-white/70" style={{ letterSpacing: '0.25em' }}>
                    <span>{room.area}</span>
                    <span className="text-[var(--color-accent)]">
                      ₹{room.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-5 flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-medium uppercase text-[var(--color-accent)]" style={{ letterSpacing: '0.3em' }}>
                      Reserve
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[var(--color-accent)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
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
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <Button size="lg" variant="cta" href="/rooms">
            View All Suites
          </Button>
          <a
            href={siteConfig.booking.resort}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-medium uppercase text-white/50 hover:text-[var(--color-accent)] transition-colors"
            style={{ letterSpacing: '0.4em' }}
          >
            · Direct Reservations · Best Rate Guaranteed ·
          </a>
        </motion.div>
      </Container>
    </Section>
  );
};

export default CinematicRooms;
