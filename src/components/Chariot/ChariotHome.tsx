import React from 'react';
import { useBrahmaPath } from '../../context/BrahmaPathContext';
import { ChariotState } from '../../types/iks';
import { ChariotStatusReport } from '../../engine/chariotEngine';
import { Compass, Sparkles } from 'lucide-react';

export interface ChariotHomeProps {
  status?: ChariotState;
  score?: number;
  report?: ChariotStatusReport;
  onInspectShastra?: () => void;
  className?: string;
}

/**
 * 1. Resting Chariot SVG (Start of Day Edge Case / 0 Logs):
 * Visualizes dawn stillness, peaceful pasture, unhitched chariot,
 * and the charioteer (Buddhi) in tranquil meditation before taking the reins.
 */
const RestingChariotSVG: React.FC = () => (
  <svg
    viewBox="0 0 320 180"
    className="w-full max-w-[280px] sm:max-w-[320px] h-auto select-none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Soft Dawn Horizon */}
    <path
      d="M10 150H310"
      stroke="#0284C7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="3 3"
    />
    <path
      d="M40 158H280"
      stroke="#BAE6FD"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Rising Dawn Sun Glow */}
    <circle cx="160" cy="150" r="42" fill="#E0F2FE" fillOpacity="0.7" />
    <circle cx="160" cy="150" r="28" fill="#BAE6FD" fillOpacity="0.5" />

    {/* Meditative Stillness Aura for Buddhi */}
    <circle cx="80" cy="65" r="24" fill="#E0F2FE" fillOpacity="0.8" />
    <circle cx="80" cy="65" r="16" fill="#BAE6FD" fillOpacity="0.6" />

    {/* Charioteer in Tranquil Dhyana Posture (Buddhi at Rest) */}
    <circle cx="80" cy="56" r="7.5" fill="#0369A1" />
    <path
      d="M74 65C74 62 76.5 60 80 60C83.5 60 86 62 86 65V90H74V65Z"
      fill="#0369A1"
    />

    {/* Stationary Chariot Body */}
    <path
      d="M45 82H95L88 128H40L45 82Z"
      fill="#0284C7"
      stroke="#0369A1"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <rect x="52" y="88" width="30" height="22" rx="4" fill="#E0F2FE" />

    {/* Stationary Dharma Wheel */}
    <circle cx="65" cy="140" r="22" stroke="#0369A1" strokeWidth="3" fill="#FFFFFF" />
    <circle cx="65" cy="140" r="5.5" fill="#0284C7" />
    <line x1="65" y1="118" x2="65" y2="162" stroke="#0284C7" strokeWidth="1.75" />
    <line x1="43" y1="140" x2="87" y2="140" stroke="#0284C7" strokeWidth="1.75" />
    <line x1="49.5" y1="124.5" x2="80.5" y2="155.5" stroke="#0284C7" strokeWidth="1.5" />
    <line x1="49.5" y1="155.5" x2="80.5" y2="124.5" stroke="#0284C7" strokeWidth="1.5" />

    {/* Reins (Manas) Draped Gently at Rest without Tension */}
    <path
      d="M84 76Q140 108 200 114"
      stroke="#0284C7"
      strokeWidth="2"
      strokeDasharray="4 3"
      strokeLinecap="round"
    />

    {/* Stabled / Resting Horse in Pasture (Indriyas at Rest) */}
    {/* Body resting calmly */}
    <ellipse cx="230" cy="116" rx="36" ry="17" fill="#0284C7" />
    {/* Gently lowered neck & head */}
    <path
      d="M248 114L270 94C272 90 279 92 280 96L281 103L268 116L254 122Z"
      fill="#0284C7"
    />
    <circle cx="280" cy="98" r="4.5" fill="#0369A1" />
    {/* Relaxed legs resting in pasture */}
    <line x1="210" y1="128" x2="208" y2="150" stroke="#0369A1" strokeWidth="3" strokeLinecap="round" />
    <line x1="222" y1="130" x2="222" y2="150" stroke="#0369A1" strokeWidth="3" strokeLinecap="round" />
    <line x1="242" y1="128" x2="242" y2="150" stroke="#0369A1" strokeWidth="3" strokeLinecap="round" />
    <line x1="254" y1="126" x2="256" y2="150" stroke="#0369A1" strokeWidth="3" strokeLinecap="round" />

    {/* State Badge */}
    <rect x="96" y="16" width="128" height="22" rx="11" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1" />
    <text
      x="160"
      y="31"
      textAnchor="middle"
      fill="#0369A1"
      fontSize="9.5"
      fontWeight="700"
      letterSpacing="0.08em"
    >
      RESTING • DAWN STILLNESS
    </text>
  </svg>
);

