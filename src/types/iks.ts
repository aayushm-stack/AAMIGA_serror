/**
 * Barrel export for all Indian Knowledge Systems (IKS) type definitions in BrahmaPath.
 */

export * from './primitives';
export * from './trayopastambha';
export * from './interceptor';
export * from './shastra';

import { UserPreferences } from './shastra';
import { TrayopastambhaLog } from './trayopastambha';
import { InterceptionRecord } from './interceptor';

/**
 * Complete portable backup payload for local-first export/import and offline persistence.
 */
export interface BrahmaPathBackupPayload {
  /** Schema version */
  version: string;
  /** ISO timestamp of data export */
  exportedAt: string;
  /** Core user preferences and Sankalpa */
  preferences: UserPreferences;
  /** Complete historical Trayopastambha daily logs */
  sadhanaLogs: TrayopastambhaLog[];
  /** Historical Pause Gate / loop-breaking records */
  interceptions: InterceptionRecord[];
}
