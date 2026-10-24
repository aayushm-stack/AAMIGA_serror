import React from 'react';
import { Compass, Target, Trash2, Plus, GripVertical, ShieldCheck } from 'lucide-react';
import { Goal } from './types';

export interface LongTermListContainerProps {
  goals: Goal[];
  isEditing?: boolean;
  onUpdateGoalText?: (id: string, text: string) => void;
  onDeleteGoal?: (id: string) => void;
  onAddGoal?: () => void;
  className?: string;
}

/**
 * LongTermListContainer: Displays enduring, strategic Vedic horizon resolves
 * that guide the user's overarching life direction and sustained Dharmic focus.
 * Supports clean read-only mode and inline batch-editing mode without modals.
 */
export const LongTermListContainer: React.FC<LongTermListContainerProps> = ({
  goals,
  isEditing = false,
  onUpdateGoalText,
  onDeleteGoal,
  onAddGoal,
  className = '',
}) => {
  return (
    <section
      aria-label="Horizon Goals"
      className={`space-y-3 pt-2 ${className}`}
    >
      {/* Distinct Typography Heading: Horizon Goals */}
      <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sage" />
          <div>
            <h2 className="font-serif text-lg font-bold text-charcoal tracking-wide">
              Horizon Goals
            </h2>
            <p className="text-[10px] uppercase tracking-wider text-charcoal/50">
              Strategic Vision • Enduring Dharmic Trajectory
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-sage/10 text-sage border border-sage/20 shadow-2xs">
          <Compass className="w-3 h-3" />
          <span>Long-Term</span>
        </span>
      </div>

      {/* List Container */}
      <div className="space-y-3">
        {goals.length === 0 ? (
          <div className="p-4 text-center rounded-xl border border-dashed border-[#E2E8F0] text-xs text-charcoal/50">
            No horizon goals defined yet.
          </div>
        ) : (
          goals.map((goal, index) => (
            <div
              key={goal.id}
              className={`p-4 rounded-xl border transition-all duration-150 space-y-2 bg-gradient-to-br from-white/95 to-emerald-50/20 shadow-2xs ${
                isEditing
                  ? 'border-sage/40 ring-1 ring-sage/20'
                  : 'border-sage/20'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Left Grip or Icon */}
                {isEditing ? (
                  <div className="mt-2 text-charcoal/30 flex-shrink-0">
                    <GripVertical className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-sage/10 text-sage flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                )}

                {/* Goal Text: Read-Only vs Inline Input */}
                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider block">
                        Horizon Vision #{index + 1}
                      </label>
                      <input
                        type="text"
                        value={goal.text}
                        onChange={(e) => onUpdateGoalText?.(goal.id, e.target.value)}
                        placeholder="e.g. I embody calm mental equanimity..."
                        className="w-full px-3 py-1.5 text-sm font-medium text-charcoal bg-white rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-sage/40 transition shadow-2xs"
                      />
                    </div>
                  ) : (
                    <p className="text-sm font-serif italic text-charcoal/90 leading-relaxed font-medium">
                      “{goal.text}”
                    </p>
                  )}
                </div>

                {/* Delete button in edit mode */}
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => onDeleteGoal?.(goal.id)}
                    aria-label="Delete horizon goal"
                    className="p-1.5 mt-4 text-charcoal/40 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Read-only metadata pill */}
              {!isEditing && (
                <div className="flex items-center justify-between pt-1 border-t border-[#E2E8F0]/50 text-[10px]">
                  <span className="inline-flex items-center gap-1 font-semibold text-sage bg-sage/10 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3 h-3" />
                    Long-Term Sankalpa
                  </span>
                </div>
              )}
            </div>
          ))
        )}

        {/* Inline Add Button when editing */}
        {isEditing && (
          <button
            type="button"
            onClick={onAddGoal}
            className="w-full py-2.5 px-3 rounded-xl border border-dashed border-sage/50 bg-emerald-50/40 hover:bg-emerald-50 text-sage text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Horizon Goal</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default LongTermListContainer;
