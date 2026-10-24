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
 * Data structure representing a single day in the 14-day sadhana trajectory.
 */
export interface FourteenDayTrendPoint {
  /** ISO Date string (YYYY-MM-DD) */
  date: string;
  /** Human-readable short date for X-Axis labels (e.g., 'Oct 22') */
  displayDate: string;
  /** Consolidated or decayed Yukta equilibrium score (0-100) */
  yuktaScore: number;
  /** Hours slept on this date */
  sleepHours: number;
  /** Digital screen minutes consumed on this date */
  digitalMinutes: number;
  /** Dominant psychological Guna */
  dominantGuna: string;
  /** Whether the user actively recorded a sadhana log on this date */
  hasLogs: boolean;
  /** Whether a -5% natural decay penalty was applied due to absence of daily reflection */
  penaltyApplied: boolean;
}

/**
 * Assigns stepped time-weights (w_i) to an entry based on time of day:
 * - Morning logs: weight w = 1.0
 * - Afternoon logs: weight w = 1.5
 * - Evening / Final recovery logs: weight w = 2.0 (rewarding users who recover discipline by the end of the day)
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

  // 2. Explicit timeOfDay / slot / period descriptor
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

  // 3. Timestamp / createdAt / recordedAt / ISO string (24-hour clock)
  const rawTime =
    log.timestamp ||
    log.createdAt ||
    log.recordedAt ||
    (typeof log.date === 'string' && log.date.includes('T') ? log.date : null);

  if (rawTime) {
    const d = new Date(rawTime);
    if (!isNaN(d.getTime())) {
      const hour = d.getHours();
      if (hour < 12) return 1.0; // Morning (< 12:00)
      if (hour < 17) return 1.5; // Afternoon (12:00 - 16:59)
      return 2.0; // Evening / Night / Final (>= 17:00)
    }
  }

  // 4. Chronological sequence fallback within the day
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
 *   Morning logs: weight w = 1.0
 *   Afternoon logs: weight w = 1.5
 *   Evening/Final logs: weight w = 2.0 (rewarding users who recover discipline by the end of the day)
 *
 * Mathematical formula:
 *   E_daily = Sum of (Score * weight) / Sum of weights
 *   \[ E_{daily} = \frac{\sum (S_i \cdot w_i)}{\sum w_i} \]
 *
 * @param logs Array of daily Trayopastambha logs or entries.
 * @param targetDate The specific calendar date ('YYYY-MM-DD'). Defaults to log date or today.
 * @returns Single consolidated E_daily score for that specific calendar date.
 */
export function calculateDailyEquilibrium(
  logs: SadhanaLogInput[] | SadhanaLogInput,
  targetDate?: string
): number;
export function calculateDailyEquilibrium(
  targetDate: string,
  logs: SadhanaLogInput[] | SadhanaLogInput
): number;
export function calculateDailyEquilibrium(
  param1: SadhanaLogInput[] | SadhanaLogInput | string,
  param2?: string | SadhanaLogInput[] | SadhanaLogInput
): number {
  let logs: SadhanaLogInput[] = [];
  let targetDate: string | undefined;

  if (Array.isArray(param1)) {
    logs = param1;
    targetDate = typeof param2 === 'string' ? param2 : undefined;
  } else if (typeof param1 === 'string') {
    targetDate = param1;
    if (Array.isArray(param2)) {
      logs = param2;
    } else if (param2 && typeof param2 === 'object') {
      logs = [param2 as SadhanaLogInput];
    } else {
      logs = [];
    }
  } else if (param1 && typeof param1 === 'object') {
    logs = [param1 as SadhanaLogInput];
    targetDate = typeof param2 === 'string' ? param2 : undefined;
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

  // Filter logs strictly for that specific calendar date
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
    return true;
  });

  if (dayLogs.length === 0) {
    return 0;
  }

  // Calculate weighted average: E_daily = Sum of (Score * weight) / Sum of weights
  let weightedSum = 0;
  let totalWeight = 0;

  for (let i = 0; i < dayLogs.length; i++) {
    const log = dayLogs[i];
    const score = extractLogScore(log);
    const weight = getTimeOfDayWeight(log, i, dayLogs.length);

    weightedSum += score * weight;
    totalWeight += weight;
  }

  if (totalWeight === 0) {
    return 0;
  }

  const finalScore = weightedSum / totalWeight;
  return Math.round(finalScore);
}

/**
 * Calculates a backwards-looking trend up to a maximum of 14 days from today.
 *
 * Crucial New User Edge Case:
 *   Calculates the "Account Age". If the user created their account 3 days ago,
 *   the returned array strictly contains 3 days of data—preventing a 14-day flatline.
 *
 * Natural Decay Logic:
 *   Applies a -5% penalty for days with zero logs, simulating that cognitive discipline
 *   requires daily maintenance.
 *
 * @param logs Array of user Trayopastambha logs.
 * @param accountCreationDate Date string, Date object, or numeric day age representing account creation.
 * @returns Array of FourteenDayTrendPoint items sized strictly between 1 and 14 days.
 */
