import { Link, useLocation } from 'react-router-dom';

interface SuccessState {
  orderId?: string;
  estimatedDelivery?: string;
}

function CheckoutSuccessPage() {
  const location = useLocation();
  const state = (location.state as SuccessState) ?? {};

  const orderId = state.orderId ?? `ORD-${Date.now().toString(36).toUpperCase()}`;
  const estimatedDelivery = state.estimatedDelivery ?? 'Within 24 hours';

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        {/* Green checkmark icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-emerald-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Order Placed Successfully!
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-2">
          Your order has been confirmed and is being processed.
        </p>

        {/* Order details card */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 text-left max-w-md mx-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Order Number</span>
              <span className="text-sm font-semibold text-gray-900 font-mono">
                {orderId}
              </span>
            </div>

            <div className="border-t border-gray-100" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Estimated Delivery</span>
              <span className="text-sm font-medium text-gray-900">
                {estimatedDelivery}
              </span>
            </div>

            <div className="border-t border-gray-100" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Status</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Confirmed
              </span>
            </div>
          </div>
        </div>

        {/* Confirmation message */}
        <p className="mt-6 text-sm text-gray-500 max-w-md mx-auto">
          A confirmation email has been sent with your order details. You can
          track your order status in the orders section.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            to="/grocery"
            className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Continue Shopping
          </Link>

          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 px-8 py-3 text-gray-400 font-medium bg-gray-100 rounded-lg cursor-not-allowed"
            title="Coming soon"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccessPage;
