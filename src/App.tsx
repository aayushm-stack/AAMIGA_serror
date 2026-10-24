import React from 'react';
import { BrahmaPathProvider } from './context/BrahmaPathContext';
import { DevHarness } from './components/DevHarness';

/**
 * BrahmaPath Application Root (Phase 3 Integration Entrypoint):
 *
 * Provides global state and pure IKS logic engines to the UI hierarchy
 * via <BrahmaPathProvider>.
 *
 * DEV-2 (Milan) INTEGRATION MAP:
 * Once Dev-2 finishes styling the presentational components in `/src/components/*`,
 * they seamlessly replace the interactive sections inside DevHarness or mount
 * directly below using `useBrahmaPath()`:
 *
 * 1. Chariot Dashboard:
 *    -> `/src/components/Chariot/ChariotHome.tsx`
 *    -> `/src/components/Layout/TopBar.tsx`
 *
 * 2. Daily Sadhana Sliders:
 *    -> `/src/components/YuktaLog/TrayopastambhaCard.tsx`
 *
 * 3. Loop Interceptor & Pause Gate:
 *    -> `/src/components/Interceptor/CascadeVisualizer.tsx`
 *    -> `/src/components/Interceptor/InterceptorModal.tsx`
 *    -> `/src/components/Interceptor/PratipakshaForm.tsx`
 *
 * 4. Concentric Breathing Pacer:
 *    -> `/src/components/Breathing/BreathingCircle.tsx`
 *
 * 5. YS 1.33 Emotional Reappraisal:
 *    -> `/src/components/Compass/BhavaCompass.tsx`
 *
 * 6. Tri-Guna & Habit Analytics:
 *    -> `/src/components/Analytics/GunaPieChart.tsx`
 *    -> `/src/components/Analytics/HabitTrends.tsx`
 *
 * 7. Slide-out Shastra Lens Drawer:
 *    -> `/src/components/Shastra/ShastraLens.tsx`
 *
 * 8. Mobile Navigation:
 *    -> `/src/components/Layout/BottomNav.tsx`
 */
export default function App() {
  return (
    <BrahmaPathProvider>
      <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] antialiased selection:bg-amber-200 selection:text-amber-900">
        <main className="w-full">
          {/*
            Interactive Dev Harness for Phase 1 & 2 verification.
            Exposes complete end-to-end functionality across all 6 IKS modules.
          */}
          <DevHarness />
        </main>
      </div>
    </BrahmaPathProvider>
  );
}
