'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

// Import categorized images (we have 705 images from WordPress)
const categories = ['All', 'Landscape', 'Rooms', 'Dining', 'Events', 'Spa'];

const galleryImages = [
  { id: 1, category: 'Landscape', url: '/images/hero/hero-1.jpg', title: 'Resort Landscape' },
  { id: 2, category: 'Landscape', url: '/images/hero/landscape-2.jpg', title: 'Forest Vista' },
  { id: 3, category: 'Landscape', url: '/images/hero/landscape-3.jpg', title: 'Garden Grounds' },
  { id: 4, category: 'Landscape', url: '/images/hero/recent.jpg', title: 'Resort Exterior' },
  { id: 5, category: 'Landscape', url: '/images/about/landscape-1.jpg', title: 'Grounds' },
  { id: 6, category: 'Landscape', url: '/images/about/landscape-2.jpg', title: 'Estate' },
  { id: 7, category: 'Rooms', url: '/images/rooms/king-pool-garden.jpg', title: 'King Room — Pool & Garden' },
  { id: 8, category: 'Rooms', url: '/images/rooms/king-private-garden.jpg', title: 'King Room — Private Garden' },
  { id: 9, category: 'Rooms', url: '/images/rooms/junior-deck-garden.jpg', title: 'Junior Suite — Deck' },
  { id: 10, category: 'Rooms', url: '/images/rooms/junior-deck-private.jpg', title: 'Junior Suite — Private' },
  { id: 11, category: 'Rooms', url: '/images/rooms/junior-bath-tub.jpg', title: 'Open-to-Sky Bath Tub' },
  { id: 12, category: 'Rooms', url: '/images/rooms/junior-plunge-pool.jpg', title: 'Plunge Pool Suite' },
  { id: 13, category: 'Rooms', url: '/images/rooms/royal-suite.jpg', title: 'Royal Suite' },
  { id: 15, category: 'Dining', url: '/images/dining/gourmet-by-the-woods.jpg', title: 'Gourmet By The Woods' },
  { id: 16, category: 'Dining', url: '/images/dining/pihu.jpg', title: 'Pihu — Rooftop' },
  { id: 17, category: 'Dining', url: '/images/dining/berry-and-beans.jpg', title: 'Berry & Beans' },
  { id: 18, category: 'Dining', url: '/images/dining/the-den.jpg', title: 'The Den' },
  { id: 19, category: 'Events', url: '/images/weddings/hero.jpg', title: 'Wedding Venue' },
  { id: 20, category: 'Events', url: '/images/weddings/event.jpg', title: 'Celebrations' },
  { id: 21, category: 'Spa', url: '/n1.jpg', title: 'Elysium Spa Treatment' },
  { id: 24, category: 'Spa', url: '/images/experiences/landscapes/spa-landscape.jpg', title: 'Meditation Deck' },
  { id: 22, category: 'Landscape', url: '/images/experiences/wildlife/safari-elephants.jpg', title: 'Safari Elephants' },
  { id: 23, category: 'Landscape', url: '/images/experiences/wildlife/tiger-log.jpg', title: 'Ratapani Tiger' },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)] pt-32 md:pt-36 pb-16">
        <Container>
          <SectionHeader
            eyebrow="The estate in pictures"
            title="Frames from the estate"
            description="Pictures from across the property — rooms, kitchens, the lake, the lawns, the spa, the safari days. Hover for a closer look."
          />

          {/* Category filter */}
          <div className="mt-16 mb-16 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[var(--color-bronze)] text-white'
                    : 'bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bronze)]/10'
                }`}
                style={{ letterSpacing: '0.1em' }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid - Masonry Style with Luxury Spacing */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={image.url}
                    alt={image.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-white font-heading text-xl font-bold mb-1">{image.title}</p>
                      <p className="text-white/90 text-sm font-medium uppercase tracking-wider" style={{ letterSpacing: '1.5px' }}>{image.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>

        {/* Lightbox Modal - LUXURY EDITION */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-8 right-8 text-white text-5xl md:text-6xl hover:text-[var(--color-gold)] transition-colors duration-300"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <div className="max-w-7xl w-full">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-lg shadow-2xl"
              />
              <div className="text-center mt-8 text-white">
                <p className="text-2xl md:text-3xl font-heading font-bold mb-2">{selectedImage.title}</p>
                <p className="text-lg text-white/80 uppercase tracking-wider" style={{ letterSpacing: '1.5px' }}>{selectedImage.category}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
