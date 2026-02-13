// ---------------------------------------------------------------------------
// Checkout API Service (Mock Implementation)
// ---------------------------------------------------------------------------

import type { PlaceOrderPayload, PlaceOrderResponse } from '../types';

/**
 * Simulates placing an order by returning a mock response after a brief delay.
 *
 * In a real implementation this would call the backend API via the shared
 * `httpClient` instance, e.g.:
 *
 * ```ts
 * import { httpClient } from '../../../services/api/http';
 * const { data } = await httpClient.post<PlaceOrderResponse>('/orders', payload);
 * ```
 */
export async function placeOrder(
  _payload: PlaceOrderPayload,
): Promise<PlaceOrderResponse> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulate a ~5 % random failure rate
  if (Math.random() < 0.05) {
    throw new Error('Order placement failed. Please try again.');
  }

  const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  // Estimated delivery: tomorrow at a random time slot
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const estimatedDelivery = tomorrow.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    orderId,
    estimatedDelivery,
    message: `Your order has been placed successfully! Order ID: ${orderId}`,
  };
}

/**
 * Mock: Fetch order status by ID.
 * Placeholder for a future real implementation.
 */
export async function getOrderStatus(orderId: string): Promise<{
  orderId: string;
  status: string;
  updatedAt: string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    orderId,
    status: 'confirmed',
    updatedAt: new Date().toISOString(),
  };
}
