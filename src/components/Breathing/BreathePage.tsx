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
              Naturally calm your mind and nervous system through guided, rhythmic breathing.
            </p>
          </div>
          <ShastraLensButton
            onClick={() => openShastraLens('breathing')}
          />
        </div>

        {/* Mode Selection Buttons in Single Horizontal Row */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-md mx-auto">
          {(
            [
              { key: 'SamaVritti', title: 'Samavritti', cycle: '4-4-4-4 Box' },
              { key: 'Relaxation478', title: 'Relaxation', cycle: '4-7-8 Box' },
              { key: 'NadiShodhana', title: 'Nadi Shodhana', cycle: '4-4-6 Box' },
            ] as const
          ).map((m) => {
            const isActive =
              breathing.mode === m.key ||
              (m.key === 'SamaVritti' && breathing.mode === 'Samavritti') ||
              (m.key === 'Relaxation478' && (breathing.mode === 'relaxation' || breathing.mode === 'Relaxation')) ||
              (m.key === 'NadiShodhana' && breathing.mode === 'Nadi Shodhana');
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => breathing.setMode(m.key)}
                style={{
                  backgroundColor: isActive ? '#065F46' : '#F1F5F9',
                  color: isActive ? '#FFFFFF' : '#334155',
                  borderColor: isActive ? '#047857' : '#E2E8F0',
                }}
                className="flex flex-col items-center justify-center py-2 px-1.5 sm:px-2 rounded-xl border text-center transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
              >
                <span className="text-xs font-bold leading-tight">
                  {m.title}
                </span>
                <span
                  style={{
                    color: isActive ? '#A7F3D0' : '#64748B',
                  }}
                  className="text-[10px] font-medium leading-tight mt-0.5"
                >
                  {m.cycle}
                </span>
              </button>
            );
          })}
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
                <span className="text-xs text-emerald-200 mt-1 uppercase tracking-wider font-bold">
                  {breathing.actionText}
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
