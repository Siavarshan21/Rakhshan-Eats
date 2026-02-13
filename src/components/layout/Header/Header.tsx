import React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '../../../utils/helpers/classNames';
import { useCartStore, selectItemCount } from '../../../features/checkout/store/cart.store';
import { useUIStore } from '../../../store/ui.store';
import { useThemeStore } from '../../../store/theme.store';
import { Navigation } from './Navigation';

// ---------------------------------------------------------------------------
// SVG Icons
// ---------------------------------------------------------------------------

const CartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-5.98.572l-.003.044m5.983-.616h9.75a2.25 2.25 0 002.166-1.64l1.744-6.276a.75.75 0 00-.726-.934H5.256m11.994 8.85a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-8.25 1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
    />
  </svg>
);

const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
    />
  </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.718 9.718 0 0118 15.75 9.75 9.75 0 018.25 6c0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25 9.75 9.75 0 0012.75 21a9.753 9.753 0 008.002-5.998z"
    />
  </svg>
);

const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

// ---------------------------------------------------------------------------
// Header Component
// ---------------------------------------------------------------------------

export const Header: React.FC = () => {
  const itemCount = useCartStore(selectItemCount);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const { resolvedTheme, toggleTheme } = useThemeStore();

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full',
        'border-b border-gray-200 dark:border-gray-700',
        'bg-white/80 dark:bg-gray-900/80',
        'backdrop-blur-md',
        'transition-colors duration-300',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Hamburger (mobile) + Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={toggleSidebar}
            className={cn(
              'inline-flex items-center justify-center rounded-md p-2 lg:hidden',
              'text-gray-600 dark:text-gray-300',
              'hover:bg-gray-100 dark:hover:bg-gray-800',
              'focus:outline-none focus:ring-2 focus:ring-emerald-500',
              'transition-colors duration-200',
            )}
            aria-label="Open navigation menu"
          >
            <MenuIcon className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 select-none">
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Rakhshan{' '}
              <span className="text-emerald-600 dark:text-emerald-400">Eats</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop navigation */}
        <div className="hidden lg:flex">
          <Navigation />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className={cn(
              'inline-flex items-center justify-center rounded-full p-2',
              'text-gray-600 dark:text-gray-300',
              'hover:bg-gray-100 dark:hover:bg-gray-800',
              'focus:outline-none focus:ring-2 focus:ring-emerald-500',
              'transition-colors duration-200',
            )}
            aria-label={
              resolvedTheme === 'dark'
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
          >
            {resolvedTheme === 'dark' ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>

          {/* Cart button */}
          <Link
            to="/cart"
            className={cn(
              'relative inline-flex items-center justify-center rounded-full p-2',
              'text-gray-600 dark:text-gray-300',
              'hover:bg-gray-100 dark:hover:bg-gray-800',
              'focus:outline-none focus:ring-2 focus:ring-emerald-500',
              'transition-colors duration-200',
            )}
            aria-label={`Shopping cart with ${itemCount} items`}
          >
            <CartIcon className="h-5 w-5" />

            {itemCount > 0 && (
              <span
                className={cn(
                  'absolute -right-0.5 -top-0.5',
                  'flex h-5 min-w-[1.25rem] items-center justify-center',
                  'rounded-full bg-emerald-600 px-1',
                  'text-[10px] font-bold leading-none text-white',
                  'ring-2 ring-white dark:ring-gray-900',
                )}
              >
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
