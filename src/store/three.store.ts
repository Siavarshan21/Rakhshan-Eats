import { create } from 'zustand';

type PerformanceLevel = 'low' | 'medium' | 'high';

interface ThreeState {
  performanceLevel: PerformanceLevel;
  isSceneReady: boolean;
  isLoading: boolean;
  loadingProgress: number;
}

interface ThreeActions {
  setPerformanceLevel: (level: PerformanceLevel) => void;
  setSceneReady: (ready: boolean) => void;
  setLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;
}

export const useThreeStore = create<ThreeState & ThreeActions>((set) => ({
  performanceLevel: 'medium',
  isSceneReady: false,
  isLoading: false,
  loadingProgress: 0,

  setPerformanceLevel: (level) => set({ performanceLevel: level }),
  setSceneReady: (ready) => set({ isSceneReady: ready }),
  setLoading: (loading) => set({ isLoading: loading }),
  setLoadingProgress: (progress) =>
    set({ loadingProgress: Math.min(100, Math.max(0, progress)) }),
}));
