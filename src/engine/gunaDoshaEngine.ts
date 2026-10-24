import {
  GunaType,
  DoshaType,
  GunaDistribution,
  TrayopastambhaLog,
  InterceptionRecord,
} from '../types/iks';

/**
 * Proportional Tri-Dosha balance distribution.
 */
export interface DoshaDistribution {
  vata: number;
  pitta: number;
  kapha: number;
}

/**
 * Diagnostic result detailing biological humor imbalance and classical Ayurvedic remedies.
 */
export interface DoshaDiagnosisResult {
  aggravatedDosha: DoshaType;
  cause: string;
  dinacharyaRemedy: string;
  dietaryAdvice: string;
  pranayamaSuggestion: string;
  physicalRemedy: string;
  doshaScores: DoshaDistribution;
  normalizedPercentages: DoshaDistribution;
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
 * based strictly on real user logs rather than arbitrary percentages:
 *
 * - Vata: Spiked by high screen time, irregular sleep, or "Academic Anxiety".
 * - Pitta: Spiked by "Social Comparison" or "Toxic Hostility".
 * - Kapha: Spiked by >9 hours of sleep or Tamasic nutritional intake.
 */
export function diagnoseDoshaImbalance(
  logs: TrayopastambhaLog[],
  interceptions: InterceptionRecord[]
): DoshaDiagnosisResult {
  let vataScore = 0;
  let pittaScore = 0;
  let kaphaScore = 0;

  // 1. Evaluate user lifestyle logs (Ahara & Nidra signals)
  const recentLogs = logs.slice(-7);
  for (const log of recentLogs) {
    // VATA: Spikes with high screen time (>120 mins)
    if (log.ahara.digitalConsumptionMinutes > 120) {
      const excessIntervals = Math.floor((log.ahara.digitalConsumptionMinutes - 120) / 30) + 1;
      vataScore += excessIntervals * 10;
    }

    // VATA: Spikes with irregular sleep (erratic schedule or disturbed rest)
    if (!log.nidra.bedtimeConsistency) {
      vataScore += 15;
    }
    if (log.nidra.restQuality === 'Disturbed') {
      vataScore += 15;
    }
    if (log.nidra.hoursSlept < 6) {
      vataScore += 12;
    }

    // KAPHA: Spikes if user logs > 9 hours of sleep
    if (log.nidra.hoursSlept > 9) {
      kaphaScore += 25;
    }
    if (log.nidra.restQuality === 'Lethargic') {
      kaphaScore += 15;
    }

    // KAPHA: Spikes if user logs Tamasic nutritional intake
    if (log.ahara.nutritionQuality === 'Tamasic') {
      kaphaScore += 25;
    }

    // PITTA: Supporting dietary heating signals
    if (log.ahara.nutritionQuality === 'Rajasic') {
      pittaScore += 10;
    }
    if (log.brahmacharya.dominantGuna === 'Rajas') {
      pittaScore += 8;
    }
  }

  // 2. Evaluate specific trigger categories from Interceptions
  const recentInterceptions = interceptions.slice(0, 15);
  for (const rec of recentInterceptions) {
    const trigger = rec.triggerCategory as string;
    const vitarka = (rec.vitarkaText || '').toLowerCase();

    // VATA: Spike if user triggers "Academic Anxiety"
    if (
      trigger === 'Academic_Anxiety' ||
      trigger === 'Academic Anxiety' ||
      vitarka.includes('academic') ||
      vitarka.includes('exam') ||
      vitarka.includes('anxiety')
    ) {
      vataScore += 30;
    } else if (trigger === 'Doomscrolling') {
      vataScore += 15;
    }

    // PITTA: Spike if user triggers "Social Comparison" or "Toxic Hostility"
    if (
      trigger === 'Social_Comparison' ||
      trigger === 'Social Comparison' ||
      vitarka.includes('comparison') ||
      vitarka.includes('envy') ||
      vitarka.includes('jealous')
    ) {
      pittaScore += 30;
    }

    if (
      trigger === 'Toxic_Hostility' ||
      trigger === 'Toxic Hostility' ||
      rec.cascadeStageReached === 'Krodha_Agitation' ||
      vitarka.includes('hostil') ||
      vitarka.includes('toxic') ||
      vitarka.includes('anger')
    ) {
      pittaScore += 35;
    }

    // KAPHA: Spike if user triggers "Lethargy"
    if (trigger === 'Lethargy' || vitarka.includes('letharg') || vitarka.includes('inertia')) {
      kaphaScore += 30;
    }
  }

  // Natural balanced baseline if no severe disruptions exist yet
  if (vataScore === 0 && pittaScore === 0 && kaphaScore === 0) {
    vataScore = 10;
    pittaScore = 10;
    kaphaScore = 10;
  }

  // Calculate normalized percentages summing to exactly 100%
  const total = vataScore + pittaScore + kaphaScore;
  const vataPercentage = Math.round((vataScore / total) * 100);
  const pittaPercentage = Math.round((pittaScore / total) * 100);
  const kaphaPercentage = 100 - (vataPercentage + pittaPercentage);

  const normalizedPercentages: DoshaDistribution = {
    vata: vataPercentage,
    pitta: pittaPercentage,
    kapha: kaphaPercentage,
  };

  const doshaScores: DoshaDistribution = {
    vata: vataScore,
    pitta: pittaScore,
    kapha: kaphaScore,
  };

  // Determine dominant aggravated dosha
  let aggravatedDosha: DoshaType = 'Vata';
  if (pittaScore > vataScore && pittaScore >= kaphaScore) {
    aggravatedDosha = 'Pitta';
  } else if (kaphaScore > vataScore && kaphaScore > pittaScore) {
    aggravatedDosha = 'Kapha';
  } else {
    aggravatedDosha = 'Vata';
  }

  // Generate compassionate, one-line physical remedy based on dominant imbalance
  let physicalRemedy = '';
  if (aggravatedDosha === 'Vata') {
    physicalRemedy =
      'High Vata detected: Step away from screens for 10 minutes and sip warm water.';
  } else if (aggravatedDosha === 'Pitta') {
    physicalRemedy =
      'High Pitta detected: Cool mental heat with 3 minutes of Sheetali breathing and splash cold water on your face and eyes.';
  } else {
    physicalRemedy =
      'High Kapha detected: Counter physical stagnation with 10 brisk Surya Namaskars or a 10-minute brisk walk in fresh air.';
  }

  if (aggravatedDosha === 'Pitta') {
    return {
      aggravatedDosha: 'Pitta',
      physicalRemedy,
      doshaScores,
      normalizedPercentages,
      cause:
        'Cognitive overheating triggered by Social Comparison, Toxic Hostility, or competitive tension.',
      dinacharyaRemedy:
        'Step away from screens during midday solar peak, practice Upeksha (serene equanimity and non-reactivity), and walk in natural greenery.',
      dietaryAdvice:
        'Prioritize cooling, sweet, and bitter foods (fresh coconut water, sweet juicy fruits, mint infusion, leafy greens); avoid pungent/spicy snacks.',
      pranayamaSuggestion:
        'Sheetali / Sitkari cooling breath or 4-7-8 relaxation breathing with prolonged exhalation to dissipate internal heat.',
    };
  }

  if (aggravatedDosha === 'Kapha') {
    return {
      aggravatedDosha: 'Kapha',
      physicalRemedy,
      doshaScores,
      normalizedPercentages,
      cause:
        'Mental inertia and physical stagnation driven by >9 hours of sleep, Tamasic nutrition, or prolonged screen trance.',
      dinacharyaRemedy:
        'Awaken before 6:00 AM during the active morning window, engage in 12 brisk Surya Namaskars, and eliminate post-lunch naps.',
      dietaryAdvice:
        'Consume warm, light, freshly prepared meals seasoned with black pepper, dry ginger, and cinnamon; eliminate heavy dairy and sugary sweets.',
      pranayamaSuggestion:
        'Stimulating Kapalabhati or Bhastrika (bellows breath) to revitalize circulation and clear mental fog.',
    };
  }

  return {
    aggravatedDosha: 'Vata',
    physicalRemedy,
    doshaScores,
    normalizedPercentages,
    cause:
      'Excessive digital screen stimulation, irregular sleep patterns, or Academic Anxiety destabilizing the nervous system.',
    dinacharyaRemedy:
      'Step away from screens for 10 minutes, sip warm water, establish unwavering sleep timing, and massage feet with warm sesame oil before bed.',
    dietaryAdvice:
      'Nourish with warm, freshly cooked, grounding foods enriched with healthy fats (ghee, hot soups, whole grains, warm spiced milk); avoid dry, cold, raw foods.',
    pranayamaSuggestion:
      'Sama Vritti (Equal-ratio box breathing) or Nadi Shodhana (Alternate Nostril Breathing) to stabilize the fluctuating nervous system.',
  };
}
