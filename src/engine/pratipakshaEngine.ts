import { TriggerCategory, GunaType } from '../types/iks';

/**
 * Pedagogical and cognitive reappraisal templates for each trigger category,
 * implementing Patanjali's Pratipaksha Bhavana (Yoga Sutra 2.33).
 */
export const TRIGGER_REFRAME_TEMPLATES: Record<
  TriggerCategory,
  {
    vitarkaExample: string;
    pratipakshaPrompt: string;
    suggestedReframe: string;
    defaultMicroSwaps: string[];
  }
> = {
  Doomscrolling: {
    vitarkaExample:
      'Just 5 minutes of reels or outrage feeds to decompress before starting my study session.',
    pratipakshaPrompt:
      'Yoga Sutra 2.33: When unwholesome thoughts distract you, cultivate the opposing wholesome contemplation. How does endless algorithmic novelty impact your working memory?',
    suggestedReframe:
      'This infinite scroll delivers fleeting dopamine wanting without genuine nourishment. Guarding my attention now preserves cognitive virya for deep mastery.',
    defaultMicroSwaps: [
      'Lock phone and place it across the room',
      'Take 5 deep breaths with extended exhalation (Rechaka)',
      'Drink a glass of cool water away from screens',
      'Open one specific academic problem or chapter',
    ],
  },
  Academic_Anxiety: {
    vitarkaExample:
      'Everyone else in the batch is far ahead in placements; I am hopelessly behind and doomed to fail.',
    pratipakshaPrompt:
      'Bhagavad Gita 2.47: You have rightful mastery over your immediate action, never over external outcomes. Where can you anchor your agency right now?',
    suggestedReframe:
      'Obsessing over batchmate progress and future results scatters my prana. My sole duty is to dedicate full attention to the next single problem before me.',
    defaultMicroSwaps: [
      'Write down one clear, isolated sub-task on paper',
      'Start a 25-minute single-focus Pomodoro timer',
      'Practice 2 minutes of Sama Vritti (box breathing)',
      'Step out to the corridor to clear mental tension',
    ],
  },
  Social_Comparison: {
    vitarkaExample:
      'Browsing peers’ LinkedIn and internship announcements makes my own quiet efforts feel invisible and useless.',
    pratipakshaPrompt:
      'Yoga Sutra 1.33 (Mudita): Cultivate sympathetic joy in the virtue and progress of others. How does their milestone impact your personal swadharma?',
    suggestedReframe:
      'Their milestones do not diminish my potential. I celebrate their success with genuine Mudita while quietly and steadily perfecting my own craft.',
    defaultMicroSwaps: [
      'Close all social feed tabs immediately',
      'Silently wish them happiness and continued excellence',
      'Review my personal one-line Sankalpa',
      'Stand up and do a 2-minute physical shoulder stretch',
    ],
  },
  Lethargy: {
    vitarkaExample:
      'Heavy afternoon brain fog; let me just lie down and mindlessly play YouTube videos until late evening.',
    pratipakshaPrompt:
      'Samkhya / Bhagavad Gita 14.8: Tamas binds consciousness through indolence and sleepiness. Is this physiological fatigue or habitual inert resistance?',
    suggestedReframe:
      'Digital distraction deepens Tamasic heaviness. Real restorative energy comes from moving the body and circulating fresh prana.',
    defaultMicroSwaps: [
      'Splash cold water thoroughly on face and eyes',
      'Engage in 5 minutes of brisk outdoor walking',
      'Perform 6 rounds of dynamic stretching or Surya Namaskar',
      'Drink a cup of warm water or herbal infusion',
    ],
  },
  Sensory_Craving: {
    vitarkaExample:
      'Under deadline pressure, intensely craving sugary junk snacks, energy drinks, or instant stimulation.',
    pratipakshaPrompt:
      'Charaka Samhita Sutrasthana 7: The senses naturally pursue pleasant stimuli, but excessive indulgence injures metabolic Agni and Ojas. What does the body truly require?',
    suggestedReframe:
      'This urge is an emotional tension reflex, not true bodily hunger. Conscious hydration and calm breathing will ride this wave out cleanly.',
    defaultMicroSwaps: [
      'Drink a warm glass of water away from all devices',
      'Perform 3 minutes of 4-7-8 relaxing breathwork',
      'Step away from food storage or the cafeteria',
      'Take 5 conscious slow breaths observing the sensation fade',
    ],
  },
};

/**
 * Validates user-submitted Vitarka and Pratipaksha texts according to Patanjali's
 * cognitive reappraisal discipline (Yoga Sutra 2.33).
 */
export function validatePratipakshaReframe(
  vitarka: string,
  pratipaksha: string
): {
  isValid: boolean;
  feedback: string;
  resultingGuna: GunaType;
} {
  const trimmedVitarka = vitarka.trim();
  const trimmedPratipaksha = pratipaksha.trim();

  if (trimmedVitarka.length < 10 || trimmedPratipaksha.length < 10) {
    return {
      isValid: false,
      feedback:
        'Please articulate both the unwholesome impulse (Vitarka) and the wholesome reframe (Pratipaksha) in at least 10 characters to engage cognitive discernment.',
      resultingGuna: 'Rajas',
    };
  }

  if (trimmedVitarka.toLowerCase() === trimmedPratipaksha.toLowerCase()) {
    return {
      isValid: false,
      feedback:
        'Yoga Sutra 2.33 requires actively cultivating the opposite wholesome attitude (Pratipaksha), rather than repeating the compulsive impulse.',
      resultingGuna: 'Rajas',
    };
  }

  return {
    isValid: true,
    feedback:
      'Yoga Sutra 2.33 (Vitarka-bādhane pratipakṣa-bhāvanam): By consciously evoking the opposing wholesome understanding, the mental agitation is pacified and Sattvic clarity is restored.',
    resultingGuna: 'Sattva',
  };
}
