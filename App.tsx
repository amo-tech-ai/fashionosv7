
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { IntelligencePanel } from './components/IntelligencePanel';
import { Dashboard } from './pages/Dashboard';
import { CRM } from './pages/CRM';
import { Analysis } from './pages/Analysis';
import { NavigationItem } from './types';

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState<NavigationItem>('Dashboard');
  const [showIntelligence, setShowIntelligence] = useState(true);

  const renderMainContent = () => {
    switch (activeItem) {
      case 'Dashboard':
        return <Dashboard />;
      case 'CRM':
        return <CRM />;
      case 'Analysis':
        return <Analysis />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center p-12 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-3xl font-serif mb-4">{activeItem}</h2>
              <p className="text-gray-400 max-w-xs mx-auto">This module is currently initializing in the neural mesh. Please check back shortly.</p>
              <button 
                onClick={() => setActiveItem('Dashboard')}
                className="mt-8 px-6 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full"
              >
                Return to Command
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#fcfcfc] text-black overflow-hidden">
      {/* Left Panel - Context */}
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      
      {/* Main Panel - Work */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {renderMainContent()}
      </main>

      {/* Right Panel - Intelligence */}
      <IntelligencePanel 
        isVisible={showIntelligence} 
        onClose={() => setShowIntelligence(false)} 
        activeItem={activeItem}
      />

      {/* Toggle Mobile Intelligence */}
      {!showIntelligence && (
        <button 
          onClick={() => setShowIntelligence(true)}
          className="fixed bottom-8 right-8 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg z-50 lg:hidden"
        >
          <Sparkles size={20} />
        </button>
      )}
    </div>
  );
};

export default App;
