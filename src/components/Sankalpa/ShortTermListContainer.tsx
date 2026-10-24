import React from 'react';
import { Circle, Sparkles, Trash2, Plus, Zap, GripVertical } from 'lucide-react';
import { Goal } from './types';

export interface ShortTermListContainerProps {
  goals: Goal[];
  isEditing?: boolean;
  onUpdateGoalText?: (id: string, text: string) => void;
  onDeleteGoal?: (id: string) => void;
  onAddGoal?: () => void;
  className?: string;
}

/**
 * ShortTermListContainer: Prioritizes primary indicators for F-pattern scanning,
 * ensuring high-frequency daily tasks are visible within the first 3 seconds of viewing.
 * Supports clean read-only mode and inline batch-editing mode without modals.
 */
export const ShortTermListContainer: React.FC<ShortTermListContainerProps> = ({
  goals,
  isEditing = false,
  onUpdateGoalText,
  onDeleteGoal,
  onAddGoal,
  className = '',
}) => {
  return (
    <section
      aria-label="Immediate Intentions"
      className={`space-y-3 ${className}`}
    >
      {/* Distinct Typography Heading: Immediate Intentions */}
      <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
          <div>
            <h2 className="font-serif text-lg font-bold text-charcoal tracking-wide">
              Immediate Intentions
            </h2>
            <p className="text-[10px] uppercase tracking-wider text-charcoal/50">
              High-Frequency Daily Resolves • F-Pattern Scanning
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-orange-100/70 text-terracotta border border-orange-200/60 shadow-2xs">
          <Sparkles className="w-3 h-3" />
          <span>Present-Tense</span>
        </span>
      </div>

      {/* List Container */}
      <div className="space-y-2.5">
        {goals.length === 0 ? (
          <div className="p-4 text-center rounded-xl border border-dashed border-[#E2E8F0] text-xs text-charcoal/50">
            No immediate intentions defined yet.
          </div>
        ) : (
          goals.map((goal, index) => (
            <div
              key={goal.id}
              className={`p-3.5 rounded-xl border transition-all duration-150 flex items-start gap-3 bg-white/90 shadow-2xs ${
                isEditing
                  ? 'border-terracotta/40 ring-1 ring-terracotta/20 bg-orange-50/20'
                  : 'border-[#E2E8F0]'
              }`}
            >
              {/* Left Indicator for F-Pattern eye-fixation */}
              {isEditing ? (
                <div className="mt-2 text-charcoal/30 flex-shrink-0">
                  <GripVertical className="w-4 h-4" />
                </div>
              ) : (
                <div className="mt-0.5 flex-shrink-0 text-terracotta">
                  <Circle className="w-5 h-5 text-terracotta/60" />
                </div>
              )}

              {/* Goal Text: Read-Only vs Inline Input */}
              <div className="flex-1 min-w-0 space-y-1">
                {isEditing ? (
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider block">
                      Intention #{index + 1}
                    </label>
                    <input
                      type="text"
                      value={goal.text}
                      onChange={(e) => onUpdateGoalText?.(goal.id, e.target.value)}
                      placeholder="e.g. I focus my attention for 90 minutes..."
                      className="w-full px-3 py-1.5 text-sm font-medium text-charcoal bg-white rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-terracotta/40 transition shadow-2xs"
                    />
                  </div>
                ) : (
                  <>
                    <p className="text-sm leading-snug font-medium text-charcoal">
                      {goal.text}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-terracotta bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200/50">
                        <Zap className="w-2.5 h-2.5" />
                        Short-Term Sankalpa
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Action: Delete button in edit mode */}
              {isEditing && (
                <button
                  type="button"
                  onClick={() => onDeleteGoal?.(goal.id)}
                  aria-label="Delete intention"
                  className="p-1.5 mt-4 text-charcoal/40 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        )}

        {/* Inline Add Button when editing */}
        {isEditing && (
          <button
            type="button"
            onClick={onAddGoal}
            className="w-full py-2.5 px-3 rounded-xl border border-dashed border-terracotta/50 bg-orange-50/40 hover:bg-orange-50 text-terracotta text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Immediate Intention</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default ShortTermListContainer;
