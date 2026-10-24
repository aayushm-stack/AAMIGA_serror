import React, { useState } from 'react';
import { useBrahmaPath } from '../../context/BrahmaPathContext';
import {
  estimateCascadeStage,
  GITA_CASCADE_STEPS,
} from '../../engine/cascadeEngine';
import {
  TRIGGER_REFRAME_TEMPLATES,
  validatePratipakshaReframe,
} from '../../engine/pratipakshaEngine';
import { TriggerCategory } from '../../types/iks';
import { ShieldAlert, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

export interface InterceptorMobileProps {
  className?: string;
}

const TRIGGER_CATEGORIES: TriggerCategory[] = [
  'Doomscrolling',
  'Academic_Anxiety',
  'Social_Comparison',
  'Lethargy',
  'Sensory_Craving',
];

/**
 * Mobile-first Pause Gate (Distraction Interceptor) component.
 * Implements the 7-step Gita 2.62-63 psychological descent state machine
 * and Pratipaksha Bhavana (YS 2.33) cognitive reframe validation.
 */
export const InterceptorMobile: React.FC<InterceptorMobileProps> = ({
  className = '',
}) => {
  const { logInterception, openShastraLens } = useBrahmaPath();

  // --- COMPONENT STATE ---
  const [selectedTrigger, setSelectedTrigger] =
    useState<TriggerCategory>('Doomscrolling');
  const [urgeIntensity, setUrgeIntensity] = useState<number>(3);
  const [vitarkaText, setVitarkaText] = useState<string>(
    TRIGGER_REFRAME_TEMPLATES.Doomscrolling.vitarkaExample
  );
  const [pratipakshaText, setPratipakshaText] = useState<string>(
    TRIGGER_REFRAME_TEMPLATES.Doomscrolling.suggestedReframe
  );
  const [selectedSwap, setSelectedSwap] = useState<string>(
    TRIGGER_REFRAME_TEMPLATES.Doomscrolling.defaultMicroSwaps[0]
  );
  const [gateFeedback, setGateFeedback] = useState<{
    text: string;
    isError?: boolean;
  } | null>(null);

  // Handle trigger change
  const handleTriggerSelect = (cat: TriggerCategory) => {
    setSelectedTrigger(cat);
    const tmpl = TRIGGER_REFRAME_TEMPLATES[cat];
    setVitarkaText(tmpl.vitarkaExample);
    setPratipakshaText(tmpl.suggestedReframe);
    setSelectedSwap(tmpl.defaultMicroSwaps[0]);
    setGateFeedback(null);
  };

  // Submit Pause Gate
  const handleCommitInterception = () => {
    const validation = validatePratipakshaReframe(vitarkaText, pratipakshaText);
    if (!validation.isValid) {
      setGateFeedback({ text: validation.feedback, isError: true });
      return;
    }

    const currentStageInfo = estimateCascadeStage(selectedTrigger, urgeIntensity);

    logInterception({
      triggerCategory: selectedTrigger,
      cascadeStageReached: currentStageInfo.stage,
      initialGuna: urgeIntensity >= 4 ? 'Tamas' : 'Rajas',
      vitarkaText,
      pratipakshaText,
      microSwapAction: selectedSwap,
      resolvedGunaState: validation.resultingGuna,
    });

    setGateFeedback({
      text: `Interception logged at stage "${currentStageInfo.englishTitle}". ${validation.feedback}`,
      isError: false,
    });
  };

  const estimatedStage = estimateCascadeStage(selectedTrigger, urgeIntensity);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
      }}
      className={`p-5 sm:p-6 rounded-2xl border shadow-xs space-y-6 ${className}`}
    >
      {/* Header with Title and Shastra Lens Trigger */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Pause Gate: Gita 2.62-63 Interceptor
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Intercept craving (Kāma) and delusion via Pratipaksha Bhavana (YS 2.33)
          </p>
        </div>
        <button
          type="button"
          onClick={() => openShastraLens('interceptor')}
          style={{ color: '#065F46' }}
          className="text-xs font-semibold hover:underline cursor-pointer flex-shrink-0 ml-2"
        >
          [Inspect Shastra Lens]
        </button>
      </div>

      {/* 1. Mobile-Optimized Trigger Category Selector */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Select Active Trigger:
        </label>
        <div className="flex flex-wrap gap-2">
          {TRIGGER_CATEGORIES.map((cat) => {
            const isSelected = selectedTrigger === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleTriggerSelect(cat)}
                style={{
                  backgroundColor: isSelected ? '#D97706' : '#F1F5F9',
                  color: isSelected ? '#FFFFFF' : '#334155',
                }}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer shadow-2xs ${
                  isSelected ? 'ring-2 ring-amber-500/30' : 'hover:bg-slate-200'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Urge Intensity Slider */}
      <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-amber-900">
            Urge Intensity: {urgeIntensity} / 5
          </span>
          <span className="text-amber-800 font-semibold bg-amber-100/70 px-2 py-0.5 rounded text-[11px]">
            {estimatedStage.canInterceptEasily ? '✓ Early Intercept' : '⚠ Critical Stage'}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={urgeIntensity}
          onChange={(e) => setUrgeIntensity(Number(e.target.value))}
          className="w-full accent-[#D97706] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-amber-900/80 font-medium pt-0.5">
          <span>Current Stage:</span>
          <span className="font-bold">
            Step {estimatedStage.stepNumber}: {estimatedStage.englishTitle}
          </span>
        </div>
      </div>

      {/* 3. 7-Step Bhagavad Gita 2.62-63 Visual Progress Tracker */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Gita 2.62-63 Descent Tracker:
          </span>
          <button type="button" onClick={() => openShastraLens('cascade')} className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 transition cursor-pointer">Shastra Lens: Cascade Exegesis</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {GITA_CASCADE_STEPS.map((step) => {
            const isCurrent = step.stepNumber === estimatedStage.stepNumber;
            const isPast = step.stepNumber < estimatedStage.stepNumber;

            return (
              <div
                key={step.stage}
                style={{
                  backgroundColor: isCurrent
                    ? '#FEF3C7'
                    : isPast
                    ? '#F8FAFC'
                    : '#FFFFFF',
                  borderColor: isCurrent
                    ? '#D97706'
                    : isPast
                    ? '#CBD5E1'
                    : '#E2E8F0',
                }}
                className={`p-2.5 rounded-xl border text-center space-y-1 transition-all ${
                  isCurrent ? 'ring-2 ring-amber-500/40 shadow-xs' : ''
                }`}
              >
                <span className="text-[10px] font-bold text-slate-500 block">
                  Step {step.stepNumber}
                </span>
                <p className="text-xs font-semibold text-slate-800 leading-tight">
                  {step.englishTitle}
                </p>
                <span
                  style={{
                    color: step.canInterceptEasily ? '#065F46' : '#991B1B',
                  }}
                  className="text-[9px] font-bold block"
                >
                  {step.canInterceptEasily ? '✓ Early' : '⚠ Critical'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Pratipaksha Bhavana Form */}
      <div className="space-y-4 pt-1 border-t border-slate-200">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            1. Vitarka (Unwholesome Impulse / Distractive Thought)
          </label>
          <textarea
            rows={2}
            value={vitarkaText}
            onChange={(e) => setVitarkaText(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl bg-white text-slate-800 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 leading-relaxed resize-none"
            placeholder="Articulate the compulsive urge..."
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-700">
              2. Pratipaksha (Wholesome Reframe – YS 2.33)
            </label>
            <button
              type="button"
              onClick={() => openShastraLens('pratipaksha')}
              className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 transition cursor-pointer"
            >
              Shastra Lens: YS 2.33
            </button>
          </div>
          <textarea
            rows={2}
            value={pratipakshaText}
            onChange={(e) => setPratipakshaText(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl bg-white text-slate-800 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 leading-relaxed resize-none"
            placeholder="Evoke the opposite tranquil contemplation..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            3. Select Śreyas Micro-Swap Action:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TRIGGER_REFRAME_TEMPLATES[selectedTrigger].defaultMicroSwaps.map(
              (swap) => {
                const isSelected = selectedSwap === swap;
                return (
                  <button
                    key={swap}
                    type="button"
                    onClick={() => setSelectedSwap(swap)}
                    style={{
                      backgroundColor: isSelected ? '#ECFDF5' : '#F8FAFC',
                      borderColor: isSelected ? '#065F46' : '#E2E8F0',
                      color: isSelected ? '#065F46' : '#334155',
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                      isSelected ? 'ring-1 ring-emerald-600 shadow-2xs font-semibold' : 'hover:bg-slate-100'
                    }`}
                  >
                    <span>{swap}</span>
                    {isSelected && <span className="text-emerald-700 font-bold ml-1">✓</span>}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Feedback Alert Banner */}
        {gateFeedback && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 animate-fadeIn ${
              gateFeedback.isError
                ? 'bg-rose-50 border border-rose-200 text-rose-800 font-medium'
                : 'bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold'
            }`}
          >
            {gateFeedback.isError ? (
              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            )}
            <span>{gateFeedback.text}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          type="button"
          onClick={handleCommitInterception}
          style={{ backgroundColor: '#D97706', color: '#FFFFFF' }}
          className="w-full py-3.5 px-4 rounded-xl font-bold text-sm hover:opacity-95 transition shadow-sm active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Engage Pause Gate &amp; Log Interception</span>
        </button>
      </div>
    </div>
  );
};

export default InterceptorMobile;
