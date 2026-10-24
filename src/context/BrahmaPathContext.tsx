import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';
import {
  TrayopastambhaLog,
  UserPreferences,
  InterceptionRecord,
  GunaDistribution,
  ShastraFeatureKey,
  ShastraLensData,
} from '../types/iks';
import { useSadhanaData } from '../hooks/useSadhanaData';
import { useInterceptorLogs } from '../hooks/useInterceptorLogs';
import {
  calculateGunaDistribution,
  diagnoseDoshaImbalance,
  DoshaDiagnosisResult,
} from '../engine/gunaDoshaEngine';
import { calculateChariotStatus, ChariotStatusReport } from '../engine/chariotEngine';
import { resolveShastraLens } from '../engine/shastraResolver';
import {
  getWeeklyYuktaTrend,
  getTriggerFrequencyBreakdown,
  getGunaChartData,
} from '../engine/analyticsEngine';
import {
  exportJsonBackup,
  importJsonBackup,
} from '../engine/backup/jsonBackup';
import {
  exportEncryptedBackup,
  importEncryptedBackup,
} from '../engine/backup/cryptoBackup';
import { clearAllBrahmaPathData } from '../engine/storage/localStore';
import { useAccount } from './AccountContext';

/**
 * Full contract for the global BrahmaPath application state and logic layer.
 */
export interface BrahmaPathContextType {
  // User Account & Preferred Name (Decoupled Global State)
  userName: string;
  setUserName: (name: string) => void;
  // Sadhana & Habits
  logs: TrayopastambhaLog[];
  preferences: UserPreferences;
  todayLog: TrayopastambhaLog | undefined;
  addOrUpdateDailyLog: (
    entry: Omit<TrayopastambhaLog, 'id' | 'yuktaScore'>,
    calculatedYuktaScore: number
  ) => void;
  updatePreferences: (partial: Partial<UserPreferences>) => void;

  // Interceptor & Urge Tracking
  interceptions: InterceptionRecord[];
  logInterception: (
    record: Omit<InterceptionRecord, 'id' | 'timestamp'>
  ) => InterceptionRecord;
  deleteInterception: (id: string) => void;
  todayInterceptionCount: number;

  // Live Computed Diagnostics
  gunaDistribution: GunaDistribution;
  doshaDiagnosis: DoshaDiagnosisResult;
  chariotStatus: ChariotStatusReport;
  weeklyTrend: ReturnType<typeof getWeeklyYuktaTrend>;
  triggerBreakdown: ReturnType<typeof getTriggerFrequencyBreakdown>;
  gunaChartData: ReturnType<typeof getGunaChartData>;

  // Shastra Lens Modal State
  activeLensKey: ShastraFeatureKey | null;
  activeLensData: ShastraLensData | null;
  openShastraLens: (key: ShastraFeatureKey) => void;
  closeShastraLens: () => void;

