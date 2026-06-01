'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { HOME_PAGE_BRANDS } from '@/lib/brands';

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
            One family. <span className="font-script">Four</span> ways to stay,
            eat & live.
          </h2>
          <p
            className="mt-5 max-w-xl text-[15px] leading-[1.85] text-[color:var(--color-text-secondary)] md:text-base"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Beyond the village — a working organic farm at our doorstep, two
            boutique homestays in central Bhopal, and a furniture studio
            shaping every room you sleep in. Built by the same hands, held to
            the same standard.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {HOME_PAGE_BRANDS.map((b, i) => {
            const CardInner = (
              <>
                <div
                  className={`relative aspect-[4/3] overflow-hidden ${
                    b.isLogo ? 'bg-[color:var(--color-forest)]' : ''
                  }`}
                >
                  {b.isLogo ? (
                    <div className="flex h-full w-full items-center justify-center p-10">
                      <Image
                        src={b.image}
                        alt={b.name}
                        width={220}
                        height={220}
                        className="h-28 w-auto object-contain transition duration-[1000ms] group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <Image
                      src={b.image}
                      alt={b.name}
                      fill
                      sizes="(max-width:768px) 100vw, 25vw"
                      className="object-cover transition duration-[1400ms] group-hover:scale-[1.04]"
                    />
                  )}
                  <span
                    className="absolute left-4 top-4 rounded-full bg-[color:var(--color-forest)] px-3 py-1 text-[9px] tracking-[0.3em] uppercase text-white"
                    style={{ fontFamily: 'var(--font-eyebrow)' }}
                  >
                    {b.tagline}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div>
                    <h3 className="display-italic text-xl leading-tight md:text-2xl">
                      <span className="font-script">{b.name.split(' ')[0]}</span>{' '}
                      {b.name.split(' ').slice(1).join(' ')}
                    </h3>
                    {b.location && (
                      <p
                        className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-text-tertiary)]"
                        style={{ fontFamily: 'var(--font-eyebrow)' }}
                      >
                        <MapPin className="h-3 w-3" />
                        {b.location}
                      </p>
                    )}
                  </div>
                  <p
                    className="text-[13.5px] leading-[1.65] text-[color:var(--color-text-secondary)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {b.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-[color:var(--color-border)] pt-3">
                    <span
                      className="text-[10px] tracking-[0.28em] uppercase text-[color:var(--color-text)]"
                      style={{ fontFamily: 'var(--font-eyebrow)' }}
                    >
                      {b.href ? `Explore ${b.name.split(' ')[1]}` : 'Studio · soon'}
                    </span>
                    {b.href && (
                      <ArrowUpRight className="h-4 w-4 text-[color:var(--color-text)] transition group-hover:text-[color:var(--color-brass)]" />
                    )}
                  </div>
                </div>
              </>
            );

            return (
              <motion.article
                key={b.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="group relative flex flex-col overflow-hidden rounded-lg bg-[color:var(--color-bg)] shadow-[var(--shadow-sm)] ring-1 ring-[color:var(--color-border)]"
              >
                {b.href ? (
                  <Link
                    href={b.href}
                    target={b.external ? '_blank' : undefined}
                    rel={b.external ? 'noreferrer' : undefined}
                    className="flex flex-1 flex-col"
                  >
                    {CardInner}
                  </Link>
                ) : (
                  <div className="flex flex-1 flex-col">{CardInner}</div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GiovanniFamily;
