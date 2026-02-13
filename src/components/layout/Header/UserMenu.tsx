import React, { useState, useRef, useEffect } from 'react';

import { cn } from '../../../utils/helpers/classNames';

// ---------------------------------------------------------------------------
// SVG Icons
// ---------------------------------------------------------------------------

const UserCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
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
      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface UserMenuProps {
  className?: string;
}

interface MenuItemConfig {
  label: string;
  onClick: () => void;
}

// ---------------------------------------------------------------------------
// UserMenu Component
// ---------------------------------------------------------------------------

export const UserMenu: React.FC<UserMenuProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const menuItems: MenuItemConfig[] = [
    {
      label: 'Profile',
      onClick: () => {
        // Placeholder for future auth
        setIsOpen(false);
      },
    },
    {
      label: 'Orders',
      onClick: () => {
        // Placeholder for future auth
        setIsOpen(false);
      },
    },
    {
      label: 'Settings',
      onClick: () => {
        // Placeholder for future auth
        setIsOpen(false);
      },
    },
    {
      label: 'Sign Out',
      onClick: () => {
        // Placeholder for future auth
        setIsOpen(false);
      },
    },
  ];

  return (
    <div ref={menuRef} className={cn('relative', className)}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'inline-flex items-center justify-center rounded-full p-2',
          'text-gray-600 dark:text-gray-300',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'focus:outline-none focus:ring-2 focus:ring-emerald-500',
          'transition-colors duration-200',
        )}
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <UserCircleIcon className="h-6 w-6" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={cn(
            'absolute right-0 mt-2 w-48',
            'rounded-lg border border-gray-200 dark:border-gray-700',
            'bg-white dark:bg-gray-800',
            'shadow-lg ring-1 ring-black/5',
            'py-1',
            'z-50',
          )}
          role="menu"
          aria-orientation="vertical"
        >
          {/* User info placeholder */}
          <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Guest User
            </p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
              Sign in for full access
            </p>
          </div>

          {/* Menu items */}
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              className={cn(
                'flex w-full items-center px-4 py-2 text-left text-sm',
                'text-gray-700 dark:text-gray-200',
                'hover:bg-gray-100 dark:hover:bg-gray-700',
                'transition-colors duration-150',
              )}
              role="menuitem"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(UserMenu);
