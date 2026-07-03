import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white relative selection:bg-cyan-500/30">
      
      {/* ========================================= */}
      {/* FUNDAL CSS ULTRA-OPTIMIZAT (Fără Three.js) */}
      {/* ========================================= */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        {/* Grid-ul subtil */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {/* Pata de lumină (Glow) centrală */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full"></div>
      </div>

      {/* ========================================= */}
      {/* NAVBAR */}
      {/* ========================================= */}
      <nav className="fixed w-full top-0 z-50 border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              Z
            </div>
            <span className="font-medium text-lg tracking-wide">Zephyr</span>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">Platform</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Architecture</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Compliance</a>
          </div>

          <button className="text-sm font-medium px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors">
            Install Add-on
          </button>
        </div>
      </nav>

      {/* ========================================= */}
      {/* HERO SECTION */}
      {/* ========================================= */}
      <section className="relative z-10 pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-8">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          Gmail Security Redefined
        </div>

        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 max-w-4xl">
          Invisible Security. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            Complete Protection.
          </span>
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed">
          AI-powered phishing protection inside your Gmail inbox, before you click. We process threats locally, not your private data.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            Add to Gmail — Free
          </button>
          <button className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors font-medium text-white">
            View GitHub Repo
          </button>
        </div>
      </section>

      {/* ========================================= */}
      {/* BENTO BOX GRID (Arhitectura)              */}
      {/* ========================================= */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        
        {/* Grid-ul Bento: 3 coloane pe ecrane mari, 1 pe mobil */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Visual Deception (Span 2 coloane - Cel mai important) */}
          <div className="md:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:border-cyan-500/30 transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl rounded-full"></div>
            <h3 className="text-xl font-medium mb-2 text-white">Visual Deception Engine</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-md">
              Prinde atacurile Typosquatting folosind distanța Levenshtein dinamică și analizează discrepanța dintre textul ancorat și destinația reală.
            </p>
            {/* Vizualizare tehnică (Mockup cod) */}
            <div className="bg-black/50 border border-white/5 rounded-lg p-4 font-mono text-xs text-gray-300">
              <div className="flex gap-2 mb-2">
                <span className="text-red-400">Threat Detected:</span> Brand Mismatch
              </div>
              <div className="text-gray-500">
                &lt;a href="<span className="text-red-400">https://paypa1.com/login</span>"&gt;
                <span className="text-white">Conectați-vă la PayPal</span>
                &lt;/a&gt;
              </div>
            </div>
          </div>

          {/* Card 2: Zero-Day (Span 1 coloană) */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:border-blue-500/30 transition-all">
            <h3 className="text-xl font-medium mb-2 text-white">Zero-Day Defense</h3>
            <p className="text-gray-400 text-sm mb-6">
              Analiză avansată pentru extensii duble (ex: factura.pdf.exe). Hashează atașamentele local (SHA-256) pentru a asigura Privacy by Design.
            </p>
            <div className="font-mono text-xs text-blue-400 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 break-all">
              e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
            </div>
          </div>

          {/* Card 3: OSINT & Compliance (Span 1 coloană) */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:border-emerald-500/30 transition-all">
            <h3 className="text-xl font-medium mb-2 text-white">GDPR & OSINT</h3>
            <p className="text-gray-400 text-sm">
              Verificare identitate în baze de date de breach-uri via API anonimizat. Jurnalizarea Firestore are un TTL strict de 30 de zile cu auto-ștergere, respectând "Right to Erasure".
            </p>
          </div>

          {/* Card 4: Crypto Headers (Span 2 coloane) */}
          <div className="md:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 flex flex-col justify-between hover:border-purple-500/30 transition-all relative overflow-hidden">
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-3xl rounded-full"></div>
            <div>
              <h3 className="text-xl font-medium mb-2 text-white">Cryptographic Authentication</h3>
              <p className="text-gray-400 text-sm max-w-lg">
                Parsare inteligentă a headerelor brute MIME. Validare automată a semnăturilor SPF, DKIM și DMARC pentru a expune instantaneu atacurile de tip Spoofing.
              </p>
            </div>
            {/* Vizualizare mini-status */}
            <div className="flex gap-4 mt-6">
              <div className="bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono px-3 py-1 rounded-full">SPF=pass</div>
              <div className="bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono px-3 py-1 rounded-full">DKIM=pass</div>
              <div className="bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono px-3 py-1 rounded-full">DMARC=pass</div>
            </div>
          </div>

        </div>
      </section>
      
    </main>
  );
}