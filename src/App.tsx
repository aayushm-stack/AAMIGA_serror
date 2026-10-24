import React, { useState } from 'react';
import { BrahmaPathProvider, useBrahmaPath } from './context/BrahmaPathContext';
import { DevHarness } from './components/DevHarness';
import {
  AppLayout,
  TopBar,
  BottomNav,
  type NavTab,
  ChariotHome,
  DailyVerseCard,
  TrayopastambhaCard,
  BreathingCircle,
  BreathePage,
  BhavaCompassGrid,
  BhavaResultCard,
  type BhavaKey,
  type BhavaItem,
  DoshaBalancingCard,
  GunaProgressBar,
  DashboardView,
  ShastraLensDrawer,
} from './components';
import dailyVersesData from './data/dailyVerses.json';

type AppViewTab = 'home' | 'features' | 'vault' | 'breathe' | 'harness';

/**
 * Main application content bound to the global IKS context and unified navigation.
 */
function MainContent() {
  const {
    todayLog,
    addOrUpdateDailyLog,
    gunaDistribution,
    doshaDiagnosis,
    activeLensData,
    openShastraLens,
    closeShastraLens,
    exportPlainJsonBackup,
    exportEncryptedBackup,
  } = useBrahmaPath();

  // Navigation tab state: 'home' | 'features' | 'vault' | 'breathe' | 'harness'
  const [activeTab, setActiveTab] = useState<AppViewTab>('home');

  // Bhava Compass interaction state
  const [selectedBhavaKey, setSelectedBhavaKey] = useState<BhavaKey | null>(null);

  // Today's featured shastra verse
  const todayVerse = dailyVersesData[1] || dailyVersesData[0];

  // Derive dominant Guna for Milan's DoshaBalancingCard
  const dominantGunaType =
    gunaDistribution.sattva >= 55
      ? 'Sattva'
      : gunaDistribution.rajas >= gunaDistribution.tamas
      ? 'Rajas'
      : 'Tamas';

  return (
    <div className="min-h-screen bg-parchment text-charcoal font-sans antialiased">
      {/* ================= VIEW 1: DEVELOPER / JUDGE TEST HARNESS ================= */}
      {activeTab === 'harness' ? (
        <div>
          {/* Header to quickly navigate back to the Mobile UI */}
          <div className="bg-[#1E293B] text-white text-xs px-4 py-2.5 flex items-center justify-between border-b border-slate-700 sticky top-0 z-50 shadow-md">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="font-semibold tracking-wide">
                BrahmaPath Dev / Judge Harness Mode
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className="px-3 py-1 bg-[#D97706] text-white rounded text-xs font-semibold hover:bg-amber-700 transition flex items-center gap-1 shadow-xs"
            >
              📱 Back to Mobile UI
            </button>
          </div>

          {/* DevHarness component kept 100% intact for developer/judge evaluation */}
          <DevHarness />
        </div>
      ) : (
        /* ================= VIEW 2: PRODUCTION MOBILE-FIRST UI ================= */
        <AppLayout>
          {/* Top Bar with Settings (⚙️) icon switching to DevHarness */}
          <TopBar
            onProfileClick={() => openShastraLens('chariot')}
            onSettingsClick={() => setActiveTab('harness')}
          />

          <main className="p-4 space-y-4">
            {/* 1. HOME TAB */}
            {activeTab === 'home' && (
              <div className="space-y-4">
                {/* Katha Upanishad Chariot Allegory */}
                <ChariotHome />

                {/* Daily Anchor Shloka */}
                <DailyVerseCard
                  verse={todayVerse}
                  onOpenShastraLens={() => openShastraLens('trayopastambha')}
                />

                {/* Live Tri-Guna Balance Progress */}
                <GunaProgressBar distribution={gunaDistribution} />

                {/* Dosha & Circadian Balancing Recommendation */}
                <DoshaBalancingCard
                  currentGuna={dominantGunaType}
                  onInspectShastra={() => openShastraLens('gunas')}
                />
              </div>
            )}

            {/* 2. FEATURES TAB (Sadhana Hub & Bhava Compass) */}
            {activeTab === 'features' && (
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-2">
                  <h2 className="font-serif text-lg font-bold text-charcoal">
                    Features &amp; Practices
                  </h2>
                  <p className="text-xs text-charcoal/60">
                    Trayopastambha logging, YS 1.33 Bhāva Compass &amp; Interceptor
                  </p>
                </div>

                {/* Trayopastambha Logging Card */}
                <TrayopastambhaCard
                  value={todayLog?.ahara.sensoryMindfulnessScore ?? 4}
                  onValueChange={(val) => {
                    const today = new Date().toISOString().split('T')[0];
                    const existingAhara = todayLog?.ahara ?? {
                      nutritionQuality: 'Sattvic',
                      digitalConsumptionMinutes: 90,
                      sensoryMindfulnessScore: 4,
                    };
                    const existingNidra = todayLog?.nidra ?? {
                      hoursSlept: 7.5,
                      bedtimeConsistency: true,
                      restQuality: 'Restorative',
                    };
                    const existingBrahmacharya = todayLog?.brahmacharya ?? {
                      energyConservationRating: 4,
                      focusedStudyBlocks: 4,
                      dominantGuna: 'Sattva',
                    };

                    addOrUpdateDailyLog(
                      {
                        date: today,
                        ahara: {
                          ...existingAhara,
                          sensoryMindfulnessScore: val,
                        },
                        nidra: existingNidra,
                        brahmacharya: existingBrahmacharya,
                      },
                      82
                    );
                  }}
                  onInspectShastra={() => openShastraLens('trayopastambha')}
                />

                {/* Bhāva Compass (Chitta Prasādanam - YS 1.33) */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-sm font-bold text-charcoal">
                      Bhāva Compass (YS 1.33)
                    </h3>
                    <button
                      type="button"
                      onClick={() => openShastraLens('chitta_prasadanam')}
                      className="text-xs font-semibold text-[#065F46] hover:underline"
                    >
                      [Shastra Lens]
                    </button>
                  </div>

                  {!selectedBhavaKey ? (
                    <BhavaCompassGrid
                      onSelect={(item: BhavaItem) => setSelectedBhavaKey(item.key)}
                      selectedKey={selectedBhavaKey}
                      onInspectShastra={() => openShastraLens('chitta_prasadanam')}
                    />
                  ) : (
                    <BhavaResultCard
                      attitude={
                        selectedBhavaKey === 'mudita'
                          ? 'Mudita'
                          : selectedBhavaKey === 'maitri'
                          ? 'Maitri'
                          : selectedBhavaKey === 'karuna'
                          ? 'Karuna'
                          : 'Upeksha'
                      }
                      onBack={() => setSelectedBhavaKey(null)}
                      onSubmit={(reflection) => {
                        alert(`Reflection saved to sadhana memory: "${reflection}"`);
                        setSelectedBhavaKey(null);
                      }}
                    />
                  )}
                </div>

                {/* Pause Gate Shortcut */}
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center justify-between shadow-xs">
                  <div>
                    <h4 className="text-xs font-bold text-[#D97706] uppercase tracking-wider">
                      Pause Gate (Loop Breaker)
                    </h4>
                    <p className="text-xs text-charcoal/70 mt-0.5">
                      Gita 2.62-63 urge interceptor and cognitive reframe.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('harness')}
                    className="px-3 py-1.5 bg-[#D97706] text-white text-xs font-semibold rounded-xl hover:bg-amber-700 transition shadow-xs"
                  >
                    Launch Gate
                  </button>
                </div>
              </div>
            )}

            {/* 3. VAULT TAB (Analytics & Offline Backup) */}
            {activeTab === 'vault' && (
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-2">
                  <h2 className="font-serif text-lg font-bold text-charcoal">
                    Vault &amp; Analytics
                  </h2>
                  <p className="text-xs text-charcoal/60">
                    Equilibrium metrics, trigger analytics, and encrypted storage
                  </p>
                </div>

                {/* Milan's Dashboard Analytics View */}
                <DashboardView
                  gunaDistribution={gunaDistribution}
                  onInspectShastra={() => openShastraLens('gunas')}
                />

                {/* Client-Side Vault Actions */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3">
                  <h3 className="font-serif text-sm font-bold text-charcoal">
                    Data Sovereignty &amp; Offline Backup
                  </h3>
                  <p className="text-xs text-slate-500">
                    BrahmaPath runs 100% locally on your device without cloud telemetry.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={exportPlainJsonBackup}
                      className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded-xl transition border border-slate-200"
                    >
                      Export JSON
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('harness')}
                      className="py-2 px-3 bg-[#065F46] hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition shadow-xs"
                    >
                      Encrypted Vault (.bplock)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 4. BREATHE TAB (Prāṇamaya Kosha Regulation) */}
            {activeTab === 'breathe' && (
              <div className="space-y-4">
                <BreathePage />
              </div>
            )}
          </main>

          {/* 4-Icon Bottom Navigation */}
          <BottomNav
            activeTab={activeTab as NavTab}
            onTabChange={(tab) => setActiveTab(tab)}
          />
        </AppLayout>
      )}

      {/* Slide-out Shastra Lens Drawer */}
      <ShastraLensDrawer
        isOpen={Boolean(activeLensData)}
        onClose={closeShastraLens}
        verse={activeLensData?.sanskritVerse ?? ''}
        transliteration={activeLensData?.transliteration}
        source={activeLensData?.sourceText}
        commentary={activeLensData?.commentaryReference ?? ''}
        practicalApplication={activeLensData?.practicalModernApplication}
      />
    </div>
  );
}

/**
 * Root Application Wrapper supplying global context.
 */
export default function App() {
  return (
    <BrahmaPathProvider>
      <MainContent />
    </BrahmaPathProvider>
  );
}