export function getFourteenDayTrend(
  logs: TrayopastambhaLog[] = [],
  accountCreationDate?: string | Date | number
): FourteenDayTrendPoint[] {
  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let accountAgeDays = 14;

  // 1. Calculate Account Age
  if (typeof accountCreationDate === 'number' && !isNaN(accountCreationDate)) {
    accountAgeDays = Math.max(1, Math.round(accountCreationDate));
  } else if (accountCreationDate) {
    let creationDate: Date;
    if (typeof accountCreationDate === 'string') {
      const parts = accountCreationDate.slice(0, 10).split('-').map(Number);
      if (parts.length === 3 && !parts.some(isNaN)) {
        creationDate = new Date(parts[0], parts[1] - 1, parts[2]);
      } else {
        creationDate = new Date(accountCreationDate);
      }
    } else {
      creationDate = new Date(accountCreationDate);
    }

    if (!isNaN(creationDate.getTime())) {
      const creationMidnight = new Date(
        creationDate.getFullYear(),
        creationDate.getMonth(),
        creationDate.getDate()
      );
      const diffMs = todayMidnight.getTime() - creationMidnight.getTime();
      const rawDiffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      // Account age includes today: day 0 -> 1 day; day 2 -> 3 days
      accountAgeDays = Math.max(1, rawDiffDays + 1);
    }
  } else if (logs && logs.length > 0) {
    // If no explicit accountCreationDate is provided, infer from earliest recorded date
    const sortedDates = logs
      .map((l) => l.date?.slice(0, 10))
      .filter(Boolean)
      .sort();
    if (sortedDates.length > 0) {
      const [y, m, d] = sortedDates[0].split('-').map(Number);
      const earliestMidnight = new Date(y, m - 1, d);
      const diffMs = todayMidnight.getTime() - earliestMidnight.getTime();
      const rawDiff = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      accountAgeDays = Math.max(1, rawDiff + 1);
    }
  }

  // Look backward up to a maximum of 14 days
  const effectiveDays = Math.min(14, accountAgeDays);

  // Generate target dates array in chronological order (oldest to today)
  const targetDates: string[] = [];
  for (let i = effectiveDays - 1; i >= 0; i--) {
    const d = new Date(todayMidnight);
    d.setDate(todayMidnight.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    targetDates.push(`${year}-${month}-${day}`);
  }

  // Group existing logs by calendar date (YYYY-MM-DD)
  const dateLogMap = new Map<string, TrayopastambhaLog[]>();
  for (const log of logs) {
    if (log && log.date) {
      const d = log.date.slice(0, 10);
      if (!dateLogMap.has(d)) {
        dateLogMap.set(d, []);
      }
      dateLogMap.get(d)!.push(log);
    }
  }

  // Determine initial baseline score (find first logged score or baseline 75)
  let lastDisciplineScore = 75;
  const firstLoggedDate = targetDates.find((d) => (dateLogMap.get(d) || []).length > 0);
  if (firstLoggedDate) {
    const initialDayLogs = dateLogMap.get(firstLoggedDate)!;
    lastDisciplineScore = calculateDailyEquilibrium(initialDayLogs, firstLoggedDate);
  }

  const result: FourteenDayTrendPoint[] = [];

  for (const dateStr of targetDates) {
    const dayLogs = dateLogMap.get(dateStr) || [];
    const hasLogs = dayLogs.length > 0;

    const [year, month, day] = dateStr.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const displayDate = dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    let yuktaScore: number;
    let penaltyApplied = false;
    let sleepHours = 0;
    let digitalMinutes = 0;
    let dominantGuna = 'Sattva';

    if (hasLogs) {
      yuktaScore = calculateDailyEquilibrium(dayLogs, dateStr);
      lastDisciplineScore = yuktaScore;
      penaltyApplied = false;

      const latestLog = dayLogs[dayLogs.length - 1];
      sleepHours = latestLog.nidra?.hoursSlept ?? 0;
      digitalMinutes = dayLogs.reduce(
        (sum, l) => sum + (l.ahara?.digitalConsumptionMinutes || 0),
        0
      );
      dominantGuna = latestLog.brahmacharya?.dominantGuna ?? 'Sattva';
    } else {
      // Natural decay: apply -5% penalty for missing daily reflection
      penaltyApplied = true;
      yuktaScore = Math.max(0, Math.round(lastDisciplineScore * 0.95));
      lastDisciplineScore = yuktaScore;
      dominantGuna = 'Rajas'; // Restlessness / inert drift when unobserved
    }

    result.push({
      date: dateStr,
      displayDate,
      yuktaScore,
      sleepHours,
      digitalMinutes,
      dominantGuna,
      hasLogs,
      penaltyApplied,
    });
  }

  return result;
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
    'Academic Anxiety': 'Academic / Exam Anxiety',
    'Social Comparison': 'Social Comparison & Envy',
    Lethargy: 'Lethargy & Inertia',
    'Cheap Dopamine / Junk Stimulation': 'Cheap Dopamine & Junk Cravings',
  };

  const counts: Record<TriggerCategory, number> = {
    Doomscrolling: 0,
    'Academic Anxiety': 0,
    'Social Comparison': 0,
    Lethargy: 0,
    'Cheap Dopamine / Junk Stimulation': 0,
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
