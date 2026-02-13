import { cn } from '../../../utils/helpers/classNames';
import { useCartStore } from '../../checkout/store/cart.store';
import { CATEGORY_EMOJIS, CATEGORY_COLORS } from '../constants';
import { isOnSale, getDiscountPercentage } from '../services/grocery.transform';
import type { GroceryProduct, ProductBadge } from '../../../types/grocery';

interface ItemCardProps {
  product: GroceryProduct;
  onClick?: (product: GroceryProduct) => void;
}

const BADGE_STYLES: Record<ProductBadge, { bg: string; text: string; label: string }> = {
  sale: { bg: 'bg-red-500', text: 'text-white', label: 'SALE' },
  new: { bg: 'bg-emerald-500', text: 'text-white', label: 'NEW' },
  organic: { bg: 'bg-green-600', text: 'text-white', label: 'ORGANIC' },
  popular: { bg: 'bg-amber-500', text: 'text-white', label: 'POPULAR' },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5 text-sm" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            i < Math.round(rating) ? 'text-amber-400' : 'text-gray-300',
          )}
        >
          {'\u2605'}
        </span>
      ))}
      <span className="ml-1 text-xs text-gray-500">{rating.toFixed(1)}</span>
    </span>
  );
}

export function ItemCard({ product, onClick }: ItemCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const emoji = CATEGORY_EMOJIS[product.category.slug] ?? '🛒';
  const color = CATEGORY_COLORS[product.category.slug] ?? product.category.color;
  const onSale = isOnSale(product);
  const discount = getDiscountPercentage(product);

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-xl border border-gray-200 bg-white',
        'overflow-hidden transition-all duration-200',
        'hover:shadow-lg hover:scale-[1.02] hover:border-gray-300',
      )}
    >
      {/* Badges */}
      {product.badges.length > 0 && (
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.badges.map((badge) => {
            const style = BADGE_STYLES[badge];
            return (
              <span
                key={badge}
                className={cn(
                  'rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
                  style.bg,
                  style.text,
                )}
              >
                {style.label}
              </span>
            );
          })}
        </div>
      )}

      {/* Discount badge */}
      {onSale && discount > 0 && (
        <div className="absolute top-2 right-2 z-10">
          <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
            -{discount}%
          </span>
        </div>
      )}

      {/* Product image area */}
      <button
        type="button"
        onClick={() => onClick?.(product)}
        className="flex h-40 items-center justify-center focus:outline-none"
        style={{ backgroundColor: `${color}15` }}
      >
        <span className="text-5xl transition-transform duration-200 group-hover:scale-110">
          {emoji}
        </span>
      </button>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
          {product.category.name}
        </span>

        <button
          type="button"
          onClick={() => onClick?.(product)}
          className="text-left focus:outline-none"
        >
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {product.name}
          </h3>
        </button>

        <StarRating rating={product.rating} />

        {/* Price */}
        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {onSale && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-xs text-gray-400">/{product.unit}</span>
        </div>

        {/* Add to cart */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            addItem(product, 1);
          }}
          disabled={!product.inStock}
          className={cn(
            'mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium',
            'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500',
            product.inStock
              ? 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed',
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
