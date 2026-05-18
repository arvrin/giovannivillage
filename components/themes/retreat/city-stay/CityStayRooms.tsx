'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Users } from 'lucide-react';
import type { CityStay } from '@/lib/city-stays';

const CityStayRooms = ({ stay }: { stay: CityStay }) => {
  return (
    <section className="bg-[color:var(--color-bg-alt)] py-20 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-baseline justify-between gap-6 flex-wrap"
        >
          <div className="flex items-baseline gap-4">
            <span className="h-px w-12 bg-[color:var(--color-border-strong)]" />
            <span
              className="text-[11px] tracking-[0.36em] uppercase text-[color:var(--color-text-tertiary)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              The rooms
            </span>
          </div>
          <h2 className="display-italic max-w-2xl text-3xl leading-[1.05] md:text-5xl md:leading-[1.05]">
            {stay.rooms.length === 4
              ? <>Four rooms, <span className="font-script">four</span> personalities.</>
              : <>{stay.rooms.length === 3 ? 'Three' : stay.rooms.length} rooms, <span className="font-script">all</span> with a view.</>}
          </h2>
        </motion.div>

        <div className={`grid gap-6 md:gap-8 ${stay.rooms.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
          {stay.rooms.map((r, i) => (
            <motion.article
              key={r.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-lg bg-[color:var(--color-bg)] ring-1 ring-[color:var(--color-border)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-[1400ms] group-hover:scale-[1.04]"
                />
                <span
                  className="absolute right-4 top-4 rounded-full bg-[color:var(--color-forest)] px-3 py-1 text-[10px] tracking-[0.3em] uppercase text-white"
                  style={{ fontFamily: 'var(--font-eyebrow)' }}
                >
                  From ₹{r.rate.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="display-italic text-2xl leading-tight">
                  <span className="font-script">{r.name.split(' ')[0]}</span>
                  {r.name.split(' ').length > 1 ? ` ${r.name.split(' ').slice(1).join(' ')}` : ''}
                </h3>
                {r.meaning && (
                  <p
                    className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--color-text-tertiary)]"
                    style={{ fontFamily: 'var(--font-eyebrow)' }}
                  >
                    {r.meaning}
                  </p>
                )}
                <p
                  className="text-[14px] leading-[1.7] text-[color:var(--color-text-secondary)]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {r.description}
                </p>
                <div
                  className="mt-2 flex items-center gap-2 text-[12px] text-[color:var(--color-text-secondary)]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <Users className="h-3.5 w-3.5 text-[color:var(--color-brass)]" />
                  {r.capacity}
                </div>
                <Link
                  href={stay.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto flex items-center justify-between border-t border-[color:var(--color-border)] pt-4 text-[10px] tracking-[0.3em] uppercase text-[color:var(--color-text)] transition group-hover:text-[color:var(--color-brass)]"
                  style={{ fontFamily: 'var(--font-eyebrow)' }}
                >
                  <span>Book this room</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <p
          className="mx-auto mt-10 max-w-3xl text-center text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-text-tertiary)]"
          style={{ fontFamily: 'var(--font-eyebrow)' }}
        >
          Rates exclude taxes. Room layouts and availability vary — confirm
          specifics with our concierge before booking.
        </p>
      </div>
    </section>
  );
};

export default CityStayRooms;
