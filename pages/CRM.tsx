
import React, { useState, useMemo, useEffect } from 'react';
import { Contact, ContactCategory, ContactStatus, InteractionLog, Deal } from '../types';
import { CRMHeader } from '../components/CRM/CRMHeader';
import { CRMStats } from '../components/CRM/CRMStats';
import { CRMFilterHUD } from '../components/CRM/CRMFilterHUD';
import { CRMPartnerTable } from '../components/CRM/CRMPartnerTable';
import { CRMBulkActions } from '../components/CRM/CRMBulkActions';
import { saveContacts, loadContacts } from '../services/persistenceService';
import { X, Plus, DollarSign } from 'lucide-react';

// Define initial mock data locally to avoid circular imports and provide data for the app
export const initialMockContacts: Contact[] = [
  {
    id: '1',
    name: 'Elena Vance',
    role: 'Editor-in-Chief',
    company: 'Vogue',
    category: 'Press',
    status: 'Active',
    lastContact: '2 days ago',
    city: 'New York',
    socials: { instagram: 'elenavance', linkedin: 'elena-vance' },
    deals: [
      { id: 'd1', title: 'SS25 Cover Feature', value: '$120,000', stage: 'Negotiation', projectedClose: '2024-09-01' }
    ],
    interactionHistory: [
      { id: 'h1', type: 'Email', title: 'Editorial Inquiry', description: 'Discussing SS25 collection preview.', date: '2 days ago' }
    ],
    rsvpHistory: [
      { eventId: 'e1', eventName: 'Paris Afterparty', status: 'Confirmed' }
    ],
    placements: 12
  },
  {
    id: '2',
    name: 'Julian Thorne',
    role: 'Head Buyer',
    company: 'Harrods',
    category: 'Buyer',
    status: 'Active',
    lastContact: '5 hours ago',
    city: 'London',
    socials: { linkedin: 'julian-thorne-harrods' },
    deals: [
      { id: 'd2', title: 'Autumn/Winter Stocking', value: '$450,000', stage: 'Contracting', projectedClose: '2024-08-15' }
    ],
    interactionHistory: [
      { id: 'h2', type: 'Meeting', title: 'Showroom Visit', description: 'Reviewing core collection samples.', date: '5 hours ago' }
    ],
    rsvpHistory: [
      { eventId: 'e2', eventName: 'SS25 Main Show', status: 'Confirmed' }
    ],
    placements: 0
  }
];

export const mockContacts = initialMockContacts;

interface CRMProps {
  onSelectContact: (id: string | null) => void;
  selectedContactId: string | null;
}

