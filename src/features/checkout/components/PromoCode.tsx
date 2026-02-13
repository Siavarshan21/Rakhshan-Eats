import React from 'react';

import { usePromo } from '../hooks/usePromo';
import { cn } from '../../../utils/helpers/classNames';

interface PromoCodeProps {
  subtotal: number;
  promoCode: string | null;
  onApply: (code: string, discount: number) => void;
  onRemove: () => void;
}

const PromoCode: React.FC<PromoCodeProps> = ({
  subtotal,
  promoCode,
  onApply,
  onRemove,
}) => {
  const {
    code,
    setCode,
    isValidating,
    result,
    applyPromo,
    removePromo,
  } = usePromo({ subtotal, onApply, onRemove });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyPromo();
  };

  // If a promo code is already applied, show the applied state
  if (promoCode) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Promo Code</h3>
        <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-emerald-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-emerald-700">
              {promoCode}
            </span>
          </div>
          <button
            type="button"
            onClick={removePromo}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors duration-150"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Promo Code</h3>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter promo code"
          maxLength={20}
          disabled={isValidating}
          className={cn(
            'flex-1 px-3 py-2 text-sm border rounded-lg bg-white',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-emerald-500 focus:border-emerald-500',
            'transition-colors duration-200',
            result && !result.valid
              ? 'border-red-300'
              : 'border-gray-300',
            isValidating && 'opacity-60 cursor-not-allowed',
          )}
        />
        <button
          type="submit"
          disabled={isValidating || !code.trim()}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500',
            'bg-emerald-600 text-white hover:bg-emerald-700',
            'disabled:opacity-50 disabled:cursor-not-allowed',
          )}
        >
          {isValidating ? (
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            'Apply'
          )}
        </button>
      </form>

      {/* Validation feedback */}
      {result && (
        <p
          className={cn(
            'mt-2 text-xs',
            result.valid ? 'text-emerald-600' : 'text-red-500',
          )}
        >
          {result.message}
        </p>
      )}

      <p className="mt-2 text-xs text-gray-400">
        Try: SAVE10, FLAT5, WELCOME20
      </p>
    </div>
  );
};

export default PromoCode;
