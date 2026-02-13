import { useCategories } from '../hooks/useGroceryData';
import { useCategoryStore } from '../store/category.store';
import { CategoryCard } from './CategoryCard';

export function CategoryList() {
  const { data: categories, isLoading, isError } = useCategories();
  const { selectedCategory, selectCategory, clearCategory } =
    useCategoryStore();

  if (isLoading) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="min-w-[110px] h-[130px] rounded-xl bg-gray-100 animate-pulse shrink-0"
          />
        ))}
      </div>
    );
  }

  if (isError || !categories) {
    return (
      <p className="text-sm text-red-500">Failed to load categories.</p>
    );
  }

  const handleClick = (slug: string) => {
    if (selectedCategory === slug) {
      clearCategory();
    } else {
      selectCategory(slug);
    }
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.id}
          category={cat}
          isActive={selectedCategory === cat.slug}
          onClick={handleClick}
        />
      ))}
    </div>
  );
}
