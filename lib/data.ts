/**
 * Giovanni Village Resort — content data
 * Sourced from the production WordPress site (giovannivillage.com).
 */

export const siteConfig = {
  name: 'Giovanni Village',
  legalName: 'Giovanni Village — A Venture of Sudesh The Village Resort',
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
    phone: '+91 90390 37300',
    phoneSecondary: '+91 90390 37302',
    email: 'reservations@giovannivillage.com',
    emailHr: 'hr@giovannivillage.com',
    whatsapp: '+91 90390 37300',
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
    '/images/hero/hero-1.jpg',
    '/images/hero/landscape-2.jpg',
    '/images/hero/landscape-3.jpg',
    '/images/hero/recent.jpg',
  ],
};

export const about = {
  title: 'Welcome to happiness',
  subtitle: 'The finest hotel at the best price',
  content: [
    'Giovanni Village is an uber-luxury wildlife resort in the city of lakes, Bhopal. Nestled in a lush 10-acre estate, only ~20 minutes from the city center, the resort offers a perfect blend of nature, elegance and warm hospitality.',
    'Whether you are planning a staycation near Bhopal, a family outing in Madhya Pradesh, or a grand wedding or celebration, Giovanni Village promises an unforgettable experience.',
    'Forest views, luxurious accommodations, spa indulgences and adventure activities await you – all curated to make Giovanni Village the best luxury resort in Bhopal for leisure and events.',
    'Embark on thrilling safaris at Ratapani Jungle, located just 1–5 km away. Spot tigers, leopards and rare birds — and return to the comfort of luxury after your wild encounter.',
  ],
  highlights: [
    {
      icon: 'hotel',
      title: 'Luxury Accommodations',
      description: 'Elegant rooms and suites with forest views and private plunge pools',
    },
    {
      icon: 'leaf',
      title: 'Wildlife & Nature',
      description: 'Ratapani tiger sanctuary safaris, organic farms and forest trails',
    },
    {
      icon: 'utensils',
      title: 'Four Restaurants',
      description: 'Gourmet By The Woods, Pihu, Berry & Beans and The Den',
    },
    {
      icon: 'spa',
      title: 'Elysium Spa & Wellness',
      description: 'Holistic therapies, yoga and meditation in tranquil surrounds',
    },
  ],
};

