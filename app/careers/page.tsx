import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PageHero from '@/components/ui/PageHero';
import IntroBlock from '@/components/ui/IntroBlock';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { siteConfig } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Work with us at Giovanni Village Resort, Bhopal. Roles across front office, F&B, kitchen, spa, housekeeping, events, maintenance and sales. Send your CV to hr@giovannivillage.com.',
  alternates: { canonical: '/careers' },
  openGraph: {
    title: 'Careers — Giovanni Village Resort',
    description: 'Make this estate your everyday.',
    url: '/careers',
    images: ['/images/hero/landscape-2.webp'],
  },
};

const departments = [
  { label: 'Front Office', body: 'Concierge, reservations, guest relations. The first and last face of the estate.' },
  { label: 'Food & Beverage', body: 'Service across three dining venues, banquets and in-room dining. Stewards, captains, sommeliers, baristas.' },
  { label: 'Kitchen', body: 'From Royalton-farm-fresh breakfasts to Chef Sabharwal\'s Kashmiri Rogan Josh. Chefs de partie through executive sous.' },
  { label: 'Spa & Wellness', body: 'Therapists, Ayurvedic practitioners, yoga instructors. The hands behind Elysium.' },
  { label: 'Housekeeping', body: 'Suites, public areas, banquet turnover. The team that makes the soft welcomes possible.' },
  { label: 'Events & Banquets', body: 'Planners, banquet captains, AV technicians. The team that holds the weddings, the conferences, the milestones.' },
  { label: 'Maintenance & Gardens', body: 'Engineering, horticulture, the soft-touch pool team. The infrastructure of a 23-acre estate.' },
  { label: 'Sales & Reservations', body: 'Inbound enquiries, corporate accounts, wedding RFPs, OTA management.' },
];

const perks = [
  'Two staff meals daily, from the same kitchens that serve the guests',
  'Accommodation for non-local hires, on a campus walking distance from the estate',
  'Quarterly training programs — Ayurvedic spa certification, sommelier basics, hospitality leadership',
  'Annual leave plus extra days for Diwali, Eid and Christmas',
  'Family meal discounts at the in-house restaurants for off-duty staff',
  'On-site infirmary, transport for late-evening shifts, and Royalton Farms produce at staff rates',
];

export default function CareersPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)]">
        <PageHero
          image="/images/hero/landscape-2.webp"
          alt="Work at Giovanni Village Resort"
          eyebrow="Work with us"
          title="Make this estate your everyday"
          description="There are houses you visit, and there are houses you build. We're looking for the people who'd rather build."
          video="/videos/golden-lawn.mp4"
        />

        <Container>
          <IntroBlock title="The Giovanni way of working">
            <p>
              The estate hosts 2,000-guest weddings and 4:30 PM milking walks, conferences and proposal dinners, the bride&apos;s family and a couple on their tenth anniversary. The teams that hold this rhythm care about the details that don&apos;t get noticed — the towel folded a particular way, the bowl of warm water at check-in, the second cup of coffee that arrived before you asked.
            </p>
            <p>
              If you like the small, careful, unfussy part of hospitality, you&apos;ll find a home here.
            </p>
          </IntroBlock>

          {/* Departments */}
          <SectionHeader title="Where we hire" eyebrow="Departments" className="mt-24" />
          <div className="mt-12 mb-24 grid md:grid-cols-2 gap-x-10 gap-y-8">
            {departments.map((d) => (
              <div key={d.label} className="border-t border-[color:var(--color-border)] pt-5">
                <h3
                  className="text-base text-[var(--color-text)]"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 'var(--weight-heading)' as unknown as number,
                    letterSpacing: 'var(--tracking-heading)',
                    textTransform: 'var(--transform-heading)' as React.CSSProperties['textTransform'],
                    lineHeight: 1.3,
                  }}
                >
                  {d.label}
                </h3>
                <p
                  className="mt-2 text-sm text-[var(--color-text-secondary)]"
                  style={{ fontFamily: 'var(--font-body)', lineHeight: 1.7 }}
                >
                  {d.body}
                </p>
              </div>
            ))}
          </div>

          {/* Perks */}
          <div className="bg-[var(--color-background-secondary)] rounded-lg p-12 md:p-16 mb-24">
            <SectionHeader title="What's in it, beyond the salary" eyebrow="What we offer" />
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              {perks.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-bronze)]" />
                  <span className="text-base text-[var(--color-text-secondary)]" style={{ lineHeight: 1.7 }}>
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Apply */}
          <div className="text-center max-w-3xl mx-auto pb-16">
            <SectionHeader
              title="Send us your CV"
              eyebrow="To apply"
              description="We don't keep a permanently open list of roles — write to us with what you do well and what you're looking for, and our HR team will respond within a few working days."
            />
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                href={`mailto:${siteConfig.contact.emailHr}?subject=${encodeURIComponent('Job enquiry — Giovanni Village Resort')}`}
              >
                Email HR
              </Button>
              <Button
                variant="outline"
                size="lg"
                href={`tel:${siteConfig.contact.phoneHr.replace(/\s/g, '')}`}
              >
                Call HR
              </Button>
            </div>
            <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--color-text-tertiary)]">
              <span>HR:</span>
              <a href={`mailto:${siteConfig.contact.emailHr}`} className="whitespace-nowrap text-[var(--color-bronze)] hover:underline">
                {siteConfig.contact.emailHr}
              </a>
              <span aria-hidden>·</span>
              <a href={`tel:${siteConfig.contact.phoneHr.replace(/\s/g, '')}`} className="whitespace-nowrap text-[var(--color-bronze)] hover:underline">
                {siteConfig.contact.phoneHr}
              </a>
            </p>
          </div>
        </Container>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