/**
 * 2. Calm Chariot SVG (> 75 Score):
 * Visualizes Sattvic poise, harmonious reins, and aligned senses under Buddhi mastery.
 */
const CalmChariotSVG: React.FC = () => (
  <svg
    viewBox="0 0 320 180"
    className="w-full max-w-[280px] sm:max-w-[320px] h-auto select-none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Ground Horizon */}
    <path
      d="M10 150H310"
      stroke="#065F46"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="4 4"
    />
    <path
      d="M30 158H290"
      stroke="#A7F3D0"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Radiant Sattva Aura (Intellect / Buddhi) */}
    <circle cx="80" cy="65" r="28" fill="#DEF7EC" fillOpacity="0.8" />
    <circle cx="80" cy="65" r="18" fill="#A7F3D0" fillOpacity="0.6" />

    {/* Charioteer Silhouette (Buddhi in Sattvic Calm) */}
    <circle cx="80" cy="55" r="8" fill="#065F46" />
    <path
      d="M74 65C74 61.5 76.5 59 80 59C83.5 59 86 61.5 86 65V90H74V65Z"
      fill="#065F46"
    />

    {/* Chariot Body (Body / Sharira) */}
    <path
      d="M45 80H95L88 128H40L45 80Z"
      fill="#065F46"
      stroke="#047857"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <rect x="52" y="86" width="30" height="24" rx="4" fill="#DEF7EC" />

    {/* Dharma Chakra Wheel (Steady Axis) */}
    <circle cx="65" cy="140" r="22" stroke="#065F46" strokeWidth="3.5" fill="#FFFFFF" />
    <circle cx="65" cy="140" r="6" fill="#065F46" />
    <line x1="65" y1="118" x2="65" y2="162" stroke="#065F46" strokeWidth="2" />
    <line x1="43" y1="140" x2="87" y2="140" stroke="#065F46" strokeWidth="2" />
    <line x1="49.5" y1="124.5" x2="80.5" y2="155.5" stroke="#065F46" strokeWidth="1.5" />
    <line x1="49.5" y1="155.5" x2="80.5" y2="124.5" stroke="#065F46" strokeWidth="1.5" />

    {/* Taut, Harmonious Reins (Manas / Mind) */}
    <path
      d="M84 72Q145 78 205 92"
      stroke="#047857"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M84 76Q145 84 205 96"
      stroke="#10B981"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Serene Noble Horse (Indriyas / Senses in Harmony) */}
    <ellipse cx="225" cy="108" rx="35" ry="18" fill="#065F46" />
    <path
      d="M245 106L265 72C267 68 274 68 276 72L278 78L268 94L252 112Z"
      fill="#065F46"
    />
    <circle cx="276" cy="74" r="5" fill="#047857" />
    <line x1="205" y1="122" x2="200" y2="150" stroke="#065F46" strokeWidth="3" strokeLinecap="round" />
    <line x1="218" y1="124" x2="216" y2="150" stroke="#065F46" strokeWidth="3" strokeLinecap="round" />
    <line x1="238" y1="122" x2="242" y2="150" stroke="#065F46" strokeWidth="3" strokeLinecap="round" />
    <line x1="250" y1="120" x2="256" y2="150" stroke="#065F46" strokeWidth="3" strokeLinecap="round" />

    {/* State Badge */}
    <rect x="108" y="16" width="104" height="22" rx="11" fill="#DEF7EC" stroke="#065F46" strokeWidth="1" />
    <text
      x="160"
      y="31"
      textAnchor="middle"
      fill="#065F46"
      fontSize="9.5"
      fontWeight="700"
      letterSpacing="0.08em"
    >
      CALM • SATTVIC POISE
    </text>
  </svg>
);

/**
 * 3. Brisk Chariot SVG (40 - 75 Score):
 * Visualizes dynamic forward momentum under vigilant Rajasic guidance.
 */
