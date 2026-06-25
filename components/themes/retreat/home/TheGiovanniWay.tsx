'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, Leaf, Sparkles, Utensils, Trees } from 'lucide-react';
import Button from '@/components/ui/Button';
import { siteConfig } from '@/lib/data';
import { getWhatsAppLink } from '@/lib/utils';
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp-messages';

const FEATURES = [
  { icon: Heart, label: 'Personalised Hospitality', body: 'Butler-led service that learns your day before you do.' },
  { icon: Trees, label: 'Forest at the Doorstep', body: 'Ten acres folded into the edge of Ratapani Tiger Reserve.' },
  { icon: Sparkles, label: 'Affordable Luxury', body: 'Suites with private plunge pools — without the metropolitan markup.' },
  { icon: Utensils, label: 'Farm-to-fire Cuisine', body: 'Three dining venues, all sourcing from Royalton Farms inside the estate — produce in the morning, on the plate by lunch.' },
  { icon: Leaf, label: 'Wildlife at the Gate', body: 'Ratapani Tiger Reserve five minutes from the gate — naturalist-led safaris before breakfast.' },
];

const TheGiovanniWay = () => {
  return (
    <section className="bg-[color:var(--color-bg)] py-24 md:py-36">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-4 md:grid-cols-12 md:gap-16 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="md:col-span-5"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-md">
            <Image
              src="/images/weddings/cocktail-lawn.webp"
              alt="Forest morning"
              fill
              sizes="(max-width:768px) 100vw, 480px"
              className="object-cover"
            />
          </div>

          <div className="mt-10 rounded-lg bg-[color:var(--color-bg-card)] p-8">
            <p
              className="mb-3 text-[10px] tracking-[0.36em] uppercase text-[color:var(--color-text-tertiary)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              Key Features
            </p>
            <h2 className="font-heading text-3xl italic leading-[1.05]" style={{ fontWeight: 400 }}>
              Take the planning
              <br />
              out of your getaway.
            </h2>
            <div className="mt-6">
              <Button
                variant="primary"
                size="lg"
                href={getWhatsAppLink(siteConfig.contact.whatsapp, WHATSAPP_MESSAGES.homeGetInTouch)}
                external
              >
                Get in touch <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </motion.div>

        <ul className="relative md:col-span-7 md:pl-6">
          <span
            aria-hidden
            className="absolute left-0 top-2 hidden h-[calc(100%-1rem)] w-px bg-[color:var(--color-border-strong)] md:block"
          />
          {FEATURES.map((F, i) => (
            <motion.li
              key={F.label}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative mb-3 last:mb-0"
            >
              <span
                aria-hidden
                className="absolute -left-7 top-7 hidden h-2.5 w-2.5 rounded-full bg-[color:var(--color-forest)] ring-4 ring-[color:var(--color-bg)] md:block"
              />
              <div className="flex items-center gap-5 rounded-full bg-[color:var(--color-bg-card)] py-5 pl-5 pr-7 transition hover:bg-[color:var(--color-bg-alt)]">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-bg)] text-[color:var(--color-forest)]">
                  <F.icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p
                    className="font-heading text-xl italic leading-tight"
                    style={{ fontWeight: 500 }}
                  >
                    {F.label}
                  </p>
                  <p
                    className="mt-1 text-sm text-[color:var(--color-text-secondary)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {F.body}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TheGiovanniWay;
