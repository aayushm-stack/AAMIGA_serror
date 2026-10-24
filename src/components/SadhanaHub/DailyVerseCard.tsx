import React from 'react';

export interface DailyVerse {
  id?: string;
  sanskrit: string;
  transliteration: string;
  meaning: string;
  source: string;
}

interface DailyVerseCardProps {
  verse: DailyVerse;
  onOpenShastraLens?: () => void;
}

export const DailyVerseCard: React.FC<DailyVerseCardProps> = ({
  verse,
  onOpenShastraLens,
}) => {
  return (
    <article className="bg-white shadow-sm rounded-2xl p-6 border border-[#E2E8F0] flex flex-col items-center text-center">
      {/* Sage-colored Source Badge */}
      <div className="mb-4">
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-sage/10 text-sage border border-sage/20">
          {verse.source}
        </span>
      </div>

      {/* Sanskrit Verse - Large, Elegant Serif Font */}
      <h2 className="font-serif text-xl sm:text-2xl font-semibold text-charcoal leading-relaxed tracking-wide mb-3">
        {verse.sanskrit}
      </h2>

      {/* IAST Transliteration */}
      <p className="font-serif italic text-xs sm:text-sm text-charcoal/70 mb-3 leading-relaxed">
        {verse.transliteration}
      </p>

      {/* English Meaning */}
      <p className="text-sm text-charcoal/90 leading-relaxed">
        “{verse.meaning}”
      </p>

      {/* Shastra Lens action trigger */}
      {onOpenShastraLens && (
        <button
          type="button"
          onClick={onOpenShastraLens}
          className="mt-4 text-xs font-medium text-terracotta hover:text-terracotta-dark transition-colors inline-flex items-center gap-1 focus:outline-none"
        >
          <span>Inspect Shastra Lens</span>
          <span aria-hidden="true">&rarr;</span>
        </button>
      )}
    </article>
  );
};

export default DailyVerseCard;
