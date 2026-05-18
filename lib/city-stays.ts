/**
 * Giovanni's two boutique homestays in Arera Colony, Bhopal.
 * Shared concierge phone, shared eZee PMS, distinct properties.
 *
 * House — the quieter "city outpost" tone, business-friendly, 3 king-suite types
 * Suites — the "poet's home" tone, 4 named rooms (Indian flora / heritage)
 */

export interface CityStayRoom {
  id: string;
  name: string;
  /** Italian/Hindi meaning shown in small print below the name (Suites only). */
  meaning?: string;
  description: string;
  rate: number;
  capacity: string;
  guestsMax: number;
  image: string;
  gallery?: string[];
}

export interface NearbyPlace {
  name: string;
  detail: string;
  distanceKm: number;
}

export interface CityStay {
  slug: 'house' | 'suites';
  name: string;
  tagline: string;
  /** The hero h1 — uses Hurricane script on one word via <span className="font-script">. */
  headline: { lead: string; script: string; tail: string };
  /** One-line city-stays sub-eyebrow. */
  eyebrow: string;
  intro: string;
  hero: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    pincode?: string;
  };
  phone: string;
  whatsapp: string;
  bookingUrl: string;
  rooms: CityStayRoom[];
  included: string[];
  nearby: NearbyPlace[];
  /** Mapbox / Google Maps embed. Falls back to a static link if empty. */
  mapEmbedSrc: string;
  /** Quick stats for the "Where it sits" block. */
  stats: { value: string; label: string }[];
}

const SHARED_PHONE = '+91 74705 58218';
const SHARED_WHATSAPP = '+917470558218';

const NEARBY_ARERA: NearbyPlace[] = [
  { name: 'Upper Lake', detail: 'Sunset boating + lakeside cafés', distanceKm: 2.5 },
  { name: 'Van Vihar National Park', detail: 'Tigers, leopards, hyenas in a city park', distanceKm: 3 },
  { name: 'MP Nagar Business District', detail: 'For the working visit', distanceKm: 4 },
  { name: 'Birla Mandir', detail: 'Hilltop temple, panoramic city view', distanceKm: 5 },
];

export const giovanniHouse: CityStay = {
  slug: 'house',
  name: 'Giovanni House',
  tagline: 'Boutique Home Stay',
  headline: {
    lead: 'A city',
    script: 'address',
    tail: 'in Arera Colony.',
  },
  eyebrow: 'City stays · Bhopal',
  intro:
    'A boutique homestay in the leafiest pocket of Bhopal — eight king suites kept by the same family that runs Giovanni Village. Built for the short business trip, the weekend with parents, the night before a wedding.',
  hero: '/images/city-stays/house/hero.webp',
  address: {
    line1: 'E-4:198, Arera Colony',
    line2: 'Bhopal',
    city: 'Madhya Pradesh',
    pincode: '462016',
  },
  phone: SHARED_PHONE,
  whatsapp: SHARED_WHATSAPP,
  bookingUrl:
    'https://live.ipms247.com/booking/roomlisting-giovannistays-hotelgiovannihouse-en',
  rooms: [
    {
      id: 'delux-king-suite',
      name: 'Delux King Suite',
      description:
        'Our flagship room. King bed, a study corner, generous bath. Designed for the longer stay — every drawer and switch where you want it.',
      rate: 2880,
      capacity: '2 adults · 2 children',
      guestsMax: 4,
      image: '/images/city-stays/house/delux-king-1.webp',
      gallery: [
        '/images/city-stays/house/delux-king-1.webp',
        '/images/city-stays/house/delux-king-2.webp',
        '/images/city-stays/house/delux-king-3.webp',
      ],
    },
    {
      id: 'superior-king-suite',
      name: 'Superior King Suite',
      description:
        'A quieter floor with the same king bed and study corner. Best for the early-morning meeting day.',
      rate: 2700,
      capacity: '2 adults · 2 children',
      guestsMax: 4,
      image: '/images/city-stays/house/superior-king.webp',
    },
    {
      id: 'luxury-king',
      name: 'Luxury King',
      description:
        'A compact king for a single traveller or a couple. Same Giovanni touches in a smaller footprint.',
      rate: 2250,
      capacity: '3 adults · 1 child',
      guestsMax: 4,
      image: '/images/city-stays/house/luxury-king.webp',
    },
  ],
  included: [
    'King bed with premium linen',
    'Air conditioning',
    'High-speed Wi-Fi',
    'Smart TV with streaming',
    'En-suite bath with premium toiletries',
    '24/7 in-room dining',
    'Complimentary breakfast',
    'Reserved parking',
    'Daily housekeeping',
    'Airport pickup on request',
  ],
  nearby: NEARBY_ARERA,
  mapEmbedSrc:
    'https://www.google.com/maps?q=E-4%2F198+Arera+Colony+Bhopal&output=embed',
  stats: [
    { value: '25 min', label: 'From Raja Bhoj Airport' },
    { value: '10 min', label: 'From Bhopal Junction' },
    { value: '4 km', label: 'To MP Nagar' },
    { value: '2.5 km', label: 'To Upper Lake' },
  ],
};

