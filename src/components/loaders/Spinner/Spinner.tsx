import { cn } from '../../../utils/helpers/classNames';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_MAP = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
} as const;

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      className={cn('animate-spin rounded-full border-2 border-surface-200 border-t-primary-600', SIZE_MAP[size], className)}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
