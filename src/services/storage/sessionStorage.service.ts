// ---------------------------------------------------------------------------
// Type-safe sessionStorage wrapper
// ---------------------------------------------------------------------------

/**
 * Provides type-safe access to `window.sessionStorage` with automatic JSON
 * serialisation / deserialisation and graceful error handling.
 *
 * The API mirrors {@link LocalStorageService} so the two can be swapped
 * transparently.
 */
export const SessionStorageService = {
  /**
   * Retrieve and deserialise a value from sessionStorage.
   *
   * @typeParam T - Expected shape of the stored value.
   * @param key - Storage key.
   * @param fallback - Value returned when the key does not exist or cannot be
   *   parsed. Defaults to `null`.
   * @returns The parsed value or `fallback`.
   */
  get<T>(key: string, fallback: T | null = null): T | null {
    try {
      const raw = sessionStorage.getItem(key);

      if (raw === null) {
        return fallback;
      }

      return JSON.parse(raw) as T;
    } catch (error) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.warn(
          `[SessionStorageService] Failed to parse key "${key}":`,
          error,
        );
      }
      return fallback;
    }
  },

  /**
   * Serialise and store a value in sessionStorage.
   *
   * @typeParam T - Shape of the value being stored.
   * @param key - Storage key.
   * @param value - Value to store (will be JSON-stringified).
   */
  set<T>(key: string, value: T): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error(
          `[SessionStorageService] Failed to set key "${key}":`,
          error,
        );
      }
    }
  },

  /**
   * Remove a single key from sessionStorage.
   *
   * @param key - Storage key to remove.
   */
  remove(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error(
          `[SessionStorageService] Failed to remove key "${key}":`,
          error,
        );
      }
    }
  },

  /**
   * Clear **all** keys from sessionStorage.
   */
  clear(): void {
    try {
      sessionStorage.clear();
    } catch (error) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error(
          '[SessionStorageService] Failed to clear storage:',
          error,
        );
      }
    }
  },

  /**
   * Check whether a key exists in sessionStorage.
   *
   * @param key - Storage key to test.
   * @returns `true` if the key exists, `false` otherwise.
   */
  has(key: string): boolean {
    try {
      return sessionStorage.getItem(key) !== null;
    } catch {
      return false;
    }
  },
};
