import {
  GunaType,
  DoshaType,
  GunaDistribution,
  TrayopastambhaLog,
  InterceptionRecord,
} from '../types/iks';

/**
 * Diagnostic result detailing biological humor imbalance and classical Ayurvedic remedies.
 */
export interface DoshaDiagnosisResult {
  aggravatedDosha: DoshaType;
  cause: string;
  dinacharyaRemedy: string;
  dietaryAdvice: string;
  pranayamaSuggestion: string;
}

/**
 * Computes a normalized Tri-Guna distribution (sattva + rajas + tamas === 100)
 * reflecting recent behavioral patterns across nourishment, sleep, vital focus, and urge loops.
 */
export function calculateGunaDistribution(
  logs: TrayopastambhaLog[],
  interceptions: InterceptionRecord[]
): GunaDistribution {
  if (logs.length === 0 && interceptions.length === 0) {
    return { sattva: 50, rajas: 35, tamas: 15 };
  }

  let sattvaWeight = 0;
  let rajasWeight = 0;
  let tamasWeight = 0;

  // Evaluate recent sadhana logs (prioritizing the last 7 entries)
  const recentLogs = logs.slice(-7);
  for (const log of recentLogs) {
    // 1. Ahara (Dietary & Sensory quality)
    if (log.ahara.nutritionQuality === 'Sattvic') {
      sattvaWeight += 12;
    } else if (log.ahara.nutritionQuality === 'Rajasic') {
      rajasWeight += 10;
    } else {
      tamasWeight += 12;
    }

    // Sensory mindfulness & digital intake
    sattvaWeight += log.ahara.sensoryMindfulnessScore * 3;
    if (log.ahara.digitalConsumptionMinutes > 180) {
      rajasWeight += 10;
      tamasWeight += 6;
    } else if (log.ahara.digitalConsumptionMinutes > 90) {
      rajasWeight += 6;
    } else {
      sattvaWeight += 8;
    }

    // 2. Nidra (Circadian & restorative sleep)
    if (log.nidra.restQuality === 'Restorative') {
      sattvaWeight += 12;
    } else if (log.nidra.restQuality === 'Disturbed') {
      rajasWeight += 12;
    } else {
      tamasWeight += 14;
    }

    if (log.nidra.bedtimeConsistency) {
      sattvaWeight += 6;
    } else {
      rajasWeight += 5;
    }

    if (log.nidra.hoursSlept >= 7 && log.nidra.hoursSlept <= 8.5) {
      sattvaWeight += 8;
    } else if (log.nidra.hoursSlept < 6) {
      rajasWeight += 8;
    } else if (log.nidra.hoursSlept > 9) {
      tamasWeight += 8;
    }

    // 3. Brahmacharya (Energy conservation & deep work)
    sattvaWeight += log.brahmacharya.energyConservationRating * 3;
    sattvaWeight += Math.min(log.brahmacharya.focusedStudyBlocks * 3, 15);

    if (log.brahmacharya.dominantGuna === 'Sattva') {
      sattvaWeight += 10;
    } else if (log.brahmacharya.dominantGuna === 'Rajas') {
      rajasWeight += 10;
    } else {
      tamasWeight += 10;
    }
  }

  // Evaluate recent interception records (last 10 records)
  const recentInterceptions = interceptions.slice(0, 10);
  for (const item of recentInterceptions) {
    // Stage reached before pause
    if (
      item.cascadeStageReached === 'Dhyana_Dwelling' ||
      item.cascadeStageReached === 'Sanga_Attachment'
    ) {
      sattvaWeight += 6; // Early intervention retains cognitive control
    } else if (
      item.cascadeStageReached === 'Kama_Craving' ||
      item.cascadeStageReached === 'Krodha_Agitation'
    ) {
      rajasWeight += 6;
    } else {
      tamasWeight += 8; // Deep into confusion or memory loss
    }

    // Initial versus resolved state transition
    if (item.initialGuna === 'Rajas') rajasWeight += 4;
    if (item.initialGuna === 'Tamas') tamasWeight += 5;

    if (item.resolvedGunaState === 'Sattva') {
      sattvaWeight += 8;
    } else if (item.resolvedGunaState === 'Rajas') {
      rajasWeight += 4;
    } else {
      tamasWeight += 4;
    }
  }

  const total = sattvaWeight + rajasWeight + tamasWeight;
  if (total <= 0) {
    return { sattva: 50, rajas: 35, tamas: 15 };
  }

  let sattva = Math.round((sattvaWeight / total) * 100);
  let rajas = Math.round((rajasWeight / total) * 100);
  let tamas = 100 - (sattva + rajas);

  // Boundary safety guards to prevent negative values
  if (tamas < 0) {
    if (rajas >= Math.abs(tamas)) {
      rajas += tamas;
    } else {
      sattva += tamas;
    }
    tamas = 0;
  }

  return { sattva, rajas, tamas };
}

