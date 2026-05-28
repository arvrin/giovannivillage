export type GalleryCategory =
  | 'Estate'
  | 'Rooms'
  | 'Kitchens'
  | 'Spa'
  | 'Weddings'
  | 'Wild'
  | 'Films';

export interface GalleryItem {
  id: string;
  src: string;
  width: number;
  height: number;
  category: GalleryCategory;
  title: string;
  /** Optional second-line caption shown in the lightbox */
  caption?: string;
  /** Force `priority` on the Image, for top-of-page LCP candidates */
  priority?: boolean;
  /** Defaults to `'image'` */
  type?: 'image' | 'video';
  /** Required for `type === 'video'` — the still rendered in the grid */
  poster?: string;
}

export const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  Estate: 'The Estate',
  Rooms: 'The Rooms',
  Kitchens: 'The Kitchens',
  Spa: 'The Spa',
  Weddings: 'Weddings & Events',
  Wild: 'The Wild',
  Films: 'Films',
};

export const CATEGORY_ORDER: GalleryCategory[] = [
  'Estate',
  'Rooms',
  'Kitchens',
  'Spa',
  'Weddings',
  'Wild',
  'Films',
];
