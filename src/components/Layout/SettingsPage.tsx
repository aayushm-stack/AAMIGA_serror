import React from 'react';
import { useBrahmaPath } from '../../context/BrahmaPathContext';
import { User, AlertTriangle, ShieldCheck, Sparkles, Trash2 } from 'lucide-react';

export interface SettingsPageProps {
  className?: string;
  setActiveView?: (view: string) => void;
}

/**
 * SettingsPage handles user identity preferences and destructive data management.
 *
 * Implements:
 * - Profile section with auto-saving Name input and Sankalpa (Purpose) textarea.
 * - Danger Zone Data Management section.
 * - Full-width destructive button: [ Reset All Sadhana Data ] styled with border-red-500 text-red-600.
 * - Safety Lock confirmation prompt:
 *   window.confirm("Are you sure you want to erase your entire Sadhana history? This cannot be undone.")
 * - Instant execution of resetAllData() and redirect via setActiveView('home').
 */
export const SettingsPage: React.FC<SettingsPageProps> = ({
  className = '',
  setActiveView: setActiveViewProp,
}) => {
  const { preferences, updatePreferences, resetAllData, setActiveView: contextSetActiveView } =
    useBrahmaPath();

  // Prefer prop if provided, otherwise fallback to context routing
  const setActiveView = setActiveViewProp || contextSetActiveView;

  // Handle destructive data reset with safety confirmation dialog
  const handleResetData = () => {
    if (
      window.confirm(
        'Are you sure you want to erase your entire Sadhana history? This cannot be undone.'
      )
    ) {
      resetAllData();
      setActiveView('home');
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto p-4 space-y-6 pb-24 ${className}`}>
      {/* Page Title & Context Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-2">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              Personal Sanctum &amp; Config
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
            Local-First
          </span>
        </div>

        <div className="space-y-1 pt-1">
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Settings &amp; Preferences
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Manage your personal identity, sacred Sankalpa purpose, and local data persistence.
          </p>
        </div>
      </div>

      {/* TOP SECTION: User Identity / Profile */}
      <section
        aria-label="User Profile"
        className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-5"
      >
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center">
            <User className="w-4 h-4 text-[#D97706]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Profile
            </h2>
            <p className="text-[11px] text-slate-500">
              Identity parameters auto-saved to device storage
            </p>
          </div>
        </div>

        {/* Name Input Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="profile-name-input"
            className="text-xs font-bold text-slate-800 uppercase tracking-wider block"
          >
            Name
          </label>
          <div className="relative">
            <input
              id="profile-name-input"
              type="text"
              value={preferences.name ?? ''}
              onChange={(e) => updatePreferences({ name: e.target.value })}
              placeholder="e.g., Arjuna, Sadhaka..."
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/60 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition shadow-2xs"
            />
          </div>
          <p className="text-[11px] text-slate-400 leading-normal">
            Used across daily greetings, reflection logs, and chariot reports.
          </p>
        </div>

        {/* Sankalpa (Purpose) Textarea */}
        <div className="space-y-1.5">
          <label
            htmlFor="profile-sankalpa-input"
            className="text-xs font-bold text-slate-800 uppercase tracking-wider block"
          >
            Sankalpa (Purpose)
          </label>
          <div className="relative">
            <textarea
              id="profile-sankalpa-input"
              rows={3}
              value={preferences.sankalpa ?? ''}
              onChange={(e) => updatePreferences({ sankalpa: e.target.value })}
              placeholder="e.g., Conserve cognitive energy and cultivate Sattvic clarity..."
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/60 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition shadow-2xs resize-none"
            />
          </div>
          <p className="text-[11px] text-slate-400 leading-normal">
            Your solemn intention anchoring your mind when distracted or fatigued.
          </p>
        </div>

        {/* Dynamic preview / auto-save status banner */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px]">Auto-saved on change</span>
          </div>
          <span className="text-[11px] font-serif italic text-amber-800">
            Namaste, {preferences.name?.trim() ? preferences.name : 'Sadhaka'} 🙏
          </span>
        </div>
      </section>

      {/* MIDDLE SECTION: Data Management / Danger Zone */}
      <section
        aria-label="Data Management Danger Zone"
        className="bg-white rounded-3xl p-6 border border-rose-200/80 shadow-xs space-y-4"
      >
        <div className="flex items-center gap-2.5 pb-3 border-b border-rose-100">
          <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-rose-900 uppercase tracking-wider">
              Data Management
            </h2>
            <p className="text-[11px] text-rose-700/80">
              Irreversible actions affecting your local storage
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-rose-50/70 border border-rose-200/60 rounded-2xl text-xs text-rose-800 leading-relaxed space-y-1">
          <p className="font-semibold text-rose-900">
            Erase Entire Sadhana History
          </p>
          <p className="text-[11px] text-rose-700">
            This will permanently erase all logged daily sadhanas, Pratipaksha interceptions,
            and custom preferences from this browser. You will be redirected to the clean resting chariot dashboard.
          </p>
        </div>

        {/* Destructive Action Button */}
        <button
          type="button"
          onClick={handleResetData}
          className="w-full py-3.5 px-4 rounded-2xl border-2 border-red-500 text-red-600 bg-red-50/60 hover:bg-red-100 active:scale-[0.98] font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <Trash2 className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>Reset All Sadhana Data</span>
        </button>
      </section>

      {/* Safe Privacy Disclaimer */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3 text-xs text-slate-500 leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
        <p className="text-[11px]">
          BrahmaPath operates entirely offline in your browser. No telemetry, biometric, or reflection data is ever sent to external cloud servers.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
