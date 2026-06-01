import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { siteConfig } from '@/lib/data';
import { getWhatsAppLink } from '@/lib/utils';
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp-messages';

export const metadata: Metadata = {
  title: 'Page not found',
  description:
    'The page you were looking for has wandered off. Find your way back to Giovanni Village Resort here.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)] pt-32 md:pt-40">
        <div className="mx-auto flex max-w-2xl flex-col items-center px-6 pb-24 text-center md:px-10">
          <p
            className="mb-6 text-[11px] uppercase tracking-[0.36em] text-[var(--color-text-tertiary)]"
            style={{ fontFamily: 'var(--font-eyebrow)' }}
          >
            404 — Lost in the forest
          </p>
          <h1
            className="display-italic mb-8 text-4xl leading-[1.1] md:text-6xl"
            style={{ color: 'var(--color-text)' }}
          >
            This trail
            {' '}
            <span className="font-script">went</span>
            {' '}
            quiet.
          </h1>
          <p
            className="mb-12 max-w-md text-base text-[var(--color-text-secondary)] md:text-lg"
            style={{ lineHeight: 1.7 }}
          >
            The page you were looking for has wandered off. The estate is wide and the
            footpaths cross — here are a few places to head back to.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="cta" size="lg" href="/">
              Back to the homepage
            </Button>
            <Button
              variant="cta-outline"
              size="lg"
              href={getWhatsAppLink(siteConfig.contact.whatsapp, WHATSAPP_MESSAGES.notFound)}
              external
            >
              Talk to the concierge
            </Button>
          </div>

          <ul className="mt-16 grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3">
            {[
              { label: 'Rooms', href: '/rooms' },
              { label: 'Dining', href: '/dining' },
              { label: 'Spa & Wellness', href: '/spa' },
              { label: 'Experiences', href: '/experiences' },
              { label: 'Weddings', href: '/weddings' },
              { label: 'Gallery', href: '/gallery' },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[var(--color-text)] transition hover:text-[var(--color-bronze)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
