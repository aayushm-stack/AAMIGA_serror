import { BhavaEmotion, BhavaPrescription, BhavaCardData } from '../types/iks';

/**
 * Patanjali's Chitta Prasadanam framework (Yoga Sutra 1.33):
 * maitrī-karuṇā-muditopekṣāṇāṁ sukha-duḥkha-puṇyāpuṇya-viṣayāṇāṁ bhāvanātaś citta-prasādanam ||
 *
 * Mapping interpersonal emotional perturbations directly to serene counter-attitudes:
 * - Happy (Sukha) -> Friendliness (Maitri)
 * - Suffering (Duhkha) -> Compassion (Karuna, including self-compassion)
 * - Virtuous / Successful (Punya) -> Sympathetic Joy (Mudita)
 * - Hostile / Harmful (Apunya) -> Equanimity / Neutrality (Upeksha)
 *
 * Expanded with deep, humanized resolutions addressing modern student psychology:
 * - "Imposter Syndrome / Feeling Left Out" -> Karuna (Self-Compassion)
 * - "Academic Burnout seeing others succeed effortlessly" -> Mudita (Sympathetic Joy)
 * - "Dealing with a toxic project partner" -> Upeksha (Equanimity)
 */

const IMPOSTER_PRESCRIPTION: BhavaPrescription = {
  emotion: 'Imposter Syndrome / Feeling Left Out',
  recommendedAttitude: 'Karuna_Compassion',
  sanskritSutra: 'duḥkheṣu karuṇā-bhāvanā (दुःखेषु करुणा-भावना - YS 1.33)',
  cognitivePrompt:
    "When you feel like an imposter or that everyone else has their life sorted out while you flounder, your inner student is suffering. Cultivate Karuna. You do not need to be flawless, finished, or extraordinary to belong in this room. Offer yourself the exact same gentle warmth and patience you would offer to a beloved friend in tears.",
  actionableStep:
    'Rest a gentle hand over your heart. Breathe in kindness for yourself, and breathe out the exhausting pressure to prove your worth to anyone.',
  targetGunaShift: 'Sattva',
};

const BURNOUT_PRESCRIPTION: BhavaPrescription = {
  emotion: 'Academic Burnout seeing others succeed effortlessly',
  recommendedAttitude: 'Mudita_SympatheticJoy',
  sanskritSutra: 'puṇyeṣu muditā-bhāvanā (पुण्येषु मुदिता-भावना - YS 1.33)',
  cognitivePrompt:
    "When we compare our chapter 1 to someone else's chapter 10, our mind contracts. Cultivate Mudita. Silently wish them well, and watch your own mental burden disappear.",
  actionableStep:
    'Notice how effortless external appearances can be deceptive. Silently wish them well: "May your hard work bear fruit." Then gently bring your focus back to your own single breath and single step.',
  targetGunaShift: 'Sattva',
};

const TOXIC_PARTNER_PRESCRIPTION: BhavaPrescription = {
  emotion: 'Dealing with a toxic project partner',
  recommendedAttitude: 'Upeksha_Equanimity',
  sanskritSutra: 'apuṇyeṣu upekṣā-bhāvanā (अपुण्येषु उपेक्षा-भावना - YS 1.33)',
  cognitivePrompt:
    "When a project partner brings passive aggression, blame, or uncooperative chaos, retaliating only invites their turbulence into your own nervous system. Practice Upekṣā: detached equanimity that protects your peace while keeping your boundaries clear, dignified, and firm.",
  actionableStep:
    'Document facts objectively without emotional debate. Do not absorb their turbulence as personal commentary. Preserve your vital prāṇa for the work that is genuinely in your control.',
  targetGunaShift: 'Sattva',
};

