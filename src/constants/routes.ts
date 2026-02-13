export const ROUTES = {
  HOME: '/',
  GROCERY: '/grocery',
  GROCERY_CATEGORY: '/grocery/:categorySlug',
  PRODUCT_DETAIL: '/grocery/product/:productSlug',
  CART: '/cart',
  CHECKOUT: '/checkout',
  CHECKOUT_SUCCESS: '/checkout/success',
  ORDERS: '/orders',
  PROFILE: '/profile',
  NOT_FOUND: '*',
} as const;
