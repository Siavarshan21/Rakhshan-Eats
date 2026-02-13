import { cn } from '../../../utils/helpers/classNames';
import { CATEGORY_EMOJIS, CATEGORY_COLORS } from '../constants';
import type { GroceryCategory } from '../../../types/grocery';

interface CategoryCardProps {
  category: GroceryCategory;
  isActive: boolean;
  onClick: (slug: string) => void;
}

export function CategoryCard({ category, isActive, onClick }: CategoryCardProps) {
  const emoji = CATEGORY_EMOJIS[category.slug] ?? '🛒';
  const color = CATEGORY_COLORS[category.slug] ?? category.color;

  return (
    <button
      type="button"
      onClick={() => onClick(category.slug)}
      className={cn(
        'flex flex-col items-center gap-2 rounded-xl p-4 min-w-[110px]',
        'transition-all duration-200 hover:scale-105 hover:shadow-md',
        'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
        isActive
          ? 'bg-emerald-50 ring-2 ring-emerald-500 shadow-md'
          : 'bg-white border border-gray-200 hover:border-gray-300',
      )}
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full text-2xl"
        style={{ backgroundColor: `${color}20` }}
      >
        {emoji}
      </div>
      <span
        className={cn(
          'text-sm font-medium text-center leading-tight',
          isActive ? 'text-emerald-700' : 'text-gray-700',
        )}
      >
        {category.name}
      </span>
      <span className="text-xs text-gray-400">
        {category.productCount} items
      </span>
    </button>
  );
}