const BriskChariotSVG: React.FC = () => (
  <svg
    viewBox="0 0 320 180"
    className="w-full max-w-[280px] sm:max-w-[320px] h-auto select-none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Fast Moving Ground Lines */}
    <path
      d="M5 150H315"
      stroke="#D97706"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M20 158H120"
      stroke="#FCD34D"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M150 158H290"
      stroke="#FCD34D"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Dynamic Motion Marks */}
    <line x1="15" y1="65" x2="50" y2="65" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="5" y1="85" x2="35" y2="85" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />

    {/* Charioteer Silhouette (Buddhi Vigilant & Leaning Forward) */}
    <circle cx="86" cy="52" r="8" fill="#B45309" />
    <path
      d="M80 62C80 58.5 83 56 87 56C91 56 94 58.5 93 62L89 88H78L80 62Z"
      fill="#B45309"
    />

    {/* Chariot Body (Kinetic Forward Lean) */}
    <path
      d="M48 76H100L91 126H40L48 76Z"
      fill="#D97706"
      stroke="#B45309"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <rect x="54" y="82" width="32" height="22" rx="3" fill="#FEF3C7" />

    {/* Rolling Wheel */}
    <circle cx="68" cy="138" r="22" stroke="#B45309" strokeWidth="3.5" fill="#FFFFFF" />
    <circle cx="68" cy="138" r="6" fill="#D97706" />
    <line x1="52" y1="122" x2="84" y2="154" stroke="#B45309" strokeWidth="2.5" />
    <line x1="52" y1="154" x2="84" y2="122" stroke="#B45309" strokeWidth="2.5" />
    <line x1="46" y1="138" x2="90" y2="138" stroke="#D97706" strokeWidth="2" />

    {/* Taut, Angled Reins */}
    <path
      d="M92 68L215 88"
      stroke="#78350F"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M92 72L215 94"
      stroke="#D97706"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Trotting Horse (Active Senses) */}
    <ellipse cx="235" cy="104" rx="36" ry="18" fill="#D97706" />
    <path
      d="M255 102L278 66C280 62 288 62 290 66L292 74L278 92L262 108Z"
      fill="#D97706"
    />
    <circle cx="289" cy="68" r="5" fill="#B45309" />
    <line x1="210" y1="116" x2="195" y2="148" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    <line x1="225" y1="118" x2="220" y2="144" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    <line x1="250" y1="116" x2="265" y2="148" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    <line x1="262" y1="114" x2="278" y2="140" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />

    {/* State Badge */}
    <rect x="105" y="16" width="110" height="22" rx="11" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
    <text
      x="160"
      y="31"
      textAnchor="middle"
      fill="#92400E"
      fontSize="9.5"
      fontWeight="700"
      letterSpacing="0.08em"
    >
      BRISK • ACTIVE GAIT
    </text>
  </svg>
);

/**
 * 4. Galloping Chariot SVG (< 40 Score):
 * Visualizes unruly senses, slackened reins, and runaway sensory impulses.
 */
