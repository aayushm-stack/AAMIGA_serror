import React from 'react';
import { Home, ClipboardList, Compass, Wind } from 'lucide-react';

export type NavTab = 'home' | 'log' | 'compass' | 'breathe';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'log', label: 'Log', icon: ClipboardList },
  { id: 'compass', label: 'Compass', icon: Compass },
  { id: 'breathe', label: 'Breathe', icon: Wind },
];

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 z-30">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-xl transition-colors duration-150 ${
                isActive
                  ? 'text-terracotta'
                  : 'text-gray-400 hover:text-charcoal'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform duration-150 ${
                  isActive ? 'scale-110' : ''
                }`}
              />
              <span
                className={`text-[11px] mt-1 font-medium leading-none ${
                  isActive ? 'text-terracotta font-semibold' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
