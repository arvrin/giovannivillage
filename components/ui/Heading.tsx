'use client';

import { ReactNode, createElement } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  animate?: boolean;
  align?: 'left' | 'center' | 'right';
}

const Heading = ({
  children,
  level = 2,
  className,
  animate = true,
  align = 'left',
}: HeadingProps) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const headingContent = createElement(
    `h${level}`,
    { className: cn('font-heading', alignClasses[align], className) },
    children
  );

  if (!animate) {
    return headingContent;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {headingContent}
    </motion.div>
  );
};

export default Heading;
