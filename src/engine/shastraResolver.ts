import { ShastraFeatureKey, ShastraLensData } from '../types/iks';

/**
 * Authentic, canonical Indian Knowledge Systems (IKS) database backing the Shastra Lens drawer.
 * Grounded in classical primary texts and accredited traditional commentaries:
 * - Charaka Samhita (Chakrapani Datta commentary)
 * - Bhagavad Gita & Katha Upanishad (Adi Shankaracharya Bhashya)
 * - Patanjali Yoga Sutras (Vyasa Bhashya)
 * - Taittiriya Upanishad
 */
export const FALLBACK_SHASTRA_DATABASE: Record<ShastraFeatureKey, ShastraLensData> = {
  trayopastambha: {
    id: 'shastra-trayopastambha',
    featureKey: 'trayopastambha',
    sanskritVerse: 'त्रय उपस्तम्भा इति—आहारः, स्वप्नो, ब्रह्मचर्यं च ।',
    transliteration: 'traya upastambhā iti—āhāraḥ, svapno, brahmacaryaṁ ca |',
    sourceText: 'Charaka Samhita, Sutrasthana 11.35',
    commentaryReference: 'Chakrapani Datta, Ayurveda Dipika on Charaka Sutrasthana 11.35',
    literalMeaning:
      'There are three foundational subsidiary pillars (Trayopastambha) of life: Ahara (intake), Nidra (sleep), and Brahmacharya (restraint/energy conservation). Just as a building is supported by its pillars, physical and mental stability is sustained by what we consume, how deeply we rest, and how effectively we conserve our vital energy.',
    practicalModernApplication:
      'This is why the Daily Sadhana check-in tracks screen time right next to food and sleep. Just like junk food crashes the body, junk digital content crashes the mind. This feature trains you to treat your digital attention with the exact same care as your physical diet.',
  },
  interceptor: {
    id: 'shastra-interceptor',
    featureKey: 'interceptor',
    sanskritVerse:
      'वितर्कबाधने प्रतिपक्षभावनम् ॥\nध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते । सङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते ॥',
    transliteration:
      'vitarka-bādhane pratipakṣa-bhāvanam ||\ndhyāyato viṣayān puṁsaḥ saṅgas teṣūpajāyate | saṅgāt sañjāyate kāmaḥ kāmāt krodho \'bhijāyate ||',
    sourceText: 'Yoga Sutra 2.33 & Bhagavad Gita 2.62-63',
    commentaryReference: 'Vyasa Bhashya on YS 2.33 & Shankara Bhashya on Gita 2.62',
    literalMeaning:
      'When unwholesome impulses (Vitarka) disturb the mind, actively cultivate the opposing wholesome contemplation (Pratipaksha). Dwelling upon sense-objects engenders attachment; from attachment springs intense craving, and thwarted craving gives rise to agitation.',
    practicalModernApplication:
      'Powers the 90-second Pause Gate: intercepts compulsive dopamine scrolling loops before they cascade from subtle dwelling (Dhyāna) into loss of working memory and executive collapse (Buddhi-nāśa).',
  },
  breathing: {
    id: 'shastra-breathing',
    featureKey: 'breathing',
    sanskritVerse: 'तस्माद्वा एतस्मादन्नरसमयात् । अन्योऽन्तर आत्मा प्राणमयः । तेनैष पूर्णः ॥',
    transliteration:
      'tasmād vā etasmād anna-rasamayāt | anyo\'ntara ātmā prāṇamayaḥ | tenaiṣa pūrṇaḥ ||',
    sourceText: 'Taittiriya Upanishad, Brahmananda Valli 2.2',
    commentaryReference: 'Shankara Bhashya on Taittiriya Upanishad 2.2 & Yoga Sutra 2.49',
    literalMeaning:
      'Verily, distinct from this physical body made of food-essence (Annamaya) is another inner sheath consisting of vital breath and prana (Pranamaya), by which the physical body is completely pervaded and enlivened.',
    practicalModernApplication:
      'Acts as the foundation for the Breathing Sanctum: pacing conscious exhalations (Rechaka) and retentions (Kumbhaka) regulates autonomic nervous tone, soothing sympathetic digital overdrive.',
  },
  chitta_prasadanam: {
    id: 'shastra-chitta_prasadanam',
    featureKey: 'chitta_prasadanam',
    sanskritVerse:
      'मैत्रीकरुणामुदितोपेक्षाणां सुखदुःखपुण्यापुण्यविषयाणां भावनातश्चित्तप्रसादनम् ॥',
    transliteration:
      'maitrī-karuṇā-muditopekṣāṇāṁ sukha-duḥkha-puṇyāpuṇya-viṣayāṇāṁ bhāvanātaś citta-prasādanam ||',
    sourceText: 'Yoga Sutra 1.33',
    commentaryReference: 'Vyasa Bhashya on Patanjali Yoga Sutra 1.33',
    literalMeaning:
      'By cultivating friendliness (Maitri) toward the happy, compassion (Karuna) toward the suffering, sympathetic joy (Mudita) toward the virtuous, and equanimity (Upeksha) toward the unvirtuous/toxic, the consciousness attains profound serenity.',
    practicalModernApplication:
      'The Bhava Compass engine: transforms peer comparison into Mudita, converts resentment into serene detachment (Upeksha), and safeguards students from reactive online outrage.',
  },
  gunas: {
    id: 'shastra-gunas',
    featureKey: 'gunas',
    sanskritVerse:
      'सत्त्वं रजस्तम इति गुणाः प्रकृतिसम्भवाः । निबध्नन्ति महाबाहो देहे देहिनमव्ययम् ॥\nब्रह्मचर्यप्रतिष्ठायां वीर्यलाभः ॥',
    transliteration:
      'sattvaṁ rajas tama iti guṇāḥ prakṛti-sambhavāḥ | nibadhnanti mahā-bāho dehe dehinam avyayam ||\nbrahmacarya-pratiṣṭhāyāṁ vīrya-lābhaḥ ||',
    sourceText: 'Bhagavad Gita 14.5-18 & Yoga Sutra 2.38',
    commentaryReference: 'Shankara Bhashya on Gita 14.5 & Vyasa Bhashya on YS 2.38',
    literalMeaning:
      'Sattva (clarity/light), Rajas (passion/agitation), and Tamas (inertia/dullness)—these three qualities born of material nature condition the embodied self. Upon the firm establishment of regulated conduct (Brahmacharya), unshakeable cognitive vitality and vigor (Virya) is attained.',
    practicalModernApplication:
      'Daily Guna monitoring and analytics: empowers students to self-diagnose mental states (distracted Rajas, lethargic Tamas, or focused Sattva) and consciously align their daily rhythms.',
  },
  chariot: {
    id: 'shastra-chariot',
    featureKey: 'chariot',
    sanskritVerse:
      'आत्मानं रथिनं विद्धि शरीरं रथमेव तु । बुद्धिं तु सारथिं विद्धि मनः प्रग्रहमेव च ॥\nइन्द्रियाणि हयानाहुर्विषयांस्तेषु गोचरान् ॥',
    transliteration:
      'ātmānaṁ rathinaṁ viddhi śarīraṁ rathameva tu | buddhiṁ tu sārathiṁ viddhi manaḥ pragrahameva ca ||\nindriyāṇi hayān āhur viṣayāṁs teṣu gocarān ||',
    sourceText: 'Katha Upanishad 1.3.3-4',
    commentaryReference: 'Shankara Bhashya on Katha Upanishad 1.3.3-4',
    literalMeaning:
      'Know the Atman (Self) as the rider of the chariot, and the body as the chariot itself. Know the intellect (Buddhi) as the charioteer, and the mind (Manas) as the reins. The senses (Indriyas) are the galloping horses, and the sensory objects (Vishayas) are the roads over which they range.',
    practicalModernApplication:
      'The central dashboard visual metaphor: visualizes the student’s daily discipline through the chariot’s composure, showing whether the horses (senses) are in Calm harmony, Brisk engagement, or Galloping unchecked.',
  },
};

/**
 * Resolves Shastra Lens scriptural data for any given feature module.
 * Checks external JSON database first, gracefully falling back to the immutable canonical database.
 */
export function resolveShastraLens(
  featureKey: ShastraFeatureKey,
  externalList?: ShastraLensData[]
): ShastraLensData {
  if (externalList && externalList.length > 0) {
    const found = externalList.find((item) => item.featureKey === featureKey);
    if (found) {
      return found;
    }
  }
  return FALLBACK_SHASTRA_DATABASE[featureKey];
}
