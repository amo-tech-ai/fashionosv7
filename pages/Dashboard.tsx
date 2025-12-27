
import React from 'react';
import { 
  Search, 
  ArrowUpRight, 
  Plus, 
  Clock, 
  ChevronRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', val: 4000 },
  { name: 'Tue', val: 3000 },
  { name: 'Wed', val: 2000 },
  { name: 'Thu', val: 2780 },
  { name: 'Fri', val: 1890 },
  { name: 'Sat', val: 2390 },
  { name: 'Sun', val: 3490 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#fcfcfc] p-12">
      {/* Header Area */}
      <header className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-4xl font-serif mb-2">Dashboard</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center space-x-2">
            <span>FASHIONOS</span>
            <span className="text-gray-200">/</span>
            <span>SYSTEM UNIT 01</span>
          </p>
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search Command" 
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm w-64 focus:outline-none focus:ring-1 focus:ring-black"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-bold">⌘ K</span>
          </div>
          <button className="px-6 py-2 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
            Intel
          </button>
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden ring-2 ring-white">
             <img src="https://picsum.photos/seed/face/100/100" alt="Avatar" />
          </div>
        </div>
      </header>

      {/* Hero Stats */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
             <span className="px-3 py-1 bg-gray-100 text-[10px] font-bold rounded-full text-emerald-600 border border-emerald-100 flex items-center space-x-1">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
               SYSTEM ACTIVE
             </span>
             <span className="px-3 py-1 bg-gray-100 text-[10px] font-bold rounded-full text-gray-400 border border-gray-100 flex items-center">
               <ShieldCheck size={12} className="mr-1.5" />
               DNA SYNC
             </span>
          </div>
          <h3 className="text-7xl font-serif max-w-md leading-tight">
            L'Artisan Paris.
          </h3>
          <p className="text-lg text-gray-400 font-light max-w-sm">
            System integrity is optimal at 88%. Tracking SS25 momentum.
          </p>
          <div className="flex items-center space-x-4 pt-4">
             <button className="px-8 py-4 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center space-x-3 group">
               <Plus size={16} />
               <span>Initialize</span>
             </button>
             <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/${i+10}/40/40`} className="w-10 h-10 rounded-full border-2 border-white" alt="Team" />
                ))}
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold border-2 border-white">+</div>
             </div>
          </div>
        </div>

        <div className="relative bg-white border border-gray-100 rounded-[40px] p-8 overflow-hidden shadow-sm">
           <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
             <div className="w-64 h-64 border-2 border-dashed border-black rounded-full animate-spin-slow"></div>
           </div>
           
           <div className="relative z-10 flex flex-col items-center justify-center h-full">
              <div className="mb-6">
                 <p className="text-[10px] font-bold text-gray-400 text-center uppercase tracking-widest mb-4">DNA Index</p>
                 <div className="text-5xl font-serif text-center">88</div>
              </div>
              <div className="grid grid-cols-2 gap-8 w-full mt-8 border-t border-gray-50 pt-8">
                 <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Reach</p>
                    <p className="text-lg font-bold text-emerald-500">+22.4%</p>
                 </div>
                 <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Drift</p>
                    <p className="text-lg font-bold">2.1%</p>
                 </div>
              </div>
              <div className="flex justify-between w-full mt-8 text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4">
                 <span>Integrity</span>
                 <span className="text-emerald-500">Optimal</span>
              </div>
           </div>
        </div>
      </section>

      {/* Secondary Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Campaign Card */}
        <div className="group bg-white border border-gray-100 rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:shadow-lg">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Paris Fashion Week</p>
           <span className="absolute top-8 right-8 text-[10px] px-2 py-0.5 bg-gray-100 rounded uppercase font-bold">In Progress</span>
           <div className="flex justify-between items-end mt-12">
              <div>
                <h4 className="text-2xl font-serif mb-1">Paris Fashion Week</h4>
                <p className="text-sm text-gray-400">Spring/Summer 2025</p>
              </div>
              <ArrowUpRight className="text-gray-300 group-hover:text-black transition-colors" />
           </div>
           <div className="mt-8">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                 <span>Momentum</span>
                 <span>65%</span>
              </div>
              <div className="w-full bg-gray-50 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-black h-full w-[65%]"></div>
              </div>
           </div>
        </div>

        {/* Critical Path Card */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h4 className="text-3xl font-serif">Critical Path</h4>
              <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-black">Complete All</button>
           </div>
           <div className="space-y-6">
              {[
                { label: 'Secure venue for After Party', time: '24h Left', color: 'bg-rose-500' },
                { label: 'Finalize talent contracts', time: 'Friday', color: 'bg-amber-500' },
                { label: 'Review campaign edit v2', time: 'Today', color: 'bg-emerald-500' }
              ].map((task, idx) => (
                <div key={idx} className="flex items-center justify-between group cursor-pointer border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                   <div className="flex items-center space-x-6">
                      <div className="w-5 h-5 rounded-full border border-gray-200 group-hover:bg-gray-50 transition-colors flex items-center justify-center">
                         <div className={`w-1.5 h-1.5 rounded-full ${task.color} opacity-0 group-hover:opacity-100`}></div>
                      </div>
                      <div className="flex items-center space-x-3">
                         <div className={`w-1.5 h-1.5 rounded-full ${task.color}`}></div>
                         <span className="text-sm font-medium">{task.label}</span>
                      </div>
                   </div>
                   <div className="flex items-center space-x-3 text-gray-400">
                      <Clock size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{task.time}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Signal Section */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-32">
         <div className="lg:col-span-3 bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-center">
            <h4 className="text-4xl font-serif mb-6 leading-tight max-w-xs">Global Media Resonance.</h4>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#000" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="val" stroke="#000" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
         </div>
         <div className="lg:col-span-2 bg-[#1a1a1a] text-white rounded-[40px] p-12 flex flex-col justify-between items-start">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
               <Sparkles size={24} className="text-white" />
            </div>
            <div>
               <h4 className="text-4xl font-serif mb-4 leading-tight">Live Market Signals.</h4>
               <p className="text-sm text-gray-400 font-light mb-8 max-w-[200px]">System integrity nominal. Awaiting grounded stream.</p>
               <button className="px-8 py-3 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                  View Analytics
               </button>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] text-white -mx-12 px-12 py-32 rounded-t-[80px]">
         <div className="grid grid-cols-2 lg:grid-cols-6 gap-16 mb-24">
            <div className="lg:col-span-2 space-y-8">
               <h2 className="text-4xl font-serif font-bold">FashionOS.</h2>
               <p className="text-sm text-gray-400 font-light max-w-xs leading-relaxed italic">
                 The Neural Maison Partner. Strategic AI for high-fidelity luxury fashion.
               </p>
               <div className="flex space-x-6 text-gray-500">
                  <div className="w-6 h-6 rounded-full border border-gray-800 flex items-center justify-center hover:text-white hover:border-white transition-all cursor-pointer">IG</div>
                  <div className="w-6 h-6 rounded-full border border-gray-800 flex items-center justify-center hover:text-white hover:border-white transition-all cursor-pointer">LN</div>
                  <div className="w-6 h-6 rounded-full border border-gray-800 flex items-center justify-center hover:text-white hover:border-white transition-all cursor-pointer">TW</div>
                  <div className="w-6 h-6 rounded-full border border-gray-800 flex items-center justify-center hover:text-white hover:border-white transition-all cursor-pointer">YT</div>
               </div>
            </div>
            
            <div className="space-y-4">
               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Platform</p>
               <ul className="text-sm space-y-3 text-gray-400">
                  <li className="hover:text-white cursor-pointer">Sitemap</li>
                  <li className="hover:text-white cursor-pointer">AI Agents</li>
                  <li className="hover:text-white cursor-pointer">Strategy Nodes</li>
                  <li className="hover:text-white cursor-pointer">Maison Tiers</li>
                  <li className="hover:text-white cursor-pointer text-white underline decoration-zinc-700 underline-offset-8">Launch Terminal</li>
               </ul>
            </div>

            <div className="space-y-4">
               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Sectors</p>
               <ul className="text-sm space-y-3 text-gray-400">
                  <li className="hover:text-white cursor-pointer">Beauty & Fragrance</li>
                  <li className="hover:text-white cursor-pointer">Automotive Design</li>
                  <li className="hover:text-white cursor-pointer">Fine Jewelry</li>
                  <li className="hover:text-white cursor-pointer">Bespoke Travel</li>
                  <li className="hover:text-white cursor-pointer">Private Finance</li>
                  <li className="hover:text-white cursor-pointer">Neural Tech</li>
               </ul>
            </div>

            <div className="space-y-4">
               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Workflows</p>
               <ul className="text-sm space-y-3 text-gray-400">
                  <li className="hover:text-white cursor-pointer">Plan a Shoot</li>
                  <li className="hover:text-white cursor-pointer">Production HUD</li>
                  <li className="hover:text-white cursor-pointer">Brief Editor</li>
                  <li className="hover:text-white cursor-pointer">Open Concierge</li>
               </ul>
            </div>

            <div className="space-y-4">
               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Intel</p>
               <ul className="text-sm space-y-3 text-gray-400">
                  <li className="hover:text-white cursor-pointer">Intelligence Feed</li>
                  <li className="hover:text-white cursor-pointer">Case Studies</li>
                  <li className="hover:text-white cursor-pointer flex items-center">
                    DNA Security <ShieldCheck size={12} className="ml-2" />
                  </li>
                  <li className="hover:text-white cursor-pointer">Integrations</li>
               </ul>
            </div>
         </div>
         
         <div className="flex flex-col lg:flex-row items-center justify-between border-t border-white/5 pt-12 text-[10px] font-bold uppercase tracking-widest text-gray-600">
            <p>© 2024 FashionOS Technology — UNIT 01</p>
            <div className="flex items-center space-x-12 mt-8 lg:mt-0">
               <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>Neural Sync Active</span>
               </div>
               <span className="px-4 py-1 border border-white/10 rounded">ISO 27001 Certified</span>
            </div>
         </div>
      </footer>
    </div>
  );
};
