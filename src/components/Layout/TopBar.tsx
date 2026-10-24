import React, { useRef, useCallback } from 'react';
import { injectJudgeDemoData } from '../../engine/storage/seedData';
import { Target, Settings, Sparkles } from 'lucide-react';

export interface TopBarProps {
  onSankalpaClick?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  isSankalpaActive?: boolean;
  className?: string;
}

/**
 * TopBar navigation component for BrahmaPath.
 *
 * Features:
 * 1. Personalised Sankalpa & Goal Centre quick access (Target icon)
 * 2. Secret Judge Presentation Tool: Double-clicking the main "BrahmaPath" logo
 *    triggers `injectJudgeDemoData()`, populating local storage with 8 days of realistic
 *    narrative logs (3 days low Yukta/high Vata-Tamas -> 5 days Sattvic ascendance)
 *    and executing `window.location.reload()`.
 * 3. Settings modal trigger.
 */
export const TopBar: React.FC<TopBarProps> = ({
  onSankalpaClick,
  onProfileClick,
  onSettingsClick,
  isSankalpaActive = false,
  className = '',
}) => {
  const longPressTimerRef = useRef<number | null>(null);
  const handleSankalpaClick = onSankalpaClick || onProfileClick;

  // Presentation Trigger: Injects 8 days of realistic logs & reloads application
  const triggerJudgeDemo = useCallback(() => {
    try {
      injectJudgeDemoData();
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    } catch (err) {
      console.error('[BrahmaPath] Demo injection error:', err);
    }
  }, []);

  // Desktop double-click event handler
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerJudgeDemo();
  };

  // Mobile long-press triggers (>= 750ms) for touchscreen devices
  const handleTouchStart = () => {
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current);
    }
    longPressTimerRef.current = window.setTimeout(() => {
      triggerJudgeDemo();
    }, 750);
  };

  const handleTouchEnd = () => {
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleTouchCancel = () => {
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  return (
    <header className={`sticky top-0 z-30 w-full bg-white/85 backdrop-blur-md border-b border-[#E2E8F0] px-4 py-3 shadow-2xs transition-colors duration-200 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Personalised Centre / Culturally aligned Sankalpa (Intent & Focus) Action */}
        <button
          type="button"
          onClick={handleSankalpaClick}
          aria-label="Personalised Sankalpa & Goal Centre"
          title="Personalised Sankalpa & Goal Centre"
          className={`p-2 rounded-xl text-terracotta transition-all shadow-xs flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-terracotta/40 ${
            isSankalpaActive
              ? 'bg-orange-200/90 border border-terracotta ring-2 ring-terracotta/30 scale-105'
              : 'bg-orange-50/80 hover:bg-orange-100 border border-orange-200/50 hover:scale-105 active:scale-95'
          }`}
        >
          <Target className="w-5 h-5 text-terracotta" />
        </button>

        {/* Center: Main "BrahmaPath" Logo with Double-Click Demo Trigger */}
        <div
          role="button"
          tabIndex={0}
          onDoubleClick={handleDoubleClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
          className="text-center cursor-pointer select-none group focus:outline-none"
          title="BrahmaPath Cognitive Regulation"
        >
          <div className="flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 opacity-80 transition-transform group-active:scale-95" />
            <h1
              className="font-serif text-lg sm:text-xl font-semibold tracking-wide text-charcoal cursor-pointer"
              onDoubleClick={handleDoubleClick}
            >
              BrahmaPath
            </h1>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-charcoal/60 font-semibold -mt-0.5">
            Cognitive Regulation
          </p>
        </div>

        {/* Settings Gear Icon / Action */}
        <button
          type="button"
          onClick={onSettingsClick}
          aria-label="Settings"
          className="p-2 rounded-xl text-charcoal hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta/40 cursor-pointer"
        >
          <Settings className="w-5 h-5 text-slate-700" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