export const rooms = [
  {
    id: 'king-room-pool-garden',
    name: 'King Room — Pool and Garden View',
    description:
      'Wake up to the melodies of nature and panoramic forest vistas. Our King Rooms offer a perfect blend of comfort and natural beauty with stunning pool and garden views.',
    features: ['Pool View', 'Garden View', 'King Bed', 'Private Sit-Out'],
    capacity: '2 adults, 1 child',
    area: '430 sqft',
    image: '/images/rooms/king-pool-garden.jpg',
    gallery: [
      '/images/rooms/_galleries/king-pool-garden/01.jpg',
      '/images/rooms/_galleries/king-pool-garden/02.jpg',
      '/images/rooms/_galleries/king-pool-garden/03.jpg',
      '/images/rooms/_galleries/king-pool-garden/04.jpeg',
      '/images/rooms/_galleries/king-pool-garden/05.jpg',
      '/images/rooms/_galleries/king-pool-garden/06.jpg',
      '/images/rooms/_galleries/king-pool-garden/07.jpeg',
      '/images/rooms/_galleries/king-pool-garden/08.jpg',
      '/images/rooms/_galleries/king-pool-garden/09.jpg',
      '/images/rooms/_galleries/king-pool-garden/10.jpg',
    ],
    price: 9999,
  },
  {
    id: 'king-room-private-garden',
    name: 'King Room with Private Garden',
    description:
      'A spacious King Room with a generous private garden — your own slice of greenery to enjoy fresh forest air in complete seclusion.',
    features: ['Private Garden', 'King Bed', 'Garden Views', 'Premium Amenities'],
    capacity: '2 adults, 1 child',
    area: '700 sqft',
    image: '/images/rooms/king-private-garden.jpg',
    gallery: [
      '/images/rooms/_galleries/king-private-garden/01.jpg',
      '/images/rooms/_galleries/king-private-garden/02.jpg',
      '/images/rooms/_galleries/king-private-garden/03.jpg',
      '/images/rooms/_galleries/king-private-garden/04.jpg',
      '/images/rooms/_galleries/king-private-garden/05.jpeg',
      '/images/rooms/_galleries/king-private-garden/06.jpg',
      '/images/rooms/_galleries/king-private-garden/07.jpg',
    ],
    price: 10499,
  },
  {
    id: 'junior-suite-deck-garden',
    name: 'Junior Suite with Deck and Garden View',
    description:
      'Plush Junior Suite with an outdoor deck overlooking landscaped gardens — perfect for morning coffee or sundowner cocktails.',
    features: ['Outdoor Deck', 'Garden View', 'Living Area', 'Premium Bath'],
    capacity: '2 adults, 1 child',
    area: '540 sqft',
    image: '/images/rooms/junior-deck-garden.jpg',
    gallery: [
      '/images/rooms/_galleries/junior-deck-garden/01.jpg',
      '/images/rooms/_galleries/junior-deck-garden/02.jpg',
      '/images/rooms/_galleries/junior-deck-garden/03.jpeg',
      '/images/rooms/_galleries/junior-deck-garden/04.jpeg',
      '/images/rooms/_galleries/junior-deck-garden/05.jpg',
      '/images/rooms/_galleries/junior-deck-garden/06.jpeg',
      '/images/rooms/_galleries/junior-deck-garden/07.jpg',
      '/images/rooms/_galleries/junior-deck-garden/08.jpeg',
      '/images/rooms/_galleries/junior-deck-garden/09.jpg',
    ],
    price: 11999,
  },
  {
    id: 'junior-suite-deck-private-garden',
    name: 'Junior Suite with Deck and Private Garden',
    description:
      'Junior Suite with a private deck and walled garden, offering uninterrupted privacy amidst the resort’s verdant landscape.',
    features: ['Private Garden', 'Outdoor Deck', 'Living Area', 'Premium Bath'],
    capacity: '2 adults, 1 child',
    area: '700 sqft',
    image: '/images/rooms/junior-deck-private.jpg',
    gallery: [
      '/images/rooms/_galleries/junior-deck-private/01.jpg',
      '/images/rooms/_galleries/junior-deck-private/02.jpg',
      '/images/rooms/_galleries/junior-deck-private/03.jpg',
      '/images/rooms/_galleries/junior-deck-private/04.jpeg',
      '/images/rooms/_galleries/junior-deck-private/05.jpeg',
      '/images/rooms/_galleries/junior-deck-private/06.jpg',
      '/images/rooms/_galleries/junior-deck-private/07.jpg',
    ],
    price: 12999,
  },
  {
    id: 'junior-suite-bath-tub',
    name: 'Junior Suite with Open-to-Sky Bath Tub',
    description:
      'A sensual retreat featuring an outdoor open-to-sky bath tub — soak under the stars surrounded by greenery.',
    features: ['Open-to-Sky Bath', 'Plush Interiors', 'Living Area', 'Garden Vista'],
    capacity: '2 adults, 1 child',
    area: '530 sqft',
    image: '/images/rooms/junior-bath-tub.jpg',
    gallery: [
      '/images/rooms/_galleries/junior-bath-tub/01.jpeg',
      '/images/rooms/_galleries/junior-bath-tub/02.jpeg',
      '/images/rooms/_galleries/junior-bath-tub/03.jpeg',
      '/images/rooms/_galleries/junior-bath-tub/04.jpeg',
      '/images/rooms/_galleries/junior-bath-tub/05.jpeg',
      '/images/rooms/_galleries/junior-bath-tub/06.jpeg',
      '/images/rooms/_galleries/junior-bath-tub/07.jpeg',
    ],
    price: 13999,
  },
  {
    id: 'master-suite-bath-tub',
    name: 'Master Suite with Open-to-Sky Bath Tub',
    description:
      'Larger family-friendly Master Suite with the signature open-to-sky bath tub — designed for unforgettable celebrations and getaways.',
    features: ['Open-to-Sky Bath', 'Family Friendly', 'Living Area', 'Premium Amenities'],
    capacity: '2 adults, 2 children',
    area: '530 sqft',
    image: '/images/rooms/master-bath-tub.jpg',
    gallery: [
      '/images/rooms/_galleries/master-bath-tub/01.jpg',
      '/images/rooms/_galleries/master-bath-tub/02.jpeg',
      '/images/rooms/_galleries/master-bath-tub/03.jpg',
      '/images/rooms/_galleries/master-bath-tub/04.jpg',
      '/images/rooms/_galleries/master-bath-tub/05.jpeg',
      '/images/rooms/_galleries/master-bath-tub/06.jpg',
      '/images/rooms/_galleries/master-bath-tub/07.jpg',
      '/images/rooms/_galleries/master-bath-tub/08.jpg',
      '/images/rooms/_galleries/master-bath-tub/09.jpg',
      '/images/rooms/_galleries/master-bath-tub/10.jpg',
    ],
    price: 17499,
  },
  {
    id: 'junior-suite-plunge-pool',
    name: 'Junior Suite with Open-to-Sky Plunge Pool',
    description:
      'Indulgent Junior Suite featuring a private open-to-sky plunge pool — your personal oasis at Giovanni.',
    features: ['Private Plunge Pool', 'Open-to-Sky', 'Living Area', 'Garden Views'],
    capacity: '2 adults, 2 children',
    area: '530 sqft',
    image: '/images/rooms/junior-plunge-pool.jpg',
    gallery: [
      '/images/rooms/_galleries/junior-plunge-pool/01.jpeg',
      '/images/rooms/_galleries/junior-plunge-pool/02.jpeg',
      '/images/rooms/_galleries/junior-plunge-pool/03.jpeg',
      '/images/rooms/_galleries/junior-plunge-pool/04.jpeg',
      '/images/rooms/_galleries/junior-plunge-pool/05.jpg',
      '/images/rooms/_galleries/junior-plunge-pool/06.jpg',
    ],
    price: 14999,
  },
  {
    id: 'royal-suite-plunge-pool',
    name: 'Royal Suite with Plunge Pool and Private Garden',
    description:
      'Bespoke wilderness suite with a private plunge pool and a sprawling 2,000 sqft lawn — perfect for special occasions and intimate gatherings.',
    features: ['Private Plunge Pool', '2,000 sqft Lawn', 'Living Area', 'Butler Service'],
    capacity: '3 adults, 2 children',
    area: '1,100 sqft',
    image: '/images/rooms/royal-suite.jpg',
    gallery: [
      '/images/rooms/_galleries/royal-suite/01.jpg',
      '/images/rooms/_galleries/royal-suite/02.jpeg',
      '/images/rooms/_galleries/royal-suite/03.jpg',
      '/images/rooms/_galleries/royal-suite/04.jpeg',
      '/images/rooms/_galleries/royal-suite/05.jpg',
      '/images/rooms/_galleries/royal-suite/06.jpg',
      '/images/rooms/_galleries/royal-suite/07.jpg',
      '/images/rooms/_galleries/royal-suite/08.jpg',
      '/images/rooms/_galleries/royal-suite/09.jpeg',
    ],
    price: 21000,
  },
];

