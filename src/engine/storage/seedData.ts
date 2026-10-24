import {
  TrayopastambhaLog,
  InterceptionRecord,
  UserPreferences,
} from '../../types/iks';
import { STORAGE_KEYS, setLocalItem } from './localStore';

/**
 * Default starter preferences for students embarking on the BrahmaPath protocol.
 */
export const DEFAULT_PREFERENCES: UserPreferences = {
  sankalpa: 'Conserve cognitive virya and cultivate Sattvic focus',
  baselineGuna: 'Rajas',
  dominantDosha: 'Vata',
  preferredMicroSwaps: [
    'Take 5 deep breaths with extended exhalation (Rechaka)',
    'Drink a warm glass of water away from all screens',
    'Step out for a 3-minute brisk walk in open air',
    'Write down one clear academic task and set a 25-minute timer',
  ],
  onboardingCompleted: true,
};

/**
 * Formats a Date object into YYYY-MM-DD string format.
 */
function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 14-day template progression telling the transformation narrative:
 * - Days 1-4 (offsets 13 down to 10): High Vata/Tamas, sleep disruption, screen binge, low scores.
 * - Days 5-14 (offsets 9 down to 0): Progressive habit mastery, Pause Gate adoption, high Yukta scores & Sattva.
 */
const FOURTEEN_DAY_JUDGE_TEMPLATES = [
  // --- First 4 Days: High Vata / Tamas, Chronic Overwhelm, Low Yukta ---
  {
    offset: 13,
    ahara: {
      nutritionQuality: 'Tamasic' as const,
      digitalConsumptionMinutes: 320,
      sensoryMindfulnessScore: 1,
    },
    nidra: {
      hoursSlept: 4.8,
      bedtimeConsistency: false,
      restQuality: 'Disturbed' as const,
    },
    brahmacharya: {
      energyConservationRating: 1,
      focusedStudyBlocks: 0,
      dominantGuna: 'Tamas' as const,
    },
    yuktaScore: 36,
    generalReflection:
      'Spiraling in late-night doomscrolling until 3:15 AM. Severe brain fog, missed morning lecture, high anxiety (Spiked Vata & Tamas).',
  },
  {
    offset: 12,
    ahara: {
      nutritionQuality: 'Tamasic' as const,
      digitalConsumptionMinutes: 285,
      sensoryMindfulnessScore: 1,
    },
    nidra: {
      hoursSlept: 5.2,
      bedtimeConsistency: false,
      restQuality: 'Disturbed' as const,
    },
    brahmacharya: {
      energyConservationRating: 2,
      focusedStudyBlocks: 1,
      dominantGuna: 'Tamas' as const,
    },
    yuktaScore: 41,
    generalReflection:
      'High caffeine and energy drink crashes. Constant notification anxiety, struggled to sustain attention for even 10 minutes.',
  },
  {
    offset: 11,
    ahara: {
      nutritionQuality: 'Rajasic' as const,
      digitalConsumptionMinutes: 245,
      sensoryMindfulnessScore: 2,
    },
    nidra: {
      hoursSlept: 5.5,
      bedtimeConsistency: false,
      restQuality: 'Lethargic' as const,
    },
    brahmacharya: {
      energyConservationRating: 2,
      focusedStudyBlocks: 1,
      dominantGuna: 'Rajas' as const,
    },
    yuktaScore: 45,
    generalReflection:
      'Restless comparison on LinkedIn seeing peers landing dream internships. Feeling left out and overwhelmed by academic debt.',
  },
  {
    offset: 10,
    ahara: {
      nutritionQuality: 'Rajasic' as const,
      digitalConsumptionMinutes: 210,
      sensoryMindfulnessScore: 2,
    },
    nidra: {
      hoursSlept: 5.8,
      bedtimeConsistency: false,
      restQuality: 'Disturbed' as const,
    },
    brahmacharya: {
      energyConservationRating: 2,
      focusedStudyBlocks: 2,
      dominantGuna: 'Rajas' as const,
    },
    yuktaScore: 49,
    generalReflection:
      'Hit a breaking point. Installed BrahmaPath, defined first Sankalpa: "Conserve cognitive virya and cultivate Sattvic focus".',
  },

  // --- Next 10 Days: Steady Improvement into Sattvic Balance & High Yukta Scores ---
  {
    offset: 9,
    ahara: {
      nutritionQuality: 'Rajasic' as const,
      digitalConsumptionMinutes: 175,
      sensoryMindfulnessScore: 2,
    },
    nidra: {
      hoursSlept: 6.2,
      bedtimeConsistency: true,
      restQuality: 'Lethargic' as const,
    },
    brahmacharya: {
      energyConservationRating: 3,
      focusedStudyBlocks: 2,
      dominantGuna: 'Rajas' as const,
    },
    yuktaScore: 56,
    generalReflection:
      'First deliberate use of Pause Gate. Caught craving at step 3 (Kāma) and swapped phone for a glass of water.',
  },
  {
    offset: 8,
    ahara: {
      nutritionQuality: 'Rajasic' as const,
      digitalConsumptionMinutes: 140,
      sensoryMindfulnessScore: 3,
    },
    nidra: {
      hoursSlept: 6.5,
      bedtimeConsistency: true,
      restQuality: 'Restorative' as const,
    },
    brahmacharya: {
      energyConservationRating: 3,
      focusedStudyBlocks: 3,
      dominantGuna: 'Rajas' as const,
    },
    yuktaScore: 63,
    generalReflection:
      'Practiced 4-7-8 breathing before evening study block. Noticed reduced palpitations when opening problem sets.',
  },
  {
    offset: 7,
    ahara: {
      nutritionQuality: 'Rajasic' as const,
      digitalConsumptionMinutes: 115,
      sensoryMindfulnessScore: 3,
    },
    nidra: {
      hoursSlept: 6.8,
      bedtimeConsistency: true,
      restQuality: 'Restorative' as const,
    },
    brahmacharya: {
      energyConservationRating: 4,
      focusedStudyBlocks: 3,
      dominantGuna: 'Sattva' as const,
    },
    yuktaScore: 69,
    generalReflection:
      'Screen time dropped below 2 hours for the first time in months. Mind feels noticeably calmer and less reactive.',
  },
  {
    offset: 6,
    ahara: {
      nutritionQuality: 'Sattvic' as const,
      digitalConsumptionMinutes: 95,
      sensoryMindfulnessScore: 4,
    },
    nidra: {
      hoursSlept: 7.2,
      bedtimeConsistency: true,
      restQuality: 'Restorative' as const,
    },
    brahmacharya: {
      energyConservationRating: 4,
      focusedStudyBlocks: 4,
      dominantGuna: 'Sattva' as const,
    },
    yuktaScore: 75,
    generalReflection:
      'Crossed the Yukta equilibrium threshold (75)! Chariot status transition from Brisk to Calm.',
  },
  {
    offset: 5,
    ahara: {
      nutritionQuality: 'Sattvic' as const,
      digitalConsumptionMinutes: 80,
      sensoryMindfulnessScore: 4,
    },
    nidra: {
      hoursSlept: 7.4,
      bedtimeConsistency: true,
      restQuality: 'Restorative' as const,
    },
    brahmacharya: {
      energyConservationRating: 4,
      focusedStudyBlocks: 4,
      dominantGuna: 'Sattva' as const,
    },
    yuktaScore: 80,
    generalReflection:
      'Applied Bhāva Compass (Muditā) when peer celebrated big placement offer. Envy dissolved into sincere sympathetic joy.',
  },
  {
    offset: 4,
    ahara: {
      nutritionQuality: 'Sattvic' as const,
      digitalConsumptionMinutes: 70,
      sensoryMindfulnessScore: 4,
    },
    nidra: {
      hoursSlept: 7.6,
      bedtimeConsistency: true,
      restQuality: 'Restorative' as const,
    },
    brahmacharya: {
      energyConservationRating: 5,
      focusedStudyBlocks: 4,
      dominantGuna: 'Sattva' as const,
    },
    yuktaScore: 84,
    generalReflection:
      'Phone kept outside bedroom 45 minutes before sleep. Surrendered deeply to rest without bedtime racing thoughts.',
  },
  {
    offset: 3,
    ahara: {
      nutritionQuality: 'Sattvic' as const,
      digitalConsumptionMinutes: 60,
      sensoryMindfulnessScore: 5,
    },
    nidra: {
      hoursSlept: 7.8,
      bedtimeConsistency: true,
      restQuality: 'Restorative' as const,
    },
    brahmacharya: {
      energyConservationRating: 5,
      focusedStudyBlocks: 5,
      dominantGuna: 'Sattva' as const,
    },
    yuktaScore: 88,
    generalReflection:
      'Completed 5 intense, deep study blocks on compiler optimization. No afternoon drowsiness or urge to check social feeds.',
  },
  {
    offset: 2,
    ahara: {
      nutritionQuality: 'Sattvic' as const,
      digitalConsumptionMinutes: 50,
      sensoryMindfulnessScore: 5,
    },
    nidra: {
      hoursSlept: 7.8,
      bedtimeConsistency: true,
      restQuality: 'Restorative' as const,
    },
    brahmacharya: {
      energyConservationRating: 5,
      focusedStudyBlocks: 5,
      dominantGuna: 'Sattva' as const,
    },
    yuktaScore: 92,
    generalReflection:
      'Pratipaksha Bhavana is now instinctual: whenever distraction knocks, the wholesome counter-thought arises immediately.',
  },
  {
    offset: 1,
    ahara: {
      nutritionQuality: 'Sattvic' as const,
      digitalConsumptionMinutes: 42,
      sensoryMindfulnessScore: 5,
    },
    nidra: {
      hoursSlept: 8.0,
      bedtimeConsistency: true,
      restQuality: 'Restorative' as const,
    },
    brahmacharya: {
      energyConservationRating: 5,
      focusedStudyBlocks: 5,
      dominantGuna: 'Sattva' as const,
    },
    yuktaScore: 95,
    generalReflection:
      'Sustained mental vitality throughout all labs. Dosha diagnosis shows balanced Vata and peak Sattvic clarity.',
  },
  {
    offset: 0,
    ahara: {
      nutritionQuality: 'Sattvic' as const,
      digitalConsumptionMinutes: 35,
      sensoryMindfulnessScore: 5,
    },
    nidra: {
      hoursSlept: 8.0,
      bedtimeConsistency: true,
      restQuality: 'Restorative' as const,
    },
    brahmacharya: {
      energyConservationRating: 5,
      focusedStudyBlocks: 5,
      dominantGuna: 'Sattva' as const,
    },
    yuktaScore: 97,
    generalReflection:
      'Svastha state. Katha Upanishad Chariot in complete harmony: Buddhi holds the reins firmly, and the senses follow like noble horses.',
  },
];

