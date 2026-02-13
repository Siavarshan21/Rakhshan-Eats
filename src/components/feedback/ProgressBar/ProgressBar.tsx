import { cn } from '../../../utils/helpers/classNames';

type ProgressVariant = 'primary' | 'success' | 'warning' | 'error';

interface ProgressBarProps {
  value: number;
  label?: string;
  variant?: ProgressVariant;
  className?: string;
  showValue?: boolean;
}

const VARIANT_COLORS: Record<ProgressVariant, string> = {
  primary: 'bg-primary-600',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
};

export function ProgressBar({ value, label, variant = 'primary', className, showValue = false }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          {label && (
            <span className="font-medium text-surface-700 dark:text-surface-300">{label}</span>
          )}
          {showValue && (
            <span className="text-surface-500 dark:text-surface-400">{Math.round(clampedValue)}%</span>
          )}
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-surface-200 dark:bg-surface-700"
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            VARIANT_COLORS[variant],
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
