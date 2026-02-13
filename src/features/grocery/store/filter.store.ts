import { create } from 'zustand';

import type { PriceRange, ProductSortField, ViewMode } from '../../../types/grocery';
import type { SortDirection } from '../../../types/common';

interface FilterState {
  searchQuery: string;
  sortField: ProductSortField;
  sortDirection: SortDirection;
  priceRange: PriceRange;
  viewMode: ViewMode;
}

interface FilterActions {
  setSearchQuery: (query: string) => void;
  setSortField: (field: ProductSortField) => void;
  setSortDirection: (direction: SortDirection) => void;
  setPriceRange: (range: PriceRange) => void;
  setViewMode: (mode: ViewMode) => void;
  resetFilters: () => void;
}

const initialState: FilterState = {
  searchQuery: '',
  sortField: 'name',
  sortDirection: 'asc',
  priceRange: { min: 0, max: Infinity },
  viewMode: '2d',
};

export const useFilterStore = create<FilterState & FilterActions>((set) => ({
  ...initialState,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortField: (field) => set({ sortField: field }),
  setSortDirection: (direction) => set({ sortDirection: direction }),
  setPriceRange: (range) => set({ priceRange: range }),
  setViewMode: (mode) => set({ viewMode: mode }),
  resetFilters: () => set(initialState),
}));
