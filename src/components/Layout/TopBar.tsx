import React from 'react';

interface TopBarProps {
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onProfileClick,
  onSettingsClick,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Profile Icon / Action */}
        <button
          type="button"
          onClick={onProfileClick}
          aria-label="Profile"
          className="p-2 rounded-xl text-charcoal hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta/40"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.75}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
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
          className="p-2 rounded-xl text-charcoal hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta/40"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.75}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.75}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
