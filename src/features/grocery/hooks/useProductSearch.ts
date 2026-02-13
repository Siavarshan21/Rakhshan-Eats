import { useMemo } from 'react';
import type { GroceryProduct } from '../../../types/grocery';

export function useProductSearch(
  products: GroceryProduct[],
  query: string,
): GroceryProduct[] {
  return useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return products;

    return products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(trimmed);
      const descMatch = product.description.toLowerCase().includes(trimmed);
      const tagMatch = product.tags.some((tag) =>
        tag.toLowerCase().includes(trimmed),
      );
      const categoryMatch = product.category.name
        .toLowerCase()
        .includes(trimmed);

      return nameMatch || descMatch || tagMatch || categoryMatch;
    });
  }, [products, query]);
}
