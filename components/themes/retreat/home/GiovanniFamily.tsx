'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';

interface BrandCard {
  name: string;
  tagline: string;
  description: string;
  location?: string;
  href: string;
  external?: boolean;
  image: string;
  isLogo?: boolean;
}

const BRANDS: BrandCard[] = [
  {
    name: 'Giovanni House',
    tagline: 'Boutique Home Stay',
    description:
      'An intimate boutique stay in the heart of Arera Colony — perfect for short city trips with the warmth of a Giovanni welcome.',
    location: 'E-4, Arera Colony, Bhopal',
    href: 'https://live.ipms247.com/booking/roomlisting-giovannistays-hotelgiovannihouse-en',
    external: true,
    image: '/images/sister-properties/giovanni-house.webp',
  },
  {
    name: 'Giovanni Suites',
    tagline: 'Boutique Home Stay',
    description:
      'Spacious suites for longer stays in central Bhopal — same Giovanni hospitality, urban convenience.',
    location: 'E-8, Arera Colony, Bhopal',
    href: 'https://live.ipms247.com/booking/roomlisting-giovannistays-hotelgiovannisuites-en',
    external: true,
    image: '/images/sister-properties/giovanni-suites.webp',
  },
];

const GiovanniFamily = () => {
  return (
    <section className="bg-[color:var(--color-bg-alt)] py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-2xl"
        >
          <div className="mb-4 flex items-baseline gap-4">
            <span className="h-px w-12 bg-[color:var(--color-border-strong)]" />
            <span
              className="text-[11px] tracking-[0.36em] uppercase text-[color:var(--color-text-tertiary)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              The Giovanni family
            </span>
          </div>
          <h2 className="display-italic text-3xl leading-[1.1] md:text-5xl md:leading-[1.05]">
            One name, <span className="font-script">two</span> stays in the city.
          </h2>
          <p
            className="mt-5 max-w-xl text-[15px] leading-[1.85] text-[color:var(--color-text-secondary)] md:text-base"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Beyond the village, Giovanni runs two boutique stays in central Bhopal —
            the same hand-crafted hospitality, closer to the airport and the city.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {BRANDS.map((b, i) => (
            <motion.article
              key={b.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-lg bg-[color:var(--color-bg)] shadow-[var(--shadow-sm)] ring-1 ring-[color:var(--color-border)]"
            >
              <Link
                href={b.href}
                target={b.external ? '_blank' : undefined}
                rel={b.external ? 'noreferrer' : undefined}
                className="block"
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden ${
                    b.isLogo ? 'bg-[color:var(--color-forest)]' : ''
                  }`}
                >
                  {b.isLogo ? (
                    <div className="flex h-full w-full items-center justify-center p-12">
                      <Image
                        src={b.image}
                        alt={b.name}
                        width={180}
                        height={180}
                        className="h-32 w-auto object-contain transition duration-[1000ms] group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <Image
                      src={b.image}
                      alt={b.name}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition duration-[1400ms] group-hover:scale-[1.04]"
                    />
                  )}
                  <span
                    className="absolute left-5 top-5 rounded-full bg-[color:var(--color-forest)] px-3.5 py-1.5 text-[10px] tracking-[0.32em] uppercase text-white"
                    style={{ fontFamily: 'var(--font-eyebrow)' }}
                  >
                    {b.tagline}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-7">
                  <div>
                    <h3 className="display-italic text-2xl leading-tight">
                      <span className="font-script">{b.name.split(' ')[0]}</span> {b.name.split(' ').slice(1).join(' ')}
                    </h3>
                    {b.location && (
                      <p
                        className="mt-2 inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-text-tertiary)]"
                        style={{ fontFamily: 'var(--font-eyebrow)' }}
                      >
                        <MapPin className="h-3 w-3" />
                        {b.location}
                      </p>
                    )}
                  </div>
                  <p
                    className="text-[14px] leading-[1.7] text-[color:var(--color-text-secondary)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {b.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-[color:var(--color-border)] pt-4">
                    <span
                      className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--color-text)]"
                      style={{ fontFamily: 'var(--font-eyebrow)' }}
                    >
                      {b.external ? `Visit ${b.name.split(' ')[1]}` : 'Enquire'}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[color:var(--color-text)] transition group-hover:text-[color:var(--color-brass)]" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiovanniFamily;
