/**
 * Giovanni Village Resort — content data
 * Sourced from the production WordPress site (giovannivillage.com).
 */

/** Resolve the canonical site URL across environments.
 *
 * Until the cutover from the WordPress site at giovannivillage.com, hard-coding
 * that domain breaks Open Graph previews — social platforms fetch the OG image
 * URL we ship, which resolves to the old WP host and 404s. To keep previews
 * working on whichever Vercel deployment is live, we resolve at runtime:
 *
 *   1. NEXT_PUBLIC_SITE_URL — manual override. Set this on Vercel to pin the
 *      production URL (e.g. the eventual giovannivillage.com after cutover, or
 *      a staging subdomain in the meantime).
 *   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel auto-sets this to the project's
 *      primary production domain.
 *   3. VERCEL_URL — Vercel's per-deployment URL (used on previews/branches).
 *   4. Local dev fallback.
 */
const resolveSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

/**
 * Indexing guardrail. Keep the new site OUT of search engines while it's on a
 * Vercel preview URL (so it never competes with the still-live WordPress site).
 * Flip NEXT_PUBLIC_INDEXABLE=true only on giovannivillage.com at cutover.
 */
export const INDEXABLE = process.env.NEXT_PUBLIC_INDEXABLE === 'true';

export const siteConfig = {
  name: 'Giovanni Village',
  legalName: 'Giovanni Village — A Venture of Sudesh The Village Resort',
  title: 'Giovanni Village Resort – Best Luxury Wildlife Resort in Bhopal',
  description:
    'Experience luxury at Giovanni Village, Best Luxury Wildlife Resort in Bhopal with spa, banquet halls, restaurants & forest views. Book your perfect escape today.',
  url: resolveSiteUrl(),
  keywords: [
    'Best Luxury Wildlife Resort in Bhopal',
    'Boutique resort near Bhopal',
    'Wedding venue Bhopal',
    'Spa resort Madhya Pradesh',
    'Luxury resort with forest views',
    'Corporate retreat venue Bhopal',
  ],
  contact: {
    // The "public" number shown across every page except /contact — this is
    // the 37302 WhatsApp-bot line, also reachable by phone. Routing customer
    // calls through the bot lets every CTA respond to context-specific
    // prefilled messages without losing a human fallback.
    phone: '+91 90390 37302',
    // The human reception line at the resort — shown ONLY on /contact, so
    // visitors with a specific operational query (lost item, late arrival,
    // etc.) still have a direct path to staff.
    phoneReception: '+91 90390 37300',
    // Legacy alias for phone — used by /dining + Restaurant structured data
    // for the F&B routing. Same number, kept distinct so the labels can read
    // differently on the page.
    phoneSecondary: '+91 90390 37302',
    email: 'reservations@giovannivillage.com',
    emailHr: 'hr@giovannivillage.com',
    phoneHr: '+91 99932 18714',
    whatsapp: '+91 90390 37302',
    address: {
      street: 'Giovanni Village, 410, Village Kalapani, Kolar Road',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      country: 'India',
      coordinates: { lat: 23.2599, lng: 77.4126 },
    },
  },
  social: {
    facebook: 'https://www.facebook.com/GiovanniVillage',
    instagram: 'https://www.instagram.com/giovannivillage',
  },
  booking: {
    resort: 'https://live.ipms247.com/booking/roomlist-giovannivillageresortspa-be',
    house: 'https://live.ipms247.com/booking/roomlisting-giovannistays-hotelgiovannihouse-en',
    suites: 'https://live.ipms247.com/booking/roomlisting-giovannistays-hotelgiovannisuites-en',
  },
  tour360: 'https://giovannivillage.com/giovannisuites/tour.html',
};

export const hero = {
  tagline: 'Best Luxury Wildlife Resort in Bhopal',
  subtitle: 'Resort. Spa. Banquet. Experience luxury in the lap of nature.',
  ctaPrimary: 'Book Your Stay',
  ctaSecondary: 'Explore Experiences',
  images: [
    '/images/hero/hero-1.webp',
    '/images/hero/landscape-2.webp',
    '/images/hero/landscape-3.webp',
    '/images/hero/recent.webp',
  ],
};

export const about = {
  title: 'A house that learned to listen',
  subtitle: 'Ten acres, ten room categories, one long pause in the day.',
  content: [
    'Giovanni Village sits on the edge of Ratapani Tiger Reserve, twenty minutes outside Bhopal. Ten acres of mango groves, lily ponds, lakeside paths — and Royalton Farms, our working organic farm where most of what reaches the table is grown.',
    'Brides, naturalists, weekending families, second-honeymooners, conference delegates, toddlers chasing peacocks. The estate holds them all without raising its voice.',
    'Ten forest-view room categories. Three dining venues, each with its own hour of the day. Eleven event spaces — indoors and out, from a 10,000 sq ft banquet hall to a lakeside lawn. A spa built for the long way home.',
    'And five kilometres up the road, the reserve waits — five hundred square kilometres of teak forest, leopard, sloth bear, and one of India’s healthiest tiger populations.',
  ],
  highlights: [
    {
      icon: 'hotel',
      title: 'Forest-view suites',
      description: 'Ten room categories, each opening to green — with plunge pools and open-to-sky baths.',
    },
    {
      icon: 'leaf',
      title: 'The reserve at the gate',
      description: 'Ratapani is five minutes away. Naturalist-led safaris before breakfast.',
    },
    {
      icon: 'utensils',
      title: 'Farm-to-fire cuisine',
      description: 'Three dining venues, all cooking with produce from Royalton Farms inside the gates — same morning, same hands.',
    },
    {
      icon: 'spa',
      title: 'Long hours at Elysium',
      description: 'Forest oils, warm stone, the unhurried hands. You sleep like a child.',
    },
  ],
};

