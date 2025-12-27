
import React from 'react';
import { Filter, X } from 'lucide-react';
import { ContactCategory, ContactStatus } from '../../types';

interface CRMFilterHUDProps {
  selectedCategories: ContactCategory[];
  toggleCategory: (cat: ContactCategory) => void;
  selectedStatuses: ContactStatus[];
  toggleStatus: (status: ContactStatus) => void;
  clearFilters: () => void;
}

const CATEGORIES: ContactCategory[] = ['Designer', 'Buyer', 'Press', 'Sponsor'];
const STATUSES: ContactStatus[] = ['Active', 'Lead', 'Archive'];

export const CRMFilterHUD: React.FC<CRMFilterHUDProps> = ({
  selectedCategories,
  toggleCategory,
  selectedStatuses,
  toggleStatus,
  clearFilters
}) => {
  const hasActiveFilters = selectedCategories.length > 0 || selectedStatuses.length > 0;

  return (
    <section className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-sm mb-12">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-400">
            <Filter size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Advanced Filters</span>
          </div>
          {hasActiveFilters && (
            <button 
              onClick={clearFilters}
              className="text-[10px] text-rose-500 font-bold uppercase tracking-widest flex items-center hover:opacity-80 transition-opacity"
            >
              <X size={12} className="mr-1" />
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-4">By Category</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full border transition-all ${
                    selectedCategories.includes(cat)
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-4">By Status</p>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map(status => (
                <button
                  key={status}
                  onClick={() => toggleStatus(status)}
                  className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full border transition-all ${
                    selectedStatuses.includes(status)
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
