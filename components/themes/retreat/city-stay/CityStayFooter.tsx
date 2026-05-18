'use client';

import Link from 'next/link';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/data';
import type { CityStay } from '@/lib/city-stays';

const CityStayFooter = ({ stay }: { stay: CityStay }) => {
  return (
    <footer className="bg-[color:var(--color-bg)] pt-20 pb-10 border-t border-[color:var(--color-border)]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 md:grid-cols-3 md:gap-16 md:px-16">
        <div>
          <p
            className="mb-4 text-[11px] tracking-[0.36em] uppercase text-[color:var(--color-text-tertiary)]"
            style={{ fontFamily: 'var(--font-eyebrow)' }}
          >
            {stay.name}
          </p>
          <h2 className="display-italic text-3xl leading-[1.1]">
            A quiet <span className="font-script">city</span> stay.
          </h2>
          <ul className="mt-8 space-y-3 text-sm text-[color:var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-brass)]" />
              <span>
                {stay.address.line1},<br />
                {stay.address.line2}
                {stay.address.pincode ? ` — ${stay.address.pincode}` : ''}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-[color:var(--color-brass)]" />
              <a href={`tel:${stay.phone.replace(/\s/g, '')}`}>{stay.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-[color:var(--color-brass)]" />
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <p
            className="mb-4 text-[11px] tracking-[0.36em] uppercase text-[color:var(--color-text-tertiary)]"
            style={{ fontFamily: 'var(--font-eyebrow)' }}
          >
            Other Giovanni stays
          </p>
          <ul className="space-y-2" style={{ fontFamily: 'var(--font-body)' }}>
            <li><Link className="text-sm hover:text-[color:var(--color-brass)]" href="/">Giovanni Village (Resort)</Link></li>
            <li><Link className="text-sm hover:text-[color:var(--color-brass)]" href={stay.slug === 'house' ? '/suites' : '/house'}>
              {stay.slug === 'house' ? 'Giovanni Suites' : 'Giovanni House'}
            </Link></li>
            <li><Link className="text-sm hover:text-[color:var(--color-brass)]" href="/weddings">Weddings at the Village</Link></li>
            <li><Link className="text-sm hover:text-[color:var(--color-brass)]" href="/experiences">Ratapani Safaris</Link></li>
          </ul>
        </div>

        <div>
          <p
            className="mb-4 text-[11px] tracking-[0.36em] uppercase text-[color:var(--color-text-tertiary)]"
            style={{ fontFamily: 'var(--font-eyebrow)' }}
          >
            Follow
          </p>
          <div className="flex gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-forest)] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-brass)]"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-forest)] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-brass)]"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <p
        className="mt-16 px-5 text-center text-[10px] tracking-[0.4em] uppercase text-[color:var(--color-text-tertiary)] md:px-16"
        style={{ fontFamily: 'var(--font-eyebrow)' }}
      >
        © {new Date().getFullYear()} {stay.name} · A Giovanni stay
      </p>
    </footer>
  );
};

export default CityStayFooter;
