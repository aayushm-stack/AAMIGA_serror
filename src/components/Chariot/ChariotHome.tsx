import React from 'react';
import { ShastraLensButton } from '../Shastra/ShastraLensButton';
import { useBrahmaPath } from '../../context/BrahmaPathContext';
import { ChariotState } from '../../types/iks';
import { ChariotStatusReport } from '../../engine/chariotEngine';
import { Shield, Sparkles, AlertTriangle, Compass } from 'lucide-react';

export interface ChariotHomeProps {
  status?: ChariotState;
  score?: number;
  report?: ChariotStatusReport;
  onInspectShastra?: () => void;
  className?: string;
}

export interface ChariotStatusBadgeProps {
  state?: 'Calm' | 'Brisk' | 'Galloping' | 'Gallop';
  text?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Dynamic Status Badge Component for the Chariot UI.
 * Replaces fixed-width SVG rectangles with a dynamic width setting (`width: fit-content` / `w-fit`),
 * generous horizontal padding (`px-4`/`px-5` with `rounded-full`) to maintain the pill shape,
 * and `white-space: nowrap` (`whitespace-nowrap`) so strings of any length scale perfectly without spilling.
 */
export const ChariotStatusBadge: React.FC<ChariotStatusBadgeProps> = ({
  state = 'Calm',
  text,
  className = '',
  style,
}) => {
  const normalized: 'Calm' | 'Brisk' | 'Galloping' =
    state === 'Gallop' || state === 'Galloping'
      ? 'Galloping'
      : state === 'Brisk'
      ? 'Brisk'
      : 'Calm';

  const badgeConfig = {
    Calm: {
      defaultText: 'CALM • SATTVIC POISE',
      bgClass: 'bg-[#DEF7EC]',
      textClass: 'text-[#065F46]',
      borderClass: 'border-[#065F46]/40',
      inlineBg: '#DEF7EC',
      inlineColor: '#065F46',
      inlineBorder: 'rgba(6, 95, 70, 0.4)',
    },
    Brisk: {
      defaultText: 'BRISK • ACTIVE GAIT',
      bgClass: 'bg-[#FEF3C7]',
      textClass: 'text-[#92400E]',
      borderClass: 'border-[#D97706]/40',
      inlineBg: '#FEF3C7',
      inlineColor: '#92400E',
      inlineBorder: 'rgba(217, 119, 6, 0.4)',
    },
    Galloping: {
      defaultText: 'GALLOPING • UNCHECKED IMPULSE',
      bgClass: 'bg-[#FEE2E2]',
      textClass: 'text-[#991B1B]',
      borderClass: 'border-[#DC2626]/40',
      inlineBg: '#FEE2E2',
      inlineColor: '#991B1B',
      inlineBorder: 'rgba(220, 38, 38, 0.4)',
    },
  }[normalized];

  const displayText = text ?? badgeConfig.defaultText;

  return (
    <div
      role="status"
      aria-label={`Chariot gait state: ${displayText}`}
      style={{
        width: 'fit-content',
        whiteSpace: 'nowrap',
        backgroundColor: badgeConfig.inlineBg,
        color: badgeConfig.inlineColor,
        borderColor: badgeConfig.inlineBorder,
        ...style,
      }}
      className={`w-fit whitespace-nowrap px-4 py-1 sm:px-5 sm:py-1.5 rounded-full text-[10.5px] sm:text-xs font-bold tracking-wider uppercase border shadow-2xs transition-colors duration-300 pointer-events-auto ${badgeConfig.bgClass} ${badgeConfig.textClass} ${badgeConfig.borderClass} ${className}`}
    >
      {displayText}
    </div>
  );
};


/**
 * 1. Calm Chariot SVG Placeholder (> 75 Score):
 * Visualizes Sattvic mastery, steady reins, and aligned senses.
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
    {/* Spokes */}
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
    {/* Body */}
    <ellipse cx="225" cy="108" rx="35" ry="18" fill="#065F46" />
    {/* Neck & Head */}
    <path
      d="M245 106L265 72C267 68 274 68 276 72L278 78L268 94L252 112Z"
      fill="#065F46"
    />
    {/* Muzzle */}
    <circle cx="276" cy="74" r="5" fill="#047857" />
    {/* Legs in Steady Rhythmic Gait */}
    <line x1="205" y1="122" x2="200" y2="150" stroke="#065F46" strokeWidth="3" strokeLinecap="round" />
    <line x1="218" y1="124" x2="216" y2="150" stroke="#065F46" strokeWidth="3" strokeLinecap="round" />
    <line x1="238" y1="122" x2="242" y2="150" stroke="#065F46" strokeWidth="3" strokeLinecap="round" />
    <line x1="250" y1="120" x2="256" y2="150" stroke="#065F46" strokeWidth="3" strokeLinecap="round" />


  </svg>
);

