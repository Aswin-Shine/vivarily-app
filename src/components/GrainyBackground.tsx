import React from 'react';

const GrainyBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Dark Base */}
      <div className="absolute inset-0 bg-[#030712]"></div>

      {/* Gradient Blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[80vh] h-[80vh] bg-blue-600 rounded-full blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute top-[20%] right-[-20%] w-[100vh] h-[100vh] bg-teal-500 rounded-full blur-[160px] opacity-15"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-[60vh] h-[60vh] bg-emerald-600 rounded-full blur-[120px] opacity-20"></div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}></div>
    </div>
  );
};

export default GrainyBackground;
