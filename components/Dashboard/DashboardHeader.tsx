
import React from 'react';
import { Search } from 'lucide-react';

export const DashboardHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-between mb-16">
      <div>
        <h2 className="text-4xl font-serif mb-2">Command</h2>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center space-x-2">
          <span>FASHIONOS</span>
          <span className="text-gray-200">/</span>
          <span>SYSTEM UNIT 01</span>
        </p>
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search OS..." 
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm w-64 focus:outline-none focus:ring-1 focus:ring-black transition-all"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-bold uppercase">⌘ K</span>
        </div>
        <button className="px-6 py-2 bg-white border border-gray-100 text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:border-black transition-all shadow-sm">
          Neural Sync
        </button>
        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden ring-2 ring-white shadow-sm">
           <img src="https://picsum.photos/seed/maison/100/100" alt="Avatar" />
        </div>
      </div>
    </header>
  );
};
