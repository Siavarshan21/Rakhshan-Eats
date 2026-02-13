import { useState, useEffect } from 'react';
import { cn } from '../../../utils/helpers/classNames';
import { useDebounce } from '../../../hooks/useDebounce';
import { useFilterStore } from '../store/filter.store';
import { SEARCH_DEBOUNCE_MS } from '../constants';

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useFilterStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const debouncedQuery = useDebounce(localQuery, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  // Sync external changes back to local state
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Search icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Search products..."
        className={cn(
          'w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-10 text-sm text-gray-700',
          'placeholder:text-gray-400',
          'focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500',
          'transition-colors duration-200',
        )}
      />

      {/* Clear button */}
      {localQuery && (
        <button
          type="button"
          onClick={handleClear}
          className={cn(
            'absolute right-2 top-1/2 -translate-y-1/2',
            'flex h-6 w-6 items-center justify-center rounded-full',
            'text-gray-400 hover:bg-gray-100 hover:text-gray-600',
            'transition-colors duration-200',
          )}
          aria-label="Clear search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
