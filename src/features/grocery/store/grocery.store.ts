import { create } from 'zustand';

import type { GroceryProduct } from '../../../types/grocery';

interface GroceryState {
  products: GroceryProduct[];
  isLoaded: boolean;
}

interface GroceryActions {
  setProducts: (products: GroceryProduct[]) => void;
  clearProducts: () => void;
}

export const useGroceryStore = create<GroceryState & GroceryActions>(
  (set) => ({
    products: [],
    isLoaded: false,

    setProducts: (products) => set({ products, isLoaded: true }),
    clearProducts: () => set({ products: [], isLoaded: false }),
  }),
);
