import { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Container from '@/components/ui/Container';
import VideoBlock from '@/components/themes/retreat/VideoBlock';

interface PageHeroProps {
  image: string;
  alt?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  height?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
  spacing?: 'none' | 'standard';
  className?: string;
  /** Optional cinematic loop. Crossfades in over the poster image. */
  video?: string;
}

const heightClass = {
  sm: 'h-[62vh] min-h-[440px]',
  md: 'h-[72vh] min-h-[520px] md:h-[78vh]',
  lg: 'h-[78vh] min-h-[580px] md:h-[86vh]',
};

/**
 * Retreat page hero. Onest Light display headline with the last word rendered
 * in Hurricane brass-script — matching the homepage's signature pattern.
 * Falls back gracefully when the title is a ReactNode (no auto-accent applied).
 */
const renderTitle = (title: ReactNode) => {
  if (typeof title !== 'string') return title;
  const trimmed = title.trim();
  const lastSpace = trimmed.lastIndexOf(' ');
  if (lastSpace <= 0) {
    return <span className="font-script">{trimmed}</span>;
  }
  const lead = trimmed.slice(0, lastSpace);
  const accent = trimmed.slice(lastSpace + 1);
  return (
    <>
      {lead}{' '}
      <span className="font-script">{accent}</span>
    </>
  );
};

const RetreatPageHero = ({
  image,
  alt = '',
  eyebrow,
  title,
  description,
  align = 'left',
  height = 'md',
  children,
  spacing = 'standard',
  className,
  video,
}: PageHeroProps) => {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        heightClass[height],
        spacing === 'standard' ? 'mb-20 md:mb-28 lg:mb-32' : '',
        className,
      )}
    >
      {video ? (
        <div className="absolute inset-0" style={{ filter: 'brightness(0.62) contrast(1.05) saturate(1.1)' }}>
          <VideoBlock src={video} poster={image} alt={alt} />
        </div>
      ) : (
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          priority
          style={{ filter: 'brightness(0.62) contrast(1.05) saturate(1.1)' }}
        />
      )}
      {/* Strong base gradient — guarantees readability over any image brightness. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/35" />
      {/* Localised scrim where the title sits (bottom band, both sides). */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.35) 35%, transparent 70%)',
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 pb-14 md:pb-20 lg:pb-24">
        <Container>
          <div className={cn(isCenter && 'mx-auto max-w-5xl text-center')}>
            {eyebrow && (
              <div
                className={cn(
                  'mb-6 flex items-center gap-3 text-white/85',
                  isCenter ? 'justify-center' : 'justify-start',
                )}
              >
                <span className="h-px w-8 bg-white/55" />
                <span
                  className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase"
                  style={{
                    fontFamily: 'var(--font-eyebrow)',
                    textShadow: '0 1px 12px rgba(0,0,0,0.55)',
                  }}
                >
                  {eyebrow}
                </span>
              </div>
            )}
            <h1
              className="display-italic text-white text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[1.02]"
              style={{ textShadow: '0 2px 28px rgba(0,0,0,0.55)' }}
            >
              {renderTitle(title)}
            </h1>
            {description && (
              <p
                className={cn(
                  'mt-7 text-base md:text-lg lg:text-xl text-white/90',
                  isCenter ? 'mx-auto max-w-3xl' : 'max-w-2xl',
                )}
                style={{
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.7,
                  textShadow: '0 1px 16px rgba(0,0,0,0.45)',
                }}
              >
                {description}
              </p>
            )}
            {children && (
              <div
                className={cn(
                  'mt-9 flex flex-wrap gap-4',
                  isCenter ? 'justify-center' : 'justify-start',
                )}
              >
                {children}
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default RetreatPageHero;
