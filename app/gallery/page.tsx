'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

// Import categorized images (we have 705 images from WordPress)
const categories = ['All', 'Landscape', 'Rooms', 'Dining', 'Events', 'Spa'];

// Sample images from our WordPress data (we'll expand this)
const galleryImages = [
  { id: 1, category: 'Landscape', url: 'https://giovannivillage.com/wp-content/uploads/2023/07/3.jpg', title: 'Resort View' },
  { id: 2, category: 'Landscape', url: 'https://giovannivillage.com/wp-content/uploads/2023/07/4.jpg', title: 'Nature Trail' },
  { id: 3, category: 'Landscape', url: 'https://giovannivillage.com/wp-content/uploads/2023/07/5.jpg', title: 'Garden' },
  { id: 4, category: 'Rooms', url: 'https://giovannivillage.com/wp-content/uploads/2015/07/iStock_000010325467_Full-small-scaled.jpg', title: 'King Room' },
  { id: 5, category: 'Rooms', url: 'https://giovannivillage.com/wp-content/uploads/2014/09/content-room-1024x7681-1.jpg', title: 'Suite' },
  { id: 6, category: 'Dining', url: 'https://giovannivillage.com/wp-content/uploads/2017/11/food-1.jpg', title: 'Cuisine' },
  { id: 7, category: 'Dining', url: 'https://giovannivillage.com/wp-content/uploads/2017/11/food-2.jpg', title: 'Fine Dining' },
  { id: 8, category: 'Events', url: 'https://giovannivillage.com/wp-content/uploads/2023/07/ch2.jpg', title: 'Event Space' },
  { id: 9, category: 'Spa', url: 'https://giovannivillage.com/wp-content/uploads/2021/08/masseur-doing-massage-on-woman-body-in-the-spa-sal-UGDXK58.jpg', title: 'Spa Treatment' },
  { id: 10, category: 'Landscape', url: 'https://giovannivillage.com/wp-content/uploads/2023/07/1.jpg', title: 'Resort Exterior' },
  { id: 11, category: 'Landscape', url: 'https://giovannivillage.com/wp-content/uploads/2023/07/2.jpg', title: 'Grounds' },
  { id: 12, category: 'Events', url: 'https://giovannivillage.com/wp-content/uploads/2014/09/conference.jpg', title: 'Conference Hall' },
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

      <main className="min-h-screen bg-[var(--color-background)] pt-24 pb-16">
        <Container>
          {/* Header - LUXURY EDITION */}
          <div className="text-center mb-20 md:mb-24 lg:mb-32">
            <div className="flex justify-center mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)]" style={{ letterSpacing: '2.5px' }}>
                Visual Journey
              </p>
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[var(--color-text-primary)] mb-10" style={{ lineHeight: '1.1', letterSpacing: '-0.025em' }}>
              Gallery
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-[var(--color-text-secondary)] max-w-3xl mx-auto" style={{ lineHeight: '1.8' }}>
              Explore the beauty and luxury of Giovanni Village through our curated collection of moments
            </p>
          </div>

          {/* Category Filter - Enhanced */}
          <div className="flex flex-wrap justify-center gap-6 mb-16 md:mb-20">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[var(--color-bronze)] text-white shadow-lg'
                    : 'bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bronze)]/10 hover:scale-105'
                }`}
                style={{ letterSpacing: '1.5px' }}
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
