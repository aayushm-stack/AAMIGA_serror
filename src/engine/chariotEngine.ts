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
  title: string;
  upanishadAllegory: string;
  horsesStatus: string;
  reinsStatus: string;
  charioteerStatus: string;
}

/**
 * Evaluates the dynamic gait and poise of the Chariot based on daily Trayopastambha
 * balance scores, sensory intake, and urge loop interventions.
 */
export function calculateChariotStatus(
  todayLog: TrayopastambhaLog | undefined,
  todayInterceptions: InterceptionRecord[]
): ChariotStatusReport {
  // Check for critical Gallop triggers (excessive screen time, disturbed sleep, deep lapses)
  const isHighScreenTime = todayLog ? todayLog.ahara.digitalConsumptionMinutes > 180 : false;
  const isDisturbedSleep = todayLog
    ? todayLog.nidra.restQuality === 'Disturbed' || todayLog.nidra.hoursSlept < 5.5
    : false;
  const isLowYukta = todayLog ? todayLog.yuktaScore < 55 : false;
  const hasSevereInterception = todayInterceptions.some(
    (item) =>
      item.cascadeStageReached === 'Sammoha_Delusion' ||
      item.cascadeStageReached === 'SmritiVibhrama_MemoryLoss' ||
      item.cascadeStageReached === 'BuddhiNasha_IntellectLoss'
  );

  if (isHighScreenTime || isDisturbedSleep || isLowYukta || hasSevereInterception) {
    return {
      state: 'Gallop',
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

  // Check for Brisk triggers (moderate Rajas, active study engagement, 1-2 reframed urges)
  const isModerateScreenTime = todayLog
    ? todayLog.ahara.digitalConsumptionMinutes > 90
    : false;
  const isModerateYukta = todayLog
    ? todayLog.yuktaScore >= 55 && todayLog.yuktaScore < 75
    : false;
  const isRajasic = todayLog
    ? todayLog.brahmacharya.dominantGuna === 'Rajas' ||
      todayLog.ahara.nutritionQuality === 'Rajasic'
    : false;
  const hasActiveInterceptions = todayInterceptions.length > 0;

  if (isModerateScreenTime || isModerateYukta || isRajasic || hasActiveInterceptions) {
    return {
      state: 'Brisk',
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

  // Default to Calm (Yukta score >= 75 or serene morning baseline)
  return {
    state: 'Calm',
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
