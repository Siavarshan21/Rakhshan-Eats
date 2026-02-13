import React from 'react';

import { cn } from '../../../utils/helpers/classNames';
import type { PaymentMethod as PaymentMethodType } from '../../../types/cart';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PaymentOption {
  id: PaymentMethodType;
  label: string;
  description: string;
  icon: React.ReactNode;
}

interface PaymentMethodProps {
  selected: PaymentMethodType;
  onChange: (method: PaymentMethodType) => void;
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
  onCardFieldChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: 'credit_card',
    label: 'Credit Card',
    description: 'Visa, Mastercard, Amex',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
  {
    id: 'cash_on_delivery',
    label: 'Cash on Delivery',
    description: 'Pay when you receive your order',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  selected,
  onChange,
  cardNumber,
  cardHolderName,
  expiryDate,
  cvv,
  onCardFieldChange,
  errors = {},
}) => {
  const showCardFields = selected === 'credit_card' || selected === 'debit_card';

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Payment Method</h3>

      {/* Method selection cards */}
      <div className="space-y-3">
        {PAYMENT_OPTIONS.map((option) => {
          const isSelected = selected === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={cn(
                'relative flex items-center gap-4 w-full p-4 rounded-xl border-2 text-left transition-all duration-200',
                isSelected
                  ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50',
              )}
            >
              {/* Radio indicator */}
              <span
                className={cn(
                  'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200',
                  isSelected ? 'border-emerald-500' : 'border-gray-300',
                )}
              >
                {isSelected && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                )}
              </span>

              {/* Icon */}
              <span
                className={cn(
                  'flex-shrink-0',
                  isSelected ? 'text-emerald-600' : 'text-gray-400',
                )}
              >
                {option.icon}
              </span>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <span
                  className={cn(
                    'block text-sm font-semibold',
                    isSelected ? 'text-emerald-900' : 'text-gray-900',
                  )}
                >
                  {option.label}
                </span>
                <span className="block text-xs text-gray-500 mt-0.5">
                  {option.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Card input fields -- shown only for card payments */}
      {showCardFields && (
        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
          {/* Card Number */}
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Card Number
            </label>
            <input
              id="cardNumber"
              type="text"
              inputMode="numeric"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              value={cardNumber}
              onChange={(e) => onCardFieldChange('cardNumber', e.target.value)}
              className={cn(
                'w-full px-4 py-2.5 text-sm border rounded-lg bg-white',
                'placeholder:text-gray-400',
                'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-emerald-500 focus:border-emerald-500',
                'transition-colors duration-200',
                errors.cardNumber ? 'border-red-500' : 'border-gray-300',
              )}
            />
            {errors.cardNumber && (
              <p className="mt-1 text-xs text-red-600">{errors.cardNumber}</p>
            )}
          </div>

          {/* Cardholder Name */}
          <div>
            <label
              htmlFor="cardHolderName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cardholder Name
            </label>
            <input
              id="cardHolderName"
              type="text"
              placeholder="John Doe"
              value={cardHolderName}
              onChange={(e) => onCardFieldChange('cardHolderName', e.target.value)}
              className={cn(
                'w-full px-4 py-2.5 text-sm border rounded-lg bg-white',
                'placeholder:text-gray-400',
                'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-emerald-500 focus:border-emerald-500',
                'transition-colors duration-200',
                errors.cardHolderName ? 'border-red-500' : 'border-gray-300',
              )}
            />
            {errors.cardHolderName && (
              <p className="mt-1 text-xs text-red-600">{errors.cardHolderName}</p>
            )}
          </div>

          {/* Expiry + CVV row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="expiryDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Expiry Date
              </label>
              <input
                id="expiryDate"
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                value={expiryDate}
                onChange={(e) => onCardFieldChange('expiryDate', e.target.value)}
                className={cn(
                  'w-full px-4 py-2.5 text-sm border rounded-lg bg-white',
                  'placeholder:text-gray-400',
                  'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-emerald-500 focus:border-emerald-500',
                  'transition-colors duration-200',
                  errors.expiryDate ? 'border-red-500' : 'border-gray-300',
                )}
              />
              {errors.expiryDate && (
                <p className="mt-1 text-xs text-red-600">{errors.expiryDate}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                CVV
              </label>
              <input
                id="cvv"
                type="text"
                inputMode="numeric"
                placeholder="123"
                maxLength={4}
                value={cvv}
                onChange={(e) => onCardFieldChange('cvv', e.target.value)}
                className={cn(
                  'w-full px-4 py-2.5 text-sm border rounded-lg bg-white',
                  'placeholder:text-gray-400',
                  'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-emerald-500 focus:border-emerald-500',
                  'transition-colors duration-200',
                  errors.cvv ? 'border-red-500' : 'border-gray-300',
                )}
              />
              {errors.cvv && (
                <p className="mt-1 text-xs text-red-600">{errors.cvv}</p>
              )}
            </div>
          </div>

          {/* Security note */}
          <div className="flex items-center gap-2 pt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs text-gray-500">
              Your payment information is encrypted and secure.
            </span>
          </div>
        </div>
      )}

      {/* Cash on delivery note */}
      {selected === 'cash_on_delivery' && (
        <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-amber-800">
                Cash on Delivery
              </p>
              <p className="mt-1 text-xs text-amber-700">
                Please have the exact amount ready. Our delivery partner will
                collect payment upon arrival.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
