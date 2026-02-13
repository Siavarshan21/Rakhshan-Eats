import { create } from 'zustand';

interface NavigationState {
  currentAisle: string | null;
  currentCategory: string | null;
  isNavigating: boolean;
}

interface NavigationActions {
  navigateToAisle: (aisle: string) => void;
  navigateToCategory: (category: string) => void;
  resetNavigation: () => void;
}

export const useNavigationStore = create<NavigationState & NavigationActions>(
  (set) => ({
    currentAisle: null,
    currentCategory: null,
    isNavigating: false,

    navigateToAisle: (aisle) =>
      set({ currentAisle: aisle, isNavigating: true }),

    navigateToCategory: (category) =>
      set({ currentCategory: category, isNavigating: true }),

    resetNavigation: () =>
      set({
        currentAisle: null,
        currentCategory: null,
        isNavigating: false,
      }),
  }),
);
