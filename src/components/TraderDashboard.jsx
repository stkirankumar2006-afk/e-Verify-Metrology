import React, { useState } from 'react';
import { 
  Building2, 
  FileCheck2, 
  Plus, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Download, 
  QrCode, 
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { INITIAL_CERTIFICATES } from '../data/mockData';

export default function TraderDashboard({ onSelectCert }) {
  const [showNewAppModal, setShowNewAppModal] = useState(false);

  const instruments = [
    {
      id: "INST-WB-4401",
      name: "Avery Weigh-Tronix BridgeMaster E-1200",
      type: "Weighbridge (60 Ton)",
      serial: "SN-98214-DEL",
      location: "Transport Nagar Yard #3",
      certId: "CERT-2026-WB-8821",
      expiresIn: "359 days",
      status: "VALID"
    },
    {
      id: "INST-CS-1092",
      name: "Essae Teraoka DS-215 POS Bench Scale",
      type: "Retail Scale (30 kg)",
      serial: "SN-44109-MUM",
      location: "Phoenix Palladium Outlet",
      certId: "CERT-2026-CS-3390",
      expiresIn: "345 days",
      status: "VALID"
    },
    {
      id: "INST-FD-8830",
      name: "Gilbarco Horizon Plus MPD 4-Arm",
      type: "Fuel Dispenser (80 L/min)",
      serial: "SN-66710-BLR",
      location: "Bellandur Station",
      certId: "CERT-2026-FD-7712",
      expiresIn: "319 days",
      status: "VALID"
    },
    {
      id: "INST-AN-9901",
      name: "Mettler Toledo Precision Balance MS-TS",
      type: "Class II Laboratory Scale (320g)",
      serial: "SN-11092-DEL",
      location: "Quality Lab Sector 18",
      certId: "CERT-2025-PB-1120",
      expiresIn: "EXPIRED (12 days ago)",
      status: "EXPIRED"
    }
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel-glow p-8 sm:p-10 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>Commercial Trader & Manufacturer Vault</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Commercial Instruments Portfolio
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Track statutory verification renewals, access Level-H cryptographic digital certificates, and apply for annual metrological re-stamping under the Legal Metrology Act.
            </p>
          </div>

          <button
            onClick={() => setShowNewAppModal(true)}
            className="px-6 py-4 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 text-white font-extrabold text-xs rounded-2xl shadow-xl shadow-cyan-500/25 flex items-center space-x-2.5 cursor-pointer self-start md:self-auto shrink-0 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Apply for New Instrument Stamping</span>
          </button>
        </div>
      </div>

      {/* Instruments Table */}
      <div className="bg-[#0b1329]/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <FileCheck2 className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">Registered Commercial Devices & Validity</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Total: {instruments.length} Instruments</span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#070c1a]">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/60 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Instrument & Model</th>
                <th className="p-4">Type & Serial No.</th>
                <th className="p-4">Premises Location</th>
                <th className="p-4">Certificate ID</th>
                <th className="p-4">Validity Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {instruments.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white">{item.name}</td>
                  <td className="p-4 font-mono text-slate-300">
                    <div>{item.type}</div>
                    <div className="text-[11px] text-slate-500">{item.serial}</div>
                  </td>
                  <td className="p-4 text-slate-400">{item.location}</td>
                  <td className="p-4 font-mono text-cyan-400 font-bold">{item.certId}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      item.status === 'VALID' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {item.expiresIn}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => onSelectCert && onSelectCert(item.certId)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-semibold border border-slate-700 inline-flex items-center space-x-1.5 cursor-pointer transition shadow-sm"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Verify QR</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Application */}
      {showNewAppModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b1329] border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl animate-scaleIn text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">New Stamping & Verification Application</h3>
              <button onClick={() => setShowNewAppModal(false)} className="text-slate-400 hover:text-white cursor-pointer text-sm">✕</button>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Instrument Category</label>
                <select className="w-full bg-[#070c1a] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none">
                  <option>Electronic Non-Automatic Weighing Instrument (NAWI)</option>
                  <option>Fuel Dispensing Unit (MPD)</option>
                  <option>Automatic Gravimetric Filling Instrument</option>
                  <option>High Precision Analytical Balance (Class I/II)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Manufacturer</label>
                  <input type="text" placeholder="e.g. Avery Weigh-Tronix" className="w-full bg-[#070c1a] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Serial Number</label>
                  <input type="text" placeholder="e.g. SN-99812-DL" className="w-full bg-[#070c1a] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono focus:border-cyan-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Deployment / Premise Address</label>
                <input type="text" placeholder="Full street address of commercial installation" className="w-full bg-[#070c1a] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3">
              <button onClick={() => setShowNewAppModal(false)} className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold cursor-pointer">Cancel</button>
              <button 
                onClick={() => {
                  alert("Application registered successfully with Legal Metrology Divisional Office!");
                  setShowNewAppModal(false);
                }} 
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