export interface RoomRich {
  subtitle: string;
  intro: string;
  sections: { heading: string; body: string }[];
  specs: { label: string; value: string }[];
  distinction?: { label: string; body: string };
}

export interface Room {
  id: string;
  name: string;
  description: string;
  features: string[];
  capacity: string;
  area: string;
  image: string;
  gallery: string[];
  price: number;
  rich?: RoomRich;
}

export const rooms: Room[] = [
  {
    id: 'king-room-pool-garden',
    name: 'King Room — Pool and Garden View',
    description:
      '430ft² of soft organic aesthetic. Dual perspective — the rhythmic serenity of the pool and the grounding presence of the gardens — anchored by an Extra Large King on our Patented Natural Latex mattress.',
    features: ['Pool View', 'Garden View', 'Extra Large King', 'Natural Latex Mattress'],
    capacity: '2 adults, 1 child',
    area: '430 sqft',
    image: '/images/rooms/king-pool-garden.webp',
    gallery: [
      '/images/rooms/_galleries/king-pool-garden/01.webp',
      '/images/rooms/_galleries/king-pool-garden/02.webp',
      '/images/rooms/_galleries/king-pool-garden/03.webp',
      '/images/rooms/_galleries/king-pool-garden/04.webp',
      '/images/rooms/_galleries/king-pool-garden/05.webp',
      '/images/rooms/_galleries/king-pool-garden/06.webp',
      '/images/rooms/_galleries/king-pool-garden/07.webp',
      '/images/rooms/_galleries/king-pool-garden/08.webp',
      '/images/rooms/_galleries/king-pool-garden/09.webp',
      '/images/rooms/_galleries/king-pool-garden/10.webp',
    ],
    price: 9999,
    rich: {
      subtitle: 'Where organic tranquility meets uber-luxury',
      intro:
        'A residence designed not just for stay, but for restoration. Spanning 430ft², this sanctuary replaces corporate rigidity with a soft, organic aesthetic. Bathed in natural light, the room offers a rare dual perspective — the rhythmic serenity of the pool view and the lush, grounding presence of our garden view. Every element has been curated to resonate with a lifestyle of mindful opulence.',
      sections: [
        {
          heading: 'The sleep suite',
          body: 'At the heart of the experience is an Extra Large King bed, outfitted with a Patented Natural Latex mattress. Unlike standard hospitality bedding, this organic foundation breathes with your body, providing a weightless, cloud-like support that is as sustainable as it is indulgent.',
        },
        {
          heading: 'Refined essentials',
          body: 'A strictly non-smoking policy keeps the air as crisp as the garden outside. An elegant work desk and seamless WiFi offer a quiet space for focus without encroaching on the room’s peaceful energy. Large-format windows frame a living tapestry of water and flora, blurring the line between the interior luxury and the natural world.',
        },
      ],
      specs: [
        { label: 'Space', value: '430ft² of curated elegance' },
        { label: 'Capacity', value: 'Up to 3 guests' },
        { label: 'Bedding', value: 'Bespoke Extra Large King' },
        { label: 'Perspective', value: 'Dual pool & garden vistas' },
      ],
    },
  },
  {
    id: 'king-room-private-garden',
    name: 'King Room with Private Garden',
    description:
      '430ft² interior opening onto a 300ft² private lawn — your own slice of greenery in complete seclusion. Extra Large King on the Patented Natural Latex mattress.',
    features: ['Private Garden 300ft²', 'Extra Large King', 'Natural Latex Mattress', 'Non-Smoking'],
    capacity: '2 adults, 1 child',
    area: '430 sqft + 300 sqft garden',
    image: '/images/rooms/king-private-garden.webp',
    gallery: [
      '/images/rooms/_galleries/king-private-garden/01.webp',
      '/images/rooms/_galleries/king-private-garden/02.webp',
      '/images/rooms/_galleries/king-private-garden/03.webp',
      '/images/rooms/_galleries/king-private-garden/04.webp',
      '/images/rooms/_galleries/king-private-garden/05.webp',
      '/images/rooms/_galleries/king-private-garden/06.webp',
      '/images/rooms/_galleries/king-private-garden/07.webp',
    ],
    price: 10499,
    rich: {
      subtitle: 'A king room that opens onto its own lawn',
      intro:
        'The same 430ft² of soft, organic interior as our pool-garden king — Patented Natural Latex on an Extra Large King, large-format windows, and a quietly elegant work desk — but here the doors open onto a 300ft² private walled lawn. A slice of the estate that is only yours for the stay.',
      sections: [
        {
          heading: 'The private lawn',
          body: 'A manicured outdoor strip immediately off the room — for morning chai with the birds, an evening drink under the trees, or simply somewhere to set your feet on the grass before bed.',
        },
        {
          heading: 'The sleep suite',
          body: 'Extra Large King with Patented Natural Latex mattress. Hypoallergenic, eco-friendly, breathable — designed to disappear under you while keeping spinal support precise.',
        },
      ],
      specs: [
        { label: 'Space', value: '430ft² interior + 300ft² private garden' },
        { label: 'Capacity', value: 'Up to 3 guests' },
        { label: 'Bedding', value: 'Bespoke Extra Large King' },
        { label: 'Perspective', value: 'Private lawn' },
      ],
    },
  },
  {
    id: 'junior-suite-deck-garden',
    name: 'Junior Suite with Deck and Garden View',
    description:
      '540ft² of organic interior that flows onto your own timber deck. Sunrise yoga, an evening drink overlooking the garden — the outdoors becomes an extension of the room.',
    features: ['Private Deck', 'Garden Views', 'Extra Large King', 'Natural Latex Mattress'],
    capacity: '2 adults, 1 child',
    area: '540 sqft + private deck',
    image: '/images/rooms/junior-deck-garden.webp',
    gallery: [
      '/images/rooms/_galleries/junior-deck-garden/01.webp',
      '/images/rooms/_galleries/junior-deck-garden/02.webp',
      '/images/rooms/_galleries/junior-deck-garden/03.webp',
      '/images/rooms/_galleries/junior-deck-garden/04.webp',
      '/images/rooms/_galleries/junior-deck-garden/05.webp',
      '/images/rooms/_galleries/junior-deck-garden/06.webp',
      '/images/rooms/_galleries/junior-deck-garden/07.webp',
      '/images/rooms/_galleries/junior-deck-garden/08.webp',
      '/images/rooms/_galleries/junior-deck-garden/09.webp',
    ],
    price: 11999,
    rich: {
      subtitle: 'Private al fresco living meets masterful interior design',
      intro:
        'Our most coveted Junior Suite, where indoor elegance flows seamlessly onto your own private outdoor deck. Spanning a generous 540ft², it is the hallmark of organic luxury — designed for those who appreciate the quiet prestige of space and the healing power of nature. Here, the great outdoors is not just a view; it is an extension of your living room.',
      sections: [
        {
          heading: 'The private deck',
          body: 'Step through expansive glass doors onto your secluded timber deck — the perfect stage for a sunrise yoga session or an intimate starlit conversation overlooking the curated garden view.',
        },
        {
          heading: 'Organic restoration',
          body: 'Central to the suite is the Extra Large King bed, with our Patented Natural Latex mattress. It offers an elite, chemical-free sleep environment that adapts to your body’s every curve.',
        },
        {
          heading: 'Sophisticated utilities',
          body: 'Balance leisure with a touch of productivity at the artisanal work desk, supported by seamless WiFi and a pristine, non-smoking atmosphere.',
        },
      ],
      specs: [
        { label: 'Living space', value: '540ft² + private outdoor deck' },
        { label: 'Bedding', value: 'Bespoke Extra Large King' },
        { label: 'Vistas', value: 'Immersive garden & landscape views' },
        { label: 'Occupancy', value: 'Up to 3 guests' },
        { label: 'Environment', value: '100% non-smoking' },
      ],
      distinction: {
        label: 'The Junior Suite distinction',
        body: 'Our most expansive base offering, with a physical connection to the gardens via your private deck — a level of liberation and luxury that defines the ultimate retreat.',
      },
    },
  },
  {
    id: 'junior-suite-deck-private-garden',
    name: 'Junior Suite with Deck and Private Garden',
    description:
      '540ft² interior + 300ft² private walled garden — 840ft² of indoor-outdoor estate, in total seclusion. The most prestigious of our Junior Suites.',
    features: ['Private Walled Garden', '840 sqft Total', 'Extra Large King', 'Natural Latex Mattress'],
    capacity: '2 adults, 1 child',
    area: '540 sqft + 300 sqft private garden',
    image: '/images/rooms/junior-deck-private.webp',
    gallery: [
      '/images/rooms/_galleries/junior-deck-private/01.webp',
      '/images/rooms/_galleries/junior-deck-private/02.webp',
      '/images/rooms/_galleries/junior-deck-private/03.webp',
      '/images/rooms/_galleries/junior-deck-private/04.webp',
      '/images/rooms/_galleries/junior-deck-private/05.webp',
      '/images/rooms/_galleries/junior-deck-private/06.webp',
      '/images/rooms/_galleries/junior-deck-private/07.webp',
    ],
    price: 12999,
    rich: {
      subtitle: 'An ultra-exclusive sanctuary of earth and elegance',
      intro:
        'Privacy redefined. The Junior Suite Private Garden is a masterclass in uber-luxury — a 540ft² designer interior merged with your own 300ft² private walled garden. This is not simply a room with a view; it is a sprawling 840ft² indoor-outdoor estate where you can reconnect with nature in total seclusion.',
      sections: [
        {
          heading: 'Your private botanical oasis',
          body: 'A 300ft² manicured sanctuary exclusively for your use. Whether for a private morning meditation or an evening under the stars, this lush outdoor living space offers a level of intimacy rarely found in high-end hospitality.',
        },
        {
          heading: 'Masterful sleep',
          body: 'At the heart of the suite lies the Extra Large King with our Patented Natural Latex mattress — a weightless, organic sleep that mirrors the tranquility of your surroundings.',
        },
        {
          heading: 'Mindful productivity',
          body: 'A bespoke work desk and high-speed WiFi provide a quiet corner for reflection, all within a strictly non-smoking, purified environment.',
        },
      ],
      specs: [
        { label: 'Interior space', value: '540ft² of organic luxury' },
        { label: 'Exterior space', value: '300ft² exclusive private garden' },
        { label: 'Total living area', value: '840ft²' },
        { label: 'Bedding', value: 'Bespoke Extra Large King' },
        { label: 'Occupancy', value: 'Up to 3 guests' },
        { label: 'Environment', value: '100% non-smoking' },
      ],
      distinction: {
        label: 'The Private Garden distinction',
        body: 'Our most elite tier of base suites. By doubling the outdoor footprint, this suite offers an unparalleled sense of freedom and "staying grounded" — the ultimate antidote to the modern world.',
      },
    },
  },
  {
    id: 'junior-suite-bath-tub',
    name: 'Junior Suite with Open-to-Sky Bath Tub',
    description:
      '530ft² suite anchored by a 250ft² open-to-sky stone bath — soak under drifting clouds by day, beneath a canopy of stars by night.',
    features: ['Open-to-Sky Bath 250ft²', 'Extra Large King', 'Natural Latex Mattress', 'French Press Coffee'],
    capacity: '2 adults, 1 child',
    area: '530 sqft (incl. 250 sqft open-to-sky bath)',
    image: '/images/rooms/junior-bath-tub.webp',
    gallery: [
      '/images/rooms/_galleries/junior-bath-tub/01.webp',
      '/images/rooms/_galleries/junior-bath-tub/02.webp',
      '/images/rooms/_galleries/junior-bath-tub/03.webp',
      '/images/rooms/_galleries/junior-bath-tub/04.webp',
      '/images/rooms/_galleries/junior-bath-tub/05.webp',
      '/images/rooms/_galleries/junior-bath-tub/06.webp',
      '/images/rooms/_galleries/junior-bath-tub/07.webp',
    ],
    price: 13999,
    rich: {
      subtitle: 'Where celestial wonder meets organic opulence',
      intro:
        'A 530ft² sanctuary where the boundaries between modern indulgence and the rhythmic pulse of nature dissolve. Soft ambient lighting, handcrafted wooden details, a profound sense of calm that slows time to a whisper.',
      sections: [
        {
          heading: 'The bath ritual — under the stars',
          body: 'The soul of this suite is the 250ft² open-to-sky bathroom — a magnificent stone-clad alcove where the ceiling is replaced by the heavens. Recline in the warm water as the night air brushes your skin and the jungle orchestra serenades you from above. Enhanced with scented oils and soft lighting, it is more than a bath — it is a spiritual reconnection with the elements.',
        },
        {
          heading: 'Sleep, redefined',
          body: 'A Patented Natural Latex mattress, meticulously designed for elite spinal support and cooling comfort. Hypoallergenic and eco-friendly, it contours to your body for a weightless, uninterrupted sleep that restores the spirit.',
        },
        {
          heading: 'Amenities of distinction',
          body: 'A complimentary farm-fresh breakfast for two from our own organic fields. A Smart LED TV or projector, high-speed WiFi, a curated minibar. 24-hour room service and our signature evening turndown.',
        },
      ],
      specs: [
        { label: 'Interior space', value: '530ft² of curated luxury' },
        { label: 'The bath estate', value: '250ft² open-to-sky stone bathroom' },
        { label: 'Sleep', value: 'Bespoke Extra Large King with Natural Latex' },
        { label: 'Inclusive', value: 'Farm-to-Table breakfast for two' },
        { label: 'Environment', value: '100% non-smoking' },
      ],
      distinction: {
        label: 'The Open-to-Sky distinction',
        body: 'Designed for the connoisseur of quiet luxury — the rare opportunity to bathe under the stars and sleep on the earth’s finest organic materials.',
      },
    },
  },
  {
    id: 'master-suite-bath-tub',
    name: 'Master Suite with Open-to-Sky Bath Tub',
    description:
      '1,100ft² grand estate with a private living room, an in-room cinema projector, an open-to-sky stone bath, and a balcony over the organic orchard. Furnished by Giovanni Boutique.',
    features: ['Cinema Projector', 'Open-to-Sky Bath', 'Orchard Balcony', '1,100 sqft'],
    capacity: '2 adults, 2 children',
    area: '1,100 sqft',
    image: '/images/rooms/master-bath-tub.webp',
    gallery: [
      '/images/rooms/_galleries/master-bath-tub/01.webp',
      '/images/rooms/_galleries/master-bath-tub/02.webp',
      '/images/rooms/_galleries/master-bath-tub/03.webp',
      '/images/rooms/_galleries/master-bath-tub/04.webp',
      '/images/rooms/_galleries/master-bath-tub/05.webp',
      '/images/rooms/_galleries/master-bath-tub/06.webp',
      '/images/rooms/_galleries/master-bath-tub/07.webp',
      '/images/rooms/_galleries/master-bath-tub/08.webp',
      '/images/rooms/_galleries/master-bath-tub/09.webp',
      '/images/rooms/_galleries/master-bath-tub/10.webp',
    ],
    price: 17499,
    rich: {
      subtitle: 'A grand estate of style, silence, and sophistication',
      intro:
        'Where the untamed wilderness meets unparalleled luxury, the Master Suite stands as our most expansive and prestigious retreat. Spanning a magnificent 1,100ft², this grand estate is designed for the connoisseur of fine living — a private world where organic character and high-tier indulgence coexist in perfect harmony.',
      sections: [
        {
          heading: 'The crown jewel — a dialogue with the elements',
          body: 'The heart of the Master Suite is its open-to-sky bath ritual. Framed by natural stone and lush foliage, this sanctuary allows you to slip into a warm soak under drifting clouds by day, or a canopy of stars by night. Surrounded by the fragrance of fresh air and the hum of the forest.',
        },
        {
          heading: 'The private living room & cinema',
          body: 'A sprawling Private Living Room designed for both relaxation and celebration. An in-room Cinema Projector and Smart TV transform the lounge into a private theater. Your living area extends onto a private terrace overlooking a verdant canopy of fruit trees — a serene vantage point for slow morning coffees and golden-hour reflections. A curated in-room bar of wines and spirits, alongside bespoke handcrafted furniture by Giovanni Boutique Furniture.',
        },
        {
          heading: 'The science of restoration',
          body: 'Sink into a state of total weightlessness on our Patented Natural Latex mattress. Breathable, eco-friendly, and engineered for orthopedic comfort, this organic foundation ensures that your sleep is as restorative as your surroundings.',
        },
      ],
      specs: [
        { label: 'Total space', value: '1,100ft² of master-crafted luxury' },
        { label: 'Living area', value: 'Private living room with cinema projector & lounge' },
        { label: 'The bath ritual', value: 'Signature open-to-sky stone bathtub' },
        { label: 'Vistas', value: 'Private balcony overlooking the organic orchard' },
        { label: 'Inclusions', value: 'Farm-to-Table breakfast for two' },
        { label: 'Sleep', value: 'Extra Large King with Natural Latex' },
        { label: 'Service', value: 'Personalised butler on request' },
      ],
      distinction: {
        label: 'The Master distinction',
        body: 'At 1,100ft², this is more than a suite — it is a sprawling residence. By combining the vastness of a private cinema lounge with the intimacy of a sky-lit bath, we have created the ultimate sanctuary for those who demand both space and soul.',
      },
    },
  },
  {
    id: 'junior-suite-plunge-pool',
    name: 'Junior Suite with Open-to-Sky Plunge Pool',
    description:
      '530ft² with a private 8ft × 6ft open-to-sky plunge pool, nested inside a 250ft² stone-clad bath estate. Submerge under the canopy by day, under the stars by night.',
    features: ['8x6 Plunge Pool', 'Open-to-Sky', 'Stone Bath 250ft²', 'Natural Latex Mattress'],
    capacity: '2 adults, 2 children',
    area: '530 sqft (incl. 250 sqft bath + 8x6 plunge pool)',
    image: '/images/rooms/junior-plunge-pool.webp',
    gallery: [
      '/images/rooms/_galleries/junior-plunge-pool/01.webp',
      '/images/rooms/_galleries/junior-plunge-pool/02.webp',
      '/images/rooms/_galleries/junior-plunge-pool/03.webp',
      '/images/rooms/_galleries/junior-plunge-pool/04.webp',
      '/images/rooms/_galleries/junior-plunge-pool/05.webp',
      '/images/rooms/_galleries/junior-plunge-pool/06.webp',
    ],
    price: 14999,
    rich: {
      subtitle: 'A private aquatic retreat beneath the heavens',
      intro:
        'A 530ft² haven where organic architecture meets high-concept luxury. Designed for the discerning traveller who seeks a deep, visceral connection with the elements. Defined by handcrafted wooden details and bathed in soft, natural light, this sanctuary slows the pace of life the moment you cross the threshold.',
      sections: [
        {
          heading: 'The aquatic ritual — sky-lit serenity',
          body: 'The centrepiece is your private 8ft × 6ft open-to-sky plunge pool, nested within a magnificent 250ft² stone-clad bathroom estate. Submerge in temperate water as the night air brushes your skin and the ceiling opens to the stars. Whether a refreshing morning dip or a midnight ritual under the jungle canopy, the open-air design turns every moment into pure transcendence.',
        },
        {
          heading: 'Sleep, redefined',
          body: 'Rest is an art form in this suite. Our Patented Natural Latex mattress, chosen for hypoallergenic properties and superior spinal support, contours to your body for a weightless, restorative sleep that mirrors the stillness of the surrounding forest.',
        },
        {
          heading: 'Amenities of distinction',
          body: 'Complimentary farm-fresh breakfast for two from our own organic fields. A Smart LED TV or projector, high-speed WiFi, premium in-room tea and coffee. 24-hour room service and our signature evening turndown.',
        },
      ],
      specs: [
        { label: 'Interior space', value: '530ft² of organic luxury' },
        { label: 'Outdoor feature', value: '8ft × 6ft private open-to-sky plunge pool' },
        { label: 'The bath estate', value: '250ft² stone-clad sanctuary' },
        { label: 'Sleep', value: 'Bespoke Extra Large King with Natural Latex' },
        { label: 'Inclusive', value: 'Farm-to-Table breakfast for two' },
        { label: 'Environment', value: '100% non-smoking' },
      ],
      distinction: {
        label: 'The Plunge Pool distinction',
        body: 'Our most immersive aquatic offering. By combining the vastness of an open-air bath with the luxury of a private pool, we have created a space where you don’t just observe nature — you live within it.',
      },
    },
  },
  {
    id: 'royal-suite-plunge-pool',
    name: 'Royal Suite with Plunge Pool and Private Garden',
    description:
      'The crown jewel — 1,100ft² interior, 2,000ft² private garden, a private open-to-sky plunge pool, lounge & dining, an in-room cinema, and a butler on request. Over 3,000ft² of total private estate.',
    features: ['Plunge Pool', '2,000ft² Private Garden', 'Cinema Projector', 'Butler Service'],
    capacity: '3 adults, 2 children',
    area: '1,100 sqft + 2,000 sqft private garden',
    image: '/images/rooms/royal-suite.webp',
    gallery: [
      '/images/rooms/_galleries/royal-suite/01.webp',
      '/images/rooms/_galleries/royal-suite/02.webp',
      '/images/rooms/_galleries/royal-suite/03.webp',
      '/images/rooms/_galleries/royal-suite/04.webp',
      '/images/rooms/_galleries/royal-suite/05.webp',
      '/images/rooms/_galleries/royal-suite/06.webp',
      '/images/rooms/_galleries/royal-suite/07.webp',
      '/images/rooms/_galleries/royal-suite/08.webp',
      '/images/rooms/_galleries/royal-suite/09.webp',
    ],
    price: 21000,
    rich: {
      subtitle: 'The crown jewel of Giovanni Village',
      intro:
        'Our most prestigious offering. 1,100ft² of interior elegance cocooned within a sprawling private estate — the definitive expression of uber-luxury. Crafted for those who demand absolute silence, vast space, and a soul-soothing connection to the earth, the Royal Suite is less a room and more a private sanctuary.',
      sections: [
        {
          heading: 'The aquatic & botanical estate',
          body: 'A private open-to-sky plunge pool where warm water meets the cool breeze, the sky as your ceiling and the jungle canopy as your backdrop. Surrounding the suite, a 2,000ft² private garden — a massive, lush sanctuary of flowering trees and fruit groves with lounging corners perfect for private yoga, morning picnics, or intimate starlit dinners.',
        },
        {
          heading: 'Masterful interiors & cinema',
          body: 'A dedicated lounge & dining area and a private living room with a Cinema Projector and Smart TV for immersive evenings. A complementary stone-clad open-to-sky bath ritual with aromatic oils and a direct view of the drifting clouds above. Every corner is adorned with handcrafted furnishings by Giovanni Boutique Furniture, balancing high design with organic comfort.',
        },
        {
          heading: 'Restorative luxury',
          body: 'Drift into a deep, orthopedic rest on our Patented Natural Latex mattress. Eco-friendly and hypoallergenic, it ensures your physical restoration matches the mental peace provided by your surroundings. Begin each day with a complimentary organic breakfast for two, harvested from our own fields and served in the privacy of your garden or suite.',
        },
      ],
      specs: [
        { label: 'Interior space', value: '1,100ft² of curated luxury' },
        { label: 'Private exterior', value: '2,000ft² landscaped private garden' },
        { label: 'Water feature', value: 'Private open-to-sky plunge pool' },
        { label: 'Entertainment', value: 'Private cinema projector & curated in-room bar' },
        { label: 'Service', value: 'Personalised butler & housekeeping on request' },
        { label: 'Environment', value: '100% non-smoking' },
      ],
      distinction: {
        label: 'The Royal distinction',
        body: 'With over 3,000ft² of total private indoor-outdoor living space, the Royal Suite is the ultimate sanctuary. A place where you don’t just escape the world — you rediscover it beneath open skies and among whispering trees.',
      },
    },
  },
];

