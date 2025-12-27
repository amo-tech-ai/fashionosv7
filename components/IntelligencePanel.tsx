
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ChevronDown, 
  ShieldCheck, 
  Globe, 
  ArrowUpRight, 
  MessageSquareShare,
  X,
  Camera,
  TrendingUp,
  Zap,
  Clock,
  Briefcase,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { getFashionIntelligence, getTrendIntelligence } from '../services/geminiService';
import { NavigationItem, Contact } from '../types';
import { CRMContactPanel } from './CRM/CRMContactPanel';
import { SentinelFeed } from './SentinelFeed';

interface IntelligencePanelProps {
  isVisible: boolean;
  onClose: () => void;
  activeItem: NavigationItem;
  selectedContact?: Contact | null;
  onClearSelection?: () => void;
}

export const IntelligencePanel: React.FC<IntelligencePanelProps> = ({ 
  isVisible, 
  onClose, 
  activeItem,
  selectedContact,
  onClearSelection
}) => {
  const [insights, setInsights] = useState<any[]>([]);
  const [trendInsights, setTrendInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIntelligence = async () => {
    setError(null);
    setLoading(true);
    try {
      const [intelData, trendsData] = await Promise.all([
        getFashionIntelligence(`Active Module: ${activeItem}. Brand Context: SS25 Paris Fashion Week preparations.`),
        activeItem === 'Analysis' 
          ? getTrendIntelligence("Social buzz +240% EMEA, Minimalism radar score 120, Streetwear rising in APAC.")
          : Promise.resolve([])
      ]);
      
      setInsights(intelData);
      setTrendInsights(trendsData);

      if (intelData.length === 0 && activeItem !== 'Dashboard') {
        // Check if it might be a silent failure due to quota
        console.debug("Intelligence returned empty results.");
      }
    } catch (err: any) {
      if (err?.message?.includes('429')) {
        setError("Neural Quota Exhausted. System cooling down.");
      } else {
        setError("Neural connection disrupted.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntelligence();
  }, [activeItem]);

  const triggerLogHandshake = () => {
    window.dispatchEvent(new CustomEvent('log-handshake'));
  };

  const triggerAddDeal = () => {
    window.dispatchEvent(new CustomEvent('add-deal'));
  };

  // If a CRM contact is selected, show the Contact Panel
  if (selectedContact && activeItem === 'CRM') {
    return (
      <aside className={`fixed lg:relative inset-y-0 right-0 w-80 bg-white border-l border-gray-100 transform transition-transform duration-300 ease-in-out z-[100] ${isVisible ? 'translate-x-0' : 'translate-x-full lg:hidden'}`}>
        <div className="h-full p-6 no-scrollbar overflow-hidden">
          <CRMContactPanel 
            contact={selectedContact} 
            onClose={onClearSelection || (() => {})} 
            onLogHandshake={triggerLogHandshake}
            onAddDeal={triggerAddDeal}
          />
        </div>
      </aside>
    );
  }

  return (
    <aside className={`fixed lg:relative inset-y-0 right-0 w-80 bg-white border-l border-gray-100 transform transition-transform duration-300 ease-in-out z-[100] ${isVisible ? 'translate-x-0' : 'translate-x-full lg:hidden'}`}>
      <div className="h-full flex flex-col p-6 no-scrollbar overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Sparkles size={18} className="text-black" />
            <h2 className="text-lg font-serif font-bold">Intelligence</h2>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400">
            <X size={20} />
          </button>
          <span onClick={onClose} className="text-[10px] text-gray-400 font-bold tracking-widest uppercase cursor-pointer hover:text-black transition-colors">Hide</span>
        </div>

        <div className="space-y-12">
          {/* Global Sentinel Feed - Proactive AI */}
          <SentinelFeed />

          {/* Module-Specific Intelligence */}
          <div className="pt-8 border-t border-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-gray-900">
                <Sparkles size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Neural Insights</span>
              </div>
              {error && (
                <button 
                  onClick={fetchIntelligence}
                  className="p-1 hover:bg-gray-50 rounded-full transition-colors text-indigo-500"
                  title="Retry Sync"
                >
                  <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                </button>
              )}
            </div>

            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-16 bg-gray-100 rounded-2xl"></div>
                <div className="h-16 bg-gray-100 rounded-2xl"></div>
              </div>
            ) : error ? (
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 text-center">
                 <AlertCircle size={16} className="text-rose-400 mx-auto mb-2" />
                 <p className="text-[10px] text-rose-600 font-bold uppercase tracking-widest">{error}</p>
                 <button 
                  onClick={fetchIntelligence}
                  className="mt-3 text-[9px] font-black uppercase tracking-widest text-rose-700 underline underline-offset-4"
                 >
                   Re-sync Neural Mesh
                 </button>
              </div>
            ) : (
              <div className="space-y-3">
                {insights.length > 0 ? insights.map((insight, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-white hover:shadow-sm transition-all">
                    <p className="text-[10px] font-bold uppercase mb-1 text-black">{insight.title}</p>
                    <p className="text-[10px] text-gray-500 leading-relaxed italic">"{insight.description}"</p>
                  </div>
                )) : (
                  <div className="p-4 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 text-center">
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Quiet Luxury Nominal</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Collaborative Stream */}
          <div className="pt-8 border-t border-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-gray-900">
                <MessageSquareShare size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Collab Stream</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex space-x-3 items-center">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <Camera size={14} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase">Elena • Photography</p>
                  <p className="text-[8px] text-gray-400 uppercase font-black tracking-widest">Edits v2 uploaded • 12m ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-8 flex items-center space-x-2 text-gray-300">
          <div className={`w-2 h-2 rounded-full ${error ? 'bg-amber-400' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'} animate-pulse`}></div>
          <span className="text-[8px] uppercase tracking-[0.2em] font-black">
            {error ? 'Neural Mesh: Degraded' : 'Neural Mesh Integrity: 100%'}
          </span>
        </div>
      </div>
    </aside>
  );
};
