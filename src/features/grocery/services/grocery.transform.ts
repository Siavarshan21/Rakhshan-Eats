import type { GroceryProduct, GroceryCategory } from '../../../types/grocery';

export function transformProductResponse(data: Record<string, unknown>): GroceryProduct {
  return data as unknown as GroceryProduct;
}

export function transformCategoryResponse(data: Record<string, unknown>): GroceryCategory {
  return data as unknown as GroceryCategory;
}

export function getProductDisplayPrice(product: GroceryProduct): string {
  return `$${product.price.toFixed(2)}`;
}

export function isOnSale(product: GroceryProduct): boolean {
  return product.originalPrice !== undefined && product.originalPrice > product.price;
}

export function getDiscountPercentage(product: GroceryProduct): number {
  if (!product.originalPrice || product.originalPrice <= product.price) return 0;
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
}
