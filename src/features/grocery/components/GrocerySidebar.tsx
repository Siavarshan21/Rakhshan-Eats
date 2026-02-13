import { cn } from '../../../utils/helpers/classNames';
import { useCategories } from '../hooks/useGroceryData';
import { useCategoryStore } from '../store/category.store';
import { useFilterStore } from '../store/filter.store';

export function GrocerySidebar() {
  const { data: categories } = useCategories();
  const { selectedCategory, selectCategory, clearCategory } =
    useCategoryStore();
  const { priceRange, setPriceRange, resetFilters } = useFilterStore();

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setPriceRange({ ...priceRange, min: isNaN(val) ? 0 : val });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setPriceRange({
      ...priceRange,
      max: isNaN(val) || val === 0 ? Infinity : val,
    });
  };

  const handleClearAll = () => {
    clearCategory();
    resetFilters();
  };

  return (
    <aside className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-5">
      {/* Categories */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Categories
        </h3>
        <ul className="flex flex-col gap-1">
          <li>
            <button
              type="button"
              onClick={clearCategory}
              className={cn(
                'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                !selectedCategory
                  ? 'bg-emerald-50 font-medium text-emerald-700'
                  : 'text-gray-600 hover:bg-gray-50',
              )}
            >
              <span>All Categories</span>
            </button>
          </li>
          {categories?.map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                onClick={() => selectCategory(cat.slug)}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                  selectedCategory === cat.slug
                    ? 'bg-emerald-50 font-medium text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50',
                )}
              >
                <span>{cat.name}</span>
                <span className="text-xs text-gray-400">{cat.productCount}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price range */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label htmlFor="price-min" className="sr-only">
              Min price
            </label>
            <input
              id="price-min"
              type="number"
              min={0}
              step={0.01}
              placeholder="Min"
              value={priceRange.min === 0 ? '' : priceRange.min}
              onChange={handleMinChange}
              className={cn(
                'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700',
                'placeholder:text-gray-400',
                'focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500',
              )}
            />
          </div>
          <span className="text-gray-400">-</span>
          <div className="flex-1">
            <label htmlFor="price-max" className="sr-only">
              Max price
            </label>
            <input
              id="price-max"
              type="number"
              min={0}
              step={0.01}
              placeholder="Max"
              value={priceRange.max === Infinity ? '' : priceRange.max}
              onChange={handleMaxChange}
              className={cn(
                'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700',
                'placeholder:text-gray-400',
                'focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500',
              )}
            />
          </div>
        </div>
      </div>

      {/* Clear filters */}
      <button
        type="button"
        onClick={handleClearAll}
        className={cn(
          'rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600',
          'transition-colors hover:bg-gray-50 hover:text-gray-800',
          'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
        )}
      >
        Clear All Filters
      </button>
    </aside>
  );
}
