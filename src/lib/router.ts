import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

// ---------------------------------------------------------------------------
// Router helpers
// ---------------------------------------------------------------------------

/**
 * Build a path string by replacing dynamic segments (`:param`) with the
 * supplied values.
 *
 * @example
 * ```ts
 * buildPath('/grocery/product/:productSlug', { productSlug: 'organic-apples' });
 * // => '/grocery/product/organic-apples'
 * ```
 */
export function buildPath(
  pattern: string,
  params: Record<string, string>,
): string {
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, encodeURIComponent(value)),
    pattern,
  );
}

/**
 * Create the application router instance from a set of route objects.
 *
 * This is a thin wrapper around `createBrowserRouter` so that router creation
 * is centralised and easy to swap (e.g. for memory router in tests).
 */
export function createAppRouter(routes: RouteObject[]) {
  return createBrowserRouter(routes);
}
