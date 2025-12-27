
import React from 'react';
import { MoreHorizontal, Layout, CheckSquare, Square } from 'lucide-react';
import { Contact } from '../../types';

interface CRMPartnerTableProps {
  contacts: Contact[];
  onContactClick?: (contact: Contact) => void;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
}

export const CRMPartnerTable: React.FC<CRMPartnerTableProps> = ({ 
  contacts, 
  onContactClick, 
  selectedIds, 
  onToggleSelect,
  onSelectAll
}) => {
  const getRSVPStatus = (contact: Contact) => {
    return contact.rsvpHistory.length > 0 ? contact.rsvpHistory[0].status : null;
  };

  const allSelected = contacts.length > 0 && selectedIds.length === contacts.length;

  if (contacts.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-[40px] p-20 text-center shadow-sm mb-32">
        <p className="text-xl font-serif mb-2 text-gray-400 italic">No partners found in local mesh</p>
        <p className="text-sm text-gray-300">Try adjusting your filters or strategic search query.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-sm mb-32 transition-all duration-300">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-50 bg-gray-50/30">
            <th className="px-8 py-6 w-12">
              <button onClick={onSelectAll} className="text-gray-300 hover:text-black transition-colors">
                {allSelected ? <CheckSquare size={16} /> : <Square size={16} />}
              </button>
            </th>
            <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Partner</th>
            <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center">Category / Status</th>
            <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center">Show RSVP</th>
            <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center">Placements</th>
            <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Activity</th>
            <th className="px-8 py-6"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {contacts.map((contact) => (
            <tr 
              key={contact.id} 
              className={`group transition-all duration-300 cursor-pointer ${
                selectedIds.includes(contact.id) ? 'bg-indigo-50/30' : 'hover:bg-gray-50/50'
              }`}
            >
              <td className="px-8 py-6">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSelect(contact.id);
                  }} 
                  className={`transition-colors ${selectedIds.includes(contact.id) ? 'text-indigo-600' : 'text-gray-200 group-hover:text-gray-400'}`}
                >
                  {selectedIds.includes(contact.id) ? <CheckSquare size={16} /> : <Square size={16} />}
                </button>
              </td>
              <td className="px-8 py-6" onClick={() => onContactClick?.(contact)}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center font-serif text-lg text-gray-500 group-hover:scale-105 transition-transform duration-300 border border-transparent group-hover:border-gray-200">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black">{contact.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center space-x-2">
                       <span>{contact.role}</span>
                       <span className="text-gray-200">/</span>
                       <span className="text-black">{contact.company}</span>
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-6 text-center" onClick={() => onContactClick?.(contact)}>
                <div className="flex flex-col items-center space-y-1">
                  <span className="px-3 py-1 bg-gray-50 text-[8px] font-black uppercase tracking-widest rounded-full text-gray-500 border border-gray-100">
                    {contact.category}
                  </span>
                  <span className={`text-[8px] font-black uppercase tracking-widest ${
                    contact.status === 'Active' ? 'text-emerald-500' : 
                    contact.status === 'Lead' ? 'text-amber-500' : 'text-gray-400'
                  }`}>
                    {contact.status}
                  </span>
                </div>
              </td>
              <td className="px-8 py-6 text-center" onClick={() => onContactClick?.(contact)}>
                {getRSVPStatus(contact) ? (
                  <div className="flex flex-col items-center">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      getRSVPStatus(contact) === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {getRSVPStatus(contact)}
                    </span>
                  </div>
                ) : (
                  <span className="text-[10px] text-gray-200 font-bold uppercase tracking-widest italic">—</span>
                )}
              </td>
              <td className="px-8 py-6 text-center" onClick={() => onContactClick?.(contact)}>
                <div className="flex items-center justify-center space-x-2">
                   <Layout size={12} className="text-gray-300" />
                   <span className="text-sm font-serif font-bold">{contact.placements || 0}</span>
                </div>
              </td>
              <td className="px-8 py-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest" onClick={() => onContactClick?.(contact)}>
                {contact.lastContact}
              </td>
              <td className="px-8 py-6 text-right">
                <button className="p-2 text-gray-300 hover:text-black transition-colors opacity-0 group-hover:opacity-100">
                  <MoreHorizontal size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
