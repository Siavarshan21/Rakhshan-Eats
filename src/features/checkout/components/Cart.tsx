import React from 'react';
import { Link } from 'react-router-dom';

import CartItem from './CartItem';
import CartSummary from './CartSummary';
import PromoCode from './PromoCode';
import { useCart } from '../hooks/useCart';

export const Cart: React.FC = () => {
  const {
    items,
    subtotal,
    tax,
    deliveryFee,
    discount,
    total,
    promoCode,
    applyPromo,
    removePromo,
    clearCart,
  } = useCart();

  // -------------------------------------------------------------------------
  // Empty cart state
  // -------------------------------------------------------------------------
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        {/* Empty cart icon */}
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Looks like you haven&apos;t added anything to your cart yet. Browse
          our fresh selection of groceries and find something you love.
        </p>

        <Link
          to="/grocery"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Continue Shopping
        </Link>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Cart with items
  // -------------------------------------------------------------------------
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* ----------------------------------------------------------------- */}
      {/* Cart Items List                                                    */}
      {/* ----------------------------------------------------------------- */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Cart Items ({items.length})
            </h2>
            <button
              type="button"
              onClick={clearCart}
              className="text-sm text-red-500 hover:text-red-700 transition-colors duration-150"
            >
              Clear All
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
        </div>

        {/* Continue Shopping link */}
        <Link
          to="/grocery"
          className="inline-flex items-center gap-2 mt-4 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Continue Shopping
        </Link>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Sidebar: Summary + Promo + Checkout                               */}
      {/* ----------------------------------------------------------------- */}
      <div className="space-y-4">
        <CartSummary
          subtotal={subtotal}
          tax={tax}
          deliveryFee={deliveryFee}
          discount={discount}
          total={total}
        />

        <PromoCode
          subtotal={subtotal}
          promoCode={promoCode}
          onApply={applyPromo}
          onRemove={removePromo}
        />

        <Link
          to="/checkout"
          className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Proceed to Checkout
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