export const experiences = [
  {
    id: 'nature-wildlife',
    title: 'Nature & Wildlife',
    description:
      'Safaris at Ratapani Sanctuary (just 1–5 km away) — home to the highest count of naturally-breeding tigers in India.',
    image: '/images/experiences/hero.jpg',
    activities: ['Ratapani safari', 'Bird watching', 'Forest trails', 'Photography tours'],
  },
  {
    id: 'dining',
    title: 'Restaurants & Dining',
    description:
      'Four signature venues — from fine dining at Gourmet By The Woods to rooftop romance at Pihu, café bites at Berry & Beans, and bistro evenings at The Den.',
    image: '/images/dining/gourmet-by-the-woods.jpg',
    activities: ['Fine dining', 'Telescopic nights', 'Farm-to-table breakfast', 'Self-service barbecue'],
  },
  {
    id: 'wellness',
    title: 'Elysium Spa & Wellness',
    description:
      'Rejuvenate at Elysium Spa with holistic treatments, yoga and meditation amidst nature.',
    image: '/images/experiences/spa.jpg',
    activities: ['Massage therapy', 'Yoga sessions', 'Meditation', 'Wellness retreats'],
  },
  {
    id: 'events',
    title: 'Weddings & Events',
    description:
      'From intimate ceremonies to grand celebrations for up to 5,000 guests — pillarless banquet halls and lakeside lawns.',
    image: '/images/weddings/hero.jpg',
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
    image: '/images/dining/gourmet-by-the-woods.jpg',
    tags: ['Fine Dining', 'Multi-Course', 'Forest Setting'],
  },
  {
    id: 'pihu',
    name: 'Pihu',
    tagline: 'Dine under the stars',
    description:
      'Perched on our rooftop, Pihu offers an intimate setting with panoramic views, live music on weekends, telescopic nights and a diverse menu of international and local cuisines.',
    image: '/images/dining/pihu.jpg',
    tags: ['Rooftop', 'Candle-lit', 'Live Music', 'Telescope Nights'],
  },
  {
    id: 'berry-and-beans',
    name: 'Berry & Beans',
    tagline: 'Anytime cravings, sorted',
    description:
      'A bright, vibrant café — morning coffee, midday snacks, late-night dessert. Light bites, pastries and beverages in a social setting where good food meets great conversation.',
    image: '/images/dining/berry-and-beans.jpg',
    tags: ['Café', 'Coffee', 'Pastries', 'Casual'],
  },
  {
    id: 'the-den',
    name: 'The Den',
    tagline: 'Kick back and unwind',
    description:
      'Our bistro bar with an extensive list of wines, beers and spirits. Appetisers and comfort food, live sports nights and laid-back music — the perfect end to your day.',
    image: '/images/dining/the-den.jpg',
    tags: ['Bistro Bar', 'Wines & Spirits', 'Live Sports', 'Comfort Food'],
  },
];

