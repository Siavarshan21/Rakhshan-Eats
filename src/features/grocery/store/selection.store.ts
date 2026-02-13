import { create } from 'zustand';

interface SelectionState {
  selectedProductId: string | null;
  hoveredProductId: string | null;
}

interface SelectionActions {
  selectProduct: (productId: string) => void;
  deselectProduct: () => void;
  hoverProduct: (productId: string) => void;
  clearHover: () => void;
}

export const useSelectionStore = create<SelectionState & SelectionActions>(
  (set) => ({
    selectedProductId: null,
    hoveredProductId: null,

    selectProduct: (productId) => set({ selectedProductId: productId }),
    deselectProduct: () => set({ selectedProductId: null }),
    hoverProduct: (productId) => set({ hoveredProductId: productId }),
    clearHover: () => set({ hoveredProductId: null }),
  }),
);
