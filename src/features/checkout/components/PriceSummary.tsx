import React from 'react';
import { cn } from '../../../utils/helpers/classNames';

interface PriceSummaryProps {
  /** Left-hand label (e.g. "Subtotal"). */
  label: string;
  /** Formatted price string to display on the right. */
  value: string;
  /** Visual emphasis -- "default" for regular lines, "highlight" for the final total. */
  variant?: 'default' | 'highlight' | 'discount' | 'free';
  /** Optional extra className on the wrapper. */
  className?: string;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({
  label,
  value,
  variant = 'default',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between',
        variant === 'highlight' && 'pt-3 mt-3 border-t border-gray-200',
        className,
      )}
    >
      <span
        className={cn(
          'text-sm',
          variant === 'default' && 'text-gray-600',
          variant === 'highlight' && 'text-base font-semibold text-gray-900',
          variant === 'discount' && 'text-emerald-600',
          variant === 'free' && 'text-gray-600',
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'text-sm',
          variant === 'default' && 'text-gray-900 font-medium',
          variant === 'highlight' && 'text-lg font-bold text-gray-900',
          variant === 'discount' && 'text-emerald-600 font-medium',
          variant === 'free' && 'text-emerald-600 font-medium',
        )}
      >
        {value}
      </span>
    </div>
  );
};

export default PriceSummary;
