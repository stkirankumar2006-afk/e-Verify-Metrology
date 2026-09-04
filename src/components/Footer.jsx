import React from 'react';
import { ShieldCheck, Scale, ExternalLink, Heart, Globe, Lock } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-[#030712] border-t border-slate-800/80 pt-12 pb-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Govt Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-white font-bold text-base tracking-tight">
                e-Verify Metrology
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
              National Online Verification System for Weighing and Measuring Instruments. Designed for the Department of Legal Metrology, Ministry of Consumer Affairs, Food & Public Distribution, Government of India.
            </p>
            <div className="flex items-center space-x-3 text-[11px] text-slate-500">
              <span>Legal Metrology Act, 2009</span>
              <span>•</span>
              <span>OIML R76 / R117 Standards</span>
              <span>•</span>
              <span>ISO/IEC 17025 Compliant</span>
            </div>
          </div>

          {/* Col 2: System Portals */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Verification Portals</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => setActiveTab('verify')} className="hover:text-cyan-300 transition cursor-pointer">
                  Public QR & ID Verification
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('studio')} className="hover:text-cyan-300 transition cursor-pointer">
                  Certificate & QR Studio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('lmo')} className="hover:text-cyan-300 transition cursor-pointer">
                  Inspector (LMO) Desk
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('trader')} className="hover:text-cyan-300 transition cursor-pointer">
                  Trader Instrument Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai')} className="hover:text-cyan-300 transition cursor-pointer">
                  FastAPI AI Anomaly Sentinel
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Standards & Certifications */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Compliance & Security</h4>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>Level-H Error Correction QR (30%)</li>
              <li>256-Bit SHA-256 HMAC Signatures</li>
              <li>Offline Zero-Trust Verification</li>
              <li>Isolation Forest Anomaly Telemetry</li>
              <li>Tamper-Evident Physical Seal Binding</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © 2026 e-Verify Metrology • National Legal Metrology Department, Government of India.
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              HMAC SHA-256 Cryptographic Grid
            </span>
            <span>Zero-Trust Architecture</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
