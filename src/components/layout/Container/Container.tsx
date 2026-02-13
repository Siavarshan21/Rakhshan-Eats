import React from 'react';

import { cn } from '../../../utils/helpers/classNames';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum width constraint for the container. Defaults to 'xl'. */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** HTML element to render. Defaults to 'div'. */
  as?: React.ElementType;
}

// ---------------------------------------------------------------------------
// Size mapping
// ---------------------------------------------------------------------------

const sizeStyles: Record<NonNullable<ContainerProps['size']>, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

// ---------------------------------------------------------------------------
// Container Component
// ---------------------------------------------------------------------------

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'xl',
  as: Component = 'div',
}) => {
  return (
    <Component
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </Component>
  );
};

export default React.memo(Container);
