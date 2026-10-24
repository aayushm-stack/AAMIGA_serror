import React, { useState } from 'react';
import { SadhanaMobile } from './SadhanaMobile';
import { InterceptorMobile } from './InterceptorMobile';
import { CompassMobile } from './CompassMobile';
import { SankalpaHub } from '../Sankalpa/SankalpaHub';
export { SadhanaMobile, InterceptorMobile, CompassMobile, SankalpaHub };

export type FeatureTab = 'sadhana' | 'interceptor' | 'compass' | 'sankalpa';

export interface FeaturesPageProps {
  className?: string;
  defaultTab?: FeatureTab;
}

/**
 * Shell component for the Features view with horizontal scrolling tab menu
 * and modular placeholders, including the Vedic Sankalpa Goal Manager.
 */
export const FeaturesPage: React.FC<FeaturesPageProps> = ({
  className = '',
  defaultTab = 'sadhana',
}) => {
  const [activeFeature, setActiveFeature] = useState<FeatureTab>(defaultTab);

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

        <button
          type="button"
          onClick={() => setActiveFeature('sankalpa')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
            activeFeature === 'sankalpa'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          4. Sankalpa Goals
        </button>
      </div>

      {/* Conditionally Rendered Feature Placeholders */}
      <div className="pt-1">
        {activeFeature === 'sadhana' && <SadhanaMobile />}
        {activeFeature === 'interceptor' && <InterceptorMobile />}
        {activeFeature === 'compass' && <CompassMobile />}
        {activeFeature === 'sankalpa' && <SankalpaHub />}
      </div>
    </div>
  );
};

export default FeaturesPage;
