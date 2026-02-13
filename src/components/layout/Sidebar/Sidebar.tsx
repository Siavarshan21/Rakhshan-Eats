import React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '../../../utils/helpers/classNames';
import { Drawer } from '../../ui/Drawer/Drawer';
import { useUIStore } from '../../../store/ui.store';
import { useCategoryStore } from '../../../features/grocery/store/category.store';
import { Navigation } from '../Header/Navigation';

// ---------------------------------------------------------------------------
// Sidebar Component
// ---------------------------------------------------------------------------

export interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const isSidebarOpen = useUIStore((s) => s.isSidebarOpen);
  const closeSidebar = useUIStore((s) => s.closeSidebar);
  const categories = useCategoryStore((s) => s.categories);

  return (
    <Drawer
      isOpen={isSidebarOpen}
      onClose={closeSidebar}
      position="left"
      title="Menu"
      width="w-72 sm:w-80"
      className={cn('dark:bg-gray-900', className)}
    >
      <div className="flex flex-col gap-6">
        {/* Navigation links */}
        <div>
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Navigation
          </h3>
          <Navigation
            orientation="vertical"
            onNavigate={closeSidebar}
          />
        </div>

        {/* Divider */}
        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Category list */}
        <div>
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Categories
          </h3>

          {categories.length === 0 ? (
            <p className="px-3 text-sm text-gray-400 dark:text-gray-500">
              No categories available
            </p>
          ) : (
            <ul className="flex flex-col gap-0.5">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/grocery?category=${category.slug}`}
                    onClick={closeSidebar}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2',
                      'text-sm font-medium text-gray-600 dark:text-gray-300',
                      'hover:bg-gray-100 dark:hover:bg-gray-800',
                      'hover:text-gray-900 dark:hover:text-white',
                      'transition-colors duration-200',
                    )}
                  >
                    {/* Category color dot */}
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: category.color }}
                      aria-hidden="true"
                    />
                    <span className="truncate">{category.name}</span>
                    <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">
                      {category.productCount}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Divider */}
        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Cart link (mobile convenience) */}
        <div>
          <Link
            to="/cart"
            onClick={closeSidebar}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2',
              'text-sm font-medium text-gray-600 dark:text-gray-300',
              'hover:bg-gray-100 dark:hover:bg-gray-800',
              'hover:text-gray-900 dark:hover:text-white',
              'transition-colors duration-200',
            )}
          >
            {/* Cart icon */}
            <svg
              className="h-5 w-5 shrink-0"
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
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </Drawer>
  );
};

export default React.memo(Sidebar);
