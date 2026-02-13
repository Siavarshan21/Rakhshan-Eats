import React from 'react';

import { cn } from '../../../utils/helpers/classNames';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GridProps {
  children: React.ReactNode;
  /** Number of columns at each breakpoint. */
  cols?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /** Gap size between grid items (Tailwind spacing scale). Defaults to 4. */
  gap?: number;
  /** Additional className applied to the grid wrapper. */
  className?: string;
  /** HTML element to render. Defaults to 'div'. */
  as?: React.ElementType;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Maps a column count (1-12) to the corresponding Tailwind grid-cols class
 * for a given breakpoint prefix.
 */
function colClass(prefix: string, count: number): string {
  if (prefix === '') {
    return `grid-cols-${count}`;
  }
  return `${prefix}:grid-cols-${count}`;
}

/**
 * Maps a gap number to the corresponding Tailwind gap class.
 */
function gapClass(gap: number): string {
  return `gap-${gap}`;
}

// ---------------------------------------------------------------------------
// Grid Component
// ---------------------------------------------------------------------------

export const Grid: React.FC<GridProps> = ({
  children,
  cols = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = 4,
  className,
  as: Component = 'div',
}) => {
  const columnClasses = [
    colClass('', cols.default),
    cols.sm !== undefined ? colClass('sm', cols.sm) : null,
    cols.md !== undefined ? colClass('md', cols.md) : null,
    cols.lg !== undefined ? colClass('lg', cols.lg) : null,
    cols.xl !== undefined ? colClass('xl', cols.xl) : null,
  ].filter(Boolean);

  return (
    <Component
      className={cn(
        'grid',
        ...columnClasses,
        gapClass(gap),
        className,
      )}
    >
      {children}
    </Component>
  );
};

export default React.memo(Grid);
