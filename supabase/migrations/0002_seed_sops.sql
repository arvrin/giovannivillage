-- ============================================================================
-- SOP seed library — pre-populated for Giovanni Village (luxury wildlife resort
-- + wedding venue near Bhopal, IHCL/Aman benchmark).
-- These are starting drafts. The team should edit them in-portal to reflect
-- actual property practice.
-- ============================================================================

insert into public.sops (slug, category, title, summary, body_md, tags) values

-- ── RESERVATIONS ────────────────────────────────────────────────────────────
('handling-new-lead', 'reservations',
 'Handling a new lead',
 'First-response playbook for any lead landing in the inbox.',
$$# Handling a new lead

## Goal
Respond to every lead within **2 working hours** during the day (09:00–21:00 IST) and within **the next working day** for overnight enquiries.

## Steps

1. **Acknowledge** within 2 hours — send a templated reply confirming receipt and that the concierge will follow up with a personalised proposal.
2. **Read the brief carefully.** Note: dates, party size, interest (stay / wedding / event), any specifics they mention.
3. **Classify the lead** in the portal: change status from `new` → `contacted`, assign to the appropriate owner:
   - Wedding & large events → Wedding planner
   - Stay-only enquiries → Concierge
   - F&B reservations → F&B Manager
   - Corporate offsites → Sales lead
4. **Call within 24 hours** if a phone number is present and the budget signals serious intent.
5. **Send a proposal** within 48 hours for wedding/event leads, 24 hours for stay leads.
6. **Update status** as you go — every status change auto-logs in the lead timeline.

## SLA targets
- First response: **2 working hours**
- Proposal sent: **24h (stay) / 48h (wedding)**
- Lead closed (booked or lost): **14 days**$$,
 array['leads', 'sla', 'response']),

('lead-qualification-checklist', 'reservations',
 'Lead qualification checklist',
 'Decide if a lead is qualified (proposal-worthy) or low-intent.',
$$# Lead qualification checklist

## What makes a qualified lead?

A lead is **qualified** when at least 3 of the following are true:
- Specific date window mentioned (not "sometime next year")
- Party size given
- Indicative budget shared OR room type/venue specified
- Contact info beyond email (phone or WA number)
- Has visited the website ≥2 times OR followed up themselves

## When to set status `qualified`
After your first call/email exchange, if 3+ signals are present, move the lead from `contacted` → `qualified` and add a note summarising the conversation.

## When to set status `lost`
- No response after 3 follow-ups across 10 days
- Explicit "not interested" reply
- Date conflicts unresolvable
- Budget gap > 40% with no flexibility$$,
 array['leads', 'qualification']),

('rate-discount-policy', 'reservations',
 'Rate & discount policy',
 'What you can and cannot offer without management approval.',
$$# Rate & discount policy

## Standard discounts (offer at your discretion)
- **Stay 3+ nights**: up to 10% off room rate (excluding peak weekends)
- **Repeat guest**: up to 10% off + complimentary upgrade subject to availability
- **Corporate / MOU partners**: pre-agreed rate sheet (see Sales drive)
- **Last-minute (within 7 days)**: up to 15% off non-peak rooms

## Requires GM approval
- > 15% discount on any rate
- Complimentary nights
- Complimentary banquet hall
- Waiver of cancellation policy

## Never offer
- Discounts on F&B against booked package value
- Discounts during long holiday weekends (Diwali, Christmas, New Year, Holi, Independence Day, Republic Day, Good Friday)
- Lower rate than corporate MOU partners

## How to request GM approval
DM the GM on WhatsApp with: lead name, date, requested discount %, justification. Wait for explicit "approved" reply before quoting the guest.$$,
 array['leads', 'pricing', 'gm-approval']),

