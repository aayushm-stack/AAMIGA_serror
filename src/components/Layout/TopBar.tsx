import React, { useRef, useCallback } from 'react';
import { injectJudgeDemoData } from '../../engine/storage/seedData';
import { Sparkles, User, Settings } from 'lucide-react';

export interface TopBarProps {
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  className?: string;
}

/**
 * TopBar navigation component for BrahmaPath.
 *
 * Secret Judge Demo Feature:
 * Features an invisible double-click and long-press event on the central "BrahmaPath"
 * title. When triggered by hackathon judges or evaluators, it calls `injectJudgeDemoData()`,
 * populates 14 days of realistic transformation data into local storage, and forces a
 * clean window reload so all charts and metrics immediately come to life.
 * Completely invisible to the naked eye.
 */
export const TopBar: React.FC<TopBarProps> = ({
  onProfileClick,
  onSettingsClick,
  className = '',
}) => {
  const longPressTimerRef = useRef<number | null>(null);

  // Core trigger handler: Injects 14-day judge demo logs & reloads view
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

  // Desktop double-click trigger
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerJudgeDemo();
  };

  // Mobile long-press triggers (>= 750ms)
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
    <header
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        borderColor: '#E2E8F0',
      }}
      className={`sticky top-0 z-30 w-full backdrop-blur-md border-b px-4 py-3 shadow-2xs transition-colors duration-200 ${className}`}
    >
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Left Action: Profile / Self Reflection */}
        <button
          type="button"
          onClick={onProfileClick}
          aria-label="Profile and Sankalpa"
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100/80 active:bg-slate-200/80 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-700/30 cursor-pointer"
        >
          <User className="w-5 h-5 text-slate-700" />
        </button>

        {/* Center: Invisible Judge Demo Trigger on Title */}
        <div
          role="button"
          tabIndex={0}
          onDoubleClick={handleDoubleClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
          className="text-center cursor-default select-none group focus:outline-none"
          title="BrahmaPath Cognitive Regulation"
        >
          <div className="flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600 opacity-90 transition-transform group-active:scale-95" />
            <h1 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-slate-900 leading-tight">
              BrahmaPath
            </h1>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold -mt-0.5">
            Cognitive Regulation
          </p>
        </div>

        {/* Right Action: Settings / Protocol Preferences */}
        <button
          type="button"
          onClick={onSettingsClick}
          aria-label="Settings and Protocol Controls"
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100/80 active:bg-slate-200/80 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600/30 cursor-pointer"
        >
          <Settings className="w-5 h-5 text-slate-700" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
