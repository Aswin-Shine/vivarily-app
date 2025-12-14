import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="w-12 h-12 mb-6 opacity-90 relative">
         <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
           <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="1" fill="url(#logoGradient)" fillOpacity="0.2"/>
           <path d="M12 6L6 12L12 18L18 12L12 6Z" stroke="currentColor" strokeWidth="0.5" />
           <defs>
             <linearGradient id="logoGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
               <stop stopColor="white" stopOpacity="0.5"/>
               <stop offset="1" stopColor="white" stopOpacity="0"/>
             </linearGradient>
           </defs>
         </svg>
      </div>
      <h1 className="text-5xl md:text-7xl font-display font-light tracking-[0.2em] text-white mb-3">
        VIVARILY
      </h1>
      <p className="text-sm md:text-base text-gray-400 font-light tracking-widest uppercase ml-1">
        Software and App Development
      </p>
    </div>
  );
};

export default Logo;
