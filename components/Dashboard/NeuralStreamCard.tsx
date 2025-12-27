
import React from 'react';
import { Sparkles, Zap } from 'lucide-react';

export const NeuralStreamCard: React.FC = () => {
  return (
    <div className="bg-zinc-900 text-white rounded-[40px] p-12 flex flex-col justify-between items-start relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-12 opacity-5 scale-150">
         <Zap size={120} />
      </div>
      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
         <Sparkles size={28} className="text-white" />
      </div>
      <div className="relative z-10">
         <h4 className="text-4xl font-serif mb-6 leading-[1.1]">Neural Stream Active.</h4>
         <p className="text-sm text-zinc-400 font-light mb-10 max-w-[240px] leading-relaxed italic">
           OS Intelligence is monitoring 1.2k nodes. Handshake detected at Harrods HQ.
         </p>
         <button className="px-10 py-4 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-50 transition-all shadow-xl">
            Analyze Signals
         </button>
      </div>
    </div>
  );
};
