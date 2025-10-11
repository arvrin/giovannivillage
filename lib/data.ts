/**
 * Giovanni Village Content Data
 * Extracted from WordPress backup and content audit
 */

export const siteConfig = {
  name: 'Giovanni Village',
  title: 'Giovanni Village Resort – Best Luxury Wildlife Resort in Bhopal',
  description:
    'Experience luxury at Giovanni Village, Best Luxury Wildlife Resort in Bhopal with spa, banquet halls, restaurants & forest views. Book your perfect escape today.',
  url: 'https://giovannivillage.com',
  keywords: [
    'Best Luxury Wildlife Resort in Bhopal',
    'Boutique resort near Bhopal',
    'Wedding venue Bhopal',
    'Spa resort Madhya Pradesh',
    'Luxury resort with forest views',
    'Corporate retreat venue Bhopal',
  ],
  contact: {
    phone: '+91 90390 37300', // Concierge
    email: 'reservations@giovannivillage.com',
    whatsapp: '+91 90390 37300', // Using concierge number for WhatsApp
    phoneSecondary: '+91 90390 37302', // F&B
    address: {
      street: 'Giovanni Village, 410, Village Kalapani, Kolar Road',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      country: 'India',
      coordinates: {
        lat: 23.2599,
        lng: 77.4126,
      },
    },
  },
  social: {
    facebook: 'https://facebook.com/giovannivillage',
    instagram: 'https://instagram.com/giovannivillage',
    twitter: 'https://twitter.com/giovannivillage',
  },
};

export const hero = {
  tagline: 'Best Luxury Wildlife Resort in Bhopal',
  subtitle:
    'Resort. Spa. Banquet. Experience luxury in the lap of nature.',
  ctaPrimary: 'Book Your Stay',
  ctaSecondary: 'Explore Experiences',
  images: [
    '/images/hero/hero-1.jpg', // Fallback image while video loads
  ],
};

export const about = {
  title: 'Welcome to happiness',
  subtitle: 'The finest hotel at the best price',
  content: [
    'The best people to take care of our most valuable asset: you.',
    'Giovanni Village is an uber-luxury wildlife resort in the city of lakes, Bhopal. Nestled in a lush 10-acre estate in Bhopal, only ~20 mins from the city center, this resort offers a perfect blend of nature, elegance, and warm hospitality.',
    'Whether you\'re planning a staycation near Bhopal, a family outing in Madhya Pradesh, or a grand wedding or celebration, Giovanni Village promises an unforgettable experience.',
    'Forest views, luxurious accommodations, spa indulgences, and adventure activities await you – all curated to make Giovanni Village the best luxury resort in Bhopal for leisure and events.',
  ],
  highlights: [
    {
      icon: 'hotel',
      title: 'Luxury Accommodations',
      description: 'Elegant rooms and suites with forest views',
    },
    {
      icon: 'leaf',
      title: 'Wildlife Experience',
      description: 'Immerse yourself in nature and local fauna',
    },
    {
      icon: 'utensils',
      title: 'Fine Dining',
      description: 'Exquisite cuisine in stunning settings',
    },
    {
      icon: 'spa',
      title: 'Elysium Spa & Wellness',
      description: 'Rejuvenate with world-class treatments',
    },
  ],
};

export const rooms = [
  {
    id: 'king-room-pool-garden',
    name: 'King Room - Pool and Garden View',
    description:
      'Wake up to the melodies of nature and panoramic forest vistas at Giovanni Village. Our luxury King Rooms offer a perfect blend of comfort and natural beauty with stunning pool and garden views.',
    features: ['Pool View', 'Garden View', 'King Bed', 'Private Balcony', '430 sqft'],
    capacity: '2 adults, 1 child',
    area: '430 sqft',
    image: '/images/rooms/king-room.jpg',
    price: 8000,
  },
  {
    id: 'luxury-suite',
    name: 'Luxury Rooms & Suites',
    description:
      'Our elegantly designed luxury suites feature plush interiors, modern amenities, and private sit-outs where you can enjoy fresh forest air and views of our verdant landscape.',
    features: ['Forest Views', 'Premium Amenities', 'Private Sit-Out', 'Plush Interiors', 'Modern Facilities'],
    capacity: '2-3 adults',
    area: '500 sqft',
    image: '/images/rooms/luxury-suite.jpg',
    price: 12000,
  },
  {
    id: 'wilderness-villa',
    name: 'Bespoke Wilderness Villas',
    description:
      'Experience ultimate privacy and luxury in our standalone villas surrounded by lush greenery. Perfect for families and special occasions with complete privacy and butler service.',
    features: ['2 Bedrooms', 'Private Garden', 'Butler Service', 'Complete Privacy', 'Living Area'],
    capacity: '2-6 adults',
    area: '1000 sqft',
    image: '/images/rooms/wilderness-villa.jpg',
    price: 18000,
  },
];

