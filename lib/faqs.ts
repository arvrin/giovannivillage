/**
 * FAQs for Giovanni Village Resort.
 *
 * Authoring rules (so each entry pulls weight for SEO + GEO):
 *  1. Phrase the question the way a guest would *actually* search it
 *     (start with How / What / Where / When / Why / Can / Is / Does).
 *  2. The answer's FIRST sentence must contain the literal answer.
 *     LLMs and AI search engines tend to extract / quote the opening line.
 *  3. Name "Giovanni Village" explicitly in the answer so the LLM
 *     associates the fact with the brand entity when citing.
 *  4. Be specific. Distances, prices, capacities, times — concrete numbers
 *     beat poetic prose. Soft answers earn no citations.
 *  5. Keep it to one question per entry — no compounds.
 *  6. Aim for ~40-90 words per answer. Too short = low value; too long = no extraction.
 *
 * Items are rendered both inline on topic pages (`<FaqBlock topic="..." />`)
 * and on the aggregator at `/faq`. Both surfaces emit JSON-LD `FAQPage` schema.
 */

export type FaqTopic =
  | 'general'
  | 'rooms'
  | 'dining'
  | 'spa'
  | 'weddings'
  | 'experiences'
  | 'contact';

export interface Faq {
  id: string;
  topic: FaqTopic;
  question: string;
  /** Plain-text answer. Newlines are preserved. Avoid HTML — emit clean text for schema. */
  answer: string;
  /** If true, this entry is featured (sorted first within its topic, considered for /faq highlights). */
  featured?: boolean;
}

export const TOPIC_LABELS: Record<FaqTopic, string> = {
  general: 'About Giovanni Village',
  rooms: 'Rooms & Suites',
  dining: 'Dining',
  spa: 'Spa & Wellness',
  weddings: 'Weddings & Events',
  experiences: 'Experiences & Activities',
  contact: 'Booking & Contact',
};

export const TOPIC_ORDER: FaqTopic[] = [
  'general',
  'rooms',
  'dining',
  'spa',
  'weddings',
  'experiences',
  'contact',
];

