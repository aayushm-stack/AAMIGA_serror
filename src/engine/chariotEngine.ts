import {
  ChariotState,
  TrayopastambhaLog,
  InterceptionRecord,
} from '../types/iks';

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

/**
 * Helper to determine if an interception record represents a successful Pause Gate reframe.
 */
function isInterceptionSuccessful(item: InterceptionRecord | any): boolean {
  if (!item) return false;
  if (typeof item.isSuccessful === 'boolean') return item.isSuccessful;
  if (typeof item.success === 'boolean') return item.success;
  if (typeof item.resolved === 'boolean') return item.resolved;
  if (item.resolvedGunaState) {
    return item.resolvedGunaState === 'Sattva';
  }
  return Boolean(item.pratipakshaText && item.pratipakshaText.trim().length > 0);
}

/**
 * Helper to determine if a Bhava Compass interaction was successfully resolved.
 */
function isBhavaResolved(item: any): boolean {
  if (!item) return false;
  if (typeof item === 'boolean') return item;
  if (typeof item.isResolved === 'boolean') return item.isResolved;
  if (typeof item.resolved === 'boolean') return item.resolved;
  if (typeof item.success === 'boolean') return item.success;
  if (item.status) return item.status === 'resolved' || item.status === 'success';
  if (item.targetGunaShift) return item.targetGunaShift === 'Sattva';
  return true;
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
 * - BhavaScore (0-100): Percentage of successfully resolved interpersonal conflicts today.
 *   If 0 conflicts occurred, defaults to 100.
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
  todayBhavaLogs?: any[],
  hasTodayLogs?: boolean
): ChariotStatusReport;
export function calculateChariotStatus(
  todayLog: TrayopastambhaLog | TrayopastambhaLog[] | undefined | null,
  todayInterceptions?: InterceptionRecord[],
  todayBhavaLogs?: any[]
): ChariotStatusReport;
export function calculateChariotStatus(
  todayYuktaScoreOrLog: number | TrayopastambhaLog | TrayopastambhaLog[] | undefined | null,
  todayInterceptions: InterceptionRecord[] = [],
  todayBhavaLogs: any[] = [],
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

  // GateScore: Percentage of successfully intercepted urges today (default 100 if 0 triggers)
  let GateScore = 100;
  if (todayInterceptions && todayInterceptions.length > 0) {
    const successfulCount = todayInterceptions.filter(isInterceptionSuccessful).length;
    GateScore = Math.round((successfulCount / todayInterceptions.length) * 100);
  }

  // BhavaScore: Percentage of successfully resolved interpersonal conflicts today (default 100 if 0 conflicts)
  let BhavaScore = 100;
  if (todayBhavaLogs && todayBhavaLogs.length > 0) {
    const resolvedCount = todayBhavaLogs.filter(isBhavaResolved).length;
    BhavaScore = Math.round((resolvedCount / todayBhavaLogs.length) * 100);
  }

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
