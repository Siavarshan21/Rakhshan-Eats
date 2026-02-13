import React from 'react';

import { useCartStore } from '../store/cart.store';
import { formatCurrency } from '../../../utils/format/currency';
import type { CartItem as CartItemType } from '../../../types/cart';

interface CartItemProps {
  item: CartItemType;
}

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

/** Color palette for product image placeholders based on category. */
const PLACEHOLDER_COLORS: Record<string, string> = {
  fruits: 'bg-orange-100 text-orange-600',
  vegetables: 'bg-green-100 text-green-600',
  dairy: 'bg-blue-100 text-blue-600',
  bakery: 'bg-amber-100 text-amber-700',
  meat: 'bg-red-100 text-red-600',
  beverages: 'bg-cyan-100 text-cyan-600',
  snacks: 'bg-yellow-100 text-yellow-700',
};

function getPlaceholderColor(categorySlug: string): string {
  return PLACEHOLDER_COLORS[categorySlug] || 'bg-gray-100 text-gray-500';
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const { product, quantity } = item;
  const lineTotal = product.price * quantity;
  const colorClass = getPlaceholderColor(product.category.slug);

  const handleDecrement = () => {
    if (quantity > MIN_QUANTITY) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < MAX_QUANTITY) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-b-0">
      {/* Product image placeholder */}
      <div
        className={`flex-shrink-0 w-20 h-20 rounded-lg flex items-center justify-center ${colorClass}`}
      >
        <span className="text-2xl font-bold uppercase select-none">
          {product.name.charAt(0)}
        </span>
      </div>

      {/* Product details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {product.name}
            </h3>
            <p className="mt-0.5 text-sm text-gray-500">
              {formatCurrency(product.price)} / {product.unit}
            </p>
          </div>

          {/* Remove button */}
          <button
            type="button"
            onClick={handleRemove}
            className="flex-shrink-0 p-1 text-gray-400 rounded hover:text-red-500 hover:bg-red-50 transition-colors duration-150"
            aria-label={`Remove ${product.name} from cart`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Quantity controls and line total */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={quantity <= MIN_QUANTITY}
              className="flex items-center justify-center w-8 h-8 text-gray-600 hover:bg-gray-50 rounded-l-lg transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
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
            <span className="flex items-center justify-center w-10 h-8 text-sm font-medium text-gray-900 border-x border-gray-200 select-none">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              disabled={quantity >= MAX_QUANTITY}
              className="flex items-center justify-center w-8 h-8 text-gray-600 hover:bg-gray-50 rounded-r-lg transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Increase quantity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
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

          <span className="text-sm font-semibold text-gray-900">
            {formatCurrency(lineTotal)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
