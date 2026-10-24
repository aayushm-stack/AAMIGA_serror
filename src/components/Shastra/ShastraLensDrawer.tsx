import React, { useEffect } from 'react';
import { X, BookOpen } from 'lucide-react';

interface ShastraLensDrawerProps {
  verse: string;
  commentary: string;
  source?: string;
  transliteration?: string;
  practicalApplication?: string;
  isOpen?: boolean;
  onClose: () => void;
}

export const ShastraLensDrawer: React.FC<ShastraLensDrawerProps> = ({
  verse,
  commentary,
  source,
  transliteration,
  practicalApplication,
  isOpen = true,
  onClose,
}) => {
  // Prevent background scrolling while drawer is mounted/open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/40 backdrop-blur-xs transition-opacity duration-300">
      {/* Backdrop touch dismiss */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Stark Parchment Bottom-Sheet Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shastra Lens Exegesis"
        className="relative z-10 w-full max-w-md bg-parchment rounded-t-[28px] border-t border-x border-[#E2E8F0] shadow-2xl p-6 max-h-[88vh] overflow-y-auto animate-in slide-in-from-bottom duration-300"
      >
        {/* Pull handle indicator */}
        <div className="w-10 h-1 bg-charcoal/20 rounded-full mx-auto mb-3" />

        {/* Top Header Row with Close "X" at top right */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]/80">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-100/60 text-terracotta flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-terracotta block">
                Primary Exegesis
              </span>
              <h2 className="font-serif text-sm font-semibold text-charcoal">
                Shastra Lens
              </h2>
            </div>
          </div>

          {/* Close "X" button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Shastra Lens"
            className="p-1.5 rounded-xl text-charcoal/60 hover:text-charcoal hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source Badge if provided */}
        {source && (
          <div className="mt-4 text-center">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-sage/10 text-sage border border-sage/20">
              {source}
            </span>
          </div>
        )}

        {/* Centered, Large, Serif Sanskrit Verse */}
        <div className="my-5 p-5 bg-white/70 rounded-2xl border border-orange-200/60 shadow-xs text-center">
          <p className="font-serif text-xl sm:text-2xl font-bold text-charcoal leading-relaxed tracking-wide">
            {verse}
          </p>

          {transliteration && (
            <p className="font-serif italic text-xs sm:text-sm text-charcoal/70 mt-3 leading-relaxed">
              {transliteration}
            </p>
          )}
        </div>

        {/* Commentary Section */}
        <div className="space-y-2 mb-4">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-charcoal/60 block">
            Commentary & Philosophical Rationale
          </span>
          <div className="p-4 rounded-xl bg-white/80 border border-[#E2E8F0] text-sm text-charcoal/85 leading-relaxed font-normal">
            {commentary}
          </div>
        </div>

        {/* Practical Application if provided */}
        {practicalApplication && (
          <div className="space-y-1.5 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-sage block">
              Applied UX Alignment
            </span>
            <div className="p-3.5 rounded-xl bg-sage/5 border border-sage/20 text-xs text-charcoal/85 leading-relaxed">
              {practicalApplication}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShastraLensDrawer;
