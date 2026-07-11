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
  { id: 'estate-farm-harvest', src: '/images/experiences/farm-produce.webp', width: 1920, height: 900, category: 'Estate', title: 'Farm-fresh harvest' },
  { id: 'estate-lakeside-pergola', src: '/images/_library/scraped/lakeside-pergola.webp', width: 1920, height: 1080, category: 'Estate', title: 'Lakeside pergola' },
  { id: 'estate-lily-pond-pergola', src: '/images/_library/scraped/lily-pond-pergola.webp', width: 1920, height: 1081, category: 'Estate', title: 'The lily pond' },
  { id: 'estate-dining-deck', src: '/images/_library/scraped/dining-deck-exterior.webp', width: 1920, height: 1281, category: 'Estate', title: 'Dining deck at golden hour' },
  { id: 'estate-lounge-armchairs', src: '/images/_library/scraped/lounge-blue-armchairs.webp', width: 1067, height: 1600, category: 'Estate', title: 'Lounge by the gardens' },
  { id: 'estate-royalton-field', src: '/images/royalton/farm-2.webp', width: 1600, height: 1200, category: 'Estate', title: 'Royalton Farms — the fields' },
  { id: 'estate-royalton-harvest-2', src: '/images/royalton/farm-1.webp', width: 1600, height: 1200, category: 'Estate', title: 'Royalton Farms — the harvest' },
  { id: 'estate-lakeside-fishing', src: '/images/experiences/lakeside-fishing.webp', width: 1032, height: 1280, category: 'Estate', title: 'Fishing by the lily pond' },
  { id: 'estate-open-air-theatre', src: '/images/experiences/open-air-theatre.webp', width: 1280, height: 853, category: 'Estate', title: 'The open-air theatre, after dark' },

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
  { id: 'king-pool-garden-02', src: '/images/rooms/_galleries/king-pool-garden/02.webp', width: 800, height: 1199, category: 'Rooms', title: 'King Pool & Garden — interior' },
  { id: 'king-pool-garden-03', src: '/images/rooms/_galleries/king-pool-garden/03.webp', width: 800, height: 533, category: 'Rooms', title: 'King Pool & Garden — interior' },
  { id: 'king-pool-garden-04', src: '/images/rooms/_galleries/king-pool-garden/04.webp', width: 800, height: 910, category: 'Rooms', title: 'King Pool & Garden — interior' },
  { id: 'king-pool-garden-06', src: '/images/rooms/_galleries/king-pool-garden/06.webp', width: 800, height: 533, category: 'Rooms', title: 'King Pool & Garden — interior' },
  { id: 'king-pool-garden-07', src: '/images/rooms/_galleries/king-pool-garden/07.webp', width: 800, height: 1200, category: 'Rooms', title: 'King Pool & Garden — interior' },
  { id: 'king-pool-garden-08', src: '/images/rooms/_galleries/king-pool-garden/08.webp', width: 888, height: 500, category: 'Rooms', title: 'King Pool & Garden — interior' },
  { id: 'king-pool-garden-09', src: '/images/rooms/_galleries/king-pool-garden/09.webp', width: 889, height: 500, category: 'Rooms', title: 'King Pool & Garden — interior' },
  { id: 'king-pool-garden-10', src: '/images/rooms/_galleries/king-pool-garden/10.webp', width: 889, height: 500, category: 'Rooms', title: 'King Pool & Garden — interior' },

  // ────────────────────────────────────────────────────────── Rooms — King Private Garden interiors
  { id: 'king-private-garden-02', src: '/images/rooms/_galleries/king-private-garden/02.webp', width: 800, height: 533, category: 'Rooms', title: 'King Private Garden — interior' },
  { id: 'king-private-garden-05', src: '/images/rooms/_galleries/king-private-garden/05.webp', width: 800, height: 1421, category: 'Rooms', title: 'King Private Garden — interior' },

  // ────────────────────────────────────────────────────────── Rooms — Junior Deck Garden interiors
  { id: 'junior-deck-garden-02', src: '/images/rooms/_galleries/junior-deck-garden/02.webp', width: 889, height: 500, category: 'Rooms', title: 'Junior Deck & Garden — interior' },
  { id: 'junior-deck-garden-03', src: '/images/rooms/_galleries/junior-deck-garden/03.webp', width: 800, height: 534, category: 'Rooms', title: 'Junior Deck & Garden — interior' },
  { id: 'junior-deck-garden-04', src: '/images/rooms/_galleries/junior-deck-garden/04.webp', width: 889, height: 500, category: 'Rooms', title: 'Junior Deck & Garden — interior' },
  { id: 'junior-deck-garden-06', src: '/images/rooms/_galleries/junior-deck-garden/06.webp', width: 800, height: 533, category: 'Rooms', title: 'Junior Deck & Garden — interior' },
  { id: 'junior-deck-garden-07', src: '/images/rooms/_galleries/junior-deck-garden/07.webp', width: 800, height: 533, category: 'Rooms', title: 'Junior Deck & Garden — interior' },
  { id: 'junior-deck-garden-08', src: '/images/rooms/_galleries/junior-deck-garden/08.webp', width: 800, height: 533, category: 'Rooms', title: 'Junior Deck & Garden — interior' },
  { id: 'junior-deck-garden-09', src: '/images/rooms/_galleries/junior-deck-garden/09.webp', width: 800, height: 533, category: 'Rooms', title: 'Junior Deck & Garden — interior' },

  // ────────────────────────────────────────────────────────── Rooms — Junior Deck Private interiors
  { id: 'junior-deck-private-02', src: '/images/rooms/_galleries/junior-deck-private/02.webp', width: 800, height: 533, category: 'Rooms', title: 'Junior Private Deck — interior' },
  { id: 'junior-deck-private-03', src: '/images/rooms/_galleries/junior-deck-private/03.webp', width: 889, height: 500, category: 'Rooms', title: 'Junior Private Deck — interior' },
  { id: 'junior-deck-private-06', src: '/images/rooms/_galleries/junior-deck-private/06.webp', width: 889, height: 500, category: 'Rooms', title: 'Junior Private Deck — interior' },
  { id: 'junior-deck-private-07', src: '/images/rooms/_galleries/junior-deck-private/07.webp', width: 800, height: 533, category: 'Rooms', title: 'Junior Private Deck — interior' },

  // ────────────────────────────────────────────────────────── Rooms — Junior Bath Tub interiors
  { id: 'junior-bath-tub-02', src: '/images/rooms/_galleries/junior-bath-tub/02.webp', width: 800, height: 1421, category: 'Rooms', title: 'Junior Open-to-Sky Bath — interior' },
  { id: 'junior-bath-tub-04', src: '/images/rooms/_galleries/junior-bath-tub/04.webp', width: 888, height: 500, category: 'Rooms', title: 'Junior Open-to-Sky Bath — interior' },
  { id: 'junior-bath-tub-05', src: '/images/rooms/_galleries/junior-bath-tub/05.webp', width: 888, height: 500, category: 'Rooms', title: 'Junior Open-to-Sky Bath — interior' },
  { id: 'junior-bath-tub-06', src: '/images/rooms/_galleries/junior-bath-tub/06.webp', width: 888, height: 500, category: 'Rooms', title: 'Junior Open-to-Sky Bath — interior' },
  { id: 'junior-bath-tub-07', src: '/images/rooms/_galleries/junior-bath-tub/07.webp', width: 800, height: 1421, category: 'Rooms', title: 'Junior Open-to-Sky Bath — interior' },

  // ────────────────────────────────────────────────────────── Rooms — Master Bath Tub interiors
  { id: 'master-bath-tub-03', src: '/images/rooms/_galleries/master-bath-tub/03.webp', width: 800, height: 534, category: 'Rooms', title: 'Master Bath — interior' },
  { id: 'master-bath-tub-04', src: '/images/rooms/_galleries/master-bath-tub/04.webp', width: 888, height: 500, category: 'Rooms', title: 'Master Bath — interior' },
  { id: 'master-bath-tub-06', src: '/images/rooms/_galleries/master-bath-tub/06.webp', width: 800, height: 533, category: 'Rooms', title: 'Master Bath — interior' },
  { id: 'master-bath-tub-07', src: '/images/rooms/_galleries/master-bath-tub/07.webp', width: 800, height: 533, category: 'Rooms', title: 'Master Bath — interior' },
  { id: 'master-bath-tub-08', src: '/images/rooms/_galleries/master-bath-tub/08.webp', width: 888, height: 500, category: 'Rooms', title: 'Master Bath — interior' },
  { id: 'master-bath-tub-09', src: '/images/rooms/_galleries/master-bath-tub/09.webp', width: 888, height: 500, category: 'Rooms', title: 'Master Bath — interior' },
  { id: 'master-bath-tub-10', src: '/images/rooms/_galleries/master-bath-tub/10.webp', width: 800, height: 533, category: 'Rooms', title: 'Master Bath — interior' },

  // ────────────────────────────────────────────────────────── Rooms — Junior Plunge Pool interiors
  { id: 'junior-plunge-pool-02', src: '/images/rooms/_galleries/junior-plunge-pool/02.webp', width: 888, height: 500, category: 'Rooms', title: 'Junior Plunge Pool — interior' },
  { id: 'junior-plunge-pool-03', src: '/images/rooms/_galleries/junior-plunge-pool/03.webp', width: 888, height: 500, category: 'Rooms', title: 'Junior Plunge Pool — interior' },
  { id: 'junior-plunge-pool-05', src: '/images/rooms/_galleries/junior-plunge-pool/05.webp', width: 800, height: 1199, category: 'Rooms', title: 'Junior Plunge Pool — interior' },
  { id: 'junior-plunge-pool-06', src: '/images/rooms/_galleries/junior-plunge-pool/06.webp', width: 889, height: 500, category: 'Rooms', title: 'Junior Plunge Pool — interior' },

  // ────────────────────────────────────────────────────────── Rooms — Royal Suite interiors
  { id: 'royal-suite-02', src: '/images/rooms/_galleries/royal-suite/02.webp', width: 800, height: 533, category: 'Rooms', title: 'Royal Suite — interior' },
  { id: 'royal-suite-03', src: '/images/rooms/_galleries/royal-suite/03.webp', width: 889, height: 500, category: 'Rooms', title: 'Royal Suite — interior' },
  { id: 'royal-suite-05', src: '/images/rooms/_galleries/royal-suite/05.webp', width: 800, height: 533, category: 'Rooms', title: 'Royal Suite — interior' },
  { id: 'royal-suite-06', src: '/images/rooms/_galleries/royal-suite/06.webp', width: 800, height: 533, category: 'Rooms', title: 'Royal Suite — interior' },
  { id: 'royal-suite-07', src: '/images/rooms/_galleries/royal-suite/07.webp', width: 888, height: 500, category: 'Rooms', title: 'Royal Suite — interior' },
  { id: 'royal-suite-08', src: '/images/rooms/_galleries/royal-suite/08.webp', width: 800, height: 533, category: 'Rooms', title: 'Royal Suite — interior' },
  { id: 'room-open-sky-bath-overhead', src: '/images/_library/scraped/open-sky-bath-overhead.webp', width: 1080, height: 1919, category: 'Rooms', title: 'Open-to-sky bath — overhead' },

  // ────────────────────────────────────────────────────────── Kitchens
  { id: 'kitchen-gourmet-by-the-woods', src: '/images/dining/gourmet-1.webp', width: 1440, height: 1920, category: 'Kitchens', title: 'Gourmet By The Woods' },
  { id: 'kitchen-gourmet-room', src: '/images/dining/gourmet-room-2026.webp', width: 1600, height: 1067, category: 'Kitchens', title: 'Gourmet By The Woods — the room' },
  { id: 'kitchen-gourmet-signage', src: '/images/dining/gourmet-signage.webp', width: 1280, height: 853, category: 'Kitchens', title: 'Gourmet By The Woods — the courtyard' },
  { id: 'kitchen-gourmet-buffet', src: '/images/dining/gourmet-buffet.webp', width: 1280, height: 576, category: 'Kitchens', title: 'The morning buffet at Gourmet' },
  { id: 'kitchen-gourmet-neon-nook', src: '/images/dining/gourmet-neon-nook.webp', width: 1280, height: 853, category: 'Kitchens', title: 'Let’s drink, let’s eat, let’s talk' },
  { id: 'kitchen-private-dining-room', src: '/images/dining/private-dining-room.webp', width: 1600, height: 1067, category: 'Kitchens', title: 'The Private Dining Room' },
  { id: 'kitchen-pihu', src: '/images/dining/pihu-rooftop.webp', width: 1280, height: 720, category: 'Kitchens', title: 'Pihu — Rooftop' },
  { id: 'kitchen-gazebo-by-the-lake', src: '/images/dining/gazebo-by-the-lake.webp', width: 1920, height: 1081, category: 'Kitchens', title: 'Gazebo by the Lake' },
  { id: 'breakfast-spread', src: '/images/dining/breakfast-spread.webp', width: 1600, height: 1068, category: 'Kitchens', title: 'The breakfast spread' },
  { id: 'breakfast-poha', src: '/images/dining/breakfast-poha.webp', width: 1600, height: 1068, category: 'Kitchens', title: 'The poha station' },
  { id: 'breakfast-cereal', src: '/images/dining/breakfast-cereal.webp', width: 1600, height: 1068, category: 'Kitchens', title: 'Cereals & preserves' },
  { id: 'breakfast-pastries', src: '/images/dining/breakfast-pastries.webp', width: 1600, height: 1068, category: 'Kitchens', title: 'Bakes & slice cakes' },

  // ────────────────────────────────────────────────────────── Spa
  { id: 'spa-still-life', src: '/images/spa/spa-still-life.webp', width: 1920, height: 900, category: 'Spa', title: 'Elysium Spa — Oils & Stones' },
  { id: 'spa-treatment-room', src: '/images/spa/spa-treatment-room.webp', width: 2000, height: 1336, category: 'Spa', title: 'The treatment room' },
  { id: 'spa-altar', src: '/images/spa/spa-altar.webp', width: 2000, height: 1336, category: 'Spa', title: 'Lamplit and unhurried' },
  { id: 'spa-amenities', src: '/images/spa/spa-amenities.webp', width: 2000, height: 1336, category: 'Spa', title: 'Oils, brass and candlelight' },
  { id: 'spa-lounge', src: '/images/spa/spa-lounge.webp', width: 2000, height: 1336, category: 'Spa', title: 'The wellness lounge' },

  // ────────────────────────────────────────────────────────── Weddings & Events
  { id: 'wedding-banquet-lawn-night', src: '/images/weddings/banquet-lawn-night.webp', width: 1280, height: 1280, category: 'Weddings', title: 'Banquet Lawn, dressed for dinner' },
  { id: 'wedding-pihu-deck-evening', src: '/images/weddings/pihu-deck.webp', width: 1280, height: 1279, category: 'Weddings', title: 'An evening on the Pihu Deck' },
  { id: 'wedding-cocktail-lawn-dinner', src: '/images/weddings/cocktail-lawn-dinner.webp', width: 1080, height: 1080, category: 'Weddings', title: 'Dinner on the Cocktail Lawn' },
  { id: 'wedding-forum-table', src: '/images/weddings/the-forum-table.webp', width: 900, height: 1600, category: 'Weddings', title: 'The Forum, set for a private dinner' },
  { id: 'wedding-sudesh-i-lawn', src: '/images/weddings/sudesh-i.webp', width: 1040, height: 780, category: 'Weddings', title: 'Sudesh I — the open lawn' },
  { id: 'wedding-decor-sangeet', src: '/images/weddings/wedding-decor-1.webp', width: 1600, height: 901, category: 'Weddings', title: 'A pink sangeet stage' },
  { id: 'wedding-decor-haldi', src: '/images/weddings/wedding-decor-2.webp', width: 1600, height: 901, category: 'Weddings', title: 'Marigold haldi on the lawn' },
  { id: 'wedding-decor-entrance', src: '/images/weddings/wedding-decor-3.webp', width: 1600, height: 901, category: 'Weddings', title: 'A floral welcome entrance' },
  { id: 'wedding-banquet-lawn', src: '/images/weddings/banquet-lawn.webp', width: 1080, height: 1350, category: 'Weddings', title: 'Banquet Lawn — table setup' },
  { id: 'wedding-sudesh-lawns', src: '/images/weddings/sudesh-lawns.webp', width: 2000, height: 1120, category: 'Weddings', title: 'Sudesh Lawns' },
  { id: 'wedding-the-forum', src: '/images/weddings/the-forum.webp', width: 1280, height: 853, category: 'Weddings', title: 'The Forum' },
  { id: 'wedding-cocktail-lawn', src: '/images/weddings/cocktail-lawn-night.webp', width: 1600, height: 1200, category: 'Weddings', title: 'Cocktail Lawn — evening' },
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
  { id: 'wild-tiger-walking', src: '/images/experiences/wildlife/tiger-walking.webp', width: 1280, height: 741, category: 'Wild', title: 'A tiger on the move' },
  { id: 'wild-tiger-log', src: '/images/experiences/wildlife/tiger-log.webp', width: 1920, height: 900, category: 'Wild', title: 'Tiger at rest' },
  { id: 'wild-elephants', src: '/images/experiences/wildlife/safari-elephants.webp', width: 1920, height: 900, category: 'Wild', title: 'Elephants of Ratapani' },
  { id: 'wild-safari-jeep', src: '/images/experiences/wildlife/giovanni-safari-jeep.webp', width: 1200, height: 1600, category: 'Wild', title: 'The Giovanni safari jeep' },
  { id: 'wild-ratapani-gate', src: '/images/experiences/wildlife/ratapani-gate.webp', width: 1200, height: 1600, category: 'Wild', title: 'The Ratapani gate' },

  // ────────────────────────────────────────────────────────── Films (ambient videos)
  { id: 'film-hero-aerial', src: '/videos/hero-aerial.mp4', width: 1920, height: 1080, category: 'Films', title: 'The estate from above', type: 'video', poster: '/videos/hero-aerial-poster.webp' },
  { id: 'film-suite-reveal', src: '/videos/suite-reveal.mp4', width: 1920, height: 1080, category: 'Films', title: 'Inside a Junior Suite', type: 'video', poster: '/videos/suite-reveal-poster.webp' },
  { id: 'film-golden-lawn', src: '/videos/golden-lawn.mp4', width: 1920, height: 1080, category: 'Films', title: 'Golden hour on the lawn', type: 'video', poster: '/images/weddings/cocktail-lawn.webp' },
  { id: 'film-twilight-path', src: '/videos/twilight-path.mp4', width: 1920, height: 1080, category: 'Films', title: 'Estate at twilight', type: 'video', poster: '/videos/twilight-path-poster.webp' },
  { id: 'film-estate-pool', src: '/videos/estate-pool.mp4', width: 1920, height: 1080, category: 'Films', title: 'The estate pool', type: 'video', poster: '/videos/estate-pool-poster.webp' },
  { id: 'film-evening-lounge', src: '/videos/evening-lounge.mp4', width: 1920, height: 1080, category: 'Films', title: 'Evenings indoors', type: 'video', poster: '/images/dining/lakeside-dinner.webp' },
  { id: 'film-dining-arrival', src: '/videos/dining-arrival.mp4', width: 1920, height: 1080, category: 'Films', title: 'Dinner on arrival', type: 'video', poster: '/images/dining/gourmet-2.webp' },
  { id: 'film-jungle-safari', src: '/videos/jungle-safari.mp4', width: 640, height: 1088, category: 'Films', title: 'A jungle safari drive', type: 'video', poster: '/videos/jungle-safari-poster.webp' },
];

/** Count of items per category, computed once at module load */
export const categoryCounts = galleryItems.reduce(
  (acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  },
  {} as Record<string, number>,
);
