import { Link } from 'react-router-dom';

import { Cart } from '../features/checkout/components/Cart';

function CartPage() {
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
          <span className="text-gray-900 font-medium">Cart</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
      </div>

      {/* Cart component */}
      <Cart />
    </div>
  );
}

export default CartPage;
