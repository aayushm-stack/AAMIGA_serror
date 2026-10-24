import { useState, useEffect, useCallback } from 'react';
import { TrayopastambhaLog, UserPreferences } from '../types/iks';
import {
  STORAGE_KEYS,
  getLocalItem,
  setLocalItem,
} from '../engine/storage/localStore';
import {
  DEFAULT_PREFERENCES,
  generateDemoSadhanaLogs,
} from '../engine/storage/seedData';

/**
 * Returns today's calendar date in local YYYY-MM-DD format.
 */
function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Custom React hook for managing user sadhana data and preferences.
 * Fully offline-capable, resilient against empty initial state, and syncs
 * with local storage on every mutation.
 */
export function useSadhanaData() {
  const [logs, setLogs] = useState<TrayopastambhaLog[]>(() => {
    const existing = getLocalItem<TrayopastambhaLog[]>(STORAGE_KEYS.LOGS, []);
    if (existing && existing.length > 0) {
      return existing;
    }
    const seed = generateDemoSadhanaLogs();
    setLocalItem(STORAGE_KEYS.LOGS, seed);
    return seed;
  });

  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const existing = getLocalItem<UserPreferences | null>(STORAGE_KEYS.PREFS, null);
    if (existing) {
      return existing;
    }
    setLocalItem(STORAGE_KEYS.PREFS, DEFAULT_PREFERENCES);
    return DEFAULT_PREFERENCES;
  });

  // Verify and persist initial seed if empty on mount
  useEffect(() => {
    const storedLogs = getLocalItem<TrayopastambhaLog[]>(STORAGE_KEYS.LOGS, []);
    if (!storedLogs || storedLogs.length === 0) {
      const demoLogs = generateDemoSadhanaLogs();
      setLocalItem(STORAGE_KEYS.LOGS, demoLogs);
      setLogs(demoLogs);
    }

    const storedPrefs = getLocalItem<UserPreferences | null>(STORAGE_KEYS.PREFS, null);
    if (!storedPrefs) {
      setLocalItem(STORAGE_KEYS.PREFS, DEFAULT_PREFERENCES);
      setPreferences(DEFAULT_PREFERENCES);
    }
  }, []);

  /**
   * Adds a new daily log or updates an existing entry for that date.
   */
  const addOrUpdateDailyLog = useCallback(
    (
      entry: Omit<TrayopastambhaLog, 'id' | 'yuktaScore'>,
      calculatedYuktaScore: number
    ) => {
      setLogs((prevLogs) => {
        const existingIndex = prevLogs.findIndex((log) => log.date === entry.date);
        const newLog: TrayopastambhaLog = {
          ...entry,
          id:
            existingIndex >= 0
              ? prevLogs[existingIndex].id
              : `sadhana-log-${entry.date}`,
          yuktaScore: calculatedYuktaScore,
        };

        let updatedLogs: TrayopastambhaLog[];
        if (existingIndex >= 0) {
          updatedLogs = [...prevLogs];
          updatedLogs[existingIndex] = newLog;
        } else {
          updatedLogs = [...prevLogs, newLog].sort((a, b) =>
            a.date.localeCompare(b.date)
          );
        }

        setLocalItem(STORAGE_KEYS.LOGS, updatedLogs);
        return updatedLogs;
      });
    },
    []
  );

  /**
   * Updates partial user preferences and synchronizes with storage.
   */
  const updatePreferences = useCallback((partial: Partial<UserPreferences>) => {
    setPreferences((prev) => {
      const updated: UserPreferences = {
        ...prev,
        ...partial,
      };
      setLocalItem(STORAGE_KEYS.PREFS, updated);
      return updated;
    });
  }, []);

  /**
   * Retrieves today's Trayopastambha log if already recorded.
   */
  const getTodayLog = useCallback((): TrayopastambhaLog | undefined => {
    const today = getTodayDateString();
    return logs.find((log) => log.date === today);
  }, [logs]);

  /**
   * Reloads state directly from local storage (useful after vault import/restore).
   */
  const reloadFromStorage = useCallback(() => {
    const storedLogs = getLocalItem<TrayopastambhaLog[]>(STORAGE_KEYS.LOGS, []);
    const storedPrefs = getLocalItem<UserPreferences>(
      STORAGE_KEYS.PREFS,
      DEFAULT_PREFERENCES
    );

    setLogs(
      storedLogs && storedLogs.length > 0 ? storedLogs : generateDemoSadhanaLogs()
    );
    setPreferences(storedPrefs);
  }, []);

  return {
    logs,
    preferences,
    addOrUpdateDailyLog,
    updatePreferences,
    getTodayLog,
    reloadFromStorage,
  };
}
