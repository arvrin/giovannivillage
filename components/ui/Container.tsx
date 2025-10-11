import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'default' | 'narrow' | 'wide' | 'full';
}

const Container = ({ children, className, maxWidth = 'default' }: ContainerProps) => {
  const maxWidthClasses = {
    default: 'max-w-7xl', // 1280px
    narrow: 'max-w-4xl',  // 896px
    wide: 'max-w-[1440px]', // 1440px
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        'mx-auto px-6 md:px-12 lg:px-16',
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
