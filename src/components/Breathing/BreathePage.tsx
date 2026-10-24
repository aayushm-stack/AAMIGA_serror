import React from 'react';
import { ShastraLensButton } from '../Shastra/ShastraLensButton';
import { useBreathingEngine } from '../../hooks/useBreathingEngine';
import { useBrahmaPath } from '../../context/BrahmaPathContext';

export interface BreathePageProps {
  className?: string;
}

/**
 * Standalone mobile Breathing Sanctum page replicating the exact
 * engine logic, visual concentric circles, and Shastra controls
 * from the Judge / Dev Harness.
 */
export const BreathePage: React.FC<BreathePageProps> = ({ className = '' }) => {
  const { openShastraLens } = useBrahmaPath();
  const breathing = useBreathingEngine('SamaVritti');

  return (
    <div
      style={{
        backgroundColor: '#FDFBF7',
        color: '#1E293B',
      }}
      className={`w-full min-h-full pb-8 ${className}`}
    >
      <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm space-y-6 text-center">
        {/* Header with Title and Shastra Lens Trigger */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-left">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Breathing Sanctum
            </h2>
            <p className="text-xs text-slate-500">
              Autonomic vagal brake via cyclic exhalations and kumbhaka.
            </p>
          </div>
          <ShastraLensButton
            onClick={() => openShastraLens('breathing')}
          />
        </div>

        {/* Mode Selection Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {(
            [
              { key: 'SamaVritti', label: 'Sama Vritti (4-4-4-4 Box)' },
              { key: 'Relaxation478', label: 'Relaxation (4-7-8)' },
              { key: 'NadiShodhana', label: 'Nadi Shodhana (4-4-6)' },
            ] as const
          ).map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => breathing.setMode(m.key)}
              style={{
                backgroundColor: breathing.mode === m.key ? '#065F46' : '#F1F5F9',
                color: breathing.mode === m.key ? '#FFFFFF' : '#334155',
              }}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer"
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Concentric Animated Circle Bound to visualScale with anti-overlap container */}
        <div className="flex flex-col items-center justify-center pt-2 pb-4">
          {/* Reserved height container guarantees 1.45x scaled circle never overlaps surrounding content */}
          <div className="w-full h-80 flex items-center justify-center">
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                backgroundColor: '#DEF7EC',
                borderColor: '#065F46',
                borderWidth: 4,
                borderStyle: 'solid',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `scale(${breathing.visualScale})`,
                transition: 'transform 100ms linear',
                boxShadow: '0 10px 25px -5px rgba(6, 95, 70, 0.2)',
              }}
            >
              <div
                style={{
                  width: 130,
                  height: 130,
                  borderRadius: '50%',
                  backgroundColor: '#065F46',
                  color: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 8,
                }}
              >
                <span className="text-3xl font-extrabold tracking-tight">
                  {breathing.secondsRemainingInPhase}s
                </span>
                <span className="text-[10px] text-emerald-200 mt-1 uppercase tracking-wider font-semibold">
                  {breathing.phase.replace('_', ' ').split(' ')[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Phase Guidance & Cycles with comfortable spacing */}
          <div className="mt-4 space-y-1">
            <p className="text-base font-bold text-slate-800">
              {breathing.phaseLabel}
            </p>
            <p className="text-xs text-emerald-800 font-semibold">
              {breathing.sanskritLabel}
            </p>
            <p className="text-xs text-slate-400">
              Completed Cycles: {breathing.completedCycles}
            </p>
          </div>
        </div>

        {/* Playback & Reset Controls */}
        <div className="flex justify-center gap-3 pt-2">
          {!breathing.isActive ? (
            <button
              type="button"
              onClick={breathing.start}
              style={{ backgroundColor: '#065F46', color: '#FFFFFF' }}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm hover:opacity-95 transition shadow-xs cursor-pointer"
            >
              Start Pranayama
            </button>
          ) : (
            <button
              type="button"
              onClick={breathing.pause}
              style={{ backgroundColor: '#D97706', color: '#FFFFFF' }}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm hover:opacity-95 transition shadow-xs cursor-pointer"
            >
              Pause
            </button>
          )}
          <button
            type="button"
            onClick={breathing.reset}
            style={{
              backgroundColor: '#F1F5F9',
              color: '#475569',
              borderColor: '#CBD5E1',
            }}
            className="px-4 py-2.5 rounded-xl border text-sm font-medium hover:bg-slate-200 transition cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreathePage;
