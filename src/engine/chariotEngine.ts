import {
  ChariotState,
  TrayopastambhaLog,
  InterceptionRecord,
  BhavaLog,
  BhavaCardData,
} from '../types/iks';
import { calculateGateScore, isInterceptionSuccessful } from './interceptorEngine';
export { calculateGateScore, isInterceptionSuccessful } from './interceptorEngine';

/**
 * Diagnostic report matching the Katha Upanishad 1.3.3-4 Chariot Allegory:
 * - Atman (Self) = Rider
 * - Buddhi (Intellect) = Charioteer
 * - Manas (Mind) = Reins
 * - Indriyas (Senses) = Horses
 * - Vishayas (Sensory Objects) = Paths
 */
export interface ChariotStatusReport {
  composureScore: number;
  state: ChariotState;
  horsesStatus: string;
  reinsStatus: string;
  charioteerStatus: string;
  score: number;
  title: string;
  upanishadAllegory: string;
  gateScore: number;
  bhavaScore: number;
  yuktaScore: number;
}

// isInterceptionSuccessful imported from ./interceptorEngine

/**
 * Helper to determine if a Bhava Compass interaction represents a positive emotional buffer.
 */
export function isBhavaPositive(item: any): boolean {
  if (!item) return false;
  if (typeof item.isPositive === 'boolean') return item.isPositive;
  if (item.interactionType === 'positive_buffer') return true;
  if (item.type === 'positive' || item.category === 'positive') return true;
  if (
    typeof item.appreciationMessage === 'string' &&
    item.appreciationMessage.trim().length > 0
  ) {
    return true;
  }
  return false;
}

/**
 * Helper to determine if a negative Bhava Compass friction was successfully resolved.
 */
export function isBhavaNegativeResolved(item: any): boolean {
  if (!item) return false;
  if (typeof item === 'boolean') return item;
  if (typeof item.isResolved === 'boolean') return item.isResolved;
  if (typeof item.resolved === 'boolean') return item.resolved;
  if (item.interactionType === 'resolved_negative_friction') return true;
  if (item.interactionType === 'unresolved_negative_friction') return false;
  if (typeof item.success === 'boolean') return item.success;
  if (item.status === 'resolved' || item.status === 'success') return true;
  if (item.status === 'unresolved') return false;
  if (item.targetGunaShift === 'Sattva') return true;
  return false;
}

/**
 * Helper for backwards-compatibility checking whether a Bhava log is resolved.
 */
export function isBhavaResolved(item: any): boolean {
  if (!item) return false;
  if (isBhavaPositive(item)) return true;
  return isBhavaNegativeResolved(item);
}

/**
 * Calculates the Bhava Score using the Emotional Surplus (Buffer) algorithm.
 *
 * Mathematical Formula:
 * BhavaScore = Math.min(100, ((resolvedNegatives / totalNegatives) * 100) + (totalPositives * 20))
 *
 * Edge Case:
 * If totalNegatives === 0, the base score automatically defaults to 100,
 * and the positive bonus is still added (capped at 100 by Math.min).
 *
 * This means positive logs act as a +20 point buffer to rescue the user's score
 * if they leave a negative log unresolved.
 *
 * @param todayBhavaLogs Array of Bhava logs or card interactions from today
 * @returns BhavaScore clamped between 0 and 100
 */
export function calculateBhavaScore(
  todayBhavaLogs: (BhavaLog | BhavaCardData | any)[] = []
): number {
  if (!todayBhavaLogs || todayBhavaLogs.length === 0) {
    return 100;
  }

  let totalPositives = 0;
  let totalNegatives = 0;
  let resolvedNegatives = 0;

  for (const item of todayBhavaLogs) {
    if (isBhavaPositive(item)) {
      totalPositives += 1;
    } else {
      totalNegatives += 1;
      if (isBhavaNegativeResolved(item)) {
        resolvedNegatives += 1;
      }
    }
  }

  // Base score: 100 if no negative triggers occurred, else the resolution ratio percentage
  const baseScore =
    totalNegatives === 0
      ? 100
      : (resolvedNegatives / totalNegatives) * 100;

  // Emotional Surplus bonus: +20 points per positive buffer
  const positiveBonus = totalPositives * 20;

  return Math.min(100, Math.round(baseScore + positiveBonus));
}

