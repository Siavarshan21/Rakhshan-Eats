import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-2 text-8xl font-bold text-primary-600">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-surface-900 dark:text-surface-100">
          Page Not Found
        </h2>
        <p className="mb-8 text-surface-500 dark:text-surface-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block rounded-lg bg-primary-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          Back to Shopping
        </Link>
      </div>
    </div>
  );
}
