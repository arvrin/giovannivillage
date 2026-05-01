import { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';

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
}

const heightClass = {
  sm: 'h-[60vh] min-h-[420px]',
  md: 'h-[70vh] min-h-[500px] md:h-[75vh]',
  lg: 'h-[75vh] min-h-[560px] md:h-[82vh]',
};

const PageHero = ({
  image,
  alt = '',
  eyebrow,
  title,
  description,
  align = 'center',
  height = 'md',
  children,
  spacing = 'standard',
  className,
}: PageHeroProps) => {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'relative w-full',
        heightClass[height],
        spacing === 'standard' ? 'mb-20 md:mb-28 lg:mb-32' : '',
        className,
      )}
    >
      <Image src={image} alt={alt} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 pb-14 md:pb-20 lg:pb-24">
        <Container>
          <div className={cn(isCenter && 'mx-auto max-w-5xl text-center')}>
            {eyebrow && (
              <Eyebrow color="white" className="mb-6">
                {eyebrow}
              </Eyebrow>
            )}
            <h1
              className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--weight-heading)' as unknown as number,
                letterSpacing: 'var(--tracking-heading)',
                textTransform: 'var(--transform-heading)' as React.CSSProperties['textTransform'],
                lineHeight: 1.05,
              }}
            >
              {title}
            </h1>
            {description && (
              <p
                className={cn(
                  'mt-8 text-base sm:text-lg md:text-xl lg:text-2xl text-white/90',
                  isCenter ? 'mx-auto max-w-3xl' : 'max-w-3xl',
                )}
                style={{ lineHeight: 1.6 }}
              >
                {description}
              </p>
            )}
            {children && (
              <div
                className={cn(
                  'mt-10 flex flex-wrap gap-4',
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

export default PageHero;