/**
 * Generates an array of 14 days of realistic Trayopastambha daily logs
 * for judges, illustrating the complete journey from initial Rajas/Tamas
 * and high Vata into stable Sattvic equilibrium.
 */
export function generate14DayJudgeLogs(): TrayopastambhaLog[] {
  const now = new Date();

  return FOURTEEN_DAY_JUDGE_TEMPLATES.map((tmpl) => {
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() - tmpl.offset);
    const dateStr = toDateString(targetDate);

    return {
      id: `sadhana-log-${dateStr}`,
      date: dateStr,
      ahara: tmpl.ahara,
      nidra: tmpl.nidra,
      brahmacharya: tmpl.brahmacharya,
      yuktaScore: tmpl.yuktaScore,
      generalReflection: tmpl.generalReflection,
    };
  });
}

/**
 * Secret judge demo injection utility.
 * Instantly populates local storage with 14 days of narrative data,
 * sets the account creation date to 14 days ago, and adds realistic
 * Pause Gate interception records.
 *
 * @returns The generated 14-day TrayopastambhaLog array.
 */
export function injectJudgeDemoData(): TrayopastambhaLog[] {
  const logs = generate14DayJudgeLogs();
  const interceptions = generateDemoInterceptions();

  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 13);

  const judgePreferences: UserPreferences = {
    ...DEFAULT_PREFERENCES,
    accountCreationDate: toDateString(fourteenDaysAgo),
    onboardingCompleted: true,
  };

  // Persist directly to local storage keys
  setLocalItem(STORAGE_KEYS.LOGS, logs);
  setLocalItem(STORAGE_KEYS.INTERCEPTIONS, interceptions);
  setLocalItem(STORAGE_KEYS.PREFS, judgePreferences);

  return logs;
}

