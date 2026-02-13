import { useCallback } from 'react';
import { useSelectionStore } from '../store/selection.store';

export function useProductSelection() {
  const {
    selectedProductId,
    hoveredProductId,
    selectProduct,
    deselectProduct,
    hoverProduct,
    clearHover,
  } = useSelectionStore();

  const toggleProduct = useCallback(
    (productId: string) => {
      if (selectedProductId === productId) {
        deselectProduct();
      } else {
        selectProduct(productId);
      }
    },
    [selectedProductId, selectProduct, deselectProduct],
  );

  const isSelected = useCallback(
    (productId: string) => selectedProductId === productId,
    [selectedProductId],
  );

  const isHovered = useCallback(
    (productId: string) => hoveredProductId === productId,
    [hoveredProductId],
  );

  return {
    selectedProductId,
    hoveredProductId,
    selectProduct,
    deselectProduct,
    toggleProduct,
    hoverProduct,
    clearHover,
    isSelected,
    isHovered,
  };
}
