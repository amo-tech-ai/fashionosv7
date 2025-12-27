
import React from 'react';
import { TrendingUp, Globe, Tag, Ticket } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { val: 10 }, { val: 25 }, { val: 18 }, { val: 40 }, { val: 30 }, { val: 55 }, { val: 45 }
];

export const CRMStats: React.FC = () => {
  const stats = [
    { label: 'Active Deals', value: '12', trend: '+2', icon: <TrendingUp size={16} />, color: '#10b981' },
    { label: 'Network Size', value: '1,240', trend: '+45', icon: <Globe size={16} />, color: '#000000' },
    { label: 'Press Reach', value: '8.4M', trend: '+12%', icon: <Tag size={16} />, color: '#6366f1' },
    { label: 'Show RSVPs', value: '142', trend: '+18', icon: <Ticket size={16} />, color: '#f59e0b' }
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="p-2 bg-gray-50 rounded-xl text-gray-400">
              {stat.icon}
            </div>
            <span className={`text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
              {stat.trend}
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-serif">{stat.value}</p>
          </div>
          
          {/* Sparkline */}
          <div className="absolute bottom-0 left-0 right-0 h-12 opacity-10 group-hover:opacity-20 transition-opacity">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <Area 
                  type="monotone" 
                  dataKey="val" 
                  stroke={stat.color} 
                  fill={stat.color} 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </section>
  );
};
