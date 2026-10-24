import React, { useState } from 'react';
import { SadhanaMobile } from './SadhanaMobile';
export { SadhanaMobile };

export type FeatureTab = 'sadhana' | 'interceptor' | 'compass';

export interface FeaturesPageProps {
  className?: string;
}

/**
 * Placeholder for Pause Gate mobile view (Gita 2.62-63 Distraction Interceptor).
 */
export const InterceptorMobile: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
        <h3 className="text-base font-bold text-slate-900">
          Pause Gate (Distraction Interceptor)
        </h3>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">
        Gita 2.62-63 7-step psychological descent tracker and Pratipaksha Bhavana (YS 2.33) cognitive reframe.
      </p>
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
        &lt;InterceptorMobile /&gt; component placeholder ready for modular controls.
      </div>
    </div>
  );
};

/**
 * Placeholder for Bhava Compass mobile view (Yoga Sutra 1.33 Chitta Prasadanam).
 */
export const CompassMobile: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
        <h3 className="text-base font-bold text-slate-900">
          Bhava Compass (YS 1.33)
        </h3>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">
        Patanjali&apos;s 4-fold emotional attitude prescriptions: Maitri (friendliness), Karuna (compassion), Mudita (delight), and Upeksha (equanimity).
      </p>
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
        &lt;CompassMobile /&gt; component placeholder ready for modular controls.
      </div>
    </div>
  );
};

/**
 * Shell component for the Features view with horizontal scrolling tab menu
 * and modular placeholders.
 */
export const FeaturesPage: React.FC<FeaturesPageProps> = ({ className = '' }) => {
  const [activeFeature, setActiveFeature] = useState<'sadhana' | 'interceptor' | 'compass'>('sadhana');

  return (
    <div
      style={{
        backgroundColor: '#FDFBF7',
        color: '#1E293B',
      }}
      className={`w-full min-h-full pb-8 space-y-4 ${className}`}
    >
      {/* Horizontal Scrolling Tab Menu */}
      <div className="flex overflow-x-auto whitespace-nowrap hide-scrollbar p-4 gap-2 bg-white/70 backdrop-blur-xs border border-slate-200/80 rounded-2xl shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveFeature('sadhana')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
            activeFeature === 'sadhana'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          1. Sadhana Hub
        </button>

        <button
          type="button"
          onClick={() => setActiveFeature('interceptor')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
            activeFeature === 'interceptor'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          2. Pause Gate
        </button>

        <button
          type="button"
          onClick={() => setActiveFeature('compass')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
            activeFeature === 'compass'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          3. Bhava Compass
        </button>
      </div>

      {/* Conditionally Rendered Feature Placeholders */}
      <div className="pt-1">
        {activeFeature === 'sadhana' && <SadhanaMobile />}
        {activeFeature === 'interceptor' && <InterceptorMobile />}
        {activeFeature === 'compass' && <CompassMobile />}
      </div>
    </div>
  );
};

export default FeaturesPage;
