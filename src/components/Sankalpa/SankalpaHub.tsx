import React, { useState } from 'react';
import { Target, Sparkles, Flame, HelpCircle } from 'lucide-react';
import { useAccount } from '../../context/AccountContext';
import { ShortTermListContainer } from './ShortTermListContainer';
import { LongTermListContainer } from './LongTermListContainer';
import { SankalpaItem } from './types';

export interface SankalpaHubProps {
  className?: string;
  onOpenShastraLens?: (key: 'chariot' | 'brahmacharya' | 'yukta') => void;
}

/**
 * SankalpaHub: Dedicated Viewport for the Vedic Goal Manager module.
 * Displays dynamic greeting subscribing to global userName state and
 * frames the user experience around specific, present-tense resolve.
 */
export const SankalpaHub: React.FC<SankalpaHubProps> = ({
  className = '',
  onOpenShastraLens,
}) => {
  // Directly subscribe to global account state
  const { userName } = useAccount();

  // Local state for interactive toggling of short-term intentions
  const [shortTermItems, setShortTermItems] = useState<SankalpaItem[]>([
    {
      id: 'st-1',
      statement: 'I study for 90 uninterrupted minutes before checking notifications.',
      timeline: 'short_term',
      category: 'focus',
      timeframeTag: 'Today • Ahara',
      completed: true,
    },
    {
      id: 'st-2',
      statement: 'I pause and breathe for 3 cycles whenever I reach for digital distraction.',
      timeline: 'short_term',
      category: 'restraint',
      timeframeTag: 'Active • Brahmacharya',
      completed: false,
    },
    {
      id: 'st-3',
      statement: 'I power down all screens by 10:30 PM to honor restorative sleep.',
      timeline: 'short_term',
      category: 'sleep',
      timeframeTag: 'Daily • Nidra',
      completed: false,
    },
  ]);

  const handleToggleShortTerm = (id: string) => {
    setShortTermItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const displayName = userName && userName.trim() ? userName.trim() : 'Sadhaka';

  return (
    <div
      style={{
        backgroundColor: '#FDFBF7',
        color: '#1E293B',
      }}
      className={`w-full min-h-full pb-10 space-y-5 ${className}`}
    >
      {/* ================= TOP VIEWPORT HEADER ================= */}
      <header className="space-y-3">
        {/* Dynamic Greeting directly subscribing to global userName */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-charcoal tracking-tight">
              Hello, {displayName}!
            </h1>
            <p className="text-xs text-charcoal/60 mt-0.5">
              Welcome to your sacred intention space.
            </p>
          </div>

          <div
            aria-label="Sankalpa Flame"
            className="w-10 h-10 rounded-2xl bg-orange-100/70 text-terracotta border border-orange-200/80 flex items-center justify-center shadow-xs"
          >
            <Flame className="w-5 h-5" />
          </div>
        </div>

        {/* Vedic Sankalpa Philosophical Anchor Card */}
        <div className="p-4 rounded-2xl bg-white/80 border border-[#E2E8F0] shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-terracotta bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200/50">
              <Target className="w-3 h-3" />
              <span>Vedic Sankalpa</span>
            </span>

            {onOpenShastraLens && (
              <button
                type="button"
                onClick={() => onOpenShastraLens('brahmacharya')}
                className="text-[11px] text-sage hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                <HelpCircle className="w-3 h-3" />
                <span>Shastra Insight</span>
              </button>
            )}
          </div>

          <p className="font-serif italic text-xs text-charcoal/80 leading-relaxed">
            “A Sankalpa is not a distant wish—it is a specific, present-tense resolve formulated by the intellect (Buddhi) to consciously steer the chariot of your mind.”
          </p>
        </div>
      </header>

      {/* ================= 1. SHORT-TERM CONTAINER (AT TOP OF VIEWPORT FOR F-PATTERN SCANNING) ================= */}
      <ShortTermListContainer
        items={shortTermItems}
        onToggleItem={handleToggleShortTerm}
      />

      {/* ================= 2. LONG-TERM CONTAINER (HORIZON GOALS) ================= */}
      <LongTermListContainer />
    </div>
  );
};

export default SankalpaHub;