-- ── FRONT DESK ──────────────────────────────────────────────────────────────
('guest-arrival-checkin', 'front_desk',
 'Guest arrival & check-in',
 'The Giovanni arrival ritual from gate to suite.',
$$# Guest arrival & check-in

## Pre-arrival (the day before)
- Check tomorrow's arrivals list in the PMS (IPMS247)
- Send a "We can't wait to welcome you" WhatsApp 24h before arrival with check-in time + parking instructions
- Brief housekeeping on any preferences flagged in the booking (allergies, anniversaries, pets)
- Pre-allocate rooms; flag VIPs to the GM

## At the gate
- Security greets the car by name where possible
- Offer a cold welcome drink (lemon-mint in summer, ginger-cardamom in winter)
- Valet handles luggage; never let a guest carry their own

## At reception
1. Walk the guest to a seated check-in spot — not a counter
2. Verify ID per government requirements (Aadhar / DL / Passport — see SOP "ID verification")
3. Confirm stay details + any add-ons (spa, safari, dining)
4. Hand over a printed Giovanni map + the day's experience schedule
5. Walk the guest to their suite personally; demonstrate key features (plunge pool, mini-bar, thermostat)

## In-suite welcome
- Welcome card hand-signed by the GM
- Fresh fruit + local sweet (mawa bati)
- Bottle of room-temp filtered water (no plastic)$$,
 array['front-desk', 'arrival', 'check-in']),

('id-verification', 'front_desk',
 'ID verification at check-in',
 'What IDs are accepted and how to record them.',
$$# ID verification at check-in

## Accepted documents (per Indian law)
- **Indian guests** (≥18 years): Aadhar Card, Driving License, Passport
- **Foreign nationals**: Passport + Visa
- **Children under 18**: parent/guardian carries the responsibility; school ID accepted if travelling alone with consent letter

## NOT accepted
- PAN card (no address)
- Voter ID (frequently photo-mismatched)
- Soft copies on phone (must be original or printed)

## Procedure
1. Scan or photograph the ID on the dedicated reception tablet
2. Upload to the IPMS booking record under "ID Documents"
3. Return the original to the guest
4. Foreign nationals: also fill the Form C and submit to local police within 24h$$,
 array['front-desk', 'compliance']),

('checkout', 'front_desk',
 'Guest check-out',
 'How to leave a guest wanting to come back.',
$$# Guest check-out

## Pre-checkout
- Settle minibar, spa, dining bills before the guest reaches reception
- Pre-print the invoice; do NOT make the guest wait for a tally

## At checkout
1. Greet by name, confirm the stay
2. Walk through the invoice line by line; offer email copy
3. Ask: "Was there anything we could have done better?" — log any feedback in the lead/guest record
4. Offer return-visit incentive: 10% off next stay, valid 6 months
5. Hand a parting gift — small jar of mango pickle or sandalwood incense
6. Walk the guest to their car

## Post-checkout
- Send a "Thank you" email within 24h with a link to leave a Google review
- Tag the guest record in the CRM for the next campaign$$,
 array['front-desk', 'checkout', 'retention']),

-- ── HOUSEKEEPING ────────────────────────────────────────────────────────────
('room-turn-standard', 'housekeeping',
 'Standard room turn',
 '45-minute cycle for stayover rooms.',
$$# Standard room turn (stayover)

**Target time: 45 minutes per room.**

## Sequence
1. **Open windows** — air the room for the first 10 minutes
2. **Strip beds** — sheets, pillowcases, duvet cover. Inspect mattress for stains
3. **Bathroom first** — toilet → shower → vanity → floor
4. **Restock** — towels (3 per person), bath amenities, water bottles (2)
5. **Make bed** — Giovanni linen standard (see "Bed-making spec")
6. **Dust & polish** — desk, side tables, window sills, mirrors
7. **Vacuum** — left-to-right systematic, including under bed
8. **Final pass** — coffee station refilled, remote controls aligned, AC at 23°C, curtains parted

## Special attention areas
- Plunge pool suites: check pool water clarity; report any issue
- Open-to-sky bath suites: scrub mineral deposits on bath rim daily
- Pet-friendly rooms: lint-roll all soft surfaces

## Quality check
Random 1-in-4 rooms inspected by Housekeeping Manager before marked "ready".$$,
 array['housekeeping', 'turnover']),

('lost-and-found', 'housekeeping',
 'Lost & found',
 'How we handle items left behind.',
$$# Lost & found

## Discovery
Any item found in a checked-out room is logged immediately:
- Item description, condition, location found, finder's name, room number, date

## Storage
- High-value (jewellery, electronics, cash): GM's safe
- Standard items: dedicated L&F locker at housekeeping desk

## Guest notification
- Front desk emails the guest within 24h via the booking record
- Wait 7 days for guest response

## Retention
- High-value: held for 6 months
- Standard: held for 90 days
- Toiletries / single-use: discarded same day

## Return
- Courier at guest's cost via Blue Dart / DTDC
- For VIP guests, Giovanni covers return shipping under ₹500$$,
 array['housekeeping', 'lost-found']),