export const faqs: Faq[] = [
  // ─────────────────────────────────────────────────────────── General
  {
    id: 'where-is-giovanni-village',
    topic: 'general',
    question: 'Where is Giovanni Village Resort located?',
    answer:
      'Giovanni Village Resort is located at 410, Village Kalapani, Kolar Road, Bhopal, Madhya Pradesh — about a 20-minute drive from central Bhopal, on the edge of the Ratapani Tiger Reserve. The estate spans ten acres of mango groves, lily ponds and lakeside paths.',
    featured: true,
  },
  {
    id: 'distance-from-bhopal',
    topic: 'general',
    question: 'How far is Giovanni Village from Bhopal city?',
    answer:
      'Giovanni Village is roughly 20 minutes by road from central Bhopal via Kolar Road. The Ratapani Tiger Reserve gate is a further 1–5 km up the road, making the resort the closest luxury wildlife stay to the reserve.',
    featured: true,
  },
  {
    id: 'closest-airport-railway',
    topic: 'general',
    question: 'What is the nearest airport and railway station to Giovanni Village?',
    answer:
      'The nearest airport to Giovanni Village is Raja Bhoj International Airport (BHO) in Bhopal, and the nearest railway stations are Bhopal Junction (BPL) and Habibganj (now Rani Kamlapati, RKMP). Our reservations team can arrange airport pick-ups and transfers on request.',
  },
  {
    id: 'what-makes-giovanni-different',
    topic: 'general',
    question: 'What makes Giovanni Village different from other resorts near Bhopal?',
    answer:
      'Giovanni Village is the only luxury resort in the Bhopal region built on the edge of the Ratapani Tiger Reserve, with ten distinct forest-view suites, three dining venues, an in-house spa (Elysium), and twelve event venues — five indoor, seven outdoor — all inside a ten-acre working estate with its own organic farm (Royalton Farms). Pets are welcome across the property.',
    featured: true,
  },
  {
    id: 'pet-friendly',
    topic: 'general',
    question: 'Is Giovanni Village pet-friendly?',
    answer:
      'Yes — Giovanni Village is pet-friendly across the estate. We welcome dogs in the rooms, on the lawns, and in most public areas. Please let our reservations team know in advance so we can prepare the suite with the appropriate amenities.',
    featured: true,
  },
  {
    id: 'check-in-time',
    topic: 'general',
    question: 'What are the check-in and check-out times at Giovanni Village?',
    answer:
      'Standard check-in at Giovanni Village is from 2:00 PM and check-out is at 12:00 noon. Early check-in and late check-out can be requested at the time of booking and are subject to availability.',
  },
  {
    id: 'best-time-to-visit',
    topic: 'general',
    question: 'When is the best time to visit Giovanni Village?',
    answer:
      'The best time to visit Giovanni Village is between October and March, when the weather is cool and Ratapani safaris run at their fullest. The monsoon months (July–September) bring the estate alive with lush green and full lily ponds — beautiful for photography and slow stays, though safaris pause for the season.',
  },
  {
    id: 'giovanni-family-properties',
    topic: 'general',
    question: 'What other properties are part of the Giovanni family?',
    answer:
      'Beyond Giovanni Village Resort, the Giovanni family includes two boutique city stays in Bhopal — Giovanni House and Giovanni Suites in Arera Colony — for guests who prefer to be closer to the city. All properties are operated by the same hospitality group, A Venture of Sudesh The Village Resort.',
  },

  // ─────────────────────────────────────────────────────────── Rooms
  {
    id: 'how-many-rooms',
    topic: 'rooms',
    question: 'How many rooms and suite types does Giovanni Village have?',
    answer:
      'Giovanni Village offers ten distinct room and suite types — from a 430 sqft King Room with pool and garden views to the 1,100 sqft Royal Suite with a private plunge pool and a 2,000 sqft lawn. Every room opens to forest or garden views.',
    featured: true,
  },
  {
    id: 'plunge-pool-suites',
    topic: 'rooms',
    question: 'Which suites at Giovanni Village have private plunge pools?',
    answer:
      'Two suite categories at Giovanni Village come with private open-to-sky plunge pools: the Junior Suite with Open-to-Sky Plunge Pool, and the Royal Suite with Plunge Pool and Private Garden. The Royal Suite also includes a 2,000 sqft private lawn.',
    featured: true,
  },
  {
    id: 'open-sky-bath-suites',
    topic: 'rooms',
    question: 'Which suites have open-to-sky bath tubs?',
    answer:
      'Both the Junior Suite with Open-to-Sky Bath Tub and the larger family-friendly Master Suite with Open-to-Sky Bath Tub feature outdoor bathing under the sky at Giovanni Village. Each is screened for privacy by the surrounding greenery.',
  },
  {
    id: 'room-pricing',
    topic: 'rooms',
    question: 'How much does it cost to stay at Giovanni Village?',
    answer:
      'Room rates at Giovanni Village start at ₹9,999 per night for the King Room with Pool and Garden View, and go up to ₹21,000 per night for the Royal Suite with Plunge Pool and Private Garden. Rates vary by season; please check live availability for current pricing.',
    featured: true,
  },
  {
    id: 'room-capacity',
    topic: 'rooms',
    question: 'How many guests can stay in a room at Giovanni Village?',
    answer:
      'Most rooms and suites at Giovanni Village accommodate two adults and one child. The Master Suite and the Junior Suite with Plunge Pool accommodate two adults and two children, and the Royal Suite hosts three adults and two children.',
  },
  {
    id: 'family-rooms',
    topic: 'rooms',
    question: 'Are there family-friendly rooms at Giovanni Village?',
    answer:
      'Yes — the Master Suite with Open-to-Sky Bath Tub and the Royal Suite are designed for families, with extra living space and capacity for two children. Connecting room arrangements can be requested for larger families at the time of booking.',
  },
  {
    id: 'room-amenities',
    topic: 'rooms',
    question: 'What amenities come standard in every room at Giovanni Village?',
    answer:
      'Every room at Giovanni Village includes complimentary Wi-Fi, air-conditioning, a premium king bed, in-room dining, daily housekeeping, tea/coffee facilities, and access to the resort pool, spa and grounds. Specific suite features (plunge pool, deck, garden, open-to-sky bath) vary by room type.',
  },
  {
    id: 'forest-view',
    topic: 'rooms',
    question: 'Do all rooms at Giovanni Village have forest or garden views?',
    answer:
      'Yes — every one of the ten room and suite types at Giovanni Village opens to either the forest, the gardens, the pool, or a private garden of its own. None of the rooms face the road.',
  },

  // ─────────────────────────────────────────────────────────── Dining
  {
    id: 'how-many-restaurants',
    topic: 'dining',
    question: 'How many restaurants does Giovanni Village have?',
    answer:
      'Giovanni Village Resort has three signature dining venues on site: Gourmet By The Woods (fine dining under the canopy), Pihu (rooftop with telescope dinners), and Gazebo by the Lake (intimate lakeside service in a lantern-lit pavilion).',
    featured: true,
  },
  {
    id: 'fine-dining',
    topic: 'dining',
    question: 'Where is the fine-dining restaurant at Giovanni Village?',
    answer:
      'Gourmet By The Woods is the flagship fine-dining restaurant at Giovanni Village, set under the forest canopy with a menu crafted by world-renowned chefs. The kitchen draws from the on-site Royalton organic farm for many of its ingredients.',
  },
  {
    id: 'telescope-dinner',
    topic: 'dining',
    question: 'What is the telescope dinner at Pihu?',
    answer:
      'The telescope dinner is a signature experience at Pihu, Giovanni Village\'s rooftop restaurant — guests stargaze through resort telescopes between courses, with views of Saturn, the Pleiades and the Milky Way as the dishes arrive. Available on select weekend evenings; pre-booking recommended.',
  },
  {
    id: 'cuisine-types',
    topic: 'dining',
    question: 'What kinds of cuisine are served at Giovanni Village?',
    answer:
      'The kitchens at Giovanni Village serve North Indian, South Indian, Indo-Chinese, Pan-Asian, Italian and Mediterranean cuisines, with a strong Malwa and Bhopali regional focus on the indulgent end. Standout dishes include Chef Sabharwal\'s Mutton Roganjosh, Rajasthani Laal Maas, Bhopali Murgh Rizala and the signature Shahi Gulab Jamun.',
  },
  {
    id: 'vegetarian-vegan',
    topic: 'dining',
    question: 'Are vegetarian, vegan and Jain options available?',
    answer:
      'Yes — every Giovanni Village menu carries an extensive vegetarian section (clearly marked with green dots), and the kitchen can prepare vegan and Jain meals on request. Please inform our food handler at the time of ordering if you have specific dietary needs or allergies.',
    featured: true,
  },
  {
    id: 'in-room-dining',
    topic: 'dining',
    question: 'Is in-room dining available 24/7?',
    answer:
      'Yes — in-room dining is available round the clock at Giovanni Village, with a curated menu of appetisers, mains, breads, beverages and desserts. The full barbecue, biryani and tandoor sections are served during dedicated hours (12:00 PM–4:00 PM and 7:00 PM–11:00 PM).',
  },
  {
    id: 'view-menu',
    topic: 'dining',
    question: 'Where can I see the full Giovanni Village menu?',
    answer:
      'You can view the full Giovanni Village Restaurant Menu 2026 and the Bar & Beverage Collection 2026 as PDFs from the dining page, or download them directly. Menus include over 180 dishes and 120 beverages with prices, descriptions and calorie information.',
  },

  // ─────────────────────────────────────────────────────────── Spa
  {
    id: 'spa-name',
    topic: 'spa',
    question: 'What is the spa at Giovanni Village called?',
    answer:
      'The spa at Giovanni Village is called Elysium Spa — a sanctuary set among the resort\'s landscaped gardens, offering massages, Ayurvedic therapies, pain-relief packages and couple spa rituals.',
    featured: true,
  },
  {
    id: 'spa-treatments',
    topic: 'spa',
    question: 'What treatments are available at Elysium Spa?',
    answer:
      'Elysium Spa at Giovanni Village offers six chapters of treatments: Giovanni Signature Massages (Deep Tissue, Bamboo, Aromatherapy), Local Specialties (Hot Chocolate Oil, Flower Oil, Detoxifying Clay), Traditional Ayurvedic Therapies (Shirodhara, Potli, Abhyanga), Pain Relief Packages (Cupping, Acupressure), Express Treatments (Foot Reflexology, Facial Massage) and Couple Spa Packages (Romantic Retreat).',
    featured: true,
  },
  {
    id: 'spa-pricing',
    topic: 'spa',
    question: 'How much does a spa treatment at Giovanni Village cost?',
    answer:
      'Spa treatments at Elysium Spa start at ₹1,500 for a 30-minute Foot Reflexology or Facial Massage. Signature 60-minute massages range from ₹2,000 to ₹3,500, and the 90-minute couples\' Romantic Retreat is ₹6,000. The full price list is available on the spa menu.',
  },
  {
    id: 'spa-included',
    topic: 'spa',
    question: 'Is the spa included in the room rate?',
    answer:
      'Spa treatments at Giovanni Village are charged separately from the room rate. Guests are welcome to book individual treatments or full wellness packages — and we recommend reserving a slot at least a few hours in advance so the therapists can prepare the room with the right oils and music.',
  },
  {
    id: 'couple-spa',
    topic: 'spa',
    question: 'Does Giovanni Village offer couples\' spa treatments?',
    answer:
      'Yes — the Romantic Retreat at Elysium Spa is a 90-minute side-by-side couples\' massage with your choice of oils, priced at ₹6,000. It can be booked through the spa reception or as part of an anniversary or honeymoon package.',
  },
  {
    id: 'spa-booking',
    topic: 'spa',
    question: 'How do I book a spa treatment at Giovanni Village?',
    answer:
      'You can book a treatment at Elysium Spa by calling the spa reception, requesting it through your suite\'s in-room phone, or letting the concierge know at check-in. Pre-booking is recommended, especially for the Romantic Retreat and Ayurvedic therapies.',
  },

  // ─────────────────────────────────────────────────────────── Weddings
  {
    id: 'wedding-capacity',
    topic: 'weddings',
    question: 'What is the wedding capacity at Giovanni Village?',
    answer:
      'Giovanni Village hosts weddings from twenty guests to five thousand guests. The Aria Grand — a 9,500 sq ft pillarless banquet hall with an attached 50,000 sq ft lawn — is the largest single venue, while smaller venues like the Cocktail Lawn (200 pax) and Pool Lawn (100 pax) handle intimate ceremonies.',
    featured: true,
  },
  {
    id: 'wedding-venues',
    topic: 'weddings',
    question: 'How many wedding and event venues does Giovanni Village have?',
    answer:
      'Giovanni Village has twelve dedicated event venues — five indoor and seven outdoor. Indoor (air-conditioned): The Forum, Aria Deck, Aria I + II + Deck (3,500 sq ft), Aria III (6,000 sq ft), and Aria Grand (9,500 sq ft pillarless hall + 50,000 sq ft attached lawn). Outdoor: Pihu Deck, Sudesh II (51,000 sq ft), Banquet Lawn, Sudesh I (14,000 sq ft), Cocktail Lawn (9,000 sq ft), Gourmet Lake Side Lawn, and Pool Lawn. Indoor and outdoor venues can be mixed across a multi-day function.',
    featured: true,
  },
  {
    id: 'aria-grand-specs',
    topic: 'weddings',
    question: 'What are the dimensions of The Aria Grand banquet hall?',
    answer:
      'The Aria Grand at Giovanni Village is a 9,500 sq ft pillarless banquet hall with a 25-foot ceiling and a 50,000 sq ft attached lawn. It seats up to 5,000 guests across the combined indoor and outdoor footprint. The Aria Deck and the smaller Aria I + II + Deck (3,500 sq ft) and Aria III (6,000 sq ft) are also bookable indoor sub-spaces.',
  },
  {
    id: 'wedding-planner',
    topic: 'weddings',
    question: 'Does Giovanni Village provide a wedding planner?',
    answer:
      'Yes — every wedding at Giovanni Village is assigned a dedicated planner who only handles your event. The planner coordinates catering, decor, photography, music and on-site rooms across all functions, from a single ceremony to a five-day celebration.',
  },
  {
    id: 'wedding-rooms',
    topic: 'weddings',
    question: 'Can wedding guests stay on-site at Giovanni Village?',
    answer:
      'Yes — Giovanni Village can accommodate wedding guest blocks across its ten room categories, and for larger functions the entire resort can be booked out exclusively. Speak to our reservations team to plan room allocation for your guest list.',
  },
  {
    id: 'wedding-catering',
    topic: 'weddings',
    question: 'Is wedding catering done in-house at Giovanni Village?',
    answer:
      'Yes — all wedding catering at Giovanni Village is handled by the in-house kitchen team across our three dining venues and the dedicated banquet kitchen, with custom menus shaped around the family\'s preferences. Regional and international cuisines, live counters, and dietary-specific menus (Jain, vegan, gluten-free) can all be arranged.',
  },
  {
    id: 'pre-wedding-shoots',
    topic: 'weddings',
    question: 'Can I do a pre-wedding shoot at Giovanni Village?',
    answer:
      'Yes — Giovanni Village hosts pre-wedding photo and film shoots across the estate, with backdrops ranging from the mango groves and lily ponds to the pillarless Aria Grand and the lakeside Gourmet Lawn. Day-use packages can be arranged through the events team.',
  },

  // ─────────────────────────────────────────────────────────── Experiences
  {
    id: 'ratapani-safari',
    topic: 'experiences',
    question: 'How do I book a Ratapani tiger safari from Giovanni Village?',
    answer:
      'Ratapani Sanctuary safaris can be booked through the Giovanni Village concierge — the sanctuary gate is just 1–5 km away. Safaris run in two slots: morning 6:00 AM–8:00 AM and afternoon 1:00 PM–3:00 PM. Pre-booking is required as permits are limited.',
    featured: true,
  },
  {
    id: 'ratapani-tigers',
    topic: 'experiences',
    question: 'Are there tigers at Ratapani Tiger Reserve?',
    answer:
      'Yes — Ratapani Tiger Reserve, just minutes from Giovanni Village, is home to one of India\'s healthiest tiger populations and is known for the highest count of naturally-breeding tigers in the country. The reserve also shelters leopards, sloth bears, and over 200 bird species across its 900+ sq km of teak forest.',
    featured: true,
  },
  {
    id: 'activities-list',
    topic: 'experiences',
    question: 'What activities are available at Giovanni Village?',
    answer:
      'Giovanni Village offers over 20 on-site activities, including cycling, croquet, manual scooters, board games (Tambola, Carrom, Foosball, Jenga, Uno), badminton, frisbee, an open-air theatre, telescope dinners at Pihu, a self-service barbecue, a Junior Chef Academy for kids, and farm tours at the in-house Royalton Farms. The soft-touch swimming pool, lakeside fishing and morning milking experience round out the day.',
  },
  {
    id: 'kids-activities',
    topic: 'experiences',
    question: 'What activities are there for kids at Giovanni Village?',
    answer:
      'Giovanni Village runs a Junior Chef Academy where children cook under expert supervision, a kids\' open-air theatre, board games, manual scooters, frisbee, and a soft-touch swimming pool — plus the cow-milking experience at the on-site farm. Families travelling with children are welcomed in the Master Suite, Junior Plunge Pool Suite and Royal Suite.',
  },
  {
    id: 'farm-experience',
    topic: 'experiences',
    question: 'Can I visit the farm at Giovanni Village?',
    answer:
      'Yes — Royalton Farms is the working organic farm inside the Giovanni Village estate, and guests can join guided farm tours, farm-to-table breakfasts, and the 4:30 AM fresh-milking experience. The farm supplies much of the produce served across the resort\'s three dining venues.',
  },
  {
    id: 'swimming-pool',
    topic: 'experiences',
    question: 'Does Giovanni Village have a swimming pool?',
    answer:
      'Yes — Giovanni Village has a soft-touch swimming pool set amidst the resort grounds, open to all in-house guests. Selected suites (Junior Plunge Pool and Royal Suite) also feature their own private open-to-sky plunge pools.',
  },

  // ─────────────────────────────────────────────────────────── Contact / Booking
  {
    id: 'how-to-book',
    topic: 'contact',
    question: 'How do I make a reservation at Giovanni Village?',
    answer:
      'You can book Giovanni Village directly through our live availability portal, by calling our reservations team at +91 90390 37300, or by emailing reservations@giovannivillage.com. Direct bookings unlock our best-available rate and any seasonal offers.',
    featured: true,
  },
  {
    id: 'contact-number',
    topic: 'contact',
    question: 'What is the contact number for Giovanni Village?',
    answer:
      'The main reservations line for Giovanni Village is +91 90390 37300, and the F&B team can be reached at +91 90390 37302. WhatsApp is available on the same primary number, and email enquiries can be sent to reservations@giovannivillage.com.',
    featured: true,
  },
  {
    id: 'cancellation-policy',
    topic: 'contact',
    question: 'What is the cancellation policy at Giovanni Village?',
    answer:
      'Giovanni Village allows free re-booking when cancelled 15 or more days before arrival; cancellations between 15 days and 72 hours before check-in forfeit 50% of the deposit, which is held as credit for a future weekday booking. Within 72 hours of check-in, the full booking amount is due. No-shows forfeit the booking entirely.',
    featured: true,
  },
  {
    id: 'payment-methods',
    topic: 'contact',
    question: 'What payment methods does Giovanni Village accept?',
    answer:
      'Giovanni Village accepts all major credit and debit cards, UPI, net banking and direct bank transfers. For corporate, wedding and bulk bookings, custom invoicing and bank transfer arrangements can be made through our reservations team.',
  },
  {
    id: 'corporate-events',
    topic: 'contact',
    question: 'Does Giovanni Village host corporate events and offsites?',
    answer:
      'Yes — Giovanni Village hosts corporate offsites, conferences, brand activations and team retreats year-round. The Forum (1,000 sqft) is purpose-built for board meetings, while the Aria Grand and Cocktail Lawn handle larger conferences and product launches. AV setup, breakaway rooms and bespoke F&B can all be arranged.',
  },
  {
    id: 'special-occasions',
    topic: 'contact',
    question: 'Can Giovanni Village arrange anniversary, birthday or honeymoon packages?',
    answer:
      'Yes — Giovanni Village creates bespoke packages for honeymoons, anniversaries, birthdays and proposals, including curated meals, in-suite decor, spa rituals at Elysium, and private lake-side dinners. Please share the occasion with our reservations team at the time of booking so we can plan it ahead of your arrival.',
  },
  {
    id: 'careers',
    topic: 'contact',
    question: 'Does Giovanni Village have job openings?',
    answer:
      'Yes — career enquiries and job applications for Giovanni Village can be sent to hr@giovannivillage.com. We hire across hospitality, F&B, spa, housekeeping, events and front-office roles year-round.',
  },
];

/** Items filtered by topic, with `featured` items first. */
export function faqsByTopic(topic: FaqTopic): Faq[] {
  return faqs
    .filter((f) => f.topic === topic)
    .sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
}

/** All items grouped by topic in canonical order. */
export function faqsGrouped(): { topic: FaqTopic; items: Faq[] }[] {
  return TOPIC_ORDER.map((topic) => ({ topic, items: faqsByTopic(topic) }));
}

/** Builds the JSON-LD FAQPage schema string for a given list of FAQs. */
export function faqJsonLd(items: Faq[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  });
}