const GallopingChariotSVG: React.FC = () => (
  <svg
    viewBox="0 0 320 180"
    className="w-full max-w-[280px] sm:max-w-[320px] h-auto select-none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Turbulent Jagged Ground Line */}
    <path
      d="M5 152L60 148L120 154L180 146L240 153L315 149"
      stroke="#DC2626"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Distraction Sparks */}
    <path
      d="M140 45L148 55L142 58L150 70"
      stroke="#EF4444"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M165 52L172 60L168 64L175 74"
      stroke="#EF4444"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Straining Charioteer */}
    <circle cx="70" cy="50" r="8" fill="#991B1B" />
    <path
      d="M62 60C62 56 65 54 69 54C73 54 75 56 75 60L71 86H60L62 60Z"
      fill="#991B1B"
    />

    {/* Tilted Chariot Body */}
    <path
      d="M32 82H85L80 132H28L32 82Z"
      fill="#DC2626"
      stroke="#991B1B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <rect x="38" y="88" width="30" height="22" rx="3" fill="#FEE2E2" />

    {/* Skidding Wheel */}
    <circle cx="58" cy="142" r="22" stroke="#991B1B" strokeWidth="3.5" fill="#FFFFFF" />
    <circle cx="58" cy="142" r="6" fill="#DC2626" />
    <line x1="36" y1="142" x2="80" y2="142" stroke="#991B1B" strokeWidth="2.5" />
    <line x1="58" y1="120" x2="58" y2="164" stroke="#991B1B" strokeWidth="2.5" />

    {/* Slackened & Oscillating Loose Reins */}
    <path
      d="M74 66C110 95 150 50 205 78"
      stroke="#991B1B"
      strokeWidth="2.5"
      strokeDasharray="4 2"
      strokeLinecap="round"
    />

    {/* Rearing Wild Horse (Indriyas Bolting) */}
    <g transform="rotate(-25 240 100)">
      <ellipse cx="230" cy="98" rx="36" ry="18" fill="#DC2626" />
      <path
        d="M250 94L275 54C277 50 285 50 287 54L289 62L272 82L258 100Z"
        fill="#DC2626"
      />
      <circle cx="286" cy="56" r="5" fill="#991B1B" />
      <path
        d="M268 56L260 48M262 64L252 56M256 72L246 66"
        stroke="#F87171"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line x1="250" y1="105" x2="275" y2="85" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
      <line x1="258" y1="108" x2="285" y2="92" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
      <line x1="205" y1="108" x2="190" y2="145" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
      <line x1="218" y1="110" x2="208" y2="148" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* State Badge */}
    <rect x="95" y="16" width="130" height="22" rx="11" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1" />
    <text
      x="160"
      y="31"
      textAnchor="middle"
      fill="#991B1B"
      fontSize="9.5"
      fontWeight="700"
      letterSpacing="0.08em"
    >
      GALLOPING • UNCHECKED IMPULSE
    </text>
  </svg>
);

/**
 * State-Based SVG Swapping Chariot Visualizer.
 * Crossfades smoothly between Resting, Calm, Brisk, and Galloping gait states
 * using pure Tailwind transition-opacity duration-1000 ease-in-out.
 */
