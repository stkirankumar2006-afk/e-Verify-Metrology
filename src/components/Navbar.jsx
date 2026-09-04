import React from 'react';
import { 
  ShieldCheck, 
  QrCode, 
  FileText, 
  Scale, 
  Building2, 
  BrainCircuit, 
  Sparkles,
  Lock
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'verify', label: 'Public Verification', icon: QrCode },
    { id: 'studio', label: 'Certificate Studio', icon: FileText },
    { id: 'lmo', label: 'Inspector Desk', icon: Scale },
    { id: 'trader', label: 'Trader Vault', icon: Building2 },
    { id: 'ai', label: 'AI Anomaly Shield', icon: BrainCircuit }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#030712]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
      {/* Top National Strip */}
      <div className="bg-gradient-to-r from-amber-500 via-white/40 to-emerald-500 h-[3px] w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & National Title */}
          <div className="flex items-center space-x-3.5 cursor-pointer" onClick={() => setActiveTab('verify')}>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-800 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#030712] rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-cyan-400" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full w-3.5 h-3.5 border-2 border-[#030712] shadow-sm" />
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300">
                  e-Verify Metrology
                </span>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  National Grid
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                National Online Legal Metrology Verification System
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1.5 bg-[#0b1329]/80 p-1.5 rounded-2xl border border-slate-800/80 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/50 shadow-lg shadow-cyan-500/15'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Govt Standards Badge */}
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-end text-right">
              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                OIML R76 / R117
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Legal Metrology Act, 2009</span>
            </div>

            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>SHA-256 Verified</span>
            </div>
          </div>

        </div>

        {/* Mobile Navigation Scrollbar */}
        <div className="lg:hidden flex items-center space-x-2 py-2.5 overflow-x-auto no-scrollbar border-t border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 bg-slate-900/60 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
