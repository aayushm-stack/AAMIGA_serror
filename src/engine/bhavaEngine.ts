import { BhavaEmotion, BhavaPrescription } from '../types/iks';

/**
 * Patanjali's Chitta Prasadanam framework (Yoga Sutra 1.33):
 * maitrī-karuṇā-muditopekṣāṇāṁ sukha-duḥkha-puṇyāpuṇya-viṣayāṇāṁ bhāvanātaś citta-prasādanam ||
 *
 * Mapping interpersonal emotional triggers directly to serene counter-attitudes:
 * - Happy (Sukha) -> Friendliness (Maitri)
 * - Suffering (Duhkha) -> Compassion (Karuna)
 * - Virtuous / Successful (Punya) -> Sympathetic Joy (Mudita)
 * - Hostile / Harmful (Apunya) -> Equanimity / Neutrality (Upeksha)
 */
export const BHAVA_COMPASS_MAP: Record<BhavaEmotion, BhavaPrescription> = {
  Peer_Envy: {
    emotion: 'Peer_Envy',
    recommendedAttitude: 'Mudita_SympatheticJoy',
    sanskritSutra: 'puṇyeṣu muditā-bhāvanā (पुण्येषु मुदिता-भावना - YS 1.33)',
    cognitivePrompt:
      'When witnessing a peer’s placement, accolade, or skill, envy contracts consciousness. Reframe the lens: celebrate the dedication and virtue behind their milestone.',
    actionableStep:
      'Silently wish them continued growth and flourishing. Identify one inspirational takeaway for your own focused swadharma.',
    targetGunaShift: 'Sattva',
  },
  Other_Suffering: {
    emotion: 'Other_Suffering',
    recommendedAttitude: 'Karuna_Compassion',
    sanskritSutra: 'duḥkheṣu karuṇā-bhāvanā (दुःखेषु करुणा-भावना - YS 1.33)',
    cognitivePrompt:
      'When encountering another person’s distress or vulnerability, resist superiority, contempt, or emotional numbness. Ground yourself in selfless empathy.',
    actionableStep:
      'Offer genuine presence or extend a small, concrete act of service (Loka-saṅgraha) without patronizing judgment.',
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
 */
export function getBhavaPrescription(emotion: BhavaEmotion): BhavaPrescription {
  return BHAVA_COMPASS_MAP[emotion] ?? BHAVA_COMPASS_MAP.Peer_Envy;
}
