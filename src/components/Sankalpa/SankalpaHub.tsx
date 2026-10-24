import React, { useState } from 'react';
import { Target, Flame, HelpCircle, Edit3, Check, X, ShieldAlert } from 'lucide-react';
import { useAccount } from '../../context/AccountContext';
import { getLocalItem, setLocalItem, STORAGE_KEYS } from '../../engine/storage/localStore';
import { ShortTermListContainer } from './ShortTermListContainer';
import { LongTermListContainer } from './LongTermListContainer';
import { Goal } from './types';

export interface SankalpaHubProps {
  className?: string;
  onOpenShastraLens?: (key: 'chariot' | 'brahmacharya' | 'yukta') => void;
}

/**
 * Authentic default Vedic Sankalpa goals seeded in present-tense phrasing.
 */
export const INITIAL_COMMITTED_GOALS: Goal[] = [
  {
    id: 'goal-st-1',
    text: 'I study for 90 uninterrupted minutes before checking notifications.',
    type: 'SHORT_TERM',
  },
  {
    id: 'goal-st-2',
    text: 'I pause and breathe for 3 cycles whenever I reach for digital distraction.',
    type: 'SHORT_TERM',
  },
  {
    id: 'goal-st-3',
    text: 'I power down all screens by 10:30 PM to honor restorative sleep.',
    type: 'SHORT_TERM',
  },
  {
    id: 'goal-lt-1',
    text: 'I embody calm mental equanimity (Samatvam) under academic exam pressures.',
    type: 'LONG_TERM',
  },
  {
    id: 'goal-lt-2',
    text: 'I master vital energy conservation (Virya) to achieve peak creative flow.',
    type: 'LONG_TERM',
  },
  {
    id: 'goal-lt-3',
    text: 'I sustain full charioteer mastery with sensory horses aligned to my Buddhi.',
    type: 'LONG_TERM',
  },
];

/**
 * SankalpaHub: Dedicated viewport for the Vedic Goal Manager module.
 * Provides an inline batch-editing experience that preserves spatial context
 * between Immediate Intentions and Horizon Goals.
 */
