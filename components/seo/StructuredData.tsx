import { siteConfig, restaurants } from '@/lib/data';

/**
 * JSON-LD structured-data fragments. Renders inert <script> tags that
 * Google / Bing / AI engines parse for rich results. Pages embed only
 * the schemas relevant to them.
 */

const baseAddress = {
  '@type': 'PostalAddress' as const,
  streetAddress: siteConfig.contact.address.street,
  addressLocality: siteConfig.contact.address.city,
  addressRegion: siteConfig.contact.address.state,
  addressCountry: 'IN',
};

const baseGeo = {
  '@type': 'GeoCoordinates' as const,
  latitude: siteConfig.contact.address.coordinates.lat,
  longitude: siteConfig.contact.address.coordinates.lng,
};

const sameAs = [
  siteConfig.social.facebook,
  siteConfig.social.instagram,
];

function jsonLd(data: object) {
  return JSON.stringify(data);
}

/** Hotel + LocalBusiness for the resort itself — drop on the homepage. */
export function HotelSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['Hotel', 'LocalBusiness'],
    '@id': `${siteConfig.url}#hotel`,
    name: 'Giovanni Village Resort',
    alternateName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    image: [
      `${siteConfig.url}/images/hero/hero-1.webp`,
      `${siteConfig.url}/images/about/about-hero-original.webp`,
    ],
    logo: `${siteConfig.url}/images/logo/gvr-final-logo.webp`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: baseAddress,
    geo: baseGeo,
    starRating: { '@type': 'Rating', ratingValue: '5' },
    priceRange: '₹₹₹₹',
    sameAs,
    amenityFeature: [
      'Swimming Pool',
      'Spa',
      'Restaurant',
      'Bar',
      'Free Wi-Fi',
      'Banquet Hall',
      'Conference Facilities',
      'Air Conditioning',
      'Room Service',
      'Open-to-Sky Plunge Pools',
      'Private Garden Suites',
    ].map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}

/** Restaurants (FoodEstablishment) — drop on /dining */
export function RestaurantsSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': restaurants.map((r) => ({
      '@type': 'Restaurant',
      '@id': `${siteConfig.url}/dining#${r.id}`,
      name: r.name,
      description: r.description,
      url: `${siteConfig.url}/dining`,
      image: `${siteConfig.url}${r.image}`,
      address: baseAddress,
      geo: baseGeo,
      telephone: siteConfig.contact.phoneSecondary,
      priceRange: '₹₹₹',
      servesCuisine: r.tags,
      parentOrganization: { '@id': `${siteConfig.url}#hotel` },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}

/** Organization — the Giovanni group entity (parent of the resort + the
 *  boutique House & Suites + Royalton Farms). Drop on the homepage. */
export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}#organization`,
    name: 'Giovanni Village',
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo/gvr-final-logo.webp`,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: baseAddress,
    sameAs,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}

/** HotelRoom + Offer for a room detail page (price, features, part of the resort). */
export function RoomSchema({
  room,
}: {
  room: { id: string; name: string; description: string; image: string; features: string[]; price: number };
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    '@id': `${siteConfig.url}/rooms/${room.id}#room`,
    name: room.name,
    description: room.description,
    image: `${siteConfig.url}${room.image}`,
    url: `${siteConfig.url}/rooms/${room.id}`,
    amenityFeature: room.features.map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true,
    })),
    isPartOf: { '@id': `${siteConfig.url}#hotel` },
    offers: {
      '@type': 'Offer',
      price: room.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.url}/rooms/${room.id}`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}

/** Simple BreadcrumbList — pass an array of {name, href} */
export function BreadcrumbSchema({ items }: { items: { name: string; href: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}
