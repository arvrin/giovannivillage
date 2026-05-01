'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { experiences } from '@/lib/data';

/**
 * Cinematic Experiences — alternating full-bleed panels with text overlays.
 * Each experience reads like a chapter: large numbered marker, italic Cormorant
 * title, brief evocative description, gold rule.
 */
const CinematicExperiences = () => {
  return (
    <Section id="experiences" className="bg-black py-24 md:py-32">
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
            <span className="text-[10px] font-medium uppercase text-[var(--color-accent)]" style={{ letterSpacing: '0.4em' }}>
              The Itinerary
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
            Curated <span className="italic font-extralight">experiences</span>
          </h2>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {experiences.map((exp, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${reverse ? 'lg:[&>div:first-child]:order-2' : ''}`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden border border-[var(--color-accent)]/20 group">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    style={{ filter: 'brightness(0.85) saturate(0.95)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-3">
                    <span className="h-px w-6 bg-[var(--color-accent)]" />
                    <span className="text-[10px] font-medium uppercase text-[var(--color-accent)]" style={{ letterSpacing: '0.4em' }}>
                      Chapter {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <p
                    className="text-[10px] font-medium uppercase text-[var(--color-accent)]/80 mb-5"
                    style={{ letterSpacing: '0.4em' }}
                  >
                    · {exp.id.replace(/-/g, ' ')} ·
                  </p>
                  <h3
                    className="text-white mb-6"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 300,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                      lineHeight: 1.15,
                    }}
                  >
                    {exp.title.split(/[:&]/)[0]}{' '}
                    <span className="italic font-extralight">
                      {exp.title.split(/[:&]/).slice(1).join(' ').trim() || ''}
                    </span>
                  </h3>
                  <p className="text-base md:text-lg text-white/75 mb-6" style={{ lineHeight: 1.8, fontWeight: 300 }}>
                    {exp.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {exp.activities.slice(0, 4).map((a) => (
                      <li key={a} className="flex items-center gap-3 text-sm text-white/65">
                        <span className="h-px w-4 bg-[var(--color-accent)]/60" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/experiences"
                    className="inline-flex items-center gap-2 text-[10px] font-medium uppercase text-[var(--color-accent)] hover:text-white transition-colors"
                    style={{ letterSpacing: '0.4em' }}
                  >
                    Read More
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

export default CinematicExperiences;
