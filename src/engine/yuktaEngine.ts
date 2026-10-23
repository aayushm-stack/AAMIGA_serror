import {
  AharaLog,
  NidraLog,
  BrahmacharyaLog,
  YuktaBalanceSummary,
  DoshaType,
} from '../types/iks';

/**
 * Computes individual pillar scores for Ahara, Nidra, and Brahmacharya.
 */
function getPillarScores(
  ahara: AharaLog,
  nidra: NidraLog,
  brahmacharya: BrahmacharyaLog
) {
  // 1. Ahara Scoring (Max 34 pts)
  let aharaScore = 0;
  if (ahara.nutritionQuality === 'Sattvic') {
    aharaScore += 16;
  } else if (ahara.nutritionQuality === 'Rajasic') {
    aharaScore += 9;
  } else {
    aharaScore += 3;
  }

  if (ahara.digitalConsumptionMinutes <= 60) {
    aharaScore += 10;
  } else if (ahara.digitalConsumptionMinutes <= 120) {
    aharaScore += 8;
  } else if (ahara.digitalConsumptionMinutes <= 180) {
    aharaScore += 4;
  } else {
    aharaScore += 0;
  }

  const mindfulnessNormalized = Math.max(1, Math.min(5, ahara.sensoryMindfulnessScore));
  aharaScore += Math.round((mindfulnessNormalized / 5) * 8);

  // 2. Nidra Scoring (Max 33 pts) - Gita 6.17 two-sided moderation
  let nidraScore = 0;
  const hours = nidra.hoursSlept;
  if (hours >= 6.5 && hours <= 8.0) {
    nidraScore += 16; // Peak restorative zone
  } else if ((hours >= 6.0 && hours < 6.5) || (hours > 8.0 && hours <= 8.5)) {
    nidraScore += 12; // Slight deviation
  } else if ((hours >= 5.0 && hours < 6.0) || (hours > 8.5 && hours <= 9.5)) {
    nidraScore += 7; // Noticeable deviation
  } else {
    // Severe deprivation (<5h) or excessive Tamasic slumber (>9.5h)
    nidraScore += 2;
  }

  if (nidra.restQuality === 'Restorative') {
    nidraScore += 11;
  } else if (nidra.restQuality === 'Disturbed') {
    nidraScore += 5;
  } else {
    nidraScore += 4; // Lethargic
  }

  if (nidra.bedtimeConsistency) {
    nidraScore += 6;
  } else {
    nidraScore += 2;
  }

  // 3. Brahmacharya Scoring (Max 33 pts) - Energy conservation & deep work
  let brahmacharyaScore = 0;
  const conservationNormalized = Math.max(
    1,
    Math.min(5, brahmacharya.energyConservationRating)
  );
  brahmacharyaScore += Math.round((conservationNormalized / 5) * 14);

  const cappedBlocks = Math.min(5, Math.max(0, brahmacharya.focusedStudyBlocks));
  brahmacharyaScore += Math.round((cappedBlocks / 5) * 12);

  if (brahmacharya.dominantGuna === 'Sattva') {
    brahmacharyaScore += 7;
  } else if (brahmacharya.dominantGuna === 'Rajas') {
    brahmacharyaScore += 4;
  } else {
    brahmacharyaScore += 1;
  }

  return {
    ahara: Math.min(34, Math.max(0, aharaScore)),
    nidra: Math.min(33, Math.max(0, nidraScore)),
    brahmacharya: Math.min(33, Math.max(0, brahmacharyaScore)),
  };
}

/**
 * Computes an integer Yukta balance score (0-100) based on Bhagavad Gita 6.17.
 * Moderation is rewarded; both sensory/sleep deprivation and excess are penalized.
 */
export function computeYuktaScore(
  ahara: AharaLog,
  nidra: NidraLog,
  brahmacharya: BrahmacharyaLog
): number {
  const scores = getPillarScores(ahara, nidra, brahmacharya);
  const total = scores.ahara + scores.nidra + scores.brahmacharya;
  return Math.min(100, Math.max(0, Math.round(total)));
}

