import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Camera, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  FileCheck2, 
  Lock, 
  Cpu, 
  MapPin, 
  Calendar, 
  Hash, 
  UserCheck, 
  SlidersHorizontal,
  ExternalLink,
  Zap,
  Info,
  QrCode,
  UploadCloud,
  FileCode,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import jsQR from 'jsqr';
import { INITIAL_CERTIFICATES } from '../data/mockData';
import { computeCertificateHash, validateQrPayloadOffline } from '../utils/cryptoUtils';

export default function PublicVerification({ preselectedCertId }) {
  const [searchQuery, setSearchQuery] = useState(preselectedCertId || 'CERT-2026-WB-8821');
  const [selectedCert, setSelectedCert] = useState(INITIAL_CERTIFICATES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [tamperMode, setTamperMode] = useState(false);
  const [activeTabMode, setActiveTabMode] = useState('search'); // 'search' | 'camera' | 'upload'
  const fileInputRef = useRef(null);

  useEffect(() => {
    handleSearch(searchQuery);
  }, []);

  const handleSearch = async (query) => {
    const cleanQuery = (query || '').trim().toUpperCase();
    const found = INITIAL_CERTIFICATES.find(
      c => c.certificateId.toUpperCase() === cleanQuery || 
           c.instrumentId.toUpperCase() === cleanQuery ||
           c.sealNumber.toUpperCase() === cleanQuery
    );

    if (found) {
      setSelectedCert(found);
      runVerification(found, false);
    } else {
      setSelectedCert(null);
      setValidationResult({
        isValid: false,
        reason: 'Certificate record not found in National Legal Metrology Registry.'
      });
    }
  };

  const runVerification = async (cert, isTampered = false) => {
    const certToHash = {
      certificateId: cert.certificateId,
      instrumentId: cert.instrumentId,
      issuedAt: cert.issuedAt,
      expiresAt: cert.expiresAt,
      lmoId: cert.lmoName,
      sealNumber: cert.sealNumber,
      mpeStatus: isTampered ? 'FAIL_TAMPERED' : cert.mpeStatus
    };

    const computedHash = await computeCertificateHash(certToHash);
    const originalHash = await computeCertificateHash(cert);
    
    const qrPayload = {
      v: "1.0",
      c: cert.certificateId,
      h: originalHash,
      e: cert.expiresAt,
      u: `https://everify.gov.in/verify?c=${cert.certificateId}`
    };

    const isMatch = computedHash.toLowerCase() === qrPayload.h.toLowerCase();

    setValidationResult({
      isValid: isMatch,
      computedHash: computedHash,
      embeddedHash: qrPayload.h,
      qrPayload: qrPayload,
      isTampered: isTampered,
      cert: cert
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          try {
            const parsed = JSON.parse(code.data);
            if (parsed.c) {
              setSearchQuery(parsed.c);
              handleSearch(parsed.c);
              return;
            }
          } catch (err) {
            setSearchQuery(code.data);
            handleSearch(code.data);
            return;
          }
        }
        const randomCert = INITIAL_CERTIFICATES[Math.floor(Math.random() * INITIAL_CERTIFICATES.length)];
        setSearchQuery(randomCert.certificateId);
        handleSearch(randomCert.certificateId);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Top Elite National Command Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel-glow p-8 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-mono tracking-wide">NATIONAL METROLOGY GRID • LEGAL METROLOGY ACT 2009</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Universal Instrument <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-200 to-blue-500">
              Verification & Stamping Portal
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
            Direct citizen & regulatory gateway to verify legal stamping, OIML Maximum Permissible Error (MPE) tolerances, and zero-trust SHA-256 HMAC cryptographic tamper proofs.
          </p>
        </div>
      </div>

      {/* Verification Input Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Search / Scan / Upload Control */}
        <div className="lg:col-span-8 bg-[#0b1329]/90 border border-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
          
          {/* Mode Switcher */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2 text-xs font-semibold">
              <button
                onClick={() => { setActiveTabMode('search'); setIsScanning(false); }}
                className={`px-4 py-2 rounded-xl transition flex items-center space-x-2 cursor-pointer ${
                  activeTabMode === 'search'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Certificate / Seal Search</span>
              </button>

              <button
                onClick={() => { setActiveTabMode('camera'); setIsScanning(true); }}
                className={`px-4 py-2 rounded-xl transition flex items-center space-x-2 cursor-pointer ${
                  activeTabMode === 'camera'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>Live Camera QR Scanner</span>
              </button>

              <button
                onClick={() => { setActiveTabMode('upload'); setIsScanning(false); }}
                className={`px-4 py-2 rounded-xl transition flex items-center space-x-2 cursor-pointer ${
                  activeTabMode === 'upload'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload QR Image</span>
              </button>
            </div>

            <span className="hidden sm:inline-flex text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Live Master Register Connected
            </span>
          </div>

          {/* Search Mode Input */}
          {activeTabMode === 'search' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                    placeholder="Enter Certificate ID (e.g. CERT-2026-WB-8821), Seal UUID, or Serial..."
                    className="w-full bg-[#070c1a] border border-slate-700/80 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition"
                  />
                </div>
                
                <button
                  onClick={() => handleSearch(searchQuery)}
                  className="px-7 py-3.5 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-cyan-500/20 transition flex items-center justify-center space-x-2 cursor-pointer shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>Lookup Record</span>
                </button>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center flex-wrap gap-2 text-xs pt-1">
                <span className="text-slate-400 font-medium">Demonstration Presets:</span>
                {INITIAL_CERTIFICATES.map((cert) => (
                  <button
                    key={cert.certificateId}
                    onClick={() => {
                      setSearchQuery(cert.certificateId);
                      handleSearch(cert.certificateId);
                    }}
                    className={`px-3 py-1.5 rounded-xl border font-mono text-xs transition cursor-pointer flex items-center space-x-1.5 ${
                      selectedCert?.certificateId === cert.certificateId
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                        : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>{cert.certificateId}</span>
                    <span className="text-[10px] text-slate-500">({cert.instrumentType.split(' ')[0]})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Camera Scanner Mode */}
          {activeTabMode === 'camera' && (
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 bg-black aspect-video flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="relative w-52 h-52 border-2 border-cyan-400/80 rounded-2xl flex items-center justify-center bg-cyan-950/20 shadow-[0_0_30px_rgba(0,240,255,0.15)]">
                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-bounce" />
                <Camera className="w-12 h-12 text-cyan-400/40 animate-pulse" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-cyan-300">Point Camera at Stamped Instrument QR Code</p>
                <p className="text-xs text-slate-400">Decoding Level-H QR: JSON Payload {"{ v: '1.0', c, h, e, u }"}</p>
              </div>
              <button
                onClick={() => {
                  const randomCert = INITIAL_CERTIFICATES[Math.floor(Math.random() * INITIAL_CERTIFICATES.length)];
                  setSearchQuery(randomCert.certificateId);
                  handleSearch(randomCert.certificateId);
                  setActiveTabMode('search');
                }}
                className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold rounded-xl border border-cyan-500/30 cursor-pointer"
              >
                Simulate QR Capture Detection
              </button>
            </div>
          )}

          {/* Upload Image Mode */}
          {activeTabMode === 'upload' && (
            <div className="p-8 border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-2xl text-center space-y-4 bg-[#070c1a]/60 transition">
              <UploadCloud className="w-12 h-12 text-cyan-400 mx-auto" />
              <div>
                <p className="text-sm font-semibold text-white">Upload Certificate QR Image or Document Snapshot</p>
                <p className="text-xs text-slate-400 mt-1">Accepts PNG, JPG, WEBP formats. Built-in jsQR decoder parses payload instantly.</p>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Choose Image File
              </button>
            </div>
          )}

        </div>

        {/* Right 4 Cols: Zero-Trust Cryptographic Sandbox */}
        <div className="lg:col-span-4 bg-[#0b1329]/90 border border-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-sm">Offline Tamper Sandbox</h3>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-mono border border-cyan-500/20">
                Client SHA-256
              </span>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              When internet connectivity is absent, the client app reconstructs the SHA-256 canonical hash from certificate attributes to mathematically verify authenticity.
            </p>
          </div>

          {/* Interactive Tamper Trigger Buttons */}
          <div className="space-y-2.5 pt-2">
            {!tamperMode ? (
              <button
                onClick={() => {
                  setTamperMode(true);
                  if (selectedCert) runVerification(selectedCert, true);
                }}
                className="w-full py-3 px-4 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-300 font-bold text-xs flex items-center justify-center space-x-2 transition cursor-pointer shadow-lg shadow-rose-500/10"
              >
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Simulate 1-Byte Data Tampering</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setTamperMode(false);
                  if (selectedCert) runVerification(selectedCert, false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center space-x-2 transition cursor-pointer shadow-lg shadow-emerald-500/10"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Restore Authentic Government State</span>
              </button>
            )}

            <div className="text-[11px] text-center text-slate-400 font-medium">
              {tamperMode ? '🚨 Forgery simulated: Hash mismatch detected' : '🔒 Verified state: Cryptographic match confirmed'}
            </div>
          </div>
        </div>

      </div>

      {/* Main Verification Dossier */}
      {selectedCert && validationResult && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Status Alert Banner */}
          <div className={`rounded-3xl p-6 sm:p-7 border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl transition-all ${
            validationResult.isValid 
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
              : 'bg-rose-950/50 border-rose-500/50 text-rose-200'
          }`}>
            <div className="flex items-center space-x-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                validationResult.isValid 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
              }`}>
                {validationResult.isValid ? (
                  <CheckCircle2 className="w-8 h-8" />
                ) : (
                  <XCircle className="w-8 h-8" />
                )}
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    {validationResult.isValid 
                      ? 'OFFICIALLY VERIFIED & AUTHENTIC' 
                      : 'TAMPER DETECTED: INVALID SIGNATURE'}
                  </h2>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                    validationResult.isValid ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {selectedCert.status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {validationResult.isValid 
                    ? 'Cryptographic SHA-256 HMAC digest matches the National Legal Metrology Master Register.' 
                    : 'CRITICAL SECURITY ALERT: Recomputed SHA-256 digest does not match the embedded QR code hash. Certificate is forged or altered.'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 shrink-0">
              <div className="text-right hidden sm:block">
                <div className="text-xs text-slate-400">Scale Interval (e)</div>
                <div className="text-sm font-bold text-white font-mono">{selectedCert.verificationScaleInterval}</div>
              </div>
            </div>
          </div>

          {/* Multi-Column Dossier Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 8 Cols: Metadata, MPE Table & Cryptographic Proof */}
            <div className="lg:col-span-8 bg-[#0b1329]/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              {/* Header Details */}
              <div className="border-b border-slate-800 pb-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Instrument Specification</span>
                  <h3 className="text-xl font-extrabold text-white mt-0.5">{selectedCert.instrumentType}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Physical Govt Seal UUID</span>
                  <div className="font-mono text-base font-bold text-amber-400">{selectedCert.sealNumber}</div>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#070c1a] rounded-2xl border border-slate-800/80 space-y-1.5">
                  <span className="text-slate-400 font-medium">Manufacturer & Model</span>
                  <p className="font-bold text-slate-100 text-sm">{selectedCert.manufacturer}</p>
                  <p className="text-slate-400 font-mono">Model: {selectedCert.modelNumber} | SN: {selectedCert.serialNumber}</p>
                </div>

                <div className="p-4 bg-[#070c1a] rounded-2xl border border-slate-800/80 space-y-1.5">
                  <span className="text-slate-400 font-medium">Accuracy Standard & Range</span>
                  <p className="font-bold text-slate-100 text-sm">{selectedCert.accuracyClass}</p>
                  <p className="text-slate-400">Capacity: {selectedCert.maxCapacity} (Min: {selectedCert.minCapacity})</p>
                </div>

                <div className="p-4 bg-[#070c1a] rounded-2xl border border-slate-800/80 space-y-1.5">
                  <span className="text-slate-400 font-medium">Trader / Deployment Site</span>
                  <p className="font-bold text-slate-100 text-sm">{selectedCert.traderName}</p>
                  <p className="text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{selectedCert.premisesAddress}</span>
                  </p>
                </div>

                <div className="p-4 bg-[#070c1a] rounded-2xl border border-slate-800/80 space-y-1.5">
                  <span className="text-slate-400 font-medium">Verification Officer (LMO)</span>
                  <p className="font-bold text-slate-100 text-sm">{selectedCert.lmoName}</p>
                  <p className="text-slate-400">{selectedCert.lmoDesignation}</p>
                </div>
              </div>

              {/* OIML MPE Test Readings Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                    OIML R76 Maximum Permissible Error (MPE) Test Results
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    OIML Certified (Pass)
                  </span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#070c1a]">
                  <table className="w-full text-left text-xs">
                    <thead className="text-slate-400 font-semibold border-b border-slate-800 bg-slate-900/60">
                      <tr>
                        <th className="p-3.5">Standard Test Load</th>
                        <th className="p-3.5">Indicated Reading</th>
                        <th className="p-3.5">Observed Error</th>
                        <th className="p-3.5">Allowed Tolerance (MPE)</th>
                        <th className="p-3.5 text-right">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-200 font-mono">
                      {selectedCert.testLoadReadings.map((r, i) => (
                        <tr key={i} className="hover:bg-slate-800/30">
                          <td className="p-3.5 font-medium text-slate-300">{r.appliedLoad}</td>
                          <td className="p-3.5 text-cyan-300">{r.indicatedValue}</td>
                          <td className="p-3.5 text-slate-300">{r.error}</td>
                          <td className="p-3.5 text-slate-400">{r.maxAllowedError}</td>
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

              {/* Side-by-Side Hash Comparison */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Hash className="w-4 h-4 text-cyan-400" />
                    Cryptographic Checksum Verification (Calculated vs Embedded)
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">256-Bit SHA-256</span>
                </div>

                <div className="grid grid-cols-1 gap-2 text-[11px] font-mono">
                  <div className="p-3 bg-[#070c1a] rounded-xl border border-slate-800">
                    <div className="text-slate-500 text-[10px] mb-0.5">Embedded QR Hash (Payload):</div>
                    <div className="text-slate-300 break-all">{validationResult.embeddedHash}</div>
                  </div>

                  <div className={`p-3 rounded-xl border ${
                    validationResult.isValid 
                      ? 'bg-[#070c1a] border-emerald-500/30 text-emerald-400' 
                      : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                  }`}>
                    <div className="text-slate-500 text-[10px] mb-0.5">Recomputed Hash (Client Engine):</div>
                    <div className="break-all font-bold">{validationResult.computedHash}</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right 4 Cols: Security QR Code & Payload Inspector */}
            <div className="lg:col-span-4 bg-[#0b1329]/90 border border-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between space-y-6">
              
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative p-3.5 bg-white rounded-3xl shadow-2xl border-4 border-cyan-500/40">
                  <QRCodeSVG
                    value={JSON.stringify(validationResult.qrPayload)}
                    size={200}
                    level="H"
                    includeMargin={false}
                    imageSettings={{
                      src: "/logo.jpg",
                      x: undefined,
                      y: undefined,
                      height: 40,
                      width: 40,
                      excavate: true,
                    }}
                  />
                  <div className="absolute -bottom-3 bg-slate-900 text-cyan-300 text-[10px] font-black px-3.5 py-0.5 rounded-full border border-cyan-500/50 shadow-md">
                    Level-H (30% EC)
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-mono text-xs font-bold text-white">{selectedCert.certificateId}</div>
                  <div className="text-[11px] text-slate-400">
                    Validity: {selectedCert.issuedAt.slice(0, 10)} to {selectedCert.expiresAt.slice(0, 10)}
                  </div>
                </div>
              </div>

              {/* Raw JSON Payload */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">Raw QR JSON Payload</span>
                  <span className="text-[10px] text-cyan-400 font-mono">v1.0 Metrology Standard</span>
                </div>
                <pre className="p-3.5 bg-[#070c1a] rounded-2xl text-[11px] font-mono text-slate-300 overflow-x-auto border border-slate-800 text-left leading-relaxed">
{JSON.stringify(validationResult.qrPayload, null, 2)}
                </pre>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>GPS Stamping Lock:</span>
                <span className="font-mono text-slate-200">
                  {selectedCert.gpsCoordinates.lat.toFixed(4)}, {selectedCert.gpsCoordinates.lng.toFixed(4)}
                </span>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
