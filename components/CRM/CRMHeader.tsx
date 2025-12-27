
import React from 'react';
import { Search, UserPlus } from 'lucide-react';

interface CRMHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddClick?: () => void;
}

export const CRMHeader: React.FC<CRMHeaderProps> = ({ searchQuery, setSearchQuery, onAddClick }) => {
  return (
    <header className="flex items-center justify-between mb-12">
      <div>
        <h2 className="text-4xl font-serif mb-2">CRM</h2>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center space-x-2">
          <span>FashionOS</span>
          <span className="text-gray-200">/</span>
          <span>Relationships & Network</span>
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={16} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contacts..." 
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm w-64 focus:outline-none focus:ring-1 focus:ring-black transition-all"
          />
        </div>
        <button 
          onClick={onAddClick}
          className="px-6 py-2 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center space-x-2 shadow-sm"
        >
          <UserPlus size={14} />
          <span>Add Contact</span>
        </button>
      </div>
    </header>
  );
};
