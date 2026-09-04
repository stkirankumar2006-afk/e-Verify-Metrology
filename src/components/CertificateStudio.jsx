import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  ShieldCheck, 
  Sparkles, 
  QrCode, 
  Scale, 
  Calendar, 
  Check, 
  Layers, 
  Key, 
  Copy,
  Sliders,
  Award,
  Lock
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { INITIAL_CERTIFICATES } from '../data/mockData';
import { computeCertificateHash, generateQrPayload } from '../utils/cryptoUtils';

export default function CertificateStudio() {
  const [formData, setFormData] = useState({
    certificateId: 'CERT-2026-WB-8821',
    instrumentId: 'INST-WB-4401',
    instrumentType: 'Non-Automatic Weighing Instrument (NAWI) - Weighbridge',
    manufacturer: 'Avery Weigh-Tronix India Pvt Ltd',
    modelNumber: 'BridgeMaster E-1200',
    serialNumber: 'SN-98214-DEL',
    accuracyClass: 'Class III (Medium Accuracy)',
    maxCapacity: '60,000 kg (60 Ton)',
    minCapacity: '400 kg',
    verificationScaleInterval: '20 kg (e = 20 kg)',
    traderName: 'Tata Steel Logistics & Depot Yard',
    premisesAddress: 'Plot 42, Sector 18, Transport Nagar, New Delhi 110042',
    lmoName: 'Rajesh Kumar Sharma',
    lmoDesignation: 'Senior Legal Metrology Officer (Zone-IV)',
    sealNumber: 'SEAL-GOV-2026-991823',
    mpeStatus: 'PASS',
    issuedAt: '2026-03-01T10:30:00.000Z',
    expiresAt: '2027-02-28T23:59:59.000Z'
  });

  const [qrData, setQrData] = useState({
    hash: '',
    payload: {},
    jsonString: ''
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function updateCrypto() {
      const generated = await generateQrPayload(formData);
      setQrData({
        hash: generated.computedHash,
        payload: generated.payload,
        jsonString: generated.jsonString
      });
    }
    updateCrypto();
  }, [formData]);

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(qrData.jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Studio Header */}
      <div className="relative overflow-hidden rounded-3xl glass-panel-glow p-8 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md">
            <QrCode className="w-4 h-4 text-cyan-400" />
            <span>High Error-Correction (Level-H) Digital Certificate Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Digital Certificate & Security QR Studio
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Generate tamper-proof Legal Metrology digital certificates embedded with high error-correction Level-H QR codes, Ashoka emblem overlays, and dynamic SHA-256 HMAC integrity digests.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 5 Cols: Certificate Customizer Form */}
        <div className="lg:col-span-5 bg-[#0b1329]/90 border border-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-white text-base">Certificate Parameters</h3>
            </div>
            <button
              onClick={() => {
                const sample = INITIAL_CERTIFICATES[Math.floor(Math.random() * INITIAL_CERTIFICATES.length)];
                setFormData({
                  ...sample,
                  lmoName: sample.lmoName.split('(')[0].trim()
                });
              }}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
            >
              Load Sample Data
            </button>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Certificate Number</label>
              <input
                type="text"
                value={formData.certificateId}
                onChange={(e) => setFormData({ ...formData, certificateId: e.target.value })}
                className="w-full bg-[#070c1a] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Instrument Type</label>
              <input
                type="text"
                value={formData.instrumentType}
                onChange={(e) => setFormData({ ...formData, instrumentType: e.target.value })}
                className="w-full bg-[#070c1a] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Manufacturer</label>
                <input
                  type="text"
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  className="w-full bg-[#070c1a] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-medium mb-1">Serial Number</label>
                <input
                  type="text"
                  value={formData.serialNumber}
                  onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                  className="w-full bg-[#070c1a] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Max Capacity</label>
                <input
                  type="text"
                  value={formData.maxCapacity}
                  onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                  className="w-full bg-[#070c1a] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-medium mb-1">Scale Interval (e)</label>
                <input
                  type="text"
                  value={formData.verificationScaleInterval}
                  onChange={(e) => setFormData({ ...formData, verificationScaleInterval: e.target.value })}
                  className="w-full bg-[#070c1a] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Trader / Premise Entity</label>
              <input
                type="text"
                value={formData.traderName}
                onChange={(e) => setFormData({ ...formData, traderName: e.target.value })}
                className="w-full bg-[#070c1a] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Physical Seal UUID</label>
                <input
                  type="text"
                  value={formData.sealNumber}
                  onChange={(e) => setFormData({ ...formData, sealNumber: e.target.value })}
                  className="w-full bg-[#070c1a] border border-slate-800 rounded-xl px-3.5 py-2.5 text-amber-400 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-medium mb-1">Verification Officer</label>
                <input
                  type="text"
                  value={formData.lmoName}
                  onChange={(e) => setFormData({ ...formData, lmoName: e.target.value })}
                  className="w-full bg-[#070c1a] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Cryptographic SHA-256 Box */}
          <div className="p-4 bg-[#070c1a] rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-cyan-400" />
                Live SHA-256 Checksum:
              </span>
              <button 
                onClick={handleCopyPayload}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>
            <div className="p-2.5 bg-black/90 rounded-xl font-mono text-[10px] text-cyan-300 break-all border border-slate-800">
              {qrData.hash}
            </div>
          </div>

        </div>

        {/* Right 7 Cols: Official Certificate Printable Document Preview */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-base">Live Certificate Preview (A4 Format)</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center space-x-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-cyan-400" />
                <span>Print Document</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-500/20 flex items-center space-x-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>

          {/* Official Document Sheet */}
          <div className="bg-slate-50 text-slate-900 rounded-3xl p-8 shadow-2xl border-4 border-slate-300 relative overflow-hidden bg-guilloche">
            
            {/* National Security Frame */}
            <div className="border-2 border-dashed border-sky-800 p-6 rounded-2xl relative space-y-6 bg-white/90 backdrop-blur-xs">
              
              {/* National Header */}
              <div className="text-center space-y-1 border-b-2 border-sky-900/40 pb-4">
                <div className="text-xs uppercase tracking-widest font-black text-slate-800">
                  Government of India • Ministry of Consumer Affairs
                </div>
                <div className="text-sm font-bold text-sky-900 uppercase">
                  Department of Legal Metrology (Weights & Measures)
                </div>
                <div className="text-xl font-black text-slate-950 tracking-tight mt-1">
                  DIGITAL CERTIFICATE OF VERIFICATION & STAMPING
                </div>
                <div className="text-[11px] text-slate-600 font-medium">
                  Issued under the Legal Metrology Act, 2009 & Legal Metrology (General) Rules, 2011
                </div>
              </div>

              {/* Main Content Layout */}
              <div className="grid grid-cols-12 gap-6 items-start">
                
                {/* Left 8 Cols: Metrology Info */}
                <div className="col-span-8 space-y-4 text-xs leading-relaxed">
                  
                  <div className="grid grid-cols-2 gap-3 bg-sky-50/80 p-3 rounded-xl border border-sky-200">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500">Certificate No.</span>
                      <div className="font-mono font-bold text-sky-950 text-sm">{formData.certificateId}</div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500">Validity Period</span>
                      <div className="font-semibold text-slate-800">
                        {formData.issuedAt.slice(0, 10)} to {formData.expiresAt.slice(0, 10)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-slate-500 font-medium">Instrument Specification:</span>
                      <p className="font-bold text-slate-900">{formData.instrumentType}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-500">Manufacturer:</span>
                        <p className="font-semibold text-slate-800">{formData.manufacturer}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Model / Serial No.:</span>
                        <p className="font-mono font-semibold text-slate-800">{formData.modelNumber} ({formData.serialNumber})</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-500">Accuracy Standard & Max:</span>
                        <p className="font-semibold text-slate-800">{formData.accuracyClass} ({formData.maxCapacity})</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Scale Interval (e):</span>
                        <p className="font-mono font-semibold text-slate-800">{formData.verificationScaleInterval}</p>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500">Trader / Premise Location:</span>
                      <p className="font-semibold text-slate-900">{formData.traderName}</p>
                      <p className="text-[11px] text-slate-600">{formData.premisesAddress}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                      <div>
                        <span className="text-slate-500">Physical Seal Barcode:</span>
                        <div className="font-mono font-bold text-amber-700">{formData.sealNumber}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500">OIML MPE Status:</span>
                        <div className="font-bold text-emerald-700">COMPLIANT (PASS)</div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right 4 Cols: Security QR Code (Level-H with Central Logo) */}
                <div className="col-span-4 flex flex-col items-center text-center space-y-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="relative p-1 bg-white">
                    <QRCodeSVG
                      value={qrData.jsonString || JSON.stringify(qrData.payload)}
                      size={155}
                      level="H"
                      includeMargin={false}
                      imageSettings={{
                        src: "/logo.jpg",
                        x: undefined,
                        y: undefined,
                        height: 34,
                        width: 34,
                        excavate: true,
                      }}
                    />
                  </div>

                  <div className="text-[10px] text-slate-600 font-medium">
                    Official Govt Level-H Security QR (SHA-256 Protected)
                  </div>

                  <div className="pt-2 border-t border-slate-200 w-full text-center space-y-1">
                    <div className="text-[10px] text-slate-500">Stamping Officer</div>
                    <div className="font-bold text-slate-900 text-xs">{formData.lmoName}</div>
                    <div className="text-[9px] text-slate-500">{formData.lmoDesignation}</div>
                  </div>
                </div>

              </div>

              {/* Security Hash & Anti-Counterfeit Footer */}
              <div className="border-t-2 border-sky-900/30 pt-3 flex items-center justify-between text-[10px] font-mono text-slate-600">
                <div>
                  <span className="font-bold text-slate-800">SHA-256 HMAC: </span>
                  <span>{qrData.hash.slice(0, 32)}...{qrData.hash.slice(-16)}</span>
                </div>
                <div className="text-right font-sans font-bold text-sky-900">
                  NATIONAL METROLOGY GRID VERIFIED
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
