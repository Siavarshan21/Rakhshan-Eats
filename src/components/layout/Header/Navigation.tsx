import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { cn } from '../../../utils/helpers/classNames';

// ---------------------------------------------------------------------------
// Navigation items
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Grocery', path: '/grocery' },
] as const;

// ---------------------------------------------------------------------------
// Navigation Component
// ---------------------------------------------------------------------------

export interface NavigationProps {
  /** Orientation of the nav links. Defaults to 'horizontal'. */
  orientation?: 'horizontal' | 'vertical';
  /** Optional callback fired after a link is clicked (useful for closing mobile drawer). */
  onNavigate?: () => void;
  /** Additional className applied to the wrapper. */
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  orientation = 'horizontal',
  onNavigate,
  className,
}) => {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={cn(
        orientation === 'horizontal'
          ? 'flex items-center gap-1'
          : 'flex flex-col gap-1',
        className,
      )}
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map((item) => {
        const active = isActive(item.path);

        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={cn(
              'relative rounded-lg px-3 py-2 text-sm font-medium',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-emerald-500',
              active
                ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800',
              orientation === 'vertical' && 'w-full',
            )}
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export { NAV_ITEMS };

export default React.memo(Navigation);
