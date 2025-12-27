
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ChevronDown, 
  ShieldCheck, 
  Globe, 
  ArrowUpRight, 
  Eye, 
  Search,
  MessageSquareShare,
  X,
  Camera,
  TrendingUp,
  Zap,
  Clock,
  Briefcase,
  Layers
} from 'lucide-react';
import { getFashionIntelligence, getTrendIntelligence } from '../services/geminiService';
import { NavigationItem } from '../types';

interface IntelligencePanelProps {
  isVisible: boolean;
  onClose: () => void;
  activeItem: NavigationItem;
}

export const IntelligencePanel: React.FC<IntelligencePanelProps> = ({ isVisible, onClose, activeItem }) => {
  const [insights, setInsights] = useState<any[]>([]);
  const [trendInsights, setTrendInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGeneralIntelligence = async () => {
      setLoading(true);
      const data = await getFashionIntelligence(`Active Module: ${activeItem}. Brand Context: SS25 Paris Fashion Week preparations.`);
      setInsights(data);
      setLoading(false);
    };

    const fetchTrends = async () => {
      if (activeItem === 'Analysis') {
        const trends = await getTrendIntelligence("Social buzz +240% EMEA, Minimalism radar score 120, Streetwear rising in APAC.");
        setTrendInsights(trends);
      } else {
        setTrendInsights([]);
      }
    };

    fetchGeneralIntelligence();
    fetchTrends();
  }, [activeItem]);

  return (
    <aside className={`fixed lg:relative inset-y-0 right-0 w-80 bg-white border-l border-gray-100 transform transition-transform duration-300 ease-in-out z-40 ${isVisible ? 'translate-x-0' : 'translate-x-full lg:hidden'}`}>
      <div className="h-full flex flex-col p-6 no-scrollbar overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Sparkles size={18} className="text-black" />
            <h2 className="text-lg font-serif font-bold">Intelligence</h2>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400">
            <X size={20} />
          </button>
          <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase cursor-pointer hover:text-black transition-colors">Hide</span>
        </div>

        <div className="space-y-8">
          {/* CRM Specific Intelligence */}
          {activeItem === 'CRM' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
              {/* Deals Pipeline */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-zinc-900">
                    <Briefcase size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Pipeline Pipeline</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Vogue Editorial Placement', value: '$45k', stage: 'Contracting', progress: 85 },
                    { label: 'Harrods Exclusive SS25', value: '$240k', stage: 'Negotiation', progress: 60 },
                    { label: 'Meta Influencer Gala', value: '$1.2M', stage: 'Prospect', progress: 20 }
                  ].map((deal, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-[10px] font-black uppercase text-zinc-900 leading-tight">{deal.label}</p>
                        <span className="text-[10px] font-serif italic text-zinc-400">{deal.value}</span>
                      </div>
                      <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest text-zinc-400 mb-2">
                         <span>{deal.stage}</span>
                         <span>{deal.progress}%</span>
                      </div>
                      <div className="w-full bg-white h-1 rounded-full overflow-hidden">
                        <div className="bg-black h-full transition-all duration-1000" style={{ width: `${deal.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relationship History / Global Handshakes */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-zinc-900">
                    <Clock size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Global Handshakes</span>
                  </div>
                </div>
                <div className="space-y-4 border-l border-gray-100 ml-2 pl-4">
                  {[
                    { title: 'Harrods RSVP Confirmed', desc: 'SS25 Show Guest List Updated', time: 'Yesterday' },
                    { title: 'LVMH Contract Signed', desc: 'Media rights for Asia markets', time: '2d ago' },
                    { title: 'PR Packet Delivered', desc: 'Vogue France Editors', time: '4d ago' }
                  ].map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-zinc-900 border-2 border-white"></div>
                      <p className="text-[10px] font-bold uppercase tracking-tight">{item.title}</p>
                      <p className="text-[10px] text-gray-400 leading-tight mb-1">{item.desc}</p>
                      <p className="text-[8px] text-gray-300 font-bold uppercase tracking-widest">{item.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Analysis Specific Intelligence */}
          {activeItem === 'Analysis' && trendInsights.length > 0 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-indigo-600">
                  <TrendingUp size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Emerging Trends (AI)</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
              </div>
              <div className="space-y-3">
                {trendInsights.map((trend, idx) => (
                  <div key={idx} className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] font-black uppercase text-indigo-900 tracking-tight">{trend.title}</p>
                      <span className="text-[8px] px-1.5 py-0.5 bg-indigo-200 text-indigo-800 rounded font-bold uppercase tracking-widest">
                        {trend.sentiment}
                      </span>
                    </div>
                    <p className="text-[10px] text-indigo-800/70 leading-relaxed mb-3">{trend.description}</p>
                    <div className="flex items-center justify-between">
                       <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest">Impact Factor</span>
                       <span className="text-xs font-serif italic text-indigo-900">{trend.impactScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Strategic Actions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-gray-900">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">AI Strategic Actions</span>
              </div>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 bg-black text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center justify-between">
                Audit Task Priority
                <ArrowUpRight size={12} />
              </button>
              <button className="w-full text-left px-4 py-3 bg-white border border-black text-black rounded text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors flex items-center justify-between">
                Scan Style Compliance
              </button>
              <button className="w-full text-left px-4 py-3 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-100 transition-colors flex items-center justify-between">
                Deep Market Research
                <Search size={12} />
              </button>
            </div>
          </div>

          {/* Collaborative Handshake */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-gray-900">
                <MessageSquareShare size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Collaborative Handshake</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                  <Camera size={14} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Elena • Photographer</p>
                  <p className="text-[10px] text-gray-400">Uploaded SS25 Milan Edits • 12m ago</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                  <Globe size={14} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Marcus • Logistics</p>
                  <p className="text-[10px] text-gray-400">Venue Handshake: Metropol • 1h ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Growth Intelligence */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-gray-900">
                <Zap size={14} className="text-amber-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Growth Intelligence</span>
              </div>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
            <div className="bg-zinc-900 text-white p-5 rounded-lg space-y-4">
              <div className="flex items-center space-x-2">
                <Globe size={14} className="text-gray-400" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Global Distribution Mix</span>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Reach Potential</p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-lg font-bold">+240%</span>
                  <span className="text-[10px] text-emerald-400 uppercase">Lift</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dynamic AI Insights */}
          <div className="pt-4 border-t border-gray-50">
            <div className="flex items-center space-x-2 mb-4 text-gray-900">
              <Sparkles size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">DNA Analysis: {activeItem}</span>
            </div>
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-12 bg-gray-100 rounded"></div>
                <div className="h-12 bg-gray-100 rounded"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {insights.map((insight, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded border border-gray-100">
                    <p className="text-[10px] font-bold uppercase mb-1">{insight.title}</p>
                    <p className="text-[10px] text-gray-500 leading-relaxed">{insight.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-auto pt-8 flex items-center space-x-2 text-gray-300">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span className="text-[10px] uppercase tracking-widest font-bold">Neural Sync Active</span>
        </div>
      </div>
    </aside>
  );
};
