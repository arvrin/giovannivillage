import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type ButtonBaseProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cta' | 'cta-outline';
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
      'gv-button inline-flex items-center justify-center font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-[var(--color-accent)] text-[var(--color-accent-contrast)] hover:bg-[var(--color-accent-hover)] focus:ring-[var(--color-accent)]',
      secondary:
        'bg-[var(--color-bg-alt)] text-[var(--color-text)] hover:bg-[var(--color-bg)] focus:ring-[var(--color-text)]',
      outline:
        'border-2 border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-contrast)] focus:ring-[var(--color-accent)]',
      ghost:
        'text-[var(--color-text)] hover:bg-[var(--color-bg-alt)] focus:ring-[var(--color-accent)]',
      cta:
        'bg-[var(--color-accent)] text-[var(--color-accent-contrast)] hover:bg-[var(--color-accent-hover)] focus:ring-[var(--color-accent)]',
      'cta-outline':
        'border-2 border-[var(--color-text-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-text-secondary)] hover:text-[var(--color-bg)] focus:ring-[var(--color-text-secondary)]',
    };

    const sizes = {
      sm: 'text-xs sm:text-sm px-4 py-2 rounded-[var(--radius-md)] tracking-[0.08em] uppercase',
      md: 'text-sm px-6 py-3 rounded-[var(--radius-md)] tracking-[0.1em] uppercase',
      lg: 'text-sm md:text-base px-8 py-4 rounded-[var(--radius-md)] tracking-[0.12em] uppercase',
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
          className="animate-spin h-5 w-5"
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
        <span>Loading...</span>
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