export const weddingVenues = [
  {
    id: 'the-aria',
    name: 'The Aria',
    description:
      'A state-of-the-art banquet hall designed to accommodate an array of functions, with a vast attached lawn for indoor-outdoor flow.',
    specs: '10,000 sqft hall + 50,000 sqft attached lawn',
    capacity: 'Up to 5,000 guests',
    image: '/images/weddings/the-aria.jpg',
  },
  {
    id: 'sudesh-lawns',
    name: 'Sudesh Lawns',
    description:
      'Two outdoor lawns nestled between dense trees — perfect for dreamy outdoor gatherings, mandaps and sangeet evenings.',
    specs: '14,000 sqft + 51,000 sqft (two lawns)',
    capacity: 'Grand outdoor events',
    image: '/images/weddings/sudesh-lawns.png',
  },
  {
    id: 'the-forum',
    name: 'The Forum',
    description:
      'A multi-purpose space overlooking the pool — ideal for meetings, conferences, brand activations and intimate functions.',
    specs: '1,000 sqft',
    capacity: 'Conferences & meetings',
    image: '/images/weddings/the-forum.jpeg',
  },
  {
    id: 'cocktail-lawn',
    name: 'Cocktail Lawn',
    description:
      'A dedicated lawn for lively cocktail parties and casual receptions where the beauty of nature complements every toast.',
    specs: '9,000 sqft',
    capacity: '200 pax seated',
    image: '/images/weddings/cocktail-lawn.jpg',
  },
  {
    id: 'poolside-lawn',
    name: 'Poolside Lawn',
    description:
      'Set against the backdrop of lush greenery and our shimmering pool — a tranquil oasis for celebrations of every scale.',
    specs: 'Poolside',
    capacity: '100 pax',
    image: '/images/weddings/poolside-lawn.jpg',
  },
];

