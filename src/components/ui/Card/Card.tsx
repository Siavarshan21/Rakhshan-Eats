import type { ReactNode } from 'react';
import { cn } from '../../../utils/helpers/classNames';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const PADDING_MAP = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
} as const;

export function Card({ children, className, hoverable = false, padding = 'md', onClick }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-surface-200 bg-white shadow-card dark:border-surface-700 dark:bg-surface-900',
        PADDING_MAP[padding],
        hoverable && 'cursor-pointer transition-shadow duration-200 hover:shadow-elevated',
        className,
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
    >
      {children}
    </div>
  );
}
