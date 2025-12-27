
import React from 'react';
import { TrendingUp, Globe, Tag, Ticket } from 'lucide-react';

export const CRMStats: React.FC = () => {
  const stats = [
    { label: 'Active Deals', value: '12', trend: '+2', icon: <TrendingUp size={16} /> },
    { label: 'Network Size', value: '1,240', trend: '+45', icon: <Globe size={16} /> },
    { label: 'Press Reach', value: '8.4M', trend: '+12%', icon: <Tag size={16} /> },
    { label: 'Show RSVPs', value: '142', trend: '+18', icon: <Ticket size={16} /> }
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gray-50 rounded-xl text-gray-400">
              {stat.icon}
            </div>
            <span className={`text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
              {stat.trend}
            </span>
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
          <p className="text-2xl font-serif">{stat.value}</p>
        </div>
      ))}
    </section>
  );
};
