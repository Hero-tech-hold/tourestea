
import React from 'react';
import { Coffee, MapPin } from 'lucide-react';

const Splash: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-teal-600 flex flex-col items-center justify-center text-white z-[9999]">
      <div className="relative animate-bounce mb-6">
        <div className="bg-white p-6 rounded-full shadow-2xl">
          <div className="relative">
            <Coffee size={64} className="text-teal-600" />
            <MapPin size={24} className="text-red-500 absolute -top-1 -right-1" />
          </div>
        </div>
      </div>
      <h1 className="text-4xl font-black tracking-tighter mb-2">Tourestea</h1>
      <p className="text-teal-100 font-medium tracking-wide">Real experiences. No filters.</p>
      
      <div className="absolute bottom-12 flex flex-col items-center gap-3">
        <div className="w-8 h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white animate-[loading_2s_ease-in-out_infinite] w-full"></div>
        </div>
        <span className="text-[10px] uppercase tracking-widest opacity-60">Brewing your feed</span>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Splash;
