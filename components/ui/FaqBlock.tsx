'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import { faqsByTopic, faqJsonLd, TOPIC_LABELS, type Faq, type FaqTopic } from '@/lib/faqs';

interface Props {
  /** Render only the FAQs for this topic. Pass an array to combine multiple. */
  topic: FaqTopic | FaqTopic[];
  /** Optional override for the section heading. Defaults to topic label + 'Questions'. */
  title?: string;
  /** Optional eyebrow. Defaults to 'Questions, answered'. */
  eyebrow?: string;
  /** Optional description below the heading. */
  description?: string;
  /** Render without the outer Container — useful when already nested inside one. */
  bare?: boolean;
}

export default function FaqBlock({
  topic,
  title,
  eyebrow = 'Questions, answered',
  description,
  bare = false,
}: Props) {
  const items: Faq[] = Array.isArray(topic)
    ? topic.flatMap((t) => faqsByTopic(t))
    : faqsByTopic(topic);

  if (items.length === 0) return null;

  const heading =
    title ??
    (Array.isArray(topic)
      ? 'Frequently asked questions'
      : `${TOPIC_LABELS[topic]} — questions`);

  const body = (
    <>
      <SectionHeader eyebrow={eyebrow} title={heading} description={description} />
      <ul className="mx-auto mt-12 max-w-3xl divide-y divide-[color:var(--color-border)]">
        {items.map((faq) => (
          <FaqRow key={faq.id} faq={faq} />
        ))}
      </ul>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: faqJsonLd(items) }}
      />
    </>
  );

  if (bare) return body;

  return (
    <section className="py-24" aria-label="Frequently asked questions">
      <Container>{body}</Container>
    </section>
  );
}

function FaqRow({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false);
  const headingId = `faq-q-${faq.id}`;
  const panelId = `faq-a-${faq.id}`;

  return (
    <li className="py-2">
      <h3 id={headingId}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-[var(--color-bronze)] focus:outline-none focus-visible:text-[var(--color-bronze)]"
        >
          <span
            className="font-heading text-base leading-snug md:text-lg"
            style={{ letterSpacing: '-0.01em' }}
          >
            {faq.question}
          </span>
          <ChevronDown
            aria-hidden
            className={`mt-1 h-5 w-5 shrink-0 text-[var(--color-bronze)] transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        hidden={!open}
        className="pb-6 pr-8 text-base leading-relaxed text-[var(--color-text-secondary)]"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {faq.answer}
      </div>
    </li>
  );
}