-- ── FOOD & BEVERAGE ─────────────────────────────────────────────────────────
('restaurant-reservations', 'food_beverage',
 'Restaurant reservations',
 'Booking & seating across the four restaurants.',
$$# Restaurant reservations

## The four restaurants
- **Gourmet By The Woods** — fine dining; bookings mandatory; max table 8
- **Pihu** — rooftop; bookings mandatory weekends + telescope nights
- **Berry & Beans** — café; walk-ins always welcome
- **The Den** — bistro bar; walk-ins; large groups need notice

## House guests
- Auto-credit to the room folio with signature
- Always offer the first table preference (window, lake-facing, garden)

## External diners
- Take a deposit of ₹2,000 per cover for Gourmet By The Woods
- Confirm with a WhatsApp message + Google Maps pin
- Cancellation policy: 24h notice for refund; otherwise forfeited

## No-show
- House guests: note in the booking but no charge
- External diners: forfeit deposit + flag in CRM for next time$$,
 array['fnb', 'reservations']),

('dietary-allergies', 'food_beverage',
 'Dietary needs & allergies',
 'How we capture, communicate, and serve special meals.',
$$# Dietary needs & allergies

## Capture
- Front desk asks at check-in: "Any dietary preferences or allergies?"
- Logged into IPMS booking under "Dietary Notes"
- Flagged on the kitchen morning huddle for that day's covers

## Common cases
- **Jain**: no onion, garlic, root vegetables. Use clarified jain menu.
- **Diabetic**: low-sugar dessert option always available
- **Vegan**: explicit confirmation that ghee/butter/honey are excluded
- **Severe allergy (nuts, shellfish, gluten)**: separate prep area; chef to personally confirm with the guest

## Procedure for severe allergies
1. Server flags to chef before order is placed
2. Chef uses dedicated allergy-safe utensils + station
3. Dish carried separately, sealed plate
4. Server confirms allergy with the guest one more time at the table$$,
 array['fnb', 'compliance', 'allergies']),

-- ── KITCHEN ─────────────────────────────────────────────────────────────────
('kitchen-morning-huddle', 'kitchen',
 'Morning kitchen huddle',
 'The 10-minute daily standup before service.',
$$# Morning kitchen huddle

**Time: 09:30 daily. Attendance: head chef, all sous chefs, F&B manager.**

## Agenda
1. **Today's covers** — house guest count, restaurant bookings, banquets, BBQs
2. **VIP flags** — anniversaries, birthdays, repeat guests, journalists
3. **Dietary notes** — Jain / diabetic / allergy guests on property
4. **Special menus** — telescope night menu at Pihu, farm-to-table set menu
5. **Stock alerts** — any 86'd ingredients, weekend deliveries

## Output
- Chef writes the day plan on the kitchen whiteboard
- F&B manager pushes the same to the staff WhatsApp group$$,
 array['kitchen', 'service']),

-- ── SPA ─────────────────────────────────────────────────────────────────────
('spa-booking', 'spa',
 'Spa booking & turnover',
 'How to book and prepare an Elysium treatment.',
$$# Spa booking & turnover

## Booking
- Phone-only or in-room dial 7 to spa reception
- Confirm: treatment, duration, therapist preference (male/female), any health conditions
- 24h advance booking preferred; same-day if therapist available

## Pre-arrival prep (10 minutes before)
- Therapist preps the suite: dim lighting, warm towels, candle lit, music on
- Confirm oil preference for the treatment
- Verify any allergies (nut oils especially)

## Post-treatment
- 10 minutes of quiet — therapist exits, guest rests with herbal tea
- Walk guest to relaxation lounge if no follow-on treatment
- Bill auto-credits to room folio

## Couple's spa
- Two suites adjacent, candles in both
- Pre-cued music sync
- Champagne option offered (charged separately)$$,
 array['spa', 'wellness']),

