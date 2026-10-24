import React, { useState } from 'react';
import { useBrahmaPath } from '../../context/BrahmaPathContext';
import { getBhavaPrescription } from '../../engine/bhavaEngine';
import { BhavaEmotion } from '../../types/iks';
import {
  Compass,
  Sparkles,
  HeartHandshake,
  Heart,
  Smile,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export interface CompassMobileProps {
  className?: string;
}

interface EmotionItem {
  key: BhavaEmotion;
  label: string;
  subtext: string;
  category: 'Student Turmoil' | 'Interpersonal Dynamics';
  prescribedLabel: string;
}

const EMOTION_ITEMS: EmotionItem[] = [
  // --- Student Psychology Triggers ---
  {
    key: 'Academic_Burnout',
    label: 'Academic Burnout seeing others succeed effortlessly',
    subtext: 'Exhaustion & comparison when peers make high scores look effortless',
    category: 'Student Turmoil',
    prescribedLabel: 'Mudita (Joy in Others)',
  },
  {
    key: 'Imposter_Syndrome',
    label: 'Imposter Syndrome / Feeling Left Out',
    subtext: 'Feeling unworthy, fraudulent, or falling behind everyone else',
    category: 'Student Turmoil',
    prescribedLabel: 'Karuna (Self-Compassion)',
  },
  {
    key: 'Toxic_Partner',
    label: 'Dealing with a toxic project partner',
    subtext: 'Blame-shifting, slackers, or uncooperative team friction',
    category: 'Student Turmoil',
    prescribedLabel: 'Upeksha (Equanimity)',
  },
  // --- Classical Interpersonal Dynamics ---
  {
    key: 'Peer_Envy',
    label: 'Peer Envy / Placement Jealousy',
    subtext: 'Resentment at peer accolades, offers, or milestones',
    category: 'Interpersonal Dynamics',
    prescribedLabel: 'Mudita (Sympathetic Joy)',
  },
  {
    key: 'Other_Suffering',
    label: 'Witnessing a Peer’s Distress',
    subtext: 'Classmates breaking under exam pressure or silence',
    category: 'Interpersonal Dynamics',
    prescribedLabel: 'Karuna (Compassion)',
  },
  {
    key: 'Shared_Success',
    label: 'Group Achievement / Peer Flourishing',
    subtext: 'Celebrating collective team breakthroughs & friends’ joy',
    category: 'Interpersonal Dynamics',
    prescribedLabel: 'Maitri (Friendliness)',
  },
  {
    key: 'Toxic_Hostility',
    label: 'Hostility & Online Flame',
    subtext: 'Malicious remarks, toxic threads, and petty provocation',
    category: 'Interpersonal Dynamics',
    prescribedLabel: 'Upeksha (Serene Immunity)',
  },
];

/**
 * Mobile-first Bhava Compass (Yoga Sutra 1.33 Chitta Prasadanam).
 * Maps student psychological turmoil and interpersonal perturbations directly
 * to the four classical serene counter-attitudes:
 * - Maitrī (Friendliness for the thriving)
 * - Karuṇā (Compassion for the suffering & self-compassion)
 * - Muditā (Sympathetic joy for others' virtue & success)
 * - Upekṣā (Majestic equanimity and non-reactivity toward toxicity)
 */
export const CompassMobile: React.FC<CompassMobileProps> = ({ className = '' }) => {
  const { openShastraLens } = useBrahmaPath();
  const [selectedEmotion, setSelectedEmotion] =
    useState<BhavaEmotion>('Academic_Burnout');

  const prescription = getBhavaPrescription(selectedEmotion);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
      }}
      className={`p-5 sm:p-6 rounded-3xl border shadow-xs space-y-6 ${className}`}
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

        <button
          type="button"
          onClick={() => openShastraLens('chitta_prasadanam')}
          style={{ color: '#065F46' }}
          className="text-xs font-semibold hover:underline cursor-pointer flex-shrink-0 ml-2 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg border border-emerald-200 transition"
        >
          [YS 1.33 Lens]
        </button>
      </div>

      {/* Emotion Triggers: Stack of Touch-Friendly Mobile Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            What is troubling your mind right now?
          </label>
          <span className="text-[11px] text-slate-400 font-medium">
            Tap to find the antidote
          </span>
        </div>

        {/* Triggers List */}
        <div className="space-y-2">
          {EMOTION_ITEMS.map((em) => {
            const isSelected = selectedEmotion === em.key;
            return (
              <button
                key={em.key}
                type="button"
                onClick={() => setSelectedEmotion(em.key)}
                style={{
                  backgroundColor: isSelected ? '#F0FDF4' : '#FDFBF7',
                  borderColor: isSelected ? '#065F46' : '#E2E8F0',
                  color: isSelected ? '#065F46' : '#334155',
                }}
                className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer shadow-2xs relative ${
                  isSelected
                    ? 'ring-2 ring-emerald-600/30 font-semibold shadow-xs'
                    : 'hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {em.label}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${
                      isSelected
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {em.prescribedLabel}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {em.subtext}
                </p>
                {isSelected && (
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Active Antidote Prescribed Below</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Humanized Prescription Details Card */}
      <div
        style={{ backgroundColor: '#FDFBF7', borderColor: '#E5E7EB' }}
        className="p-5 sm:p-6 rounded-2xl border space-y-4 shadow-xs animate-fadeIn"
      >
        {/* Prescription Header & Sanskrit Sutra */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 border-b border-slate-200/90 pb-3.5">
          <div className="flex items-center gap-2">
            <span
              style={{ backgroundColor: '#065F46', color: '#FFFFFF' }}
              className="text-xs px-3.5 py-1.5 rounded-full font-bold shadow-2xs tracking-wide flex items-center gap-1.5"
            >
              {prescription.recommendedAttitude === 'Karuna_Compassion' && (
                <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
              )}
              {prescription.recommendedAttitude === 'Mudita_SympatheticJoy' && (
                <Smile className="w-3.5 h-3.5 text-amber-300" />
              )}
              {prescription.recommendedAttitude === 'Maitri_Friendliness' && (
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-300" />
              )}
              {prescription.recommendedAttitude === 'Upeksha_Equanimity' && (
                <ShieldCheck className="w-3.5 h-3.5 text-slate-300" />
              )}
              Prescribed: {prescription.recommendedAttitude.replace('_', ' ')}
            </span>
          </div>

          <span className="text-[11px] sm:text-xs text-slate-600 font-serif italic">
            {prescription.sanskritSutra}
          </span>
        </div>

        {/* Humanized Cognitive Reappraisal Prompt */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              The Compassionate Reframe:
            </h4>
          </div>
          <div className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <p className="font-serif italic text-slate-800 leading-relaxed text-sm">
              "{prescription.cognitivePrompt}"
            </p>
          </div>
        </div>

        {/* Gentle Actionable Practice */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-emerald-700" />
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Gentle Physical Practice:
            </h4>
          </div>
          <div className="text-xs sm:text-sm text-slate-700 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs leading-relaxed">
            {prescription.actionableStep}
          </div>
        </div>

        {/* Guna Equilibrium Target Badge */}
        <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500 font-medium border-t border-slate-200/80">
          <span>Target Equilibrium (Yoga Sutra 1.33):</span>
          <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {prescription.targetGunaShift} (Chitta Prasādanam – Lucid Serenity)
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompassMobile;
