/**
 * Offline-first, type-safe local storage utility with zero external dependencies.
 * Provides resilient serialization, schema fallbacks, and storage quota guardrails.
 */

export const STORAGE_KEYS = {
  LOGS: 'bp_sadhana_logs',
  INTERCEPTIONS: 'bp_interceptions',
  PREFS: 'bp_user_prefs',
} as const;

/**
 * Checks whether localStorage is available in the current runtime environment.
 */
function isStorageAvailable(): boolean {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
}

/**
 * Retrieves and deserializes a typed item from localStorage.
 * Returns the fallback value if the item is missing, unparseable, or inaccessible.
 */
export function getLocalItem<T>(key: string, fallback: T): T {
  if (!isStorageAvailable()) {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`[BrahmaPath LocalStore] Failed to parse key "${key}":`, error);
    return fallback;
  }
}

/**
 * Serializes and persists a typed item into localStorage.
 * Gracefully handles QuotaExceededError and write failures.
 */
export function setLocalItem<T>(key: string, value: T): boolean {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    if (
      error instanceof DOMException &&
      (error.name === 'QuotaExceededError' ||
        error.code === 22 ||
        error.code === 1014 ||
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
    ) {
      console.error(
        `[BrahmaPath LocalStore] Storage quota exceeded while saving key "${key}".`,
        error
      );
    } else {
      console.error(`[BrahmaPath LocalStore] Failed to write key "${key}":`, error);
    }
    return false;
  }
}

/**
 * Purges all BrahmaPath-related persisted keys from localStorage.
 */
export function clearAllBrahmaPathData(): void {
  if (!isStorageAvailable()) {
    return;
  }

  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      window.localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('[BrahmaPath LocalStore] Failed to clear BrahmaPath storage:', error);
  }
}
