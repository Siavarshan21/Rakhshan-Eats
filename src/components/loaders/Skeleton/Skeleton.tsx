import { cn } from '../../../utils/helpers/classNames';

type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
  lines?: number;
}

const VARIANT_STYLES: Record<SkeletonVariant, string> = {
  text: 'h-4 w-full rounded',
  circular: 'rounded-full',
  rectangular: 'rounded-none',
  rounded: 'rounded-xl',
};

export function Skeleton({ variant = 'text', width, height, className, lines = 1 }: SkeletonProps) {
  const style: React.CSSProperties = {
    width: width ?? undefined,
    height: height ?? undefined,
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'animate-pulse bg-surface-200 dark:bg-surface-700',
              VARIANT_STYLES.text,
              i === lines - 1 && 'w-3/4',
            )}
            style={style}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-surface-200 dark:bg-surface-700',
        VARIANT_STYLES[variant],
        className,
      )}
      style={style}
    />
  );
}
