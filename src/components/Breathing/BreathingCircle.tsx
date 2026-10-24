import React, { useState, useEffect } from 'react';

export type BreathPhase = 'Inhale' | 'Hold' | 'Exhale';
export type BreathMode = 'Sama Vritti (4-4-4)' | 'Relaxation (4-7-8)';

interface BreathingCircleProps {
  mode?: BreathMode;
  onCycleComplete?: (completedCycles: number) => void;
  className?: string;
}

export const BreathingCircle: React.FC<BreathingCircleProps> = ({
  mode = 'Sama Vritti (4-4-4)',
  onCycleComplete,
  className = '',
}) => {
  const [phase, setPhase] = useState<BreathPhase>('Inhale');
  const [secondsLeft, setSecondsLeft] = useState<number>(4);
  const [cycleCount, setCycleCount] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [selectedMode, setSelectedMode] = useState<BreathMode>(mode);

  // Phase timings in seconds
  const phaseDurations = selectedMode === 'Sama Vritti (4-4-4)'
    ? { Inhale: 4, Hold: 4, Exhale: 4 }
    : { Inhale: 4, Hold: 7, Exhale: 8 };

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Transition to next phase
        if (phase === 'Inhale') {
          setPhase('Hold');
          return phaseDurations.Hold;
        } else if (phase === 'Hold') {
          setPhase('Exhale');
          return phaseDurations.Exhale;
        } else {
          // Exhale finished -> complete 1 cycle, return to Inhale
          setCycleCount((c) => {
            const next = c + 1;
            onCycleComplete?.(next);
            return next;
          });
          setPhase('Inhale');
          return phaseDurations.Inhale;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase, selectedMode, phaseDurations, onCycleComplete]);

  // Determine scale and mantra text based on phase
  const isExpanded = phase === 'Inhale' || phase === 'Hold';
  const currentDuration = phaseDurations[phase];

  const phaseInstruction = {
    Inhale: 'Inhale Prana',
    Hold: 'Retain Stillness',
    Exhale: 'Exhale Agitation',
  }[phase];

  const handleReset = () => {
    setPhase('Inhale');
    setSecondsLeft(phaseDurations.Inhale);
    setCycleCount(0);
    setIsActive(true);
  };

  return (
    <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
      {/* Mode Selector Tabs */}
      <div className="flex bg-slate-100 rounded-xl p-1 mb-8 shadow-inner">
        {(['Sama Vritti (4-4-4)', 'Relaxation (4-7-8)'] as BreathMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setSelectedMode(m);
              setPhase('Inhale');
              setSecondsLeft(4);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              selectedMode === m
                ? 'bg-white text-sage font-semibold shadow-xs'
                : 'text-charcoal/60 hover:text-charcoal'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Samsung Health-Style Centered Concentric Breathing Visualizer */}
      <div className="relative w-72 h-72 flex items-center justify-center my-4">
        {/* Outermost Translucent Aura Ring */}
        <div
          style={{
            transitionDuration: `${currentDuration}s`,
          }}
          className={`absolute w-64 h-64 rounded-full bg-sage/10 transition-transform ease-in-out ${
            isExpanded ? 'scale-[1.5]' : 'scale-100'
          }`}
        />

        {/* Middle Translucent Aura Ring */}
        <div
          style={{
            transitionDuration: `${currentDuration}s`,
          }}
          className={`absolute w-52 h-52 rounded-full bg-sage/20 transition-transform ease-in-out ${
            isExpanded ? 'scale-[1.35]' : 'scale-100'
          }`}
        />

        {/* Core Glowing Sage Circle */}
        <div
          style={{
            transitionDuration: `${currentDuration}s`,
          }}
          className={`relative z-10 w-36 h-36 rounded-full bg-sage text-parchment flex flex-col items-center justify-center transition-transform ease-in-out shadow-[0_0_50px_rgba(6,95,70,0.4)] ${
            isExpanded ? 'scale-[1.5]' : 'scale-100'
          }`}
        >
          <span className="font-serif tracking-wide text-xs uppercase font-medium opacity-90">
            {phase}
          </span>
          <span className="text-3xl font-light tracking-tight my-0.5">
            {secondsLeft}s
          </span>
          <span className="text-[10px] opacity-75 font-serif italic">
            {selectedMode === 'Relaxation (4-7-8)' ? '4-7-8' : '4-4-4'}
          </span>
        </div>
      </div>

      {/* Synchronized Verbal Guidance */}
      <div className="text-center mt-10">
        <h4 className="font-serif text-lg font-medium text-sage">
          {phaseInstruction}
        </h4>
        <p className="text-xs text-charcoal/60 mt-1">
          Cycle count: <span className="font-semibold text-charcoal">{cycleCount}</span>
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mt-6">
        <button
          type="button"
          onClick={() => setIsActive((prev) => !prev)}
          className="px-5 py-2 text-xs font-semibold rounded-xl bg-sage text-parchment hover:bg-sage/90 shadow-sm transition-colors"
        >
          {isActive ? 'Pause' : 'Resume'}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-xs font-medium rounded-xl border border-slate-200 text-charcoal/70 hover:bg-slate-50 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default BreathingCircle;
