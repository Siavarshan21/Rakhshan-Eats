import { Outlet, Link } from 'react-router-dom';

export function CheckoutLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-50 dark:bg-surface-950">
      <header className="border-b border-surface-200 bg-white px-4 py-4 dark:border-surface-800 dark:bg-surface-900">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary-600">
            Rakhshan Eats
          </Link>
          <span className="text-sm text-surface-500">Secure Checkout</span>
        </div>
      </header>
      <main className="flex-1 py-8">
        <Outlet />
      </main>
    </div>
  );
}
