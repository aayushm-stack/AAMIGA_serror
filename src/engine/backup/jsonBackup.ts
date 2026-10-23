import { BrahmaPathBackupPayload } from '../../types/iks';
import { getLocalItem, setLocalItem, STORAGE_KEYS } from '../storage/localStore';
import { DEFAULT_PREFERENCES } from '../storage/seedData';

/**
 * Validates the schema of an unknown object against BrahmaPathBackupPayload.
 */
export function isValidBackupPayload(data: unknown): data is BrahmaPathBackupPayload {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  const payload = data as Partial<BrahmaPathBackupPayload>;
  return (
    typeof payload.version === 'string' &&
    typeof payload.exportedAt === 'string' &&
    typeof payload.preferences === 'object' &&
    payload.preferences !== null &&
    Array.isArray(payload.sadhanaLogs) &&
    Array.isArray(payload.interceptions)
  );
}

/**
 * Assembles the complete BrahmaPath state into a portable backup payload.
 */
export function createBackupPayload(): BrahmaPathBackupPayload {
  return {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    preferences: getLocalItem(STORAGE_KEYS.PREFS, DEFAULT_PREFERENCES),
    sadhanaLogs: getLocalItem(STORAGE_KEYS.LOGS, []),
    interceptions: getLocalItem(STORAGE_KEYS.INTERCEPTIONS, []),
  };
}

/**
 * Restores a validated backup payload into local storage.
 */
export function restoreBackupPayload(payload: BrahmaPathBackupPayload): boolean {
  if (!isValidBackupPayload(payload)) {
    return false;
  }
  const pSaved = setLocalItem(STORAGE_KEYS.PREFS, payload.preferences);
  const lSaved = setLocalItem(STORAGE_KEYS.LOGS, payload.sadhanaLogs);
  const iSaved = setLocalItem(STORAGE_KEYS.INTERCEPTIONS, payload.interceptions);
  return pSaved && lSaved && iSaved;
}

/**
 * Triggers a direct JSON download of the current sadhana logs and settings.
 */
export function exportJsonBackup(): void {
  const payload = createBackupPayload();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `brahmapath-backup-${new Date().toISOString().split('T')[0]}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

/**
 * Imports and parses a plain JSON backup file.
 */
export async function importJsonBackup(
  file: File
): Promise<{ success: boolean; message: string; payload?: BrahmaPathBackupPayload }> {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!isValidBackupPayload(data)) {
      return { success: false, message: 'Invalid BrahmaPath backup file format.' };
    }
    const restored = restoreBackupPayload(data);
    if (!restored) {
      return { success: false, message: 'Failed to write restored data to local storage.' };
    }
    return { success: true, message: 'Backup successfully restored.', payload: data };
  } catch (error) {
    return { success: false, message: `Failed to import backup: ${(error as Error).message}` };
  }
}
