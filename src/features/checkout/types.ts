// ---------------------------------------------------------------------------
// Checkout Feature Types
// ---------------------------------------------------------------------------

import type { CartItem, DeliveryInfo, PaymentInfo, PaymentMethod, Order } from '../../types/cart';

// ---------------------------------------------------------------------------
// Checkout Steps
// ---------------------------------------------------------------------------

/** The steps in the checkout flow. */
export type CheckoutStep = 'delivery' | 'payment' | 'review' | 'complete';

/** Metadata for a single checkout step indicator. */
export interface StepInfo {
  /** Machine key for the step. */
  key: CheckoutStep;
  /** Human-readable label displayed in the step indicator. */
  label: string;
  /** 1-based step number. */
  number: number;
}

/** All checkout steps in display order. */
export const CHECKOUT_STEPS: StepInfo[] = [
  { key: 'delivery', label: 'Delivery', number: 1 },
  { key: 'payment', label: 'Payment', number: 2 },
  { key: 'review', label: 'Review', number: 3 },
];

// ---------------------------------------------------------------------------
// Delivery Options
// ---------------------------------------------------------------------------

/** Available delivery speed tiers. */
export type DeliverySpeed = 'express' | 'standard' | 'scheduled';

/** A selectable delivery option shown in the checkout flow. */
export interface DeliveryOption {
  /** Unique identifier for the option. */
  id: string;
  /** The speed tier. */
  speed: DeliverySpeed;
  /** Human-readable label (e.g. "Express - Today"). */
  label: string;
  /** Estimated delivery description. */
  description: string;
  /** Surcharge for this delivery option (0 means free). */
  fee: number;
}

// ---------------------------------------------------------------------------
// Promo Codes
// ---------------------------------------------------------------------------

/** How a promo code discount is calculated. */
export type PromoDiscountType = 'percentage' | 'fixed';

/** Definition of a valid promo code for the mock validation. */
export interface PromoDefinition {
  type: PromoDiscountType;
  value: number;
}

/** Result of promo code validation. */
export interface PromoValidationResult {
  valid: boolean;
  discount: number;
  message: string;
}

// ---------------------------------------------------------------------------
// Checkout State
// ---------------------------------------------------------------------------

/** Complete checkout form data collected across all steps. */
export interface CheckoutFormData {
  delivery: DeliveryFormValues;
  payment: PaymentFormValues;
}

/** Delivery step form values. */
export interface DeliveryFormValues {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  deliveryNotes: string;
}

/** Payment step form values. */
export interface PaymentFormValues {
  method: PaymentMethod;
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
}

// ---------------------------------------------------------------------------
// Order Placement
// ---------------------------------------------------------------------------

/** Payload sent to the order placement API. */
export interface PlaceOrderPayload {
  items: CartItem[];
  delivery: DeliveryFormValues;
  payment: PaymentFormValues;
  promoCode: string | null;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

/** Response from a successful order placement. */
export interface PlaceOrderResponse {
  orderId: string;
  estimatedDelivery: string;
  message: string;
}

// ---------------------------------------------------------------------------
// Re-exports for convenience
// ---------------------------------------------------------------------------

export type { CartItem, DeliveryInfo, PaymentInfo, PaymentMethod, Order };
