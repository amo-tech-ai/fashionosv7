
import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { IntelligencePanel } from './components/IntelligencePanel';
import { Dashboard } from './pages/Dashboard';
import { CRM, mockContacts } from './pages/CRM';
import { Analysis } from './pages/Analysis';
import { BrandOnboarding } from './pages/BrandOnboarding';
import { Shoots } from './pages/Shoots';
import { NavigationItem, BrandProfile } from './types';

const DEFAULT_MAISON: BrandProfile = {
  id: 'demo-maison',
  name: "L'Artisan",
  description: "A heritage luxury maison focused on avant-garde silhouettes and architectural purity.",
  website: "lartisan-paris.com",
  dna: {
    colorPalette: ['#000000', '#FFFFFF', '#F5F5F5', '#222222', '#D4AF37'],
    lightingStyle: "Chiaroscuro / Cinematic High-Contrast",
    compositionRules: ["Negative Space Mastery", "Vertical Symmetry", "Macro Detail Focus"],
    motifs: ["Architectural Purity", "Monolithic Forms", "Tactile Minimalism"],
    luxuryTier: 'Ultra-Luxury'
  },
  channels: [
    { type: 'Official', url: 'https://lartisan-paris.com', verified: true, confidence: 1.0 },
    { type: 'Instagram', url: 'https://instagram.com/lartisan', verified: true, confidence: 0.98 }
  ],
  npi: { 
    total: 92, 
    breakdown: { clarity: 94, reach: 88, readiness: 95, consistency: 91 }, 
    summary: "The Maison maintains exceptional brand resonance. Digital readiness for SS25 is in the top decile." 
  },
  personas: ["The Cultural Architect", "The Intellectual Minimalist"],
  pillars: ["Architectural Integrity", "Textural Narrative", "Ancestral Future"]
};

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState<NavigationItem>('Dashboard');
  const [showIntelligence, setShowIntelligence] = useState(true);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [maison, setMaison] = useState<BrandProfile>(() => {
    const saved = localStorage.getItem('fashionos_maison');
    return saved ? JSON.parse(saved) : DEFAULT_MAISON;
  });

  const handleNavChange = (item: NavigationItem) => {
    setActiveItem(item);
    if (item !== 'CRM') {
      setSelectedContactId(null);
    }
  };

  const handleOnboardingComplete = (profile: BrandProfile) => {
    setMaison(profile);
    localStorage.setItem('fashionos_maison', JSON.stringify(profile));
    setActiveItem('Dashboard');
  };

  const selectedContact = useMemo(() => 
    mockContacts.find(c => c.id === selectedContactId), 
    [selectedContactId]
  );

  const renderMainContent = () => {
    switch (activeItem) {
      case 'Dashboard':
        return <Dashboard />;
      case 'CRM':
        return <CRM onSelectContact={setSelectedContactId} selectedContactId={selectedContactId} />;
      case 'Analysis':
        return <Analysis />;
      case 'Shoots':
        return <Shoots />;
      case 'Profile':
        return <BrandOnboarding onComplete={handleOnboardingComplete} />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center bg-[#fcfcfc] animate-in fade-in duration-700">
            <div className="text-center p-16 bg-white rounded-[40px] border border-gray-100 shadow-xl max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-8">
                 <Sparkles size={24} className="text-gray-300" />
              </div>
              <h2 className="text-3xl font-serif mb-4 leading-tight">{activeItem} Module</h2>
              <p className="text-gray-400 font-light leading-relaxed mb-10 italic">
                "System unit is initializing in the neural mesh. This domain will be accessible shortly."
              </p>
              <button 
                onClick={() => handleNavChange('Dashboard')}
                className="w-full py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg hover:bg-zinc-800 transition-all"
              >
                Return to Command
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#fcfcfc] text-black overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar activeItem={activeItem} setActiveItem={handleNavChange} maisonName={maison.name} />
      
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#fcfcfc]">
        {renderMainContent()}
      </main>

      <IntelligencePanel 
        isVisible={showIntelligence} 
        onClose={() => setShowIntelligence(false)} 
        activeItem={activeItem}
        selectedContact={selectedContact}
        onClearSelection={() => setSelectedContactId(null)}
      />

      {!showIntelligence && (
        <button 
          onClick={() => setShowIntelligence(true)}
          className="fixed bottom-10 right-10 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl z-50 lg:hidden hover:scale-110 active:scale-95 transition-all"
        >
          <Sparkles size={24} />
        </button>
      )}
    </div>
  );
};

export default App;
