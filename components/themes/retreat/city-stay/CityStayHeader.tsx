'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';
import type { CityStay } from '@/lib/city-stays';

/**
 * A minimal header for the city-stay sub-sites (House, Suites).
 * Just three things: a "back to Giovanni Village" link, the property
 * name, and an Enquire-on-WhatsApp CTA. No nav drawer, no logo.
 */
const CityStayHeader = ({ stay }: { stay: CityStay }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'bg-[color:var(--color-bg)]/85 backdrop-blur-md shadow-[0_1px_0_var(--color-border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:h-20 md:px-10">
        <Link
          href="/"
          className={`flex h-11 items-center gap-2 rounded-full px-4 text-[10px] tracking-[0.22em] uppercase transition ${
            scrolled
              ? 'text-[color:var(--color-text)] hover:bg-[color:var(--color-bg-alt)]'
              : 'text-white bg-white/10 backdrop-blur-md hover:bg-white/20'
          }`}
          style={{ fontFamily: 'var(--font-eyebrow)' }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Giovanni Village
        </Link>

        <span
          className={`hidden md:inline-block display-italic text-lg ${
            scrolled ? 'text-[color:var(--color-text)]' : 'text-white'
          }`}
          style={{ fontWeight: 300 }}
        >
          {stay.name}
        </span>

        <Link
          href={getWhatsAppLink(
            stay.whatsapp,
            `Hello ${stay.name}, I'd like to enquire about a stay.`,
          )}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex h-11 items-center rounded-full px-5 text-[11px] tracking-[0.22em] uppercase transition ${
            scrolled
              ? 'bg-[color:var(--color-accent)] text-[color:var(--color-accent-contrast)] hover:bg-[color:var(--color-brass)] hover:text-[color:var(--color-forest)]'
              : 'bg-white text-[color:var(--color-forest)] hover:bg-[color:var(--color-brass)] hover:text-white'
          }`}
          style={{ fontFamily: 'var(--font-eyebrow)' }}
        >
          Enquire
        </Link>
      </div>
    </header>
  );
};

export default CityStayHeader;
