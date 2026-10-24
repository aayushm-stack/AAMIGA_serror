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
  state: ChariotState;
  score: number;
  title: string;
  upanishadAllegory: string;
  horsesStatus: string;
  reinsStatus: string;
  charioteerStatus: string;
}

/**
 * Evaluates the dynamic gait and poise of the Chariot based on daily Trayopastambha
 * balance scores, sensory intake, and urge loop interventions.
 *
 * Scoring model (0-100):
 * - Baseline: 100 points
 * - Heavy progressive deduction for excessive digital intake (>90 mins)
 * - Heavy deduction for un-intercepted or late-stage urges (Gita 2.62-63 cascade)
 * - Calibrated deductions for sleep disruption and depleted energy
 *
 * Thresholds:
 * - Score > 75  => 'Calm' (Sattvic mastery, harmonious reins)
 * - 40 <= Score <= 75 => 'Brisk' (Dynamic Rajas engagement under active steering)
 * - Score < 40  => 'Galloping' (Sensory unruliness, impulse runaway)
 */
export function calculateChariotStatus(
  todayLog: TrayopastambhaLog | undefined,
  todayInterceptions: InterceptionRecord[]
): ChariotStatusReport {
  // 1. Digital Intake Deductions (Heavy penalty for excessive screen time)
  let digitalPenalty = 0;
  const digitalMins = todayLog?.ahara.digitalConsumptionMinutes ?? 0;
  if (digitalMins > 90) {
    // Deduct 8 points for every 30 minutes over 90 mins (capped at 45 pts)
    const excessIntervals = Math.floor((digitalMins - 90) / 30) + 1;
    digitalPenalty = Math.min(45, excessIntervals * 8);
  }

  // 2. Un-intercepted Urge Deductions (Heavy penalty for runaway impulses)
  let urgePenalty = 0;
  for (const item of todayInterceptions) {
    const isLateStage =
      item.cascadeStageReached === 'Sammoha_Delusion' ||
      item.cascadeStageReached === 'SmritiVibhrama_MemoryLoss' ||
      item.cascadeStageReached === 'BuddhiNasha_IntellectLoss';

    const isUnresolved = item.resolvedGunaState !== 'Sattva';

    if (isLateStage && isUnresolved) {
      // Un-intercepted late-stage descent (severe loss of discernment)
      urgePenalty += 30;
    } else if (isLateStage) {
      // Late stage reached, but caught by reframe
      urgePenalty += 18;
    } else if (isUnresolved) {
      // Early urge left unresolved/tamaisic
      urgePenalty += 15;
    } else {
      // Early urge successfully reframed to Sattva (slight transient turbulence)
      urgePenalty += 5;
    }
  }
  urgePenalty = Math.min(50, urgePenalty);

  // 3. Sleep & Circadian Rhythm Deductions
  let sleepPenalty = 0;
  if (todayLog) {
    if (todayLog.nidra.hoursSlept < 5.5) {
      sleepPenalty += 15;
    } else if (todayLog.nidra.hoursSlept < 6.5) {
      sleepPenalty += 8;
    }

    if (todayLog.nidra.restQuality === 'Disturbed') {
      sleepPenalty += 12;
    } else if (todayLog.nidra.restQuality === 'Lethargic') {
      sleepPenalty += 6;
    }

    if (!todayLog.nidra.bedtimeConsistency) {
      sleepPenalty += 5;
    }
  }
  sleepPenalty = Math.min(25, sleepPenalty);

  // 4. Dietary and Energy Stewardship Deductions
  let lifestylePenalty = 0;
  if (todayLog) {
    if (todayLog.ahara.nutritionQuality === 'Tamasic') {
      lifestylePenalty += 8;
    } else if (todayLog.ahara.nutritionQuality === 'Rajasic') {
      lifestylePenalty += 4;
    }

    if (todayLog.ahara.sensoryMindfulnessScore <= 2) {
      lifestylePenalty += 10;
    }

    if (todayLog.brahmacharya.energyConservationRating <= 2) {
      lifestylePenalty += 10;
    }
  }
  lifestylePenalty = Math.min(25, lifestylePenalty);

  // Compute final score clamped to [0, 100]
  const baseStartingScore = todayLog ? 100 : 85;
  const rawScore =
    baseStartingScore - digitalPenalty - urgePenalty - sleepPenalty - lifestylePenalty;
  const score = Math.max(0, Math.min(100, Math.round(rawScore)));

  // Threshold evaluations: > 75 => Calm, 40 <= Score <= 75 => Brisk, < 40 => Galloping
  if (score > 75) {
    return {
      state: 'Calm',
      score,
      title: 'Serene Equilibrium (Sattvic Mastery)',
      upanishadAllegory:
        'Katha Upanishad 1.3.6: "He whose mind is collected and whose intellect is discriminating—his senses are subdued like well-trained horses under a noble charioteer."',
      horsesStatus:
        'Gentle, rhythmic, and content; the senses move in harmony without craving false digital stimulation.',
      reinsStatus:
        'Steady, supple, and centered; mental fluctuations (chitta-vrittis) are tranquil and collected.',
      charioteerStatus:
        'Luminous and poised in Sattva; the intellect guides effortless action aligned with the rider’s sacred Sankalpa.',
    };
  }

  if (score >= 40) {
    return {
      state: 'Brisk',
      score,
      title: 'Brisk Engagement (Dynamic Control)',
      upanishadAllegory:
        'Katha Upanishad 1.3.3: "Know the Self as the rider in the chariot, the body as the chariot, the intellect as the charioteer, and the mind as the reins."',
      horsesStatus:
        'High energetic drive and movement; senses are actively engaged and moving forward under watchful steering.',
      reinsStatus:
        'Taut and responsive; the mind is successfully applying Pratipaksha reframes to prevent wild runaway loops.',
      charioteerStatus:
        'Vigilant and engaged; the discerning intellect (buddhi) actively chooses lasting benefit (Śreyas) over cheap distraction (Preyas).',
    };
  }

  return {
    state: 'Galloping',
    score,
    title: 'Galloping Senses (Unchecked Impulse)',
    upanishadAllegory:
      'Katha Upanishad 1.3.5: "He whose mind is uncollected and whose intellect lacks discrimination—his senses are unruly like vicious horses for a charioteer."',
    horsesStatus:
      'Straining fiercely at the bit; pulled toward rapid digital novelties, restless scrolling, and sensory agitation.',
    reinsStatus:
      'Slackened and vibrating with tension; the reactive mind (manas) struggles to hold impulse containment.',
    charioteerStatus:
      'Clouded discernment; the intellect (buddhi) must intervene with a Pause Gate to reassert conscious command.',
  };
}
