import React, { useState } from 'react';
import { useBrahmaPath } from '../../context/BrahmaPathContext';
import { computeYuktaScore } from '../../engine/yuktaEngine';
import { GunaType } from '../../types/iks';
import { Utensils, Moon, Zap, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

export interface SadhanaMobileProps {
  className?: string;
}

/**
 * Mobile-first Trayopastambha Sadhana Hub form.
 * Directly binds to useBrahmaPath() context and computeYuktaScore (Gita 6.17).
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

    setSadhanaMessage(`Sadhana recorded successfully! Yukta Balance Score: ${score}/100`);
    setTimeout(() => setSadhanaMessage(''), 5000);
  };

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
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-700 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Trayopastambha Daily Tracker
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Charaka Samhita 11.35 &amp; Gita 6.17 Yukta Equilibrium
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
          <button
            type="button"
            onClick={() => openShastraLens('trayopastambha')}
            style={{ color: '#065F46' }}
            className="text-xs font-semibold hover:underline cursor-pointer"
          >
            [Pillars]
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={() => openShastraLens('yukta')}
            style={{ color: '#065F46' }}
            className="text-xs font-semibold hover:underline cursor-pointer"
          >
            [Gita 6.17 Yukta]
          </button>
        </div>
      </div>

      {/* Feedback Alert Banner */}
      {sadhanaMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span className="font-semibold">{sadhanaMessage}</span>
        </div>
      )}

      <form onSubmit={handleSaveSadhana} className="space-y-5">
        {/* ================= 1. AHARA PILLAR ================= */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-amber-700" />
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                1. Āhāra (Nourishment &amp; Sensory Intake)
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Dietary Input</span>
          </div>

          <div className="space-y-3">
            {/* Nutritional Quality Select */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Nutritional Quality
              </label>
              <select
                value={nutritionQuality}
                onChange={(e) =>
                  setNutritionQuality(e.target.value as 'Sattvic' | 'Rajasic' | 'Tamasic')
                }
                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              >
                <option value="Sattvic">Sattvic (Fresh, wholesome, pure, easily digested)</option>
                <option value="Rajasic">Rajasic (Pungent, over-stimulating, spicy/salty)</option>
                <option value="Tamasic">Tamasic (Stale, ultra-processed, heavy, lethargic)</option>
              </select>
            </div>

            {/* Digital Screen Intake Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-700">
                  Digital Screen Intake
                </label>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
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
              <div className="flex justify-between text-[10px] text-slate-400 px-0.5 mt-0.5">
                <span>0m (Minimal)</span>
                <span>120m (Balanced)</span>
                <span>360m+ (Excess)</span>
              </div>
            </div>

            {/* Sensory Mindfulness Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-700">
                  Sensory Mindfulness (Pratyahara)
                </label>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
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
              <div className="flex justify-between text-[10px] text-slate-400 px-0.5 mt-0.5">
                <span>1 (Mindless reactivity)</span>
                <span>5 (Disciplined awareness)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2. NIDRA PILLAR ================= */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-700" />
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                2. Nidrā (Restorative Sleep &amp; Rhythm)
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Circadian Health</span>
          </div>

          <div className="space-y-3">
            {/* Hours Slept Number Input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-700">
                  Hours Slept
                </label>
                <span className="text-[11px] text-slate-400">
                  Optimal: 6.5 – 8.0 hrs
                </span>
              </div>
              <input
                type="number"
                step="0.5"
                min="3"
                max="14"
                value={hoursSlept}
                onChange={(e) => setHoursSlept(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              />
            </div>

            {/* Rest Quality Select */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Rest Quality
              </label>
              <select
                value={restQuality}
                onChange={(e) =>
                  setRestQuality(
                    e.target.value as 'Restorative' | 'Disturbed' | 'Lethargic'
                  )
                }
                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              >
                <option value="Restorative">Restorative (Refreshed, clear, alert)</option>
                <option value="Disturbed">Disturbed (Frequent awakenings, racing mind)</option>
                <option value="Lethargic">Lethargic (Heavy, groggy upon waking)</option>
              </select>
            </div>

            {/* Consistent Bedtime Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="bedtimeConsistencyMobile"
                checked={bedtimeConsistency}
                onChange={(e) => setBedtimeConsistency(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-[#065F46] rounded cursor-pointer"
              />
              <label
                htmlFor="bedtimeConsistencyMobile"
                className="text-xs font-medium text-slate-700 cursor-pointer select-none"
              >
                Adhered to consistent bedtime (Circadian alignment within ±30 mins)
              </label>
            </div>
          </div>
        </div>

        {/* ================= 3. BRAHMACHARYA PILLAR ================= */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                3. Brahmacharya (Energy Stewardship &amp; Focus)
              </h3>
            </div>
            <button type="button" onClick={() => openShastraLens('brahmacharya')} className="text-[10px] text-amber-800 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded border border-amber-200 font-medium transition cursor-pointer">Shastra Lens: YS 2.38</button>
          </div>

          <div className="space-y-3">
            {/* Energy Conservation Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-700">
                  Energy Conservation Rating
                </label>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
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
              <div className="flex justify-between text-[10px] text-slate-400 px-0.5 mt-0.5">
                <span>1 (Depleted / Leaking)</span>
                <span>5 (Conserved / Potent)</span>
              </div>
            </div>

            {/* Focused Study Blocks Number Input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-700">
                  Focused Study Blocks
                </label>
                <span className="text-[11px] text-slate-400">
                  25-min Pomodoro units
                </span>
              </div>
              <input
                type="number"
                min="0"
                max="12"
                value={studyBlocks}
                onChange={(e) => setStudyBlocks(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              />
            </div>

            {/* Dominant Observed Guna Select */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Dominant Observed Guna
              </label>
              <select
                value={dominantGuna}
                onChange={(e) => setDominantGuna(e.target.value as GunaType)}
                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              >
                <option value="Sattva">Sattva (Calm, lucid, absorbed, luminous)</option>
                <option value="Rajas">Rajas (Agitated, driven, restless, multitasking)</option>
                <option value="Tamas">Tamas (Fatigued, procrastination, dull, resistant)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================= 4. DAILY REFLECTION ================= */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <label className="block text-xs font-semibold text-slate-700">
              Daily Reflection / Mindful Note
            </label>
          </div>
          <textarea
            rows={3}
            placeholder="e.g., Felt steady focus during morning study blocks, replaced late-night phone browsing with Sama Vritti breathing."
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 resize-none leading-relaxed"
          />
        </div>

        {/* Large Touch-Friendly Submit Button */}
        <button
          type="submit"
          style={{ backgroundColor: '#065F46', color: '#FFFFFF' }}
          className="w-full py-3.5 px-4 rounded-xl font-bold text-sm hover:opacity-95 transition shadow-sm active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Record Sadhana Log (Gita 6.17 Yukta Scoring)</span>
        </button>
      </form>
    </div>
  );
};

export default SadhanaMobile;
