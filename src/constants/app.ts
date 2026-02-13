// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------
export const PAGINATION = {
  PAGE_SIZE: 20,
  DEFAULT_PAGE: 1,
} as const;

// ---------------------------------------------------------------------------
// Cart limits
// ---------------------------------------------------------------------------
export const CART_LIMITS = {
  MAX_QUANTITY: 99,
  MIN_QUANTITY: 1,
} as const;

// ---------------------------------------------------------------------------
// Tax & currency
// ---------------------------------------------------------------------------
export const TAX_RATE = 0.08 as const;

export const CURRENCY = {
  CODE: 'USD',
  SYMBOL: '$',
  DECIMAL_PLACES: 2,
} as const;

// ---------------------------------------------------------------------------
// Debounce / throttle delays
// ---------------------------------------------------------------------------
export const DEBOUNCE = {
  SEARCH_MS: 300,
  RESIZE_MS: 150,
  SCROLL_MS: 100,
} as const;

// ---------------------------------------------------------------------------
// Breakpoints (matching Tailwind CSS defaults)
// ---------------------------------------------------------------------------
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// ---------------------------------------------------------------------------
// Sort options
// ---------------------------------------------------------------------------
export type SortOption = (typeof SORT_OPTIONS)[number];

export const SORT_OPTIONS = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name: A - Z', value: 'name_asc' },
  { label: 'Name: Z - A', value: 'name_desc' },
  { label: 'Newest', value: 'newest' },
] as const;

// ---------------------------------------------------------------------------
// Toast durations (milliseconds)
// ---------------------------------------------------------------------------
export const TOAST_DURATION = {
  SUCCESS_MS: 3000,
  ERROR_MS: 5000,
  WARNING_MS: 4000,
  INFO_MS: 3000,
} as const;

// ---------------------------------------------------------------------------
// Local-storage keys
// ---------------------------------------------------------------------------
export const STORAGE_KEYS = {
  CART: 'rakhshan-eats:cart',
  AUTH_TOKEN: 'rakhshan-eats:auth-token',
  THEME: 'rakhshan-eats:theme',
  LOCALE: 'rakhshan-eats:locale',
  RECENT_SEARCHES: 'rakhshan-eats:recent-searches',
  VIEW_PREFERENCE: 'rakhshan-eats:view-preference',
} as const;

// ---------------------------------------------------------------------------
// Z-index layers
// ---------------------------------------------------------------------------
export const Z_INDEX = {
  BASE: 0,
  DROPDOWN: 10,
  STICKY: 20,
  OVERLAY: 30,
  MODAL: 40,
  POPOVER: 50,
  TOAST: 60,
  TOOLTIP: 70,
} as const;
