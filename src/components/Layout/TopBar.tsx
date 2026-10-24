import React from 'react';
import { Target, Settings } from 'lucide-react';

interface TopBarProps {
  onSettingsClick?: () => void;
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  onSettingsClick,
  className = '',
}) => {
  return (
    <header className={`sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] px-4 py-3 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Culturally aligned Sankalpa (Intent & Focus) Archery Target Icon - No onClick listener */}
        <div
          aria-label="Sankalpa (Intent & Focus)"
          title="Sankalpa (Intent & Focus)"
          className="p-2 rounded-xl text-terracotta bg-orange-50/80 border border-orange-200/50 flex items-center justify-center shadow-xs"
        >
          <Target className="w-5 h-5 text-terracotta" />
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="font-serif text-xl font-semibold tracking-wide text-charcoal">
            BrahmaPath
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-charcoal/60 -mt-0.5">
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
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
