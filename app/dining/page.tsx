'use client';

import Image from 'next/image';
import { Utensils, Coffee, Wine, Users } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { siteConfig } from '@/lib/data';

const diningExperiences = [
  {
    title: 'Fine Dining',
    description: 'Indulge in exquisite multi-course meals crafted by our expert chefs',
    icon: Utensils,
  },
  {
    title: 'Candlelight Dinners',
    description: 'Romantic dining experiences under the stars with personalized service',
    icon: Wine,
  },
  {
    title: 'Farm Breakfast',
    description: 'Fresh, organic breakfast sourced from local farms and our garden',
    icon: Coffee,
  },
  {
    title: 'BBQ Nights',
    description: 'Outdoor barbecue evenings with live grills and entertainment',
    icon: Users,
  },
];

const menuCategories = [
  {
    name: 'Indian Delicacies',
    description: 'Authentic flavors from across India, prepared with traditional techniques',
    dishes: [
      'Tandoori Specialties',
      'Regional Curries',
      'Traditional Thalis',
      'Biryanis & Rice Dishes',
    ],
  },
  {
    name: 'Continental Cuisine',
    description: 'International favorites with a gourmet twist',
    dishes: [
      'Fresh Pasta & Risotto',
      'Grilled Specialties',
      'Artisan Pizzas',
      'European Classics',
    ],
  },
  {
    name: 'Asian Fusion',
    description: 'Pan-Asian flavors combining tradition and innovation',
    dishes: [
      'Sushi & Sashimi',
      'Thai Curries',
      'Chinese Wok Dishes',
      'Japanese Teppanyaki',
    ],
  },
  {
    name: 'Desserts & Beverages',
    description: 'Sweet endings and refreshing drinks',
    dishes: [
      'Artisan Desserts',
      'Fresh Juices',
      'Premium Coffee & Tea',
      'Signature Cocktails',
    ],
  },
];

export default function DiningPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)] pt-24 pb-16">
        {/* Hero Section - LUXURY EDITION */}
        <div className="relative h-[70vh] md:h-[80vh] lg:h-[85vh] mb-32 md:mb-40 lg:mb-48">
          <Image
            src="/Gourmet-By-The-Woods.jpg"
            alt="Gourmet by the Woods - Fine Dining at Giovanni Village"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 pb-24 md:pb-32">
            <Container>
              <p className="text-sm font-semibold uppercase tracking-widest text-white/80 mb-8" style={{ letterSpacing: '2.5px' }}>
                Culinary Excellence
              </p>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-10" style={{ lineHeight: '1.1', letterSpacing: '-0.025em' }}>
                Restaurant & Dining
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl" style={{ lineHeight: '1.6' }}>
                Your smile, our happiness. Experience culinary excellence with farm-to-table dining,
                candlelight dinners, and authentic flavors.
              </p>
            </Container>
          </div>
        </div>

        <Container>
          {/* Introduction */}
          <div className="max-w-4xl mx-auto text-center mb-32 md:mb-40">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-10" style={{ lineHeight: '1.1' }}>
              A Gastronomic Journey
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed text-[var(--color-text-secondary)] mb-8" style={{ lineHeight: '1.8' }}>
              At Giovanni Village, dining is more than just a meal—it's an experience.
              Our signature restaurant combines stunning forest views with exceptional cuisine,
              creating the perfect ambiance for every occasion.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.8' }}>
              From farm-fresh breakfasts to candlelit dinners under the stars, every dish
              is crafted with passion and presented with artistry.
            </p>
          </div>

          {/* Dining Experiences Grid */}
          <div className="mb-32 md:mb-40">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-20" style={{ lineHeight: '1.1' }}>
              Dining Experiences
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
              {diningExperiences.map((experience, index) => {
                const Icon = experience.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-8 bg-[var(--color-background-secondary)] rounded-lg transition-transform duration-500 hover:scale-105"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-bronze)]/10 flex items-center justify-center">
                      <Icon className="h-10 w-10 text-[var(--color-bronze)]" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold mb-4" style={{ lineHeight: '1.2' }}>
                      {experience.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.7' }}>
                      {experience.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Menu Categories */}
          <div className="mb-32 md:mb-40">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-20" style={{ lineHeight: '1.1' }}>
              Our Culinary Offerings
            </h2>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {menuCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-[var(--color-background-secondary)] p-10 md:p-12 rounded-lg"
                >
                  <h3 className="font-heading text-3xl md:text-4xl font-bold mb-6" style={{ lineHeight: '1.2' }}>
                    {category.name}
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed text-[var(--color-text-secondary)] mb-8" style={{ lineHeight: '1.7' }}>
                    {category.description}
                  </p>
                  <ul className="space-y-4">
                    {category.dishes.map((dish, idx) => (
                      <li key={idx} className="flex items-center gap-4">
                        <div className="h-2 w-2 rounded-full bg-[var(--color-bronze)]" />
                        <span className="text-base md:text-lg text-[var(--color-text-secondary)]">{dish}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-32 md:mb-40">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-20" style={{ lineHeight: '1.1' }}>
              Culinary Moments
            </h2>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="https://giovannivillage.com/wp-content/uploads/2017/11/food-1.jpg"
                  alt="Fine Dining"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="https://giovannivillage.com/wp-content/uploads/2017/11/food-2.jpg"
                  alt="Gourmet Cuisine"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Special Features */}
          <div className="bg-[var(--color-background-secondary)] rounded-lg p-16 md:p-20 mb-32 md:mb-40">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-16 md:mb-20" style={{ lineHeight: '1.1' }}>
                Dining Highlights
              </h2>
              <div className="grid md:grid-cols-3 gap-12 lg:gap-16 text-center">
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-4" style={{ lineHeight: '1.2' }}>Farm-to-Table</h3>
                  <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.7' }}>
                    Fresh, organic ingredients sourced from local farms and our own garden
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-4" style={{ lineHeight: '1.2' }}>Expert Chefs</h3>
                  <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.7' }}>
                    Culinary masters trained in international and traditional cuisines
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-4" style={{ lineHeight: '1.2' }}>Forest Views</h3>
                  <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]" style={{ lineHeight: '1.7' }}>
                    Dine surrounded by nature with panoramic views of our lush estate
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reservations CTA */}
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-10" style={{ lineHeight: '1.1' }}>
              Reserve Your Table
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed text-[var(--color-text-secondary)] mb-12" style={{ lineHeight: '1.8' }}>
              For reservations and special dining arrangements, please contact our F&B team.
              We're here to create an unforgettable culinary experience for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Button
                variant="primary"
                size="lg"
                className="bg-[var(--color-gold)] hover:bg-[var(--color-bronze)] text-[var(--color-charcoal)]"
              >
                Make a Reservation
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[var(--color-bronze)] text-[var(--color-bronze)] hover:bg-[var(--color-bronze)] hover:text-white"
              >
                View Full Menu
              </Button>
            </div>
            <p className="text-base text-[var(--color-text-tertiary)]">
              Call F&B: <a href={`tel:${siteConfig.contact.phoneSecondary}`} className="text-[var(--color-bronze)] hover:underline">{siteConfig.contact.phoneSecondary}</a>
            </p>
          </div>
        </Container>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
