import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EyebrowProps {
  children: ReactNode;
  /** muted = secondary text colour, bronze = accent colour, white = on-image overlays */
  color?: 'muted' | 'bronze' | 'white';
  className?: string;
  as?: 'p' | 'span';
}

const colorClass = {
  muted: 'text-[var(--color-text-tertiary)]',
  bronze: 'text-[var(--color-text-secondary)]',
  white: 'text-white/85',
};

const Eyebrow = ({ children, color = 'muted', className, as: Tag = 'p' }: EyebrowProps) => (
  <Tag
    className={cn('text-xs sm:text-sm', colorClass[color], className)}
    style={{
      fontFamily: 'var(--font-eyebrow)',
      fontWeight: 'var(--weight-eyebrow)' as unknown as number,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'var(--transform-eyebrow)' as React.CSSProperties['textTransform'],
    }}
  >
    {children}
  </Tag>
);

export default Eyebrow;
