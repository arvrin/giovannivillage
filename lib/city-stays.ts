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

/**
 * Nearby — only Arera Colony-adjacent landmarks within ~5 km.
 * Upper Lake and Van Vihar are in the city's north and are 7-10 km
 * away — they sit in the broader Bhopal worth-the-drive list, not
 * "walking-distance" nearby.
 */
const NEARBY_ARERA: NearbyPlace[] = [
  { name: 'DB City Mall', detail: 'Cinema, food court, the closest big retail', distanceKm: 1.5 },
  { name: 'Birla Mandir', detail: 'Hilltop temple on Arera Hills with a city panorama', distanceKm: 2 },
  { name: 'Shahpura Lake', detail: 'A walkable lake — slower than Upper Lake, quieter at sunset', distanceKm: 2.5 },
  { name: 'MP Nagar', detail: 'The city\'s working district — markets, cafés, offices', distanceKm: 4 },
  { name: 'New Market', detail: 'Old-Bhopal shopping, sweets, street food', distanceKm: 4 },
];

/** Distances published on the site are courtesy approximations; actual
 *  travel time depends on Bhopal traffic. Always confirm with concierge. */
const ARERA_STATS = [
  { value: '40 min', label: 'From Raja Bhoj Airport' },
  { value: '15 min', label: 'From Habibganj Station' },
  { value: '4 km', label: 'To MP Nagar' },
  { value: '2 km', label: 'To Birla Mandir' },
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
  eyebrow: 'Boutique stays · Bhopal',
  intro:
    'A boutique homestay in one of Bhopal\'s quietest residential pockets — kept by the same family that runs Giovanni Village. Three categories of king suite, built for the short business trip, the weekend with parents, the night before a wedding.',
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
        'Our flagship category. King bed, generous bath, the highest rate at Giovanni House. Best for the longer stay.',
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
        'The mid-tier king. Same bed, same amenities, slightly different placement in the property. Sleeps four.',
      rate: 2700,
      capacity: '2 adults · 2 children',
      guestsMax: 4,
      image: '/images/city-stays/house/superior-king.webp',
    },
    {
      id: 'luxury-king',
      name: 'Luxury King',
      description:
        'Our entry king. Same Giovanni touches at the most accessible rate. Sleeps up to four.',
      rate: 2250,
      capacity: '3 adults · 1 child',
      guestsMax: 4,
      image: '/images/city-stays/house/luxury-king.webp',
    },
  ],
  included: [
    'King bed with fresh linen',
    'Air conditioning',
    'Wi-Fi',
    'Television',
    'En-suite bath',
    '24/7 in-room dining',
    'Complimentary breakfast',
    'Reserved parking',
    'Daily housekeeping',
    'Airport pickup on request',
  ],
  nearby: NEARBY_ARERA,
  mapEmbedSrc:
    'https://www.google.com/maps?q=E-4%2F198+Arera+Colony+Bhopal&output=embed',
  stats: ARERA_STATS,
};

export const giovanniSuites: CityStay = {
  slug: 'suites',
  name: 'Giovanni Suites',
  tagline: 'Boutique Home Stay',
  headline: {
    lead: 'Four named rooms,',
    script: 'four',
    tail: 'small stories.',
  },
  eyebrow: 'Boutique stays · Bhopal',
  intro:
    'A boutique homestay in Arera Colony with four named room categories — Amaltas, Gulmohar, Razz, Rangrez — drawn from the trees and language of central India. Built for the slow weekend in the city, the family visit, the wedding-guest stay.',
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
      meaning: 'Named for the Indian Laburnum',
      description:
        'Our entry category. Sleeps up to four, breakfast included.',
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
      meaning: 'Named for the Flame-of-the-Forest',
      description:
        'The family category — sleeps up to five with room for an extra bed.',
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
      meaning: 'Our signature mid-tier',
      description:
        'A step up in space and rate. Sleeps four.',
      rate: 2880,
      capacity: '3 adults · 1 child',
      guestsMax: 4,
      image: '/images/city-stays/suites/razz.webp',
    },
    {
      id: 'rangrez',
      name: 'Rangrez',
      meaning: 'Named for the dyer — the artisan who colours the celebration',
      description:
        'Our largest category. Sleeps up to six — for the wedding-guest family or the visiting parents.',
      rate: 4050,
      capacity: '4 adults · 2 children',
      guestsMax: 6,
      image: '/images/city-stays/suites/rangrez.webp',
    },
  ],
  included: [
    'King bed with fresh linen',
    'Air conditioning',
    'Wi-Fi',
    'Television',
    'En-suite bath',
    '24/7 in-room dining',
    'Complimentary breakfast',
    'Reserved parking',
    'Daily housekeeping',
    'Airport pickup on request',
  ],
  nearby: NEARBY_ARERA,
  mapEmbedSrc:
    'https://www.google.com/maps?q=E-8+Arera+Colony+Bhopal&output=embed',
  stats: ARERA_STATS,
};

export const cityStays = [giovanniHouse, giovanniSuites] as const;
