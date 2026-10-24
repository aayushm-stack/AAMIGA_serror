import { useState, useEffect, useCallback } from 'react';
import { InterceptionRecord } from '../types/iks';
import {
  STORAGE_KEYS,
  getLocalItem,
  setLocalItem,
} from '../engine/storage/localStore';
import { generateDemoInterceptions } from '../engine/storage/seedData';

/**
 * Returns today's calendar date prefix (YYYY-MM-DD) for date filtering.
 */
function getTodayDatePrefix(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Custom React hook for logging and managing Pause Gate interception records.
 * Fully offline-capable and syncs with local storage.
 */
export function useInterceptorLogs() {
  const [interceptions, setInterceptions] = useState<InterceptionRecord[]>(() => {
    const existing = getLocalItem<InterceptionRecord[]>(
      STORAGE_KEYS.INTERCEPTIONS,
      []
    );
    if (existing && existing.length > 0) {
      return existing;
    }
    const seed = generateDemoInterceptions();
    setLocalItem(STORAGE_KEYS.INTERCEPTIONS, seed);
    return seed;
  });

  // Verify and seed default demonstrations on mount if empty
  useEffect(() => {
    const stored = getLocalItem<InterceptionRecord[]>(
      STORAGE_KEYS.INTERCEPTIONS,
      []
    );
    if (!stored || stored.length === 0) {
      const demo = generateDemoInterceptions();
      setLocalItem(STORAGE_KEYS.INTERCEPTIONS, demo);
      setInterceptions(demo);
    }
  }, []);

  /**
   * Records a new loop interception event and persists it to local storage.
   */
  const logInterception = useCallback(
    (record: Omit<InterceptionRecord, 'id' | 'timestamp'>): InterceptionRecord => {
      const newRecord: InterceptionRecord = {
        ...record,
        id: `interception-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        timestamp: new Date().toISOString(),
      };

      setInterceptions((prev) => {
        const updated = [newRecord, ...prev];
        setLocalItem(STORAGE_KEYS.INTERCEPTIONS, updated);
        return updated;
      });

      return newRecord;
    },
    []
  );

  /**
   * Deletes a specific interception record by ID.
   */
  const deleteInterception = useCallback((id: string) => {
    setInterceptions((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      setLocalItem(STORAGE_KEYS.INTERCEPTIONS, updated);
      return updated;
    });
  }, []);

  /**
   * Returns the total number of Pause Gate interceptions triggered today.
   */
  const getTodayInterceptionCount = useCallback((): number => {
    const prefix = getTodayDatePrefix();
    return interceptions.filter((item) => {
      try {
        return item.timestamp.startsWith(prefix);
      } catch {
        return false;
      }
    }).length;
  }, [interceptions]);

  /**
   * Reloads interception logs directly from local storage.
   */
  const reloadInterceptions = useCallback(() => {
    const stored = getLocalItem<InterceptionRecord[]>(
      STORAGE_KEYS.INTERCEPTIONS,
      []
    );
    setInterceptions(
      stored && stored.length > 0 ? stored : generateDemoInterceptions()
    );
  }, []);

  return {
    interceptions,
    logInterception,
    deleteInterception,
    getTodayInterceptionCount,
    reloadInterceptions,
  };
}
