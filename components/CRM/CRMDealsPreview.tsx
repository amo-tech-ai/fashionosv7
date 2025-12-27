
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Deal } from '../../types';

interface CRMDealsPreviewProps {
  deals: Deal[];
}

export const CRMDealsPreview: React.FC<CRMDealsPreviewProps> = ({ deals }) => {
  if (deals.length === 0) {
    return (
      <div className="py-8 text-center border border-dashed border-gray-100 rounded-2xl">
        <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">No active deals</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {deals.slice(0, 3).map((deal) => (
        <div key={deal.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-sm transition-all group">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[9px] font-black uppercase text-zinc-900 leading-tight max-w-[120px]">{deal.title}</p>
            <ExternalLink size={10} className="text-gray-300 group-hover:text-black" />
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-serif font-bold text-black">{deal.value}</span>
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{deal.stage}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
