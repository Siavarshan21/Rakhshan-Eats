import { cn } from '../../../utils/helpers/classNames';
import { Spinner } from '../Spinner/Spinner';

interface LoadingOverlayProps {
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export function LoadingOverlay({ message, fullScreen = false, className }: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-sm dark:bg-surface-900/80',
        fullScreen ? 'fixed inset-0 z-50' : 'absolute inset-0 z-10 rounded-xl',
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <Spinner size="lg" />
      {message && (
        <p className="text-sm font-medium text-surface-600 dark:text-surface-400">{message}</p>
      )}
    </div>
  );
}
