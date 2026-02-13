// ---------------------------------------------------------------------------
// API / React Query configuration
// ---------------------------------------------------------------------------

/** Base URL for all API requests. */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

/** Default timeout for API requests in milliseconds. */
export const API_TIMEOUT =
  Number(import.meta.env.VITE_API_TIMEOUT) || 10_000;

/** React Query default configuration values. */
export const QUERY_DEFAULTS = {
  /** Time in ms before data is considered stale (5 minutes). */
  staleTime: 5 * 60 * 1000,
  /** Time in ms before inactive query data is garbage-collected (10 minutes). */
  gcTime: 10 * 60 * 1000,
  /** Number of automatic retry attempts on failure. */
  retry: 2,
  /** Whether to refetch queries when the browser window regains focus. */
  refetchOnWindowFocus: false,
} as const;

/** React Query mutation default configuration values. */
export const MUTATION_DEFAULTS = {
  /** Number of automatic retry attempts on mutation failure. */
  retry: 0,
} as const;

/** Query key factory for consistent cache key management. */
export const QUERY_KEYS = {
  products: {
    all: ['products'] as const,
    list: (filters?: Record<string, unknown>) =>
      ['products', 'list', filters] as const,
    detail: (slug: string) => ['products', 'detail', slug] as const,
  },
  categories: {
    all: ['categories'] as const,
    detail: (slug: string) => ['categories', 'detail', slug] as const,
    products: (categorySlug: string) =>
      ['categories', categorySlug, 'products'] as const,
  },
  cart: {
    all: ['cart'] as const,
  },
  orders: {
    all: ['orders'] as const,
    detail: (id: string) => ['orders', 'detail', id] as const,
  },
} as const;
