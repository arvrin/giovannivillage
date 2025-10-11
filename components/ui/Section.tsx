import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'light' | 'dark' | 'primary';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Section = ({
  children,
  className,
  id,
  background = 'light',
  padding = 'lg',
}: SectionProps) => {
  const backgroundClasses = {
    light: 'bg-[var(--color-background)]',
    dark: 'bg-[var(--color-background-dark)] text-[var(--color-text-light)]',
    primary: 'bg-[var(--color-primary-50)]',
  };

  const paddingClasses = {
    none: '',
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-24 md:py-32 lg:py-40',
  };

  return (
    <section
      id={id}
      className={cn(
        'relative',
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