export const experiences = [
  {
    id: 'nature-wildlife',
    title: 'Nature & Wildlife',
    description:
      'Safaris at Ratapani Sanctuary (just 1–5 km away) — home to the highest count of naturally-breeding tigers in India.',
    image: '/images/experiences/wildlife/safari-elephants.webp',
    activities: ['Ratapani safari', 'Bird watching', 'Forest trails', 'Photography tours'],
  },
  {
    id: 'dining',
    title: 'Restaurants & Dining',
    description:
      'Three signature dining venues — fine dining at Gourmet By The Woods, rooftop telescope dinners at Pihu, and lakeside intimacy at Gazebo by the Lake.',
    image: '/images/dining/gourmet-by-the-woods.webp',
    activities: ['Fine dining', 'Telescopic nights', 'Farm-to-table breakfast', 'Self-service barbecue'],
  },
  {
    id: 'wellness',
    title: 'Elysium Spa & Wellness',
    description:
      'Rejuvenate at Elysium Spa with holistic treatments, yoga and meditation amidst nature.',
    image: '/n1.webp',
    activities: ['Massage therapy', 'Yoga sessions', 'Meditation', 'Wellness retreats'],
  },
  {
    id: 'events',
    title: 'Weddings & Events',
    description:
      'From intimate ceremonies to grand celebrations for up to 2,000 guests — pillarless banquet halls and lakeside lawns.',
    image: '/images/weddings/gourmet-lawn.webp',
    activities: ['Weddings', 'Conferences', 'Concerts', 'Private parties'],
  },
];

