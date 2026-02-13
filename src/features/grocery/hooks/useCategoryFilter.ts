import { useMemo } from 'react';
import { useCategoryStore } from '../store/category.store';
import type { GroceryProduct } from '../../../types/grocery';

export function useCategoryFilter(products: GroceryProduct[]) {
  const { selectedCategory, selectCategory, clearCategory, categories } =
    useCategoryStore();

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(
      (product) => product.category.slug === selectedCategory,
    );
  }, [products, selectedCategory]);

  return {
    categories,
    selectedCategory,
    selectCategory,
    clearCategory,
    filteredProducts,
  };
}
