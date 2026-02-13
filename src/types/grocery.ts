// ---------------------------------------------------------------------------
// Grocery Domain Types
// ---------------------------------------------------------------------------

import type { Dimensions3D, ID, Timestamp } from './common';

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

/**
 * A top-level grocery category (e.g. "Fruits", "Dairy").
 */
export interface GroceryCategory {
  /** Unique category identifier. */
  id: ID;
  /** Human-readable category name. */
  name: string;
  /** URL-safe slug derived from the name. */
  slug: string;
  /** Short description of the category. */
  description: string;
  /** URL of the category hero / thumbnail image. */
  imageUrl: string;
  /** Icon identifier used by the icon library. */
  iconName: string;
  /** Brand colour associated with the category (hex string). */
  color: string;
  /** Number of products belonging to this category. */
  productCount: number;
  /** Display order (lower = first). */
  order: number;
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

/** Visual badge that can be applied to a product card. */
export type ProductBadge = 'new' | 'sale' | 'organic' | 'popular';

/**
 * Nutritional information for a grocery product (per serving).
 */
export interface NutritionFacts {
  /** Energy in kilocalories. */
  calories: number;
  /** Protein in grams. */
  protein: number;
  /** Total carbohydrates in grams. */
  carbs: number;
  /** Total fat in grams. */
  fat: number;
  /** Dietary fibre in grams. */
  fiber: number;
  /** Sodium in milligrams. */
  sodium: number;
}

/**
 * A grocery product available for purchase.
 */
export interface GroceryProduct {
  /** Unique product identifier. */
  id: ID;
  /** Product display name. */
  name: string;
  /** URL-safe slug derived from the name. */
  slug: string;
  /** Detailed product description. */
  description: string;
  /** Current selling price. */
  price: number;
  /** Original price before any discount (may equal `price`). */
  originalPrice: number;
  /** Unit of measure (e.g. "kg", "piece", "litre"). */
  unit: string;
  /** Category this product belongs to. */
  category: GroceryCategory;
  /** URL of the primary product image. */
  imageUrl: string;
  /** URL of the 3-D model file (glTF / GLB) used in the 3-D view. */
  modelUrl: string | null;
  /** Average user rating (0 -- 5). */
  rating: number;
  /** Total number of user reviews. */
  reviewCount: number;
  /** Whether the product is currently in stock. */
  inStock: boolean;
  /** Remaining stock quantity. */
  stockQuantity: number;
  /** Nutritional information (optional for non-food items). */
  nutritionFacts: NutritionFacts | null;
  /** Searchable / filterable tags. */
  tags: string[];
  /** Visual badges shown on the product card. */
  badges: ProductBadge[];
  /** Product weight in grams. */
  weight: number;
  /** Physical dimensions of the product packaging. */
  dimensions: Dimensions3D;
  /** ISO-8601 date the product was first added. */
  createdAt: Timestamp;
  /** ISO-8601 date the product was last updated. */
  updatedAt: Timestamp;
}

// ---------------------------------------------------------------------------
// View & Sort
// ---------------------------------------------------------------------------

/** How the product catalogue is rendered. */
export type ViewMode = '2d' | '3d';

/** Fields a product list can be sorted by. */
export type ProductSortField =
  | 'name'
  | 'price'
  | 'rating'
  | 'reviewCount'
  | 'createdAt';

// ---------------------------------------------------------------------------
// Filters
// ---------------------------------------------------------------------------

/** Price range filter boundaries. */
export interface PriceRange {
  /** Minimum price (inclusive). */
  min: number;
  /** Maximum price (inclusive). */
  max: number;
}

/**
 * Filter criteria for querying products.
 */
export interface ProductFilters {
  /** Free-text search query. */
  search?: string;
  /** Category slugs to include. */
  categories?: string[];
  /** Price range filter. */
  priceRange?: PriceRange;
  /** Only show products that are in stock. */
  inStockOnly?: boolean;
  /** Only show products with a minimum rating. */
  minRating?: number;
  /** Only show products that have specific badges. */
  badges?: ProductBadge[];
  /** Only show products matching these tags. */
  tags?: string[];
}
