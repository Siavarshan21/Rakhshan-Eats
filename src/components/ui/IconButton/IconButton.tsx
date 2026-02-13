import React from 'react';
import { cn } from '../../../utils/helpers/classNames';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  tooltip?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}

const variantStyles: Record<NonNullable<IconButtonProps['variant']>, string> = {
  primary:
    'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 active:bg-emerald-800',
  secondary:
    'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-800',
  outline:
    'border-2 border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50 focus:ring-gray-400 active:bg-gray-100',
  ghost:
    'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400 active:bg-gray-200',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
};

const sizeStyles: Record<NonNullable<IconButtonProps['size']>, string> = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
};

const tooltipPositionStyles: Record<NonNullable<IconButtonProps['tooltipPosition']>, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = 'ghost',
      size = 'md',
      tooltip,
      tooltipPosition = 'top',
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'group relative inline-flex items-center justify-center rounded-full',
          'transition-all duration-200 ease-in-out',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          variantStyles[variant],
          sizeStyles[size],
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
        aria-label={tooltip}
        {...props}
      >
        {icon}
        {tooltip && (
          <span
            className={cn(
              'absolute z-50 hidden group-hover:block',
              'px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md',
              'whitespace-nowrap pointer-events-none',
              tooltipPositionStyles[tooltipPosition]
            )}
            role="tooltip"
          >
            {tooltip}
          </span>
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default React.memo(IconButton);
