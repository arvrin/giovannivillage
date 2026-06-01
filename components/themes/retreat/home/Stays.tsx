'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { rooms } from '@/lib/data';

const COLLECTIONS = [
  { id: 'all', label: 'All Stays' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'suites', label: 'Suites' },
  { id: 'pool', label: 'Pool Villas' },
];

const collectionFor = (id: string) => {
  if (id === 'rooms') return rooms.filter((r) => r.name.includes('King'));
  if (id === 'suites')
    return rooms.filter((r) => r.name.includes('Suite') && !r.name.toLowerCase().includes('plunge'));
  if (id === 'pool') return rooms.filter((r) => r.name.toLowerCase().includes('plunge'));
  return rooms;
};

const Stays = () => {
  const [active, setActive] = useState('all');
  const list = collectionFor(active).slice(0, 6);

  return (
    <section className="relative bg-[color:var(--color-bg-alt)] py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-4 md:px-16">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-baseline gap-4">
              <span className="h-px w-12 bg-[color:var(--color-border-strong)]" />
              <span
                className="text-[11px] tracking-[0.36em] uppercase text-[color:var(--color-text-tertiary)]"
                style={{ fontFamily: 'var(--font-eyebrow)' }}
              >
                When you’re ready
              </span>
            </div>
            <h2 className="display-italic max-w-xl text-3xl leading-[1.05] md:text-5xl">
              Ten rooms.
              <br />
              <span className="font-script">Each</span> opens to the forest.
            </h2>
            <p
              className="mt-5 max-w-md text-[15px] leading-[1.85] text-[color:var(--color-text-secondary)]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Plunge pools, open-to-sky baths, private decks under old trees.
              All suites face green; some keep secrets of their own.
            </p>
          </div>

          <ul className="flex flex-wrap gap-2">
            {COLLECTIONS.map((c) => {
              const isActive = active === c.id;
              return (
                <li key={c.id}>
                  <button
                    onClick={() => setActive(c.id)}
                    className={`rounded-full border px-4 py-2 text-[11px] tracking-[0.22em] uppercase transition ${
                      isActive
                        ? 'border-[color:var(--color-forest)] bg-[color:var(--color-forest)] text-[color:var(--color-bg)]'
                        : 'border-[color:var(--color-border-strong)] text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-bg-card)]'
                    }`}
                    style={{ fontFamily: 'var(--font-eyebrow)' }}
                  >
                    {c.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {list.map((room, i) => (
              <motion.article
                key={room.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-lg bg-[color:var(--color-bg)] shadow-[var(--shadow-sm)] ring-1 ring-[color:var(--color-border)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition duration-[1200ms] group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-4 p-6">
                  <div>
                    <p
                      className="mb-2 text-[10px] tracking-[0.3em] uppercase text-[color:var(--color-text-tertiary)]"
                      style={{ fontFamily: 'var(--font-eyebrow)' }}
                    >
                      {room.area} · {room.capacity}
                    </p>
                    <h3
                      className="display-italic text-xl leading-snug"
                      style={{ fontWeight: 500 }}
                    >
                      {room.name}
                    </h3>
                  </div>

                  <div className="flex items-end justify-between border-t border-[color:var(--color-border)] pt-4">
                    <div>
                      <p
                        className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--color-text-tertiary)]"
                        style={{ fontFamily: 'var(--font-eyebrow)' }}
                      >
                        From
                      </p>
                      <p className="display-italic text-2xl" style={{ fontWeight: 500 }}>
                        ₹{room.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <Link
                      href={`/rooms#${room.id}`}
                      className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[color:var(--color-text)] transition hover:text-[color:var(--color-brass)]"
                      style={{ fontFamily: 'var(--font-eyebrow)' }}
                    >
                      Details <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="lg" href="/rooms">
            View all stays <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Stays;
