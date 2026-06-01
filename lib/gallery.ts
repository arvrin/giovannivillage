// Gallery manifest. To regenerate from disk, run /tmp/build-manifest.sh from
// the project root after adding/removing images under public/images.
// Last manual edit: 2026-05-28

import type { GalleryItem } from './gallery-types';

export const galleryItems: GalleryItem[] = [
  // ────────────────────────────────────────────────────────── Estate
  { id: 'estate-aerial', src: '/images/hero/hero-1.webp', width: 1920, height: 1080, category: 'Estate', title: 'Aerial of the estate', priority: true },
  { id: 'estate-mango-groves', src: '/images/about/landscape-1.webp', width: 1920, height: 1080, category: 'Estate', title: 'Mango groves', priority: true },
  { id: 'estate-lily-ponds', src: '/images/about/landscape-2.webp', width: 1920, height: 1080, category: 'Estate', title: 'Lily ponds', priority: true },
  { id: 'estate-lakeside-path', src: '/images/about/landscape-3.webp', width: 1920, height: 1080, category: 'Estate', title: 'Lakeside path' },
  { id: 'estate-gates', src: '/images/about/about-hero-original.webp', width: 1440, height: 960, category: 'Estate', title: 'The Giovanni gates' },
  { id: 'estate-golden-hour', src: '/images/hero/landscape-2.webp', width: 1920, height: 1080, category: 'Estate', title: 'Golden hour over the groves' },
  { id: 'estate-first-light', src: '/images/hero/landscape-3.webp', width: 1920, height: 1080, category: 'Estate', title: 'Forest at first light' },
  { id: 'estate-at-rest', src: '/images/hero/recent.webp', width: 1280, height: 720, category: 'Estate', title: 'The estate at rest' },
  { id: 'estate-forest-line', src: '/images/experiences/landscapes/57.webp', width: 1920, height: 900, category: 'Estate', title: 'Forest line' },
  { id: 'estate-open-lawns', src: '/images/experiences/landscapes/landscape-2509.webp', width: 1920, height: 1080, category: 'Estate', title: 'Open lawns' },
  { id: 'estate-spa-courtyard', src: '/images/experiences/landscapes/spa-landscape.webp', width: 1920, height: 1080, category: 'Estate', title: 'Spa courtyard' },
  { id: 'estate-farm-harvest', src: '/images/experiences/farm-produce.webp', width: 1920, height: 900, category: 'Estate', title: 'Farm-fresh harvest' },
  { id: 'estate-wellness-gardens', src: '/images/_library/homepage-tiles/wellness-landscape.webp', width: 1920, height: 1080, category: 'Estate', title: 'Wellness gardens' },

  // ────────────────────────────────────────────────────────── Rooms — hero shots
  { id: 'room-king-pool-garden', src: '/images/rooms/king-pool-garden.webp', width: 800, height: 534, category: 'Rooms', title: 'King Room — Pool & Garden', priority: true },
  { id: 'room-king-private-garden', src: '/images/rooms/king-private-garden.webp', width: 800, height: 1199, category: 'Rooms', title: 'King Room — Private Garden', priority: true },
  { id: 'room-junior-deck-garden', src: '/images/rooms/junior-deck-garden.webp', width: 889, height: 500, category: 'Rooms', title: 'Junior Suite — Deck & Garden', priority: true },
  { id: 'room-junior-deck-private', src: '/images/rooms/junior-deck-private.webp', width: 889, height: 500, category: 'Rooms', title: 'Junior Suite — Private Deck' },
  { id: 'room-junior-bath-tub', src: '/images/rooms/junior-bath-tub.webp', width: 888, height: 500, category: 'Rooms', title: 'Junior Suite — Open-to-Sky Bath' },
  { id: 'room-master-bath-tub', src: '/images/rooms/master-bath-tub.webp', width: 800, height: 534, category: 'Rooms', title: 'Master Suite — Open-to-Sky Bath' },
  { id: 'room-junior-plunge-pool', src: '/images/rooms/junior-plunge-pool.webp', width: 888, height: 500, category: 'Rooms', title: 'Junior Suite — Plunge Pool' },
  { id: 'room-royal-suite', src: '/images/rooms/royal-suite.webp', width: 800, height: 533, category: 'Rooms', title: 'Royal Suite — Plunge Pool' },

  // ────────────────────────────────────────────────────────── Rooms — King Room Pool & Garden interiors
  { id: 'king-pool-garden-01', src: '/images/rooms/_galleries/king-pool-garden/01.webp', width: 800, height: 534, category: 'Rooms', title: 'King Pool & Garden — interior' },
  { id: 'king-pool-garden-02', src: '/images/rooms/_galleries/king-pool-garden/02.webp', width: 800, height: 1199, category: 'Rooms', title: 'King Pool & Garden — interior' },
  { id: 'king-pool-garden-03', src: '/images/rooms/_galleries/king-pool-garden/03.webp', width: 800, height: 533, category: 'Rooms', title: 'King Pool & Garden — interior' },
  { id: 'king-pool-garden-04', src: '/images/rooms/_galleries/king-pool-garden/04.webp', width: 800, height: 910, category: 'Rooms', title: 'King Pool & Garden — interior' },
  { id: 'king-pool-garden-05', src: '/images/rooms/_galleries/king-pool-garden/05.webp', width: 800, height: 1199, category: 'Rooms', title: 'King Pool & Garden — interior' },
  { id: 'king-pool-garden-06', src: '/images/rooms/_galleries/king-pool-garden/06.webp', width: 800, height: 533, category: 'Rooms', title: 'King Pool & Garden — interior' },
  { id: 'king-pool-garden-07', src: '/images/rooms/_galleries/king-pool-garden/07.webp', width: 800, height: 1200, category: 'Rooms', title: 'King Pool & Garden — interior' },
  { id: 'king-pool-garden-08', src: '/images/rooms/_galleries/king-pool-garden/08.webp', width: 888, height: 500, category: 'Rooms', title: 'King Pool & Garden — interior' },
  { id: 'king-pool-garden-09', src: '/images/rooms/_galleries/king-pool-garden/09.webp', width: 889, height: 500, category: 'Rooms', title: 'King Pool & Garden — interior' },
  { id: 'king-pool-garden-10', src: '/images/rooms/_galleries/king-pool-garden/10.webp', width: 889, height: 500, category: 'Rooms', title: 'King Pool & Garden — interior' },

  // ────────────────────────────────────────────────────────── Rooms — King Private Garden interiors
  { id: 'king-private-garden-01', src: '/images/rooms/_galleries/king-private-garden/01.webp', width: 800, height: 1199, category: 'Rooms', title: 'King Private Garden — interior' },
  { id: 'king-private-garden-02', src: '/images/rooms/_galleries/king-private-garden/02.webp', width: 800, height: 533, category: 'Rooms', title: 'King Private Garden — interior' },
  { id: 'king-private-garden-03', src: '/images/rooms/_galleries/king-private-garden/03.webp', width: 800, height: 534, category: 'Rooms', title: 'King Private Garden — interior' },
  { id: 'king-private-garden-04', src: '/images/rooms/_galleries/king-private-garden/04.webp', width: 800, height: 1199, category: 'Rooms', title: 'King Private Garden — interior' },
  { id: 'king-private-garden-05', src: '/images/rooms/_galleries/king-private-garden/05.webp', width: 800, height: 1421, category: 'Rooms', title: 'King Private Garden — interior' },
  { id: 'king-private-garden-06', src: '/images/rooms/_galleries/king-private-garden/06.webp', width: 800, height: 533, category: 'Rooms', title: 'King Private Garden — interior' },
  { id: 'king-private-garden-07', src: '/images/rooms/_galleries/king-private-garden/07.webp', width: 800, height: 533, category: 'Rooms', title: 'King Private Garden — interior' },

  // ────────────────────────────────────────────────────────── Rooms — Junior Deck Garden interiors
  { id: 'junior-deck-garden-01', src: '/images/rooms/_galleries/junior-deck-garden/01.webp', width: 889, height: 500, category: 'Rooms', title: 'Junior Deck & Garden — interior' },
  { id: 'junior-deck-garden-02', src: '/images/rooms/_galleries/junior-deck-garden/02.webp', width: 889, height: 500, category: 'Rooms', title: 'Junior Deck & Garden — interior' },
  { id: 'junior-deck-garden-03', src: '/images/rooms/_galleries/junior-deck-garden/03.webp', width: 800, height: 534, category: 'Rooms', title: 'Junior Deck & Garden — interior' },
  { id: 'junior-deck-garden-04', src: '/images/rooms/_galleries/junior-deck-garden/04.webp', width: 889, height: 500, category: 'Rooms', title: 'Junior Deck & Garden — interior' },
  { id: 'junior-deck-garden-05', src: '/images/rooms/_galleries/junior-deck-garden/05.webp', width: 889, height: 500, category: 'Rooms', title: 'Junior Deck & Garden — interior' },
  { id: 'junior-deck-garden-06', src: '/images/rooms/_galleries/junior-deck-garden/06.webp', width: 800, height: 533, category: 'Rooms', title: 'Junior Deck & Garden — interior' },
  { id: 'junior-deck-garden-07', src: '/images/rooms/_galleries/junior-deck-garden/07.webp', width: 800, height: 533, category: 'Rooms', title: 'Junior Deck & Garden — interior' },
  { id: 'junior-deck-garden-08', src: '/images/rooms/_galleries/junior-deck-garden/08.webp', width: 800, height: 533, category: 'Rooms', title: 'Junior Deck & Garden — interior' },
  { id: 'junior-deck-garden-09', src: '/images/rooms/_galleries/junior-deck-garden/09.webp', width: 800, height: 533, category: 'Rooms', title: 'Junior Deck & Garden — interior' },

  // ────────────────────────────────────────────────────────── Rooms — Junior Deck Private interiors
  { id: 'junior-deck-private-01', src: '/images/rooms/_galleries/junior-deck-private/01.webp', width: 889, height: 500, category: 'Rooms', title: 'Junior Private Deck — interior' },
  { id: 'junior-deck-private-02', src: '/images/rooms/_galleries/junior-deck-private/02.webp', width: 800, height: 533, category: 'Rooms', title: 'Junior Private Deck — interior' },
  { id: 'junior-deck-private-03', src: '/images/rooms/_galleries/junior-deck-private/03.webp', width: 889, height: 500, category: 'Rooms', title: 'Junior Private Deck — interior' },
  { id: 'junior-deck-private-04', src: '/images/rooms/_galleries/junior-deck-private/04.webp', width: 800, height: 1421, category: 'Rooms', title: 'Junior Private Deck — interior' },
  { id: 'junior-deck-private-05', src: '/images/rooms/_galleries/junior-deck-private/05.webp', width: 889, height: 500, category: 'Rooms', title: 'Junior Private Deck — interior' },
  { id: 'junior-deck-private-06', src: '/images/rooms/_galleries/junior-deck-private/06.webp', width: 889, height: 500, category: 'Rooms', title: 'Junior Private Deck — interior' },
  { id: 'junior-deck-private-07', src: '/images/rooms/_galleries/junior-deck-private/07.webp', width: 800, height: 533, category: 'Rooms', title: 'Junior Private Deck — interior' },

  // ────────────────────────────────────────────────────────── Rooms — Junior Bath Tub interiors
  { id: 'junior-bath-tub-01', src: '/images/rooms/_galleries/junior-bath-tub/01.webp', width: 888, height: 500, category: 'Rooms', title: 'Junior Open-to-Sky Bath — interior' },
  { id: 'junior-bath-tub-02', src: '/images/rooms/_galleries/junior-bath-tub/02.webp', width: 800, height: 1421, category: 'Rooms', title: 'Junior Open-to-Sky Bath — interior' },
  { id: 'junior-bath-tub-03', src: '/images/rooms/_galleries/junior-bath-tub/03.webp', width: 888, height: 500, category: 'Rooms', title: 'Junior Open-to-Sky Bath — interior' },
  { id: 'junior-bath-tub-04', src: '/images/rooms/_galleries/junior-bath-tub/04.webp', width: 888, height: 500, category: 'Rooms', title: 'Junior Open-to-Sky Bath — interior' },
  { id: 'junior-bath-tub-05', src: '/images/rooms/_galleries/junior-bath-tub/05.webp', width: 888, height: 500, category: 'Rooms', title: 'Junior Open-to-Sky Bath — interior' },
  { id: 'junior-bath-tub-06', src: '/images/rooms/_galleries/junior-bath-tub/06.webp', width: 888, height: 500, category: 'Rooms', title: 'Junior Open-to-Sky Bath — interior' },
  { id: 'junior-bath-tub-07', src: '/images/rooms/_galleries/junior-bath-tub/07.webp', width: 800, height: 1421, category: 'Rooms', title: 'Junior Open-to-Sky Bath — interior' },

  // ────────────────────────────────────────────────────────── Rooms — Master Bath Tub interiors
  { id: 'master-bath-tub-01', src: '/images/rooms/_galleries/master-bath-tub/01.webp', width: 800, height: 534, category: 'Rooms', title: 'Master Bath — interior' },
  { id: 'master-bath-tub-02', src: '/images/rooms/_galleries/master-bath-tub/02.webp', width: 800, height: 1421, category: 'Rooms', title: 'Master Bath — interior' },
  { id: 'master-bath-tub-03', src: '/images/rooms/_galleries/master-bath-tub/03.webp', width: 800, height: 534, category: 'Rooms', title: 'Master Bath — interior' },
  { id: 'master-bath-tub-04', src: '/images/rooms/_galleries/master-bath-tub/04.webp', width: 888, height: 500, category: 'Rooms', title: 'Master Bath — interior' },
  { id: 'master-bath-tub-05', src: '/images/rooms/_galleries/master-bath-tub/05.webp', width: 888, height: 500, category: 'Rooms', title: 'Master Bath — interior' },
  { id: 'master-bath-tub-06', src: '/images/rooms/_galleries/master-bath-tub/06.webp', width: 800, height: 533, category: 'Rooms', title: 'Master Bath — interior' },
  { id: 'master-bath-tub-07', src: '/images/rooms/_galleries/master-bath-tub/07.webp', width: 800, height: 533, category: 'Rooms', title: 'Master Bath — interior' },
  { id: 'master-bath-tub-08', src: '/images/rooms/_galleries/master-bath-tub/08.webp', width: 888, height: 500, category: 'Rooms', title: 'Master Bath — interior' },
  { id: 'master-bath-tub-09', src: '/images/rooms/_galleries/master-bath-tub/09.webp', width: 888, height: 500, category: 'Rooms', title: 'Master Bath — interior' },
  { id: 'master-bath-tub-10', src: '/images/rooms/_galleries/master-bath-tub/10.webp', width: 800, height: 533, category: 'Rooms', title: 'Master Bath — interior' },

  // ────────────────────────────────────────────────────────── Rooms — Junior Plunge Pool interiors
  { id: 'junior-plunge-pool-01', src: '/images/rooms/_galleries/junior-plunge-pool/01.webp', width: 888, height: 500, category: 'Rooms', title: 'Junior Plunge Pool — interior' },
  { id: 'junior-plunge-pool-02', src: '/images/rooms/_galleries/junior-plunge-pool/02.webp', width: 888, height: 500, category: 'Rooms', title: 'Junior Plunge Pool — interior' },
  { id: 'junior-plunge-pool-03', src: '/images/rooms/_galleries/junior-plunge-pool/03.webp', width: 888, height: 500, category: 'Rooms', title: 'Junior Plunge Pool — interior' },
  { id: 'junior-plunge-pool-04', src: '/images/rooms/_galleries/junior-plunge-pool/04.webp', width: 888, height: 500, category: 'Rooms', title: 'Junior Plunge Pool — interior' },
  { id: 'junior-plunge-pool-05', src: '/images/rooms/_galleries/junior-plunge-pool/05.webp', width: 800, height: 1199, category: 'Rooms', title: 'Junior Plunge Pool — interior' },
  { id: 'junior-plunge-pool-06', src: '/images/rooms/_galleries/junior-plunge-pool/06.webp', width: 889, height: 500, category: 'Rooms', title: 'Junior Plunge Pool — interior' },

  // ────────────────────────────────────────────────────────── Rooms — Royal Suite interiors
  { id: 'royal-suite-01', src: '/images/rooms/_galleries/royal-suite/01.webp', width: 800, height: 533, category: 'Rooms', title: 'Royal Suite — interior' },
  { id: 'royal-suite-02', src: '/images/rooms/_galleries/royal-suite/02.webp', width: 800, height: 533, category: 'Rooms', title: 'Royal Suite — interior' },
  { id: 'royal-suite-03', src: '/images/rooms/_galleries/royal-suite/03.webp', width: 889, height: 500, category: 'Rooms', title: 'Royal Suite — interior' },
  { id: 'royal-suite-04', src: '/images/rooms/_galleries/royal-suite/04.webp', width: 800, height: 1421, category: 'Rooms', title: 'Royal Suite — interior' },
  { id: 'royal-suite-05', src: '/images/rooms/_galleries/royal-suite/05.webp', width: 800, height: 533, category: 'Rooms', title: 'Royal Suite — interior' },
  { id: 'royal-suite-06', src: '/images/rooms/_galleries/royal-suite/06.webp', width: 800, height: 533, category: 'Rooms', title: 'Royal Suite — interior' },
  { id: 'royal-suite-07', src: '/images/rooms/_galleries/royal-suite/07.webp', width: 888, height: 500, category: 'Rooms', title: 'Royal Suite — interior' },
  { id: 'royal-suite-08', src: '/images/rooms/_galleries/royal-suite/08.webp', width: 800, height: 533, category: 'Rooms', title: 'Royal Suite — interior' },
  { id: 'royal-suite-09', src: '/images/rooms/_galleries/royal-suite/09.webp', width: 800, height: 1421, category: 'Rooms', title: 'Royal Suite — interior' },

  // ────────────────────────────────────────────────────────── Kitchens
  { id: 'kitchen-gourmet-by-the-woods', src: '/images/dining/gourmet-by-the-woods.webp', width: 1920, height: 1080, category: 'Kitchens', title: 'Gourmet By The Woods' },
  { id: 'kitchen-pihu', src: '/images/dining/pihu.webp', width: 1920, height: 1080, category: 'Kitchens', title: 'Pihu — Rooftop' },
  { id: 'kitchen-gazebo-by-the-lake', src: '/images/weddings/lakeside-deck.webp', width: 1920, height: 1080, category: 'Kitchens', title: 'Gazebo by the Lake' },

  // ────────────────────────────────────────────────────────── Spa
  { id: 'spa-still-life', src: '/images/spa/spa-still-life.webp', width: 1920, height: 900, category: 'Spa', title: 'Elysium Spa — Oils & Stones' },
  { id: 'spa-stones', src: '/images/spa/spa-stones.webp', width: 1920, height: 900, category: 'Spa', title: 'Elysium Spa — Hot Stones' },

  // ────────────────────────────────────────────────────────── Weddings & Events
  { id: 'wedding-aria-grand-hall', src: '/images/weddings/aria-grand-hall.webp', width: 1920, height: 1080, category: 'Weddings', title: 'Aria Grand Hall' },
  { id: 'wedding-sudesh-lawns', src: '/images/weddings/sudesh-lawns.webp', width: 2000, height: 1120, category: 'Weddings', title: 'Sudesh Lawns' },
  { id: 'wedding-the-forum', src: '/images/weddings/the-forum.webp', width: 1280, height: 853, category: 'Weddings', title: 'The Forum' },
  { id: 'wedding-cocktail-lawn', src: '/images/weddings/cocktail-lawn.webp', width: 1152, height: 730, category: 'Weddings', title: 'Cocktail Lawn' },
  { id: 'wedding-lakeside-deck', src: '/images/weddings/lakeside-deck.webp', width: 1920, height: 1080, category: 'Weddings', title: 'Lakeside Deck' },
  { id: 'wedding-gourmet-lawn', src: '/images/weddings/gourmet-lawn.webp', width: 1024, height: 576, category: 'Weddings', title: 'Gourmet Lawn — Dinner setup' },
  { id: 'wedding-gourmet-lawn-2', src: '/images/weddings/gourmet-lawn-2.webp', width: 436, height: 360, category: 'Weddings', title: 'Gourmet Lawn — Reception' },
  { id: 'wedding-gourmet-lawn-3', src: '/images/weddings/gourmet-lawn-3.webp', width: 497, height: 288, category: 'Weddings', title: 'Gourmet Lawn — Evening' },
  { id: 'wedding-poolside-aerial', src: '/images/weddings/poolside-aerial.webp', width: 1348, height: 752, category: 'Weddings', title: 'Poolside — Aerial' },
  { id: 'wedding-poolside-pool', src: '/images/weddings/poolside-pool.webp', width: 512, height: 512, category: 'Weddings', title: 'Poolside — Pool view' },
  { id: 'wedding-poolside-2', src: '/images/weddings/poolside-2.webp', width: 592, height: 308, category: 'Weddings', title: 'Poolside — Cocktails' },
  { id: 'wedding-poolside-3', src: '/images/weddings/poolside-3.webp', width: 591, height: 449, category: 'Weddings', title: 'Poolside — Setup' },
  { id: 'wedding-aria-mandap', src: '/images/_library/wedding-tiles/aria-4.webp', width: 512, height: 512, category: 'Weddings', title: 'Aria — Mandap' },
  { id: 'wedding-reception-details', src: '/images/_library/wedding-tiles/event-1.webp', width: 512, height: 512, category: 'Weddings', title: 'Reception details' },
  { id: 'wedding-forum-setup', src: '/images/_library/wedding-tiles/forum-1.webp', width: 512, height: 512, category: 'Weddings', title: 'The Forum — Setup' },
  { id: 'wedding-forum-banquet', src: '/images/_library/wedding-tiles/forum-2.webp', width: 512, height: 512, category: 'Weddings', title: 'The Forum — Banquet' },

  // ────────────────────────────────────────────────────────── The Wild
  { id: 'wild-tiger-face', src: '/images/experiences/wildlife/tiger-face.webp', width: 1920, height: 900, category: 'Wild', title: 'Tiger of Ratapani' },
  { id: 'wild-tiger-log', src: '/images/experiences/wildlife/tiger-log.webp', width: 1920, height: 900, category: 'Wild', title: 'Tiger at rest' },
  { id: 'wild-elephants', src: '/images/experiences/wildlife/safari-elephants.webp', width: 1920, height: 900, category: 'Wild', title: 'Elephants of Ratapani' },
  { id: 'wild-safari-jeep', src: '/images/experiences/safari-jeep.webp', width: 1920, height: 1081, category: 'Wild', title: 'The Giovanni safari jeep' },

  // ────────────────────────────────────────────────────────── Films (ambient videos)
  { id: 'film-hero-aerial', src: '/videos/hero-aerial.mp4', width: 1920, height: 1080, category: 'Films', title: 'The estate from above', type: 'video', poster: '/images/hero/hero-1.webp' },
  { id: 'film-suite-reveal', src: '/videos/suite-reveal.mp4', width: 1920, height: 1080, category: 'Films', title: 'Inside a Junior Suite', type: 'video', poster: '/images/rooms/junior-plunge-pool.webp' },
  { id: 'film-golden-lawn', src: '/videos/golden-lawn.mp4', width: 1920, height: 1080, category: 'Films', title: 'Golden hour on the lawn', type: 'video', poster: '/images/weddings/cocktail-lawn.webp' },
  { id: 'film-twilight-path', src: '/videos/twilight-path.mp4', width: 1920, height: 1080, category: 'Films', title: 'Estate at twilight', type: 'video', poster: '/images/about/landscape-3.webp' },
  { id: 'film-estate-pool', src: '/videos/estate-pool.mp4', width: 1920, height: 1080, category: 'Films', title: 'The estate pool', type: 'video', poster: '/images/weddings/poolside-aerial.webp' },
  { id: 'film-evening-lounge', src: '/videos/evening-lounge.mp4', width: 1920, height: 1080, category: 'Films', title: 'Evenings indoors', type: 'video', poster: '/images/weddings/cocktail-lawn.webp' },
  { id: 'film-dining-arrival', src: '/videos/dining-arrival.mp4', width: 1920, height: 1080, category: 'Films', title: 'Dinner on arrival', type: 'video', poster: '/images/dining/gourmet-by-the-woods.webp' },
];

/** Count of items per category, computed once at module load */
export const categoryCounts = galleryItems.reduce(
  (acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  },
  {} as Record<string, number>,
);