export const SankalpaHub: React.FC<SankalpaHubProps> = ({
  className = '',
  onOpenShastraLens,
}) => {
  // Subscribe to global userName state
  const { userName } = useAccount();

  // 1. Database-backed committed goals array
  const [committedGoals, setCommittedGoals] = useState<Goal[]>(() =>
    getLocalItem<Goal[]>(STORAGE_KEYS.GOALS, INITIAL_COMMITTED_GOALS)
  );

  // 2. Boolean state for read-only vs inline editing
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // 3. Local draft state array for inline batch edits
  const [draftState, setDraftState] = useState<Goal[]>([]);

  // Toggle edit state and handle batch commit
  const handleToggleEdit = () => {
    if (!isEditing) {
      // Enter Edit Mode: Deep clone committedGoals into local draftState
      setDraftState(committedGoals.map((g) => ({ ...g })));
      setIsEditing(true);
    } else {
      // Commit Update: Persist draftState into committedGoals and database
      setCommittedGoals(draftState);
      setLocalItem(STORAGE_KEYS.GOALS, draftState);
      setIsEditing(false);
    }
  };

  // Discard changes
  const handleCancelEdit = () => {
    setIsEditing(false);
    setDraftState([]);
  };

  // Handlers for inline edits on draftState
  const handleUpdateGoalText = (id: string, text: string) => {
    setDraftState((prev) =>
      prev.map((g) => (g.id === id ? { ...g, text } : g))
    );
  };

  const handleDeleteGoal = (id: string) => {
    setDraftState((prev) => prev.filter((g) => g.id !== id));
  };

  const handleAddGoal = (type: 'SHORT_TERM' | 'LONG_TERM') => {
    const newGoal: Goal = {
      id: `goal-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      text: '',
      type,
    };
    setDraftState((prev) => [...prev, newGoal]);
  };

  const displayName = userName && userName.trim() ? userName.trim() : 'Sadhaka';

  // Active goals list depends on editing mode
  const activeGoals = isEditing ? draftState : committedGoals;
  const shortTermGoals = activeGoals.filter((g) => g.type === 'SHORT_TERM');
  const longTermGoals = activeGoals.filter((g) => g.type === 'LONG_TERM');

  return (
    <div
      style={{
        backgroundColor: '#FDFBF7',
        color: '#1E293B',
      }}
      className={`w-full min-h-full pb-16 space-y-5 ${className}`}
    >
      {/* ================= TOP VIEWPORT HEADER ================= */}
      <header className="space-y-3">
        {/* Dynamic Greeting directly subscribing to global userName */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-charcoal tracking-tight">
              Hello, {displayName}!
            </h1>
            <p className="text-xs text-charcoal/60 mt-0.5">
              Welcome to your sacred intention space.
            </p>
          </div>

          <div
            aria-label="Sankalpa Flame"
            className="w-10 h-10 rounded-2xl bg-orange-100/70 text-terracotta border border-orange-200/80 flex items-center justify-center shadow-xs"
          >
            <Flame className="w-5 h-5" />
          </div>
        </div>

        {/* Vedic Sankalpa Philosophical Anchor Card */}
        <div className="p-4 rounded-2xl bg-white/80 border border-[#E2E8F0] shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-terracotta bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200/50">
              <Target className="w-3 h-3" />
              <span>Vedic Sankalpa</span>
            </span>

            {onOpenShastraLens && (
              <button
                type="button"
                onClick={() => onOpenShastraLens('brahmacharya')}
                className="text-[11px] text-sage hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                <HelpCircle className="w-3 h-3" />
                <span>Shastra Insight</span>
              </button>
            )}
          </div>

          <p className="font-serif italic text-xs text-charcoal/80 leading-relaxed">
            “A Sankalpa is not a distant wish—it is a specific, present-tense resolve formulated by the intellect (Buddhi) to consciously steer the chariot of your mind.”
          </p>
        </div>
      </header>

      {/* Inline Editing Feedback Banner */}
      {isEditing && (
        <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl flex items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <p className="text-xs text-amber-900 font-medium">
              Editing inline • Spatial context preserved across all timelines
            </p>
          </div>
          <button
            type="button"
            onClick={handleCancelEdit}
            className="text-[11px] font-semibold text-charcoal/60 hover:text-charcoal px-2 py-0.5 rounded hover:bg-black/5 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}

      {/* ================= 1. SHORT-TERM CONTAINER (TOP OF VIEWPORT FOR F-PATTERN SCANNING) ================= */}
      <ShortTermListContainer
        goals={shortTermGoals}
        isEditing={isEditing}
        onUpdateGoalText={handleUpdateGoalText}
        onDeleteGoal={handleDeleteGoal}
        onAddGoal={() => handleAddGoal('SHORT_TERM')}
      />

      {/* ================= 2. LONG-TERM CONTAINER (HORIZON GOALS) ================= */}
      <LongTermListContainer
        goals={longTermGoals}
        isEditing={isEditing}
        onUpdateGoalText={handleUpdateGoalText}
        onDeleteGoal={handleDeleteGoal}
        onAddGoal={() => handleAddGoal('LONG_TERM')}
      />

      {/* ================= INLINE BATCH EDITING ACTION BUTTON AT BOTTOM ================= */}
      <div className="pt-3 border-t border-[#E2E8F0] flex items-center gap-3">
        {isEditing && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="flex-1 py-3 rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50 text-charcoal text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Discard</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleToggleEdit}
          className={`flex-1 py-3 rounded-xl text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer ${
            isEditing
              ? 'bg-sage hover:bg-emerald-800'
              : 'bg-terracotta hover:bg-terracotta-dark'
          }`}
        >
          {isEditing ? (
            <>
              <Check className="w-4 h-4" />
              <span>Update List</span>
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4" />
              <span>Edit List</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SankalpaHub;