export const weddings = {
  title: 'Host Your Dream Wedding',
  description:
    'Say "I do" in the lap of nature. Pillarless banquet halls, lakeside pheras at sunset, cocktail parties under the stars — Giovanni Village is Bhopal’s most sought-after wedding resort.',
  features: [
    'Five distinct venues',
    'Capacity up to 5,000 guests',
    'Dedicated wedding planner',
    'Custom catering menus',
    'On-site accommodation for guests',
    'Decoration & photography support',
  ],
  image: '/images/weddings/hero.jpg',
};

export const activities = [
  {
    id: 'ratapani-safari',
    title: 'Wild & Wonderful: Ratapani Safari',
    description:
      'Visit Ratapani Sanctuary for a safari experience like no other — home to the most naturally breeding tigers in India. Pre-booking required. Morning slot 6:00 – 8:00 AM, afternoon slot 1:00 – 3:00 PM.',
    category: 'Wildlife',
    image: '/images/experiences/ratapani-safari.png',
  },
  {
    id: 'telescope-dinner',
    title: 'Dining with the Stars: Telescope Dinner at Pihu',
    description:
      'Indulge in fine dining as you stargaze through telescopes at our rooftop restaurant.',
    category: 'Dining',
    image: '/images/experiences/telescope-dinner.png',
  },
  {
    id: 'farm-breakfast',
    title: 'Farm Fresh Feast: Breakfast at Royalton Farms',
    description:
      'An authentic farm-to-table meal, served right at our organic farm within the resort premises.',
    category: 'Dining',
    image: '/images/experiences/farm-breakfast.png',
  },
  {
    id: 'lakeside-fishing',
    title: 'Lake-Side Leisure: Fishing',
    description:
      'Sit back, relax — and maybe even catch your next meal at our lake. Our chefs will cook the fish to your liking.',
    category: 'Outdoor',
    image: '/images/experiences/fishing-tile.png',
  },
  {
    id: 'open-air-theatre',
    title: 'Starry Nights: Open-Air Theatre',
    description:
      'Enjoy your favourite films under the stars — with comfy love seats and freshly-popped popcorn.',
    category: 'Entertainment',
    image: '/images/experiences/open-air-theatre.png',
  },
  {
    id: 'self-bbq',
    title: 'Grill & Chill: Self-Service Barbecue',
    description:
      'Show off your grilling skills or simply enjoy the experience at our self-barbecue stations.',
    category: 'Dining',
    image: '/images/experiences/self-barbecue.png',
  },
  {
    id: 'farm-tour',
    title: 'Fields of Gold: Royalton Farm Tour',
    description:
      'Walk through our fertile Royalton farms and learn about sustainable farming practices.',
    category: 'Nature',
    image: '/images/experiences/farm-tour.png',
  },
  {
    id: 'fresh-milking',
    title: 'Morning Glory: Fresh Milking Process',
    description:
      'Witness and participate in the fresh milking of cows at 4:30 AM — a truly unique experience.',
    category: 'Nature',
    image: '/images/experiences/fresh-milking.png',
  },
  {
    id: 'factory-visit',
    title: 'Behind the Magic: Giovanni Factory Visit',
    description:
      'Take a guided tour of our factory and get a sneak-peek into how Giovanni luxury is crafted.',
    category: 'Heritage',
    image: '/images/experiences/factory-visit.png',
  },
  {
    id: 'soft-touch-pool',
    title: 'Soft-Touch Swimming Pool',
    description:
      'A tranquil oasis amidst the resort — perfect for an unhurried dip or sunset float.',
    category: 'Wellness',
    image: '/images/experiences/soft-touch-pool.png',
  },
  {
    id: 'cycling',
    title: 'Ride & Glide: Cycling',
    description:
      'Explore the resort on two wheels — perfect for a romantic ride or a family adventure.',
    category: 'Outdoor',
    image: '/images/experiences/cycling-tile.png',
  },
  {
    id: 'badminton-tennikoit',
    title: 'Badminton & Tennikoit',
    description:
      'Rackets swish and Tennikoit rings soar — echo the village’s spirited athleticism.',
    category: 'Sport',
    image: '/images/experiences/badminton.png',
  },
  {
    id: 'frisbee',
    title: 'Flying High: Frisbee',
    description:
      'Get your adrenaline pumping with a good old game of Frisbee on the lawns.',
    category: 'Sport',
    image: '/images/experiences/frisbee.png',
  },
  {
    id: 'jhoolas',
    title: 'Swing High: Jhoolas',
    description:
      'Multiple swings dotted around the resort — travel down memory lane.',
    category: 'Outdoor',
    image: '/images/experiences/jhoolas.png',
  },
  {
    id: 'sunbathing',
    title: 'Soak Up the Sun: Sunbathing',
    description:
      'Experience the joy of a perfect tan as you lounge in our sunbathing area.',
    category: 'Wellness',
    image: '/images/experiences/sunbathing.png',
  },
  {
    id: 'board-games',
    title: 'Board of Fun: Board Games',
    description:
      'Ludo, Snakes and Ladders, Tambola, Scrabble, Jenga, Tic-Tac-Toe, Carrom, Uno, Modern Kanche, Foosball.',
    category: 'Indoor',
    image: '/images/experiences/board-games.png',
  },
  {
    id: 'croquet',
    title: 'Old School Cool: Croquet',
    description:
      'Engage in a game of Croquet — a classic pastime with a Giovanni twist.',
    category: 'Outdoor',
    image: '/images/experiences/croquet.png',
  },
  {
    id: 'manual-scooters',
    title: 'Retro Rides: Manual Scooters',
    description:
      'Kick, push, coast — the simple pleasure of a manual scooter ride around the resort.',
    category: 'Outdoor',
    image: '/images/experiences/manual-scooters.png',
  },
  {
    id: 'modern-kanche',
    title: 'Next-Gen Marbles: Modern Kanche',
    description:
      'Experience the timeless game of Kanche, modernised for today’s generation.',
    category: 'Indoor',
    image: '/images/experiences/modern-kanche.png',
  },
  {
    id: 'junior-chef',
    title: 'Junior Chef Academy',
    description:
      'Let children unleash their culinary skills in an exclusive setting under expert supervision.',
    category: 'Family',
    image: '/images/experiences/junior-chef.jpg',
  },
  {
    id: 'lake-side-leisure',
    title: 'Lake-Side Leisure',
    description:
      'Beautiful lake setting for sunset moments and quiet afternoons by the water.',
    category: 'Outdoor',
    image: '/images/experiences/lake-side-leisure.png',
  },
  {
    id: 'elysium-spa',
    title: 'Elysium Spa: Path to Serenity',
    description:
      'Holistic treatments, yoga, meditation and wellness retreats in a sanctuary set among landscaped gardens.',
    category: 'Wellness',
    image: '/images/experiences/elysium-spa.png',
  },
];

