
import React, { useState, useMemo } from 'react';
import { Contact, ContactCategory, ContactStatus } from '../types';
import { CRMHeader } from '../components/CRM/CRMHeader';
import { CRMStats } from '../components/CRM/CRMStats';
import { CRMFilterHUD } from '../components/CRM/CRMFilterHUD';
import { CRMPartnerTable } from '../components/CRM/CRMPartnerTable';

export const mockContacts: Contact[] = [
  { 
    id: '1', 
    name: 'Sarah Jenkins', 
    role: 'Head Buyer', 
    company: 'Harrods', 
    category: 'Buyer', 
    status: 'Active', 
    city: 'London',
    lastContact: '2h ago', 
    placements: 12,
    socials: { instagram: 'sjenkins_harrods' },
    deals: [
      { id: 'd1', title: 'Harrods Exclusive SS25', value: '$240,000', stage: 'Negotiation', projectedClose: '2024-05-15', linkedCollection: 'SS25' }
    ],
    interactionHistory: [
      { id: 'i1', type: 'Meeting', title: 'SS25 Buy Review', description: 'Discussed initial selection for London flagship.', date: '2024-03-10' },
      { id: 'i2', type: 'Email', title: 'Show Invitation', description: 'Sent digital lookbook and RSVP link.', date: '2024-03-01' }
    ],
    rsvpHistory: [
      { eventId: 'e1', eventName: 'SS25 Paris Show', status: 'Confirmed' }
    ]
  },
  { 
    id: '2', 
    name: 'Marco Rossi', 
    role: 'Creative Director', 
    company: 'Rossi Studio', 
    category: 'Designer', 
    status: 'Active', 
    city: 'Milan',
    lastContact: '1d ago', 
    placements: 4,
    socials: { instagram: 'mrossi_design' },
    deals: [],
    interactionHistory: [],
    rsvpHistory: []
  },
  { 
    id: '3', 
    name: 'Elena Vance', 
    role: 'Fashion Editor', 
    company: 'Vogue France', 
    category: 'Press', 
    status: 'Lead', 
    city: 'Paris',
    lastContact: '3d ago', 
    placements: 28,
    socials: { instagram: 'elevance_vogue' },
    deals: [
       { id: 'd2', title: 'Vogue Editorial Placement', value: '$45,000', stage: 'Contracting', projectedClose: '2024-04-20' }
    ],
    interactionHistory: [
      { id: 'i3', type: 'Email', title: 'Editorial Inquiry', description: 'Requested high-res assets for September issue.', date: '2024-03-08' }
    ],
    rsvpHistory: [
      { eventId: 'e1', eventName: 'SS25 Paris Show', status: 'Invited' }
    ]
  },
  { 
    id: '4', 
    name: 'James Thorne', 
    role: 'Global Marketing', 
    company: 'LVMH', 
    category: 'Sponsor', 
    status: 'Active', 
    city: 'Paris',
    lastContact: '5h ago', 
    placements: 8,
    socials: { linkedin: 'james-thorne-lvmh' },
    deals: [],
    interactionHistory: [],
    rsvpHistory: [
      { eventId: 'e1', eventName: 'SS25 Paris Show', status: 'Confirmed' }
    ]
  },
  { 
    id: '5', 
    name: 'Clara Dupont', 
    role: 'Fashion Consultant', 
    company: 'Self-Employed', 
    category: 'Press', 
    status: 'Archive', 
    city: 'Brussels',
    lastContact: '1mo ago', 
    placements: 2,
    socials: {},
    deals: [],
    interactionHistory: [],
    rsvpHistory: []
  }
];

interface CRMProps {
  onSelectContact: (id: string | null) => void;
  selectedContactId: string | null;
}

export const CRM: React.FC<CRMProps> = ({ onSelectContact, selectedContactId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<ContactCategory[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<ContactStatus[]>([]);

  const toggleCategory = (cat: ContactCategory) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleStatus = (status: ContactStatus) => {
    setSelectedStatuses(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedStatuses([]);
  };

  const filteredContacts = useMemo(() => {
    return mockContacts.filter(contact => {
      const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            contact.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(contact.category);
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(contact.status);
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategories, selectedStatuses]);

  return (
    <div className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#fcfcfc] p-12 animate-in fade-in duration-700">
      <CRMHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      <CRMFilterHUD 
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
        selectedStatuses={selectedStatuses}
        toggleStatus={toggleStatus}
        clearFilters={clearFilters}
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
            // Toggle selection if clicking the same one, otherwise select new
            onSelectContact(selectedContactId === contact.id ? null : contact.id);
          }}
        />
      </div>
    </div>
  );
};
