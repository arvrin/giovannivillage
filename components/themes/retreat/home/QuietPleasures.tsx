'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const ITEMS = [
  {
    n: '01',
    lead: 'A plunge pool open',
    accent: 'to the sky',
    tail: '',
    body: 'Sink in after a long day. Look up. The night-jar will call back through the leaves.',
    img: '/images/rooms/_galleries/junior-plunge-pool/02.jpeg',
  },
  {
    n: '02',
    lead: 'Pheras by the',
    accent: 'lake',
    tail: 'at sunset',
    body: 'Marigold runners, a tamarind tree for an aisle, vows set against the slow gold of evening.',
    img: '/images/weddings/gourmet-lawn.webp',
  },
  {
    n: '03',
    lead: 'Breakfast on the',
    accent: 'lawn',
    tail: '',
    body: 'Slow eggs, hand-pulled coffee, the smell of warm cardamom drifting from the kitchen.',
    img: '/images/rooms/_galleries/royal-suite/04.jpeg',
  },
  {
    n: '04',
    lead: 'A massage that',
    accent: 'takes',
    tail: 'its time',
    body: 'Forest oils, warm stone, the unhurried hands at Elysium. You will sleep like a child.',
    img: '/n1.jpg',
  },
];

const QuietPleasures = () => {
  return (
    <section className="bg-[color:var(--color-bg-alt)] py-24 md:py-36">
      <div className="mx-auto max-w-[1280px] px-5 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <div className="mb-4 flex items-baseline gap-4">
            <span className="h-px w-12 bg-[color:var(--color-border-strong)]" />
            <span
              className="text-[11px] tracking-[0.36em] uppercase text-[color:var(--color-text-tertiary)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              Quiet pleasures
            </span>
          </div>
          <h2 className="display-italic text-3xl leading-[1.15] md:text-5xl md:leading-[1.1]">
            Small reasons people <span className="font-script">keep</span> coming back.
          </h2>
        </motion.div>

        <ul className="space-y-20 md:space-y-28">
          {ITEMS.map((item, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.li
                key={item.n}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.05 }}
                className={`grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16 ${
                  reverse ? 'md:[direction:rtl]' : ''
                }`}
              >
                <div
                  className={`relative aspect-[5/6] overflow-hidden rounded-md md:col-span-6 ${
                    reverse ? '[direction:ltr]' : ''
                  }`}
                >
                  <Image
                    src={item.img}
                    alt={`${item.lead} ${item.accent} ${item.tail}`}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className={`md:col-span-6 ${reverse ? '[direction:ltr]' : ''}`}>
                  <p
                    className="font-script text-7xl leading-none md:text-[8rem]"
                    style={{ opacity: 0.9 }}
                  >
                    {item.n}
                  </p>
                  <h3
                    className="mt-4 display-italic text-[2rem] leading-[1.1] md:text-[2.75rem]"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {item.lead}{' '}
                    <span className="font-script">{item.accent}</span>
                    {item.tail ? ` ${item.tail}` : ''}
                  </h3>
                  <p
                    className="mt-5 max-w-md text-base leading-[1.85] text-[color:var(--color-text-secondary)] md:text-lg"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {item.body}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default QuietPleasures;