/**
 * Analyzes behavioral signals and urge triggers to detect acute Dosha imbalances
 * and provides targeted classical Dinacharya and Ayurvedic lifestyle corrections.
 */
export function diagnoseDoshaImbalance(
  logs: TrayopastambhaLog[],
  interceptions: InterceptionRecord[]
): DoshaDiagnosisResult {
  let vataScore = 0;
  let pittaScore = 0;
  let kaphaScore = 0;

  const recentLogs = logs.slice(-7);
  for (const log of recentLogs) {
    // Vata signals: high screen time, erratic sleep, disturbed rest
    if (log.ahara.digitalConsumptionMinutes > 150) vataScore += 3;
    if (log.nidra.restQuality === 'Disturbed') vataScore += 4;
    if (!log.nidra.bedtimeConsistency) vataScore += 3;
    if (log.nidra.hoursSlept < 6) vataScore += 3;

    // Pitta signals: rajasic food, driven tension
    if (log.ahara.nutritionQuality === 'Rajasic') pittaScore += 2;
    if (log.brahmacharya.dominantGuna === 'Rajas') pittaScore += 2;

    // Kapha signals: oversleeping, lethargic rest, tamasic food
    if (log.nidra.restQuality === 'Lethargic') kaphaScore += 4;
    if (log.nidra.hoursSlept > 9) kaphaScore += 3;
    if (log.ahara.nutritionQuality === 'Tamasic') kaphaScore += 3;
  }

  const recentInterceptions = interceptions.slice(0, 10);
  for (const rec of recentInterceptions) {
    // Vata triggers: anxiety, fragmentation, compulsive checking
    if (
      rec.triggerCategory === 'Academic_Anxiety' ||
      rec.triggerCategory === 'Doomscrolling'
    ) {
      vataScore += 4;
    }

    // Pitta triggers: social comparison, envy, anger/agitation
    if (
      rec.triggerCategory === 'Social_Comparison' ||
      rec.cascadeStageReached === 'Krodha_Agitation'
    ) {
      pittaScore += 5;
    }

    // Kapha triggers: lethargy, inertia, post-lunch dullness
    if (
      rec.triggerCategory === 'Lethargy' ||
      rec.cascadeStageReached === 'Sammoha_Delusion'
    ) {
      kaphaScore += 5;
    }
  }

  // Select dominant aggravated dosha
  if (pittaScore > vataScore && pittaScore >= kaphaScore) {
    return {
      aggravatedDosha: 'Pitta',
      cause:
        'Cognitive overheating from social comparison, competitive perfectionism, and acute emotional agitation (Krodha).',
      dinacharyaRemedy:
        'Step away from screens during midday solar peak, practice Upeksha (equanimity and deliberate non-reactivity), and take gentle walks in natural greenery.',
      dietaryAdvice:
        'Prioritize cooling, sweet, and bitter foods (fresh coconut water, sweet juicy fruits, mint infusion, leafy greens); strictly reduce spicy, pungent, and oily snacks.',
      pranayamaSuggestion:
        'Relaxation 4-7-8 breathing with extended cool exhalation (Rechaka) or Sheetali / Sitkari pranayama to pacify mental heat.',
    };
  }

  if (kaphaScore > vataScore && kaphaScore > pittaScore) {
    return {
      aggravatedDosha: 'Kapha',
      cause:
        'Mental inertia and physical stagnation driven by sedentary screen trance, oversleeping, and heavy Tamasic intake.',
      dinacharyaRemedy:
        'Awaken before 6:00 AM (during the active morning Vata window), engage in vigorous physical movement or 12 cycles of Surya Namaskar, and avoid daytime post-lunch naps.',
      dietaryAdvice:
        'Consume warm, light, freshly prepared meals with digestive spices (ginger, black pepper, cinnamon); eliminate heavy dairy, sugary desserts, and cold beverages.',
      pranayamaSuggestion:
        'Stimulating Kapalabhati or Bhastrika (bellows breath) to revitalize sluggish circulation and awaken cognitive sharpness.',
    };
  }

  // Default to Vata aggravation (most prevalent in digital overload and student stress)
  return {
    aggravatedDosha: 'Vata',
    cause:
      'Excessive digital screen stimulation, irregular sleep timing, and recurrent academic anxiety destabilizing nervous system rhythm.',
    dinacharyaRemedy:
      'Establish unwavering regular sleep-wake hours, practice warm foot massage with sesame oil before bed, and institute an absolute screen-free wind-down buffer.',
    dietaryAdvice:
      'Nourish with warm, freshly cooked, grounding foods enriched with healthy fats (ghee, hot soups, whole grains, warm spiced milk); avoid dry, cold, raw foods.',
    pranayamaSuggestion:
      'Sama Vritti (Equal-ratio box breathing) or Nadi Shodhana (Alternate Nostril Breathing) to stabilize the fluctuating nervous system.',
  };
}
