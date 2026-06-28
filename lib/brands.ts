/**
 * The Giovanni family of brands — a single source consumed by:
 *  - the home page section (components/themes/retreat/home/GiovanniFamily.tsx)
 *  - the full-screen menu drawer (components/themes/retreat/Header.tsx)
 *
 * Each surface filters as needed (e.g. the home page omits Giovanni Village
 * because the visitor is already on it).
 */

export type BrandId =
  | 'giovanni-village'
  | 'royalton-farms'
  | 'giovanni-house'
  | 'giovanni-suites'
  | 'giovanni-boutique';

export interface Brand {
  id: BrandId;
  name: string;
  /** Short eyebrow label shown above the card image. */
  tagline: string;
  /** One-line body for cards. Keep ~140 chars. */
  description: string;
  /** Optional street/area context — used by city-stay cards. */
  location?: string;
  /** Where the card links. Omit for display-only cards (e.g. Boutique). */
  href?: string;
  external?: boolean;
  image: string;
  /** Render the image as a centred logo instead of a cover image. */
  isLogo?: boolean;
}

export const BRANDS: Brand[] = [
  {
    id: 'giovanni-village',
    name: 'Giovanni Village',
    tagline: 'Luxury Wildlife Resort',
    description:
      'Ten acres on the edge of Ratapani Tiger Reserve — forest-view suites, plunge pools, and the wedding of a lifetime.',
    location: 'Ratapani, Bhopal',
    href: '/',
    image: '/images/hero/hero-1.webp',
  },
  {
    id: 'royalton-farms',
    name: 'Royalton Farms',
    tagline: 'Organic Farm',
    description:
      'The working organic farm inside the estate — fields, dairy, henhouse and orchards that quietly supply the kitchens.',
    location: 'Inside the estate',
    href: '/royalton',
    image: '/images/experiences/farm-produce.webp',
  },
  {
    id: 'giovanni-house',
    name: 'Giovanni House',
    tagline: 'Boutique Home Stay',
    description:
      'Eight king suites in the leafiest pocket of Arera Colony — perfect for the short business trip or the night before a wedding.',
    location: 'E-4, Arera Colony, Bhopal',
    // Now its own standalone site on its custom domain.
    href: 'https://house.giovanniboutique.com',
    external: true,
    image: '/images/city-stays/house/cover.webp',
  },
  {
    id: 'giovanni-suites',
    name: 'Giovanni Suites',
    tagline: 'Boutique Home Stay',
    description:
      'Four rooms named for the trees and colours of central India — Amaltas, Gulmohar, Razz, Rangrez. Long weekends, family visits, wedding-guest stays.',
    location: 'E-8, Arera Colony, Bhopal',
    // Now its own standalone site on its custom domain.
    href: 'https://suites.giovanniboutique.com',
    external: true,
    image: '/images/city-stays/suites/cover.webp',
  },
  {
    id: 'giovanni-boutique',
    name: 'Giovanni Boutique',
    tagline: 'Premium Furniture Studio',
    description:
      'Hand-finished furniture, the same eye for craft that shapes every Giovanni room. A standalone studio — website on the way.',
    image: '/images/sister-properties/giovanni-boutique.png',
    isLogo: true,
  },
];

/** Convenience: brands shown on the home page (everywhere except Giovanni Village). */
export const HOME_PAGE_BRANDS = BRANDS.filter((b) => b.id !== 'giovanni-village');
