import { Link } from 'react-router-dom';

import { CheckoutForm } from '../features/checkout/components/CheckoutForm';
import CartSummary from '../features/checkout/components/CartSummary';
import { useCart } from '../features/checkout/hooks/useCart';

function CheckoutPage() {
  const { subtotal, tax, deliveryFee, discount, total, itemCount } = useCart();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
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
          <Link
            to="/cart"
            className="hover:text-emerald-600 transition-colors duration-150"
          >
            Cart
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
          <span className="text-gray-900 font-medium">Checkout</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
      </div>

      {/* Checkout layout: form + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout form */}
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>

        {/* Cart summary sidebar */}
        <div className="space-y-4">
          <CartSummary
            subtotal={subtotal}
            tax={tax}
            deliveryFee={deliveryFee}
            discount={discount}
            total={total}
          />

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span>
                {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart
              </span>
            </div>
          </div>

          <Link
            to="/cart"
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
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
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
