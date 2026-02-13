import { ItemCard } from './ItemCard';
import type { GroceryProduct } from '../../../types/grocery';

interface ItemGridProps {
  products: GroceryProduct[];
  onProductClick?: (product: GroceryProduct) => void;
  isLoading?: boolean;
}

function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden animate-pulse">
      <div className="h-40 bg-gray-100" />
      <div className="flex flex-col gap-2 p-3">
        <div className="h-3 w-16 rounded bg-gray-100" />
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-3 w-20 rounded bg-gray-100" />
        <div className="h-5 w-16 rounded bg-gray-200 mt-2" />
        <div className="h-9 w-full rounded-lg bg-gray-100 mt-2" />
      </div>
    </div>
  );
}

export function ItemGrid({ products, onProductClick, isLoading }: ItemGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-300 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-600">No products found</h3>
        <p className="mt-1 text-sm text-gray-400">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ItemCard
          key={product.id}
          product={product}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
}
