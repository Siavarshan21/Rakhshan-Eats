import { useQuery } from '@tanstack/react-query';
import { groceryApi } from '../services/grocery.api';
import type { GroceryCategory, GroceryProduct } from '../../../types/grocery';

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

export function useCategories() {
  return useQuery<GroceryCategory[]>({
    queryKey: ['grocery', 'categories'],
    queryFn: groceryApi.getCategories,
    staleTime: STALE_TIME,
  });
}

export function useProducts() {
  return useQuery<GroceryProduct[]>({
    queryKey: ['grocery', 'products'],
    queryFn: groceryApi.getProducts,
    staleTime: STALE_TIME,
  });
}

export function useProductsByCategory(slug: string | null) {
  return useQuery<GroceryProduct[]>({
    queryKey: ['grocery', 'products', 'category', slug],
    queryFn: () => groceryApi.getProductsByCategory(slug!),
    enabled: !!slug,
    staleTime: STALE_TIME,
  });
}

export function useProductBySlug(slug: string | null) {
  return useQuery<GroceryProduct | undefined>({
    queryKey: ['grocery', 'product', slug],
    queryFn: () => groceryApi.getProductBySlug(slug!),
    enabled: !!slug,
    staleTime: STALE_TIME,
  });
}
