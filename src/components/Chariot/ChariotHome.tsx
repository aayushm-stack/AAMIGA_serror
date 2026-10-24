import React from 'react';

interface ChariotHomeProps {
  className?: string;
  onInspectShastra?: () => void;
}

export const ChariotHome: React.FC<ChariotHomeProps> = ({
  className = '',
  onInspectShastra,
}) => {
  return (
    <div
      onClick={onInspectShastra}
      role={onInspectShastra ? 'button' : undefined}
      tabIndex={onInspectShastra ? 0 : undefined}
      className={`h-48 w-full rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col items-center justify-center border border-orange-200 p-6 text-center shadow-sm relative group cursor-pointer transition-all hover:shadow-md ${className}`}
    >
      <div className="w-10 h-10 rounded-full bg-white/70 border border-orange-200/80 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
        {/* Subtle decorative wheel / chakra SVG */}
        <svg
          className="w-5 h-5 text-terracotta"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364"
          />
        </svg>
      </div>

      <p className="text-xs font-semibold uppercase tracking-wider text-terracotta mb-1">
        Katha Upanishad Chariot UI
      </p>

      <p className="font-serif italic text-sm text-charcoal/85 mb-2">
        “Your intellect is the charioteer.”
      </p>

      {onInspectShastra && (
        <span className="text-[11px] font-sans text-terracotta font-medium flex items-center gap-1 opacity-80 group-hover:opacity-100">
          Tap to view Katha Upanishad exegesis →
        </span>
      )}
    </div>
  );
};

export default ChariotHome;
