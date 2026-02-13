// ---------------------------------------------------------------------------
// Type-safe localStorage wrapper
// ---------------------------------------------------------------------------

/**
 * Provides type-safe access to `window.localStorage` with automatic JSON
 * serialisation / deserialisation and graceful error handling.
 */
export const LocalStorageService = {
  /**
   * Retrieve and deserialise a value from localStorage.
   *
   * @typeParam T - Expected shape of the stored value.
   * @param key - Storage key.
   * @param fallback - Value returned when the key does not exist or cannot be
   *   parsed. Defaults to `null`.
   * @returns The parsed value or `fallback`.
   */
  get<T>(key: string, fallback: T | null = null): T | null {
    try {
      const raw = localStorage.getItem(key);

      if (raw === null) {
        return fallback;
      }

      return JSON.parse(raw) as T;
    } catch (error) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.warn(
          `[LocalStorageService] Failed to parse key "${key}":`,
          error,
        );
      }
      return fallback;
    }
  },

  /**
   * Serialise and store a value in localStorage.
   *
   * @typeParam T - Shape of the value being stored.
   * @param key - Storage key.
   * @param value - Value to store (will be JSON-stringified).
   */
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error(
          `[LocalStorageService] Failed to set key "${key}":`,
          error,
        );
      }
    }
  },

  /**
   * Remove a single key from localStorage.
   *
   * @param key - Storage key to remove.
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error(
          `[LocalStorageService] Failed to remove key "${key}":`,
          error,
        );
      }
    }
  },

  /**
   * Clear **all** keys from localStorage.
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error('[LocalStorageService] Failed to clear storage:', error);
      }
    }
  },

  /**
   * Check whether a key exists in localStorage.
   *
   * @param key - Storage key to test.
   * @returns `true` if the key exists, `false` otherwise.
   */
  has(key: string): boolean {
    try {
      return localStorage.getItem(key) !== null;
    } catch {
      return false;
    }
  },
};
