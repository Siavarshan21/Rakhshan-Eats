import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CartItem } from '../../../types/cart';
import type { GroceryProduct } from '../../../types/grocery';

const TAX_RATE = 0.08;

interface CartState {
  items: CartItem[];
  promoCode: string | null;
  promoDiscount: number;
}

interface CartActions {
  addItem: (product: GroceryProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromo: (code: string, discount: number) => void;
  removePromo: () => void;
}

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set) => ({
      items: [],
      promoCode: null,
      promoDiscount: 0,

      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.product.id === product.id,
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                product,
                quantity,
                addedAt: new Date().toISOString(),
              } as CartItem,
            ],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) => item.product.id !== productId,
              ),
            };
          }

          return {
            items: state.items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item,
            ),
          };
        }),

      clearCart: () => set({ items: [], promoCode: null, promoDiscount: 0 }),

      applyPromo: (code, discount) =>
        set({ promoCode: code, promoDiscount: discount }),

      removePromo: () => set({ promoCode: null, promoDiscount: 0 }),
    }),
    {
      name: 'rakhshan-eats-cart',
    },
  ),
);

// ---------------------------------------------------------------------------
// Selectors (computed values derived from cart state)
// ---------------------------------------------------------------------------

export const selectSubtotal = (state: CartState): number =>
  state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

export const selectTax = (state: CartState): number =>
  selectSubtotal(state) * TAX_RATE;

export const selectTotal = (state: CartState): number => {
  const subtotal = selectSubtotal(state);
  const tax = selectTax(state);
  return subtotal + tax - state.promoDiscount;
};

export const selectItemCount = (state: CartState): number =>
  state.items.reduce((count, item) => count + item.quantity, 0);