export const BHAVA_COMPASS_MAP: Record<BhavaEmotion, BhavaPrescription> = {
  // --- Modern Student Psychology Triggers ---
  'Imposter Syndrome / Feeling Left Out': IMPOSTER_PRESCRIPTION,
  Imposter_Syndrome: {
    ...IMPOSTER_PRESCRIPTION,
    emotion: 'Imposter_Syndrome',
  },

  'Academic Burnout seeing others succeed effortlessly': BURNOUT_PRESCRIPTION,
  Academic_Burnout: {
    ...BURNOUT_PRESCRIPTION,
    emotion: 'Academic_Burnout',
  },

  'Dealing with a toxic project partner': TOXIC_PARTNER_PRESCRIPTION,
  Toxic_Partner: {
    ...TOXIC_PARTNER_PRESCRIPTION,
    emotion: 'Toxic_Partner',
  },

  // --- Classical Chitta Prasadanam Triggers ---
  Peer_Envy: {
    emotion: 'Peer_Envy',
    recommendedAttitude: 'Mudita_SympatheticJoy',
    sanskritSutra: 'puṇyeṣu muditā-bhāvanā (पुण्येषु मुदिता-भावना - YS 1.33)',
    cognitivePrompt:
      'When witnessing a peer’s placement, accolade, or skill, envy contracts consciousness into scarcity. Reframe their win as proof that excellence is possible. When you celebrate another, their light elevates the whole room.',
    actionableStep:
      'Silently wish them continued growth and flourishing. Identify one inspirational takeaway for your own focused swadharma.',
    targetGunaShift: 'Sattva',
  },

  Other_Suffering: {
    emotion: 'Other_Suffering',
    recommendedAttitude: 'Karuna_Compassion',
    sanskritSutra: 'duḥkheṣu karuṇā-bhāvanā (दुःखेषु करुणा-भावना - YS 1.33)',
    cognitivePrompt:
      'When encountering a classmate or friend in distress, exhaustion, or vulnerability, resist superiority, contempt, or emotional numbness. Ground yourself in selfless empathy.',
    actionableStep:
      'Offer genuine presence or extend a small, concrete act of service (Loka-saṅgraha) without patronizing judgment or unsolicited lecturing.',
    targetGunaShift: 'Sattva',
  },

  Shared_Success: {
    emotion: 'Shared_Success',
    recommendedAttitude: 'Maitri_Friendliness',
    sanskritSutra: 'sukheṣu maitrī-bhāvanā (सुखेषु मैत्री-भावना - YS 1.33)',
    cognitivePrompt:
      'When surrounded by flourishing and collective joy, dissolve feelings of separation and competition through open-hearted camaraderie.',
    actionableStep:
      'Communicate sincere warmth, share in their happiness, and cultivate enduring goodwill without holding back.',
    targetGunaShift: 'Sattva',
  },

  Toxic_Hostility: {
    emotion: 'Toxic_Hostility',
    recommendedAttitude: 'Upeksha_Equanimity',
    sanskritSutra: 'apuṇyeṣu upekṣā-bhāvanā (अपुण्येषु उपेक्षा-भावना - YS 1.33)',
    cognitivePrompt:
      'When targeted by bad-faith comments, online toxicity, or disruptive hostility, counter-rage burns your own cognitive reserves. Upekṣā is deliberate, majestic neutrality.',
    actionableStep:
      'Do not retaliate or feed the cycle. Withdraw attention entirely, preserve your inner composure, and let their agitation dissipate without an echo.',
    targetGunaShift: 'Sattva',
  },
};

/**
 * 8 Bhava Compass cards covering student psychological friction and positive emotional buffers
 * rooted in Patanjali's Chitta Prasadanam framework (Yoga Sutra 1.33).
 */
