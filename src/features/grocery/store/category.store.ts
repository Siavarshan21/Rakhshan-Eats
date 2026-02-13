import { create } from 'zustand';

import type { GroceryCategory } from '../../../types/grocery';

interface CategoryState {
  categories: GroceryCategory[];
  selectedCategory: string | null;
}

interface CategoryActions {
  setCategories: (categories: GroceryCategory[]) => void;
  selectCategory: (slug: string) => void;
  clearCategory: () => void;
}

export const useCategoryStore = create<CategoryState & CategoryActions>(
  (set) => ({
    categories: [],
    selectedCategory: null,

    setCategories: (categories) => set({ categories }),
    selectCategory: (slug) => set({ selectedCategory: slug }),
    clearCategory: () => set({ selectedCategory: null }),
  }),
);
