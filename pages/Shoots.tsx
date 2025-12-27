
import React, { useState, useEffect } from 'react';
import { 
  Camera, Plus, Calendar, MapPin, 
  ChevronRight, Filter, Sparkles, Loader2,
  CheckCircle2, AlertTriangle, ListFilter
} from 'lucide-react';
import { Shoot, BrandProfile, ShotItem } from '../types';
import { generateShotList, analyzeShootConcept } from '../services/geminiService';

export const Shoots: React.FC = () => {
  const [maison] = useState<BrandProfile | null>(() => {
    const saved = localStorage.getItem('fashionos_maison');
    return saved ? JSON.parse(saved) : null;
  });

  const [shoots, setShoots] = useState<Shoot[]>(() => {
    const saved = localStorage.getItem('fashionos_shoots');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCreating, setIsCreating] = useState(false);
  const [activeShoot, setActiveShoot] = useState<Shoot | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [newShootData, setNewShootData] = useState({
    title: '',
    concept: '',
    location: '',
    date: ''
  });

  useEffect(() => {
    localStorage.setItem('fashionos_shoots', JSON.stringify(shoots));
  }, [shoots]);

  const handleCreateShoot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!maison) return;

    setIsGenerating(true);
    try {
      // AI generate the shot list grounded in DNA
      const shotList = await generateShotList(newShootData.concept, maison.dna);
      
      const newShoot: Shoot = {
        id: Math.random().toString(36).substr(2, 9),
        title: newShootData.title,
        concept: newShootData.concept,
        location: newShootData.location,
        date: newShootData.date,
        status: 'Planned',
        shotList,
        dnaSnapshot: maison.dna
      };

      setShoots([newShoot, ...shoots]);
      setIsCreating(false);
      setNewShootData({ title: '', concept: '', location: '', date: '' });
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const updateShotStatus = (shootId: string, shotId: string, status: 'Pending' | 'Captured' | 'Rejected') => {
    setShoots(prev => prev.map(s => {
      if (s.id === shootId) {
        return {
          ...s,
          shotList: s.shotList.map(sh => sh.id === shotId ? { ...sh, status } : sh)
        };
      }
      return s;
    }));
  };

  if (activeShoot) {
    return (
      <div className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#fcfcfc] p-12 animate-in fade-in duration-500">
        <button 
          onClick={() => setActiveShoot(null)}
          className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8 hover:text-black transition-colors flex items-center"
        >
          <ChevronRight className="rotate-180 mr-2" size={14} />
          Back to Productions
        </button>

        <header className="flex justify-between items-end mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full border ${
                activeShoot.status === 'Planned' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
              }`}>
                {activeShoot.status}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Shoot ID: {activeShoot.id}</span>
            </div>
            <h2 className="text-5xl font-serif mb-4">{activeShoot.title}</h2>
            <div className="flex items-center space-x-6 text-gray-400 text-sm">
               <span className="flex items-center"><Calendar size={14} className="mr-2" /> {activeShoot.date}</span>
               <span className="flex items-center"><MapPin size={14} className="mr-2" /> {activeShoot.location}</span>
            </div>
          </div>
          <button className="px-8 py-4 bg-black text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 shadow-xl transition-all">
            Download Call Sheet
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-2xl font-serif">Shot List</h3>
            <div className="bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50 bg-gray-50/30">
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Concept</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Lighting/Framing</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center">DNA Fit</th>
                    <th className="px-8 py-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {activeShoot.shotList.map((shot) => (
                    <tr key={shot.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <p className="text-sm font-semibold mb-1">{shot.description}</p>
                        <p className="text-[10px] text-gray-400 uppercase font-black">{shot.status}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-xs text-gray-500 mb-1">{shot.lighting}</p>
                        <p className="text-[10px] text-indigo-500 font-bold uppercase">{shot.framing}</p>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="text-lg font-serif text-emerald-500">{shot.dnaAlignment}%</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <div className="flex items-center justify-end space-x-2">
                            <button 
                              onClick={() => updateShotStatus(activeShoot.id, shot.id, 'Captured')}
                              className={`p-2 rounded-xl border transition-all ${shot.status === 'Captured' ? 'bg-emerald-500 text-white border-emerald-500' : 'border-gray-100 text-gray-300 hover:text-emerald-500'}`}
                            >
                              <CheckCircle2 size={16} />
                            </button>
                            <button 
                              onClick={() => updateShotStatus(activeShoot.id, shot.id, 'Rejected')}
                              className={`p-2 rounded-xl border transition-all ${shot.status === 'Rejected' ? 'bg-rose-500 text-white border-rose-500' : 'border-gray-100 text-gray-300 hover:text-rose-500'}`}
                            >
                              <AlertTriangle size={16} />
                            </button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-serif mb-6">Maison Context</h3>
              <div className="p-8 bg-zinc-900 text-white rounded-[32px] space-y-6">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">Primary Lighting</p>
                  <p className="text-sm font-serif italic">"{activeShoot.dnaSnapshot.lightingStyle}"</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeShoot.dnaSnapshot.colorPalette.map(c => (
                    <div key={c} className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="pt-6 border-t border-white/5">
                   <p className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-2">Neural Audit Result</p>
                   <p className="text-xs text-zinc-400 leading-relaxed">AI confirmed 94% DNA resonance. Shot list prioritized for high-street contemporary conversion.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#fcfcfc] p-12 animate-in fade-in duration-700">
      <header className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-4xl font-serif mb-2">Shoots</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center space-x-2">
            <span>FashionOS</span>
            <span className="text-gray-200">/</span>
            <span>Production Workflow</span>
          </p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="px-8 py-3 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center space-x-3 hover:bg-zinc-800 shadow-lg transition-all"
        >
          <Plus size={16} />
          <span>New Production</span>
        </button>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {shoots.length > 0 ? shoots.map((shoot) => (
          <div 
            key={shoot.id}
            onClick={() => setActiveShoot(shoot)}
            className="group bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-12">
               <div className="p-3 bg-gray-50 rounded-2xl text-gray-400 group-hover:text-black group-hover:bg-indigo-50 transition-all">
                  <Camera size={20} />
               </div>
               <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-gray-50 rounded-full">{shoot.status}</span>
            </div>
            <div>
              <h4 className="text-2xl font-serif mb-2 leading-tight">{shoot.title}</h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">{shoot.date} • {shoot.location}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                 <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold">
                        {i}
                      </div>
                    ))}
                 </div>
                 <div className="flex items-center space-x-2 text-indigo-500">
                    <Sparkles size={12} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{shoot.shotList.length} AI Shots</span>
                 </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="lg:col-span-3 py-32 text-center bg-white border border-dashed border-gray-200 rounded-[40px]">
             <Camera className="mx-auto text-gray-200 mb-6" size={48} />
             <p className="text-xl font-serif text-gray-400 italic">No productions in the neural mesh</p>
             <button 
              onClick={() => setIsCreating(true)}
              className="mt-6 text-[10px] font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-600 underline underline-offset-8"
             >
               Initialize First Shoot
             </button>
          </div>
        )}
      </section>

      {/* Creation Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => !isGenerating && setIsCreating(false)} />
          <div className="bg-white rounded-[40px] w-full max-w-xl relative z-10 overflow-hidden shadow-2xl p-12">
             <header className="mb-10 text-center">
                <h3 className="text-3xl font-serif mb-2">Initialize Production.</h3>
                <p className="text-sm text-gray-400 italic">"Grounded in your Maison's Visual DNA"</p>
             </header>

             <form onSubmit={handleCreateShoot} className="space-y-6">
                <input 
                  placeholder="Production Title (e.g., SS25 Campaign)" 
                  className="w-full px-8 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-1 focus:ring-black transition-all font-serif"
                  value={newShootData.title}
                  onChange={e => setNewShootData({...newShootData, title: e.target.value})}
                  required
                />
                <textarea 
                  placeholder="Creative Concept & Mood..." 
                  className="w-full px-8 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-1 focus:ring-black transition-all text-sm h-32 resize-none"
                  value={newShootData.concept}
                  onChange={e => setNewShootData({...newShootData, concept: e.target.value})}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    placeholder="Location" 
                    className="px-8 py-4 bg-gray-50 rounded-2xl outline-none text-sm"
                    value={newShootData.location}
                    onChange={e => setNewShootData({...newShootData, location: e.target.value})}
                  />
                  <input 
                    type="date"
                    className="px-8 py-4 bg-gray-50 rounded-2xl outline-none text-sm text-gray-400"
                    value={newShootData.date}
                    onChange={e => setNewShootData({...newShootData, date: e.target.value})}
                  />
                </div>
                
                <button 
                  disabled={isGenerating}
                  type="submit"
                  className="w-full py-5 bg-black text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center space-x-3 shadow-xl hover:bg-zinc-800 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Drafting Shot List...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      <span>Sync Production</span>
                    </>
                  )}
                </button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};
