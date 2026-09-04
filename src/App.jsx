import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PublicVerification from './components/PublicVerification';
import CertificateStudio from './components/CertificateStudio';
import LmoInspectorPortal from './components/LmoInspectorPortal';
import TraderDashboard from './components/TraderDashboard';
import AiAnomalyMonitor from './components/AiAnomalyMonitor';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('verify');
  const [selectedCertId, setSelectedCertId] = useState('CERT-2026-WB-8821');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (['verify', 'studio', 'lmo', 'trader', 'ai'].includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCertFromTrader = (certId) => {
    setSelectedCertId(certId);
    handleTabChange('verify');
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 bg-cyber-grid">
      
      {/* Official Top Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main Interactive Metrology Hub */}
      <main className="flex-1">
        {activeTab === 'verify' && (
          <PublicVerification preselectedCertId={selectedCertId} />
        )}

        {activeTab === 'studio' && (
          <CertificateStudio />
        )}

        {activeTab === 'lmo' && (
          <LmoInspectorPortal onCertificateIssued={() => handleTabChange('verify')} />
        )}

        {activeTab === 'trader' && (
          <TraderDashboard onSelectCert={handleSelectCertFromTrader} />
        )}

        {activeTab === 'ai' && (
          <AiAnomalyMonitor />
        )}
      </main>

      {/* Official Legal Metrology Footer */}
      <Footer setActiveTab={handleTabChange} />

    </div>
  );
}
