import React, { useState } from 'react';
import { AccountProvider } from './context/AccountContext';
import { BrahmaPathProvider, useBrahmaPath } from './context/BrahmaPathContext';
import { DevHarness } from './components/DevHarness';
import {
  AppLayout,
  TopBar,
  BottomNav,
  type NavTab,
  ChariotHome,
  TridoshaBar,
  DailyVerseCard,
  BreathePage,
  DoshaBalancingCard,
  GunaProgressBar,
  VaultPage,
  FeaturesPage,
  ShastraLensDrawer,
  SettingsModal,
  SettingsPage,
  SankalpaHub,
} from './components';
import dailyVersesData from './data/dailyVerses.json';

type AppViewTab = 'home' | 'features' | 'vault' | 'breathe' | 'harness' | 'sankalpa' | 'settings';

/**
 * Main application content bound to the global IKS context, decoupled account state,
 * and unified navigation.
 */
function MainContent() {
  const {
    activeView,
    setActiveView,
    gunaDistribution,
    activeLensData,
    openShastraLens,
    closeShastraLens,
  } = useBrahmaPath();

  // Navigation tab state bound to global activeView
  const activeTab = (activeView as AppViewTab) || 'home';
  const setActiveTab = (tab: AppViewTab) => setActiveView(tab);

  // Global Settings Modal state (isolated from daily workflows)
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Today's featured shastra verse
  const todayVerse = dailyVersesData[1] || dailyVersesData[0];

  // Derive dominant Guna for DoshaBalancingCard
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
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="font-semibold tracking-wide">
                BrahmaPath Dev / Judge Harness Mode
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className="px-3.5 py-1.5 bg-[#D97706] text-white rounded-lg text-xs font-bold hover:bg-amber-700 transition flex items-center gap-1.5 shadow-xs cursor-pointer"
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
          {/* Top Bar with Sankalpa Goal Centre, isolated Settings modal trigger, and invisible judge double-click */}
          <TopBar
            onSankalpaClick={() => setActiveTab(activeTab === 'sankalpa' ? 'home' : 'sankalpa')}
            isSankalpaActive={activeTab === 'sankalpa'}
            onSettingsClick={() => setActiveTab(activeTab === 'settings' ? 'home' : 'settings')}
          />

          <main className="p-4 space-y-4">
            {/* 1. HOME TAB */}
            {activeTab === 'home' && (
              <div className="space-y-4">
                {/* Katha Upanishad Chariot Allegory with SVG crossfade */}
                <ChariotHome onInspectShastra={() => openShastraLens('chariot')} />

                {/* Live Normalized Tridosha Gradient Bar & Compassionate Remedy */}
                <TridoshaBar />

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

            {/* 2. FEATURES TAB (Sadhana Hub, Pause Gate, Bhava Compass) */}
            {activeTab === 'features' && (
              <FeaturesPage />
            )}

            {/* 3. VAULT TAB (Analytics, 14-Day Dynamic LineChart & Offline Backup) */}
            {activeTab === 'vault' && (
              <VaultPage />
            )}

            {/* 4. BREATHE TAB (Prāṇamaya Kosha Regulation) */}
            {activeTab === 'breathe' && (
              <div className="space-y-4">
                <BreathePage />
              </div>
            )}

            {/* 5. SANKALPA VIEWPORT (Personalised Intentions & Goals) */}
            {activeTab === 'sankalpa' && (
              <div className="space-y-4">
                <SankalpaHub onOpenShastraLens={openShastraLens} />
              </div>
            )}

            {/* 6. SETTINGS VIEWPORT (User Profile & Danger Zone) */}
            {activeTab === 'settings' && (
              <SettingsPage />
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
        literalMeaning={activeLensData?.literalMeaning}
        commentary={activeLensData?.literalMeaning || activeLensData?.commentaryReference || ''}
        commentaryReference={activeLensData?.commentaryReference}
        practicalApplication={activeLensData?.practicalModernApplication}
      />

      {/* Global Settings & Account Modal - Kept out of daily workflow */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onOpenDevHarness={() => setActiveTab('harness')}
      />
    </div>
  );
}

/**
 * Root Application Wrapper supplying decoupled global account state and IKS context.
 */
export default function App() {
  return (
    <AccountProvider>
      <BrahmaPathProvider>
        <MainContent />
      </BrahmaPathProvider>
    </AccountProvider>
  );
}