/**
 * 2. Brisk Chariot SVG Placeholder (40 - 75 Score):
 * Visualizes dynamic forward movement under vigilant Rajas control.
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

    {/* Dynamic Forward Motion Lines */}
    <line x1="15" y1="65" x2="50" y2="65" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="5" y1="85" x2="35" y2="85" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />

    {/* Charioteer Silhouette (Buddhi Vigilant & Leaning Forward) */}
    <circle cx="86" cy="52" r="8" fill="#B45309" />
    <path
      d="M80 62C80 58.5 83 56 87 56C91 56 94 58.5 93 62L89 88H78L80 62Z"
      fill="#B45309"
    />

    {/* Chariot Body (Angled with Kinetic Energy) */}
    <path
      d="M48 76H100L91 126H40L48 76Z"
      fill="#D97706"
      stroke="#B45309"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <rect x="54" y="82" width="32" height="22" rx="3" fill="#FEF3C7" />

    {/* Fast Rolling Wheel with Motion Blurs */}
    <circle cx="68" cy="138" r="22" stroke="#B45309" strokeWidth="3.5" fill="#FFFFFF" />
    <circle cx="68" cy="138" r="6" fill="#D97706" />
    {/* Angled Dynamic Spokes */}
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

    {/* Galloping / Trotting Horse (Active Drive) */}
    <ellipse cx="235" cy="104" rx="36" ry="18" fill="#D97706" />
    {/* Extended Forward Head */}
    <path
      d="M255 102L278 66C280 62 288 62 290 66L292 74L278 92L262 108Z"
      fill="#D97706"
    />
    <circle cx="289" cy="68" r="5" fill="#B45309" />
    {/* Trotting Forward Legs */}
    <line x1="210" y1="116" x2="195" y2="148" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    <line x1="225" y1="118" x2="220" y2="144" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    <line x1="250" y1="116" x2="265" y2="148" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    <line x1="262" y1="114" x2="278" y2="140" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />


  </svg>
);

/**
 * 3. Galloping Chariot SVG Placeholder (< 40 Score):
 * Visualizes wild horses, slackened reins, and impulse runaway.
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

    {/* Warning Sparks / Distraction Vectors */}
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

    {/* Distressed Charioteer Pulling Back */}
    <circle cx="70" cy="50" r="8" fill="#991B1B" />
    <path
      d="M62 60C62 56 65 54 69 54C73 54 75 56 75 60L71 86H60L62 60Z"
      fill="#991B1B"
    />

    {/* Chariot Tilting Backwards Under Strain */}
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

    {/* Slackened & Oscillating Loose Reins (Vibrating in Tension) */}
    <path
      d="M74 66C110 95 150 50 205 78"
      stroke="#991B1B"
      strokeWidth="2.5"
      strokeDasharray="4 2"
      strokeLinecap="round"
    />

    {/* Rearing Wild Horse (Indriyas Bolting) */}
    {/* Body Tilted Upwards at 35 degrees */}
    <g transform="rotate(-25 240 100)">
      <ellipse cx="230" cy="98" rx="36" ry="18" fill="#DC2626" />
      {/* Rearing Head & Neck */}
      <path
        d="M250 94L275 54C277 50 285 50 287 54L289 62L272 82L258 100Z"
        fill="#DC2626"
      />
      <circle cx="286" cy="56" r="5" fill="#991B1B" />
      {/* Flared Mane */}
      <path
        d="M268 56L260 48M262 64L252 56M256 72L246 66"
        stroke="#F87171"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Rearing Front Hooves Off Ground */}
      <line x1="250" y1="105" x2="275" y2="85" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
      <line x1="258" y1="108" x2="285" y2="92" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
      {/* Planted Straining Rear Legs */}
      <line x1="205" y1="108" x2="190" y2="145" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
      <line x1="218" y1="110" x2="208" y2="148" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
    </g>


  </svg>
);

