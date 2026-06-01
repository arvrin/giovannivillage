import type { ReactNode } from 'react';
import RetreatPageHero from '@/components/themes/retreat/PageHero';

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
  /** Optional autoplay video that fades in over the poster image. */
  video?: string;
}

/**
 * Interior page hero. Retreat is the only design now.
 */
const PageHero = (props: PageHeroProps) => <RetreatPageHero {...props} />;

export default PageHero;