export const ChariotHome: React.FC<ChariotHomeProps> = ({
  status,
  score,
  report,
  onInspectShastra,
  className = '',
}) => {
  const context = useBrahmaPath();

  // Resolve active report and state from props or context
  const activeReport = report ?? context.chariotStatus;
  const rawState =
    status ??
    activeReport?.state ??
    (context.todayLog ? 'Calm' : 'Resting');
  const displayScore = score ?? activeReport?.score ?? 85;

  // Normalize state to one of the 4 valid states
  const normalizedState: 'Resting' | 'Calm' | 'Brisk' | 'Galloping' =
    rawState === 'Resting'
      ? 'Resting'
      : rawState === 'Calm'
      ? 'Calm'
      : rawState === 'Brisk'
      ? 'Brisk'
      : 'Galloping';

  const handleInspect =
    onInspectShastra ?? (() => context.openShastraLens('chariot'));

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
      }}
      className={`rounded-2xl border shadow-xs p-5 sm:p-6 space-y-4 ${className}`}
    >
      {/* Header with Title and Shastra Lens Trigger */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-700" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Katha Upanishad Chariot (1.3.3-4)
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Real-time sensory composure &amp; intellect alignment score
          </p>
        </div>

        <button
          type="button"
          onClick={handleInspect}
          style={{ color: '#065F46' }}
          className="text-xs font-semibold hover:underline cursor-pointer flex-shrink-0 ml-2"
        >
          [Inspect Shastra Lens]
        </button>
      </div>

      {/* State-Based SVG Swapping Container with smooth 1000ms crossfade */}
      <div className="relative w-full h-56 sm:h-64 rounded-xl bg-slate-50/70 border border-slate-200/80 overflow-hidden flex items-center justify-center">
        {/* 1. Resting Gait SVG Container */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-3 transition-opacity duration-1000 ease-in-out ${
            normalizedState === 'Resting'
              ? 'opacity-100 z-10'
              : 'opacity-0 pointer-events-none z-0'
          }`}
        >
          <RestingChariotSVG />
        </div>

        {/* 2. Calm Gait SVG Container */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-3 transition-opacity duration-1000 ease-in-out ${
            normalizedState === 'Calm'
              ? 'opacity-100 z-10'
              : 'opacity-0 pointer-events-none z-0'
          }`}
        >
          <CalmChariotSVG />
        </div>

        {/* 3. Brisk Gait SVG Container */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-3 transition-opacity duration-1000 ease-in-out ${
            normalizedState === 'Brisk'
              ? 'opacity-100 z-10'
              : 'opacity-0 pointer-events-none z-0'
          }`}
        >
          <BriskChariotSVG />
        </div>

        {/* 4. Galloping Gait SVG Container */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-3 transition-opacity duration-1000 ease-in-out ${
            normalizedState === 'Galloping'
              ? 'opacity-100 z-10'
              : 'opacity-0 pointer-events-none z-0'
          }`}
        >
          <GallopingChariotSVG />
        </div>
      </div>

      {/* Resting State Awakening Prompt */}
      {normalizedState === 'Resting' && (
        <div className="p-4 bg-sky-50/90 rounded-xl border border-sky-200/90 text-sky-950 flex items-start gap-3 shadow-xs">
          <Sparkles className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-800">
              Awaken The Charioteer
            </h4>
            <p className="text-xs sm:text-sm font-medium text-sky-900 leading-relaxed">
              A new day begins. Log your morning Sadhana to awaken the charioteer and take the reins.
            </p>
          </div>
        </div>
      )}

      {/* Real-Time Metrics & Allegory Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        {/* Chariot Status Badge */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Gait State
          </span>
          <span
            style={{
              color:
                normalizedState === 'Resting'
                  ? '#0284C7'
                  : normalizedState === 'Calm'
                  ? '#047857'
                  : normalizedState === 'Brisk'
                  ? '#B45309'
                  : '#B91C1C',
            }}
            className="text-xs sm:text-sm font-extrabold flex items-center gap-1.5"
          >
            {normalizedState === 'Resting' && (
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            )}
            {normalizedState === 'Calm' && (
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            )}
            {normalizedState === 'Brisk' && (
              <span className="w-2 h-2 rounded-full bg-amber-600" />
            )}
            {normalizedState === 'Galloping' && (
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
            )}
            {normalizedState}
          </span>
        </div>

        {/* Dynamic Composure Score */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Composure Score
          </span>
          <span
            style={{
              color:
                normalizedState === 'Resting'
                  ? '#0284C7'
                  : displayScore > 75
                  ? '#047857'
                  : displayScore >= 40
                  ? '#B45309'
                  : '#B91C1C',
            }}
            className="text-xs sm:text-sm font-extrabold"
          >
            {normalizedState === 'Resting' ? 'At Rest' : `${displayScore}/100`}
          </span>
        </div>

        {/* Mind (Reins) */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Reins (Manas)
          </span>
          <span className="text-xs font-semibold text-slate-800 line-clamp-1">
            {normalizedState === 'Resting'
              ? 'At Rest'
              : normalizedState === 'Calm'
              ? 'Supple & Centered'
              : normalizedState === 'Brisk'
              ? 'Taut & Guided'
              : 'Slack / Strained'}
          </span>
        </div>

        {/* Senses (Horses) */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Horses (Indriyas)
          </span>
          <span className="text-xs font-semibold text-slate-800 line-clamp-1">
            {normalizedState === 'Resting'
              ? 'Calm & Stabled'
              : normalizedState === 'Calm'
              ? 'Peaceful & Content'
              : normalizedState === 'Brisk'
              ? 'High Forward Drive'
              : 'Unruly / Bolting'}
          </span>
        </div>
      </div>

      {/* Philosophical Diagnostic Insights */}
      {activeReport && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 text-xs">
            <span className="font-bold text-slate-700 block mb-0.5">Buddhi (Charioteer):</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {activeReport.charioteerStatus}
            </p>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 text-xs">
            <span className="font-bold text-slate-700 block mb-0.5">Manas (Reins):</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {activeReport.reinsStatus}
            </p>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 text-xs">
            <span className="font-bold text-slate-700 block mb-0.5">Indriyas (Horses):</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {activeReport.horsesStatus}
            </p>
          </div>
        </div>
      )}

      {/* Classical Exegesis Quote */}
      {activeReport?.upanishadAllegory && (
        <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 text-[11px] text-amber-900/90 leading-relaxed font-serif italic">
          {activeReport.upanishadAllegory}
        </div>
      )}
    </div>
  );
};

export default ChariotHome;