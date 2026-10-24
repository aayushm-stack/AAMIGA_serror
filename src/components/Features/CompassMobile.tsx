import React, { useState } from 'react';
import { useBrahmaPath } from '../../context/BrahmaPathContext';
import { BhavaCardData } from '../../types/iks';
import { Compass, ChevronDown, CheckCircle2, Sparkles } from 'lucide-react';

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
 * Interactive accordion of 8 Bhava cards with positive appreciation buffers
 * and resolvable negative friction antidotes.
 */
export const CompassMobile: React.FC<CompassMobileProps> = ({ className = '' }) => {
  const { openShastraLens, logInterception } = useBrahmaPath();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [resolvedMap, setResolvedMap] = useState<Record<string, boolean>>({});

  // Handler to toggle resolution state and sync with the BrahmaPath engine
  const handleResolve = (card: BhavaCardData) => {
    const isCurrentlyResolved = resolvedMap[card.id] ?? card.isResolved ?? false;
    const nextState = !isCurrentlyResolved;

    setResolvedMap((prev) => ({
      ...prev,
      [card.id]: nextState,
    }));
    card.isResolved = nextState;

    if (nextState && logInterception) {
      logInterception({
        triggerCategory: 'Academic_Anxiety',
        cascadeStageReached: 'Dhyana_Dwelling',
        initialGuna: 'Rajas',
        vitarkaText: card.title,
        pratipakshaText:
          card.actionSteps?.join('; ') ||
          'Cultivated Chitta Prasadanam equanimity and resolved interpersonal friction.',
        microSwapAction:
          card.actionSteps?.[0] || 'Conscious deep exhalation and mindful pause.',
        resolvedGunaState: 'Sattva',
        interactionType: 'resolved_negative_friction',
        isResolved: true,
        isPositive: false,
      });
    }
  };

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
          const isCardResolved = resolvedMap[card.id] ?? card.isResolved ?? false;

          return (
            <div
              key={card.id}
              className={`rounded-2xl border transition-all duration-300 shadow-2xs ${
                isExpanded
                  ? card.isPositive
                    ? 'border-green-300 bg-green-50/20 shadow-xs'
                    : 'border-orange-300 bg-orange-50/20 shadow-xs'
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
                  {/* Badge: Green for positive, Terracotta for negative */}
                  <span
                    className={`text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-bold ${
                      card.isPositive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {card.isPositive ? 'Positive Buffer' : 'Negative Friction'}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-500 ease-in-out ${
                      isExpanded
                        ? card.isPositive
                          ? 'rotate-180 text-green-700'
                          : 'rotate-180 text-orange-700'
                        : ''
                    }`}
                  />
                </div>
              </button>

              {/* Accordion Content Shell with Smooth Max-Height Animation */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isExpanded ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-4 pt-1 border-t border-slate-100/90">
                  {/* POSITIVE CARD: Appreciation message in a soft green box (no button) */}
                  {card.isPositive && card.appreciationMessage && (
                    <div className="bg-green-50/90 border border-green-200/90 rounded-2xl p-4 sm:p-5 text-green-900 shadow-2xs space-y-2">
                      <div className="flex items-center gap-2 text-green-800 font-bold text-xs uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-green-600" />
                        <span>Appreciation & Inner Serenity</span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed text-green-800 font-serif italic">
                        &ldquo;{card.appreciationMessage}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* NEGATIVE CARD: Explanation, Action Steps, and [ ✓ Mark as Resolved ] button */}
                  {!card.isPositive && (
                    <div className="space-y-4 pt-1">
                      {/* Explanation of what they are experiencing */}
                      {card.explanationText && (
                        <div className="space-y-1.5">
                          <h4 className="text-[11px] uppercase tracking-wider font-bold text-slate-500">
                            What you are experiencing:
                          </h4>
                          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                            {card.explanationText}
                          </div>
                        </div>
                      )}

                      {/* Action Steps Bulleted List */}
                      {card.actionSteps && card.actionSteps.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-[11px] uppercase tracking-wider font-bold text-slate-500">
                            Actionable Antidotes (YS 1.33):
                          </h4>
                          <ul className="space-y-2">
                            {card.actionSteps.map((step, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-white border border-slate-200/90 rounded-xl p-3 shadow-2xs"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32] mt-1.5 flex-shrink-0" />
                                <span className="leading-relaxed">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Bottom Full-Width Terracotta Button */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResolve(card);
                          }}
                          className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] ${
                            isCardResolved
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500 ring-2 ring-emerald-500/20'
                              : 'bg-[#C85A32] hover:bg-[#B24D28] text-white'
                          }`}
                        >
                          <CheckCircle2
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isCardResolved ? 'scale-110 text-white' : 'text-white/90'
                            }`}
                          />
                          <span>
                            {isCardResolved ? 'Intellect Cleared' : '✓ Mark as Resolved'}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
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
