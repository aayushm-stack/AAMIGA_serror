// Layout Components
export { AppLayout } from './Layout/AppLayout';
export { TopBar } from './Layout/TopBar';
export { BottomNav, type NavTab } from './Layout/BottomNav';

// Sadhana Hub Components
export { DailyVerseCard, type DailyVerse } from './SadhanaHub/DailyVerseCard';

// Katha Upanishad Chariot Component
export { ChariotHome } from './Chariot/ChariotHome';

// Trayopastambha / Yukta Logging Components
export { TrayopastambhaCard } from './YuktaLog/TrayopastambhaCard';

// Breathing & Pranayama Sanctum Components
export {
  BreathingCircle,
  type BreathPhase,
  type BreathMode,
} from './Breathing/BreathingCircle';
export {
  BreathingControls,
  type BreathPhaseText,
} from './Breathing/BreathingControls';
export { BreathePage } from './Breathing/BreathePage';

// Chitta Prasadanam / Bhava Compass Components
export {
  BhavaCompassGrid,
  bhavaList,
  type BhavaItem,
  type BhavaKey,
} from './Compass/BhavaCompassGrid';
export { BhavaResultCard } from './Compass/BhavaResultCard';

// Harmonizer Components
export {
  DoshaBalancingCard,
  type GunaType,
} from './Harmonizer/DoshaBalancingCard';

// Equilibrium Analytics Components
export {
  GunaProgressBar,
  type GunaDistribution,
} from './Analytics/GunaProgressBar';
export {
  DashboardView,
  type TriggerItem,
} from './Analytics/DashboardView';

// Shastra Lens Universal Components
export { ShastraLensButton } from './Shastra/ShastraLensButton';
export { ShastraLensDrawer } from './Shastra/ShastraLensDrawer';
export { ShastraLens } from './Shastra/ShastraLens';

export { VaultPage } from './Analytics/VaultPage';
export { SettingsModal } from './Settings/SettingsModal';

// Sankalpa (Goal Manager) Components
export { SankalpaHub, ShortTermListContainer, LongTermListContainer } from './Sankalpa';
export type { Goal, SankalpaItem, SankalpaTimeline, SankalpaCategory } from './Sankalpa';

// Features Shell Components
export { FeaturesPage, SadhanaMobile, InterceptorMobile, CompassMobile } from './Features/FeaturesPage';
