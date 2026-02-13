export const APP_CONFIG = {
  name: 'Rakhshan Eats',
  tagline: 'Fresh groceries, immersive experience',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  defaultLocale: 'en-US',
  supportedLocales: ['en-US'] as const,
  currency: {
    code: 'USD',
    symbol: '$',
    locale: 'en-US',
  },
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
  cart: {
    maxItemQuantity: 99,
    minItemQuantity: 1,
    taxRate: 0.08,
    freeDeliveryThreshold: 50,
    deliveryFee: 5.99,
  },
} as const;
