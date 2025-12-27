
import React from 'react';
import { Mail, Tag, Archive, Trash2, X } from 'lucide-react';

interface CRMBulkActionsProps {
  selectedCount: number;
  onClear: () => void;
  onArchive: () => void;
  onTag: () => void;
  onEmail: () => void;
}

export const CRMBulkActions: React.FC<CRMBulkActionsProps> = ({ 
  selectedCount, 
  onClear, 
  onArchive, 
  onTag, 
  onEmail 
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-4 rounded-2xl shadow-2xl z-[100] flex items-center space-x-8 animate-in slide-in-from-bottom-8 duration-500">
      <div className="flex items-center space-x-4 pr-8 border-r border-white/10">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Selected</span>
        <span className="text-xl font-serif">{selectedCount}</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <button 
          onClick={onEmail}
          className="p-3 hover:bg-white/10 rounded-xl transition-colors flex items-center space-x-2"
        >
          <Mail size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Outreach</span>
        </button>
        <button 
          onClick={onTag}
          className="p-3 hover:bg-white/10 rounded-xl transition-colors flex items-center space-x-2"
        >
          <Tag size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Tag</span>
        </button>
        <button 
          onClick={onArchive}
          className="p-3 hover:bg-white/10 rounded-xl transition-colors flex items-center space-x-2 text-amber-400"
        >
          <Archive size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Archive</span>
        </button>
      </div>

      <button 
        onClick={onClear}
        className="p-3 hover:bg-rose-500/20 text-gray-400 hover:text-white transition-all rounded-xl"
      >
        <X size={16} />
      </button>
    </div>
  );
};
