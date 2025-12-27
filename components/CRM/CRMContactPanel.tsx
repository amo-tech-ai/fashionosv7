
import React from 'react';
import { X, MapPin, Instagram, Linkedin, Mail, Plus, Calendar, Star } from 'lucide-react';
import { Contact } from '../../types';
import { CRMContactTimelinePreview } from './CRMContactTimelinePreview';
import { CRMDealsPreview } from './CRMDealsPreview';

interface CRMContactPanelProps {
  contact: Contact;
  onClose: () => void;
}

export const CRMContactPanel: React.FC<CRMContactPanelProps> = ({ contact, onClose }) => {
  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white z-20 pb-6 border-b border-gray-50">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-xl font-serif text-gray-400 border border-gray-50">
              {contact.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-black leading-tight">{contact.name}</h3>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">{contact.role}</p>
              <p className="text-[10px] text-black font-bold uppercase tracking-widest mt-0.5">{contact.company}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-50 rounded-full transition-colors">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-black text-white text-[8px] font-black uppercase tracking-widest rounded-full">
            {contact.category}
          </span>
          <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full border ${
            contact.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-gray-50 text-gray-400 border-gray-100'
          }`}>
            {contact.status}
          </span>
          {contact.city && (
            <span className="px-3 py-1 bg-gray-50 text-gray-400 text-[8px] font-black uppercase tracking-widest rounded-full border border-gray-100 flex items-center">
              <MapPin size={8} className="mr-1" />
              {contact.city}
            </span>
          )}
        </div>

        {/* Social Quick Links */}
        <div className="flex items-center space-x-2">
          {contact.socials.instagram && (
            <button className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-black transition-colors">
              <Instagram size={14} />
            </button>
          )}
          {contact.socials.linkedin && (
            <button className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-black transition-colors">
              <Linkedin size={14} />
            </button>
          )}
          <button className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-black transition-colors">
            <Mail size={14} />
          </button>
        </div>
      </div>

      {/* Internal Scroll Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-8 space-y-10">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-4 border-b border-gray-50 pb-10">
          <div className="text-center">
            <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-1.5">RSVP Status</p>
            <p className="text-[10px] font-bold text-emerald-500 uppercase">Confirmed</p>
          </div>
          <div className="text-center border-x border-gray-50">
            <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-1.5">Placements</p>
            <p className="text-[10px] font-bold text-black">{contact.placements || 0}</p>
          </div>
          <div className="text-center">
            <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-1.5">Last Contact</p>
            <p className="text-[10px] font-bold text-black uppercase">{contact.lastContact}</p>
          </div>
        </div>

        {/* Relationship History Preview */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Relationship History</h4>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-400">
              <Plus size={14} />
            </button>
          </div>
          <CRMContactTimelinePreview history={contact.interactionHistory} />
        </div>

        {/* Active Deals Preview */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Active Deals</h4>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-400">
              <Plus size={14} />
            </button>
          </div>
          <CRMDealsPreview deals={contact.deals} />
        </div>

        {/* Intelligence Note */}
        <div className="p-5 bg-zinc-900 rounded-2xl">
          <div className="flex items-center space-x-2 mb-3 text-amber-400">
            <Star size={10} fill="currentColor" />
            <span className="text-[8px] font-black uppercase tracking-widest">AI Suggestion</span>
          </div>
          <p className="text-[10px] text-zinc-300 leading-relaxed italic">
            "High priority follow-up needed for SS25 showroom booking. Leverage Harrods connection for EMEA exclusivity."
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-auto pt-6 border-t border-gray-50 flex space-x-3">
        <button className="flex-1 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity">
          Full Dossier
        </button>
        <button className="flex-1 py-3 bg-white border border-gray-100 text-black text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-colors">
          Log Handshake
        </button>
      </div>
    </div>
  );
};
