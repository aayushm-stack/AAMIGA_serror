import {
  TrayopastambhaLog,
  InterceptionRecord,
  TriggerCategory,
} from '../types/iks';
import { calculateGunaDistribution } from './gunaDoshaEngine';

/**
 * Returns a 7-day chronological progression of Yukta balance, sleep, digital consumption,
 * and dominant Guna, optimized for line and area charts.
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
  const sorted = [...logs].sort((a, b) => a.date.localeCompare(b.date));
  const recent = sorted.slice(-7);

  return recent.map((log) => ({
    date: log.date,
    yuktaScore: log.yuktaScore,
    sleepHours: log.nidra.hoursSlept,
    digitalMinutes: log.ahara.digitalConsumptionMinutes,
    dominantGuna: log.brahmacharya.dominantGuna,
  }));
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
