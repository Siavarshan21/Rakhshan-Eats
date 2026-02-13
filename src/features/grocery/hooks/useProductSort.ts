import { useMemo } from 'react';
import type { GroceryProduct, ProductSortField } from '../../../types/grocery';
import type { SortDirection } from '../../../types/common';

export function useProductSort(
  products: GroceryProduct[],
  sortField: ProductSortField,
  sortDirection: SortDirection,
): GroceryProduct[] {
  return useMemo(() => {
    const sorted = [...products].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'reviewCount':
          comparison = a.reviewCount - b.reviewCount;
          break;
        case 'createdAt':
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        default:
          comparison = 0;
      }

      return sortDirection === 'desc' ? -comparison : comparison;
    });

    return sorted;
  }, [products, sortField, sortDirection]);
}
