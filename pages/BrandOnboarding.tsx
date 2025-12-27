
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Globe, ShieldCheck, ArrowRight, ArrowLeft, 
  Loader2, CheckCircle2, Zap, Palette, BarChart3
} from 'lucide-react';
import { 
  extractBrandDNA, 
  detectBrandChannels, 
  performDeepBrandAnalysis, 
  calculateNPI 
} from '../services/geminiService';
import { BrandProfile } from '../types';

interface BrandOnboardingProps {
  onComplete: (profile: BrandProfile) => void;
}

export const BrandOnboarding: React.FC<BrandOnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
  });

  const [results, setResults] = useState<Partial<BrandProfile>>({});

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const startAnalysis = async () => {
    setLoading(true);
    setStep(5);
    try {
      setStatusMsg('Initiating Neural Mesh...');
      const dna = await extractBrandDNA(formData.website);
      
      setStatusMsg('Detecting Global Channels...');
      const channels = await detectBrandChannels(formData.name, formData.website);
      
      setStatusMsg('Deep Brand Reasoning...');
      const analysis = await performDeepBrandAnalysis(formData.name, dna);
      
      setStatusMsg('Calculating NPI Score...');
      const npi = await calculateNPI({ name: formData.name, dna, channels, analysis });

      const finalProfile: BrandProfile = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        dna,
        channels,
        npi,
        pillars: analysis.pillars,
        personas: analysis.personas,
      };

      setResults(finalProfile);
      setStatusMsg('Resonance Synchronized');
    } catch (error) {
      console.error(error);
      setStatusMsg('Neural Sync Interrupted');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-12 bg-[#fcfcfc] animate-in fade-in duration-700">
      <div className="w-full max-w-2xl bg-white rounded-[40px] border border-gray-100 shadow-2xl p-16 relative overflow-hidden">
        {/* Progress HUD */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-50">
          <div 
            className="h-full bg-black transition-all duration-700 ease-out" 
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <div className="space-y-10 animate-in slide-in-from-bottom-4">
            <header>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-4 block">Stage 01</span>
              <h2 className="text-5xl font-serif leading-tight">Maison Identity.</h2>
              <p className="text-gray-400 font-light mt-4">Define the core essence of your brand to begin the neural mapping.</p>
            </header>
            <div className="space-y-6">
              <input 
                placeholder="Brand Name (e.g., L'Artisan)" 
                className="w-full px-8 py-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-black transition-all text-xl font-serif"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <textarea 
                placeholder="Brief DNA Summary..." 
                className="w-full px-8 py-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-black transition-all text-sm h-32 resize-none"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <button 
              disabled={!formData.name || !formData.description}
              onClick={nextStep}
              className="w-full py-5 bg-black text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center space-x-3 disabled:opacity-30"
            >
              <span>Continue Sync</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10 animate-in slide-in-from-bottom-4">
            <header>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-4 block">Stage 02</span>
              <h2 className="text-5xl font-serif leading-tight">Digital Anchor.</h2>
              <p className="text-gray-400 font-light mt-4">Provide your primary URL for AI-powered visual DNA extraction.</p>
            </header>
            <div className="relative group">
              <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={20} />
              <input 
                placeholder="https://yourbrand.com" 
                className="w-full pl-16 pr-8 py-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-black transition-all text-lg font-mono lowercase"
                value={formData.website}
                onChange={e => setFormData({...formData, website: e.target.value})}
              />
            </div>
            <div className="flex space-x-4">
              <button onClick={prevStep} className="px-8 py-5 border border-gray-100 rounded-2xl text-gray-400 hover:text-black transition-all"><ArrowLeft size={20}/></button>
              <button 
                disabled={!formData.website.includes('.')}
                onClick={nextStep}
                className="flex-1 py-5 bg-black text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center space-x-3 disabled:opacity-30 shadow-lg"
              >
                <span>Verify Node</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10 animate-in slide-in-from-bottom-4 text-center">
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <ShieldCheck size={40} className="text-indigo-500" />
            </div>
            <h2 className="text-4xl font-serif leading-tight">Resonance Check.</h2>
            <div className="p-8 bg-gray-50 rounded-[32px] text-left space-y-4">
               <div className="flex justify-between border-b border-gray-200 pb-4">
                  <span className="text-[10px] font-bold uppercase text-gray-400">Maison</span>
                  <span className="text-sm font-serif">{formData.name}</span>
               </div>
               <div className="flex justify-between border-b border-gray-200 pb-4">
                  <span className="text-[10px] font-bold uppercase text-gray-400">Anchor</span>
                  <span className="text-sm font-mono truncate ml-8">{formData.website}</span>
               </div>
            </div>
            <p className="text-xs text-gray-400 italic">"The OS will now crawl your digital presence to build a visual style guide."</p>
            <div className="flex space-x-4">
              <button onClick={prevStep} className="px-8 py-5 border border-gray-100 rounded-2xl text-gray-400 transition-all"><ArrowLeft size={20}/></button>
              <button 
                onClick={startAnalysis}
                className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center space-x-3 shadow-xl hover:bg-indigo-700 transition-all"
              >
                <Zap size={16} />
                <span>Trigger Analysis</span>
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-12 animate-in zoom-in-95 duration-700 text-center py-8">
            {loading ? (
              <div className="space-y-8">
                <div className="relative w-24 h-24 mx-auto">
                   <div className="absolute inset-0 border-4 border-gray-50 rounded-full"></div>
                   <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                   <Sparkles className="absolute inset-0 m-auto text-indigo-500" size={32} />
                </div>
                <div>
                   <h3 className="text-2xl font-serif mb-2">{statusMsg}</h3>
                   <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-400 uppercase tracking-widest">
                      <Loader2 size={12} className="animate-spin" />
                      <span>Gemini 3 Pro Processing...</span>
                   </div>
                </div>
              </div>
            ) : (
              <div className="space-y-10">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                   <CheckCircle2 size={40} />
                </div>
                <header>
                  <h3 className="text-4xl font-serif mb-4">Maison Verified.</h3>
                  <div className="flex justify-center space-x-8 mt-8">
                     <div className="text-center">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">DNA Clarity</p>
                        <p className="text-2xl font-serif text-emerald-500">{results.npi?.breakdown.clarity}%</p>
                     </div>
                     <div className="w-px h-10 bg-gray-100"></div>
                     <div className="text-center">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">NPI Score</p>
                        <p className="text-2xl font-serif">{results.npi?.total}</p>
                     </div>
                  </div>
                </header>

                <div className="grid grid-cols-2 gap-4 text-left">
                   <div className="p-5 bg-gray-50 rounded-2xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <Palette size={14} className="text-indigo-500" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Extracted DNA</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {results.dna?.colorPalette.slice(0, 4).map(c => (
                          <div key={c} className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                   </div>
                   <div className="p-5 bg-gray-50 rounded-2xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <BarChart3 size={14} className="text-emerald-500" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Readiness</span>
                      </div>
                      <p className="text-xs font-bold uppercase">{results.npi?.breakdown.readiness}% Target</p>
                   </div>
                </div>

                <button 
                  onClick={() => onComplete(results as BrandProfile)}
                  className="w-full py-5 bg-black text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:bg-zinc-800 transition-all"
                >
                  Enter Maison Workspace
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
