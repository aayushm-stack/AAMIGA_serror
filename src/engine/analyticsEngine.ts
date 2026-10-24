import {
  TrayopastambhaLog,
  InterceptionRecord,
  TriggerCategory,
} from '../types/iks';
import { calculateGunaDistribution } from './gunaDoshaEngine';
import { computeYuktaScore } from './yuktaEngine';

/**
 * Extended log entry supporting optional time-of-day or timestamp metadata.
 */
export interface SadhanaLogInput extends Partial<TrayopastambhaLog> {
  id?: string;
  date?: string;
  timestamp?: string | number | Date;
  createdAt?: string | number | Date;
  recordedAt?: string | number | Date;
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | string;
  slot?: 'morning' | 'afternoon' | 'evening' | string;
  period?: 'morning' | 'afternoon' | 'evening' | string;
  weight?: number;
  timeWeight?: number;
  yuktaScore?: number;
  score?: number;
}

/**
 * Assigns stepped time-weight (w_i) to an entry based on time of day:
 * - Morning: 1.0 (w_i = 1.0)
 * - Afternoon: 1.5 (w_i = 1.5)
 * - Evening / Final recovery: 2.0 (w_i = 2.0, rewarding users who recover discipline by the end of the day)
 */
export function getTimeOfDayWeight(
  log: SadhanaLogInput,
  indexInDay: number = 0,
  totalLogsInDay: number = 1
): number {
  // 1. Explicit numeric override
  if (typeof log.weight === 'number' && log.weight > 0) {
    return log.weight;
  }
  if (typeof log.timeWeight === 'number' && log.timeWeight > 0) {
    return log.timeWeight;
  }

  // 2. Explicit timeOfDay / slot / period string
  const period = String(log.timeOfDay || log.slot || log.period || '').toLowerCase();
  if (
    period.includes('morn') ||
    period.includes('dawn') ||
    period.includes('pratah') ||
    period === 'am'
  ) {
    return 1.0;
  }
  if (
    period.includes('noon') ||
    period.includes('afternoon') ||
    period.includes('madhyanha') ||
    period === 'midday'
  ) {
    return 1.5;
  }
  if (
    period.includes('eve') ||
    period.includes('night') ||
    period.includes('final') ||
    period.includes('sayam') ||
    period === 'pm'
  ) {
    return 2.0;
  }

  // 3. Timestamp / createdAt / date with ISO time (24-hour scale)
  const rawTime =
    log.timestamp ||
    log.createdAt ||
    log.recordedAt ||
    (typeof log.date === 'string' && log.date.includes('T') ? log.date : null);

  if (rawTime) {
    const d = new Date(rawTime);
    if (!isNaN(d.getTime())) {
      const hour = d.getHours();
      if (hour < 12) return 1.0; // Morning (<12:00)
      if (hour < 17) return 1.5; // Afternoon (12:00 - 16:59)
      return 2.0; // Evening / Night / Final (>=17:00)
    }
  }

  // 4. Fallback based on chronological step order within the day
  if (totalLogsInDay <= 1) {
    return 1.0;
  }
  if (indexInDay === 0) {
    return 1.0; // First log of the day: Morning
  }
  if (indexInDay === totalLogsInDay - 1) {
    return 2.0; // Final / last log of the day: Evening recovery
  }
  return 1.5; // Intermediate log: Afternoon
}

/**
 * Extracts or computes the numeric score (S_i) for a log entry.
 */
function extractLogScore(log: SadhanaLogInput): number {
  if (typeof log.yuktaScore === 'number' && !isNaN(log.yuktaScore)) {
    return log.yuktaScore;
  }
  if (typeof log.score === 'number' && !isNaN(log.score)) {
    return log.score;
  }
  if (log.ahara && log.nidra && log.brahmacharya) {
    return computeYuktaScore(log.ahara, log.nidra, log.brahmacharya);
  }
  return 0;
}

/**
 * Calculates the consolidated Daily Equilibrium score (E_daily) for a specific calendar date.
 * Supports multiple logs per day using a stepped time-weighted average:
 *
 *   Morning logs: weight (w_i) = 1.0
 *   Afternoon logs: weight (w_i) = 1.5
 *   Evening/Final logs: weight (w_i) = 2.0 (rewarding users who recover discipline by the end of the day)
 *
 * Mathematical logic:
 *   E_daily = \frac{\sum (S_i \cdot w_i)}{\sum w_i}
 *
 * @param logs Array of daily Trayopastambha logs or entries.
 * @param targetDate The specific calendar date ('YYYY-MM-DD'). If omitted, defaults to the log date or today.
 * @returns Single consolidated E_daily score for that specific calendar date.
 */
