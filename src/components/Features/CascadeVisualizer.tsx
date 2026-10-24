import React from 'react';

export interface CascadeStep {
  stepNumber: number;
  name: string;
  sanskrit: string;
  description: string;
}

export const GITA_CASCADE_SEVEN_STEPS: CascadeStep[] = [
  {
    stepNumber: 1,
    name: 'Dwelling',
    sanskrit: 'Dhyāna (ध्यायतो विषयान्)',
    description: 'Idle sensory contemplation & mental lingering',
  },
  {
    stepNumber: 2,
    name: 'Attachment',
    sanskrit: 'Saṅga (सङ्ग)',
    description: 'Psychological affinity & emotional attachment',
  },
  {
    stepNumber: 3,
    name: 'Craving',
    sanskrit: 'Kāma (काम)',
    description: 'Urge peak & compulsive wanting',
  },
  {
    stepNumber: 4,
    name: 'Agitation',
    sanskrit: 'Krodha (क्रोध)',
    description: 'Inner friction, frustration & restlessness',
  },
  {
    stepNumber: 5,
    name: 'Delusion',
    sanskrit: 'Sammoha (सम्मोह)',
    description: 'Attentional trance & loss of time awareness',
  },
  {
    stepNumber: 6,
    name: 'Memory Loss',
    sanskrit: 'Smṛti-vibhrama (स्मृतिविभ्रम)',
    description: 'Lapse of core Sankalpa & mindfulness',
  },
  {
    stepNumber: 7,
    name: 'Loss of Intellect',
    sanskrit: 'Buddhi-nāśa (बुद्धिनाश)',
    description: 'Collapse of conscious executive governance',
  },
];

export interface CascadeVisualizerProps {
  /** Optional active step index (1-7), defaults to 3 (Kama / Craving) */
  activeStep?: number;
  className?: string;
}

/**
 * Mobile-first horizontal scrollable visualizer for the 7-step psychological
 * descent cascade from Bhagavad Gita 2.62-63.
 *
 * Visually highlights Step 3 (Craving/Kama) with a Terracotta border (border-orange-500 bg-orange-50)
 * and displays an encouraging, soft-green reassurance box confirming early interception.
 */
export const CascadeVisualizer: React.FC<CascadeVisualizerProps> = ({
  activeStep = 3,
  className = '',
}) => {
  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* Header Info */}
      <div className="flex items-center justify-between px-0.5">
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Bhagavad Gita 2.62–63 Cascade
          </span>
          <h3 className="text-sm font-bold text-slate-900">
            Psychological Descent &amp; Early Interception
          </h3>
        </div>
        <span className="text-[11px] font-medium text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full border border-orange-200">
          Step {activeStep} of 7
        </span>
      </div>

      {/* Horizontal Scrollable Visualizer Container */}
      <div className="w-full overflow-x-auto pb-2 pt-1 scroll-smooth">
        <div className="flex items-stretch gap-3 min-w-max pr-2">
          {GITA_CASCADE_SEVEN_STEPS.map((step) => {
            const isStep3 = step.stepNumber === 3;
            const isTargetActive = step.stepNumber === activeStep;
            const isHighlight = isStep3 || isTargetActive;

            return (
              <div
                key={step.stepNumber}
                className={`w-36 sm:w-40 p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between flex-shrink-0 ${
                  isHighlight
                    ? 'border-orange-500 bg-orange-50 shadow-sm ring-1 ring-orange-400/40'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {/* Step Number & Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isHighlight
                        ? 'bg-orange-500 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Step {step.stepNumber}
                  </span>
                  {isHighlight && (
                    <span className="text-[10px] font-bold text-orange-600 uppercase tracking-tight">
                      Active
                    </span>
                  )}
                </div>

                {/* English Name & Sanskrit Trait */}
                <div className="space-y-0.5 mb-2">
                  <h4
                    className={`text-sm font-bold leading-tight ${
                      isHighlight ? 'text-orange-950' : 'text-slate-900'
                    }`}
                  >
                    {step.stepNumber}. {step.name}
                  </h4>
                  <p
                    className={`text-[11px] font-medium leading-tight ${
                      isHighlight ? 'text-orange-700 font-semibold' : 'text-slate-500'
                    }`}
                  >
                    {step.sanskrit.split(' ')[0]}
                  </p>
                </div>

                {/* Micro Description */}
                <p
                  className={`text-[11px] leading-snug mt-auto pt-2 border-t ${
                    isHighlight
                      ? 'text-orange-800/90 border-orange-200/80'
                      : 'text-slate-400 border-slate-100'
                  }`}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reassuring Soft-Green Message Box */}
      <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-200 shadow-2xs space-y-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-200 text-green-800 font-bold text-xs">
            ✓
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-green-900">
            Pause Gate Interception
          </span>
        </div>
        <p className="text-xs sm:text-sm font-medium leading-relaxed pl-7">
          You are currently experiencing Kama (a craving). You have caught this early. Your discriminative intellect (Buddhi) is still awake and in control.
        </p>
      </div>
    </div>
  );
};

export default CascadeVisualizer;
