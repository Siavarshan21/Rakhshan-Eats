import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  isCartDrawerOpen: boolean;
  isSearchOpen: boolean;
  activeModal: string | null;
}

interface UIActions {
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState & UIActions>((set) => ({
  isSidebarOpen: false,
  isCartDrawerOpen: false,
  isSearchOpen: false,
  activeModal: null,
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  toggleCartDrawer: () => set((s) => ({ isCartDrawerOpen: !s.isCartDrawerOpen })),
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
}));