-- ── EVENTS ──────────────────────────────────────────────────────────────────
('wedding-enquiry-flow', 'events',
 'Wedding enquiry → booking flow',
 'The full path from first enquiry to signed contract.',
$$# Wedding enquiry → booking flow

## Day 0 — Enquiry lands
- Status: `new`
- Wedding planner picks it up in <2 hours
- Acknowledge with a templated WhatsApp/email
- Schedule a 30-min discovery call within 48h

## Day 1-3 — Discovery
- Call/meeting to understand:
  - Date(s) — confirm vs flexible
  - Guest count — and the breakdown (close family, extended, friends, work)
  - Functions — mehndi, haldi, sangeet, ceremony, reception
  - Vibe & references (Pinterest, IG)
  - Budget bracket
- Status: `contacted` → `qualified` if 3+ signals present

## Day 3-7 — Proposal
- Custom proposal deck (Canva template lives in `Brand Assets` Drive folder)
- Includes: venue layouts, capacity, sample menus, decor partners, indicative cost
- Send via email + WhatsApp PDF
- Status: `proposal_sent`

## Day 7-21 — Site visit
- Always offer a free 1-night stay for the couple to visit
- Walk all venue options, sample tasting, decor mood boards
- Introduce the dedicated planner who'd run their day

## Day 21+ — Contract
- 25% deposit to confirm
- Signed contract specifying:
  - All venues blocked
  - Inclusions & exclusions
  - Cancellation terms (see "Cancellation policy")
- Status: `booked`

## After booking
- Create a dedicated WhatsApp group: couple + family POC + Giovanni planner
- Weekly check-ins from day -60 to day -7$$,
 array['events', 'weddings', 'sales']),

('cancellation-policy', 'events',
 'Cancellation policy (weddings & stays)',
 'Refund rules customers and team need to know.',
$$# Cancellation policy

## Stays
- **>30 days before check-in**: 100% refund
- **15-30 days**: 50% refund
- **<15 days**: No refund; one-time reschedule at GM discretion
- **Peak dates** (Holi, Diwali, Christmas, New Year, Republic Day, Independence Day, Good Friday): No cancellation

## Weddings & events
- **>90 days before event**: 90% refund (10% admin fee)
- **60-90 days**: 50% refund
- **30-60 days**: 25% refund
- **<30 days**: No refund

## Force majeure
- Acts of god, government restrictions: full refund OR free reschedule within 12 months
- Documented health emergencies: case-by-case at GM discretion

## How to communicate
- Always show the policy in writing on the proposal
- Get explicit acknowledgement in the contract
- Repeat verbally at booking confirmation$$,
 array['policy', 'cancellation', 'finance']),

-- ── EXPERIENCES ─────────────────────────────────────────────────────────────
('ratapani-safari-booking', 'experiences',
 'Ratapani safari booking',
 'How to book and prepare guests for a tiger safari.',
$$# Ratapani safari booking

## Slots
- **Morning**: 06:00 – 08:00 (recommended for sightings)
- **Afternoon**: 13:00 – 15:00

## Booking lead time
- Pre-booking required, minimum 24 hours ahead
- Through the official Ratapani gate / approved tour operator partner
- ₹4,500 per jeep (up to 6 guests) — invoice to room folio

## Guest brief (day before)
- 5:30 AM pickup from suite for morning safari
- Wear earth tones (no whites, no reds)
- Carry: light jacket, sunglasses, binoculars provided
- No flash photography
- Quiet voices throughout the drive

## What's included
- Naturalist guide
- Mineral water + breakfast snack pack
- Pickup & drop from the resort

## On return
- Coffee/tea served at Berry & Beans
- Photo upload to the resort's shared album with guest consent$$,
 array['experiences', 'safari']),

-- ── MAINTENANCE ─────────────────────────────────────────────────────────────
('maintenance-request', 'maintenance',
 'Maintenance request workflow',
 'How to log, route, and close a guest-reported issue.',
$$# Maintenance request workflow

## Logging
- Front desk or housekeeping logs the request into the portal:
  - Room number, time, issue description, urgency (low/medium/high/critical)
  - Photo if applicable
- Auto-notifies the duty maintenance person via WhatsApp

## SLA targets
- **Critical** (no AC, no water, security): 15 min
- **High** (lights, plumbing, locks): 1 hour
- **Medium** (cosmetic, slow drain): same day
- **Low** (paint, polish): within 72h

## Closure
- Maintenance person updates the ticket: action taken, parts replaced
- Front desk confirms with the guest before marking closed
- Photo of fix uploaded$$,
 array['maintenance', 'sla']),

