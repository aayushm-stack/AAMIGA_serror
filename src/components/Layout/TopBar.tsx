import React from 'react';
import { Target, Settings } from 'lucide-react';

export interface TopBarProps {
  onSankalpaClick?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  isSankalpaActive?: boolean;
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  onSankalpaClick,
  onProfileClick,
  onSettingsClick,
  isSankalpaActive = false,
  className = '',
}) => {
  const handleSankalpaClick = onSankalpaClick || onProfileClick;

  return (
    <header className={`sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] px-4 py-3 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Personalised Centre / Culturally aligned Sankalpa (Intent & Focus) Action */}
        <button
          type="button"
          onClick={handleSankalpaClick}
          aria-label="Personalised Sankalpa &amp; Goal Centre"
          title="Personalised Sankalpa &amp; Goal Centre"
          className={`p-2 rounded-xl text-terracotta transition-all shadow-xs flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-terracotta/40 ${
            isSankalpaActive
              ? 'bg-orange-200/90 border border-terracotta ring-2 ring-terracotta/30 scale-105'
              : 'bg-orange-50/80 hover:bg-orange-100 border border-orange-200/50 hover:scale-105 active:scale-95'
          }`}
        >
          <Target className="w-5 h-5 text-terracotta" />
        </button>

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
