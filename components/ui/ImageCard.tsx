'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Card from './Card';
import Eyebrow from './Eyebrow';

interface ImageCardProps {
  image: string;
  alt: string;
  /** Aspect ratio for the image area. Default 4/3. */
  aspect?: 'video' | '4/3' | 'square' | 'tall';
  /** Optional fixed height for the image area instead of an aspect ratio. */
  imageHeight?: string;
  eyebrow?: string;
  title: ReactNode;
  meta?: ReactNode;
  description?: ReactNode;
  tags?: string[];
  /** CTA(s) rendered at the bottom of the card. */
  footer?: ReactNode;
  /** Wrap entire card in an anchor when set. */
  href?: string;
  /** Open href in a new tab. */
  external?: boolean;
  className?: string;
  /** Hover lift on the whole card. Default true. */
  hover?: boolean;
}

const aspectClass = {
  video: 'aspect-video',
  '4/3': 'aspect-[4/3]',
  square: 'aspect-square',
  tall: 'aspect-[3/4]',
};

const ImageCard = ({
  image,
  alt,
  aspect = '4/3',
  imageHeight,
  eyebrow,
  title,
  meta,
  description,
  tags,
  footer,
  href,
  external,
  className,
  hover = true,
}: ImageCardProps) => {
  const inner = (
    <div className="flex h-full flex-col bg-[var(--color-bg-alt)]">
      <div
        className={cn(
          'relative overflow-hidden',
          imageHeight ? imageHeight : aspectClass[aspect],
        )}
      >
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-7 md:p-9">
        {eyebrow && <Eyebrow color="bronze" className="mb-3">{eyebrow}</Eyebrow>}
        <h3
          className="text-xl md:text-2xl text-[var(--color-text)]"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 'var(--weight-heading)' as unknown as number,
            letterSpacing: 'var(--tracking-heading)',
            textTransform: 'var(--transform-heading)' as React.CSSProperties['textTransform'],
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>
        {meta && (
          <div className="mt-4 text-sm text-[var(--color-text-tertiary)]">{meta}</div>
        )}
        {description && (
          <p
            className="mt-4 text-base text-[var(--color-text-secondary)]"
            style={{ lineHeight: 1.7 }}
          >
            {description}
          </p>
        )}
        {tags && tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {tags.map((t) => (
              <li
                key={t}
                className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-bg)]/40 px-3 py-1 text-xs text-[var(--color-text-secondary)]"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
        {footer && <div className="mt-auto pt-6">{footer}</div>}
      </div>
    </div>
  );

  const cardEl = (
    <Card
      hover={hover}
      animate={false}
      className={cn('group h-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]', className)}
    >
      {inner}
    </Card>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="block h-full"
      >
        {cardEl}
      </a>
    );
  }
  return cardEl;
};

export default ImageCard;