export function calculateDailyEquilibrium(
  logs: SadhanaLogInput[],
  targetDate?: string
): number;
export function calculateDailyEquilibrium(
  targetDate: string,
  logs: SadhanaLogInput[]
): number;
export function calculateDailyEquilibrium(
  param1: SadhanaLogInput[] | string,
  param2?: string | SadhanaLogInput[]
): number {
  let logs: SadhanaLogInput[] = [];
  let targetDate: string | undefined;

  if (Array.isArray(param1)) {
    logs = param1;
    targetDate = typeof param2 === 'string' ? param2 : undefined;
  } else if (typeof param1 === 'string') {
    targetDate = param1;
    logs = Array.isArray(param2) ? param2 : [];
  }

  if (!logs || logs.length === 0) {
    return 0;
  }

  // Determine target date if not explicitly provided
  if (!targetDate) {
    const firstWithDate = logs.find((l) => Boolean(l.date));
    if (firstWithDate && firstWithDate.date) {
      targetDate = firstWithDate.date.slice(0, 10);
    } else {
      targetDate = new Date().toISOString().slice(0, 10);
    }
  }

  const normalizedTargetDate = targetDate.slice(0, 10);

  // Filter logs for that specific calendar date
  const dayLogs = logs.filter((log) => {
    if (!log) return false;
    if (log.date) {
      return log.date.slice(0, 10) === normalizedTargetDate;
    }
    if (log.timestamp) {
      const d = new Date(log.timestamp);
      if (!isNaN(d.getTime())) {
        return d.toISOString().slice(0, 10) === normalizedTargetDate;
      }
    }
    if (log.createdAt) {
      const d = new Date(log.createdAt);
      if (!isNaN(d.getTime())) {
        return d.toISOString().slice(0, 10) === normalizedTargetDate;
      }
    }
    // If no explicit date field was provided on the log, consider it part of the day batch
    return true;
  });

  if (dayLogs.length === 0) {
    return 0;
  }

  // Calculate weighted average: E_daily = \sum (S_i * w_i) / \sum w_i
  let weightedSum = 0;
  let totalWeight = 0;

  for (let i = 0; i < dayLogs.length; i++) {
    const log = dayLogs[i];
    const s_i = extractLogScore(log);
    const w_i = getTimeOfDayWeight(log, i, dayLogs.length);

    weightedSum += s_i * w_i;
    totalWeight += w_i;
  }

  if (totalWeight === 0) {
    return 0;
  }

  const eDaily = weightedSum / totalWeight;

  // Return clean consolidated score (rounded to 2 decimal places if non-integer)
  return Math.round(eDaily * 100) / 100;
}

/**
 * Returns a 7-day chronological progression of Yukta balance, sleep, digital consumption,
 * and dominant Guna, optimized for line and area charts.
 * Consolidates multiple daily logs into a single daily equilibrium score.
 */
export function getWeeklyYuktaTrend(
  logs: TrayopastambhaLog[]
): {
  date: string;
  yuktaScore: number;
  sleepHours: number;
  digitalMinutes: number;
  dominantGuna: string;
}[] {
  // Group logs by unique calendar date
  const dateMap = new Map<string, TrayopastambhaLog[]>();
  for (const log of logs) {
    const d = log.date.slice(0, 10);
    if (!dateMap.has(d)) {
      dateMap.set(d, []);
    }
    dateMap.get(d)!.push(log);
  }

  const dates = Array.from(dateMap.keys()).sort((a, b) => a.localeCompare(b));
  const recentDates = dates.slice(-7);

  return recentDates.map((date) => {
    const dayLogs = dateMap.get(date)!;
    const latestLog = dayLogs[dayLogs.length - 1];
    const consolidatedYukta = calculateDailyEquilibrium(dayLogs, date);

    // Sum digital intake across all logs for that date
    const totalDigital = dayLogs.reduce(
      (sum, l) => sum + (l.ahara?.digitalConsumptionMinutes || 0),
      0
    );

    return {
      date,
      yuktaScore: consolidatedYukta,
      sleepHours: latestLog.nidra?.hoursSlept ?? 0,
      digitalMinutes: totalDigital,
      dominantGuna: latestLog.brahmacharya?.dominantGuna ?? 'Sattva',
    };
  });
}

/**
 * Aggregates and ranks the frequency of compulsive loop triggers,
 * sorted descending by occurrence for targeted behavioral awareness.
 */
export function getTriggerFrequencyBreakdown(
  interceptions: InterceptionRecord[]
): {
  category: TriggerCategory;
  label: string;
  count: number;
}[] {
  const categoryLabels: Record<TriggerCategory, string> = {
    Doomscrolling: 'Doomscrolling Feeds',
    Academic_Anxiety: 'Academic / Exam Anxiety',
    Social_Comparison: 'Social Comparison & Envy',
    Lethargy: 'Lethargy & Inertia',
    Sensory_Craving: 'Sensory Cravings',
  };

  const counts: Record<TriggerCategory, number> = {
    Doomscrolling: 0,
    Academic_Anxiety: 0,
    Social_Comparison: 0,
    Lethargy: 0,
    Sensory_Craving: 0,
  };

  for (const item of interceptions) {
    if (counts[item.triggerCategory] !== undefined) {
      counts[item.triggerCategory]++;
    }
  }

  const result = (Object.keys(counts) as TriggerCategory[]).map((category) => ({
    category,
    label: categoryLabels[category],
    count: counts[category],
  }));

  return result.sort((a, b) => b.count - a.count);
}

/**
 * Formats normalized Tri-Guna distribution directly into Recharts-ready data points
 * using the BrahmaPath palette: Sattva (#065F46), Rajas (#D97706), and Tamas (#475569).
 */
export function getGunaChartData(
  logs: TrayopastambhaLog[],
  interceptions: InterceptionRecord[]
): {
  name: string;
  value: number;
  fill: string;
}[] {
  const dist = calculateGunaDistribution(logs, interceptions);

  return [
    {
      name: 'Sattva',
      value: dist.sattva,
      fill: '#065F46', // Emerald Forest
    },
    {
      name: 'Rajas',
      value: dist.rajas,
      fill: '#D97706', // Terracotta Amber
    },
    {
      name: 'Tamas',
      value: dist.tamas,
      fill: '#475569', // Slate Ash
    },
  ];
}
