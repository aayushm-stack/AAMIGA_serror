import { BhavaEmotion, BhavaPrescription } from '../types/iks';

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
 * Expanded with deep empathy for modern student psychology (imposter feelings,
 * effortless peer success burnout, and toxic project partners).
 */

const IMPOSTER_PRESCRIPTION: BhavaPrescription = {
  emotion: 'Imposter_Syndrome',
  recommendedAttitude: 'Karuna_Compassion',
  sanskritSutra: 'duḥkheṣu karuṇā-bhāvanā (दुःखेषु करुणा-भावना - YS 1.33)',
  cognitivePrompt:
    "When you feel like an imposter or that everyone else has their life sorted out while you flounder, your inner student is suffering. Offer yourself Karuna (deep self-compassion). You don't need to be finished, flawless, or extraordinary to belong in this room.",
  actionableStep:
    'Rest a gentle hand over your heart. Take a slow, grounding breath and remind yourself: "I am learning at my own steady pace. My worth is inherent, not conditional on perfection."',
  targetGunaShift: 'Sattva',
};

const BURNOUT_PRESCRIPTION: BhavaPrescription = {
  emotion: 'Academic_Burnout',
  recommendedAttitude: 'Mudita_SympatheticJoy',
  sanskritSutra: 'puṇyeṣu muditā-bhāvanā (पुण्येषु मुदिता-भावना - YS 1.33)',
  cognitivePrompt:
    "When we compare our chapter 1 to someone else's chapter 10, our mind contracts. Cultivate Mudita. Silently wish them well, and watch your own mental burden disappear.",
  actionableStep:
    'Notice how effortless external appearances can be deceptive. Silently send them a wave of sincere goodwill: "May your hard work bear fruit." Then gently bring your focus back to your own next single breath and single step.',
  targetGunaShift: 'Sattva',
};

const TOXIC_PARTNER_PRESCRIPTION: BhavaPrescription = {
  emotion: 'Toxic_Partner',
  recommendedAttitude: 'Upeksha_Equanimity',
  sanskritSutra: 'apuṇyeṣu upekṣā-bhāvanā (अपुण्येषु उपेक्षा-भावना - YS 1.33)',
  cognitivePrompt:
    "When a project partner is uncooperative, critical, or passive-aggressive, retaliating absorbs their chaos into your own nervous system. Practice Upekṣā: detached equanimity that protects your energy while keeping your boundaries clear and dignified.",
  actionableStep:
    'Document facts objectively without emotional debate. Do not absorb their turbulence as personal commentary. Preserve your vital prāṇa for the work that is genuinely in your control.',
  targetGunaShift: 'Sattva',
};

export const BHAVA_COMPASS_MAP: Record<BhavaEmotion, BhavaPrescription> = {
  // --- Modern Student Psychology Triggers ---
  Imposter_Syndrome: IMPOSTER_PRESCRIPTION,
  'Imposter Syndrome / Feeling Left Out': {
    ...IMPOSTER_PRESCRIPTION,
    emotion: 'Imposter Syndrome / Feeling Left Out',
  },

  Academic_Burnout: BURNOUT_PRESCRIPTION,
  'Academic Burnout seeing others succeed effortlessly': {
    ...BURNOUT_PRESCRIPTION,
    emotion: 'Academic Burnout seeing others succeed effortlessly',
  },

  Toxic_Partner: TOXIC_PARTNER_PRESCRIPTION,
  'Dealing with a toxic project partner': {
    ...TOXIC_PARTNER_PRESCRIPTION,
    emotion: 'Dealing with a toxic project partner',
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
 * Retrieves the specific Chitta Prasadanam psychological prescription for an emotional trigger.
 * Resilient to key aliases and student stress phrasing.
 */
export function getBhavaPrescription(emotion: BhavaEmotion | string): BhavaPrescription {
  if (emotion in BHAVA_COMPASS_MAP) {
    return BHAVA_COMPASS_MAP[emotion as BhavaEmotion];
  }

  if (typeof emotion === 'string') {
    const lower = emotion.toLowerCase();
    if (lower.includes('imposter') || lower.includes('left out')) {
      return BHAVA_COMPASS_MAP['Imposter_Syndrome'];
    }
    if (lower.includes('burnout') || lower.includes('effortless')) {
      return BHAVA_COMPASS_MAP['Academic_Burnout'];
    }
    if (lower.includes('partner') || (lower.includes('toxic') && lower.includes('project'))) {
      return BHAVA_COMPASS_MAP['Toxic_Partner'];
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

  return BHAVA_COMPASS_MAP['Academic_Burnout'];
}
