import React, { useState } from 'react';
import { ShastraLensButton } from '../Shastra/ShastraLensButton';
import { useBrahmaPath } from '../../context/BrahmaPathContext';
import { estimateCascadeStage } from '../../engine/cascadeEngine';
import { validatePratipakshaReframe } from '../../engine/pratipakshaEngine';
import { TriggerCategory } from '../../types/iks';
import { CascadeVisualizer } from './CascadeVisualizer';
import { ReframeInputs, SHREYAS_MICRO_SWAPS } from './ReframeInputs';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

export interface InterceptorMobileProps {
  className?: string;
}

const TRIGGER_CATEGORIES: TriggerCategory[] = [
  'Doomscrolling',
  'Academic Anxiety',
  'Social Comparison',
  'Lethargy',
  'Cheap Dopamine / Junk Stimulation',
];

/**
 * Mobile-first master Pause Gate (Distraction Interceptor) component.
 *
 * Implements:
 * - Responsive mobile container with pb-24 for comfortable thumb scrolling
 * - Clean header: "What heavy thought is pulling at you right now?"
 * - 5 TriggerCategory chips/pills
 * - HTML range slider (1-5) for Urge Intensity
 * - Mounted <CascadeVisualizer /> (Gita 2.62-63)
 * - Mounted <ReframeInputs /> (YS 2.33 Pratipaksha + 6 Shreyas Micro-Swaps)
 * - Massive touch-friendly button: [ Engage Pause Gate & Log Interception ]
 *   with strict textarea validation and satisfying visual feedback.
 */
