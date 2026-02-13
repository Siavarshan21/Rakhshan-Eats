import { Modal } from '../../../components/ui/Modal/Modal';
import { cn } from '../../../utils/helpers/classNames';
import { useCartStore } from '../../checkout/store/cart.store';
import { CATEGORY_EMOJIS, CATEGORY_COLORS } from '../constants';
import { isOnSale, getDiscountPercentage } from '../services/grocery.transform';
import type { GroceryProduct } from '../../../types/grocery';

interface ItemQuickViewProps {
  product: GroceryProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ItemQuickView({ product, isOpen, onClose }: ItemQuickViewProps) {
  const addItem = useCartStore((state) => state.addItem);

  if (!product) return null;

  const emoji = CATEGORY_EMOJIS[product.category.slug] ?? '🛒';
  const color = CATEGORY_COLORS[product.category.slug] ?? product.category.color;
  const onSale = isOnSale(product);
  const discount = getDiscountPercentage(product);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.name} size="lg">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Image area */}
        <div
          className="flex shrink-0 items-center justify-center rounded-xl h-48 w-full sm:h-56 sm:w-56"
          style={{ backgroundColor: `${color}15` }}
        >
          <span className="text-6xl">{emoji}</span>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-3 flex-1">
          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
            {product.category.name}
          </span>

          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  'text-base',
                  i < Math.round(product.rating)
                    ? 'text-amber-400'
                    : 'text-gray-300',
                )}
              >
                {'\u2605'}
              </span>
            ))}
            <span className="ml-1 text-xs text-gray-500">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {onSale && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                'h-2 w-2 rounded-full',
                product.inStock ? 'bg-emerald-500' : 'bg-red-500',
              )}
            />
            <span className="text-xs text-gray-500">
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Add to cart */}
          <button
            type="button"
            onClick={() => {
              addItem(product, 1);
              onClose();
            }}
            disabled={!product.inStock}
            className={cn(
              'mt-auto flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold',
              'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500',
              product.inStock
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
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
    </Modal>
  );
}
