
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Globe, 
  Tag, 
  TrendingUp, 
  History,
  UserPlus,
  Ticket,
  Layout
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  category: 'Designer' | 'Buyer' | 'Press' | 'Sponsor';
  status: 'Active' | 'Lead' | 'Archive';
  lastContact: string;
  rsvpStatus?: 'Confirmed' | 'Pending' | 'Declined';
  placements?: number;
}

const contacts: Contact[] = [
  { id: '1', name: 'Sarah Jenkins', role: 'Head Buyer', company: 'Harrods', category: 'Buyer', status: 'Active', lastContact: '2h ago', rsvpStatus: 'Confirmed', placements: 12 },
  { id: '2', name: 'Marco Rossi', role: 'Creative Director', company: 'Rossi Studio', category: 'Designer', status: 'Active', lastContact: '1d ago', placements: 4 },
  { id: '3', name: 'Elena Vance', role: 'Fashion Editor', company: 'Vogue France', category: 'Press', status: 'Lead', lastContact: '3d ago', rsvpStatus: 'Pending', placements: 28 },
  { id: '4', name: 'James Thorne', role: 'Global Marketing', company: 'LVMH', category: 'Sponsor', status: 'Active', lastContact: '5h ago', rsvpStatus: 'Confirmed', placements: 8 },
];

export const CRM: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Designer' | 'Buyer' | 'Press' | 'Sponsor'>('All');

  const filteredContacts = filter === 'All' 
    ? contacts 
    : contacts.filter(c => c.category === filter);

  return (
    <div className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#fcfcfc] p-12">
      {/* Header Area */}
      <header className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-4xl font-serif mb-2">CRM</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center space-x-2">
            <span>FashionOS</span>
            <span className="text-gray-200">/</span>
            <span>Relationships & Network</span>
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search contacts..." 
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm w-64 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <button className="p-2 bg-white border border-gray-100 rounded-full text-gray-400 hover:text-black hover:border-black transition-all">
            <Filter size={20} />
          </button>
          <button className="px-6 py-2 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center space-x-2">
            <UserPlus size={14} />
            <span>Add Contact</span>
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
        {[
          { label: 'Active Deals', value: '12', trend: '+2', icon: <TrendingUp size={16} /> },
          { label: 'Network Size', value: '1,240', trend: '+45', icon: <Globe size={16} /> },
          { label: 'Press Reach', value: '8.4M', trend: '+12%', icon: <Tag size={16} /> },
          { label: 'Show RSVPs', value: '142', trend: '+18', icon: <Ticket size={16} /> }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-xl text-gray-400">
                {stat.icon}
              </div>
              <span className={`text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-serif">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Main Content Area */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-serif">Key Partners</h3>
          <div className="flex space-x-2">
            {['All', 'Designer', 'Buyer', 'Press'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${
                  filter === cat ? 'bg-black text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-sm mb-32">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Partner</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center">Show RSVP</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center">Placements</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Activity</th>
                <th className="px-8 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center font-serif text-lg">
                        {contact.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-black">{contact.name}</p>
                        <p className="text-xs text-gray-400">{contact.role} at {contact.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-gray-100 text-[10px] font-bold rounded-full text-gray-500 border border-gray-100 uppercase tracking-widest">
                      {contact.category}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    {contact.rsvpStatus ? (
                      <div className="flex flex-col items-center">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${
                          contact.rsvpStatus === 'Confirmed' ? 'text-emerald-500' : 'text-amber-500'
                        }`}>
                          {contact.rsvpStatus}
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
      </div>
    </div>
  );
};
