import { Suspense, lazy, useMemo, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useFilterStore } from '../features/grocery/store/filter.store';
import { useCategoryStore } from '../features/grocery/store/category.store';
import { useGroceryStore } from '../features/grocery/store/grocery.store';
import { useSelectionStore } from '../features/grocery/store/selection.store';
import { useCartStore } from '../features/checkout/store/cart.store';
import {
  getMockProducts,
  getMockCategories,
} from '../features/grocery/services/grocery.mock';
import { formatCurrency } from '../utils/format/currency';
import { cn } from '../utils/helpers/classNames';
import type { GroceryProduct, ProductSortField } from '../types/grocery';
import type { SortDirection } from '../types/common';

// ---------------------------------------------------------------------------
// Lazy-loaded 3D components
// ---------------------------------------------------------------------------

const ThreeCanvas = lazy(() =>
  import('../three/canvas/ThreeCanvas').then((m) => ({
    default: m.ThreeCanvas,
  })),
);

const GroceryStoreScene = lazy(() =>
  import('../three/scenes/GroceryStoreScene').then((m) => ({
    default: m.GroceryStoreScene,
  })),
);

// ---------------------------------------------------------------------------
// Sort options
// ---------------------------------------------------------------------------

const SORT_OPTIONS: { label: string; field: ProductSortField; direction: SortDirection }[] = [
  { label: 'Name (A-Z)', field: 'name', direction: 'asc' },
  { label: 'Name (Z-A)', field: 'name', direction: 'desc' },
  { label: 'Price (Low-High)', field: 'price', direction: 'asc' },
  { label: 'Price (High-Low)', field: 'price', direction: 'desc' },
  { label: 'Rating (Best)', field: 'rating', direction: 'desc' },
  { label: 'Newest', field: 'createdAt', direction: 'desc' },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Search input bar */
const SearchBar: React.FC<{
  value: string;
  onChange: (query: string) => void;
}> = ({ value, onChange }) => (
  <div className="relative flex-1 max-w-md">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clipRule="evenodd"
      />
    </svg>
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
    />
  </div>
);

/** 2D / 3D view toggle */
const ViewToggle: React.FC<{
  viewMode: '2d' | '3d';
  onChange: (mode: '2d' | '3d') => void;
}> = ({ viewMode, onChange }) => (
  <div className="flex items-center bg-gray-100 rounded-lg p-1">
    <button
      type="button"
      onClick={() => onChange('2d')}
      className={cn(
        'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
        viewMode === '2d'
          ? 'bg-white text-emerald-700 shadow-sm'
          : 'text-gray-500 hover:text-gray-700',
      )}
    >
      2D Grid
    </button>
    <button
      type="button"
      onClick={() => onChange('3d')}
      className={cn(
        'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
        viewMode === '3d'
          ? 'bg-white text-emerald-700 shadow-sm'
          : 'text-gray-500 hover:text-gray-700',
      )}
    >
      3D Store
    </button>
  </div>
);

/** Sort dropdown */
const SortDropdown: React.FC<{
  sortField: ProductSortField;
  sortDirection: SortDirection;
  onSort: (field: ProductSortField, direction: SortDirection) => void;
}> = ({ sortField, sortDirection, onSort }) => {
  const currentValue = `${sortField}-${sortDirection}`;

  return (
    <select
      value={currentValue}
      onChange={(e) => {
        const [field, dir] = e.target.value.split('-') as [ProductSortField, SortDirection];
        onSort(field, dir);
      }}
      className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={`${opt.field}-${opt.direction}`} value={`${opt.field}-${opt.direction}`}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

/** Category filter pills */
const CategoryFilter: React.FC<{
  categories: { slug: string; name: string }[];
  selected: string | null;
  onSelect: (slug: string) => void;
  onClear: () => void;
}> = ({ categories, selected, onSelect, onClear }) => (
  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
    <button
      type="button"
      onClick={onClear}
      className={cn(
        'flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full border transition-colors duration-200',
        selected === null
          ? 'bg-emerald-600 text-white border-emerald-600'
          : 'bg-white text-gray-600 border-gray-300 hover:border-emerald-400 hover:text-emerald-600',
      )}
    >
      All
    </button>
    {categories.map((cat) => (
      <button
        key={cat.slug}
        type="button"
        onClick={() => onSelect(cat.slug)}
        className={cn(
          'flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full border transition-colors duration-200 whitespace-nowrap',
          selected === cat.slug
            ? 'bg-emerald-600 text-white border-emerald-600'
            : 'bg-white text-gray-600 border-gray-300 hover:border-emerald-400 hover:text-emerald-600',
        )}
      >
        {cat.name}
      </button>
    ))}
  </div>
);

/** Product card for the grid */
const ProductCard: React.FC<{
  product: GroceryProduct;
  onSelect: (id: string) => void;
}> = ({ product, onSelect }) => {
  const addItem = useCartStore((s) => s.addItem);
  const isOnSale = product.price < product.originalPrice;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Image placeholder */}
      <button
        type="button"
        onClick={() => onSelect(product.id)}
        className="relative w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center cursor-pointer"
      >
        <span className="text-5xl font-bold text-gray-300 select-none uppercase">
          {product.name.charAt(0)}
        </span>

        {/* Badges */}
        {product.badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {product.badges.map((badge) => (
              <span
                key={badge}
                className={cn(
                  'px-2 py-0.5 text-xs font-semibold rounded-full uppercase',
                  badge === 'sale' && 'bg-red-100 text-red-700',
                  badge === 'new' && 'bg-blue-100 text-blue-700',
                  badge === 'organic' && 'bg-green-100 text-green-700',
                  badge === 'popular' && 'bg-purple-100 text-purple-700',
                )}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </button>

      {/* Details */}
      <div className="p-4">
        <Link
          to={`/grocery/product/${product.slug}`}
          className="block text-sm font-medium text-gray-900 hover:text-emerald-600 transition-colors duration-150 truncate"
        >
          {product.name}
        </Link>

        <p className="mt-1 text-xs text-gray-500 truncate">
          {product.category.name}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-amber-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs text-gray-600 font-medium">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-400">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>
            {isOnSale && (
              <span className="text-xs text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className="text-xs text-gray-400">/ {product.unit}</span>
          </div>

          <button
            type="button"
            onClick={() => addItem(product)}
            disabled={!product.inStock}
            className={cn(
              'flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200',
              product.inStock
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed',
            )}
            aria-label={`Add ${product.name} to cart`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {!product.inStock && (
          <p className="mt-1 text-xs text-red-500 font-medium">Out of stock</p>
        )}
      </div>
    </div>
  );
};

/** Product quick view modal */
const ProductQuickView: React.FC<{
  product: GroceryProduct;
  onClose: () => void;
}> = ({ product, onClose }) => {
  const addItem = useCartStore((s) => s.addItem);
  const isOnSale = product.price < product.originalPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Product image placeholder */}
        <div className="h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center rounded-t-2xl">
          <span className="text-7xl font-bold text-gray-200 select-none uppercase">
            {product.name.charAt(0)}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {product.badges.map((badge) => (
              <span
                key={badge}
                className={cn(
                  'px-2 py-0.5 text-xs font-semibold rounded-full uppercase',
                  badge === 'sale' && 'bg-red-100 text-red-700',
                  badge === 'new' && 'bg-blue-100 text-blue-700',
                  badge === 'organic' && 'bg-green-100 text-green-700',
                  badge === 'popular' && 'bg-purple-100 text-purple-700',
                )}
              >
                {badge}
              </span>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            {product.name}
          </h2>
          <p className="mt-1 text-sm text-gray-500">{product.category.name}</p>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={cn(
                    'h-4 w-4',
                    i < Math.round(product.rating)
                      ? 'text-amber-400'
                      : 'text-gray-200',
                  )}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>
            {isOnSale && (
              <span className="text-base text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className="text-sm text-gray-500">/ {product.unit}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                addItem(product);
                onClose();
              }}
              disabled={!product.inStock}
              className={cn(
                'flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200',
                product.inStock
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed',
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            <Link
              to={`/grocery/product/${product.slug}`}
              className="px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              onClick={onClose}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------

function GroceryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Stores
  const {
    searchQuery,
    sortField,
    sortDirection,
    viewMode,
    setSearchQuery,
    setSortField,
    setSortDirection,
    setViewMode,
  } = useFilterStore();

  const {
    categories,
    selectedCategory,
    setCategories,
    selectCategory,
    clearCategory,
  } = useCategoryStore();

  const { products, setProducts } = useGroceryStore();

  const {
    selectedProductId,
    selectProduct,
    deselectProduct,
  } = useSelectionStore();

  // Load mock data on mount
  useEffect(() => {
    try {
      setCategories(getMockCategories());
      setProducts(getMockProducts());
      setIsLoading(false);
    } catch {
      setError('Failed to load products. Please try again.');
      setIsLoading(false);
    }
  }, [setCategories, setProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.category.slug === selectedCategory);
    }

    // Sort
    result.sort((a, b) => {
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
          comparison = a.createdAt.localeCompare(b.createdAt);
          break;
        default:
          comparison = 0;
      }
      return sortDirection === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [products, searchQuery, selectedCategory, sortField, sortDirection]);

  // Find the selected product for the quick view modal
  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedProductId) ?? null,
    [products, selectedProductId],
  );

  const handleSort = useCallback(
    (field: ProductSortField, direction: SortDirection) => {
      setSortField(field);
      setSortDirection(direction);
    },
    [setSortField, setSortDirection],
  );

  // -------------------------------------------------------------------------
  // Loading state
  // -------------------------------------------------------------------------
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-emerald-600 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-gray-500 text-sm">Loading products...</p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Error state
  // -------------------------------------------------------------------------
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-500 text-sm mb-4">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Main content
  // -------------------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Fresh Groceries</h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse our selection of fresh produce, dairy, bakery items, and more.
        </p>
      </div>

      {/* Top bar: Search + View Toggle + Sort */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <ViewToggle viewMode={viewMode} onChange={setViewMode} />
        <SortDropdown
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      </div>

      {/* Category filter pills */}
      <div className="mb-6">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={selectCategory}
          onClear={clearCategory}
        />
      </div>

      {/* Category list horizontal scroll */}
      {!selectedCategory && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Shop by Category
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => selectCategory(cat.slug)}
                className="flex-shrink-0 w-32 p-4 bg-white rounded-xl border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all duration-200 text-center group"
              >
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                  style={{ backgroundColor: `${cat.color}20` }}
                >
                  <span
                    className="text-lg font-bold"
                    style={{ color: cat.color }}
                  >
                    {cat.name.charAt(0)}
                  </span>
                </div>
                <span className="text-xs font-medium text-gray-700 group-hover:text-emerald-600 transition-colors duration-150 line-clamp-2">
                  {cat.name}
                </span>
                <span className="block mt-1 text-xs text-gray-400">
                  {cat.productCount} items
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main content: 2D Grid or 3D Store */}
      {viewMode === '2d' ? (
        <>
          {/* Results count */}
          <p className="text-sm text-gray-500 mb-4">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? 's' : ''} found
          </p>

          {filteredProducts.length === 0 ? (
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
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No products found
              </h3>
              <p className="text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={selectProduct}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        /* 3D Store View */
        <div className="w-full h-[600px] rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <svg
                    className="animate-spin h-8 w-8 text-emerald-600 mx-auto mb-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <p className="text-sm text-gray-500">
                    Loading 3D store...
                  </p>
                </div>
              </div>
            }
          >
            <ThreeCanvas className="w-full h-full">
              <GroceryStoreScene>
                {/* 3D product objects would be rendered here */}
                <mesh />
              </GroceryStoreScene>
            </ThreeCanvas>
          </Suspense>
        </div>
      )}

      {/* Product quick view modal */}
      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          onClose={deselectProduct}
        />
      )}
    </div>
  );
}

export default GroceryPage;
