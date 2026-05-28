import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import FaqBlock from '@/components/ui/FaqBlock';
import { faqs, faqJsonLd, faqsGrouped, TOPIC_LABELS } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'Questions, Answered — Giovanni Village Resort',
  description:
    'Everything guests ask about Giovanni Village Resort in Bhopal — from room types and Ratapani safaris to dining, spa treatments, weddings, cancellation policy, and how to reach us.',
  alternates: { canonical: '/faq' },
};

const grouped = faqsGrouped();

export default function FaqPage() {
  return (
    <>
      <Header />

      {/* Single FAQPage schema with every Q&A from the site */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: faqJsonLd(faqs) }}
      />

      <main className="min-h-screen bg-[var(--color-background)] pb-16 pt-32 md:pt-36">
        <Container>
          <SectionHeader
            eyebrow="Questions, answered"
            title="Everything you might ask, in one place"
            description={`A complete reference of guest-asked questions about Giovanni Village Resort — ${faqs.length} answers across ${grouped.length} topics. Jump to a section, or browse the lot.`}
          />

          {/* Table of contents */}
          <nav
            aria-label="FAQ topics"
            className="mt-12 mx-auto max-w-4xl rounded-lg border border-[color:var(--color-border)] bg-[var(--color-background-secondary)] p-6 md:p-8"
          >
            <p
              className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-text-tertiary)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              Topics
            </p>
            <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {grouped.map(({ topic, items }) => (
                <li key={topic}>
                  <Link
                    href={`#${topic}`}
                    className="flex items-baseline justify-between gap-3 rounded-md px-3 py-2 text-sm text-[var(--color-text)] transition-colors hover:bg-[var(--color-bronze)]/10 hover:text-[var(--color-bronze)]"
                  >
                    <span className="font-medium">{TOPIC_LABELS[topic]}</span>
                    <span className="text-xs tabular-nums text-[var(--color-text-tertiary)]">
                      {items.length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>

        {grouped.map(({ topic, items }) =>
          items.length === 0 ? null : (
            <section
              key={topic}
              id={topic}
              className="border-t border-[color:var(--color-border)]/50 py-20 first-of-type:border-t-0 md:py-24"
              aria-label={TOPIC_LABELS[topic]}
            >
              <Container>
                <FaqBlock
                  topic={topic}
                  title={TOPIC_LABELS[topic]}
                  eyebrow={`${items.length} questions`}
                  bare
                />
              </Container>
            </section>
          ),
        )}

        {/* Still need help */}
        <Container>
          <div className="mx-auto mt-12 max-w-3xl rounded-lg bg-[var(--color-background-secondary)] p-10 text-center md:p-14">
            <p
              className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-text-tertiary)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              Still wondering
            </p>
            <h2
              className="font-heading text-2xl md:text-3xl"
              style={{ letterSpacing: '-0.02em', lineHeight: 1.15 }}
            >
              We&rsquo;ll answer whatever isn&rsquo;t here.
            </h2>
            <p className="mt-4 text-base text-[var(--color-text-secondary)]" style={{ lineHeight: 1.7 }}>
              Reservations:{' '}
              <a href="tel:+919039037300" className="text-[var(--color-bronze)] hover:underline">
                +91 90390 37300
              </a>{' '}
              · Email:{' '}
              <a
                href="mailto:reservations@giovannivillage.com"
                className="text-[var(--color-bronze)] hover:underline"
              >
                reservations@giovannivillage.com
              </a>
            </p>
            <p className="mt-4">
              <Link
                href="/contact"
                className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-bronze)] hover:underline"
              >
                Send a message →
              </Link>
            </p>
          </div>
        </Container>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
