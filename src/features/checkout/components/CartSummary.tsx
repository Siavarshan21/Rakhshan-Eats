import React from 'react';

import PriceSummary from './PriceSummary';
import { formatCurrency } from '../../../utils/format/currency';

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

const FREE_DELIVERY_THRESHOLD = 50;

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  tax,
  deliveryFee,
  discount,
  total,
}) => {
  const isFreeDelivery = deliveryFee === 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-2.5">
        <PriceSummary label="Subtotal" value={formatCurrency(subtotal)} />

        <PriceSummary label="Tax (8%)" value={formatCurrency(tax)} />

        <PriceSummary
          label="Delivery Fee"
          value={isFreeDelivery ? 'FREE' : formatCurrency(deliveryFee)}
          variant={isFreeDelivery ? 'free' : 'default'}
        />

        {discount > 0 && (
          <PriceSummary
            label="Promo Discount"
            value={`-${formatCurrency(discount)}`}
            variant="discount"
          />
        )}

        <PriceSummary
          label="Total"
          value={formatCurrency(total)}
          variant="highlight"
        />
      </div>

      {/* Free delivery notice */}
      {!isFreeDelivery && (
        <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
          <p className="text-xs text-emerald-700">
            Add{' '}
            <span className="font-semibold">
              {formatCurrency(FREE_DELIVERY_THRESHOLD - subtotal)}
            </span>{' '}
            more to get <span className="font-semibold">free delivery</span>!
          </p>
          {/* Progress bar */}
          <div className="mt-2 w-full bg-emerald-100 rounded-full h-1.5">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
