/**
 * Prefilled WhatsApp messages used as the body of every "Enquire" /
 * "Send a message" CTA across the site.
 *
 * They route to `siteConfig.contact.whatsapp` (the 37302 line connected to
 * the WhatsApp bot). The bot reads the opening "Hi Giovanni Village, I'd
 * like to {action} {object}" pattern to dispatch the right auto-response.
 *
 * Edit the strings here to retune the bot prompts — every CTA reads from
 * this file so changes flow site-wide automatically.
 */

export const WHATSAPP_MESSAGES = {
  /** Generic "Enquire" in the header + floating bottom button. */
  general:
    "Hi Giovanni Village, I'd like to enquire about a stay or event.",

  /** /dining → Send a Message */
  dining:
    "Hi Giovanni Village, I'd like to enquire about dining at the resort — the venues, menus and reservations.",

  /** /spa → Send a Message */
  spa:
    "Hi Giovanni Village, I'd like to enquire about Elysium Spa — treatments, packages and availability.",

  /** /experiences → Talk to Concierge */
  experiences:
    "Hi Giovanni Village, I'd like to plan experiences for my stay — Ratapani safaris, telescope dinners and on-property activities.",

  /** /weddings main "Plan your wedding day" → Send Message */
  wedding:
    "Hi Giovanni Village, I'd like to discuss hosting a wedding or event at the resort.",

  /** /weddings per-venue Enquire button — venue name is interpolated */
  weddingVenue: (venue: string) =>
    `Hi Giovanni Village, I'd like to enquire about hosting a wedding or event at ${venue}.`,

  /** /events main "Request a Proposal" — corporate / MICE / conferences */
  corporateEvent:
    "Hi Giovanni Village, I'd like to enquire about a corporate event — offsite, conference, brand activation or AGM. Please share availability and a proposal.",

  /** /events per-venue Enquire button — venue name interpolated */
  corporateVenue: (venue: string) =>
    `Hi Giovanni Village, I'd like to enquire about hosting a corporate event at ${venue}.`,

  /** /celebrations main CTA — milestones, anniversaries, birthdays */
  privateCelebration:
    "Hi Giovanni Village, I'd like to enquire about a private celebration — a milestone birthday, anniversary, proposal or intimate gathering.",

  /** /celebrations per-venue Enquire — venue name interpolated */
  privateVenue: (venue: string) =>
    `Hi Giovanni Village, I'd like to enquire about hosting a private celebration at ${venue}.`,

  /** /venues/[id] detail page — intent-agnostic enquiry, venue name interpolated */
  venueEnquiry: (venue: string) =>
    `Hi Giovanni Village, I'd like to enquire about ${venue} — availability, capacity and what's included.`,

  /** /rooms — Talk to a human about a stay */
  roomsConcierge:
    "Hi Giovanni Village, I'd like to talk to the concierge about a stay.",

  /** Optional per-room enquiry (kept for future per-room CTAs) */
  roomSpecific: (room: string) =>
    `Hi Giovanni Village, I'd like to enquire about the ${room} — availability and what's included.`,

  /** /faq → "Send a message →" */
  faq:
    "Hi Giovanni Village, I have a question I couldn't find in the FAQ on your site.",

  /** /not-found → "Talk to the concierge" */
  notFound:
    "Hi Giovanni Village, I landed on a page that no longer exists. Could you point me in the right direction?",

  /** Home TheGiovanniWay → "Get in touch" */
  homeGetInTouch:
    "Hi Giovanni Village, I'd like the team to take the planning out of my getaway — could you help?",
} as const;
