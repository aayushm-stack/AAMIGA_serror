import React from 'react';
import { Search } from 'lucide-react';

interface ShastraLensButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
}

export const ShastraLensButton: React.FC<ShastraLensButtonProps> = ({
  onClick,
  label = 'Inspect Shastra Lens',
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-terracotta border border-orange-200 text-xs font-medium shadow-xs hover:bg-orange-100 hover:border-orange-300 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta/30 active:scale-95 cursor-pointer ${className}`}
    >
      <Search className="w-3.5 h-3.5 stroke-[2.2]" />
      <span>{label}</span>
    </button>
  );
};

export default ShastraLensButton;