export const sisterProperties = [
  {
    id: 'giovanni-house',
    name: 'Giovanni House',
    tagline: 'Boutique Home Stay',
    description:
      'An intimate boutique home stay in the heart of Arera Colony — perfect for short city stays with the warmth of a Giovanni welcome.',
    location: 'E-4, Arera Colony, Bhopal',
    bookingUrl: 'https://live.ipms247.com/booking/roomlisting-giovannistays-hotelgiovannihouse-en',
    image: '/images/sister-properties/giovanni-house.jpg',
  },
  {
    id: 'giovanni-suites',
    name: 'Giovanni Suites',
    tagline: 'Boutique Home Stay',
    description:
      'Spacious suites for longer stays in central Bhopal — Giovanni hospitality, urban convenience.',
    location: 'E-8, Arera Colony, Bhopal',
    bookingUrl: 'https://live.ipms247.com/booking/roomlisting-giovannistays-hotelgiovannisuites-en',
    image: '/images/sister-properties/giovanni-suites.jpg',
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
    image: '/images/testimonials/testimonial-1.jpg',
  },
  {
    id: 2,
    name: 'Amit Patel',
    location: 'Delhi',
    rating: 5,
    quote:
      'Perfect getaway for our corporate retreat. The facilities, food and service were impeccable.',
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