export const BHAVA_CARDS: BhavaCardData[] = [
  // --- Negative Friction Cards (Antidotes via YS 1.33) ---
  {
    id: 'burnout-effortless',
    title: 'Academic Burnout seeing others succeed effortlessly',
    sanskritTrait: 'Muditā (मुदिता)',
    isPositive: false,
    explanationText:
      'When we compare our chapter 1 to someone else’s chapter 10, our mind contracts into exhausting scarcity. Cultivate Mudita.',
    actionSteps: [
      'Silently wish them well, and watch your own mental burden disappear.',
      'Refocus attention onto your immediate Swadharma.',
    ],
    isResolved: false,
  },
  {
    id: 'imposter-syndrome',
    title: 'Imposter Syndrome / Feeling Left Out',
    sanskritTrait: 'Karuṇā (करुणा)',
    isPositive: false,
    explanationText:
      'Feeling fraudulent or left behind creates intense self-directed hostility; counter self-criticism with Karuna.',
    actionSteps: [
      'Recognize that peers experience identical self-doubt in silence.',
      'Apply gentle, non-judgmental kindness to your current learning stage.',
    ],
    isResolved: false,
  },
  {
    id: 'toxic-partner',
    title: 'Dealing with a toxic project partner',
    sanskritTrait: 'Upekṣā (उपेक्षा)',
    isPositive: false,
    explanationText:
      'Passive-aggressive friction or slackers drain mental bandwidth; practice serene Upeksha.',
    actionSteps: [
      'Establish firm, objective task boundaries without reactive hostility.',
      'Conserve your cognitive virya by refusing to absorb their chaotic energy.',
    ],
    isResolved: false,
  },
  {
    id: 'peer-envy',
    title: 'Peer Envy / Placement Jealousy',
    sanskritTrait: 'Muditā (मुदिता)',
    isPositive: false,
    explanationText:
      'Resentment at peer accolades contracts the intellect; celebrate virtue to expand the heart.',
    actionSteps: [
      'Acknowledge the effort behind their milestone.',
      'Remind yourself that another’s accomplishment never diminishes your potential.',
    ],
    isResolved: false,
  },
  {
    id: 'hostility-online',
    title: 'Hostility & Online Flame',
    sanskritTrait: 'Upekṣā (उपेक्षा)',
    isPositive: false,
    explanationText:
      'Malicious remarks and flame wars hook the ego; practice majestic neutrality and non-engagement.',
    actionSteps: [
      'Step away from the screen immediately.',
      'Take 5 deep exhalations and leave the unvirtuous comment unaddressed.',
    ],
    isResolved: false,
  },

  // --- Positive Buffer Cards (Emotional Surplus via YS 1.33) ---
  {
    id: 'celebrating-shared-success',
    title: 'Celebrating a Shared Success & Team Win',
    sanskritTrait: 'Maitrī (Friendliness)',
    isPositive: true,
    appreciationMessage:
      "Your mind expands when you elevate others! Taking a moment to genuinely celebrate a team win or a friend's good news proves that you are operating from a place of abundance. Shared joy completely cancels out competitive burnout. Keep sharing that light!",
  },
  {
    id: 'inspired-hard-work',
    title: "Inspired by Someone's Hard Work",
    sanskritTrait: 'Muditā (Joy in Virtue)',
    isPositive: true,
    appreciationMessage:
      "Recognizing and admiring someone else's intense dedication or good character is a beautiful trait. It means your ego is quiet enough to let someone else shine without feeling threatened. Let their dedication fuel your own focus and study session today!",
  },
  {
    id: 'handling-setback-grace',
    title: 'Handling a Setback with Grace',
    sanskritTrait: 'Karuṇā (Self-Compassion)',
    isPositive: true,
    appreciationMessage:
      'You faced a bad grade, a rejected application, or a tough setback today—and instead of spiraling into self-hate, you chose resilience and self-forgiveness. That takes immense emotional maturity. Be proud of how you handled this; this is what true self-mastery looks like.',
  },
];

/**
 * Retrieves the specific Chitta Prasadanam psychological prescription for an emotional trigger.
 * Resilient to full student trigger phrasing and shorthand keys.
 */
export function getBhavaPrescription(emotion: BhavaEmotion | string): BhavaPrescription {
  if (emotion in BHAVA_COMPASS_MAP) {
    return BHAVA_COMPASS_MAP[emotion as BhavaEmotion];
  }

  if (typeof emotion === 'string') {
    const lower = emotion.toLowerCase();
    if (lower.includes('imposter') || lower.includes('left out')) {
      return BHAVA_COMPASS_MAP['Imposter Syndrome / Feeling Left Out'];
    }
    if (lower.includes('burnout') || lower.includes('effortless')) {
      return BHAVA_COMPASS_MAP['Academic Burnout seeing others succeed effortlessly'];
    }
    if (lower.includes('partner') || (lower.includes('toxic') && lower.includes('project'))) {
      return BHAVA_COMPASS_MAP['Dealing with a toxic project partner'];
    }
    if (lower.includes('hostil') || lower.includes('toxic')) {
      return BHAVA_COMPASS_MAP['Toxic_Hostility'];
    }
    if (lower.includes('envy') || lower.includes('jealous')) {
      return BHAVA_COMPASS_MAP['Peer_Envy'];
    }
    if (lower.includes('suffering') || lower.includes('distress')) {
      return BHAVA_COMPASS_MAP['Other_Suffering'];
    }
    if (lower.includes('shared') || lower.includes('friend')) {
      return BHAVA_COMPASS_MAP['Shared_Success'];
    }
  }

  return BHAVA_COMPASS_MAP['Academic Burnout seeing others succeed effortlessly'];
}