export const giovanniSuites: CityStay = {
  slug: 'suites',
  name: 'Giovanni Suites',
  tagline: 'Boutique Home Stay',
  headline: {
    lead: 'Four rooms,',
    script: 'four',
    tail: 'small stories.',
  },
  eyebrow: 'City stays · Bhopal',
  intro:
    'A poet\'s homestay in Arera Colony — four rooms named after the trees and colours of central India. Built for the slow weekend in the city, the family visit, the wedding-guest stay.',
  hero: '/images/city-stays/suites/hero.webp',
  address: {
    line1: '58, Pradhan Devlok Farms',
    line2: 'E-8, Arera Colony, Bhopal',
    city: 'Madhya Pradesh',
  },
  phone: SHARED_PHONE,
  whatsapp: SHARED_WHATSAPP,
  bookingUrl:
    'https://live.ipms247.com/booking/roomlisting-giovannistays-hotelgiovannisuites-en',
  rooms: [
    {
      id: 'amaltas',
      name: 'Amaltas',
      meaning: 'Indian Laburnum — the tree that blooms in golden chains',
      description:
        'Our entry room. Cream walls, blue accents, a generous bath. Good for a couple on a short trip.',
      rate: 2250,
      capacity: '2 adults · 2 children',
      guestsMax: 4,
      image: '/images/city-stays/suites/amaltas-1.webp',
      gallery: [
        '/images/city-stays/suites/amaltas-1.webp',
        '/images/city-stays/suites/amaltas-2.webp',
      ],
    },
    {
      id: 'gulmohar',
      name: 'Gulmohar',
      meaning: 'Flame-of-the-Forest — the tree that turns the road red in May',
      description:
        'The family room. Sleeps five comfortably, an extra sofa-bed for the child who insists on staying with the cousins.',
      rate: 2700,
      capacity: '3 adults · 2 children',
      guestsMax: 5,
      image: '/images/city-stays/suites/gulmohar-1.webp',
      gallery: [
        '/images/city-stays/suites/gulmohar-1.webp',
        '/images/city-stays/suites/gulmohar-2.webp',
      ],
    },
    {
      id: 'razz',
      name: 'Razz',
      meaning: 'A signature corner room with the most natural light',
      description:
        'The corner room with two-sided light. Slightly more space, slightly higher floor — for the longer stay or the longer morning.',
      rate: 2880,
      capacity: '3 adults · 1 child',
      guestsMax: 4,
      image: '/images/city-stays/suites/razz.webp',
    },
    {
      id: 'rangrez',
      name: 'Rangrez',
      meaning: 'The dyer — the artisan who colours every Indian celebration',
      description:
        'Our largest. A king bed plus a separate living corner, sleeps six. Designed for the wedding-guest family, the visiting parents, the long birthday.',
      rate: 4050,
      capacity: '4 adults · 2 children',
      guestsMax: 6,
      image: '/images/city-stays/suites/rangrez.webp',
    },
  ],
  included: [
    'King bed with premium linen',
    'Air conditioning',
    'High-speed Wi-Fi',
    'Smart TV with streaming',
    'En-suite bath with premium toiletries',
    '24/7 in-room dining',
    'Complimentary breakfast',
    'Reserved parking',
    'Daily housekeeping',
    'Airport pickup on request',
  ],
  nearby: NEARBY_ARERA,
  mapEmbedSrc:
    'https://www.google.com/maps?q=E-8+Arera+Colony+Bhopal&output=embed',
  stats: [
    { value: '25 min', label: 'From Raja Bhoj Airport' },
    { value: '10 min', label: 'From Bhopal Junction' },
    { value: '4 km', label: 'To MP Nagar' },
    { value: '2.5 km', label: 'To Upper Lake' },
  ],
};

export const cityStays = [giovanniHouse, giovanniSuites] as const;
