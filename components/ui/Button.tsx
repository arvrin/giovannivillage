import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Site-wide pill CTA. There is exactly one button language across Giovanni
 * Village — refined, rounded-full, uppercase eyebrow type.
 *
 * Variants
 * ────────
 *  primary        Solid forest fill. Default headline CTA.
 *  outline        Forest border, forest text. Secondary action.
 *  light          White solid, forest text. Use on dark/hero backgrounds.
 *  light-outline  Translucent white border, glass-blur, white text. Use on
 *                 dark/hero backgrounds as a secondary to `light`.
 *
 * Sizes (all rounded-full pills)
 * ──────────────────────────────
 *  sm   h-9   for header chips, tight nav pills
 *  md   h-11  for card-level CTAs (venues, rooms, dining venues)
 *  lg   h-12  for page-bottom headline CTAs
 *
 * `fullWidth` stretches the pill to fill its container — used by the
 * /rooms/[slug] booking column. Renders <a> when `href` is set, else <button>.
 */

type ButtonBaseProps = {
  variant?: 'primary' | 'outline' | 'light' | 'light-outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  href?: string;
  external?: boolean;
};

export interface ButtonProps
  extends ButtonBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled,
      children,
      href,
      external,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'gv-button font-eyebrow inline-flex items-center justify-center gap-3 rounded-full uppercase whitespace-nowrap transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-[var(--color-accent)] text-[var(--color-accent-contrast)] hover:bg-[var(--color-accent-hover)] focus:ring-[var(--color-accent)]',
      outline:
        'border border-[var(--color-forest,var(--color-accent))] text-[var(--color-forest,var(--color-accent))] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-contrast)] focus:ring-[var(--color-accent)]',
      light:
        'bg-white text-[var(--color-forest,var(--color-accent))] hover:bg-[var(--color-brass)] hover:text-white focus:ring-white',
      'light-outline':
        'border border-white/40 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 focus:ring-white',
    };

    const sizes = {
      sm: 'h-10 px-4 text-[10px] tracking-[0.20em] gap-2',
      md: 'h-11 px-5 text-[11px] tracking-[0.24em] gap-2.5',
      lg: 'h-12 px-6 text-[11px] md:text-[12px] lg:text-[13px] tracking-[0.28em]',
    };

    const composedClassName = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      loading && 'cursor-wait opacity-70',
      className
    );

    const inner = loading ? (
      <div className="flex items-center gap-2">
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span>Loading…</span>
      </div>
    ) : (
      children
    );

    if (href) {
      const isExternal =
        external ?? (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'));
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          style={(props as { style?: React.CSSProperties }).style}
          className={composedClassName}
        >
          {inner}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={composedClassName}
        disabled={disabled || loading}
        {...props}
      >
        {inner}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
