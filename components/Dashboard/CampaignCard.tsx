
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const CampaignCard: React.FC = () => {
  return (
    <div className="group bg-white border border-gray-100 rounded-[32px] p-8 relative overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer h-full">
       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Active Campaign</p>
       <span className="absolute top-8 right-8 text-[8px] px-2 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full uppercase font-black tracking-widest">In Progress</span>
       <div className="flex justify-between items-end mt-12">
          <div>
            <h4 className="text-2xl font-serif mb-1 leading-tight">SS25 Paris Launch</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Paris • 14 days left</p>
          </div>
          <ArrowUpRight className="text-gray-300 group-hover:text-black transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
       </div>
       <div className="mt-10">
          <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-3">
             <span className="text-gray-400">Momentum Index</span>
             <span className="text-black">74%</span>
          </div>
          <div className="w-full bg-gray-50 h-1.5 rounded-full overflow-hidden">
             <div className="bg-black h-full w-[74%] transition-all duration-1000"></div>
          </div>
       </div>
    </div>
  );
};
