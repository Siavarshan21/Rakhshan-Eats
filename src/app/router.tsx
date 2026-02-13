import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense, type ReactNode } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { NotFound } from './error/NotFound';

const GroceryPage = lazy(() => import('../pages/GroceryPage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
const CheckoutSuccessPage = lazy(() => import('../pages/CheckoutSuccessPage'));

function LazyWrapper({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/grocery" replace /> },
      {
        path: 'grocery',
        element: (
          <LazyWrapper>
            <GroceryPage />
          </LazyWrapper>
        ),
      },
      {
        path: 'grocery/product/:productSlug',
        element: (
          <LazyWrapper>
            <ProductDetailPage />
          </LazyWrapper>
        ),
      },
      {
        path: 'cart',
        element: (
          <LazyWrapper>
            <CartPage />
          </LazyWrapper>
        ),
      },
      {
        path: 'checkout',
        element: (
          <LazyWrapper>
            <CheckoutPage />
          </LazyWrapper>
        ),
      },
      {
        path: 'checkout/success',
        element: (
          <LazyWrapper>
            <CheckoutSuccessPage />
          </LazyWrapper>
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
