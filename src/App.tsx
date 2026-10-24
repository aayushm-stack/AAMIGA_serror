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
  BhavaCompassGrid,
  BhavaResultCard,
  type BhavaKey,
  DoshaBalancingCard,
  GunaProgressBar,
  DashboardView,
  ShastraLensDrawer,
} from './components';
import dailyVersesData from './data/dailyVerses.json';

/**
 * Main application interior connected to live IKS logic via useBrahmaPath().
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
  } = useBrahmaPath();

  // Active view mode: production Mobile UI or full Judge/Dev Harness
  const [viewMode, setViewMode] = useState<'mobile' | 'harness'>('mobile');
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  // Bhava Compass interaction state
  const [selectedBhavaKey, setSelectedBhavaKey] = useState<BhavaKey | null>(null);

  // Today's featured verse
  const todayVerse = dailyVersesData[1] || dailyVersesData[0];

  // Convert Dosha diagnosis to Guna state for Milan's DoshaBalancingCard
  const dominantGunaType =
    gunaDistribution.sattva >= 55
      ? 'Sattva'
      : gunaDistribution.rajas >= gunaDistribution.tamas
      ? 'Rajas'
      : 'Tamas';

  return (
    <div className="min-h-screen bg-parchment text-charcoal font-sans antialiased">
      {/* Top Banner to switch between Production Mobile UI & Deep Dev Harness */}
      <div className="bg-charcoal text-white text-xs px-4 py-2 flex items-center justify-between border-b border-charcoal/30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold tracking-wide">BrahmaPath 2.0 (IKS IIT Roorkee)</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setViewMode('mobile')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
              viewMode === 'mobile'
                ? 'bg-terracotta text-white shadow-xs'
                : 'text-white/70 hover:text-white'
            }`}
          >
            📱 Mobile UI
          </button>
          <button
            type="button"
            onClick={() => setViewMode('harness')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
              viewMode === 'harness'
                ? 'bg-terracotta text-white shadow-xs'
                : 'text-white/70 hover:text-white'
            }`}
          >
            🛠️ Judge Harness
          </button>
        </div>
      </div>

      {viewMode === 'harness' ? (
        /* Full End-to-End Judge & Developer Test Harness */
        <DevHarness />
      ) : (
        /* Milan's Production Mobile-First Layout */
        <AppLayout>
          {/* Top Bar with Shastra Trigger */}
          <TopBar
            onProfileClick={() => openShastraLens('chariot')}
            onSettingsClick={() => setViewMode('harness')}
          />

          <main className="p-4 space-y-4">
            {/* ================= TAB 1: HOME ================= */}
            {activeTab === 'home' && (
              <div className="space-y-4">
                {/* Katha Upanishad Chariot Allegory */}
                <ChariotHome />

                {/* Daily Gita / Sutra Anchor Verse */}
                <DailyVerseCard
                  verse={todayVerse}
                  onOpenShastraLens={() => openShastraLens('trayopastambha')}
                />

                {/* Live Guna Distribution Progress */}
                <GunaProgressBar distribution={gunaDistribution} />

                {/* Dosha & Circadian Balancing Recommendation */}
                <DoshaBalancingCard
                  currentGuna={dominantGunaType}
                  onInspectShastra={() => openShastraLens('gunas')}
                />
              </div>
            )}

            {/* ================= TAB 2: TRAYOPASTAMBHA LOG ================= */}
            {activeTab === 'log' && (
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h2 className="font-serif text-lg font-bold text-charcoal">
                    Trayopastambha (The 3 Pillars)
                  </h2>
                  <p className="text-xs text-charcoal/60">
                    Charaka Samhita Sutrasthana 11.35
                  </p>
                </div>

                {/* Ahara Sensory Intake Card */}
                <TrayopastambhaCard
                  value={todayLog?.ahara.sensoryMindfulnessScore ?? 3}
                  onValueChange={(val) => {
                    const today = new Date().toISOString().split('T')[0];
                    const existingAhara = todayLog?.ahara ?? {
                      nutritionQuality: 'Sattvic',
                      digitalConsumptionMinutes: 90,
                      sensoryMindfulnessScore: 3,
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
                      78
                    );
                  }}
                  onInspectShastra={() => openShastraLens('trayopastambha')}
                />

                {/* Quick Pause Gate Trigger Shortcut */}
                <div className="p-4 bg-orange-50/60 border border-orange-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-terracotta-dark uppercase tracking-wider">
                      Feeling the Compulsive Pull?
                    </h4>
                    <p className="text-xs text-charcoal/70">
                      Engage the 90-second Gita 2.62 Pause Gate.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('harness');
                    }}
                    className="px-3 py-1.5 bg-terracotta text-white text-xs font-semibold rounded-xl hover:bg-terracotta-dark transition shadow-xs"
                  >
                    Open Gate
                  </button>
                </div>
              </div>
            )}

            {/* ================= TAB 3: BHAVA COMPASS ================= */}
            {activeTab === 'compass' && (
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h2 className="font-serif text-lg font-bold text-charcoal">
                    Bhāva Compass (Chitta Prasādanam)
                  </h2>
                  <p className="text-xs text-charcoal/60">
                    Patanjali Yoga Sutras 1.33
                  </p>
                </div>

                {!selectedBhavaKey ? (
                  <BhavaCompassGrid
                    onSelect={(item) => setSelectedBhavaKey(item.key)}
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
                    onSubmit={(reframe) => {
                      alert(`Reflective thought grounded in YS 1.33: "${reframe}"`);
                      setSelectedBhavaKey(null);
                    }}
                  />
                )}
              </div>
            )}

            {/* ================= TAB 4: BREATHING SANCTUM ================= */}
            {activeTab === 'breathe' && (
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h2 className="font-serif text-lg font-bold text-charcoal">
                    Breathing Sanctum
                  </h2>
                  <p className="text-xs text-charcoal/60">
                    Prāṇamaya Kosha Autonomic Regulation
                  </p>
                </div>

                {/* Milan's Interactive Concentric Rings Breathing Circle */}
                <BreathingCircle />
              </div>
            )}
          </main>

          {/* Bottom Navigation */}
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </AppLayout>
      )}

      {/* Universal Shastra Lens Slide-out Drawer */}
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
