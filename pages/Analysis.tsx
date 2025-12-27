
import React from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Share2, 
  MessageCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  Info,
  Calendar
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, Legend
} from 'recharts';

const socialData = [
  { name: 'Jan', buzz: 4000, reach: 2400 },
  { name: 'Feb', buzz: 3000, reach: 1398 },
  { name: 'Mar', buzz: 2000, reach: 9800 },
  { name: 'Apr', buzz: 2780, reach: 3908 },
  { name: 'May', buzz: 1890, reach: 4800 },
  { name: 'Jun', buzz: 2390, reach: 3800 },
];

const styleRadar = [
  { subject: 'Minimalism', A: 120, B: 110, fullMark: 150 },
  { subject: 'Streetwear', A: 98, B: 130, fullMark: 150 },
  { subject: 'Avant-Garde', A: 86, B: 130, fullMark: 150 },
  { subject: 'Heritage', A: 99, B: 100, fullMark: 150 },
  { subject: 'Digital Fashion', A: 85, B: 90, fullMark: 150 },
  { subject: 'Sustainable', A: 65, B: 85, fullMark: 150 },
];

export const Analysis: React.FC = () => {
  return (
    <div className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#fcfcfc] p-12">
      <header className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-4xl font-serif mb-2">Analysis</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center space-x-2">
            <span>FashionOS</span>
            <span className="text-gray-200">/</span>
            <span>Market Intelligence</span>
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-6 py-2 bg-white border border-gray-100 text-black rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2 hover:bg-gray-50">
            <Calendar size={14} />
            <span>Q1 - 2024</span>
          </button>
          <button className="px-6 py-2 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
            Export Report
          </button>
        </div>
      </header>

      {/* KPI Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
        {[
          { label: 'Market Sentiment', value: 'Positive (84%)', trend: '+4%', icon: <MessageCircle size={16} />, status: 'up' },
          { label: 'Campaign ROI', value: '4.2x', trend: '+0.8x', icon: <TrendingUp size={16} />, status: 'up' },
          { label: 'Social Reach', value: '2.4M', trend: '-2%', icon: <Share2 size={16} />, status: 'down' },
          { label: 'Conversion Lift', value: '18.4%', trend: '+3.2%', icon: <BarChart3 size={16} />, status: 'up' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-gray-50 rounded-2xl text-gray-400">
                {stat.icon}
              </div>
              <div className={`flex items-center text-[10px] font-bold ${stat.status === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.status === 'up' ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
                {stat.trend}
              </div>
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-serif">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Social Buzz Over Time */}
        <div className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-serif">Social Resonance</h3>
            <Info size={16} className="text-gray-300" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={socialData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#999' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#999' }} />
                <Tooltip />
                <Line type="monotone" dataKey="buzz" stroke="#000" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="reach" stroke="#ccc" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 flex items-center space-x-6 text-[10px] font-bold uppercase tracking-widest">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-black"></div>
              <span>Total Mentions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-gray-300 border-dashed border-t"></div>
              <span>Projected Reach</span>
            </div>
          </div>
        </div>

        {/* Style Radar */}
        <div className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-serif">Style Direction</h3>
            <div className="px-3 py-1 bg-zinc-900 text-white text-[8px] font-bold uppercase tracking-widest rounded-full">Live DNA</div>
          </div>
          <div className="h-64 w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={styleRadar}>
                <PolarGrid stroke="#f0f0f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#666' }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Brand" dataKey="A" stroke="#000" fill="#000" fillOpacity={0.1} />
                <Radar name="Market" dataKey="B" stroke="#ccc" fill="#ccc" fillOpacity={0.05} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Regional Sentiment Bar Chart */}
      <section className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-sm mb-32">
        <div className="flex items-center justify-between mb-12">
           <div>
              <h3 className="text-3xl font-serif">Global Market Share</h3>
              <p className="text-sm text-gray-400 mt-2 italic font-light">Regional performance across luxury tiers.</p>
           </div>
           <div className="flex space-x-4">
              <div className="text-right">
                 <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Total Valuation</p>
                 <p className="text-xl font-serif">$24.8M</p>
              </div>
           </div>
        </div>
        <div className="h-80 w-full">
           <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'EMEA', primary: 4000, secondary: 2400 },
                { name: 'APAC', primary: 3000, secondary: 1398 },
                { name: 'NA', primary: 2000, secondary: 9800 },
                { name: 'LATAM', primary: 2780, secondary: 3908 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f9f9f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#999' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#999' }} />
                <Tooltip cursor={{fill: '#fcfcfc'}} />
                <Bar dataKey="primary" fill="#000" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="secondary" fill="#e5e5e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
           </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};
