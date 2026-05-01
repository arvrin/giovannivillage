'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Users, Maximize } from 'lucide-react';
import Link from 'next/link';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Button from '../ui/Button';
import SectionHeader from '../ui/SectionHeader';
import ImageCard from '../ui/ImageCard';
import { rooms, siteConfig } from '@/lib/data';

const Rooms = () => {
  const featured = rooms.slice(0, 3);

  return (
    <Section id="rooms" className="bg-[var(--color-background-primary)] py-20 md:py-28 lg:py-32">
      <Container maxWidth="wide">
        <SectionHeader title="Luxury Rooms & Suites" eyebrow="Accommodations" />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 items-stretch">
          {featured.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <ImageCard
                image={room.image}
                alt={room.name}
                aspect="4/3"
                title={room.name}
                meta={
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-[var(--color-bronze)]" />
                      {room.capacity}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Maximize className="h-4 w-4 text-[var(--color-bronze)]" />
                      {room.area}
                    </span>
                  </div>
                }
                description={room.description}
                tags={room.features.slice(0, 3)}
                footer={
                  <div className="flex items-center justify-between gap-4 border-t border-[var(--color-bronze)]/15 pt-5">
                    <Link
                      href={`/rooms/${room.id}`}
                      className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-[var(--color-bronze)] transition-colors hover:text-[var(--color-gold)]"
                      style={{ letterSpacing: '0.1em' }}
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <div className="rounded-full border border-[var(--color-bronze)] px-3 py-1">
                      <p className="whitespace-nowrap text-sm font-medium text-[var(--color-bronze)]">
                        ₹{room.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          className="mt-16 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="cta" size="lg" href="/rooms">
            View All Rooms
          </Button>
          <Button variant="cta-outline" size="lg" href={siteConfig.booking.resort}>
            Book Your Stay
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
};

export default Rooms;
