import { InterceptionRecord } from '../types/iks';

/**
 * Helper to determine if an interception record represents a successful Pause Gate reframe.
 * A successful reframe satisfies any of the following:
 * - Explicit success/isResolved flags are true
 * - The cognitive reframe transitioned the mental state into Sattva
 * - A meaningful Pratipaksha Bhavana reframe text was formulated
 */
export function isInterceptionSuccessful(item: InterceptionRecord | any): boolean {
  if (!item) return false;
  if (typeof item.isSuccessful === 'boolean') return item.isSuccessful;
  if (typeof item.success === 'boolean') return item.success;
  if (typeof item.resolved === 'boolean') return item.resolved;
  if (typeof item.isResolved === 'boolean') return item.isResolved;
  if (item.resolvedGunaState) {
    return item.resolvedGunaState === 'Sattva';
  }
  return Boolean(item.pratipakshaText && item.pratipakshaText.trim().length > 0);
}

/**
 * Detailed breakdown of the Pratipaksha Resilience Quotient (PRQ) metrics.
 */
export interface PRQBreakdown {
  totalCognitiveLoad: number;
  successfulCognitiveLoad: number;
  totalSuccessfulIntercepts: number;
  baseScore: number;
  bonus: number;
  gateScore: number;
}

/**
 * Calculates the Pratipaksha Resilience Quotient (PRQ) / GateScore
 * rooted in Bhagavad Gita 2.62-63 cascade interception and Patanjali Yoga Sutra 2.33.
 *
 * Part 1 (Intensity-Weighted Ratio):
 * - Do not count flat successes.
 * - Calculate total Cognitive Load: Denominator = sum of all urgeIntensity values logged today.
 * - Numerator = sum of urgeIntensity for only the successful interceptions.
 * - BaseScore = (Numerator / Denominator) * 100.
 *
 * Part 2 (Stamina Bonus):
 * - Logarithmic Stamina Bonus: Bonus = (Total Successful Intercepts) * 2.5.
 *
 * Final Math:
 * - GateScore = Math.min(100, BaseScore + Bonus).
 *
 * Edge Case:
 * - If interceptions.length === 0, return 100.
 *
 * @param interceptions Array of InterceptionRecord items logged today
 * @returns GateScore clamped between 0 and 100
 */
export function calculateGateScore(interceptions: InterceptionRecord[]): number {
  // Edge Case: If interceptions.length === 0, return 100
  if (!interceptions || interceptions.length === 0) {
    return 100;
  }

  let totalCognitiveLoad = 0;
  let successfulCognitiveLoad = 0;
  let totalSuccessfulIntercepts = 0;

  for (const item of interceptions) {
    const intensity =
      typeof item.urgeIntensity === 'number' && item.urgeIntensity > 0
        ? item.urgeIntensity
        : 1;

    totalCognitiveLoad += intensity;

    if (isInterceptionSuccessful(item)) {
      successfulCognitiveLoad += intensity;
      totalSuccessfulIntercepts += 1;
    }
  }

  // Edge Case: If total cognitive load is 0, return 100
  if (totalCognitiveLoad === 0) {
    return 100;
  }

  // Part 1: Intensity-Weighted Ratio (BaseScore)
  const baseScore = (successfulCognitiveLoad / totalCognitiveLoad) * 100;

  // Part 2: Stamina Bonus
  const bonus = totalSuccessfulIntercepts * 2.5;

  // Final Math: GateScore = Math.min(100, BaseScore + Bonus)
  return Math.min(100, Math.round(baseScore + bonus));
}

/**
 * Computes a full analytical breakdown of the PRQ GateScore for telemetry and gauges.
 */
export function getPRQBreakdown(interceptions: InterceptionRecord[]): PRQBreakdown {
  if (!interceptions || interceptions.length === 0) {
    return {
      totalCognitiveLoad: 0,
      successfulCognitiveLoad: 0,
      totalSuccessfulIntercepts: 0,
      baseScore: 100,
      bonus: 0,
      gateScore: 100,
    };
  }

  let totalCognitiveLoad = 0;
  let successfulCognitiveLoad = 0;
  let totalSuccessfulIntercepts = 0;

  for (const item of interceptions) {
    const intensity =
      typeof item.urgeIntensity === 'number' && item.urgeIntensity > 0
        ? item.urgeIntensity
        : 1;

    totalCognitiveLoad += intensity;

    if (isInterceptionSuccessful(item)) {
      successfulCognitiveLoad += intensity;
      totalSuccessfulIntercepts += 1;
    }
  }

  const baseScore =
    totalCognitiveLoad === 0
      ? 100
      : (successfulCognitiveLoad / totalCognitiveLoad) * 100;

  const bonus = totalSuccessfulIntercepts * 2.5;
  const gateScore = Math.min(100, Math.round(baseScore + bonus));

  return {
    totalCognitiveLoad,
    successfulCognitiveLoad,
    totalSuccessfulIntercepts,
    baseScore,
    bonus,
    gateScore,
  };
}
