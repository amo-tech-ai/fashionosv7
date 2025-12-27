
import React from 'react';
import { 
  ArrowLeft, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Globe, 
  Mail, 
  Phone,
  MoreHorizontal,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { Contact } from '../../types';

interface CRMProfileDetailProps {
  contact: Contact;
  onBack: () => void;
}

export const CRMProfileDetail: React.FC<CRMProfileDetailProps> = ({ contact, onBack }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Navigation & Actions */}
      <div className="flex items-center justify-between mb-12">
        <button 
          onClick={onBack}
          className="group flex items-center space-x-2 text-gray-400 hover:text-black transition-colors"
        >
          <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-black transition-colors">
            <ArrowLeft size={14} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Back to Network</span>
        </button>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-400 hover:text-black transition-colors border border-gray-100 rounded-full">
            <Mail size={16} />
          </button>
          <button className="px-6 py-2 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
            Edit Profile
          </button>
          <button className="p-2 text-gray-400 hover:text-black transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <section className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
        <div className="flex items-center space-x-8">
          <div className="w-32 h-32 rounded-[40px] bg-gray-100 flex items-center justify-center text-4xl font-serif text-gray-400 border border-gray-50 shadow-inner">
            {contact.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
                {contact.status}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                {contact.category} Partner
              </span>
            </div>
            <h2 className="text-5xl font-serif mb-2 tracking-tight">{contact.name}</h2>
            <p className="text-gray-400 flex items-center space-x-2">
              <span className="font-medium text-black">{contact.role}</span>
              <span className="text-gray-200">/</span>
              <span>{contact.company}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {contact.socials.instagram && (
            <a href={`https://instagram.com/${contact.socials.instagram}`} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all">
              <Instagram size={16} />
            </a>
          )}
          {contact.socials.linkedin && (
            <a href="#" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all">
              <Linkedin size={16} />
            </a>
          )}
          <div className="h-10 w-px bg-gray-100 mx-2"></div>
          <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
            <MapPin size={12} />
            <span>Paris Office</span>
          </button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4 flex items-center">
            <TrendingUp size={12} className="mr-2 text-emerald-500" />
            Lifetime Value
          </p>
          <p className="text-3xl font-serif">$1.2M</p>
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-[10px] font-bold text-emerald-500">+12%</span>
            <span className="text-[10px] text-gray-300 font-medium">from previous season</span>
          </div>
        </div>
        <div className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4 flex items-center">
            <ShieldCheck size={12} className="mr-2 text-indigo-500" />
            Reliability Score
          </p>
          <p className="text-3xl font-serif">94%</p>
          <div className="mt-4 h-1 w-full bg-gray-50 rounded-full overflow-hidden">
            <div className="bg-black h-full w-[94%]"></div>
          </div>
        </div>
        <div className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4 flex items-center">
            <Globe size={12} className="mr-2 text-amber-500" />
            Network Influence
          </p>
          <p className="text-3xl font-serif">Tier I</p>
          <p className="mt-4 text-[10px] text-gray-400 font-medium leading-relaxed uppercase tracking-widest">Global Maison Connector</p>
        </div>
      </section>

      {/* Detail Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
        {/* Interaction History (Step 4 Placeholder) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-serif">Interaction History</h3>
            <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-black">Add Log</button>
          </div>
          <div className="bg-white border border-gray-100 rounded-[40px] p-12 text-center">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="text-gray-200" size={24} />
             </div>
             <p className="text-lg font-serif mb-2 text-gray-400 italic">Timeline Initializing...</p>
             <p className="text-xs text-gray-300">Detailed handshake logs will appear here in Step 4.</p>
          </div>
        </div>

        {/* Sidebar Info (Step 5 Placeholder) */}
        <div className="space-y-12">
          <div>
            <h3 className="text-xl font-serif mb-6">Active Deals</h3>
            <div className="space-y-4">
              {contact.deals.length > 0 ? contact.deals.map(deal => (
                <div key={deal.id} className="p-6 bg-gray-50 rounded-[24px] border border-gray-100 group cursor-pointer hover:bg-white transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-[10px] font-black uppercase text-black leading-tight max-w-[150px]">{deal.title}</p>
                    <ExternalLink size={12} className="text-gray-300 group-hover:text-black transition-colors" />
                  </div>
                  <div className="flex justify-between items-baseline">
                    <p className="text-xl font-serif">{deal.value}</p>
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{deal.stage}</span>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-gray-400 italic">No active deals found.</p>
              )}
            </div>
          </div>

          <div className="p-8 bg-zinc-900 text-white rounded-[32px]">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6">Brand DNA Notes</h4>
            <p className="text-sm font-light leading-relaxed mb-6 italic text-zinc-300">
              "Strong affinity for SS25 avant-garde direction. High potential for London flagship exclusivity."
            </p>
            <button className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 underline underline-offset-4">
              Update Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
