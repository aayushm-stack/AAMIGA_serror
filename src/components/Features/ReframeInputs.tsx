import React, { useState } from 'react';
import { Check } from 'lucide-react';

export const SHREYAS_MICRO_SWAPS = [
  '💦 Jala (Cold Water Reset)',
  '🙈 Pratyahara (Palming eyes, 60s dark)',
  '🌬️ Pranayama (Extended Exhale/Rechaka)',
  '⏳ Urge Surfing (10-minute timer)',
  '🖐️ Pattern Interrupt (5-4-3-2-1 Grounding)',
  '📚 Tapas (Lock phone, open book)',
] as const;

export type ShreyasMicroSwap = (typeof SHREYAS_MICRO_SWAPS)[number];

export interface ReframeInputsProps {
  /** Optional controlled vitarka text */
  vitarkaText?: string;
  /** Callback fired when vitarka text updates */
  onVitarkaChange?: (value: string) => void;

  /** Optional controlled pratipaksha text */
  pratipakshaText?: string;
  /** Callback fired when pratipaksha text updates */
  onPratipakshaChange?: (value: string) => void;

  /** Optional selected micro-swap */
  selectedSwap?: string | null;
  /** Callback fired when a micro-swap is selected */
  onSelectSwap?: (swap: string) => void;

  className?: string;
}

/**
 * Mobile-first Pratipaksha Bhavana input & action section (Patanjali Yoga Sutra 2.33).
 *
 * Features:
 * - Empty-by-default textareas with exact ghost text guidance
 * - 2-column mobile grid for Shreyas Micro-Swap Actions
 * - Distinct, clean active highlighting for selected action
 */
export const ReframeInputs: React.FC<ReframeInputsProps> = ({
  vitarkaText: controlledVitarka,
  onVitarkaChange,
  pratipakshaText: controlledPratipaksha,
  onPratipakshaChange,
  selectedSwap: controlledSwap,
  onSelectSwap,
  className = '',
}) => {
  // Internal state fallback for uncontrolled usage (empty by default)
  const [internalVitarka, setInternalVitarka] = useState<string>('');
  const [internalPratipaksha, setInternalPratipaksha] = useState<string>('');
  const [internalSwap, setInternalSwap] = useState<string | null>(null);

  const vitarka = controlledVitarka !== undefined ? controlledVitarka : internalVitarka;
  const pratipaksha = controlledPratipaksha !== undefined ? controlledPratipaksha : internalPratipaksha;
  const activeSwap = controlledSwap !== undefined ? controlledSwap : internalSwap;

  const handleVitarkaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (onVitarkaChange) {
      onVitarkaChange(val);
    } else {
      setInternalVitarka(val);
    }
  };

  const handlePratipakshaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (onPratipakshaChange) {
      onPratipakshaChange(val);
    } else {
      setInternalPratipaksha(val);
    }
  };

  const handleSwapClick = (swap: string) => {
    if (onSelectSwap) {
      onSelectSwap(swap);
    } else {
      setInternalSwap(swap);
    }
  };

  return (
    <div className={`w-full space-y-5 ${className}`}>
      {/* 1. Vitarka Input Box */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="vitarka-textarea"
            className="text-xs font-bold text-slate-800 uppercase tracking-wider block"
          >
            Vitarka (The Unwholesome Impulsive Narrative)
          </label>
          <span className="text-[10px] text-slate-400 font-medium">YS 2.33</span>
        </div>
        <textarea
          id="vitarka-textarea"
          rows={3}
          value={vitarka}
          onChange={handleVitarkaChange}
          placeholder="e.g., I feel like scrolling reels for 5 minutes because I am dreading this assignment..."
          className="w-full p-3.5 border border-slate-300 rounded-xl bg-white text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 leading-relaxed resize-none transition shadow-2xs"
        />
      </div>

      {/* 2. Pratipaksha Input Box */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="pratipaksha-textarea"
            className="text-xs font-bold text-slate-800 uppercase tracking-wider block"
          >
            Pratipaksha (The Wholesome Counter-Reframe)
          </label>
          <span className="text-[10px] text-slate-400 font-medium">Cognitive Antidote</span>
        </div>
        <textarea
          id="pratipaksha-textarea"
          rows={3}
          value={pratipaksha}
          onChange={handlePratipakshaChange}
          placeholder="e.g., Scrolling will only make me more tired. Protecting my focus now will give me true free time tonight."
          className="w-full p-3.5 border border-slate-300 rounded-xl bg-white text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 leading-relaxed resize-none transition shadow-2xs"
        />
      </div>

      {/* 3. Shreyas Micro-Swap Actions Grid (2 Columns on Mobile) */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
            Shreyas Micro-Swap Actions
          </h4>
          <span className="text-[10px] text-slate-400 font-medium">Choose 1 Action</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {SHREYAS_MICRO_SWAPS.map((swap) => {
            const isSelected = activeSwap === swap;

            return (
              <button
                key={swap}
                type="button"
                onClick={() => handleSwapClick(swap)}
                className={`p-3 rounded-xl border text-left text-xs transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-[68px] relative ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/80 text-orange-950 font-semibold ring-2 ring-orange-500/30 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between w-full gap-1.5">
                  <span className="leading-snug pr-4">{swap}</span>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReframeInputs;
