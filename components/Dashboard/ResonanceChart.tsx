
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', val: 4000 },
  { name: 'Tue', val: 3000 },
  { name: 'Wed', val: 2000 },
  { name: 'Thu', val: 2780 },
  { name: 'Fri', val: 1890 },
  { name: 'Sat', val: 2390 },
  { name: 'Sun', val: 3490 },
];

export const ResonanceChart: React.FC = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-[40px] p-12 flex flex-col justify-center relative overflow-hidden group h-full">
      <div className="flex justify-between items-start mb-10">
         <div>
            <h4 className="text-5xl font-serif mb-4 leading-tight">Global Resonance.</h4>
            <p className="text-sm text-gray-400 font-light max-w-xs">Tracking media momentum across Paris, Milan, and New York.</p>
         </div>
         <div className="p-4 bg-gray-50 rounded-2xl">
            <TrendingUp className="text-indigo-600" size={24} />
         </div>
      </div>
      <div className="h-48 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorDashboard" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="val" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorDashboard)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
