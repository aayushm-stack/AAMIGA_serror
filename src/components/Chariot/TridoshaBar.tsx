import React from 'react';
import { useBrahmaPath } from '../../context/BrahmaPathContext';
import { DoshaType } from '../../types/iks';
import { Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

export interface TridoshaBarProps {
  vata?: number;
  pitta?: number;
  kapha?: number;
  remedy?: string;
  dominantDosha?: DoshaType;
  onInspectShastra?: () => void;
  className?: string;
}

/**
 * Tridosha Biological Balance visualizer.
 * Normalizes Vata, Pitta, and Kapha to strictly equal 100%,
 * renders a soft horizontal shifting color gradient:
 * - Slate (#64748B) for Vata (Air/Space)
 * - Terracotta (#D97706) for Pitta (Fire/Water)
 * - Forest Green (#065F46) for Kapha (Water/Earth)
 *
 * Below the gradient, outputs a compassionate, one-line physical remedy.
 */
export const TridoshaBar: React.FC<TridoshaBarProps> = ({
  vata,
  pitta,
  kapha,
  remedy,
  dominantDosha,
  onInspectShastra,
  className = '',
}) => {
  const context = useBrahmaPath();

  // Read from props if supplied, otherwise fallback to global context diagnosis
  const diag = context.doshaDiagnosis;

  const rawVata = vata ?? diag?.doshaScores?.vata ?? 10;
  const rawPitta = pitta ?? diag?.doshaScores?.pitta ?? 10;
  const rawKapha = kapha ?? diag?.doshaScores?.kapha ?? 10;

  // Strict normalization guaranteeing vataPct + pittaPct + kaphaPct === 100%
  const total = rawVata + rawPitta + rawKapha || 1;
  const vataPct = Math.max(5, Math.round((rawVata / total) * 100));
  const pittaPct = Math.max(5, Math.round((rawPitta / total) * 100));
  // Guarantee exact sum of 100%
  const kaphaPct = Math.max(5, 100 - (vataPct + pittaPct));

  // Active dominant dosha
  const activeDominant: DoshaType =
    dominantDosha ?? diag?.aggravatedDosha ?? (
      vataPct >= pittaPct && vataPct >= kaphaPct
        ? 'Vata'
        : pittaPct >= vataPct && pittaPct >= kaphaPct
        ? 'Pitta'
        : 'Kapha'
    );

  // Compassionate one-line physical remedy
  const physicalRemedy =
    remedy ??
    diag?.physicalRemedy ??
    (activeDominant === 'Vata'
      ? 'High Vata detected: Step away from screens for 10 minutes and sip warm water.'
      : activeDominant === 'Pitta'
      ? 'High Pitta detected: Cool mental heat with 3 minutes of Sheetali breathing and splash cold water on your face and eyes.'
      : 'High Kapha detected: Counter physical stagnation with 10 brisk Surya Namaskars or a 10-minute brisk walk in fresh air.');

  const handleInspect = onInspectShastra ?? (() => context.openShastraLens('gunas'));

  // Color Stops for smooth horizontal shifting gradient
  const vataEnd = Math.max(0, Math.min(90, vataPct));
  const pittaEnd = Math.max(vataEnd + 5, Math.min(95, vataPct + pittaPct));

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
      }}
      className={`rounded-2xl border shadow-xs p-5 sm:p-6 space-y-4 ${className}`}
    >
      {/* Header with Title and Shastra Lens Trigger */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D97706] animate-pulse" />
            <h3 className="text-base font-bold text-slate-900">
              Tridosha Biological Balance
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Charaka Samhita dynamic humor diagnosis normalized to 100%
          </p>
        </div>

        <button
          type="button"
          onClick={handleInspect}
          style={{ color: '#065F46' }}
          className="text-xs font-semibold hover:underline cursor-pointer flex-shrink-0 ml-2"
        >
          [Inspect Shastra Lens]
        </button>
      </div>

      {/* Numerical Proportional Badges */}
      <div className="grid grid-cols-3 gap-2">
        {/* Vata Badge (Slate) */}
        <div
          style={{
            backgroundColor: activeDominant === 'Vata' ? '#F1F5F9' : '#F8FAFC',
            borderColor: activeDominant === 'Vata' ? '#64748B' : '#E2E8F0',
          }}
          className={`p-2.5 rounded-xl border text-center transition-all ${
            activeDominant === 'Vata' ? 'ring-2 ring-slate-400/40 shadow-xs' : ''
          }`}
        >
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            <span className="text-[11px] font-bold text-slate-700">Vata</span>
          </div>
          <span className="text-base font-extrabold text-slate-800">{vataPct}%</span>
          <span className="text-[10px] text-slate-400 block">Air &amp; Space</span>
        </div>

        {/* Pitta Badge (Terracotta) */}
        <div
          style={{
            backgroundColor: activeDominant === 'Pitta' ? '#FEF3C7' : '#F8FAFC',
            borderColor: activeDominant === 'Pitta' ? '#D97706' : '#E2E8F0',
          }}
          className={`p-2.5 rounded-xl border text-center transition-all ${
            activeDominant === 'Pitta' ? 'ring-2 ring-amber-500/40 shadow-xs' : ''
          }`}
        >
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
            <span className="text-[11px] font-bold text-amber-900">Pitta</span>
          </div>
          <span className="text-base font-extrabold text-[#D97706]">{pittaPct}%</span>
          <span className="text-[10px] text-slate-400 block">Fire &amp; Water</span>
        </div>

        {/* Kapha Badge (Forest Green) */}
        <div
          style={{
            backgroundColor: activeDominant === 'Kapha' ? '#DEF7EC' : '#F8FAFC',
            borderColor: activeDominant === 'Kapha' ? '#065F46' : '#E2E8F0',
          }}
          className={`p-2.5 rounded-xl border text-center transition-all ${
            activeDominant === 'Kapha' ? 'ring-2 ring-emerald-600/40 shadow-xs' : ''
          }`}
        >
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-[#065F46]" />
            <span className="text-[11px] font-bold text-emerald-900">Kapha</span>
          </div>
          <span className="text-base font-extrabold text-[#065F46]">{kaphaPct}%</span>
          <span className="text-[10px] text-slate-400 block">Water &amp; Earth</span>
        </div>
      </div>

      {/* Soft Horizontal Shifting Color Gradient */}
      <div className="space-y-1.5 pt-1">
        <div className="flex justify-between text-[11px] font-semibold text-slate-500 px-0.5">
          <span>Slate (Vata: {vataPct}%)</span>
          <span>Terracotta (Pitta: {pittaPct}%)</span>
          <span>Forest Green (Kapha: {kaphaPct}%)</span>
        </div>

        {/* Continuous Soft Gradient Track */}
        <div className="relative w-full h-4 rounded-full overflow-hidden shadow-inner bg-slate-100 p-0.5">
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '9999px',
              background: `linear-gradient(90deg, 
                #64748B 0%, 
                #64748B ${Math.max(0, vataEnd - 4)}%, 
                #D97706 ${vataEnd + 4}%, 
                #D97706 ${Math.max(vataEnd + 5, pittaEnd - 4)}%, 
                #065F46 ${pittaEnd + 4}%, 
                #065F46 100%)`,
              transition: 'background 700ms ease-in-out',
            }}
            className="transition-all duration-700 ease-out shadow-xs"
          />
        </div>
      </div>

      {/* Compassionate One-Line Physical Remedy */}
      <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-start gap-2.5 shadow-2xs">
        <HeartHandshake className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
            Ayurvedic Physical Remedy
          </span>
          <p className="text-xs text-amber-950 font-medium leading-relaxed">
            {physicalRemedy}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TridoshaBar;
