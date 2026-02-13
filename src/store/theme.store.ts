import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
}

interface ThemeActions {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Resolves the effective theme by checking the system preference
 * when the user has selected 'system'.
 */
function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === 'system') {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'light';
  }
  return theme;
}

export const useThemeStore = create<ThemeState & ThemeActions>()(
  persist(
    (set) => ({
      theme: 'system',
      resolvedTheme: resolveTheme('system'),

      setTheme: (theme) =>
        set({
          theme,
          resolvedTheme: resolveTheme(theme),
        }),

      toggleTheme: () =>
        set((state) => {
          const next: Theme = state.resolvedTheme === 'light' ? 'dark' : 'light';
          return {
            theme: next,
            resolvedTheme: resolveTheme(next),
          };
        }),
    }),
    {
      name: 'rakhshan-eats-theme',
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.resolvedTheme = resolveTheme(state.theme);
        }
      },
    },
  ),
);