/**
 * Evaluates the dynamic composure and gait of the Katha Upanishad Chariot
 * using a Weighted Capacity Model where physical foundation (Yukta) anchors
 * cognitive and sensory composure.
 *
 * Mathematical Logic:
 * - Start of Day Edge Case: If the user has 0 todayLogs (or undefined/null),
 *   bypass the math and return the special state: 'Resting'.
 * - GateScore (0-100): Percentage of successfully intercepted urges today.
 *   If 0 triggers occurred, defaults to 100.
 * - BhavaScore (0-100): Emotional Surplus (Buffer) Algorithm:
 *   BhavaScore = Math.min(100, ((resolvedNegatives / totalNegatives) * 100) + (totalPositives * 20))
 *   Edge Case: If totalNegatives === 0, base score defaults to 100 and positive bonus is added (capped at 100).
 * - Final Composure Formula:
 *   composureScore = Math.round((todayYuktaScore * 0.50) + (GateScore * 0.30) + (BhavaScore * 0.20))
 *
 * Thresholds for Logged Days:
 * - composureScore > 75        => 'Calm'
 * - 40 <= composureScore <= 75 => 'Brisk'
 * - composureScore < 40        => 'Galloping'
 */
export function calculateChariotStatus(
  todayYuktaScore: number,
  todayInterceptions?: InterceptionRecord[],
  todayBhavaLogs?: (BhavaLog | BhavaCardData | any)[],
  hasTodayLogs?: boolean
): ChariotStatusReport;
export function calculateChariotStatus(
  todayLog: TrayopastambhaLog | TrayopastambhaLog[] | undefined | null,
  todayInterceptions?: InterceptionRecord[],
  todayBhavaLogs?: (BhavaLog | BhavaCardData | any)[]
): ChariotStatusReport;
export function calculateChariotStatus(
  todayYuktaScoreOrLog: number | TrayopastambhaLog | TrayopastambhaLog[] | undefined | null,
  todayInterceptions: InterceptionRecord[] = [],
  todayBhavaLogs: (BhavaLog | BhavaCardData | any)[] = [],
  hasTodayLogs?: boolean
): ChariotStatusReport {
  // ================= 1. START OF DAY EDGE CASE =================
  // If the user has 0 todayLogs, bypass the math and return special state: 'Resting'
  const isZeroLogs =
    hasTodayLogs === false ||
    todayYuktaScoreOrLog === undefined ||
    todayYuktaScoreOrLog === null ||
    (Array.isArray(todayYuktaScoreOrLog) && todayYuktaScoreOrLog.length === 0);

  if (isZeroLogs) {
    return {
      composureScore: 100,
      state: 'Resting',
      horsesStatus: 'Calm and stabled in pasture; the senses await the morning wake-up.',
      reinsStatus: 'Draped gently without tension; mental activity has not yet engaged the day.',
      charioteerStatus:
        'The charioteer (Buddhi) rests in tranquil stillness, awaiting your morning reflection.',
      score: 100,
      title: 'Resting (Dawn Stillness)',
      upanishadAllegory:
        'Katha Upanishad 1.3.3: "Know the Self as the rider in the chariot, the body as the chariot, the intellect as the charioteer, and the mind as the reins."',
      gateScore: 100,
      bhavaScore: 100,
      yuktaScore: 0,
    };
  }

  // ================= 2. DATA RESOLUTION =================
  let rawYuktaScore = 75;
  if (typeof todayYuktaScoreOrLog === 'number') {
    rawYuktaScore = todayYuktaScoreOrLog;
  } else if (Array.isArray(todayYuktaScoreOrLog) && todayYuktaScoreOrLog.length > 0) {
    const latest = todayYuktaScoreOrLog[todayYuktaScoreOrLog.length - 1];
    rawYuktaScore = latest?.yuktaScore ?? 75;
  } else if (todayYuktaScoreOrLog && typeof (todayYuktaScoreOrLog as TrayopastambhaLog).yuktaScore === 'number') {
    rawYuktaScore = (todayYuktaScoreOrLog as TrayopastambhaLog).yuktaScore;
  }
  const todayYuktaScore = Math.max(0, Math.min(100, Math.round(rawYuktaScore)));

  // GateScore: Pratipaksha Resilience Quotient (PRQ)
  const GateScore = calculateGateScore(todayInterceptions || []);

  // BhavaScore: Emotional Surplus (Buffer) algorithm
  const BhavaScore = calculateBhavaScore(todayBhavaLogs);

  // ================= 3. WEIGHTED CAPACITY MODEL =================
  const composureScore = Math.round(
    todayYuktaScore * 0.5 + GateScore * 0.3 + BhavaScore * 0.2
  );

  // ================= 4. STATE THRESHOLDS =================
  let state: ChariotState;
  if (composureScore > 75) {
    state = 'Calm';
  } else if (composureScore >= 40) {
    state = 'Brisk';
  } else {
    state = 'Galloping';
  }

  // ================= 5. PHILOSOPHICAL STATUS REASONING =================
  let charioteerStatus: string;
  let reinsStatus: string;
  let horsesStatus: string;

  if (state === 'Calm') {
    if (todayYuktaScore >= 80) {
      charioteerStatus =
        'Luminous and poised in Sattva; the intellect (Buddhi) directs the chariot with effortless clarity, firmly anchored in physiological equilibrium.';
    } else {
      charioteerStatus =
        'Vigilant and composed; the intellect holds noble discernment despite moderate physical depletion.';
    }

    reinsStatus =
      GateScore >= 80
        ? 'Supple, centered, and responsive; mental impulses (Manas) are guided without strain.'
        : 'Steady but monitored; mental focus holds the course.';

    horsesStatus =
      todayInterceptions.length === 0
        ? 'Gentle and content in pasture; no sensory distractions have unseated the senses today.'
        : 'Rhythmic, subdued, and noble; senses follow the chariot without bolting after cheap dopamine.';
  } else if (state === 'Brisk') {
    if (todayYuktaScore < 50 && GateScore >= 70) {
      charioteerStatus =
        'The charioteer is physically fatigued from depleted sleep or nutrition, but is pulling the reins hard to steer through turbulence.';
    } else if (GateScore < 50) {
      charioteerStatus =
        'The intellect is actively negotiating multiple sensory surges, striving to separate fleeting Preyas from enduring Śreyas.';
    } else {
      charioteerStatus =
        'Vigilant and engaged; active discriminative intelligence steers purposeful movement through heavy academic demands.';
    }

    reinsStatus =
      GateScore >= 70
        ? 'Taut and held firm; deliberate Pratipaksha Bhavana prevents runaway impulsive loops.'
        : 'Strained by fluctuating impulses; the mind requires conscious reinforcement to stabilize.';

    horsesStatus =
      todayYuktaScore < 50
        ? 'Restless from physiological depletion; irregular circadian rhythm makes the senses skittish and prone to sudden cravings.'
        : 'High energetic drive; forward sensory momentum is spirited but contained under active steering.';
  } else {
    // Galloping (< 40)
    if (todayYuktaScore < 40) {
      charioteerStatus =
        'The physical foundation (Yukta) is severely depleted, leaving the charioteer (Buddhi) weakened as runaway impulses overpower conscious discernment.';
    } else {
      charioteerStatus =
        'Clouded discernment; the intellect has momentarily dropped the reins and must reassert conscious command via a Pause Gate.';
    }

    reinsStatus =
      'Slackened and vibrating with tension; the reactive mind struggles to contain recurring compulsive loops.';

    horsesStatus =
      'Unruly and bolting; the senses are dragging the chariot toward digital dopamine and sensory agitation.';
  }

  const titles: Record<ChariotState, string> = {
    Resting: 'Resting (Dawn Stillness)',
    Calm: 'Serene Poise (Sattvic Mastery)',
    Brisk: 'Dynamic Engagement (Active Steering)',
    Galloping: 'Unchecked Impulse (Galloping Senses)',
    Gallop: 'Unchecked Impulse (Galloping Senses)',
  };

  const allegories: Record<ChariotState, string> = {
    Resting:
      'Katha Upanishad 1.3.3: "Know the Self as the rider in the chariot, the body as the chariot, the intellect as the charioteer, and the mind as the reins."',
    Calm:
      'Katha Upanishad 1.3.6: "He whose mind is collected and whose intellect is discriminating—his senses are subdued like well-trained horses under a noble charioteer."',
    Brisk:
      'Katha Upanishad 1.3.3: "Know the Self as the rider in the chariot, the body as the chariot, the intellect as the charioteer, and the mind as the reins."',
    Galloping:
      'Katha Upanishad 1.3.5: "He whose mind is uncollected and whose intellect lacks discrimination—his senses are unruly like vicious horses for a charioteer."',
    Gallop:
      'Katha Upanishad 1.3.5: "He whose mind is uncollected and whose intellect lacks discrimination—his senses are unruly like vicious horses for a charioteer."',
  };

  return {
    composureScore,
    state,
    horsesStatus,
    reinsStatus,
    charioteerStatus,
    score: composureScore,
    title: titles[state],
    upanishadAllegory: allegories[state],
    gateScore: GateScore,
    bhavaScore: BhavaScore,
    yuktaScore: todayYuktaScore,
  };
}