-- ── SECURITY ────────────────────────────────────────────────────────────────
('night-rounds', 'security',
 'Night security rounds',
 'The hourly walk after 22:00.',
$$# Night security rounds

**Frequency: hourly between 22:00 and 06:00.**

## Route
1. Main gate + visitor log audit
2. Reception lobby + key cabinet
3. Restaurant area + kitchen back-of-house
4. Each suite cluster (external perimeter)
5. Pool area + spa
6. Lake-side lawns + banquet halls
7. Staff quarters perimeter
8. Back-of-house storerooms + linen

## Log
- Tap each of the 12 RFID checkpoints
- Note anything unusual in the WhatsApp duty group
- Wake the duty manager only for: medical emergency, fire, intrusion, guest disturbance$$,
 array['security', 'night-shift']),

-- ── FINANCE ─────────────────────────────────────────────────────────────────
('daily-cash-reconciliation', 'finance',
 'Daily cash reconciliation',
 'End-of-day procedure for front desk + F&B.',
$$# Daily cash reconciliation

## Time
- Front desk: every shift change (07:00, 15:00, 23:00)
- Restaurants: 23:30 daily

## Procedure
1. Print the PMS/POS report for the shift
2. Count physical cash & match to system
3. Verify card transactions = settlement report
4. Settle UPI/WA payments against statement
5. Variance < ₹100: accepted; flag larger variance to F&B manager
6. Drop cash in the safe with the duty manager as witness
7. Log: shift, opening, closing, cash deposited, variance, manager-on-duty signature$$,
 array['finance', 'reconciliation']),

-- ── HR ──────────────────────────────────────────────────────────────────────
('staff-grooming', 'hr',
 'Staff grooming standards',
 'How the team presents — clean uniform, name tag, no exceptions.',
$$# Staff grooming standards

## Uniform
- Front desk: Giovanni cream linen + brass name tag
- Concierge: charcoal blazer + ivory pocket square
- Housekeeping: olive overall + closed-toe shoes
- F&B service: white shirt + black apron, black trousers
- Kitchen: chef whites or black tee + apron

## Personal grooming
- Hair tied back / styled, never untidy
- Trimmed nails, no chipped polish
- Subtle fragrance only (no strong perfumes — kitchen staff: none)
- No visible piercings beyond ears
- Tattoos covered where reasonably possible

## What to do at the start of every shift
1. Check uniform: clean, ironed, name tag pinned
2. Mirror check in the staff room
3. Sign in on the duty roster$$,
 array['hr', 'grooming', 'standards']),

-- ── GENERAL ─────────────────────────────────────────────────────────────────
('emergency-protocols', 'general',
 'Emergency protocols',
 'Fire, medical, weather, security — first 5 minutes.',
$$# Emergency protocols

## Universal first steps
1. **Stay calm.** Your composure sets the tone.
2. **Assess.** Is anyone hurt? Is the threat ongoing?
3. **Alert.** WhatsApp the duty group with location + nature
4. **Act on protocol below.**
5. **Log everything.**

## Fire
- Activate nearest alarm
- Use the closest extinguisher (CO₂ for electrical, ABC for everything else)
- Evacuate guests via marked routes to the assembly point (front lawn)
- Call 101 (fire) if not contained in 60 seconds

## Medical
- Call on-call doctor: see contact list
- For cardiac/respiratory: AED is at front desk + kitchen + spa reception
- Ambulance: call 108 or AIIMS Bhopal direct line
- Notify GM and the guest's emergency contact (in booking record)

## Weather (heavy rain / wind)
- Move outdoor events indoors
- Secure umbrellas, tents, pool covers
- Check rain-sensitive electricals at the lakeside

## Security incident
- Trespasser: do not engage; alert security gate + duty manager
- Theft: secure the area; preserve evidence; call 100 if needed
- Suspicious package: clear the area; do not touch; call security gate$$,
 array['emergency', 'safety']),

('vip-protocol', 'general',
 'VIP guest protocol',
 'How we recognise and host high-profile guests.',
$$# VIP guest protocol

## Who's a VIP
- Repeat guest (3+ stays)
- Anniversary / honeymoon guests
- Industry partners, journalists, influencers
- Government / corporate top brass
- Anyone flagged "VIP" in the booking by Sales or GM

## Pre-arrival
- GM signs the welcome card personally
- Suite pre-set with: their preferred drink, anniversary flowers if applicable, handwritten note
- Photo album of past visits printed (for repeat guests)

## During stay
- GM or Asst GM checks in once a day, briefly
- Personalised experience curated: private safari, chef's table, decor for any milestone
- All requests routed directly through the duty manager — no queue

## At checkout
- GM personally sees them off
- Send a thank-you note within 24h
- Schedule the next visit if possible$$,
 array['vip', 'service']);
