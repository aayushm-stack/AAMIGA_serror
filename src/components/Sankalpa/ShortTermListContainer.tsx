import React from 'react';
import { CheckCircle2, Circle, Zap, Clock, Sparkles } from 'lucide-react';
import { SankalpaItem } from './types';

export interface ShortTermListContainerProps {
  items?: SankalpaItem[];
  onToggleItem?: (id: string) => void;
  className?: string;
}

const DEFAULT_SHORT_TERM_SANKALPAS: SankalpaItem[] = [
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
];

/**
 * ShortTermListContainer: Prioritizes primary indicators for F-pattern scanning,
 * ensuring high-frequency daily tasks are visible within the first 3 seconds of viewing.
 */
export const ShortTermListContainer: React.FC<ShortTermListContainerProps> = ({
  items = DEFAULT_SHORT_TERM_SANKALPAS,
  onToggleItem,
  className = '',
}) => {
  return (
    <section
      aria-label="Immediate Intentions"
      className={`space-y-3 ${className}`}
    >
      {/* Distinct Typography Heading: Immediate Intentions */}
      <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
          <div>
            <h2 className="font-serif text-lg font-bold text-charcoal tracking-wide">
              Immediate Intentions
            </h2>
            <p className="text-[10px] uppercase tracking-wider text-charcoal/50">
              High-Frequency Daily Resolves • F-Pattern Scanning
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-orange-100/70 text-terracotta border border-orange-200/60 shadow-2xs">
          <Sparkles className="w-3 h-3" />
          <span>Present-Tense</span>
        </span>
      </div>

      {/* Vertical List optimized for F-pattern left-to-right eye tracking */}
      <div className="space-y-2.5">
        {items.map((item) => {
          const isDone = Boolean(item.completed);

          return (
            <div
              key={item.id}
              onClick={() => onToggleItem?.(item.id)}
              className={`p-3.5 rounded-xl border transition-all duration-150 flex items-start gap-3 bg-white/90 shadow-2xs hover:shadow-xs cursor-pointer ${
                isDone
                  ? 'border-sage/40 bg-sage/[0.03]'
                  : 'border-[#E2E8F0] hover:border-terracotta/40'
              }`}
            >
              {/* Primary Visual Indicator: Left Anchor for F-Pattern eye-fixation */}
              <button
                type="button"
                aria-label={isDone ? 'Mark intention incomplete' : 'Mark intention complete'}
                className="mt-0.5 flex-shrink-0 text-charcoal/60 hover:text-terracotta transition-colors focus:outline-none"
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-sage fill-sage/10" />
                ) : (
                  <Circle className="w-5 h-5 text-charcoal/40 hover:text-terracotta" />
                )}
              </button>

              {/* Statement & Tag */}
              <div className="flex-1 min-w-0 space-y-1">
                <p
                  className={`text-sm leading-snug font-medium transition-all ${
                    isDone
                      ? 'text-charcoal/50 line-through decoration-charcoal/30'
                      : 'text-charcoal'
                  }`}
                >
                  {item.statement}
                </p>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-terracotta bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200/50">
                    <Clock className="w-2.5 h-2.5" />
                    {item.timeframeTag}
                  </span>

                  <span className="text-[10px] text-charcoal/40 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Action pulse indicator */}
              <div className="flex-shrink-0 mt-1">
                <Zap
                  className={`w-3.5 h-3.5 ${
                    isDone ? 'text-sage/60' : 'text-amber-500'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ShortTermListContainer;