/**
 * Evaluates a complete balance diagnostic summary across the Trayopastambha pillars.
 * Detects the limiting pillar and provides shastra-grounded recommendations from Charaka Su. 11.35 / Gita 6.17.
 */
export function evaluateYuktaSummary(
  ahara: AharaLog,
  nidra: NidraLog,
  brahmacharya: BrahmacharyaLog
): YuktaBalanceSummary {
  const overallScore = computeYuktaScore(ahara, nidra, brahmacharya);
  const scores = getPillarScores(ahara, nidra, brahmacharya);

  const aharaPct = (scores.ahara / 34) * 100;
  const nidraPct = (scores.nidra / 33) * 100;
  const brahmacharyaPct = (scores.brahmacharya / 33) * 100;

  // Determine limiting sub-pillar
  let limitingPillar: 'Ahara' | 'Nidra' | 'Brahmacharya' | 'None' = 'None';
  if (overallScore < 75 || Math.min(aharaPct, nidraPct, brahmacharyaPct) < 65) {
    if (aharaPct <= nidraPct && aharaPct <= brahmacharyaPct) {
      limitingPillar = 'Ahara';
    } else if (nidraPct <= aharaPct && nidraPct <= brahmacharyaPct) {
      limitingPillar = 'Nidra';
    } else {
      limitingPillar = 'Brahmacharya';
    }
  }

  // Determine balance status (Yukta, Ati, or Hina)
  let status: 'Yukta_Balanced' | 'Ati_Excess' | 'Hina_Deficit';
  if (overallScore >= 75) {
    status = 'Yukta_Balanced';
  } else if (
    nidra.hoursSlept > 8.5 ||
    ahara.digitalConsumptionMinutes > 150 ||
    ahara.nutritionQuality === 'Tamasic' ||
    nidra.restQuality === 'Lethargic'
  ) {
    status = 'Ati_Excess';
  } else {
    status = 'Hina_Deficit';
  }

  // Determine aggravated dosha tendency
  let aggravatedDosha: DoshaType = 'Vata';
  if (
    ahara.digitalConsumptionMinutes > 150 ||
    nidra.hoursSlept < 6.0 ||
    nidra.restQuality === 'Disturbed'
  ) {
    aggravatedDosha = 'Vata';
  } else if (
    ahara.nutritionQuality === 'Rajasic' ||
    brahmacharya.dominantGuna === 'Rajas'
  ) {
    aggravatedDosha = 'Pitta';
  } else if (
    nidra.hoursSlept > 8.5 ||
    nidra.restQuality === 'Lethargic' ||
    ahara.nutritionQuality === 'Tamasic'
  ) {
    aggravatedDosha = 'Kapha';
  }

  // Generate shastra-grounded recommendation
  let recommendation: string;
  if (limitingPillar === 'Ahara') {
    recommendation =
      'Charaka Samhita Sutrasthana 11.35 establishes Āhāra (wholesome nutrition and disciplined sensory intake) as the primary life pillar. Moderating digital screen exposure to <120m and prioritizing fresh, Sattvic food directly protects mental clarity and digestive Agni.';
  } else if (limitingPillar === 'Nidra') {
    recommendation =
      'Bhagavad Gita 6.17 emphasizes "yukta-svapnāvabodha" (temperate sleep and waking). Aim for 6.5 to 8.0 hours of consistent rest. Both acute sleep deprivation (<5h) and excessive Tamasic slumber (>9.5h) disturb neuro-cognitive recovery and aggravate Doshas.';
  } else if (limitingPillar === 'Brahmacharya') {
    recommendation =
      'Charaka Samhita Sutrasthana 11.35 highlights Brahmacharya as the preservation of vital cognitive vitality and sensory restraint. Shielding deep study blocks from fragmentation channels scattered Rajas into steady Sattvic discernment.';
  } else {
    recommendation =
      'Bhagavad Gita 6.17: "yuktāhāra-vihārasya yukta-ceṣṭasya karmasu... yogo bhavati duḥkha-hā" — Your Trayopastambha pillars are in harmonious equilibrium. Maintain steady practice (Dṛḍha-bhūmi) with gentle consistency.';
  }

  return {
    overallScore,
    status,
    limitingPillar,
    recommendation,
    aggravatedDosha,
  };
}
