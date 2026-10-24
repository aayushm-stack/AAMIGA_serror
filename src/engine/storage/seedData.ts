import {
  TrayopastambhaLog,
  InterceptionRecord,
  UserPreferences,
} from '../../types/iks';

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
 * Generates 7 days of realistic student sadhana logs ending today.
 * Demonstrates a tangible trajectory progressing from Rajas/Tamas towards Sattva.
 */
export function generateDemoSadhanaLogs(): TrayopastambhaLog[] {
  const now = new Date();

  const dayTemplates = [
    {
      offset: 6,
      ahara: {
        nutritionQuality: 'Tamasic' as const,
        digitalConsumptionMinutes: 240,
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
      yuktaScore: 42,
      generalReflection:
        'Late night social media scrolling till 2:30 AM. Woke up groggy and missed morning lecture.',
    },
    {
      offset: 5,
      ahara: {
        nutritionQuality: 'Rajasic' as const,
        digitalConsumptionMinutes: 190,
        sensoryMindfulnessScore: 2,
      },
      nidra: {
        hoursSlept: 6.0,
        bedtimeConsistency: false,
        restQuality: 'Disturbed' as const,
      },
      brahmacharya: {
        energyConservationRating: 2,
        focusedStudyBlocks: 2,
        dominantGuna: 'Rajas' as const,
      },
      yuktaScore: 51,
      generalReflection:
        'High caffeine and constant WhatsApp notifications. Struggled with sustained attention on DSA.',
    },
    {
      offset: 4,
      ahara: {
        nutritionQuality: 'Rajasic' as const,
        digitalConsumptionMinutes: 145,
        sensoryMindfulnessScore: 3,
      },
      nidra: {
        hoursSlept: 6.5,
        bedtimeConsistency: true,
        restQuality: 'Lethargic' as const,
      },
      brahmacharya: {
        energyConservationRating: 3,
        focusedStudyBlocks: 3,
        dominantGuna: 'Rajas' as const,
      },
      yuktaScore: 62,
      generalReflection:
        'Installed BrahmaPath and set first Sankalpa. Used Pause Gate once before dinner.',
    },
    {
      offset: 3,
      ahara: {
        nutritionQuality: 'Rajasic' as const,
        digitalConsumptionMinutes: 110,
        sensoryMindfulnessScore: 3,
      },
      nidra: {
        hoursSlept: 7.0,
        bedtimeConsistency: true,
        restQuality: 'Restorative' as const,
      },
      brahmacharya: {
        energyConservationRating: 4,
        focusedStudyBlocks: 4,
        dominantGuna: 'Sattva' as const,
      },
      yuktaScore: 71,
      generalReflection:
        'Replaced post-lunch Instagram loop with 4-7-8 breathing. Energy felt steady through labs.',
    },
    {
      offset: 2,
      ahara: {
        nutritionQuality: 'Sattvic' as const,
        digitalConsumptionMinutes: 80,
        sensoryMindfulnessScore: 4,
      },
      nidra: {
        hoursSlept: 7.5,
        bedtimeConsistency: true,
        restQuality: 'Restorative' as const,
      },
      brahmacharya: {
        energyConservationRating: 4,
        focusedStudyBlocks: 4,
        dominantGuna: 'Sattva' as const,
      },
      yuktaScore: 82,
      generalReflection:
        'Kept phone outside bedroom 30 minutes before sleep. Slept deeply without racing thoughts.',
    },
    {
      offset: 1,
      ahara: {
        nutritionQuality: 'Sattvic' as const,
        digitalConsumptionMinutes: 65,
        sensoryMindfulnessScore: 4,
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
      yuktaScore: 89,
      generalReflection:
        '5 focused study blocks completed. Mind felt clear during complex compiler design concepts.',
    },
    {
      offset: 0,
      ahara: {
        nutritionQuality: 'Sattvic' as const,
        digitalConsumptionMinutes: 45,
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
      yuktaScore: 94,
      generalReflection:
        'Svastha feeling throughout the day. Chariot gait steady, senses under calm reins.',
    },
  ];

  return dayTemplates.map((template, idx) => {
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() - template.offset);

    return {
      id: `sadhana-log-${toDateString(targetDate)}`,
      date: toDateString(targetDate),
      ahara: template.ahara,
      nidra: template.nidra,
      brahmacharya: template.brahmacharya,
      yuktaScore: template.yuktaScore,
      generalReflection: template.generalReflection,
    };
  });
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
