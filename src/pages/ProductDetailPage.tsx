import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getMockProductBySlug } from '../features/grocery/services/grocery.mock';
import { useCartStore } from '../features/checkout/store/cart.store';
import { formatCurrency } from '../utils/format/currency';
import { cn } from '../utils/helpers/classNames';
import type { GroceryProduct } from '../types/grocery';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function ProductDetailPage() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const [product, setProduct] = useState<GroceryProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (productSlug) {
      const found = getMockProductBySlug(productSlug);
      setProduct(found ?? null);
    }
    setIsLoading(false);
  }, [productSlug]);

  // -------------------------------------------------------------------------
  // Loading state
  // -------------------------------------------------------------------------
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-48 bg-gray-200 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="h-96 bg-gray-200 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-1/4 bg-gray-200 rounded" />
              <div className="h-20 bg-gray-200 rounded" />
              <div className="h-10 w-1/3 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Not found state
  // -------------------------------------------------------------------------
  if (!product) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-500 mb-6">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/grocery"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200"
          >
            Back to Shopping
          </Link>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Product detail view
  // -------------------------------------------------------------------------
  const isOnSale = product.price < product.originalPrice;
  const discountPercent = isOnSale
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link
          to="/grocery"
          className="hover:text-emerald-600 transition-colors duration-150"
        >
          Grocery
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-300"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-gray-400">{product.category.name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-300"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product image placeholder */}
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center border border-gray-200">
            <span className="text-8xl font-bold text-gray-200 select-none uppercase">
              {product.name.charAt(0)}
            </span>
          </div>

          {/* Badges */}
          {product.badges.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className={cn(
                    'px-3 py-1 text-xs font-semibold rounded-full uppercase',
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
        </div>

        {/* Product info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <p className="mt-2 text-sm text-gray-500">{product.category.name}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={cn(
                    'h-5 w-5',
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
            <span className="text-sm font-medium text-gray-700">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-400">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>
            {isOnSale && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
                <span className="px-2 py-0.5 text-sm font-semibold bg-red-100 text-red-700 rounded-full">
                  -{discountPercent}%
                </span>
              </>
            )}
            <span className="text-sm text-gray-500">/ {product.unit}</span>
          </div>

          {/* Stock status */}
          <div className="mt-3">
            {product.inStock ? (
              <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                In Stock ({product.stockQuantity} available)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm text-red-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-6 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity selector + Add to Cart */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="flex items-center justify-center w-10 h-10 text-gray-600 hover:bg-gray-50 rounded-l-lg transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <span className="flex items-center justify-center w-12 h-10 text-sm font-medium text-gray-900 border-x border-gray-200 select-none">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                disabled={quantity >= 99}
                className="flex items-center justify-center w-10 h-10 text-gray-600 hover:bg-gray-50 rounded-r-lg transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
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

            <button
              type="button"
              onClick={() => addItem(product, quantity)}
              disabled={!product.inStock}
              className={cn(
                'flex-1 inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-semibold rounded-lg transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500',
                product.inStock
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
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
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Nutrition Facts */}
          {product.nutritionFacts && (
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Nutrition Facts (per serving)
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Calories', value: `${product.nutritionFacts.calories}` },
                  { label: 'Protein', value: `${product.nutritionFacts.protein}g` },
                  { label: 'Carbs', value: `${product.nutritionFacts.carbs}g` },
                  { label: 'Fat', value: `${product.nutritionFacts.fat}g` },
                  { label: 'Fiber', value: `${product.nutritionFacts.fiber}g` },
                  { label: 'Sodium', value: `${product.nutritionFacts.sodium}mg` },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <p className="text-lg font-bold text-gray-900">
                      {item.value}
                    </p>
                    <p className="text-xs text-gray-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
