import { cn } from '../../../utils/helpers/classNames';
import { useCategories } from '../hooks/useGroceryData';
import { useCategoryStore } from '../store/category.store';

export function CategoryFilter() {
  const { data: categories } = useCategories();
  const { selectedCategory, selectCategory, clearCategory } =
    useCategoryStore();

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={clearCategory}
        className={cn(
          'rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1',
          !selectedCategory
            ? 'bg-emerald-600 text-white shadow-sm'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        )}
      >
        All
      </button>
      {categories?.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => selectCategory(cat.slug)}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1',
            selectedCategory === cat.slug
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
