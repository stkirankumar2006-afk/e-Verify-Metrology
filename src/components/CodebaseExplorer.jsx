import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  FileCode, 
  Layers, 
  Terminal, 
  Smartphone, 
  BrainCircuit, 
  Database, 
  FolderTree,
  ExternalLink,
  ShieldCheck,
  Download,
  Package,
  Sparkles,
  Archive
} from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { CODEBASE_SNIPPETS } from '../data/mockData';

export default function CodebaseExplorer() {
  const [activeFile, setActiveFile] = useState('certificateService');
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const files = [
    {
      id: 'certificateService',
      name: 'certificateService.ts',
      path: 'backend/src/services/certificateService.ts',
      icon: FileCode,
      language: 'typescript',
      category: 'Backend',
      code: CODEBASE_SNIPPETS.certificateService,
      description: 'SHA-256 canonical hashing, Level-H QR generation with Sharp emblem overlay, and PDFKit certificate generation.'
    },
    {
      id: 'prismaSchema',
      name: 'schema.prisma',
      path: 'backend/prisma/schema.prisma',
      icon: Database,
      language: 'prisma',
      category: 'Database',
      code: CODEBASE_SNIPPETS.prismaSchema,
      description: 'Full relational database schema with Users (RBAC), Instruments, Applications, Verifications, Certificates, and Anomaly Logs.'
    },
    {
      id: 'fastApiAiService',
      name: 'main.py',
      path: 'ai-service/main.py',
      icon: BrainCircuit,
      language: 'python',
      category: 'AI Microservice',
      code: CODEBASE_SNIPPETS.fastApiAiService,
      description: 'FastAPI microservice with Isolation Forest & Haversine distance for inspector velocity violation and pass-rate drift detection.'
    },
    {
      id: 'flutterOfflineValidator',
      name: 'offline_validator.dart',
      path: 'mobile/lib/services/offline_validator.dart',
      icon: Smartphone,
      language: 'dart',
      category: 'Flutter Mobile',
      code: CODEBASE_SNIPPETS.flutterOfflineValidator,
      description: 'Flutter offline validation engine computing client-side SHA-256 digest from embedded payload to detect tampering with 0 network calls.'
    },
    {
      id: 'dockerCompose',
      name: 'docker-compose.yml',
      path: 'docker-compose.yml',
      icon: Terminal,
      language: 'yaml',
      category: 'DevOps',
      code: CODEBASE_SNIPPETS.dockerCompose,
      description: 'Complete multi-container production setup: PostgreSQL, Redis, MinIO S3, Node.js Backend, FastAPI AI, and React Frontend.'
    }
  ];

  const currentSnippet = files.find(f => f.id === activeFile) || files[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Instant 1-Click ZIP Archive Generator
  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // Add backend files
      const backendFolder = zip.folder("backend");
      backendFolder.folder("prisma").file("schema.prisma", CODEBASE_SNIPPETS.prismaSchema);
      backendFolder.folder("src").folder("services").file("certificateService.ts", CODEBASE_SNIPPETS.certificateService);
      backendFolder.file("package.json", JSON.stringify({
        name: "everify-metrology-backend",
        version: "1.0.0",
        scripts: { "dev": "tsx watch src/server.ts", "build": "tsc" },
        dependencies: {
          "@prisma/client": "^5.10.0",
          "express": "^4.18.2",
          "jsonwebtoken": "^9.0.2",
          "bcrypt": "^5.1.1",
          "qrcode": "^1.5.3",
          "sharp": "^0.33.2",
          "pdfkit": "^0.14.0",
          "cors": "^2.8.5",
          "dotenv": "^16.4.5"
        }
      }, null, 2));

      // Add AI Microservice
      const aiFolder = zip.folder("ai-service");
      aiFolder.file("main.py", CODEBASE_SNIPPETS.fastApiAiService);
      aiFolder.file("requirements.txt", "fastapi>=0.109.0\nuvicorn>=0.27.0\nscikit-learn>=1.4.0\nnumpy>=1.26.0\npydantic>=2.6.0\n");

      // Add Flutter Mobile
      const mobileFolder = zip.folder("mobile");
      mobileFolder.folder("lib").folder("services").file("offline_validator.dart", CODEBASE_SNIPPETS.flutterOfflineValidator);
      mobileFolder.file("pubspec.yaml", `name: everify_metrology_mobile\ndescription: Flutter Offline Legal Metrology Scanner\nversion: 1.0.0+1\nenvironment:\n  sdk: '>=3.0.0 <4.0.0'\ndependencies:\n  flutter:\n    sdk: flutter\n  crypto: ^3.0.3\n  qr_code_scanner: ^1.0.1\n  hive: ^2.2.3\n  geolocator: ^10.1.0\n`);

      // Add Root Docker & README
      zip.file("docker-compose.yml", CODEBASE_SNIPPETS.dockerCompose);
      zip.file("README.md", `# e-Verify Metrology (SIH 26036) Production Codebase

National Online Verification System for Weighing and Measuring Instruments.

## Quick Start
1. Run \`docker-compose up --build\`
2. Backend runs at \`http://localhost:5000\`
3. AI Service runs at \`http://localhost:8000\`
4. Frontend runs at \`http://localhost:80\`
`);

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "everify-metrology-sih26036-complete.zip");
    } catch (e) {
      console.error(e);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel-glow p-8 sm:p-10 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Code2 className="w-3.5 h-3.5" />
              <span>Complete Copy-Pasteable Codebase Repository (SIH 26036)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Full System Architecture & Source Hub
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Explore the complete, production-ready stack: Node.js/Express + TypeScript backend, Prisma PostgreSQL schema, Flutter offline Hive validator, and FastAPI Isolation Forest ML service.
            </p>
          </div>

          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="px-6 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-emerald-500/25 flex items-center space-x-2.5 cursor-pointer shrink-0 transition"
          >
            <Archive className="w-5 h-5" />
            <span>{isZipping ? 'Bundling ZIP Package...' : 'Download Complete ZIP Archive'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 4 Cols: Explorer Tree */}
        <div className="lg:col-span-4 bg-[#0b1329]/90 border border-slate-800/90 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <FolderTree className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-white text-sm">Project Deliverables</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">5 Core Modules</span>
          </div>

          <div className="space-y-2">
            {files.map((file) => {
              const Icon = file.icon;
              const isActive = activeFile === file.id;
              return (
                <button
                  key={file.id}
                  onClick={() => setActiveFile(file.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition cursor-pointer flex flex-col space-y-1.5 ${
                    isActive
                      ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-lg shadow-cyan-500/10'
                      : 'bg-[#070c1a]/80 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span className="font-mono text-xs font-bold text-white">{file.name}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-slate-900 border border-slate-800 text-slate-400">
                      {file.category}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 truncate">{file.path}</span>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-[#070c1a] border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="font-bold text-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SIH Production Standards</span>
            </div>
            <ul className="space-y-1 list-disc list-inside text-[11px] text-slate-400">
              <li>High Error Correction (H) QR + Sharp overlay</li>
              <li>HMAC SHA-256 canonical hashing engine</li>
              <li>Flutter offline client hash reconstruction</li>
              <li>FastAPI ML isolation forest anomaly detector</li>
              <li>Prisma multi-tenant PostgreSQL schema</li>
            </ul>
          </div>
        </div>

        {/* Right 8 Cols: IDE Code Viewer */}
        <div className="lg:col-span-8 bg-[#0b1329]/90 border border-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm font-bold text-cyan-300">{currentSnippet.path}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 rounded text-slate-300 uppercase">
                  {currentSnippet.language}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{currentSnippet.description}</p>
            </div>

            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white text-xs font-bold rounded-xl shadow-md shadow-cyan-500/20 flex items-center space-x-1.5 cursor-pointer transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy File Content'}</span>
            </button>
          </div>

          {/* IDE Window */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#040711]">
            <pre className="p-4 sm:p-6 text-xs font-mono text-slate-200 overflow-x-auto max-h-[580px] overflow-y-auto leading-relaxed text-left">
              <code>{currentSnippet.code}</code>
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
}
