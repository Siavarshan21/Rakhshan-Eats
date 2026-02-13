import React from 'react';
import { cn } from '../../../utils/helpers/classNames';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  inputSize?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const sizeStyles: Record<NonNullable<InputProps['inputSize']>, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

const iconSizeStyles: Record<NonNullable<InputProps['inputSize']>, string> = {
  sm: 'px-2.5',
  md: 'px-3',
  lg: 'px-3.5',
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      prefixIcon,
      suffixIcon,
      inputSize = 'md',
      fullWidth = false,
      disabled,
      id,
      className,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium text-gray-700',
              disabled && 'text-gray-400'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {prefixIcon && (
            <span
              className={cn(
                'absolute left-0 flex items-center text-gray-400 pointer-events-none',
                iconSizeStyles[inputSize]
              )}
            >
              {prefixIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              'w-full rounded-lg border bg-white',
              'transition-colors duration-200',
              'placeholder:text-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              sizeStyles[inputSize],
              prefixIcon && 'pl-10',
              suffixIcon && 'pr-10',
              error
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-500',
              disabled && 'bg-gray-50 text-gray-500 cursor-not-allowed',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          {suffixIcon && (
            <span
              className={cn(
                'absolute right-0 flex items-center text-gray-400',
                iconSizeStyles[inputSize]
              )}
            >
              {suffixIcon}
            </span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
