import React, { useState, useMemo } from 'react';
import { ShastraLensButton } from '../Shastra/ShastraLensButton';
import { useBrahmaPath } from '../../context/BrahmaPathContext';
import {
  ShieldCheck,
  Download,
  Upload,
  Lock,
  RefreshCw,
  KeyRound,
  TrendingUp,
  Award,
  Zap,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';

export interface VaultPageProps {
  className?: string;
}

/**
 * Trajectory point structure for dynamic Recharts rendering.
 */
interface TrajectoryPoint {
  id?: string;
  date: string;
  displayDate: string; // Strict 'DD/MM' format
  yuktaScore: number;
  sleepHours: number;
  dominantGuna: string;
  isToday: boolean;
}

/**
 * Formats an ISO date string (YYYY-MM-DD or full timestamp) into DD/MM.
 */
function formatDisplayDate(dateStr?: string): string {
  if (!dateStr) return '--/--';
  const clean = dateStr.slice(0, 10);
  const parts = clean.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}`;
  }
  return clean;
}

/**
 * Checks if a given date string matches today's local date.
 */
function checkIsToday(dateStr?: string): boolean {
  if (!dateStr) return false;
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;
  return dateStr.startsWith(todayStr);
}

/**
 * Custom Tooltip for Recharts styled with parchment aesthetic and DD/MM date.
 */
interface TooltipPayloadItem {
  payload: TrajectoryPoint;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

const ChartCustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data: TrajectoryPoint = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200 shadow-md text-xs space-y-1.5 min-w-[180px]">
        <div className="flex items-center justify-between border-b border-slate-100 pb-1 font-bold text-slate-800">
          <span>Date: {data.displayDate}</span>
          <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
              data.isToday
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            {data.isToday ? 'Live Today' : 'Recorded'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500">Yukta Equilibrium:</span>
          <span className="font-bold text-emerald-800 text-sm">
            {data.yuktaScore} / 100
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-600">
          <span>Dominant Guna:</span>
          <span className="font-semibold">{data.dominantGuna}</span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5 border-t border-slate-100">
          <span>Sleep Rest:</span>
          <span>{data.sleepHours > 0 ? `${data.sleepHours} hrs` : '--'}</span>
        </div>
      </div>
    );
  }
  return null;
};

/**
 * Minimalist UI Guna badge component.
 * - Sattva = Green pill background
 * - Rajas = Terracotta / Orange pill background
 * - Tamas = Slate / Gray pill background
 */
export const GunaBadge: React.FC<{ guna: string }> = ({ guna }) => {
  const normalized = guna.toLowerCase();

  if (normalized.includes('sattva')) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
        Sattva
      </span>
    );
  }

  if (normalized.includes('rajas')) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-[#C2410C] border border-orange-200 shadow-2xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C2410C]" />
        Rajas
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700 border border-slate-300 shadow-2xs">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
      Tamas
    </span>
  );
};

/**
 * Standalone Vault & Analytics Page.
 *
 * Implements:
 * 1. New User Edge Case handling without artificial padding or flatlines.
 * 2. Account Age calculated as `const activeDays = sadhanaLogs.length`.
 * 3. Dynamic Graph Scaling: Passes ONLY existing logs into Recharts <LineChart>.
 * 4. Dynamic Header: `{activeDays > 0 ? activeDays : 1}-Day Sadhana Momentum`.
 * 5. Dynamic Table: Maps sadhanaLogs directly into table rows; displays
 *    "No Sadhana data yet. Your journey begins today." empty state when activeDays === 0.
 * 6. Local-first encrypted PBKDF2/AES-GCM backup controls.
 */
export const VaultPage: React.FC<VaultPageProps> = ({ className = '' }) => {
  const {
    logs: sadhanaLogs,
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

  // 1. Calculate Account Age: Determine the number of recorded days using activeDays
  const activeDays = sadhanaLogs.length;

  // 2. Dynamic Graph Scaling: ONLY existing logs sorted chronologically without padding or zero-fills
  const chartData: TrajectoryPoint[] = useMemo(() => {
    return [...sadhanaLogs]
      .sort((a, b) => (a.date || '').localeCompare(b.date || ''))
      .map((log) => {
        const dateStr = log.date ? log.date.slice(0, 10) : '';
        const displayDate = formatDisplayDate(dateStr);
        const isToday = checkIsToday(dateStr);
        const sleepHours = log.nidra?.hoursSlept ?? 0;
        const dominantGuna = log.brahmacharya?.dominantGuna || 'Sattva';

        return {
          id: log.id,
          date: dateStr,
          displayDate,
          yuktaScore: log.yuktaScore,
          sleepHours,
          dominantGuna,
          isToday,
        };
      });
  }, [sadhanaLogs]);

  // 3. Dynamic Momentum Score based on recorded activeDays
  const { momentumScore, gradeInfo } = useMemo(() => {
    if (activeDays === 0) {
      return {
        momentumScore: 100,
        gradeInfo: {
          grade: 'Initial',
          label: 'Awaiting First Sadhana',
          color: '#047857',
          bg: '#ECFDF5',
          border: '#A7F3D0',
        },
      };
    }

    let weightedSum = 0;
    let totalWeight = 0;

    chartData.forEach((pt, i) => {
      // Linear recency weight: recent days weighted higher
      const weight = i + 1;
      weightedSum += pt.yuktaScore * weight;
      totalWeight += weight;
    });

    const score = Math.round(weightedSum / totalWeight);

    let info: { grade: string; label: string; color: string; bg: string; border: string };
    if (score >= 90) {
      info = {
        grade: 'A+',
        label: 'Sattvic Mastery',
        color: '#065F46',
        bg: '#DEF7EC',
        border: '#86EFAC',
      };
    } else if (score >= 80) {
      info = {
        grade: 'A',
        label: 'Yukta Equilibrium',
        color: '#047857',
        bg: '#ECFDF5',
        border: '#A7F3D0',
      };
    } else if (score >= 70) {
      info = {
        grade: 'B+',
        label: 'Balanced Discipline',
        color: '#0284C7',
        bg: '#F0F9FF',
        border: '#BAE6FD',
      };
    } else if (score >= 60) {
      info = {
        grade: 'B',
        label: 'Active Steering',
        color: '#D97706',
        bg: '#FEF3C7',
        border: '#FDE68A',
      };
    } else if (score >= 50) {
      info = {
        grade: 'C',
        label: 'Fluctuating Focus',
        color: '#C2410C',
        bg: '#FFF7ED',
        border: '#FED7AA',
      };
    } else {
      info = {
        grade: 'Needs Reset',
        label: 'Circadian Depletion',
        color: '#DC2626',
        bg: '#FEE2E2',
        border: '#FECACA',
      };
    }

    return { momentumScore: score, gradeInfo: info };
  }, [activeDays, chartData]);

  // 4. History Table Rows: reverse chronological order (newest on top)
  const tableRows = useMemo(() => {
    return [...chartData].reverse();
  }, [chartData]);

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
        className="p-5 sm:p-6 rounded-3xl border shadow-xs space-y-6"
      >
        {/* Header with Title and Shastra Lens Trigger */}
        <div className="flex items-center justify-between border-b border-slate-200/90 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-800" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Sadhana Vault &amp; Trajectory Analytics
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Your data is completely private. It stays securely encrypted directly on your device and is never sent to the cloud.
            </p>
          </div>
          <ShastraLensButton
            onClick={() => openShastraLens('gunas')}
            className="ml-2"
          />
        </div>

        {/* 1. The Graph: Dynamic Scaling passing ONLY existing sadhanaLogs */}
        <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-800" />
              <h3 className="text-sm font-bold text-slate-800">
                {activeDays > 0 ? activeDays : 1}-Day Sadhana Trajectory
              </h3>
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <span
                style={{
                  backgroundColor: activeDays > 0 ? '#DEF7EC' : '#F1F5F9',
                  color: activeDays > 0 ? '#03543F' : '#475569',
                }}
                className="px-2.5 py-0.5 rounded-full font-bold border border-slate-200"
              >
                {activeDays} {activeDays === 1 ? 'Point' : 'Points'}
                {activeDays > 0 &&
                  chartData.length > 0 &&
                  ` (${chartData[0]?.displayDate} – ${chartData[chartData.length - 1]?.displayDate})`}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            {activeDays > 0
              ? `X-axis dynamically scaled to your ${activeDays} recorded days. Exactly ${activeDays} points plotted without artificial flatlining.`
              : 'X-axis will automatically scale as you log your daily Trayopastambha habits. No flatlining or padded zeroes.'}
          </p>

          {/* Responsive Recharts LineChart with dynamic X-axis */}
          {activeDays === 0 ? (
            <div className="w-full h-56 sm:h-64 flex flex-col items-center justify-center p-6 text-center rounded-xl border border-dashed border-slate-300 bg-white/60 space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-slate-700">
                Your trajectory line will appear with your first logged Sadhana
              </p>
              <p className="text-xs text-slate-400 max-w-xs">
                Record your daily habits today to begin tracking your equilibrium progress.
              </p>
            </div>
          ) : (
            <div className="w-full h-56 sm:h-64 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 14, left: -22, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E2E8F0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="displayDate"
                    interval={0}
                    tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }}
                    stroke="#CBD5E1"
                    tickLine={false}
                    padding={{ left: 16, right: 16 }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tick={{ fontSize: 11, fill: '#64748B' }}
                    stroke="#CBD5E1"
                    tickLine={false}
                  />
                  <Tooltip content={<ChartCustomTooltip />} />
                  <ReferenceLine
                    y={75}
                    stroke="#065F46"
                    strokeDasharray="4 4"
                    label={{
                      value: 'Yukta (75)',
                      fill: '#065F46',
                      fontSize: 10,
                      position: 'insideTopRight',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="yuktaScore"
                    stroke="#065F46"
                    strokeWidth={2.75}
                    dot={{
                      r: 4.5,
                      fill: '#065F46',
                      strokeWidth: 1.5,
                      stroke: '#FFFFFF',
                    }}
                    activeDot={{
                      r: 7,
                      fill: '#D97706',
                      stroke: '#FFFFFF',
                      strokeWidth: 2,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* 2. Dynamic Momentum Score Metric Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: gradeInfo.border,
          }}
          className="p-5 sm:p-6 rounded-2xl border shadow-xs space-y-4 relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-700" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  {activeDays > 0 ? activeDays : 1}-Day Sadhana Momentum
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Recency-weighted trajectory average assessing biological consistency across {activeDays > 0 ? activeDays : 1} active {activeDays === 1 ? 'day' : 'days'}
              </p>
            </div>

            {/* Weekly Grade Pill */}
            <div
              style={{
                backgroundColor: gradeInfo.bg,
                borderColor: gradeInfo.border,
                color: gradeInfo.color,
              }}
              className="px-3.5 py-1.5 rounded-full border flex items-center gap-2 self-start sm:self-auto shadow-2xs"
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Momentum: {gradeInfo.grade} ({gradeInfo.label})
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {momentumScore}
            </span>
            <span className="text-base font-bold text-slate-400">/ 100</span>
            <span className="ml-3 text-xs font-semibold text-slate-500">
              {activeDays === 0
                ? 'Your baseline is set. Complete today’s Sadhana to establish your initial equilibrium.'
                : momentumScore >= 75
                ? 'Sustaining Sattvic poise and disciplined momentum.'
                : 'Focus on evening recovery and circadian rest to rebuild momentum.'}
            </span>
          </div>

          {/* Visual Momentum Progress Bar */}
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              style={{
                width: `${momentumScore}%`,
                backgroundColor: gradeInfo.color,
              }}
              className="h-full rounded-full transition-all duration-700 ease-out"
            />
          </div>
        </div>

        {/* 3. The Dynamic Table: 4 Columns or Empty State */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">
              Sadhana Progression History
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">
              4-Column Gita 6.17 Ledger
            </span>
          </div>

          {activeDays === 0 ? (
            <div className="p-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 text-center space-y-2.5">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100/80 text-amber-800 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#D97706]" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">
                No Sadhana data yet. Your journey begins today.
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Complete your daily reflection in the Sadhana Hub to populate your personal ledger and track biological equilibrium.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200">
                    <th className="p-3 font-bold whitespace-nowrap">Date (DD/MM)</th>
                    <th className="p-3 font-bold whitespace-nowrap">Yukta Score</th>
                    <th className="p-3 font-bold whitespace-nowrap">Sleep (hrs)</th>
                    <th className="p-3 font-bold whitespace-nowrap">Dominant Guna</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tableRows.map((row) => (
                    <tr
                      key={row.id || row.date}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Column 1: Date (DD/MM) */}
                      <td className="p-3 font-semibold text-slate-900 whitespace-nowrap">
                        <span>{row.displayDate}</span>
                        {row.isToday && (
                          <span className="ml-2 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            Live Today
                          </span>
                        )}
                      </td>

                      {/* Column 2: Yukta Score */}
                      <td className="p-3 font-bold text-slate-900 whitespace-nowrap">
                        <span
                          style={{
                            color:
                              row.yuktaScore >= 75
                                ? '#047857'
                                : row.yuktaScore >= 50
                                ? '#D97706'
                                : '#DC2626',
                          }}
                        >
                          {row.yuktaScore} / 100
                        </span>
                      </td>

                      {/* Column 3: Sleep (hrs) */}
                      <td className="p-3 text-slate-700 whitespace-nowrap font-medium">
                        {row.sleepHours > 0 ? `${row.sleepHours} hrs` : '--'}
                      </td>

                      {/* Column 4: Dominant Guna with Minimalist UI Badge */}
                      <td className="p-3 whitespace-nowrap">
                        <GunaBadge guna={row.dominantGuna} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 4. Backup & Encryption Management */}
        <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
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

          {/* Purge & Reset Local Sadhana Data */}
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
