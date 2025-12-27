
import React from 'react';
import { Plus, ShieldCheck, Zap } from 'lucide-react';

export const DashboardHero: React.FC = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <div className="space-y-8">
        <div className="flex items-center space-x-4">
           <span className="px-3 py-1 bg-white text-[10px] font-bold rounded-full text-emerald-600 border border-emerald-100 flex items-center space-x-1 shadow-sm">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
             SYSTEM NOMINAL
           </span>
           <span className="px-3 py-1 bg-white text-[10px] font-bold rounded-full text-gray-400 border border-gray-100 flex items-center shadow-sm">
             <ShieldCheck size={12} className="mr-1.5" />
             MAISON DNA VERIFIED
           </span>
        </div>
        <h3 className="text-7xl font-serif max-w-md leading-[1.1] tracking-tight">
          The Neural Maison.
        </h3>
        <p className="text-lg text-gray-400 font-light max-w-sm leading-relaxed">
          Network resonance is peaking at 92%. SS25 market signals indicate high-tier volatility.
        </p>
        <div className="flex items-center space-x-4 pt-4">
           <button className="px-8 py-4 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] flex items-center space-x-3 group shadow-xl hover:bg-zinc-800 transition-all">
             <Plus size={16} />
             <span>New Initiative</span>
           </button>
           <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://picsum.photos/seed/${i+42}/40/40`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="Team" />
              ))}
              <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-[10px] font-bold border-2 border-white">+6</div>
           </div>
        </div>
      </div>

      <div className="relative bg-white border border-gray-100 rounded-[40px] p-10 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500">
         <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
           <div className="w-80 h-80 border-2 border-dashed border-black rounded-full animate-[spin_20s_linear_infinite]"></div>
         </div>
         
         <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div className="mb-8 text-center">
               <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Neural Mesh Integrity</p>
               <div className="text-8xl font-serif text-black leading-none">92<span className="text-2xl align-top ml-1">%</span></div>
            </div>
            <div className="grid grid-cols-2 gap-12 w-full mt-4 border-t border-gray-50 pt-10">
               <div className="text-center">
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-2">Market Reach</p>
                  <p className="text-2xl font-serif text-emerald-500">+28.4%</p>
               </div>
               <div className="text-center">
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-2">Drift Factor</p>
                  <p className="text-2xl font-serif text-black">1.4%</p>
               </div>
            </div>
            <div className="flex justify-between w-full mt-10 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 px-8 border-t border-gray-50 pt-6">
               <span className="flex items-center"><Zap size={10} className="mr-2 text-indigo-500" /> Grounded Sync</span>
               <span className="text-emerald-500 font-black">Stable</span>
            </div>
         </div>
      </div>
    </section>
  );
};
