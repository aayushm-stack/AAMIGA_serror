import React, { useState } from 'react';
import { ShastraLensButton } from '../Shastra/ShastraLensButton';
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
import { ShieldCheck, Sparkles, CheckCircle2, AlertTriangle, Heart } from 'lucide-react';

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
 * Supportive mobile Pause Gate (Distraction Interceptor) component.
 * Designed with a compassionate, reassuring tone to comfort the user during
 * acute overwhelm, tracing the Gita 2.62-63 cascade and guiding YS 2.33 Pratipaksha Bhavana.
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
      urgeIntensity,
      vitarkaText,
      pratipakshaText,
      selectedMicroSwap: selectedSwap,
      microSwapAction: selectedSwap,
      initialGuna: urgeIntensity >= 4 ? 'Tamas' : 'Rajas',
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
      className={`p-6 rounded-3xl border shadow-xs space-y-6 ${className}`}
    >
      {/* Supportive Header with Opening Text */}
      <div className="flex items-center justify-between border-b border-slate-200/90 pb-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              The Pause Gate
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            What heavy thought is pulling at you right now?
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Take a slow, deep breath. You are safe here, and this urge is only temporary.
          </p>
        </div>

        <ShastraLensButton
          onClick={() => openShastraLens('interceptor')}
          className="ml-2"
        />
      </div>

      {/* 1. Mobile-Optimized Trigger Category Selector */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Where is this feeling coming from?
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
                    ? 'ring-2 ring-amber-500/30'
                    : 'hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Urge Intensity Slider */}
      <div className="p-5 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-2.5">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-amber-900">
            How intense is this urge right now? ({urgeIntensity} / 5)
          </span>
          <span className="text-amber-800 font-semibold bg-amber-100/80 px-2 py-0.5 rounded-lg text-[11px]">
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
          <span>Observed Psychological Stage:</span>
          <span className="font-bold">
            Step {estimatedStage.stepNumber}: {estimatedStage.englishTitle}
          </span>
        </div>
      </div>

      {/* 3. 7-Step Bhagavad Gita 2.62-63 Visual Progress Tracker */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Gita 2.62-63 Psychological Cascade:
          </span>
          <span className="text-[10px] text-slate-400 font-medium">7-Step Insight</span>
        </div>

        {/* 7-Step Cascade Grid Highlighting Step 3 (Kama / Craving) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {GITA_CASCADE_STEPS.map((step) => {
            const isStep3Kama = step.stepNumber === 3;
            const isCurrent = step.stepNumber === estimatedStage.stepNumber;
            const isPast = step.stepNumber < estimatedStage.stepNumber;

            return (
              <div
                key={step.stage}
                style={{
                  backgroundColor: isStep3Kama
                    ? '#FEF3C7'
                    : isCurrent
                    ? '#FFFBEB'
                    : isPast
                    ? '#F8FAFC'
                    : '#FFFFFF',
                  borderColor: isStep3Kama
                    ? '#D97706'
                    : isCurrent
                    ? '#F59E0B'
                    : isPast
                    ? '#CBD5E1'
                    : '#E2E8F0',
                }}
                className={`p-2.5 rounded-xl border text-center space-y-1 transition-all ${
                  isStep3Kama
                    ? 'ring-2 ring-amber-500 shadow-xs scale-[1.02]'
                    : isCurrent
                    ? 'ring-1 ring-amber-400'
                    : ''
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  <span className="text-[10px] font-bold text-slate-500 block">
                    Step {step.stepNumber}
                  </span>
                  {isStep3Kama && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                  )}
                </div>
                <p className="text-xs font-bold text-slate-800 leading-tight">
                  {step.englishTitle}
                </p>
                <span
                  style={{
                    color: step.canInterceptEasily ? '#065F46' : '#991B1B',
                  }}
                  className="text-[9px] font-bold block"
                >
                  {isStep3Kama
                    ? '★ Active Intercept'
                    : step.canInterceptEasily
                    ? '✓ Early'
                    : '⚠ Critical'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Reassuring Text Rendered Below Step 3 Kama */}
        <div className="p-4 bg-emerald-50/90 border border-emerald-200/90 rounded-2xl flex items-start gap-3 shadow-xs animate-fadeIn">
          <Heart className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
            You are currently experiencing Kama. You have caught this early. Your discriminative intellect (Buddhi) is still awake and in control.
          </p>
        </div>
      </div>

      {/* 4. Pratipaksha Bhavana Form with Guided Prompt */}
      <div className="space-y-4 pt-2 border-t border-slate-200/90">
        {/* Guided Pratipaksha Prompt Header */}
        <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-1.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Patanjali Yoga Sutra 2.33 (Pratipaksha Bhāvana)
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            Let&apos;s apply Pratipaksha. Write down the heavy thought... Now, let&apos;s find the lighter, opposite truth to redirect this energy.
          </p>
        </div>

        {/* Input 1: The Heavy Thought (Vitarka) */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            1. The Heavy Thought (Compulsive Urge / Vitarka)
          </label>
          <textarea
            rows={2}
            value={vitarkaText}
            onChange={(e) => setVitarkaText(e.target.value)}
            className="w-full p-3.5 border border-slate-300 rounded-xl bg-white text-slate-800 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 leading-relaxed resize-none transition"
            placeholder="Write down the heavy thought pulling at you right now..."
          />
        </div>

        {/* Input 2: The Lighter Opposite Truth (Pratipaksha Reframe) */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            2. The Lighter, Opposite Truth (Pratipaksha Reframe – YS 2.33)
          </label>
          <textarea
            rows={2}
            value={pratipakshaText}
            onChange={(e) => setPratipakshaText(e.target.value)}
            className="w-full p-3.5 border border-slate-300 rounded-xl bg-white text-slate-800 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 leading-relaxed resize-none transition"
            placeholder="Now, let's find the lighter, opposite truth to redirect this energy..."
          />
        </div>

        {/* Input 3: Micro-Swap Action */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            3. Choose a Gentle Action (Śreyas Micro-Swap):
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
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'ring-1 ring-emerald-600 shadow-2xs font-semibold'
                        : 'hover:bg-slate-100 hover:border-slate-300'
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
            className={`p-3.5 rounded-2xl text-xs flex items-center gap-2.5 animate-fadeIn ${
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
          className="w-full py-4 px-6 rounded-2xl font-bold text-sm hover:opacity-95 transition shadow-sm active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Release the Urge &amp; Ground in Clarity</span>
        </button>
      </div>
    </div>
  );
};

export default InterceptorMobile;