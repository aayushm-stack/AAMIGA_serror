import { GunaType } from './primitives';

/**
 * Triggers initiating compulsive digital/behavioral loops.
 */
export type TriggerCategory =
  | 'Doomscrolling'
  | 'Academic_Anxiety'
  | 'Social_Comparison'
  | 'Lethargy'
  | 'Sensory_Craving';

/**
 * The 7-step psychological descent cascade described in Bhagavad Gita 2.62-63:
 * Dhyāyato viṣayān puṁsaḥ saṅgas teṣūpajāyate...
 */
export type CascadeStage =
  | 'Dhyana_Dwelling'
  | 'Sanga_Attachment'
  | 'Kama_Craving'
  | 'Krodha_Agitation'
  | 'Sammoha_Delusion'
  | 'SmritiVibhrama_MemoryLoss'
  | 'BuddhiNasha_IntellectLoss';

/**
 * Structural metadata and pedagogical info for each step of the Gita 2.62-63 cascade.
 */
export interface CascadeStepInfo {
  /** Machine-readable stage identifier */
  stage: CascadeStage;
  /** Transliterated Sanskrit term (e.g., 'Dhyāna', 'Saṅga') */
  sanskritTerm: string;
  /** Plain English title */
  englishTitle: string;
  /** Concise psychological description */
  description: string;
  /** Whether the urge is early and easily interruptible */
  canInterceptEasily: boolean;
  /** Step order in the cascade progression (1-7) */
  stepNumber: number;
}

/**
 * Historical record of a Pause Gate intervention / loop-breaking event.
 * Combines Gita 2.62-63 cascade tracking with Patanjali Yoga Sutra 2.33 (Pratipaksha Bhavana).
 */
export interface InterceptionRecord {
  /** Unique record identifier */
  id: string;
  /** ISO timestamp when the pause gate was triggered */
  timestamp: string;
  /** Categorical source of the compulsive urge */
  triggerCategory: TriggerCategory;
  /** Stage along the Gita 2.62-63 cascade where intervention occurred */
  cascadeStageReached: CascadeStage;
  /** Emotional/energetic state when entering the gate */
  initialGuna: GunaType;
  /** Vitarka: The raw, unwholesome impulse or negative narrative */
  vitarkaText: string;
  /** Pratipaksha: The opposite wholesome cognitive reframe (YS 2.33) */
  pratipakshaText: string;
  /** Concrete micro-swap replacement (Śreyas over Preyas, e.g., sip water, deep exhale) */
  microSwapAction: string;
  /** Attained psychological state following the intervention */
  resolvedGunaState: GunaType;
  /**
   * Tracks whether the logged interaction was a positive buffer or a resolved/unresolved negative friction.
   */
  interactionType?:
    | 'positive_buffer'
    | 'resolved_negative_friction'
    | 'unresolved_negative_friction';
  /**
   * Whether the interaction or negative friction has been resolved.
   * Defaults to false for unresolved negative friction; true for positive buffers and resolved friction.
   */
  isResolved?: boolean;
  /**
   * Whether the logged interaction is inherently positive.
   */
  isPositive?: boolean;
}
