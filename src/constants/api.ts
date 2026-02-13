export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id: string) => `/products/${id}`,
  PRODUCT_BY_SLUG: (slug: string) => `/products/slug/${slug}`,
  CATEGORIES: '/categories',
  CATEGORY_PRODUCTS: (categorySlug: string) =>
    `/categories/${categorySlug}/products`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  PROMO_VALIDATE: '/promo/validate',
  ORDERS: '/orders',
  ORDER_BY_ID: (id: string) => `/orders/${id}`,
} as const;

export const API_CONFIG = {
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_MS: 1000,
  STALE_TIME_MS: 5 * 60 * 1000,
  CACHE_TIME_MS: 10 * 60 * 1000,
} as const;
