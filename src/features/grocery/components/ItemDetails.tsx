import { useState } from 'react';
import { cn } from '../../../utils/helpers/classNames';
import { useCartStore } from '../../checkout/store/cart.store';
import { CATEGORY_EMOJIS, CATEGORY_COLORS } from '../constants';
import { isOnSale, getDiscountPercentage } from '../services/grocery.transform';
import type { GroceryProduct } from '../../../types/grocery';

interface ItemDetailsProps {
  product: GroceryProduct;
}

export function ItemDetails({ product }: ItemDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const emoji = CATEGORY_EMOJIS[product.category.slug] ?? '🛒';
  const color = CATEGORY_COLORS[product.category.slug] ?? product.category.color;
  const onSale = isOnSale(product);
  const discount = getDiscountPercentage(product);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product image area */}
      <div
        className="flex items-center justify-center rounded-2xl h-80 md:h-[420px]"
        style={{ backgroundColor: `${color}15` }}
      >
        <span className="text-8xl">{emoji}</span>
      </div>

      {/* Product info */}
      <div className="flex flex-col gap-4">
        {/* Category */}
        <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
          {product.category.name}
        </span>

        {/* Name */}
        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  'text-lg',
                  i < Math.round(product.rating) ? 'text-amber-400' : 'text-gray-300',
                )}
              >
                {'\u2605'}
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {product.rating.toFixed(1)} ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-gray-600">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {onSale && (
            <>
              <span className="text-lg text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-semibold text-red-700">
                {discount}% OFF
              </span>
            </>
          )}
          <span className="text-sm text-gray-400">/ {product.unit}</span>
        </div>

        {/* Stock status */}
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'h-2.5 w-2.5 rounded-full',
              product.inStock ? 'bg-emerald-500' : 'bg-red-500',
            )}
          />
          <span
            className={cn(
              'text-sm font-medium',
              product.inStock ? 'text-emerald-700' : 'text-red-700',
            )}
          >
            {product.inStock
              ? `In Stock (${product.stockQuantity} available)`
              : 'Out of Stock'}
          </span>
        </div>

        {/* Quantity selector + Add to cart */}
        <div className="flex items-center gap-3 pt-2">
          <div className="flex items-center rounded-lg border border-gray-300">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-l-lg transition-colors"
            >
              -
            </button>
            <span className="w-10 text-center text-sm font-medium text-gray-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-r-lg transition-colors"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={cn(
              'flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
              product.inStock
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed',
            )}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>

        {/* Nutrition Facts */}
        {product.nutritionFacts && (
          <div className="mt-4 rounded-xl border border-gray-200 p-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Nutrition Facts (per serving)
            </h3>
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: 'Calories', value: `${product.nutritionFacts.calories} kcal` },
                  { label: 'Protein', value: `${product.nutritionFacts.protein}g` },
                  { label: 'Carbs', value: `${product.nutritionFacts.carbs}g` },
                  { label: 'Fat', value: `${product.nutritionFacts.fat}g` },
                  { label: 'Fiber', value: `${product.nutritionFacts.fiber}g` },
                  { label: 'Sodium', value: `${product.nutritionFacts.sodium}mg` },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-gray-100 last:border-0">
                    <td className="py-1.5 text-gray-500">{row.label}</td>
                    <td className="py-1.5 text-right font-medium text-gray-800">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
