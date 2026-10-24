import React, { useState } from 'react';
import { useBrahmaPath } from '../../context/BrahmaPathContext';
import { BHAVA_COMPASS_MAP } from '../../engine/bhavaEngine';
import { BhavaEmotion } from '../../types/iks';
import { Compass, Sparkles, HeartHandshake, Eye, ShieldAlert, CheckCircle2 } from 'lucide-react';

export interface CompassMobileProps {
  className?: string;
}

const EMOTION_ITEMS: {
  key: BhavaEmotion;
  label: string;
  subtext: string;
}[] = [
  {
    key: 'Peer_Envy',
    label: 'Peer Envy / Jealousy',
    subtext: 'Resentment at peer accolades or placement',
  },
  {
    key: 'Other_Suffering',
    label: 'Witnessing Suffering',
    subtext: 'Encountering others in distress or weakness',
  },
  {
    key: 'Shared_Success',
    label: 'Peer Success / Joy',
    subtext: 'Seeing others flourish or celebrating',
  },
  {
    key: 'Toxic_Hostility',
    label: 'Toxicity / Hostility',
    subtext: 'Bad-faith malice, provocation, or insults',
  },
];

/**
 * Mobile-first Bhava Compass (Yoga Sutra 1.33 Chitta Prasadanam) component.
 * Maps interpersonal emotional perturbations directly to the four serene counter-attitudes:
 * Maitrī (friendliness), Karuṇā (compassion), Muditā (sympathetic joy), and Upekṣā (equanimity).
 */
export const CompassMobile: React.FC<CompassMobileProps> = ({ className = '' }) => {
  const { openShastraLens } = useBrahmaPath();
  const [selectedEmotion, setSelectedEmotion] = useState<BhavaEmotion>('Peer_Envy');

  const prescription = BHAVA_COMPASS_MAP[selectedEmotion];

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
            <Compass className="w-5 h-5 text-indigo-700 animate-spin-slow" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Bhāva Compass (Chitta Prasādanam)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Yoga Sutra 1.33: Serenity through the four classical counter-attitudes
          </p>
        </div>
        <button
          type="button"
          onClick={() => openShastraLens('chitta_prasadanam')}
          style={{ color: '#065F46' }}
          className="text-xs font-semibold hover:underline cursor-pointer flex-shrink-0 ml-2"
        >
          [Inspect Shastra Lens]
        </button>
      </div>

      {/* 4 Emotion Trigger Buttons Stacked for Mobile */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Select Interpersonal Trigger:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {EMOTION_ITEMS.map((em) => {
            const isSelected = selectedEmotion === em.key;
            return (
              <button
                key={em.key}
                type="button"
                onClick={() => setSelectedEmotion(em.key)}
                style={{
                  backgroundColor: isSelected ? '#DEF7EC' : '#F8FAFC',
                  borderColor: isSelected ? '#065F46' : '#E2E8F0',
                  color: isSelected ? '#065F46' : '#334155',
                }}
                className={`p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer shadow-2xs ${
                  isSelected
                    ? 'ring-2 ring-emerald-600/30 font-bold'
                    : 'hover:bg-slate-100 hover:border-slate-300 font-medium'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">{em.label}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-700" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1">
                  {em.subtext}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Prescription Details Card */}
      <div
        style={{ backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' }}
        className="p-5 rounded-xl border space-y-4 shadow-2xs animate-fadeIn"
      >
        {/* Prescription Header & Sanskrit Sutra */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200/80 pb-3">
          <div className="flex items-center gap-2">
            <span
              style={{ backgroundColor: '#065F46', color: '#FFFFFF' }}
              className="text-xs px-3 py-1 rounded-full font-bold shadow-2xs"
            >
              Prescribed Attitude: {prescription.recommendedAttitude.replace('_', ' ')}
            </span>
          </div>
          <span className="text-xs text-slate-600 font-serif italic">
            {prescription.sanskritSutra}
          </span>
        </div>

        {/* Cognitive Reappraisal Prompt */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Cognitive Reappraisal Prompt:
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-white/70 p-3 rounded-xl border border-slate-200/70">
            {prescription.cognitivePrompt}
          </p>
        </div>

        {/* Actionable Practice */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-700" />
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Actionable Practice:
            </h4>
          </div>
          <div className="text-xs sm:text-sm text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs leading-relaxed">
            {prescription.actionableStep}
          </div>
        </div>

        {/* Guna Equilibrium Target Badge */}
        <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 font-medium">
          <span>Target Cognitive Equilibrium:</span>
          <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {prescription.targetGunaShift} (Lucid Serenity)
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompassMobile;
