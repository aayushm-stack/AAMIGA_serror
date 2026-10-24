import React from 'react';
import { Compass, ShieldCheck, Target, ArrowUpRight } from 'lucide-react';
import { SankalpaItem } from './types';

export interface LongTermListContainerProps {
  items?: SankalpaItem[];
  className?: string;
}

const DEFAULT_LONG_TERM_SANKALPAS: SankalpaItem[] = [
  {
    id: 'lt-1',
    statement: 'I embody calm mental equanimity (Samatvam) under academic exam pressures.',
    timeline: 'long_term',
    category: 'equanimity',
    timeframeTag: 'Semester Vision • YS 1.33',
  },
  {
    id: 'lt-2',
    statement: 'I master vital energy conservation (Virya) to achieve peak creative flow.',
    timeline: 'long_term',
    category: 'restraint',
    timeframeTag: 'Annual Dharma • Brahmacharya',
  },
  {
    id: 'lt-3',
    statement: 'I sustain full charioteer mastery with sensory horses aligned to my Buddhi.',
    timeline: 'long_term',
    category: 'dharma',
    timeframeTag: 'Lifelong Path • Katha Upanishad',
  },
];

/**
 * LongTermListContainer: Displays enduring, strategic Vedic horizon resolves
 * that guide the user's overarching life direction and sustained Dharmic focus.
 */
export const LongTermListContainer: React.FC<LongTermListContainerProps> = ({
  items = DEFAULT_LONG_TERM_SANKALPAS,
  className = '',
}) => {
  return (
    <section
      aria-label="Horizon Goals"
      className={`space-y-3 pt-2 ${className}`}
    >
      {/* Distinct Typography Heading: Horizon Goals */}
      <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sage" />
          <div>
            <h2 className="font-serif text-lg font-bold text-charcoal tracking-wide">
              Horizon Goals
            </h2>
            <p className="text-[10px] uppercase tracking-wider text-charcoal/50">
              Strategic Vision • Enduring Dharmic Trajectory
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-sage/10 text-sage border border-sage/20 shadow-2xs">
          <Compass className="w-3 h-3" />
          <span>Long-Term</span>
        </span>
      </div>

      {/* Vertical List of Strategic Horizon Resolves */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl border border-sage/20 bg-gradient-to-br from-white/95 to-emerald-50/20 shadow-2xs hover:shadow-xs transition-all space-y-2.5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-sage/10 text-sage flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Target className="w-4 h-4" />
                </div>
                <p className="text-sm font-serif italic text-charcoal/90 leading-relaxed font-medium">
                  “{item.statement}”
                </p>
              </div>

              <ArrowUpRight className="w-4 h-4 text-charcoal/30 flex-shrink-0 mt-1" />
            </div>

            {/* Metadata Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0]/70 text-[10px]">
              <span className="inline-flex items-center gap-1 font-semibold text-sage bg-sage/10 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3 h-3" />
                {item.timeframeTag}
              </span>

              <span className="text-charcoal/50 uppercase tracking-widest font-mono text-[9px]">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LongTermListContainer;
