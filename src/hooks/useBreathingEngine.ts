import { useState, useEffect, useRef, useCallback } from 'react';
import { BreathingMode, BreathPhase } from '../types/iks';

/**
 * Phase timing specification in seconds along with classical and modern labels.
 */
interface PhaseConfig {
  phase: BreathPhase;
  duration: number; // Duration in seconds
  phaseLabel: string;
  sanskritLabel: string;
}

/**
 * Pranayama timings rooted in traditional texts and modern autonomic modulation:
 * - Sama Vritti (Yoga Sutra 2.49): Equal 4-4-4-4 box pacing.
 * - Relaxation 4-7-8 (Dr. Weil / Parasympathetic vagal brake): 4-7-8-0 pacing.
 * - Nadi Shodhana (Hatha Yoga Pradipika 2.7-10): 4-4-6-0 alternate purification.
 */
const MODE_CONFIGS: Record<BreathingMode, PhaseConfig[]> = {
  SamaVritti: [
    {
      phase: 'Puraka_Inhale',
      duration: 4,
      phaseLabel: 'Inhale steadily',
      sanskritLabel: 'Pūraka (पूरक)',
    },
    {
      phase: 'Antara_Kumbhaka_Hold',
      duration: 4,
      phaseLabel: 'Hold full breath',
      sanskritLabel: 'Antara Kumbhaka (अन्तर कुम्भक)',
    },
    {
      phase: 'Rechaka_Exhale',
      duration: 4,
      phaseLabel: 'Exhale smoothly',
      sanskritLabel: 'Recaka (रेचक)',
    },
    {
      phase: 'Bahya_Kumbhaka_Hold',
      duration: 4,
      phaseLabel: 'Hold empty pause',
      sanskritLabel: 'Bāhya Kumbhaka (बाह्य कुम्भक)',
    },
  ],
  Relaxation478: [
    {
      phase: 'Puraka_Inhale',
      duration: 4,
      phaseLabel: 'Inhale deeply through nose',
      sanskritLabel: 'Pūraka (पूरक)',
    },
    {
      phase: 'Antara_Kumbhaka_Hold',
      duration: 7,
      phaseLabel: 'Retain breath gently',
      sanskritLabel: 'Antara Kumbhaka (अन्तर कुम्भक)',
    },
    {
      phase: 'Rechaka_Exhale',
      duration: 8,
      phaseLabel: 'Slow, audible exhalation',
      sanskritLabel: 'Recaka (रेचक)',
    },
  ],
  NadiShodhana: [
    {
      phase: 'Puraka_Inhale',
      duration: 4,
      phaseLabel: 'Inhale through nostril',
      sanskritLabel: 'Pūraka (पूरक)',
    },
    {
      phase: 'Antara_Kumbhaka_Hold',
      duration: 4,
      phaseLabel: 'Retain both nostrils',
      sanskritLabel: 'Antara Kumbhaka (अन्तर कुम्भक)',
    },
    {
      phase: 'Rechaka_Exhale',
      duration: 6,
      phaseLabel: 'Exhale opposite nostril',
      sanskritLabel: 'Recaka (रेचक)',
    },
  ],
};

/**
 * Custom React hook powering the Breathing Sanctum visual pacer.
 * Manages high-precision 100ms interval cycles, phase progress,
 * and smooth scale interpolation for circular animations.
 */
export function useBreathingEngine(initialMode: BreathingMode = 'SamaVritti') {
  const [mode, setModeState] = useState<BreathingMode>(initialMode);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [phaseIndex, setPhaseIndex] = useState<number>(0);
  const [elapsedInPhaseMs, setElapsedInPhaseMs] = useState<number>(0);
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  const phaseIndexRef = useRef<number>(0);
  phaseIndexRef.current = phaseIndex;

  // Run 100ms interval timer when active
  useEffect(() => {
    if (!isActive) return;

    const phases = MODE_CONFIGS[mode];
    const intervalId = window.setInterval(() => {
      setElapsedInPhaseMs((prevElapsed) => {
        const currentConfig = phases[phaseIndexRef.current];
        const phaseDurationMs = currentConfig.duration * 1000;
        const nextElapsed = prevElapsed + 100;

        if (nextElapsed >= phaseDurationMs) {
          const nextIndex = phaseIndexRef.current + 1;
          if (nextIndex >= phases.length) {
            // Completed a full pranayama cycle
            phaseIndexRef.current = 0;
            setPhaseIndex(0);
            setCompletedCycles((c) => c + 1);
          } else {
            phaseIndexRef.current = nextIndex;
            setPhaseIndex(nextIndex);
          }
          return 0;
        }

        return nextElapsed;
      });
    }, 100);

    return () => window.clearInterval(intervalId);
  }, [isActive, mode]);

  const start = useCallback(() => {
    setIsActive(true);
  }, []);

  const pause = useCallback(() => {
    setIsActive(false);
  }, []);

  const reset = useCallback(() => {
    setIsActive(false);
    setPhaseIndex(0);
    phaseIndexRef.current = 0;
    setElapsedInPhaseMs(0);
    setCompletedCycles(0);
  }, []);

  const setMode = useCallback((newMode: BreathingMode) => {
    setModeState(newMode);
    setIsActive(false);
    setPhaseIndex(0);
    phaseIndexRef.current = 0;
    setElapsedInPhaseMs(0);
  }, []);

  // Compute derived state
  const currentPhaseConfig = isActive ? MODE_CONFIGS[mode][phaseIndex] : null;

  const phase: BreathPhase =
    isActive && currentPhaseConfig ? currentPhaseConfig.phase : 'Idle';

  const phaseDuration = currentPhaseConfig ? currentPhaseConfig.duration : 0;

  const phaseProgress =
    phaseDuration > 0
      ? Math.min(1, Math.max(0, elapsedInPhaseMs / (phaseDuration * 1000)))
      : 0;

  const secondsRemainingInPhase =
    phaseDuration > 0
      ? Math.max(0, Math.ceil((phaseDuration * 1000 - elapsedInPhaseMs) / 1000))
      : 0;

  // Smooth visual scale interpolation: 1.0 (min) to 1.45 (max)
  let visualScale = 1.0;
  if (phase === 'Puraka_Inhale') {
    visualScale = 1.0 + phaseProgress * 0.45;
  } else if (phase === 'Antara_Kumbhaka_Hold') {
    visualScale = 1.45;
  } else if (phase === 'Rechaka_Exhale') {
    visualScale = 1.45 - phaseProgress * 0.45;
  } else if (phase === 'Bahya_Kumbhaka_Hold') {
    visualScale = 1.0;
  } else {
    visualScale = 1.0;
  }

  const phaseLabel = currentPhaseConfig
    ? currentPhaseConfig.phaseLabel
    : 'Ready to begin Pranayama';

  const sanskritLabel = currentPhaseConfig
    ? currentPhaseConfig.sanskritLabel
    : 'Sthiti (स्थिति)';

  return {
    mode,
    setMode,
    isActive,
    start,
    pause,
    reset,
    phase,
    phaseLabel,
    sanskritLabel,
    secondsRemainingInPhase,
    phaseProgress,
    visualScale,
    completedCycles,
  };
}
