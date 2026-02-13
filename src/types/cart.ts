// ---------------------------------------------------------------------------
// Cart & Checkout Types
// ---------------------------------------------------------------------------

import type { GroceryProduct } from './grocery';
import type { ID, Timestamp } from './common';

// ---------------------------------------------------------------------------
// Cart
// ---------------------------------------------------------------------------

/**
 * A single item in the shopping cart.
 */
export interface CartItem {
  /** The product added to the cart. */
  product: GroceryProduct;
  /** Quantity of the product (always >= 1). */
  quantity: number;
  /** ISO-8601 timestamp of when the item was added. */
  addedAt: Timestamp;
}

/**
 * Complete shopping cart state.
 */
export interface Cart {
  /** Ordered list of cart items. */
  items: CartItem[];
  /** Sum of (item price * quantity) before tax and discounts. */
  subtotal: number;
  /** Calculated tax amount. */
  tax: number;
  /** Discount amount applied via promo code. */
  discount: number;
  /** Final total: subtotal + tax - discount. */
  total: number;
  /** Currently applied promo code (if any). */
  promoCode: PromoCode | null;
}

// ---------------------------------------------------------------------------
// Promo Codes
// ---------------------------------------------------------------------------

/** How a promo code discount is calculated. */
export type DiscountType = 'percentage' | 'fixed';

/**
 * A promotional discount code.
 */
export interface PromoCode {
  /** The code string entered by the user. */
  code: string;
  /** Whether the discount is a percentage of the subtotal or a fixed amount. */
  discountType: DiscountType;
  /** The numeric value of the discount (percentage 0-100 or currency amount). */
  discountValue: number;
  /** Minimum order subtotal required to use this code. */
  minOrderAmount: number;
  /** Maximum discount amount (caps percentage discounts). */
  maxDiscount: number | null;
  /** ISO-8601 expiration date of the code. */
  expiresAt: Timestamp;
  /** Whether the promo code is currently usable. */
  isActive: boolean;
}

// ---------------------------------------------------------------------------
// Checkout
// ---------------------------------------------------------------------------

/** Supported payment methods. */
export type PaymentMethod = 'credit_card' | 'debit_card' | 'cash_on_delivery' | 'digital_wallet';

/**
 * A selectable delivery time slot.
 */
export interface DeliveryTimeSlot {
  /** Unique slot identifier. */
  id: ID;
  /** Human-readable label (e.g. "10:00 AM -- 12:00 PM"). */
  label: string;
  /** ISO-8601 start time. */
  startTime: Timestamp;
  /** ISO-8601 end time. */
  endTime: Timestamp;
  /** Whether this slot is still available. */
  available: boolean;
  /** Optional surcharge for premium slots (e.g. express delivery). */
  surcharge: number;
}

/**
 * Delivery information section of the checkout form.
 */
export interface DeliveryInfo {
  /** Recipient full name. */
  fullName: string;
  /** Contact phone number. */
  phone: string;
  /** Contact email address. */
  email: string;
  /** Street address line 1. */
  addressLine1: string;
  /** Street address line 2 (apt, suite, etc.). */
  addressLine2: string;
  /** City / town. */
  city: string;
  /** State / province / region. */
  state: string;
  /** Postal / ZIP code. */
  postalCode: string;
  /** Selected delivery time slot. */
  deliveryTimeSlot: DeliveryTimeSlot | null;
  /** Additional delivery instructions for the driver. */
  deliveryInstructions: string;
}

/**
 * Payment information section of the checkout form.
 */
export interface PaymentInfo {
  /** Selected payment method. */
  method: PaymentMethod;
  /** Masked or full card number (only for card payments). */
  cardNumber: string;
  /** Card holder name (only for card payments). */
  cardHolderName: string;
  /** Card expiry date in MM/YY format (only for card payments). */
  expiryDate: string;
  /** Card CVV (only for card payments). */
  cvv: string;
}

/**
 * Complete checkout form state, combining delivery and payment details.
 */
export interface CheckoutForm {
  /** Delivery address and scheduling information. */
  delivery: DeliveryInfo;
  /** Payment details. */
  payment: PaymentInfo;
  /** Whether the user has agreed to the terms and conditions. */
  agreedToTerms: boolean;
  /** Whether the user opts in to save payment details for future orders. */
  savePaymentDetails: boolean;
}

// ---------------------------------------------------------------------------
// Order (post-checkout reference)
// ---------------------------------------------------------------------------

/** Order lifecycle status. */
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

/**
 * A placed order (created after successful checkout).
 */
export interface Order {
  /** Unique order identifier. */
  id: ID;
  /** Snapshot of the cart at checkout time. */
  cart: Cart;
  /** Delivery information provided during checkout. */
  delivery: DeliveryInfo;
  /** Payment method used. */
  paymentMethod: PaymentMethod;
  /** Current status of the order. */
  status: OrderStatus;
  /** ISO-8601 timestamp the order was placed. */
  createdAt: Timestamp;
  /** ISO-8601 timestamp the order was last updated. */
  updatedAt: Timestamp;
}
