
import React, { useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { IntelligencePanel } from './components/IntelligencePanel';
import { Dashboard } from './pages/Dashboard';
import { CRM, mockContacts } from './pages/CRM';
import { Analysis } from './pages/Analysis';
import { NavigationItem } from './types';

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState<NavigationItem>('Dashboard');
  const [showIntelligence, setShowIntelligence] = useState(true);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  // Clear contact selection if moving away from CRM
  const handleNavChange = (item: NavigationItem) => {
    setActiveItem(item);
    if (item !== 'CRM') {
      setSelectedContactId(null);
    }
  };

  const selectedContact = useMemo(() => 
    mockContacts.find(c => c.id === selectedContactId), 
    [selectedContactId, mockContacts]
  );

  const renderMainContent = () => {
    switch (activeItem) {
      case 'Dashboard':
        return <Dashboard />;
      case 'CRM':
        return <CRM onSelectContact={setSelectedContactId} selectedContactId={selectedContactId} />;
      case 'Analysis':
        return <Analysis />;
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
      {/* Left Panel - Context */}
      <Sidebar activeItem={activeItem} setActiveItem={handleNavChange} />
      
      {/* Main Panel - Work */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#fcfcfc]">
        {renderMainContent()}
      </main>

      {/* Right Panel - Intelligence / Contact Profile */}
      <IntelligencePanel 
        isVisible={showIntelligence} 
        onClose={() => setShowIntelligence(false)} 
        activeItem={activeItem}
        selectedContact={selectedContact}
        onClearSelection={() => setSelectedContactId(null)}
      />

      {/* Toggle Mobile Intelligence */}
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