export const CRM: React.FC<CRMProps> = ({ onSelectContact, selectedContactId }) => {
  const [contacts, setContacts] = useState<Contact[]>(() => loadContacts(initialMockContacts));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<ContactCategory[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<ContactStatus[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);

  // Sync with LocalStorage
  useEffect(() => {
    saveContacts(contacts);
  }, [contacts]);

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            contact.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(contact.category);
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(contact.status);
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [contacts, searchQuery, selectedCategories, selectedStatuses]);

  useEffect(() => {
    const handleLogRequest = () => setIsLogModalOpen(true);
    const handleDealRequest = () => setIsDealModalOpen(true);
    const handleUpdateRequest = (e: any) => {
      const { id, updates } = e.detail;
      setContacts(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    };

    window.addEventListener('log-handshake', handleLogRequest);
    window.addEventListener('add-deal', handleDealRequest);
    window.addEventListener('update-contact', handleUpdateRequest);
    
    return () => {
      window.removeEventListener('log-handshake', handleLogRequest);
      window.removeEventListener('add-deal', handleDealRequest);
      window.removeEventListener('update-contact', handleUpdateRequest);
    };
  }, []);

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredContacts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredContacts.map(c => c.id));
    }
  };

  const handleBulkArchive = () => {
    setContacts(prev => prev.map(c => selectedIds.includes(c.id) ? { ...c, status: 'Archive' } : c));
    setSelectedIds([]);
  };

  const handleAddContact = (newContact: Partial<Contact>) => {
    const contact: Contact = {
      id: Math.random().toString(36).substr(2, 9),
      name: newContact.name || 'Unknown',
      role: newContact.role || 'Partner',
      company: newContact.company || 'Maison',
      category: newContact.category || 'Designer',
      status: newContact.status || 'Lead',
      city: newContact.city || 'Paris',
      lastContact: 'Just now',
      socials: {},
      deals: [],
      interactionHistory: [],
      rsvpHistory: [],
      placements: 0,
      ...newContact
    };
    setContacts(prev => [contact, ...prev]);
    setIsAddModalOpen(false);
  };

  const handleLogInteraction = (log: Partial<InteractionLog>) => {
    if (!selectedContactId) return;
    setContacts(prev => prev.map(c => {
      if (c.id === selectedContactId) {
        return {
          ...c,
          interactionHistory: [
            { id: Date.now().toString(), date: 'Today', title: 'Note', type: 'Note', description: '', ...log } as InteractionLog,
            ...c.interactionHistory
          ],
          lastContact: 'Just now'
        };
      }
      return c;
    }));
    setIsLogModalOpen(false);
  };

  const handleAddDeal = (deal: Partial<Deal>) => {
    if (!selectedContactId) return;
    setContacts(prev => prev.map(c => {
      if (c.id === selectedContactId) {
        return {
          ...c,
          deals: [
            { id: Date.now().toString(), title: 'New Deal', value: '$0', stage: 'Prospect', projectedClose: '2024-12-31', ...deal } as Deal,
            ...c.deals
          ]
        };
      }
      return c;
    }));
    setIsDealModalOpen(false);
  };

  return (
    <div className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#fcfcfc] p-12 animate-in fade-in duration-700">
      <CRMHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        onAddClick={() => setIsAddModalOpen(true)}
      />

      <CRMFilterHUD 
        selectedCategories={selectedCategories}
        toggleCategory={(cat) => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])}
        selectedStatuses={selectedStatuses}
        toggleStatus={(status) => setSelectedStatuses(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status])}
        clearFilters={() => { setSelectedCategories([]); setSelectedStatuses([]); }}
      />

      <CRMStats />

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-serif">Key Partners</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Showing {filteredContacts.length} results
          </p>
        </div>
        
        <CRMPartnerTable 
          contacts={filteredContacts} 
          onContactClick={(contact) => {
            onSelectContact(selectedContactId === contact.id ? null : contact.id);
          }}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onSelectAll={handleSelectAll}
        />
      </div>

      <CRMBulkActions 
        selectedCount={selectedIds.length}
        onClear={() => setSelectedIds([])}
        onArchive={handleBulkArchive}
        onEmail={() => alert(`Initiating outreach to ${selectedIds.length} partners...`)}
        onTag={() => alert('Tagging wizard initializing...')}
      />

      {/* Modals remain same as previous version but with improved styling */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
          <div className="bg-white rounded-[32px] w-full max-w-lg relative z-10 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h2 className="text-2xl font-serif">Partner Onboarding</h2>
              <button onClick={() => setIsAddModalOpen(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form className="p-8 space-y-6" onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              handleAddContact({
                name: fd.get('name') as string,
                role: fd.get('role') as string,
                company: fd.get('company') as string,
                category: fd.get('category') as any,
                status: fd.get('status') as any,
                city: fd.get('city') as string
              });
            }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                  <input name="name" required className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:bg-white focus:ring-1 focus:ring-black outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Company</label>
                  <input name="company" required className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:bg-white focus:ring-1 focus:ring-black outline-none transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 text-indigo-500">Role</label>
                  <input name="role" required className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:bg-white focus:ring-1 focus:ring-black outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">City</label>
                  <input name="city" defaultValue="Paris" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:bg-white focus:ring-1 focus:ring-black outline-none transition-all" />
                </div>
              </div>
              <div className="flex space-x-4">
                <button type="submit" className="flex-1 bg-black text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-lg">Confirm Partner</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Handshake & Deal modals (same logic as before, ensure they are rendered correctly) */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsLogModalOpen(false)} />
          <div className="bg-white rounded-[32px] w-full max-w-md relative z-10 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h2 className="text-2xl font-serif">Handshake Log</h2>
              <button onClick={() => setIsLogModalOpen(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form className="p-8 space-y-6" onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              handleLogInteraction({
                title: fd.get('title') as string,
                type: fd.get('type') as any,
                description: fd.get('description') as string
              });
            }}>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Log Title</label>
                <input name="title" required placeholder="SS25 Collection Preview..." className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Type</label>
                <select name="type" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all">
                  <option value="Meeting">Meeting</option>
                  <option value="Email">Email</option>
                  <option value="Call">Call</option>
                  <option value="Placement">Placement</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Context</label>
                <textarea name="description" rows={3} className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all resize-none" />
              </div>
              <button type="submit" className="w-full bg-black text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors">Record Handshake</button>
            </form>
          </div>
        </div>
      )}

      {isDealModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsDealModalOpen(false)} />
          <div className="bg-white rounded-[32px] w-full max-w-md relative z-10 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                 <div className="p-2 bg-indigo-50 rounded-xl text-indigo-500">
                    <DollarSign size={18} />
                 </div>
                 <h2 className="text-2xl font-serif">Initialize Deal</h2>
              </div>
              <button onClick={() => setIsDealModalOpen(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form className="p-8 space-y-6" onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              handleAddDeal({
                title: fd.get('title') as string,
                value: fd.get('value') as string,
                stage: fd.get('stage') as any,
                projectedClose: fd.get('closeDate') as string
              });
            }}>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 text-indigo-500">Deal Title</label>
                <input name="title" required placeholder="SS25 Showroom Exclusivity..." className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Value</label>
                    <input name="value" required placeholder="$45,000" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Stage</label>
                    <select name="stage" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all">
                      <option value="Prospect">Prospect</option>
                      <option value="Negotiation">Negotiation</option>
                      <option value="Contracting">Contracting</option>
                      <option value="Closed">Closed</option>
                    </select>
                 </div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-lg">Initialize</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
