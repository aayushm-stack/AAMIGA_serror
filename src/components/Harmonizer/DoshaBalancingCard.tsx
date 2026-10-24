import React from 'react';
import { ShastraLensButton } from '../Shastra/ShastraLensButton';
import { Flame, Moon, Sparkles } from 'lucide-react';

export type GunaType = 'Rajas' | 'Tamas' | 'Sattva';

interface DoshaBalancingCardProps {
  currentGuna: GunaType;
  onInspectShastra?: () => void;
  className?: string;
}

interface GunaConfig {
  label: string;
  sanskritSub: string;
  headerBg: string;
  badgeBg: string;
  textColor: string;
  borderColor: string;
  icon: React.ComponentType<{ className?: string }>;
  headline: string;
  actionText: string;
  dietTip: string;
  lifestyleTip: string;
}

const gunaConfigs: Record<GunaType, GunaConfig> = {
  Rajas: {
    label: 'Rajasic State',
    sanskritSub: 'Agitation & Restlessness',
    headerBg: 'bg-gradient-to-r from-orange-50 to-amber-50',
    badgeBg: 'bg-amber-100 text-terracotta border-amber-200',
    textColor: 'text-terracotta',
    borderColor: 'border-orange-200',
    icon: Flame,
    headline: 'High Agitation Detected.',
    actionText: 'Sip warm water, avoid screens for 15 mins.',
    dietTip: 'Sip warm herbal chamomile or fennel water; avoid caffeine and dry snacks.',
    lifestyleTip: 'Take 3 minutes of Sama Vritti (equal 4-4-4) breathing or take a slow grounding walk.',
  },
  Tamas: {
    label: 'Tamasic State',
    sanskritSub: 'Inertia & Mental Fog',
    headerBg: 'bg-gradient-to-r from-slate-50 to-stone-100',
    badgeBg: 'bg-slate-200 text-charcoal border-slate-300',
    textColor: 'text-slate-700',
    borderColor: 'border-slate-300',
    icon: Moon,
    headline: 'Lethargy & Inertia Detected.',
    actionText: 'Engage in light physical movement (Surya Namaskar) and ventilate your space.',
    dietTip: 'Drink warm water with ginger; avoid heavy, sweet, or cold foods.',
    lifestyleTip: 'Step outside into natural sunlight for 10 minutes to rekindle Pranic vitality.',
  },
  Sattva: {
    label: 'Sattvic State',
    sanskritSub: 'Clarity & Inner Equilibrium',
    headerBg: 'bg-gradient-to-r from-emerald-50 to-teal-50',
    badgeBg: 'bg-emerald-100 text-sage border-emerald-200',
    textColor: 'text-sage',
    borderColor: 'border-emerald-200',
    icon: Sparkles,
    headline: 'Harmonious Balance Cultivated.',
    actionText: 'Maintain focused contemplative study and mindful preservation of energy.',
    dietTip: 'Consume fresh, light, seasonal whole foods (Mitahara).',
    lifestyleTip: 'Channel this clear intellect (Buddhi) toward deep study or Svadhyaya.',
  },
};

export const DoshaBalancingCard: React.FC<DoshaBalancingCardProps> = ({
  currentGuna,
  onInspectShastra,
  className = '',
}) => {
  const config = gunaConfigs[currentGuna] || gunaConfigs.Rajas;
  const Icon = config.icon;

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Dynamic Header Banner */}
      <div className={`p-5 border-b ${config.borderColor} ${config.headerBg} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-xl bg-white shadow-xs border ${config.borderColor} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${config.textColor}`} />
          </div>
          <div>
            <span className={`text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md border ${config.badgeBg}`}>
              {config.label}
            </span>
            <p className="text-xs text-charcoal/65 mt-1 font-medium">
              {config.sanskritSub}
            </p>
          </div>
        </div>
      </div>

      {/* Content Body with Crisp Typography */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className={`font-serif text-lg font-semibold tracking-tight ${config.textColor}`}>
            {config.headline}
          </h3>
          <p className="text-sm font-medium text-charcoal mt-1 leading-relaxed">
            {config.actionText}
          </p>
        </div>

        {/* Actionable Recommendations */}
        <div className="grid grid-cols-1 gap-2.5 pt-2">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span className="text-sm">🫖</span>
            <div className="text-xs text-charcoal/80 leading-relaxed">
              <strong className="font-semibold text-charcoal">Dietary Balancing: </strong>
              {config.dietTip}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span className="text-sm">🧘</span>
            <div className="text-xs text-charcoal/80 leading-relaxed">
              <strong className="font-semibold text-charcoal">Pranic Counter-Action: </strong>
              {config.lifestyleTip}
            </div>
          </div>
        </div>

        {/* Shastra Lens Link */}
        {onInspectShastra && (
          <div className="pt-2 flex justify-end">
            <ShastraLensButton onClick={onInspectShastra} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DoshaBalancingCard;
