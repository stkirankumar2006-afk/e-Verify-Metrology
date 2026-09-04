import React, { useState } from 'react';
import { 
  Scale, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  AlertCircle, 
  SlidersHorizontal, 
  ShieldCheck, 
  Clock, 
  Send, 
  Plus, 
  Sparkles,
  FileCheck,
  Compass,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_APPLICATIONS } from '../data/mockData';

export default function LmoInspectorPortal({ onCertificateIssued }) {
  const [selectedApp, setSelectedApp] = useState(MOCK_APPLICATIONS[0]);
  const [sealNumber, setSealNumber] = useState('SEAL-GOV-2026-' + Math.floor(100000 + Math.random() * 900000));
  
  // Test Load Readings Array
  const [readings, setReadings] = useState([
    { load: '100 kg', indicated: '100.0 kg', error: '0.0 kg', maxMpe: '±0.5 kg', status: 'PASS' },
    { load: '250 kg', indicated: '250.2 kg', error: '+0.2 kg', maxMpe: '±1.0 kg', status: 'PASS' },
    { load: '500 kg', indicated: '499.7 kg', error: '-0.3 kg', maxMpe: '±1.5 kg', status: 'PASS' }
  ]);

  const [gpsLocation, setGpsLocation] = useState({ lat: 28.6291, lng: 77.3782, address: 'Noida Sector 63 Logistics Hub' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [issuedSuccess, setIssuedSuccess] = useState(false);

  const handleUpdateReading = (index, field, value) => {
    const updated = [...readings];
    updated[index][field] = value;
    setReadings(updated);
  };

  const handleIssueStamping = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIssuedSuccess(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      if (onCertificateIssued) {
        onCertificateIssued();
      }
    }, 1200);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel-glow p-8 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>Field Verification & Stamping Terminal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            LMO / GATC Inspector Field Desk
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Record physical standard test weights, automatically calculate OIML R76 Maximum Permissible Error (MPE) compliance, bind tamper-evident hardware seals, and cryptographically issue legal certificates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 4 Cols: Inspection Queue */}
        <div className="lg:col-span-4 bg-[#0b1329]/90 border border-slate-800/90 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm">Assigned Tasks Queue</h3>
            <span className="text-xs text-cyan-400 font-semibold">{MOCK_APPLICATIONS.length} Pending</span>
          </div>

          <div className="space-y-3">
            {MOCK_APPLICATIONS.map((app) => (
              <div
                key={app.appId}
                onClick={() => {
                  setSelectedApp(app);
                  setIssuedSuccess(false);
                }}
                className={`p-4 rounded-2xl border transition cursor-pointer space-y-2.5 ${
                  selectedApp.appId === app.appId
                    ? 'bg-cyan-500/15 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                    : 'bg-[#070c1a]/80 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-white">{app.appId}</span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                    app.priority === 'HIGH' || app.priority === 'URGENT' 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {app.priority}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-100 text-xs">{app.traderName}</h4>
                  <p className="text-[11px] text-slate-400">{app.instrumentType} ({app.capacity})</p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/60">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    {app.location}
                  </span>
                  <span>{app.submissionDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 8 Cols: Stamping & MPE Verification Workspace */}
        <div className="lg:col-span-8 bg-[#0b1329]/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Target Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="text-xs text-cyan-400 font-mono font-bold">{selectedApp.appId}</span>
              <h2 className="text-xl font-bold text-white mt-0.5">{selectedApp.traderName}</h2>
              <p className="text-xs text-slate-400">{selectedApp.instrumentType} — Model: {selectedApp.model}</p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400">Target Standard</span>
              <div className="text-sm font-bold text-emerald-400">OIML R76 Class III</div>
            </div>
          </div>

          {/* Test Load MPE Table Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                Record Standard Test Load Readings
              </h4>
              <span className="text-xs text-slate-400">Tolerance Rule: δm ≤ ±1.0 e</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#070c1a]">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/60 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Standard Load</th>
                    <th className="p-3.5">Indicated Reading</th>
                    <th className="p-3.5">Observed Error</th>
                    <th className="p-3.5">Allowed MPE</th>
                    <th className="p-3.5 text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {readings.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-800/40 font-mono">
                      <td className="p-3.5 font-medium">{r.load}</td>
                      <td className="p-3.5">
                        <input
                          type="text"
                          value={r.indicated}
                          onChange={(e) => handleUpdateReading(i, 'indicated', e.target.value)}
                          className="bg-[#0b1329] border border-slate-700 rounded-lg px-2.5 py-1 text-cyan-300 font-mono text-xs w-32 focus:outline-none focus:border-cyan-500"
                        />
                      </td>
                      <td className="p-3.5 text-slate-300">{r.error}</td>
                      <td className="p-3.5 text-slate-400">{r.maxMpe}</td>
                      <td className="p-3.5 text-right">
                        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Seal UUID & Physical Tagging */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#070c1a] rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 font-medium">Assign Physical Seal UUID</span>
              <input
                type="text"
                value={sealNumber}
                onChange={(e) => setSealNumber(e.target.value)}
                className="w-full bg-[#0b1329] border border-slate-700 rounded-xl px-3 py-2.5 text-amber-400 font-mono text-sm focus:border-amber-400 focus:outline-none"
              />
              <p className="text-[10px] text-slate-500">Tamper-evident barcoded seal linked to physical calibration port.</p>
            </div>

            <div className="p-4 bg-[#070c1a] rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 font-medium">Geo-Location Proof</span>
              <div className="flex items-center space-x-2 text-xs text-slate-200">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">{gpsLocation.lat.toFixed(4)}° N, {gpsLocation.lng.toFixed(4)}° E</span>
              </div>
              <p className="text-[10px] text-slate-500">{gpsLocation.address} (GPS Verified)</p>
            </div>
          </div>

          {/* Success Banner or Stamping CTA */}
          {issuedSuccess ? (
            <div className="p-5 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl flex items-center justify-between text-emerald-200 shadow-xl">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                <div>
                  <h4 className="font-bold text-white text-sm">Certificate Stamped & Published Successfully!</h4>
                  <p className="text-xs text-emerald-300">
                    Certificate ID CERT-2026-WB-8821 with Level-H QR code and SHA-256 HMAC published to National Registry.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIssuedSuccess(false)}
                className="text-xs bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-xl border border-emerald-500/30 hover:bg-emerald-500/30 cursor-pointer font-semibold"
              >
                Stamp Next
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={handleIssueStamping}
                disabled={isSubmitting}
                className="px-7 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs rounded-2xl shadow-xl shadow-emerald-500/20 flex items-center space-x-2 cursor-pointer transition"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isSubmitting ? 'Computing SHA-256 & Stamping...' : 'Approve & Issue Tamper-Proof Digital Certificate'}</span>
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
