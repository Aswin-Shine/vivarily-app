import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import GrainyBackground from './components/GrainyBackground';
import Logo from './components/Logo';
import NavigationButton from './components/NavigationButton';
import DetailView from './components/DetailView';
import ChatWidget from './components/ChatWidget';
import HeroVisual from './components/HeroVisual';
import ContactModal from './components/ContactModal';
import InfoView from './components/InfoView';
import { NAV_ITEMS } from './constants';
import { ViewState } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const currentItem = NAV_ITEMS.find(item => item.id === view);

  const handleNavClick = (id: ViewState) => {
    setView(id);
  };

  const handleBack = () => {
    setView('home');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col text-white selection:bg-teal-500 selection:text-black overflow-x-hidden">
      <GrainyBackground />

      <main className="relative z-10 flex-grow flex flex-col min-h-screen">
        {view === 'home' ? (
          <div className="flex-grow flex flex-col justify-center px-6 md:px-16 lg:px-24 py-12 lg:py-20 w-full max-w-[1800px] mx-auto animate-in fade-in duration-700 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 w-full items-center h-full">
              
              {/* Left Content */}
              <div className="lg:col-span-8 flex flex-col justify-center relative z-20">
                <Logo />
                
                <div className="flex flex-wrap gap-4 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                  <button 
                    onClick={() => setIsContactModalOpen(true)}
                    className="px-8 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-sm transition-all shadow-[0_0_15px_rgba(20,184,166,0.1)] hover:shadow-[0_0_25px_rgba(20,184,166,0.3)] flex items-center gap-2 group tracking-wide text-sm md:text-base"
                  >
                    Start New Project
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                  
                  <button 
                    onClick={() => setView('website')}
                    className="px-8 py-3.5 border border-slate-700 hover:border-teal-500/50 bg-slate-900/30 hover:bg-slate-800/50 text-slate-300 hover:text-white rounded-sm transition-all tracking-wide text-sm md:text-base backdrop-blur-sm"
                  >
                    Learn More
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                  {NAV_ITEMS.map((item) => (
                    <NavigationButton 
                      key={item.id}
                      label={item.label}
                      onClick={() => handleNavClick(item.id)}
                    />
                  ))}
                </div>

                <div className="mt-16 md:mt-24 lg:mt-32 flex flex-col gap-6 opacity-70 hover:opacity-100 transition-opacity duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
                    <a 
                      href="https://www.google.com/search?q=%40vivarily" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-teal-500 hover:text-teal-400 transition-colors cursor-pointer w-fit group"
                    >
                      <span className="text-sm font-light tracking-wider group-hover:underline decoration-teal-500/50 underline-offset-4">@vivarily</span>
                    </a>

                    <button 
                       onClick={() => setView('terms')}
                       className="text-sm font-light tracking-wider text-slate-500 hover:text-white transition-colors text-left sm:text-center"
                    >
                      Terms of Service
                    </button>

                     <button 
                       onClick={() => setView('contact')}
                       className="text-sm font-light tracking-wider text-slate-500 hover:text-white transition-colors text-left sm:text-center"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Right Visual Content */}
              <div className="hidden lg:flex lg:col-span-4 h-full items-center justify-center relative min-h-[500px]">
                 <HeroVisual />
              </div>
            </div>
          </div>
        ) : view === 'terms' || view === 'contact' ? (
          <InfoView view={view} onBack={handleBack} />
        ) : (
          currentItem && <DetailView item={currentItem} onBack={handleBack} onOpenContact={() => setIsContactModalOpen(true)} />
        )}
      </main>

      <ChatWidget />
      {isContactModalOpen && <ContactModal title="Vivarily" onClose={() => setIsContactModalOpen(false)} />}
    </div>
  );
};

export default App;