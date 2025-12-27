
import React from 'react';
import { MoreHorizontal, Layout } from 'lucide-react';
import { Contact } from '../../types';

interface CRMPartnerTableProps {
  contacts: Contact[];
  onContactClick?: (contact: Contact) => void;
}

export const CRMPartnerTable: React.FC<CRMPartnerTableProps> = ({ contacts, onContactClick }) => {
  const getRSVPStatus = (contact: Contact) => {
    return contact.rsvpHistory.length > 0 ? contact.rsvpHistory[0].status : null;
  };

  if (contacts.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-[40px] p-20 text-center shadow-sm mb-32">
        <p className="text-xl font-serif mb-2">No partners found</p>
        <p className="text-sm text-gray-400">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-sm mb-32 transition-all duration-300">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-50">
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
              onClick={() => onContactClick?.(contact)}
              className="group hover:bg-gray-50/50 transition-colors cursor-pointer"
            >
              <td className="px-8 py-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center font-serif text-lg text-gray-500 group-hover:scale-105 transition-transform duration-300">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black">{contact.name}</p>
                    <p className="text-xs text-gray-400">{contact.role} at {contact.company}</p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-6">
                <div className="flex flex-col items-center space-y-1">
                  <span className="px-3 py-1 bg-gray-100 text-[10px] font-bold rounded-full text-gray-500 border border-gray-100 uppercase tracking-widest">
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
              <td className="px-8 py-6 text-center">
                {getRSVPStatus(contact) ? (
                  <div className="flex flex-col items-center">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      getRSVPStatus(contact) === 'Confirmed' ? 'text-emerald-500' : 'text-amber-500'
                    }`}>
                      {getRSVPStatus(contact)}
                    </span>
                  </div>
                ) : (
                  <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest italic">—</span>
                )}
              </td>
              <td className="px-8 py-6 text-center">
                <div className="flex items-center justify-center space-x-2">
                   <Layout size={12} className="text-gray-300" />
                   <span className="text-sm font-serif font-bold">{contact.placements || 0}</span>
                </div>
              </td>
              <td className="px-8 py-6 text-xs text-gray-400 font-medium">
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