export const restaurants = [
  {
    id: 'gourmet-by-the-woods',
    name: 'Gourmet By The Woods',
    tagline: 'A culinary adventure in the heart of nature',
    description:
      'Nestled amidst tranquillity, Gourmet By The Woods is our fine dining destination. A menu crafted by world-renowned chefs makes every dish a gastronomic delight.',
    image: '/images/dining/gourmet-by-the-woods.webp',
    tags: ['Fine Dining', 'Multi-Course', 'Forest Setting'],
  },
  {
    id: 'pihu',
    name: 'Pihu',
    tagline: 'Dine under the stars',
    description:
      'Perched on our rooftop, Pihu offers an intimate setting with panoramic views, live music on weekends, telescopic nights and a diverse menu of international and local cuisines.',
    image: '/images/dining/pihu.webp',
    tags: ['Rooftop', 'Candle-lit', 'Live Music', 'Telescope Nights'],
  },
  {
    id: 'gazebo-by-the-lake',
    name: 'Gazebo by the Lake',
    tagline: "Dining at the water's edge",
    description:
      'A semi-open pavilion set apart at the lakeside, lit by lanterns at dusk. Smaller than the main rooms — built for proposals, anniversaries, and unhurried dinners-for-two. The kitchen sends a tasting menu shaped to the season.',
    image: '/images/weddings/lakeside-deck.webp',
    tags: ['Lakeside', 'Intimate', 'Tasting Menu', 'Sunset Service'],
  },
];

