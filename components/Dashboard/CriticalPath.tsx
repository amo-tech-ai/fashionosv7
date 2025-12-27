
import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';

export const CriticalPath: React.FC = () => {
  const tasks = [
    { label: 'Verify SS25 Runway Guest List', time: '8h Left', color: 'bg-rose-500', status: 'Priority' },
    { label: 'Finalize Campaign Assets v3', time: '24h Left', color: 'bg-amber-500', status: 'Pending' },
    { label: 'Audit Maison DNA Compliance', time: 'Today', color: 'bg-emerald-500', status: 'In Review' }
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-[32px] p-10 shadow-sm relative group overflow-hidden">
       <div className="flex items-center justify-between mb-10 relative z-10">
          <h4 className="text-3xl font-serif tracking-tight">Critical Path</h4>
          <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-black transition-colors">Complete All</button>
       </div>
       <div className="space-y-8 relative z-10">
          {tasks.map((task, idx) => (
            <div key={idx} className="flex items-center justify-between group/item cursor-pointer border-b border-gray-50 pb-6 last:border-0 last:pb-0">
               <div className="flex items-center space-x-6">
                  <div className="w-6 h-6 rounded-full border border-gray-200 group-hover/item:border-black transition-all flex items-center justify-center">
                     <div className={`w-2 h-2 rounded-full ${task.color} opacity-0 group-hover/item:opacity-100 transition-opacity`}></div>
                  </div>
                  <div>
                     <span className="text-sm font-semibold text-zinc-900 block mb-1">{task.label}</span>
                     <span className="text-[8px] font-black uppercase tracking-widest text-gray-300">{task.status}</span>
                  </div>
               </div>
               <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-gray-400">
                     <Clock size={12} />
                     <span className="text-[10px] font-bold uppercase tracking-widest">{task.time}</span>
                  </div>
                  <ChevronRight size={14} className="text-gray-200 group-hover/item:text-black transition-colors" />
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};
