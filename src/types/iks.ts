/**
 * Barrel export and unified type definitions for all Indian Knowledge Systems (IKS) in BrahmaPath.
 */

export * from './primitives';
export * from './trayopastambha';
export * from './interceptor';
export * from './shastra';

import { UserPreferences } from './shastra';
import { TrayopastambhaLog } from './trayopastambha';
import { InterceptionRecord } from './interceptor';

/**
 * Data structure representing a Bhava Compass Card rooted in
 * Patanjali's Chitta Prasadanam framework (Yoga Sutra 1.33).
 *
 * Cultivates the four tranquilizing mental attitudes:
 * - Maitrī (Friendliness toward the happy/prosperous)
 * - Karuṇā (Compassion toward the suffering/unhappy)
 * - Muditā (Sympathetic joy toward the virtuous/meritorious)
 * - Upekṣā (Equanimous neutrality toward the harmful/unvirtuous)
 */
export interface BhavaCardData {
  /** Unique card identifier */
  id: string;
  /** English or situational title */
  title: string;
  /** Canonical Sanskrit trait (e.g., 'Maitrī', 'Karuṇā', 'Muditā', 'Upekṣā') */
  sanskritTrait: string;
  /** Indicates whether this card is a positive wholesome buffer or negative friction */
  isPositive: boolean;
  /** For positive cards: optional appreciation message celebrating joy, connection, or virtue */
  appreciationMessage?: string;
  /** For negative cards: optional explanatory text clarifying the underlying cognitive trigger */
  explanationText?: string;
  /** For negative cards: optional actionable steps or cognitive antidotes for resolution */
  actionSteps?: string[];
  /**
   * For negative cards: whether the interpersonal friction has been resolved.
   * Default: false
   */
  isResolved?: boolean;
}

/**
 * Categorical interaction types for Bhava Compass emotional tracking.
 * Distinguishes wholesome protective buffers from resolved or active negative friction.
 */
export type BhavaInteractionType =
  | 'positive_buffer'
  | 'resolved_negative_friction'
  | 'unresolved_negative_friction';

/**
 * Historical record of a Bhava Compass interaction (Yoga Sutra 1.33 Chitta Prasadanam).
 * Tracks whether the logged interaction was a positive buffer or a resolved/unresolved negative friction.
 */
export interface BhavaLog {
  /** Unique log entry identifier */
  id: string;
  /** ISO timestamp when the interaction was logged */
  timestamp: string;
  /** Reference to the associated BhavaCardData identifier */
  cardId?: string;
  /** Title or contextual label of the interaction */
  title: string;
  /** Sanskrit trait or attitude (Maitrī, Karuṇā, Muditā, Upekṣā) */
  sanskritTrait: string;
  /** Indicates whether the interaction is inherently positive or negative */
  isPositive: boolean;
  /** Tracks whether the logged interaction was a positive buffer or a resolved/unresolved negative friction */
  interactionType: BhavaInteractionType;
  /** For positive cards: optional appreciation message */
  appreciationMessage?: string;
  /** For negative cards: optional explanation text */
  explanationText?: string;
  /** For negative cards: optional action steps */
  actionSteps?: string[];
  /**
   * Whether the interaction is resolved.
   * Defaults to false for unresolved negative friction; true for positive buffers and resolved friction.
   */
  isResolved: boolean;
  /** Optional user reflection or notes */
  notes?: string;
}

/**
 * Complete portable backup payload for local-first export/import and offline persistence.
 */
export interface BrahmaPathBackupPayload {
  /** Schema version */
  version: string;
  /** ISO timestamp of data export */
  exportedAt: string;
  /** Core user preferences and Sankalpa */
  preferences: UserPreferences;
  /** Complete historical Trayopastambha daily logs */
  sadhanaLogs: TrayopastambhaLog[];
  /** Historical Pause Gate / loop-breaking records */
  interceptions: InterceptionRecord[];
  /** Historical Bhava Compass emotional interactions and reflections */
  bhavaLogs?: BhavaLog[];
}
