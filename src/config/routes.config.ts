// ---------------------------------------------------------------------------
// Route configuration
// ---------------------------------------------------------------------------

export interface RouteConfig {
  /** URL path pattern (may include dynamic segments like `:slug`). */
  path: string;
  /** Human-readable label for navigation elements. */
  label: string;
  /** Icon identifier used by the icon library (e.g. Lucide icon name). */
  iconName: string;
  /** Whether this route requires the user to be authenticated. */
  requiresAuth: boolean;
  /** Whether to show this route in the main navigation bar. */
  showInNav: boolean;
}

export const ROUTE_CONFIGS: Record<string, RouteConfig> = {
  HOME: {
    path: '/',
    label: 'Home',
    iconName: 'home',
    requiresAuth: false,
    showInNav: true,
  },
  GROCERY: {
    path: '/grocery',
    label: 'Grocery',
    iconName: 'shopping-basket',
    requiresAuth: false,
    showInNav: true,
  },
  GROCERY_CATEGORY: {
    path: '/grocery/:categorySlug',
    label: 'Category',
    iconName: 'layout-grid',
    requiresAuth: false,
    showInNav: false,
  },
  PRODUCT_DETAIL: {
    path: '/grocery/product/:productSlug',
    label: 'Product',
    iconName: 'package',
    requiresAuth: false,
    showInNav: false,
  },
  CART: {
    path: '/cart',
    label: 'Cart',
    iconName: 'shopping-cart',
    requiresAuth: false,
    showInNav: true,
  },
  CHECKOUT: {
    path: '/checkout',
    label: 'Checkout',
    iconName: 'credit-card',
    requiresAuth: true,
    showInNav: false,
  },
  CHECKOUT_SUCCESS: {
    path: '/checkout/success',
    label: 'Order Confirmed',
    iconName: 'check-circle',
    requiresAuth: true,
    showInNav: false,
  },
  ORDERS: {
    path: '/orders',
    label: 'Orders',
    iconName: 'clipboard-list',
    requiresAuth: true,
    showInNav: true,
  },
  PROFILE: {
    path: '/profile',
    label: 'Profile',
    iconName: 'user',
    requiresAuth: true,
    showInNav: true,
  },
} as const;

/** Routes that appear in the main navigation bar. */
export const NAV_ROUTES = Object.values(ROUTE_CONFIGS).filter(
  (route) => route.showInNav,
);

/** Routes that require authentication. */
export const AUTH_ROUTES = Object.values(ROUTE_CONFIGS).filter(
  (route) => route.requiresAuth,
);
