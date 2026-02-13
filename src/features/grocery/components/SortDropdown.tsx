import { cn } from '../../../utils/helpers/classNames';
import { useFilterStore } from '../store/filter.store';
import { SORT_OPTIONS } from '../constants';
import type { ProductSortField } from '../../../types/grocery';
import type { SortDirection } from '../../../types/common';

export function SortDropdown() {
  const { sortField, sortDirection, setSortField, setSortDirection } =
    useFilterStore();

  const currentValue = `${sortField}-${sortDirection}`;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const lastDash = value.lastIndexOf('-');
    const field = value.slice(0, lastDash) as ProductSortField;
    const direction = value.slice(lastDash + 1) as SortDirection;
    setSortField(field);
    setSortDirection(direction);
  };

  return (
    <div className="relative">
      <label htmlFor="sort-select" className="sr-only">
        Sort products
      </label>
      <select
        id="sort-select"
        value={currentValue}
        onChange={handleChange}
        className={cn(
          'appearance-none rounded-lg border border-gray-300 bg-white',
          'py-2.5 pl-3 pr-10 text-sm text-gray-700',
          'focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500',
          'transition-colors duration-200 cursor-pointer',
        )}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Dropdown arrow */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