export const weddingVenues = [
  // ─────────────────────────────────────────────── Indoor (Air Conditioned)
  {
    id: 'the-forum',
    name: 'The Forum',
    type: 'indoor' as const,
    description:
      'A 1,000 sq ft multi-purpose space overlooking the pool — ideal for board meetings, conferences, brand activations and intimate functions.',
    specs: '1,000 sq ft · air-conditioned',
    capacity: 'Conferences & meetings',
    image: '/images/weddings/the-forum.webp',
  },
  {
    id: 'aria-deck',
    name: 'Aria Deck',
    type: 'indoor' as const,
    description:
      'A dedicated indoor deck attached to the Aria Grand — for cocktail receptions, lounges and pre-ceremony gatherings. Capacity details on request.',
    specs: 'Air-conditioned · attached to Aria Grand',
    capacity: 'Capacity on request',
    image: '/images/weddings/aria-grand-hall.webp',
  },
  {
    id: 'aria-i-ii-deck',
    name: 'Aria I + II + Deck',
    type: 'indoor' as const,
    description:
      'Aria I and II combined with the Aria Deck — 4,000 sq ft of pillarless indoor space for mid-sized ceremonies and banquets.',
    specs: '4,000 sq ft · air-conditioned · pillarless',
    capacity: 'Capacity on request',
    image: '/images/weddings/aria-grand-hall.webp',
    video: '/videos/aria-i-ii-loop.mp4',
  },
  {
    id: 'aria-iii',
    name: 'Aria III',
    type: 'indoor' as const,
    description:
      'A 6,000 sq ft pillarless indoor venue — the central Aria for mid-to-large receptions and banquets.',
    specs: '6,000 sq ft · air-conditioned · pillarless',
    capacity: 'Capacity on request',
    image: '/images/weddings/aria-grand-hall.webp',
    video: '/videos/aria-iii-loop.mp4',
  },
  {
    id: 'aria-grand',
    name: 'Aria Grand',
    type: 'indoor' as const,
    description:
      'A state-of-the-art pillarless banquet hall with a soaring 25-foot ceiling, complemented by a 50,000 sq ft attached lawn. Designed to host majestic celebrations from intimate gatherings to grand productions.',
    specs: '10,000 sq ft hall · 50,000 sq ft attached lawn · pillarless',
    capacity: 'Up to 2,000 guests',
    image: '/images/weddings/aria-grand-hall.webp',
    video: '/videos/aria-grand-loop.mp4',
  },
  // ─────────────────────────────────────────────── Outdoor
  {
    id: 'pihu-deck',
    name: 'Pihu Deck',
    type: 'outdoor' as const,
    description:
      'An open-air deck beneath the rooftop Pihu — for sundowner cocktails, intimate ceremonies and sangeet evenings under the sky. Capacity details on request.',
    specs: 'Open-air rooftop · adjacent to Pihu',
    capacity: 'Capacity on request',
    image: '/images/dining/pihu.webp',
  },
  {
    id: 'sudesh-ii',
    name: 'Sudesh II',
    type: 'outdoor' as const,
    description:
      'An outdoor lawn nestled between dense trees — perfect for dreamy outdoor weddings, mandaps and sangeet evenings.',
    specs: '51,000 sq ft · lawn',
    capacity: '350 pax',
    image: '/images/weddings/sudesh-lawns.webp',
  },
  {
    id: 'banquet-lawn',
    name: 'Banquet Lawn',
    type: 'outdoor' as const,
    description:
      'A wide outdoor banquet lawn ringed by trees — for sit-down dinners, mehndi mornings and reception evenings. Capacity details on request.',
    specs: 'Open-air lawn',
    capacity: 'Capacity on request',
    image: '/images/weddings/sudesh-lawns.webp',
  },
  {
    id: 'sudesh-i',
    name: 'Sudesh I',
    type: 'outdoor' as const,
    description:
      'An outdoor lawn nestled between dense trees — ideal for larger weddings, sangeet evenings and grand mandap setups.',
    specs: '14,000 sq ft · lawn',
    capacity: '1,500 pax',
    image: '/images/weddings/sudesh-lawns.webp',
  },
  {
    id: 'cocktail-lawn',
    name: 'Cocktail Lawn',
    type: 'outdoor' as const,
    description:
      'A 9,000 sq ft lawn dedicated to lively cocktail parties — stylish receptions where the beauty of nature complements every toast.',
    specs: '9,000 sq ft · open-air',
    capacity: '200 pax seated',
    image: '/images/weddings/cocktail-lawn.webp',
  },
  {
    id: 'gourmet-lake-side-lawn',
    name: 'Gourmet Lake Side Lawn',
    type: 'outdoor' as const,
    description:
      'Adjacent to Gourmet By The Woods, this curated space offers breathtaking lake views and sophisticated charm — an ideal setting for fine-dining-led celebrations.',
    specs: 'Lakeside · adjacent to Gourmet By The Woods',
    capacity: 'Boutique celebrations',
    image: '/images/weddings/gourmet-lawn.webp',
  },
];

