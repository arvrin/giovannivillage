'use client';

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Play } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import GalleryLightbox from '@/components/ui/GalleryLightbox';
import { galleryItems, categoryCounts } from '@/lib/gallery';
import { CATEGORY_LABELS, CATEGORY_ORDER, type GalleryCategory } from '@/lib/gallery-types';

type FilterKey = 'All' | GalleryCategory;

const FILTERS: FilterKey[] = ['All', ...CATEGORY_ORDER];

export default function GalleryPage() {
  return (
    <Suspense fallback={null}>
      <GalleryView />
    </Suspense>
  );
}

function GalleryView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialise filter + open item from URL so deep-links work
  const initialCat = (searchParams.get('cat') as FilterKey | null) ?? 'All';
  const initialId = searchParams.get('item');

  const [filter, setFilter] = useState<FilterKey>(
    FILTERS.includes(initialCat) ? initialCat : 'All',
  );
  const [openId, setOpenId] = useState<string | null>(initialId);

  const filtered = useMemo(
    () => (filter === 'All' ? galleryItems : galleryItems.filter((i) => i.category === filter)),
    [filter],
  );

  const openIndex = useMemo(() => {
    if (!openId) return null;
    const idx = filtered.findIndex((i) => i.id === openId);
    return idx >= 0 ? idx : null;
  }, [filtered, openId]);

  // Keep the URL in sync with state so deep-link & back-button work
  useEffect(() => {
    const params = new URLSearchParams();
    if (filter !== 'All') params.set('cat', filter);
    if (openId) params.set('item', openId);
    const qs = params.toString();
    const url = qs ? `/gallery?${qs}` : '/gallery';
    // Use replace so we don't pollute history with every hover/filter change
    router.replace(url, { scroll: false });
  }, [filter, openId, router]);

  const handleFilter = useCallback((next: FilterKey) => {
    setFilter(next);
    setOpenId(null);
  }, []);

  const handleNavigate = useCallback(
    (nextIdx: number) => setOpenId(filtered[nextIdx]?.id ?? null),
    [filtered],
  );

  const counts: Record<FilterKey, number> = {
    All: galleryItems.length,
    Estate: categoryCounts.Estate ?? 0,
    Rooms: categoryCounts.Rooms ?? 0,
    Kitchens: categoryCounts.Kitchens ?? 0,
    Spa: categoryCounts.Spa ?? 0,
    Weddings: categoryCounts.Weddings ?? 0,
    Wild: categoryCounts.Wild ?? 0,
    Films: categoryCounts.Films ?? 0,
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)] pb-16 pt-32 md:pt-36">
        <Container>
          <SectionHeader
            level="h1"
            eyebrow="The estate in pictures"
            title="Frames from the estate"
            description="Rooms, dining venues, lakes, lawns, the spa, the safari days, the films in between. Open any frame to step in — arrows or swipe to wander."
          />

          {/* Filter bar */}
          <div className="sticky top-20 z-30 -mx-4 mt-12 mb-12 overflow-x-auto bg-[var(--color-background)]/85 px-4 py-3 backdrop-blur-md md:top-24 md:mt-16">
            <div className="mx-auto flex w-max max-w-full justify-center gap-2 md:gap-3">
              {FILTERS.map((key) => {
                const label = key === 'All' ? 'All' : CATEGORY_LABELS[key];
                const isActive = filter === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleFilter(key)}
                    aria-pressed={isActive}
                    className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 md:px-5 md:py-2.5 md:text-xs ${
                      isActive
                        ? 'bg-[var(--color-bronze)] text-white shadow-sm'
                        : 'bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bronze)]/10'
                    }`}
                  >
                    {label}
                    <span
                      className={`ml-2 text-[10px] tabular-nums ${
                        isActive ? 'text-white/70' : 'text-[var(--color-text-tertiary)]'
                      }`}
                    >
                      {counts[key]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid — CSS columns with aspect-ratio holders so layout doesn't jump */}
          <div className="columns-1 gap-4 md:columns-2 md:gap-6 lg:columns-3">
            {filtered.map((item, i) => {
              const aspect = `${item.width} / ${item.height}`;
              const showVideoChip = item.type === 'video';
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setOpenId(item.id)}
                  className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg bg-[var(--color-background-secondary)] text-left shadow-sm transition-all duration-500 hover:shadow-xl md:mb-6"
                  style={{ aspectRatio: aspect }}
                  aria-label={`Open ${item.title}`}
                >
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={item.poster ?? item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={item.priority && i < 6}
                      loading={item.priority && i < 6 ? undefined : 'lazy'}
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />

                    {/* Subtle bottom gradient + caption (always visible on mobile, fades up on desktop hover) */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
                      <p
                        className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70"
                        style={{ fontFamily: 'var(--font-eyebrow)' }}
                      >
                        {CATEGORY_LABELS[item.category]}
                      </p>
                      <p className="mt-1 font-heading text-base text-white md:text-lg">
                        {item.title}
                      </p>
                    </div>

                    {showVideoChip && (
                      <div className="pointer-events-none absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                        <Play className="h-4 w-4 fill-current" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="py-24 text-center text-[var(--color-text-tertiary)]">
              No frames in this set yet.
            </p>
          )}
        </Container>
      </main>

      <Footer />
      <WhatsAppButton />

      <GalleryLightbox
        items={filtered}
        index={openIndex}
        onClose={() => setOpenId(null)}
        onNavigate={handleNavigate}
      />
    </>
  );
}
