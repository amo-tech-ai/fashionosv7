
import React from 'react';
import { ShieldAlert, Zap, ArrowRight, ExternalLink, TrendingUp, AlertCircle } from 'lucide-react';

interface SentinelAlert {
  id: string;
  type: 'market' | 'strategic' | 'warning';
  title: string;
  description: string;
  timestamp: string;
  impact: 'High' | 'Medium' | 'Low';
}

const MOCK_ALERTS: SentinelAlert[] = [
  { 
    id: '1', 
    type: 'market', 
    title: 'Editor Career Pivot', 
    description: 'Elena Vance (Vogue) detected in high-frequency mentions with Harper\'s Bazaar. Strategy update suggested.', 
    timestamp: '12m ago',
    impact: 'High'
  },
  { 
    id: '2', 
    type: 'warning', 
    title: 'RSVP Show Conflict', 
    description: 'Harrods Buyer (Julian Thorne) has an overlap with Chanel SS25. Suggest proactive reschedule.', 
    timestamp: '1h ago',
    impact: 'Medium'
  },
  { 
    id: '3', 
    type: 'strategic', 
    title: 'Sentiment Momentum', 
    description: 'LVMH partnership resonance up 24% after SS25 teaser leak in APAC markets.', 
    timestamp: '3h ago',
    impact: 'Low'
  }
];

export const SentinelFeed: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-indigo-600">
          <ShieldAlert size={16} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Neural Sentinel Feed</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[8px] text-emerald-600 font-bold uppercase">Live</span>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_ALERTS.map((alert) => (
          <div 
            key={alert.id} 
            className={`p-5 rounded-3xl border transition-all hover:shadow-lg cursor-pointer group relative overflow-hidden ${
              alert.type === 'warning' ? 'bg-rose-50/50 border-rose-100/50' : 'bg-gray-50/50 border-gray-100/50 hover:bg-white'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2">
                <span className={`text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  alert.type === 'warning' ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'
                }`}>
                  {alert.type}
                </span>
                <span className="text-[7px] text-gray-400 font-bold uppercase tracking-widest">{alert.impact} Impact</span>
              </div>
              <span className="text-[8px] text-gray-300 font-bold uppercase tracking-widest">{alert.timestamp}</span>
            </div>

            <h4 className="text-[10px] font-bold text-black uppercase mb-1.5 flex items-center group-hover:text-indigo-600 transition-colors">
              {alert.title}
              <ArrowRight size={10} className="ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </h4>
            
            <p className="text-[10px] text-gray-500 leading-relaxed italic pr-4">
              "{alert.description}"
            </p>

            <div className="absolute -bottom-1 -right-1 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity rotate-12">
               {alert.type === 'market' ? <Zap size={48} /> : alert.type === 'strategic' ? <TrendingUp size={48} /> : <AlertCircle size={48} />}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-4 bg-white border border-gray-100 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black hover:border-black hover:shadow-sm transition-all flex items-center justify-center space-x-3 group">
        <span>Full Intelligence Stream</span>
        <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
};
