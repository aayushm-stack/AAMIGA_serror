import React, { useState } from 'react';
import { useBrahmaPath } from '../../context/BrahmaPathContext';
import { ShieldCheck, Download, Upload, Lock, RefreshCw, KeyRound } from 'lucide-react';

export interface VaultPageProps {
  className?: string;
}

/**
 * Standalone mobile Vault & Analytics page replicating the exact
 * logic, weekly trend table, trigger loop analytics, and PBKDF2/AES-GCM
 * client-side encrypted vault backup from DevHarness.tsx.
 */
export const VaultPage: React.FC<VaultPageProps> = ({ className = '' }) => {
  const {
    weeklyTrend,
    triggerBreakdown,
    openShastraLens,
    exportPlainJsonBackup,
    importPlainJsonBackup,
    exportEncryptedBackup,
    importEncryptedBackup,
    resetAllData,
  } = useBrahmaPath();

  // Local state for vault password and feedback messages
  const [vaultPassword, setVaultPassword] = useState<string>('');
  const [vaultMessage, setVaultMessage] = useState<string>('');

  return (
    <div
      style={{
        backgroundColor: '#FDFBF7',
        color: '#1E293B',
      }}
      className={`w-full min-h-full pb-8 space-y-6 ${className}`}
    >
      {/* Main Container Card */}
      <div
        style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}
        className="p-5 sm:p-6 rounded-2xl border shadow-xs space-y-6"
      >
        {/* Header with Title and Shastra Lens Trigger */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-800" />
              <h2 className="text-lg font-bold text-slate-900">
                Vault, Analytics &amp; Local-First Backup
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Zero cloud telemetry. Client-side PBKDF2/AES-GCM encrypted persistence.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openShastraLens('gunas')}
            style={{ color: '#065F46' }}
            className="text-xs font-semibold hover:underline cursor-pointer flex-shrink-0 ml-2"
          >
            [Inspect Shastra Lens]
          </button>
        </div>

        {/* Weekly Trend Table */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">
              Weekly Sadhana Progression (Last 7 Days)
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">
              Gita 6.17 Yukta Metrics
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/50">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200">
                  <th className="p-2.5 whitespace-nowrap">Date</th>
                  <th className="p-2.5 whitespace-nowrap">Yukta Score</th>
                  <th className="p-2.5 whitespace-nowrap">Sleep (hrs)</th>
                  <th className="p-2.5 whitespace-nowrap">Digital (mins)</th>
                  <th className="p-2.5 whitespace-nowrap">Dominant Guna</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {weeklyTrend.map((row) => (
                  <tr key={row.date} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-2.5 font-medium text-slate-900 whitespace-nowrap">
                      {row.date}
                    </td>
                    <td className="p-2.5 font-bold text-emerald-800 whitespace-nowrap">
                      {row.yuktaScore}/100
                    </td>
                    <td className="p-2.5 text-slate-700 whitespace-nowrap">
                      {row.sleepHours}h
                    </td>
                    <td className="p-2.5 text-slate-700 whitespace-nowrap">
                      {row.digitalMinutes}m
                    </td>
                    <td className="p-2.5 whitespace-nowrap">
                      <span
                        style={{
                          backgroundColor:
                            row.dominantGuna === 'Sattva'
                              ? '#DEF7EC'
                              : row.dominantGuna === 'Rajas'
                              ? '#FEF08A'
                              : '#F1F5F9',
                          color:
                            row.dominantGuna === 'Sattva'
                              ? '#03543F'
                              : row.dominantGuna === 'Rajas'
                              ? '#713F12'
                              : '#475569',
                        }}
                        className="px-2.5 py-0.5 rounded-full font-semibold text-[11px] inline-block"
                      >
                        {row.dominantGuna}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trigger Breakdown */}
        <div className="space-y-2.5 pt-2">
          <h3 className="text-sm font-bold text-slate-800">
            Trigger Loop Breakdown
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {triggerBreakdown.map((item) => (
              <div
                key={item.category}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center shadow-2xs"
              >
                <span className="text-xs text-slate-700 font-medium">
                  {item.label}
                </span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {item.count}x
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Backup & Encryption Management */}
        <div className="pt-4 border-t border-slate-200 space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-800" />
            <h3 className="text-sm font-bold text-slate-800">
              Encrypted Vault &amp; Export Controls
            </h3>
          </div>

          {vaultMessage && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
              <span>{vaultMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Plain JSON Export / Import */}
            <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  1. Plain JSON Export/Import
                </h4>
                <span className="text-[10px] text-slate-400 font-medium">Unencrypted</span>
              </div>
              <button
                type="button"
                onClick={exportPlainJsonBackup}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#CBD5E1',
                  color: '#334155',
                }}
                className="w-full py-2.5 px-3 border rounded-xl text-xs font-medium hover:bg-slate-100 transition shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                Download Plain JSON Backup
              </button>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1.5">
                  Restore from JSON:
                </label>
                <input
                  type="file"
                  accept=".json"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const res = await importPlainJsonBackup(file);
                      setVaultMessage(res.message);
                    }
                  }}
                  className="w-full text-xs text-slate-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-200 file:text-slate-700 hover:file:bg-slate-300 cursor-pointer"
                />
              </div>
            </div>

            {/* AES-GCM Encrypted Vault */}
            <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  2. AES-GCM Encrypted Vault (.bplock)
                </h4>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  PBKDF2 100k
                </span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter vault passphrase..."
                  value={vaultPassword}
                  onChange={(e) => setVaultPassword(e.target.value)}
                  className="w-full p-2.5 pl-8 border border-slate-300 rounded-xl bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
                <KeyRound className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await exportEncryptedBackup(vaultPassword);
                      setVaultMessage('Encrypted vault exported successfully.');
                    } catch (err) {
                      setVaultMessage((err as Error).message);
                    }
                  }}
                  style={{ backgroundColor: '#065F46', color: '#FFFFFF' }}
                  className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold hover:opacity-95 transition shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Export .bplock
                </button>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1.5">
                  Decrypt &amp; Restore .bplock:
                </label>
                <input
                  type="file"
                  accept=".bplock"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const res = await importEncryptedBackup(file, vaultPassword);
                      setVaultMessage(res.message);
                    }
                  }}
                  className="w-full text-xs text-slate-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Reset Data */}
          <div className="pt-2 flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                if (
                  window.confirm(
                    'Are you sure you want to purge all local BrahmaPath data and reset to demo seed?'
                  )
                ) {
                  resetAllData();
                  setVaultMessage('All local storage cleared and reset to fresh seed.');
                }
              }}
              className="text-xs text-rose-600 hover:text-rose-800 font-medium underline flex items-center gap-1 cursor-pointer transition"
            >
              <RefreshCw className="w-3 h-3 text-rose-600" />
              Purge &amp; Reset All Local Sadhana Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultPage;
