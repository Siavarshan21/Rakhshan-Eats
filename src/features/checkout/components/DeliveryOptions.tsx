import React, { useState } from 'react';

import { cn } from '../../../utils/helpers/classNames';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type DeliverySpeed = 'express' | 'standard' | 'scheduled';

interface DeliveryOptionItem {
  id: DeliverySpeed;
  label: string;
  description: string;
  fee: number;
  freeThreshold: number | null;
  icon: React.ReactNode;
}

interface DeliveryOptionsProps {
  selected: DeliverySpeed;
  onChange: (speed: DeliverySpeed) => void;
  subtotal?: number;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const DELIVERY_OPTIONS: DeliveryOptionItem[] = [
  {
    id: 'express',
    label: 'Express',
    description: 'Today, 2-4 hours',
    fee: 5.99,
    freeThreshold: null,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'standard',
    label: 'Standard',
    description: 'Tomorrow',
    fee: 3.99,
    freeThreshold: 50,
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
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
  {
    id: 'scheduled',
    label: 'Scheduled',
    description: 'Pick a date',
    fee: 3.99,
    freeThreshold: 50,
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
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
  selected,
  onChange,
  subtotal = 0,
}) => {
  const [scheduledDate, setScheduledDate] = useState('');

  const getFeeDisplay = (option: DeliveryOptionItem): string => {
    if (option.id === 'express') {
      return `$${option.fee.toFixed(2)}`;
    }
    if (option.freeThreshold !== null && subtotal >= option.freeThreshold) {
      return 'FREE';
    }
    return `$${option.fee.toFixed(2)}`;
  };

  const isFree = (option: DeliveryOptionItem): boolean => {
    if (option.id === 'express') return false;
    return option.freeThreshold !== null && subtotal >= option.freeThreshold;
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900">Delivery Options</h3>

      <div className="space-y-3">
        {DELIVERY_OPTIONS.map((option) => {
          const isSelected = selected === option.id;
          const feeDisplay = getFeeDisplay(option);
          const optionIsFree = isFree(option);

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={cn(
                'relative flex items-start gap-4 w-full p-4 rounded-xl border-2 text-left transition-all duration-200',
                isSelected
                  ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50',
              )}
            >
              {/* Radio indicator */}
              <span
                className={cn(
                  'mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200',
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
                  'flex-shrink-0 mt-0.5',
                  isSelected ? 'text-emerald-600' : 'text-gray-400',
                )}
              >
                {option.icon}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      'text-sm font-semibold',
                      isSelected ? 'text-emerald-900' : 'text-gray-900',
                    )}
                  >
                    {option.label}
                  </span>
                  <span
                    className={cn(
                      'text-sm font-semibold',
                      optionIsFree
                        ? 'text-emerald-600'
                        : isSelected
                          ? 'text-emerald-700'
                          : 'text-gray-700',
                    )}
                  >
                    {feeDisplay}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-gray-500">
                  {option.description}
                </p>
                {option.freeThreshold !== null && !optionIsFree && (
                  <p className="mt-1 text-xs text-emerald-600">
                    Free for orders over ${option.freeThreshold}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Scheduled date picker */}
      {selected === 'scheduled' && (
        <div className="mt-3 pl-9">
          <label
            htmlFor="delivery-date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Delivery Date
          </label>
          <input
            id="delivery-date"
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            min={new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0]}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
          />
        </div>
      )}
    </div>
  );
};

export default DeliveryOptions;
