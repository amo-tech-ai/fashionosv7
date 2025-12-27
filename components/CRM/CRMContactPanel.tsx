import React, { useState, useEffect } from 'react';
import { 
  X, MapPin, Plus, Star, Loader2, Zap, 
  ExternalLink, ShieldCheck, AlertTriangle, ToggleLeft as Toggle, 
  RefreshCw, Check, Info, Sparkles
} from 'lucide-react';
import { Contact } from '../../types';
import { CRMContactTimelinePreview } from './CRMContactTimelinePreview';
import { CRMDealsPreview } from './CRMDealsPreview';
import { 
  getContactStrategicInsight, 
  getRelationshipHealthScore, 
  getMarketSignals, 
  detectScheduleConflicts,
  enrichContactNode
} from '../../services/geminiService';

interface CRMContactPanelProps {
  contact: Contact;
  onClose: () => void;
  onLogHandshake?: () => void;
  onAddDeal?: () => void;
}

export const CRMContactPanel: React.FC<CRMContactPanelProps> = ({ contact, onClose, onLogHandshake, onAddDeal }) => {
  const [aiInsight, setAiInsight] = useState<string>('');
  const [healthData, setHealthData] = useState<{score: number, reasoning: string, vitality: string} | null>(null);
  const [marketSignals, setMarketSignals] = useState<{summary: string, sources: any[]} | null>(null);
  const [conflicts, setConflicts] = useState<any[]>([]);
  const [isNeuralSyncActive, setIsNeuralSyncActive] = useState(true);
  
  // Enrichment State
  const [enrichmentData, setEnrichmentData] = useState<any>(null);
  const [isEnriching, setIsEnriching] = useState(false);
  const [showEnrichmentPreview, setShowEnrichmentPreview] = useState(false);

  const [loading, setLoading] = useState({ insight: false, health: false, signals: false, conflicts: false });

  useEffect(() => {
    if (!isNeuralSyncActive) return;

    const fetchDossierData = async () => {
      setLoading({ insight: true, health: true, signals: true, conflicts: true });
      const historyStr = contact.interactionHistory.map(h => `${h.type}: ${h.title}`).join(', ');
      const rsvpStr = contact.rsvpHistory.map(r => `${r.eventName} (${r.status})`).join(', ');
      const masterSchedule = "Paris Fashion Week Main Event: Sept 25, 20:00. Afterparty: Sept 25, 23:00. Showroom Launch: Sept 26, 10:00.";
      
      Promise.all([
        getContactStrategicInsight(contact.name, historyStr).then(res => {
          setAiInsight(res);
          setLoading(prev => ({ ...prev, insight: false }));
        }),
        getRelationshipHealthScore(contact.name, historyStr).then(res => {
          setHealthData(res);
          setLoading(prev => ({ ...prev, health: false }));
        }),
        getMarketSignals(contact.name, contact.company).then(res => {
          setMarketSignals(res);
          setLoading(prev => ({ ...prev, signals: false }));
        }),
        detectScheduleConflicts(contact.name, rsvpStr, masterSchedule).then(res => {
          setConflicts(res);
          setLoading(prev => ({ ...prev, conflicts: false }));
        })
      ]);
    };
    fetchDossierData();
  }, [contact.id, contact.role, contact.company, isNeuralSyncActive]);

  const handleEnrich = async () => {
    setIsEnriching(true);
    setShowEnrichmentPreview(false); // Clear previous if any
    const result = await enrichContactNode(contact.name, contact.role, contact.company);
    if (result) {
      setEnrichmentData(result);
      setShowEnrichmentPreview(true);
    }
    setIsEnriching(false);
  };

  const applyEnrichment = () => {
    if (!enrichmentData) return;
    const updates = {
      role: enrichmentData.role,
      company: enrichmentData.company,
      city: enrichmentData.city,
      lastContact: 'Enriched via AI'
    };
    window.dispatchEvent(new CustomEvent('update-contact', { 
      detail: { id: contact.id, updates } 
    }));
    setShowEnrichmentPreview(false);
    setEnrichmentData(null);
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white z-20 pb-6 border-b border-gray-50">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-xl font-serif text-gray-400 border border-gray-50 shadow-inner">
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

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-black text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-sm">
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
          
          {/* Deep Enrich Button */}
          <button 
            onClick={handleEnrich}
            disabled={isEnriching}
            className={`ml-auto px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full border flex items-center transition-all ${
              isEnriching 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100'
            }`}
          >
            {isEnriching ? (
              <>
                <Loader2 size={10} className="animate-spin mr-1.5" />
                Scanning...
              </>
            ) : (
              <>
                <Sparkles size={10} className="mr-1.5" />
                Deep Enrich
              </>
            )}
          </button>
        </div>

        {/* Neural Sync Control */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-2">
            <div className={`w-1.5 h-1.5 rounded-full ${isNeuralSyncActive ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`} />
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-400">Neural Sync</span>
          </div>
          <button 
            onClick={() => setIsNeuralSyncActive(!isNeuralSyncActive)}
            className={`text-gray-300 hover:text-black transition-colors ${!isNeuralSyncActive && 'rotate-180'}`}
          >
            <Toggle size={16} />
          </button>
        </div>
      </div>

      {/* Internal Scroll Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-8 space-y-10">
        
        {/* Enrichment Scanner Overlay during enrichment */}
        {isEnriching && (
          <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100/50 animate-pulse">
            <div className="flex items-center justify-center space-x-3 text-indigo-400">
               <Zap size={14} className="animate-bounce" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Processing Neural Dossier</span>
            </div>
            <div className="mt-4 space-y-2">
               <div className="h-1 bg-indigo-100 rounded-full w-full overflow-hidden">
                  <div className="h-full bg-indigo-500 animate-[shimmer_2s_infinite]" style={{width: '60%'}}></div>
               </div>
               <p className="text-[8px] text-center text-indigo-300 font-bold uppercase tracking-widest">Grounded Search in Progress...</p>
            </div>
          </div>
        )}

        {/* Enrichment Preview UI - High Fidelity Comparison */}
        {showEnrichmentPreview && enrichmentData && !isEnriching && (
          <div className="p-5 bg-indigo-600 text-white rounded-[32px] border border-indigo-700 shadow-xl animate-in zoom-in-95 duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles size={64} />
            </div>

            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center space-x-2">
                <ShieldCheck size={14} className="text-indigo-200" />
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-100">AI Verification Result</span>
              </div>
              <button onClick={() => setShowEnrichmentPreview(false)} className="text-indigo-300 hover:text-white">
                <X size={14} />
              </button>
            </div>
            
            <div className="space-y-5 mb-8 relative z-10">
              {[
                { label: 'Role', current: contact.role, suggested: enrichmentData.role },
                { label: 'Company', current: contact.company, suggested: enrichmentData.company },
                { label: 'City', current: contact.city || 'Not set', suggested: enrichmentData.city }
              ].map((field, idx) => (
                <div key={idx} className="group">
                  <p className="text-[8px] font-black uppercase text-indigo-300 tracking-[0.2em] mb-1.5">{field.label}</p>
                  <div className="flex items-center justify-between bg-indigo-700/50 p-2 rounded-xl border border-indigo-500/30">
                    <span className="text-[10px] text-indigo-300/60 line-through truncate max-w-[100px]">{field.current}</span>
                    <div className="flex items-center space-x-2">
                       <span className="text-[10px] font-bold text-white">{field.suggested}</span>
                       <Check size={10} className="text-emerald-400" />
                    </div>
                  </div>
                </div>
              ))}
              
              {enrichmentData.achievement && (
                <div className="pt-3 border-t border-indigo-500/30">
                   <p className="text-[8px] font-black uppercase text-indigo-300 tracking-[0.2em] mb-1.5">Market Achievement</p>
                   <p className="text-[10px] italic text-indigo-100 leading-relaxed bg-indigo-700/30 p-3 rounded-xl border border-indigo-500/20">
                     "{enrichmentData.achievement}"
                   </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className="text-[8px] font-black uppercase text-indigo-300 tracking-widest">Confidence Index</span>
                <span className="text-[10px] font-bold text-emerald-400">{(enrichmentData.confidence * 100).toFixed(0)}% Grounded</span>
              </div>
            </div>

            <div className="flex space-x-2 relative z-10">
              <button 
                onClick={applyEnrichment}
                className="flex-1 py-3 bg-white text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-50 transition-all shadow-lg active:scale-95"
              >
                Apply Intelligence
              </button>
              {enrichmentData.sourceUrl && (
                <a 
                  href={enrichmentData.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-indigo-500/50 border border-indigo-400/30 text-white rounded-xl hover:bg-indigo-400/50 transition-colors"
                  title="View Source"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Schedule Conflicts Alert */}
        {!loading.conflicts && conflicts.length > 0 && (
          <div className="p-5 bg-rose-50 rounded-3xl border border-rose-100 animate-in slide-in-from-top-2">
            <div className="flex items-center space-x-2 text-rose-600 mb-4">
              <AlertTriangle size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Conflict Detected</span>
            </div>
            <div className="space-y-3">
              {conflicts.map((conf, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-[10px] font-bold text-rose-900">{conf.event} Overlap</p>
                  <p className="text-[10px] text-rose-600/80 leading-relaxed italic">"{conf.resolution}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Relationship Health Meter */}
        <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-zinc-900">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span className="text-[8px] font-black uppercase tracking-widest">Relationship Vitality</span>
            </div>
            {loading.health ? (
              <Loader2 size={10} className="animate-spin text-gray-300" />
            ) : (
              <span className={`text-[8px] font-bold uppercase tracking-widest ${
                healthData?.vitality === 'Optimal' ? 'text-emerald-500' : 'text-amber-500'
              }`}>{healthData?.vitality}</span>
            )}
          </div>
          <div className="flex items-end space-x-3 mb-3">
            <div className="text-3xl font-serif text-black">{loading.health ? '--' : healthData?.score}</div>
            <div className="text-[10px] text-gray-400 mb-1.5 uppercase font-bold tracking-widest">/ 100</div>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${
                (healthData?.score || 0) > 70 ? 'bg-emerald-500' : (healthData?.score || 0) > 40 ? 'bg-amber-500' : 'bg-rose-500'
              }`} 
              style={{ width: `${loading.health ? 0 : healthData?.score}%` }} 
            />
          </div>
          <p className="text-[9px] text-gray-500 mt-3 leading-relaxed italic">
            {loading.health ? "Calculating resonance signals..." : healthData?.reasoning}
          </p>
        </div>

        {/* Intelligence Note */}
        <div className="p-5 bg-zinc-900 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center space-x-2 mb-3 text-amber-400 relative z-10">
            <Star size={10} fill="currentColor" />
            <span className="text-[8px] font-black uppercase tracking-widest">Neural Pivot Suggestion</span>
          </div>
          {loading.insight ? (
            <div className="flex items-center space-x-2 text-zinc-500 py-2">
              <Loader2 size={12} className="animate-spin" />
              <span className="text-[10px] font-medium italic">Processing handshakes...</span>
            </div>
          ) : (
            <p className="text-[10px] text-zinc-300 leading-relaxed italic relative z-10">
              "{aiInsight}"
            </p>
          )}
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
            <Star size={40} className="text-white" />
          </div>
        </div>

        {/* Market Signals (Grounding) */}
        <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="flex items-center space-x-2 mb-4 text-indigo-500">
            <Zap size={12} />
            <span className="text-[8px] font-black uppercase tracking-widest">Grounded Market Signals</span>
          </div>
          {loading.signals ? (
            <div className="animate-pulse space-y-2">
              <div className="h-2 w-3/4 bg-gray-100 rounded" />
              <div className="h-2 w-1/2 bg-gray-100 rounded" />
            </div>
          ) : (
            <>
              <p className="text-[10px] text-gray-600 leading-relaxed mb-4 whitespace-pre-line">
                {marketSignals?.summary}
              </p>
              {marketSignals?.sources && marketSignals.sources.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-[7px] text-gray-300 uppercase font-black tracking-widest block w-full mb-1">Citations</span>
                  {marketSignals.sources.slice(0, 2).map((src: any, i: number) => (
                    <a 
                      key={i} 
                      href={src.web?.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-50 rounded-md border border-gray-100 text-[8px] text-indigo-400 hover:bg-indigo-50 transition-colors"
                    >
                      <ExternalLink size={8} />
                      <span className="truncate max-w-[80px]">{src.web?.title || 'Signal Source'}</span>
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Relationship History Preview */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Relationship History</h4>
            <button 
              onClick={onLogHandshake}
              className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-400"
            >
              <Plus size={14} />
            </button>
          </div>
          <CRMContactTimelinePreview history={contact.interactionHistory} />
        </div>

        {/* Active Deals Preview */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Active Deals</h4>
            <button 
              onClick={onAddDeal}
              className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-400"
            >
              <Plus size={14} />
            </button>
          </div>
          <CRMDealsPreview deals={contact.deals} />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-auto pt-6 border-t border-gray-50 flex space-x-3 bg-white pb-2">
        <button className="flex-1 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-colors shadow-sm">
          Full Dossier
        </button>
        <button 
          onClick={onLogHandshake}
          className="flex-1 py-3 bg-white border border-gray-100 text-black text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-colors"
        >
          Log Handshake
        </button>
      </div>
    </div>
  );
};