/**
 * State-Based SVG Swapping Chariot Visualizer.
 * Crossfades smoothly between Calm, Brisk, and Galloping gait states
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

  // Resolve active state and score from props or global context
  const activeReport = report ?? context.chariotStatus;
  const rawState = status ?? activeReport?.state ?? 'Calm';
  const displayScore = score ?? activeReport?.score ?? 85;

  // Normalize 'Gallop' and 'Galloping' to match thresholds
  const normalizedState: 'Calm' | 'Brisk' | 'Galloping' =
    rawState === 'Calm'
      ? 'Calm'
      : rawState === 'Brisk'
      ? 'Brisk'
      : 'Galloping';

  const handleInspect = onInspectShastra ?? (() => context.openShastraLens('chariot'));

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

        <ShastraLensButton
          onClick={handleInspect}
          className="ml-2"
        />
      </div>

      {/* State-Based SVG Swapping Container with smooth 1000ms crossfade */}
      <div className="relative w-full h-56 sm:h-64 rounded-xl bg-slate-50/70 border border-slate-200/80 overflow-hidden flex items-center justify-center">
        {/* Dynamic Status Badge Overlay (Dynamic width, pill padding, whitespace-nowrap) */}
        <div className="absolute top-3.5 z-20 flex justify-center w-full px-4 pointer-events-none">
          <ChariotStatusBadge state={normalizedState} />
        </div>
        {/* Calm Gait SVG Container */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-3 transition-opacity duration-1000 ease-in-out ${
            normalizedState === 'Calm'
              ? 'opacity-100 z-10'
              : 'opacity-0 pointer-events-none z-0'
          }`}
        >
          <CalmChariotSVG />
        </div>

        {/* Brisk Gait SVG Container */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-3 transition-opacity duration-1000 ease-in-out ${
            normalizedState === 'Brisk'
              ? 'opacity-100 z-10'
              : 'opacity-0 pointer-events-none z-0'
          }`}
        >
          <BriskChariotSVG />
        </div>

        {/* Galloping Gait SVG Container */}
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
                normalizedState === 'Calm'
                  ? '#047857'
                  : normalizedState === 'Brisk'
                  ? '#B45309'
                  : '#B91C1C',
            }}
            className="text-xs sm:text-sm font-extrabold flex items-center gap-1.5"
          >
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
                displayScore > 75
                  ? '#047857'
                  : displayScore >= 40
                  ? '#B45309'
                  : '#B91C1C',
            }}
            className="text-xs sm:text-sm font-extrabold"
          >
            {displayScore}/100
          </span>
        </div>

        {/* Mind (Reins) */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Reins (Manas)
          </span>
          <span className="text-xs font-semibold text-slate-800 line-clamp-1">
            {normalizedState === 'Calm'
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
            {normalizedState === 'Calm'
              ? 'Peaceful & Content'
              : normalizedState === 'Brisk'
              ? 'High Forward Drive'
              : 'Unruly / Bolting'}
          </span>
        </div>
      </div>

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
