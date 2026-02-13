// ---------------------------------------------------------------------------
// Analytics Event Name Constants
// ---------------------------------------------------------------------------

/**
 * Centralised map of every analytics event fired by the application.
 *
 * Using constants instead of raw strings prevents typos and makes it trivial
 * to search the codebase for all places that emit a given event.
 */
export const ANALYTICS_EVENTS = {
  // -- Product ---------------------------------------------------------------
  /** User viewed a product detail page. */
  PRODUCT_VIEWED: 'product_viewed',
  /** User added a product to the cart. */
  PRODUCT_ADDED_TO_CART: 'product_added_to_cart',
  /** User removed a product from the cart. */
  PRODUCT_REMOVED_FROM_CART: 'product_removed_from_cart',
  /** User searched for a product. */
  PRODUCT_SEARCHED: 'product_searched',

  // -- Category --------------------------------------------------------------
  /** User browsed a category listing. */
  CATEGORY_VIEWED: 'category_viewed',

  // -- Cart ------------------------------------------------------------------
  /** User opened the cart drawer / page. */
  CART_OPENED: 'cart_opened',
  /** User updated the quantity of an item in the cart. */
  CART_ITEM_QUANTITY_CHANGED: 'cart_item_quantity_changed',
  /** User cleared the entire cart. */
  CART_CLEARED: 'cart_cleared',

  // -- Checkout --------------------------------------------------------------
  /** User started the checkout flow. */
  CHECKOUT_STARTED: 'checkout_started',
  /** User applied a promo / discount code. */
  CHECKOUT_PROMO_APPLIED: 'checkout_promo_applied',
  /** User completed the checkout and placed an order. */
  CHECKOUT_COMPLETED: 'checkout_completed',

  // -- Order -----------------------------------------------------------------
  /** User viewed their order history. */
  ORDER_HISTORY_VIEWED: 'order_history_viewed',
  /** User viewed a single order's details. */
  ORDER_DETAIL_VIEWED: 'order_detail_viewed',

  // -- Navigation / General --------------------------------------------------
  /** A page was viewed (automatic page-view tracking). */
  PAGE_VIEWED: 'page_viewed',
  /** User interacted with the 3-D scene on the landing page. */
  LANDING_3D_INTERACTED: 'landing_3d_interacted',
} as const;

/** Union type of all analytics event name values. */
export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
