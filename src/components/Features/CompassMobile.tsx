import React, { useState } from 'react';
import { useBrahmaPath } from '../../context/BrahmaPathContext';
import { BhavaCardData } from '../../types/iks';
import { Compass, ChevronDown } from 'lucide-react';

export interface CompassMobileProps {
  className?: string;
}

/**
 * 8 Bhava Compass cards covering student psychological friction and positive emotional buffers
 * rooted in Patanjali's Chitta Prasadanam framework (Yoga Sutra 1.33).
 */
export const BHAVA_CARDS: BhavaCardData[] = [
  {
    id: 'burnout-effortless',
    title: 'Academic Burnout seeing others succeed effortlessly',
    sanskritTrait: 'Muditā (मुदिता)',
    isPositive: false,
    explanationText:
      'When we compare our chapter 1 to someone else’s chapter 10, our mind contracts. Cultivate Mudita.',
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
      'Feeling fraudulent or isolated is a universal student experience; counter self-criticism with Karuna.',
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
    id: 'peer-distress',
    title: 'Witnessing a Peer’s Distress',
    sanskritTrait: 'Karuṇā (करुणा)',
    isPositive: false,
    explanationText:
      'Observing classmates breaking under pressure demands compassionate presence rather than detached analysis.',
    actionSteps: [
      'Offer active, quiet listening without hasty problem-solving.',
      'Share a grounding moment away from study stress.',
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
  {
    id: 'friend-milestone',
    title: 'Celebrating a Friend’s Milestone',
    sanskritTrait: 'Maitrī (मैत्री)',
    isPositive: true,
    appreciationMessage:
      'Genuinely rejoicing in a peer’s happiness acts as a radiant buffer for your own mental clarity.',
  },
  {
    id: 'shared-gratitude',
    title: 'Deep Gratitude for Shared Collaboration',
    sanskritTrait: 'Maitrī (मैत्री)',
    isPositive: true,
    appreciationMessage:
      'Expressing heartfelt gratitude for peer support cultivates enduring Sattva and emotional resilience.',
  },
];

/**
 * Mobile-first Bhava Compass (Yoga Sutra 1.33 Chitta Prasadanam).
 * Renders an accordion shell to explore the 8 Bhava cards with smooth transitions.
 */
export const CompassMobile: React.FC<CompassMobileProps> = ({ className = '' }) => {
  const { openShastraLens } = useBrahmaPath();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
      }}
      className={`p-5 sm:p-6 rounded-3xl border shadow-xs overflow-y-auto pb-12 space-y-6 ${className}`}
    >
      {/* Header with Title and Shastra Lens Trigger */}
      <div className="flex items-center justify-between border-b border-slate-200/90 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-700 animate-spin-slow" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Bhāva Compass (Chitta Prasādanam)
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Yoga Sutra 1.33: Restore inner serenity through the four classical attitudes
          </p>
        </div>

        {openShastraLens && (
          <button
            type="button"
            onClick={() => openShastraLens('chitta_prasadanam')}
            style={{ color: '#065F46' }}
            className="text-xs font-semibold hover:underline cursor-pointer flex-shrink-0 ml-2 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg border border-emerald-200 transition"
          >
            [YS 1.33 Lens]
          </button>
        )}
      </div>

      {/* Accordion List for the 8 BHAVA_CARDS */}
      <div className="space-y-3">
        {BHAVA_CARDS.map((card) => {
          const isExpanded = expandedId === card.id;

          return (
            <div
              key={card.id}
              className={`rounded-2xl border transition-all duration-300 shadow-2xs ${
                isExpanded
                  ? 'border-emerald-600/40 bg-emerald-50/20 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {/* Accordion Card Header / Toggle Button */}
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : card.id)}
                className="w-full flex items-center justify-between p-4 text-left cursor-pointer focus:outline-none"
                aria-expanded={isExpanded}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5 pr-2">
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {card.title}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
                    {card.sanskritTrait}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      card.isPositive
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-orange-50 text-terracotta border border-orange-200/60'
                    }`}
                  >
                    {card.isPositive ? 'Positive Buffer' : 'Friction Antidote'}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-500 ease-in-out ${
                      isExpanded ? 'rotate-180 text-emerald-700' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Accordion Content Shell with Smooth Max-Height Animation */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-4 pt-1 border-t border-slate-100/80">
                  {/* Content shell placeholder - ready for data population */}
                  <div className="text-xs text-slate-400 italic">
                    Card content shell ready for data rendering...
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompassMobile;
