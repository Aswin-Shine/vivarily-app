import React from 'react';

const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center pointer-events-none perspective-1000">
      {/* Central Glowing Core */}
      <div className="absolute w-32 h-32 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
      
      {/* Rotating Rings */}
      <div className="relative w-[500px] h-[500px] opacity-30 animate-[spin_60s_linear_infinite]">
        <svg viewBox="0 0 500 500" className="w-full h-full">
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0" />
              <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Outer Ring */}
          <circle cx="250" cy="250" r="248" stroke="url(#ringGradient)" strokeWidth="1" fill="none" strokeDasharray="10 20" />
          <circle cx="250" cy="250" r="248" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="100 400" className="animate-[spin_10s_linear_infinite_reverse] origin-center" />
          
          {/* Middle Ring */}
          <circle cx="250" cy="250" r="180" stroke="#334155" strokeWidth="1" fill="none" strokeDasharray="4 8" />
          
          {/* Inner Geometries */}
          <path d="M250 100 L380 325 L120 325 Z" stroke="#2dd4bf" strokeWidth="0.5" fill="none" opacity="0.5" className="animate-[spin_20s_linear_infinite] origin-center" />
          <rect x="175" y="175" width="150" height="150" stroke="#94a3b8" strokeWidth="0.5" fill="none" className="animate-[spin_15s_linear_infinite_reverse] origin-center" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-teal-500 rounded-full blur-[2px] animate-bounce delay-100 opacity-60"></div>
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-blue-500 rounded-full blur-[1px] animate-bounce delay-700 opacity-60"></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-purple-500 rounded-full blur-[2px] animate-bounce delay-300 opacity-60"></div>
      </div>
    </div>
  );
};

export default HeroVisual;