export const weddings = {
  title: 'The wedding that found its setting',
  description:
    'Pillarless halls, lakeside lawns, and forest clearings. From a twenty-person ceremony to a two-thousand-guest reception — one planner, one estate, every hour accounted for.',
  features: [
    'Eleven distinct venues — five indoor, six outdoor',
    'Capacity from twenty to two thousand',
    'A planner who only does your wedding',
    'Catering shaped to your family menu',
    'On-site rooms for every guest',
    'Decor and photography taken care of',
  ],
  image: '/images/weddings/gourmet-lawn.webp',
};

// Activity icons sourced from giovannivillage.com/media/icon-N.png — same
// numerical order as the live /resort-experiences/ page.
export const activities = [
  {
    id: 'ratapani-safari',
    title: 'Wild & Wonderful: Ratapani Safari',
    description:
      'Visit Ratapani Sanctuary for a safari experience like no other — home to the most naturally breeding tigers in India. Pre-booking required. Morning slot 6:00 – 8:00 AM, afternoon slot 1:00 – 3:00 PM.',
    category: 'Wildlife',
    image: '/images/experiences/icons/icon-1.webp',
  },
  {
    id: 'croquet',
    title: 'Old School Cool: Croquet',
    description: 'Engage in a game of Croquet — a classic pastime with a Giovanni twist.',
    category: 'Outdoor',
    image: '/images/experiences/icons/icon-2.webp',
  },
  {
    id: 'manual-scooters',
    title: 'Retro Rides: Manual Scooters',
    description: 'Kick, push, coast — the simple pleasure of a manual scooter ride around the resort.',
    category: 'Outdoor',
    image: '/images/experiences/icons/icon-3.webp',
  },
  {
    id: 'modern-kanche',
    title: 'Next-Gen Marbles: Modern Kanche',
    description: 'Experience the timeless game of Kanche, modernised for today’s generation.',
    category: 'Indoor',
    image: '/images/experiences/icons/icon-4.webp',
  },
  {
    id: 'board-games',
    title: 'Board of Fun: Board Games',
    description:
      'Ludo, Snakes and Ladders, Tambola, Scrabble, Jenga, Tic-Tac-Toe, Carrom, Uno, Modern Kanche, Foosball.',
    category: 'Indoor',
    image: '/images/experiences/icons/icon-5.webp',
  },
  {
    id: 'badminton-tennikoit',
    title: 'Badminton & Tennikoit',
    description: 'Rackets swish and Tennikoit rings soar — echo the village’s spirited athleticism.',
    category: 'Sport',
    image: '/images/experiences/icons/icon-6.webp',
  },
  {
    id: 'cycling',
    title: 'Ride & Glide: Cycling',
    description: 'Explore the resort on two wheels — perfect for a romantic ride or a family adventure.',
    category: 'Outdoor',
    image: '/images/experiences/icons/icon-7.webp',
  },
  {
    id: 'soft-touch-pool',
    title: 'Soft-Touch Swimming Pool',
    description: 'A tranquil oasis amidst the resort — perfect for a long dip or sunset float.',
    category: 'Wellness',
    image: '/images/experiences/icons/icon-8.webp',
  },
  {
    id: 'frisbee',
    title: 'Flying High: Frisbee',
    description: 'Get your adrenaline pumping with a good old game of Frisbee on the lawns.',
    category: 'Sport',
    image: '/images/experiences/icons/icon-9.webp',
  },
  {
    id: 'telescope-dinner',
    title: 'Dining with the Stars: Telescope Dinner at Pihu',
    description: 'Indulge in fine dining as you stargaze through telescopes at our rooftop restaurant.',
    category: 'Dining',
    image: '/images/experiences/icons/icon-10.webp',
  },
  {
    id: 'lake-side-leisure',
    title: 'Lake-Side Leisure: Catch Your Meal',
    description:
      'Sit back, relax — and maybe even catch your next meal at our lake. Our chefs will cook the fish to your liking.',
    category: 'Dining',
    image: '/images/experiences/icons/icon-11.webp',
  },
  {
    id: 'farm-breakfast',
    title: 'Farm Fresh Feast: Breakfast at Royalton Farms',
    description: 'An authentic farm-to-table meal, served right at our organic farm within the resort premises.',
    category: 'Dining',
    image: '/images/experiences/icons/icon-12.webp',
  },
  {
    id: 'elysium-spa',
    title: 'Elysium Spa: Path to Serenity',
    description:
      'Holistic treatments, yoga, meditation and wellness retreats in a sanctuary set among landscaped gardens.',
    category: 'Wellness',
    image: '/images/experiences/icons/icon-13.webp',
  },
  {
    id: 'open-air-theatre',
    title: 'Starry Nights: Open-Air Theatre',
    description: 'Enjoy your favourite films under the stars — with comfy love seats and freshly-popped popcorn.',
    category: 'Entertainment',
    image: '/images/experiences/icons/icon-14.webp',
  },
  {
    id: 'factory-visit',
    title: 'Behind the Magic: Giovanni Factory Visit',
    description: 'Take a guided tour of our factory and get a sneak-peek into how Giovanni luxury is crafted.',
    category: 'Heritage',
    image: '/images/experiences/icons/icon-15.webp',
  },
  {
    id: 'self-bbq',
    title: 'Grill & Chill: Self-Service Barbecue',
    description: 'Show off your grilling skills or simply enjoy the experience at our self-barbecue stations.',
    category: 'Dining',
    image: '/images/experiences/icons/icon-16.webp',
  },
  {
    id: 'farm-tour',
    title: 'Fields of Gold: Royalton Farms Tour',
    description: 'Walk through Royalton Farms — the working organic farm inside the estate — and meet the people who grow what reaches your plate.',
    category: 'Nature',
    image: '/images/experiences/icons/icon-17.webp',
  },
  {
    id: 'jhoolas',
    title: 'Swing High: Jhoolas',
    description: 'Multiple swings dotted around the resort — travel down memory lane.',
    category: 'Outdoor',
    image: '/images/experiences/icons/icon-18.webp',
  },
  {
    id: 'lakeside-fishing',
    title: 'Lake-Side Leisure: Fishing',
    description: 'Sit back, relax, and maybe even catch your next meal at our beautiful lake.',
    category: 'Outdoor',
    image: '/images/experiences/icons/icon-19.webp',
  },
  {
    id: 'fresh-milking',
    title: 'Golden Hour: Fresh Milking',
    description: 'Witness and participate in the fresh milking of cows at 4:30 PM — a truly unique experience.',
    category: 'Nature',
    image: '/images/experiences/icons/icon-20.webp',
  },
  {
    id: 'sunbathing',
    title: 'Soak Up the Sun: Sunbathing',
    description: 'Experience the joy of a perfect tan as you lounge in our sunbathing area.',
    category: 'Wellness',
    image: '/images/experiences/icons/icon-sunbathing.webp',
  },
  {
    id: 'junior-chef',
    title: 'Junior Chef Academy',
    description: 'Let children unleash their culinary skills in an exclusive setting under expert supervision.',
    category: 'Family',
    image: '/images/experiences/icons/junior-chef.webp',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Priya & Rahul Sharma',
    location: 'Mumbai',
    rating: 5,
    quote:
      'Our wedding at Giovanni Village was beyond magical. The team took care of every detail and our guests are still raving about the experience.',
    image: '/images/testimonials/testimonial-1.webp',
  },
  {
    id: 2,
    name: 'Amit Patel',
    location: 'Delhi',
    rating: 5,
    quote:
      'Perfect getaway for our corporate retreat. The facilities, food and service were impeccable.',
    image: '/images/testimonials/testimonial-2.webp',
  },
  {
    id: 3,
    name: 'Neha Reddy',
    location: 'Bangalore',
    rating: 5,
    quote:
      'The spa experience at Elysium was transformative. Combined with the serene natural surroundings, it was the perfect wellness retreat.',
    image: '/images/testimonials/testimonial-3.webp',
  },
];

export const footer = {
  about:
    'Giovanni Village — A Venture of Sudesh The Village Resort. An uber-luxury wildlife resort in Bhopal offering an unparalleled blend of nature, comfort and world-class hospitality.',
  quickLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Rooms & Suites', href: '/rooms' },
    { label: 'Dining', href: '/dining' },
    { label: 'Spa & Wellness', href: '/spa' },
    { label: 'Weddings & Events', href: '/weddings' },
    { label: 'Resort Experiences', href: '/experiences' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Cancellation Policy', href: '/cancellation' },
    { label: 'Disclaimer', href: '/disclaimer' },
  ],
  signature: 'A Giovanni Experience',
  copyright: `© ${new Date().getFullYear()} Giovanni Village. All rights reserved.`,
};
