import React from 'react';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

interface NavigationButtonProps {
  label: string;
  onClick: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative w-full border border-slate-700/50 hover:border-teal-500/50 bg-slate-900/40 hover:bg-slate-800/60 backdrop-blur-sm transition-all duration-500 p-6 md:p-8 flex items-center justify-between overflow-hidden rounded-sm hover:shadow-[0_0_30px_rgba(45,212,191,0.15)] hover:-translate-y-1 gap-6"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/5 to-teal-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
      
      <div className="flex flex-col items-start gap-1 z-10">
        <span className="font-display text-sm md:text-base tracking-[0.15em] text-slate-300 group-hover:text-white transition-colors uppercase whitespace-nowrap">
            {label}
        </span>
        <div className="h-[1px] w-0 group-hover:w-8 bg-teal-500 transition-all duration-300"></div>
      </div>
      
      <div className="relative z-10 w-8 h-8 flex items-center justify-center border border-slate-700 rounded-full group-hover:border-teal-500/50 transition-colors duration-300 bg-slate-900/50 shrink-0">
        <ArrowUpRight 
            className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-all duration-300 group-hover:scale-110" 
        />
      </div>
    </button>
  );
};

export default NavigationButton;