import React from 'react';

interface ChariotHomeProps {
  className?: string;
}

export const ChariotHome: React.FC<ChariotHomeProps> = ({ className = '' }) => {
  return (
    <div
      className={`h-48 w-full rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col items-center justify-center border border-orange-200 p-6 text-center shadow-sm ${className}`}
    >
      <div className="w-10 h-10 rounded-full bg-white/70 border border-orange-200/80 flex items-center justify-center mb-3">
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
        Katha Upanishad Chariot UI: [ SVG Engine Here ]
      </p>

      <p className="font-serif italic text-sm text-charcoal/85">
        “Your intellect is the charioteer.”
      </p>
    </div>
  );
};

export default ChariotHome;