  // Local-First Backup & Persistence Actions
  exportPlainJsonBackup: () => void;
  importPlainJsonBackup: (
    file: File
  ) => Promise<{ success: boolean; message: string }>;
  exportEncryptedBackup: (password: string) => Promise<void>;
  importEncryptedBackup: (
    file: File,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  resetAllData: () => void;
}

const BrahmaPathContext = createContext<BrahmaPathContextType | undefined>(undefined);

/**
 * Provider wrapping the application to supply pure IKS engine computations,
 * state persistence, and Shastra Lens drawers.
 */
export function BrahmaPathProvider({ children }: { children: ReactNode }) {
  // Global Account Context (userName)
  const { userName, setUserName } = useAccount();
  // Underlying persistent hooks
  const {
    logs,
    preferences,
    addOrUpdateDailyLog,
    updatePreferences,
    getTodayLog,
    reloadFromStorage,
  } = useSadhanaData();

  const {
    interceptions,
    logInterception,
    deleteInterception,
    getTodayInterceptionCount,
    reloadInterceptions,
  } = useInterceptorLogs();

  // Shastra Lens modal state
  const [activeLensKey, setActiveLensKey] = useState<ShastraFeatureKey | null>(null);

  const activeLensData = useMemo(() => {
    if (!activeLensKey) return null;
    return resolveShastraLens(activeLensKey);
  }, [activeLensKey]);

  const openShastraLens = useCallback((key: ShastraFeatureKey) => {
    setActiveLensKey(key);
  }, []);

  const closeShastraLens = useCallback(() => {
    setActiveLensKey(null);
  }, []);

  // Today's log and counts
  const todayLog = useMemo(() => getTodayLog(), [getTodayLog]);
  const todayInterceptionCount = useMemo(
    () => getTodayInterceptionCount(),
    [getTodayInterceptionCount]
  );

  // Filter today's interceptions for chariot state evaluation
  const todayInterceptions = useMemo(() => {
    const todayPrefix = new Date().toISOString().split('T')[0];
    return interceptions.filter((item) => {
      try {
        return item.timestamp.startsWith(todayPrefix);
      } catch {
        return false;
      }
    });
  }, [interceptions]);

  // Live computed diagnostics (memoized against data changes)
  const gunaDistribution = useMemo(
    () => calculateGunaDistribution(logs, interceptions),
    [logs, interceptions]
  );

  const doshaDiagnosis = useMemo(
    () => diagnoseDoshaImbalance(logs, interceptions),
    [logs, interceptions]
  );

  const chariotStatus = useMemo(
    () => calculateChariotStatus(todayLog, todayInterceptions),
    [todayLog, todayInterceptions]
  );

  const weeklyTrend = useMemo(() => getWeeklyYuktaTrend(logs), [logs]);

  const triggerBreakdown = useMemo(
    () => getTriggerFrequencyBreakdown(interceptions),
    [interceptions]
  );

  const gunaChartData = useMemo(
    () => getGunaChartData(logs, interceptions),
    [logs, interceptions]
  );

  // Backup and data restoration handlers
  const handleExportJson = useCallback(() => {
    exportJsonBackup();
  }, []);

  const handleImportJson = useCallback(
    async (file: File) => {
      const res = await importJsonBackup(file);
      if (res.success) {
        reloadFromStorage();
        reloadInterceptions();
      }
      return { success: res.success, message: res.message };
    },
    [reloadFromStorage, reloadInterceptions]
  );

  const handleExportEncrypted = useCallback(async (password: string) => {
    await exportEncryptedBackup(password);
  }, []);

  const handleImportEncrypted = useCallback(
    async (file: File, password: string) => {
      const res = await importEncryptedBackup(file, password);
      if (res.success) {
        reloadFromStorage();
        reloadInterceptions();
      }
      return { success: res.success, message: res.message };
    },
    [reloadFromStorage, reloadInterceptions]
  );

  const resetAllData = useCallback(() => {
    clearAllBrahmaPathData();
    reloadFromStorage();
    reloadInterceptions();
  }, [reloadFromStorage, reloadInterceptions]);

  const contextValue: BrahmaPathContextType = useMemo(
    () => ({
      userName,
      setUserName,
      logs,
      preferences,
      todayLog,
      addOrUpdateDailyLog,
      updatePreferences,
      interceptions,
      logInterception,
      deleteInterception,
      todayInterceptionCount,
      gunaDistribution,
      doshaDiagnosis,
      chariotStatus,
      weeklyTrend,
      triggerBreakdown,
      gunaChartData,
      activeLensKey,
      activeLensData,
      openShastraLens,
      closeShastraLens,
      exportPlainJsonBackup: handleExportJson,
      importPlainJsonBackup: handleImportJson,
      exportEncryptedBackup: handleExportEncrypted,
      importEncryptedBackup: handleImportEncrypted,
      resetAllData,
    }),
    [
      userName,
      setUserName,
      logs,
      preferences,
      todayLog,
      addOrUpdateDailyLog,
      updatePreferences,
      interceptions,
      logInterception,
      deleteInterception,
      todayInterceptionCount,
      gunaDistribution,
      doshaDiagnosis,
      chariotStatus,
      weeklyTrend,
      triggerBreakdown,
      gunaChartData,
      activeLensKey,
      activeLensData,
      openShastraLens,
      closeShastraLens,
      handleExportJson,
      handleImportJson,
      handleExportEncrypted,
      handleImportEncrypted,
      resetAllData,
    ]
  );

  return (
    <BrahmaPathContext.Provider value={contextValue}>
      {children}
    </BrahmaPathContext.Provider>
  );
}

/**
 * Access the unified BrahmaPath state and logic engine.
 */
export function useBrahmaPath(): BrahmaPathContextType {
  const context = useContext(BrahmaPathContext);
  if (!context) {
    throw new Error('useBrahmaPath must be used within a <BrahmaPathProvider>');
  }
  return context;
}