/**
 * Generates 7 days of realistic student sadhana logs ending today.
 * Demonstrates a tangible trajectory progressing from Rajas/Tamas towards Sattva.
 */
export function generateDemoSadhanaLogs(): TrayopastambhaLog[] {
  return generate14DayJudgeLogs().slice(-7);
}

/**
 * Generates 6 realistic interception records with authentic student vitarka thoughts
 * and Patanjali Pratipaksha Bhavana reframes.
 */
export function generateDemoInterceptions(): InterceptionRecord[] {
  const now = new Date();

  const recordsData = [
    {
      hoursAgo: 140,
      triggerCategory: 'Doomscrolling' as const,
      cascadeStageReached: 'Dhyana_Dwelling' as const,
      initialGuna: 'Rajas' as const,
      vitarkaText:
        'Just 5 minutes of short reels to unwind before starting my semester project code.',
      pratipakshaText:
        'This 5-minute dopamine pull fragments my working memory for the next 45 minutes; let me stay with the hard problem.',
      microSwapAction: 'Closed Instagram feed and took 5 conscious slow exhalations.',
      resolvedGunaState: 'Sattva' as const,
    },
    {
      hoursAgo: 112,
      triggerCategory: 'Academic_Anxiety' as const,
      cascadeStageReached: 'Krodha_Agitation' as const,
      initialGuna: 'Rajas' as const,
      vitarkaText:
        'Everyone in the batch already has dream company placement offers and internships; I am hopelessly falling behind.',
      pratipakshaText:
        'Karmanye vadikaraste (Gita 2.47) - Focus solely on today’s DSA problem set without obsessing over comparative outcomes.',
      microSwapAction:
        'Wrote down the next single algorithm problem and started a 25-minute uninterrupted timer.',
      resolvedGunaState: 'Sattva' as const,
    },
    {
      hoursAgo: 88,
      triggerCategory: 'Social_Comparison' as const,
      cascadeStageReached: 'Sanga_Attachment' as const,
      initialGuna: 'Rajas' as const,
      vitarkaText:
        'Browsing batchmates’ LinkedIn promotion and hackathon posts made my own quiet progress feel entirely useless.',
      pratipakshaText:
        'Mudita (Yoga Sutra 1.33) - Genuinely delight in their success; their milestone does not diminish my own swadharma.',
      microSwapAction:
        'Closed LinkedIn tab, stood up from desk, and stretched for 2 minutes.',
      resolvedGunaState: 'Sattva' as const,
    },
    {
      hoursAgo: 64,
      triggerCategory: 'Lethargy' as const,
      cascadeStageReached: 'Sammoha_Delusion' as const,
      initialGuna: 'Tamas' as const,
      vitarkaText:
        'Heavy post-lunch fog at 3:30 PM; feeling like lying down and mindlessly playing YouTube videos until dinner.',
      pratipakshaText:
        'This is Tamasic inertia disguised as rest. Real renewal comes from physical prana flow, not digital trance.',
      microSwapAction:
        'Splashed cold water on face and did a 4-minute brisk outdoor walk.',
      resolvedGunaState: 'Rajas' as const,
    },
    {
      hoursAgo: 36,
      triggerCategory: 'Sensory_Craving' as const,
      cascadeStageReached: 'Kama_Craving' as const,
      initialGuna: 'Rajas' as const,
      vitarkaText:
        'Intense anxiety about tomorrow’s viva exam; craving ultra-sweet snacks and high-caffeine energy drinks.',
      pratipakshaText:
        'Charaka Samhita warns that Rajasic stimulants spike Vata and destabilize the intellect; pure water and deep breath restore steady calm.',
      microSwapAction:
        'Drank a warm glass of water away from screens and completed a 4-7-8 breathing cycle.',
      resolvedGunaState: 'Sattva' as const,
    },
    {
      hoursAgo: 8,
      triggerCategory: 'Doomscrolling' as const,
      cascadeStageReached: 'SmritiVibhrama_MemoryLoss' as const,
      initialGuna: 'Tamas' as const,
      vitarkaText:
        'Unlocked phone to look up professor’s assignment deadline and instantly got sucked into algorithmic news feeds.',
      pratipakshaText:
        'Smriti Anchor - Remember my primary Sankalpa: "Conserve cognitive virya". Exit the feed immediately without guilt or regret.',
      microSwapAction:
        'Locked phone, placed it across the room, and opened the course textbook.',
      resolvedGunaState: 'Sattva' as const,
    },
  ];

  return recordsData.map((item, index) => {
    const timestampDate = new Date(now.getTime() - item.hoursAgo * 60 * 60 * 1000);

    return {
      id: `interception-${index + 1}-${timestampDate.getTime()}`,
      timestamp: timestampDate.toISOString(),
      triggerCategory: item.triggerCategory,
      cascadeStageReached: item.cascadeStageReached,
      initialGuna: item.initialGuna,
      vitarkaText: item.vitarkaText,
      pratipakshaText: item.pratipakshaText,
      microSwapAction: item.microSwapAction,
      resolvedGunaState: item.resolvedGunaState,
    };
  });
}
