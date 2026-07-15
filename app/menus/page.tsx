import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import PageHero from '@/components/ui/PageHero';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { siteConfig } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Menus',
  description:
    'Every Giovanni Village menu in one place — restaurant, bar & beverages, banquet, and the Elysium spa. Browse or download each as a PDF.',
  alternates: { canonical: '/menus' },
  openGraph: {
    title: 'Menus — Giovanni Village',
    description:
      'Restaurant, bar, banquet and spa menus for Giovanni Village Resort, Bhopal.',
    url: '/menus',
    images: ['/images/dining/gourmet-by-the-woods.webp'],
  },
};

/** All published menus. Add a new entry here to surface it on /menus and in the QR. */
const menus = [
  {
    name: 'Restaurant',
    tagline: 'Farm-to-table, all day',
    note: 'Gourmet By The Woods · Pihu · Gazebo',
    file: '/menus/giovanni-restaurant-menu-2026.pdf',
    image: '/images/dining/gourmet-by-the-woods.webp',
  },
  {
    name: 'Bar & Beverages',
    tagline: 'Cocktails, wines & pours',
    note: 'Rooftop, lakeside & lounge',
    file: '/menus/giovanni-bar-menu-2026.pdf',
    image: '/images/weddings/estate-dressed-bar-night.webp',
  },
  {
    name: 'Banquet',
    tagline: 'Menus for every celebration',
    note: 'Weddings · conferences · private events',
    file: '/menus/giovanni-banquet-menu-2026.pdf',
    image: '/images/weddings/banquet-lawn-night.webp',
  },
  {
    name: 'Elysium Spa',
    tagline: 'Rituals & treatments',
    note: 'Forest oils, warm stone, longevity',
    file: '/menus/giovanni-spa-menu.pdf',
    image: '/n1.webp',
  },
];

export default function MenusPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image="/images/dining/gourmet-buffet.webp"
          alt="A table set at Giovanni Village"
          eyebrow="At the table"
          title="The menus"
          description="Everything from the estate's kitchens and the spa, in one place. Tap any menu to open it."
          height="sm"
        />

        <Container>
          <div className="mx-auto max-w-4xl py-14 md:py-20">
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              {menus.map((m) => (
                <a
                  key={m.file}
                  href={m.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-lg"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-6">
                    <p
                      className="text-[8px] uppercase tracking-[0.22em] text-white/70 sm:text-[10px] sm:tracking-[0.28em]"
                      style={{ fontFamily: 'var(--font-eyebrow)' }}
                    >
                      {m.note}
                    </p>
                    <h2 className="display-italic mt-0.5 text-lg leading-tight text-white sm:mt-1 sm:text-2xl md:text-3xl">
                      {m.name}
                    </h2>
                    <div className="mt-1.5 flex items-center justify-between gap-2 sm:mt-2">
                      <span
                        className="hidden text-sm text-white/85 sm:inline"
                        style={{ lineHeight: 1.5 }}
                      >
                        {m.tagline}
                      </span>
                      <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.16em] text-[var(--color-bronze)] sm:tracking-[0.2em]">
                        View · PDF →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <p className="mt-10 text-center text-sm text-[var(--color-text-tertiary)]">
              Menus open as PDFs and may change with the season. For special menus,
              allergies or event catering, call our F&amp;B team at{' '}
              <a
                href={`tel:${siteConfig.contact.phoneSecondary.replace(/\s/g, '')}`}
                className="text-[var(--color-bronze)] underline-offset-2 hover:underline"
              >
                {siteConfig.contact.phoneSecondary}
              </a>
              .
            </p>
          </div>
        </Container>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
