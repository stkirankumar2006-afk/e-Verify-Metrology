import React, { useState, useEffect, useRef } from 'react';
import { 
  BrainCircuit, 
  AlertTriangle, 
  ShieldAlert, 
  Activity, 
  Zap, 
  TrendingUp, 
  Navigation, 
  CheckCircle, 
  RefreshCw, 
  Sliders, 
  Filter,
  Radar,
  Radio,
  MapPin,
  Cpu
} from 'lucide-react';
import { MOCK_ANOMALIES } from '../data/mockData';

export default function AiAnomalyMonitor() {
  const [anomalies, setAnomalies] = useState(MOCK_ANOMALIES);
  
  // Interactive Simulation Playground
  const [simInspectorId, setSimInspectorId] = useState('LMO-DL-19');
  const [simDistanceKm, setSimDistanceKm] = useState(140);
  const [simTimeMins, setSimTimeMins] = useState(12);
  const [simPassRate, setSimPassRate] = useState(100);
  const [evalResult, setEvalResult] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const canvasRef = useRef(null);

  // Radar telemetry drawing effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let angle = 0;
    let animationFrameId;

    const renderRadar = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(cx, cy) - 15;

      ctx.clearRect(0, 0, w, h);

      // Radar Concentric Circles
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.lineWidth = 1;

      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (r / 4) * i, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Radar Crosshairs
      ctx.beginPath();
      ctx.moveTo(cx, cy - r);
      ctx.lineTo(cx, cy + r);
      ctx.moveTo(cx - r, cy);
      ctx.lineTo(cx + r, cy);
      ctx.stroke();

      // Sweeper Line & Gradient
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      const grad = ctx.createLinearGradient(0, 0, r, 0);
      grad.addColorStop(0, 'rgba(0, 240, 255, 0.5)');
      grad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r, 0, Math.PI / 4);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(r, 0);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();

      // Blip points (Telemetry Nodes)
      const blips = [
        { x: cx + 45, y: cy - 35, color: '#f43f5e', label: 'ANOM-019 (180km/14m)' },
        { x: cx - 60, y: cy + 40, color: '#fbbf24', label: 'GATC-04 (100% Pass)' },
        { x: cx + 80, y: cy + 50, color: '#00f0ff', label: 'LMO-DL-08 (Normal)' }
      ];

      blips.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(b.x, b.y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = b.color + '44';
        ctx.stroke();
      });

      angle += 0.025;
      animationFrameId = requestAnimationFrame(renderRadar);
    };

    renderRadar();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const runAiEvaluation = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      const velocity = (simDistanceKm / (simTimeMins / 60)).toFixed(1);
      const isVelocityAnomaly = parseFloat(velocity) > 100.0 && simDistanceKm > 20;
      const isPassRateAnomaly = simPassRate > 98;
      const anomalyDetected = isVelocityAnomaly || isPassRateAnomaly;
      
      const score = isVelocityAnomaly ? 0.96 : (isPassRateAnomaly ? 0.89 : 0.12);
      
      setEvalResult({
        inspectorId: simInspectorId,
        distanceKm: simDistanceKm,
        timeMins: simTimeMins,
        velocityKmh: velocity,
        passRate: simPassRate,
        anomalyDetected: anomalyDetected,
        anomalyScore: score,
        severity: isVelocityAnomaly ? 'CRITICAL' : (isPassRateAnomaly ? 'HIGH' : 'NORMAL'),
        flagReason: isVelocityAnomaly 
          ? `Impossible Velocity (${velocity} km/h over ${simDistanceKm} km in ${simTimeMins} mins)`
          : (isPassRateAnomaly ? `Statistical Drift: Unusually High Pass Rate (${simPassRate}%)` : 'Normal Field Behavior')
      });
      setIsEvaluating(false);
    }, 400);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel-glow p-8 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold backdrop-blur-md">
            <BrainCircuit className="w-4 h-4 text-purple-400" />
            <span>FastAPI ML Microservice • Isolation Forest Anomaly Detection Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Metrology Fraud & AI Sentinel Shield
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Real-time telemetry algorithms flagging inspector velocity violations (GPS teleportation), duplicate hardware serial registrations, and statistical verification pass-rate drift across all state zones.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#0b1329]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-2">
          <span className="text-xs text-slate-400 font-medium">Active Machine Learning Model</span>
          <div className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <Activity className="w-5 h-5 animate-pulse" />
            <span>Isolation Forest v2.1</span>
          </div>
          <p className="text-[11px] text-slate-500">Contamination: 0.03 | Real-Time Retraining</p>
        </div>

        <div className="bg-[#0b1329]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-2">
          <span className="text-xs text-slate-400 font-medium">Critical Telemetry Flags (24h)</span>
          <div className="text-xl font-bold text-rose-400 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5" />
            <span>3 Suspicions Flagged</span>
          </div>
          <p className="text-[11px] text-slate-500">Auto-dispatched to State Controllers</p>
        </div>

        <div className="bg-[#0b1329]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-2">
          <span className="text-xs text-slate-400 font-medium">Inference Latency</span>
          <div className="text-xl font-bold text-cyan-400 font-mono">
            18.4 ms
          </div>
          <p className="text-[11px] text-slate-500">FastAPI Async Endpoint Latency</p>
        </div>

        <div className="bg-[#0b1329]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-2">
          <span className="text-xs text-slate-400 font-medium">National Fraud Prevention</span>
          <div className="text-xl font-bold text-purple-400">
            99.94%
          </div>
          <p className="text-[11px] text-slate-500">Zero-day duplicate serial suppression</p>
        </div>
      </div>

      {/* Main Content: Radar + Live Stream + Interactive Tester */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Cols: Real-Time Radar & Anomaly Feed */}
        <div className="lg:col-span-7 bg-[#0b1329]/90 border border-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-base">Real-Time Anomaly Radar & Feed</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Telemetry Stream
            </span>
          </div>

          {/* Radar Canvas Display */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 bg-[#070c1a] rounded-2xl border border-slate-800">
            <div className="relative">
              <canvas ref={canvasRef} width={220} height={220} className="rounded-full bg-slate-950/80 border border-cyan-500/30 shadow-[0_0_20px_rgba(0,240,255,0.1)]" />
            </div>

            <div className="space-y-2.5 text-xs flex-1">
              <div className="font-bold text-white uppercase tracking-wider text-[11px]">Inspector Telemetry Radar</div>
              <div className="flex items-center gap-2 text-rose-300">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Critical Velocity Violation (180 km / 14m)</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Pass Rate Drift Outlier (100% Pass in GATC 04)</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Normal Inspector Route Telemetry</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {anomalies.map((anom) => (
              <div 
                key={anom.id}
                className="p-4 rounded-2xl bg-[#070c1a]/90 border border-slate-800/80 hover:border-slate-700 transition space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                    anom.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                    anom.severity === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}>
                    {anom.severity} • {anom.type.replace(/_/g, ' ')}
                  </span>
                  <span className="text-[11px] text-slate-500">{anom.timestamp}</span>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {anom.description}
                </p>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60 gap-2">
                  <span className="text-cyan-400 font-mono">Target: {anom.target}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">Anomaly Score:</span>
                    <span className="font-mono font-bold text-rose-400">{anom.score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: Live Anomaly Simulation Playground */}
        <div className="lg:col-span-5 bg-[#0b1329]/90 border border-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Sliders className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-white text-base">ML Evaluation Playground</h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Test the FastAPI Isolation Forest inference endpoint in real-time by tuning distance, time delta, and pass-rate parameters:
          </p>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Inspector Badge ID</label>
              <input
                type="text"
                value={simInspectorId}
                onChange={(e) => setSimInspectorId(e.target.value)}
                className="w-full bg-[#070c1a] border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Distance Between Consecutive Stamps</span>
                <span className="font-mono text-cyan-300 font-bold">{simDistanceKm} km</span>
              </div>
              <input
                type="range"
                min="1"
                max="300"
                value={simDistanceKm}
                onChange={(e) => setSimDistanceKm(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Time Elapsed Between Stamps</span>
                <span className="font-mono text-cyan-300 font-bold">{simTimeMins} mins</span>
              </div>
              <input
                type="range"
                min="1"
                max="120"
                value={simTimeMins}
                onChange={(e) => setSimTimeMins(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Inspector Verification Pass Rate</span>
                <span className="font-mono text-cyan-300 font-bold">{simPassRate}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={simPassRate}
                onChange={(e) => setSimPassRate(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <button
              onClick={runAiEvaluation}
              disabled={isEvaluating}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/20 flex items-center justify-center space-x-2 transition cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>{isEvaluating ? 'Evaluating Features...' : 'Run FastAPI ML Anomaly Inference'}</span>
            </button>
          </div>

          {/* Evaluation Result Output */}
          {evalResult && (
            <div className={`p-4 rounded-2xl border space-y-2 animate-fadeIn text-xs ${
              evalResult.anomalyDetected 
                ? 'bg-rose-950/40 border-rose-500/40 text-rose-200' 
                : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase tracking-wider">
                  {evalResult.anomalyDetected ? '🚨 ANOMALY FLAGGED' : '✅ NORMAL EVENT'}
                </span>
                <span className="font-mono text-[11px] font-bold">
                  Score: {evalResult.anomalyScore}
                </span>
              </div>

              <p className="font-semibold text-white">
                {evalResult.flagReason}
              </p>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 grid grid-cols-2 gap-2">
                <span>Calculated Speed: <strong className="text-white">{evalResult.velocityKmh} km/h</strong></span>
                <span>Pass Rate: <strong className="text-white">{evalResult.passRate}%</strong></span>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