export const experiences = [
  {
    id: 'nature-wildlife',
    title: 'Nature & Wildlife',
    description:
      'Explore the wilderness through guided nature walks, bird watching, and wildlife spotting',
    image: '/n1.jpg',
    activities: ['Nature walks', 'Bird watching', 'Wildlife spotting', 'Photography tours'],
  },
  {
    id: 'dining',
    title: 'Restaurant and Dining',
    description:
      'Your smile, our happiness. Indulge in culinary excellence at our signature restaurant with farm-to-table dining, candlelight dinners, and authentic flavors.',
    image: '/d1.jpg',
    activities: ['Fine dining', 'Candlelight dinners', 'Farm breakfast', 'BBQ nights'],
  },
  {
    id: 'wellness',
    title: 'Wellness & Spa',
    description:
      'Rejuvenate your body and mind at Elysium Spa with signature treatments',
    image: '/images/experiences/spa-wellness.jpg',
    activities: ['Massage therapy', 'Yoga sessions', 'Meditation', 'Ayurvedic treatments'],
  },
  {
    id: 'events',
    title: 'Events & Celebrations',
    description:
      'Host unforgettable weddings, corporate retreats, and special celebrations',
    image: '/images/experiences/events-celebrations.jpg',
    activities: ['Weddings', 'Corporate events', 'Conferences', 'Private parties'],
  },
];

export const weddings = {
  title: 'Host Your Dream Wedding',
  description:
    'Create magical memories in our stunning natural setting. From intimate ceremonies to grand celebrations, we craft every detail to perfection.',
  features: [
    'Multiple venue options',
    'Capacity up to 500 guests',
    'Dedicated wedding planner',
    'Custom catering menus',
    'On-site accommodation',
    'Photography & decoration',
  ],
  image: '/images/weddings/wedding-hero.jpg',
};

export const testimonials = [
  {
    id: 1,
    name: 'Priya & Rahul Sharma',
    location: 'Mumbai',
    rating: 5,
    quote:
      'Our wedding at Giovanni Village was beyond magical. The team took care of every detail, and our guests are still raving about the experience!',
    image: '/images/testimonials/testimonial-1.jpg',
  },
  {
    id: 2,
    name: 'Amit Patel',
    location: 'Delhi',
    rating: 5,
    quote:
      'Perfect getaway for our corporate retreat. The facilities, food, and service were impeccable. Highly recommended for team building events.',
    image: '/images/testimonials/testimonial-2.jpg',
  },
  {
    id: 3,
    name: 'Neha Reddy',
    location: 'Bangalore',
    rating: 5,
    quote:
      'The spa experience at Elysium was transformative. Combined with the serene natural surroundings, it was the perfect wellness retreat.',
    image: '/images/testimonials/testimonial-3.jpg',
  },
];

export const footer = {
  about:
    'Giovanni Village is a luxury boutique resort offering an unparalleled blend of nature, comfort, and world-class hospitality in the heart of Madhya Pradesh.',
  quickLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Rooms & Suites', href: '/rooms/king-room-pool-garden' },
    { label: 'Dining', href: '/dining' },
    { label: 'Spa & Wellness', href: '/spa' },
    { label: 'Events & Weddings', href: '/weddings' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Cancellation Policy', href: '/cancellation' },
  ],
  signature: 'A Giovanni Experience',
  copyright: `© ${new Date().getFullYear()} Giovanni Village. All rights reserved.`,
};
