import ImageCard from '@/components/ui/ImageCard';
import Button from '@/components/ui/Button';
import { siteConfig, type Venue } from '@/lib/data';
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp-messages';
import { getWhatsAppLink, cn } from '@/lib/utils';

/**
 * One presentation language for venue cards across the estate. Each intent page
 * (weddings / meetings & events / celebrations) passes its own already-filtered
 * list plus an `intent`; the card derives the right WhatsApp enquiry message and
 * CTA label from that. This replaces the hand-rolled ImageCard+Button blocks
 * that were duplicated across all three pages.
 */
export type VenueIntent = 'wedding' | 'corporate' | 'intimate';

const INTENT: Record<
  VenueIntent,
  { message: (venue: string) => string; label: (venue: string) => string }
> = {
  wedding: {
    message: WHATSAPP_MESSAGES.weddingVenue,
    label: (name) => `Enquire about ${name}`,
  },
  corporate: {
    message: WHATSAPP_MESSAGES.corporateVenue,
    label: (name) => `Enquire about ${name}`,
  },
  intimate: {
    message: WHATSAPP_MESSAGES.privateVenue,
    label: () => 'Enquire',
  },
};

export function VenueCard({ venue, intent }: { venue: Venue; intent: VenueIntent }) {
  const { message, label } = INTENT[intent];
  return (
    <ImageCard
      image={venue.image}
      video={venue.video}
      alt={venue.name}
      aspect="video"
      eyebrow={`${venue.specs} · ${venue.capacity}`}
      title={venue.name}
      description={venue.description}
      footer={
        <Button
          variant="outline"
          size="md"
          external
          href={getWhatsAppLink(siteConfig.contact.whatsapp, message(venue.name))}
        >
          {label(venue.name)}
        </Button>
      }
    />
  );
}

export default function VenueGrid({
  venues,
  intent,
  className,
}: {
  venues: Venue[];
  intent: VenueIntent;
  /** Extra classes on the grid wrapper — typically vertical margins. */
  className?: string;
}) {
  return (
    <div className={cn('grid gap-8 md:grid-cols-2', className)}>
      {venues.map((v) => (
        <VenueCard key={v.id} venue={v} intent={intent} />
      ))}
    </div>
  );
}
