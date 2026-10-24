import React, { useState } from 'react';
import { ShastraLensButton } from '../Shastra/ShastraLensButton';
import { useBrahmaPath } from '../../context/BrahmaPathContext';
import { computeYuktaScore } from '../../engine/yuktaEngine';
import { GunaType } from '../../types/iks';
import { Utensils, Moon, Zap, BookOpen, Sparkles, CheckCircle2, Heart } from 'lucide-react';

export interface SadhanaMobileProps {
  className?: string;
}

/**
 * Mobile-first Trayopastambha Sadhana Hub reflection form.
 * Designed with compassionate, non-judgmental guidance for daily self-observation
 * based on Charaka Samhita 11.35 and Gita 6.17 Yukta moderation.
 */
export const SadhanaMobile: React.FC<SadhanaMobileProps> = ({ className = '' }) => {
  const { todayLog, addOrUpdateDailyLog, openShastraLens } = useBrahmaPath();

  // --- AHARA STATE ---
  const [nutritionQuality, setNutritionQuality] = useState<'Sattvic' | 'Rajasic' | 'Tamasic'>(
    todayLog?.ahara.nutritionQuality ?? 'Sattvic'
  );
  const [digitalMinutes, setDigitalMinutes] = useState<number>(
    todayLog?.ahara.digitalConsumptionMinutes ?? 90
  );
  const [mindfulnessScore, setMindfulnessScore] = useState<number>(
    todayLog?.ahara.sensoryMindfulnessScore ?? 4
  );

  // --- NIDRA STATE ---
  const [hoursSlept, setHoursSlept] = useState<number>(todayLog?.nidra.hoursSlept ?? 7.5);
  const [bedtimeConsistency, setBedtimeConsistency] = useState<boolean>(
    todayLog?.nidra.bedtimeConsistency ?? true
  );
  const [restQuality, setRestQuality] = useState<'Restorative' | 'Disturbed' | 'Lethargic'>(
    todayLog?.nidra.restQuality ?? 'Restorative'
  );

  // --- BRAHMACHARYA STATE ---
  const [energyRating, setEnergyRating] = useState<number>(
    todayLog?.brahmacharya.energyConservationRating ?? 4
  );
  const [studyBlocks, setStudyBlocks] = useState<number>(
    todayLog?.brahmacharya.focusedStudyBlocks ?? 4
  );
  const [dominantGuna, setDominantGuna] = useState<GunaType>(
    todayLog?.brahmacharya.dominantGuna ?? 'Sattva'
  );

  // --- NOTE / REFLECTION STATE ---
  const [reflection, setReflection] = useState<string>(
    todayLog?.generalReflection ?? ''
  );
  const [sadhanaMessage, setSadhanaMessage] = useState<string>('');

  // Handle saving the log
  const handleSaveSadhana = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];

    const ahara = {
      nutritionQuality,
      digitalConsumptionMinutes: Number(digitalMinutes),
      sensoryMindfulnessScore: Number(mindfulnessScore),
    };

    const nidra = {
      hoursSlept: Number(hoursSlept),
      bedtimeConsistency,
      restQuality,
    };

    const brahmacharya = {
      energyConservationRating: Number(energyRating),
      focusedStudyBlocks: Number(studyBlocks),
      dominantGuna,
    };

    const score = computeYuktaScore(ahara, nidra, brahmacharya);

    addOrUpdateDailyLog(
      {
        date: today,
        ahara,
        nidra,
        brahmacharya,
        generalReflection: reflection,
      },
      score
    );

    setSadhanaMessage(`Sadhana recorded with care! Yukta Balance Score: ${score}/100`);
    setTimeout(() => setSadhanaMessage(''), 5000);
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
      }}
      className={`p-6 rounded-3xl border shadow-xs space-y-6 ${className}`}
    >
      {/* Header with Title and Shastra Lens Trigger */}
      <div className="flex items-center justify-between border-b border-slate-200/90 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-700 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Daily Sadhana Reflection
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Charaka Samhita 11.35 • A gentle check-in with your body, mind, and rhythm
          </p>
        </div>
        <ShastraLensButton
          onClick={() => openShastraLens('trayopastambha')}
          className="ml-2"
        />
      </div>

      {/* Feedback Alert Banner */}
      {sadhanaMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-2xl flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span className="font-semibold">{sadhanaMessage}</span>
        </div>
      )}

      <form onSubmit={handleSaveSadhana} className="space-y-6">
        {/* ================= 1. AHARA PILLAR ================= */}
        <div className="p-6 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-amber-700" />
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                1. Āhāra (Nourishment &amp; Sensory Input)
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Sensory Diet</span>
          </div>

          {/* Compassionate Sensory Prompt & Helper Text */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-800">
              What did your eyes and mind consume today?
            </h4>
            <p className="text-[11px] text-slate-500 italic leading-relaxed">
              &ldquo;Ahara is not just food; it is everything you feed your senses.&rdquo;
            </p>
          </div>

          <div className="space-y-4">
            {/* Digital Screen Intake Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-slate-600">
                  Screen &amp; Digital Volume
                </span>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                  {digitalMinutes} mins
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="15"
                value={digitalMinutes}
                onChange={(e) => setDigitalMinutes(Number(e.target.value))}
                className="w-full accent-[#D97706] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-medium px-0.5">
                <span>[Mindful &amp; Intentional]</span>
                <span>[Overwhelmed by the Noise]</span>
              </div>
            </div>

            {/* Sensory Mindfulness Slider */}
            <div className="space-y-2 pt-1 border-t border-slate-200/60">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-slate-700">
                  Sensory Presence (Pratyahara Awareness)
                </label>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                  {mindfulnessScore} / 5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={mindfulnessScore}
                onChange={(e) => setMindfulnessScore(Number(e.target.value))}
                className="w-full accent-[#065F46] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 px-0.5">
                <span>1 (Scattered / Reactive)</span>
                <span>5 (Deeply anchored &amp; present)</span>
              </div>
            </div>

            {/* Nutritional Quality Select */}
            <div className="space-y-1 pt-1 border-t border-slate-200/60">
              <label className="block text-xs font-medium text-slate-700">
                Nourishment Quality
              </label>
              <select
                value={nutritionQuality}
                onChange={(e) =>
                  setNutritionQuality(e.target.value as 'Sattvic' | 'Rajasic' | 'Tamasic')
                }
                className="w-full p-3 border border-slate-300 rounded-xl bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition"
              >
                <option value="Sattvic">Sattvic (Fresh, light, wholesome, peaceful energy)</option>
                <option value="Rajasic">Rajasic (Pungent, highly stimulating, spicy, restless)</option>
                <option value="Tamasic">Tamasic (Heavy, processed, stale, sluggish)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================= 2. NIDRA PILLAR ================= */}
        <div className="p-6 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-700" />
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                2. Nidrā (Restorative Sleep &amp; Rhythm)
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Circadian Care</span>
          </div>

          {/* Compassionate Sleep Prompt */}
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-slate-800">
              How deeply did your mind surrender to rest?
            </h4>
            <p className="text-[11px] text-slate-500">
              Sleep is nature&apos;s innate restorative cycle—honoring it is an act of self-reverence.
            </p>
          </div>

          <div className="space-y-4">
            {/* Rest Quality Select */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700">
                Quality of Rest
              </label>
              <select
                value={restQuality}
                onChange={(e) =>
                  setRestQuality(
                    e.target.value as 'Restorative' | 'Disturbed' | 'Lethargic'
                  )
                }
                className="w-full p-3 border border-slate-300 rounded-xl bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition"
              >
                <option value="Restorative">Surrendered into deep, peaceful sleep (Refreshed &amp; clear)</option>
                <option value="Disturbed">Fragmented sleep with racing thoughts (Agitated / awakenings)</option>
                <option value="Lethargic">Heavy, ungrounded grogginess upon waking (Sluggish / drained)</option>
              </select>
            </div>

            {/* Hours Slept Number Input */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-slate-700">
                  Hours Slept
                </label>
                <span className="text-[11px] text-slate-400">
                  Natural optimal: 6.5 – 8.0 hrs
                </span>
              </div>
              <input
                type="number"
                step="0.5"
                min="3"
                max="14"
                value={hoursSlept}
                onChange={(e) => setHoursSlept(Number(e.target.value))}
                className="w-full p-3 border border-slate-300 rounded-xl bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition"
              />
            </div>

            {/* Consistent Bedtime Checkbox */}
            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                id="bedtimeConsistencyMobile"
                checked={bedtimeConsistency}
                onChange={(e) => setBedtimeConsistency(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-[#065F46] rounded cursor-pointer"
              />
              <label
                htmlFor="bedtimeConsistencyMobile"
                className="text-xs font-medium text-slate-700 cursor-pointer select-none leading-relaxed"
              >
                I maintained a consistent sleep schedule (anchored within ±30 minutes)
              </label>
            </div>
          </div>
        </div>

        {/* ================= 3. BRAHMACHARYA PILLAR ================= */}
        <div className="p-6 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                3. Brahmacharya (Vital Energy Stewardship)
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Prana Conservation</span>
          </div>

          {/* Compassionate Vitality Prompt & Self-Forgiveness Subtext */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-800">
              How well did you protect your inner vitality today?
            </h4>
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/70 flex items-start gap-2">
              <Heart className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-900/90 leading-relaxed italic">
                Be gentle with yourself. Forgive any moments where attention or energy leaked into distractions—awareness without shame is how we reclaim vitality.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Energy Conservation Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-slate-700">
                  Inner Vitality Rating
                </label>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                  {energyRating} / 5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={energyRating}
                onChange={(e) => setEnergyRating(Number(e.target.value))}
                className="w-full accent-[#D97706] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 px-0.5">
                <span>1 (Drained / Leaking into compulsions)</span>
                <span>5 (Luminous &amp; conserved)</span>
              </div>
            </div>

            {/* Focused Study Blocks Number Input */}
            <div className="space-y-1 pt-1 border-t border-slate-200/60">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-slate-700">
                  Focused Study / Deep Work Blocks
                </label>
                <span className="text-[11px] text-slate-400">
                  25-minute Pomodoros
                </span>
              </div>
              <input
                type="number"
                min="0"
                max="12"
                value={studyBlocks}
                onChange={(e) => setStudyBlocks(Number(e.target.value))}
                className="w-full p-3 border border-slate-300 rounded-xl bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition"
              />
            </div>

            {/* Dominant Observed Guna Select */}
            <div className="space-y-1 pt-1 border-t border-slate-200/60">
              <label className="block text-xs font-medium text-slate-700">
                Dominant Mental Quality (Observed Guna)
              </label>
              <select
                value={dominantGuna}
                onChange={(e) => setDominantGuna(e.target.value as GunaType)}
                className="w-full p-3 border border-slate-300 rounded-xl bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition"
              >
                <option value="Sattva">Sattva (Calm, lucid, quietly absorbed, harmonious)</option>
                <option value="Rajas">Rajas (Driven, restless, hyperactive multitasking)</option>
                <option value="Tamas">Tamas (Fatigued, procrastination, inertia, dullness)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================= 4. DAILY REFLECTION ================= */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <label className="block text-xs font-semibold text-slate-700">
              Daily Reflection &amp; Mindful Note
            </label>
          </div>
          <textarea
            rows={3}
            placeholder="How is your inner weather right now? Acknowledge what felt peaceful today and gently release whatever felt heavy..."
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full p-4 border border-slate-300 rounded-2xl bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 resize-none leading-relaxed transition"
          />
        </div>

        {/* Large Touch-Friendly Submit Button */}
        <button
          type="submit"
          style={{ backgroundColor: '#065F46', color: '#FFFFFF' }}
          className="w-full py-4 px-6 rounded-2xl font-bold text-sm hover:opacity-95 transition shadow-sm active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Record Compassionate Reflection (Gita 6.17 Yukta Scoring)</span>
        </button>
      </form>
    </div>
  );
};

export default SadhanaMobile;