export const InterceptorMobile: React.FC<InterceptorMobileProps> = ({
  className = '',
}) => {
  const { logInterception, openShastraLens } = useBrahmaPath();

  // --- COMPONENT STATE ---
  const [selectedTrigger, setSelectedTrigger] =
    useState<TriggerCategory>('Doomscrolling');
  const [urgeIntensity, setUrgeIntensity] = useState<number>(3);
  const [vitarkaText, setVitarkaText] = useState<string>('');
  const [pratipakshaText, setPratipakshaText] = useState<string>('');
  const [selectedSwap, setSelectedSwap] = useState<string>(SHREYAS_MICRO_SWAPS[0]);
  const [gateFeedback, setGateFeedback] = useState<{
    text: string;
    isError?: boolean;
  } | null>(null);
  const [isSuccessFeedback, setIsSuccessFeedback] = useState<boolean>(false);

  // Handle trigger change
  const handleTriggerSelect = (cat: TriggerCategory) => {
    setSelectedTrigger(cat);
    setGateFeedback(null);
  };

  // Submit Pause Gate
  const handleCommitInterception = () => {
    // 1. Validation: Ensure both textareas are filled
    const trimmedVitarka = vitarkaText.trim();
    const trimmedPratipaksha = pratipakshaText.trim();

    if (!trimmedVitarka) {
      setGateFeedback({
        text: 'Please write down the compulsive impulse (Vitarka) before engaging the Pause Gate.',
        isError: true,
      });
      return;
    }

    if (!trimmedPratipaksha) {
      setGateFeedback({
        text: 'Please formulate a conscious opposing reframe (Pratipaksha) to redirect your attention.',
        isError: true,
      });
      return;
    }

    // 2. Validate Pratipaksha reframe quality (YS 2.33)
    const validation = validatePratipakshaReframe(trimmedVitarka, trimmedPratipaksha);
    if (!validation.isValid) {
      setGateFeedback({ text: validation.feedback, isError: true });
      return;
    }

    // 3. Estimate Gita 2.62-63 stage
    const currentStageInfo = estimateCascadeStage(selectedTrigger, urgeIntensity);

    // 4. Dispatch to engine
    logInterception({
      triggerCategory: selectedTrigger,
      cascadeStageReached: currentStageInfo.stage,
      urgeIntensity,
      vitarkaText: trimmedVitarka,
      pratipakshaText: trimmedPratipaksha,
      selectedMicroSwap: selectedSwap,
      microSwapAction: selectedSwap,
      initialGuna: urgeIntensity >= 4 ? 'Tamas' : 'Rajas',
      resolvedGunaState: validation.resultingGuna,
      interactionType: 'resolved_negative_friction',
      isResolved: true,
      isPositive: false,
    });

    // 5. Satisfying visual feedback
    setIsSuccessFeedback(true);
    setGateFeedback({
      text: `✨ Pause Gate Engaged! Interception logged at Step ${currentStageInfo.stepNumber} (${currentStageInfo.englishTitle}). Your discriminative intellect (Buddhi) has regained the reins.`,
      isError: false,
    });

    // Reset inputs and success state after a celebratory moment
    setTimeout(() => {
      setVitarkaText('');
      setPratipakshaText('');
      setIsSuccessFeedback(false);
    }, 2800);
  };

  const estimatedStage = estimateCascadeStage(selectedTrigger, urgeIntensity);

  return (
    <div className={`w-full max-w-md mx-auto p-4 overflow-y-auto pb-24 space-y-6 ${className}`}>
      {/* 1. Master Header Card with Shastra Lens Trigger */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              The Pause Gate
            </span>
          </div>
          <ShastraLensButton
            onClick={() => openShastraLens('interceptor')}
            className="ml-2"
          />
        </div>

        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
            What heavy thought is pulling at you right now?
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Take a slow, deep breath. You are safe here, and this urge is only temporary.
          </p>
        </div>
      </div>

      {/* 2. Selectable Chips/Pills for the 5 TriggerCategory Strings */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
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
                  isSelected
                    ? 'ring-2 ring-amber-500/30 font-bold'
                    : 'hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. HTML Range Slider (1 to 5) for Urge Intensity */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
        <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-amber-950">
              Urge Intensity ({urgeIntensity} / 5)
            </span>
            <span className="text-amber-800 font-semibold bg-amber-100/90 px-2.5 py-0.5 rounded-full text-[11px] border border-amber-200/80">
              {estimatedStage.canInterceptEasily ? '✓ Early Intercept' : '⚠ Critical Stage'}
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={urgeIntensity}
            onChange={(e) => {
              setUrgeIntensity(Number(e.target.value));
              if (gateFeedback?.isError) setGateFeedback(null);
            }}
            className="w-full accent-[#D97706] cursor-pointer h-2 bg-amber-200/60 rounded-lg appearance-none"
          />

          <div className="flex justify-between text-[11px] text-amber-900/80 font-medium pt-0.5">
            <span>Observed Gita Stage:</span>
            <span className="font-bold text-amber-950">
              Step {estimatedStage.stepNumber}: {estimatedStage.englishTitle}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Bhagavad Gita 2.62-63 7-Step Cascade Visualizer Component */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
        <CascadeVisualizer activeStep={estimatedStage.stepNumber || 3} />
      </div>

      {/* 5. Pratipaksha Reframe Inputs & Shreyas Micro-Swap Actions Component */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
        <ReframeInputs
          vitarkaText={vitarkaText}
          onVitarkaChange={(val) => {
            setVitarkaText(val);
            if (gateFeedback?.isError) setGateFeedback(null);
          }}
          pratipakshaText={pratipakshaText}
          onPratipakshaChange={(val) => {
            setPratipakshaText(val);
            if (gateFeedback?.isError) setGateFeedback(null);
          }}
          selectedSwap={selectedSwap}
          onSelectSwap={setSelectedSwap}
        />
      </div>

      {/* 6. Dynamic Visual Feedback Banner */}
      {gateFeedback && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm flex items-start gap-3 shadow-2xs transition-all duration-300 ${
            gateFeedback.isError
              ? 'bg-rose-50 border border-rose-200 text-rose-800 font-medium'
              : 'bg-emerald-50 border border-emerald-300 text-emerald-900 font-semibold ring-2 ring-emerald-500/20'
          }`}
        >
          {gateFeedback.isError ? (
            <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          )}
          <span className="leading-relaxed">{gateFeedback.text}</span>
        </div>
      )}

      {/* 7. Massive, Touch-Friendly Action Button */}
      <div className="pt-1">
        <button
          type="button"
          onClick={handleCommitInterception}
          style={{
            backgroundColor: isSuccessFeedback ? '#059669' : '#D97706',
            color: '#FFFFFF',
          }}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2.5 ${
            isSuccessFeedback
              ? 'ring-4 ring-emerald-500/30 scale-[1.01]'
              : 'hover:brightness-105 hover:shadow-lg'
          }`}
        >
          {isSuccessFeedback ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              <span>✓ Intellect Cleared &amp; Logged!</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-5 h-5" />
              <span>Engage Pause Gate &amp; Log Interception</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InterceptorMobile;
