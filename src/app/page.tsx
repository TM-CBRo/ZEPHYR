"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

// --- COMPONENTA: Logo ZephyrSec (Scutul Fragmentat) ---
const ZephyrLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Fragment Stânga Sus */}
    <path d="M 20 40 L 45 30 L 45 60 Z" fill="#3B82F6" opacity="0.6" />

    {/* Fragment Dreapta - Partea principală */}
    <path d="M 55 25 L 80 35 L 80 50 Q 80 75 55 90 L 55 55 Z" fill="#06B6D4" />

    {/* Punct de ancoră / Procesor */}
    <rect x="20" y="65" width="15" height="15" rx="4" fill="#F8FAFC" />
  </svg>
);

/* ========================================= */
/* COMPONENTA 1: Scanner Animation (Optimized)*/
/* ========================================= */
const ScannerAnimation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Definim timpi diferiți (în milisecunde) pentru fiecare stare
    let delay = 2000;

    if (step === 0) delay = 500; // Boot-up rapid: Dispariție aproape instantă
    if (step === 1) delay = 1800; // Scanează
    if (step === 2) delay = 2500; // Calculează Levenshtein
    if (step === 3) delay = 4000; // Păstrează rezultatul pe ecran ca să poată fi citit

    const timer = setTimeout(() => {
      setStep((prev) => (prev + 1) % 4);
    }, delay);

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="bg-[#040914] border border-slate-800/60 rounded-2xl p-6 font-mono text-[13px] md:text-sm text-slate-400 h-64 flex flex-col justify-center relative shadow-2xl overflow-hidden">
      <div className="absolute top-4 right-5 flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${step === 3 ? "bg-rose-500 animate-pulse shadow-[0_0_10px_#F43F5E]" : "bg-cyan-500 animate-pulse shadow-[0_0_10px_#06B6D4]"}`}
        ></span>
      </div>

      {step === 0 && (
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 text-lg animate-pulse">_</span>
          <span className="text-slate-500">Awaiting stream...</span>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-2 opacity-90 transition-opacity">
          <div className="text-slate-500">Scanning incoming email nodes...</div>
          <div className="bg-slate-900/50 p-2 rounded border border-slate-800 break-all">
            <span className="text-pink-500">&lt;a</span>{" "}
            <span className="text-green-400">href</span>=
            <span className="text-yellow-300">"https://paypa1.com/update"</span>
            <span className="text-pink-500">&gt;</span>
            <br />
            <span className="ml-2 md:ml-4 text-slate-300">
              Update your PayPal account
            </span>
            <br />
            <span className="text-pink-500">&lt;/a&gt;</span>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-2">
          <div className="text-cyan-400">
            Initializing Levenshtein validation...
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-1">
            <span className="text-slate-500">Visual Anchor:</span>
            <span className="text-slate-300">"PayPal"</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Resolved Target:</span>
            <span className="text-slate-300">"paypa1.com"</span>
          </div>
          <div className="text-yellow-500 mt-3 font-medium flex items-start md:items-center gap-2">
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5 md:mt-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Deviation Exceeds Threshold (85%)</span>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="border-l-4 border-rose-500 pl-4 py-2 bg-rose-500/10 -ml-2 rounded-r-xl">
          <div className="text-rose-400 font-bold uppercase tracking-widest mb-1 text-xs">
            Action: Neutralized
          </div>
          <div className="text-slate-300">
            Malicious link stripped. Warning banner injected into Gmail UI.
          </div>
        </div>
      )}
    </div>
  );
};

/* ========================================= */
/* COMPONENTA 2: FAQ Accordion               */
/* ========================================= */
const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className="text-base md:text-lg font-medium text-slate-200 group-hover:text-cyan-400 transition-colors pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            className="w-5 h-5 text-slate-500 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-400 leading-relaxed text-sm md:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ========================================= */
/* PAGINA PRINCIPALĂ                         */
/* ========================================= */
export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Animații Generale Pagina
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Animații Menu "Apple Style"
  const menuContainerVars: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const menuItemVars: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
  };

  // Animație individuală pentru fiecare pas (Apple Style)
  const individualStepVars: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      filter: "blur(15px)",
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1], // Curba de viteză specifică Apple
      },
    },
  };

  // Scroll Lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background Ambiental */}
      <div className="absolute top-0 left-0 right-0 h-[80vh] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-b from-cyan-900/15 to-transparent blur-[120px] rounded-full"></div>
      </div>

      {/* NAVBAR */}
      {/* Dacă meniul e deschis, Navbar-ul devine transparent pentru o imersiune totală a ecranului */}
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${isMobileMenuOpen ? "bg-transparent border-transparent" : "border-b border-slate-800/40 bg-[#020617]/80 backdrop-blur-xl"}`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group z-[60]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <ZephyrLogo className="w-9 h-9 md:w-10 md:h-10 transition-transform duration-500 group-hover:scale-110" />
            <span className="font-extrabold text-xl md:text-2xl tracking-tight text-white">
              ZephyrSec
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-400">
            <Link
              href="/architecture"
              className="hover:text-cyan-400 transition-colors"
            >
              Arhitectură
            </Link>
            <Link
              href="/privacy"
              className="hover:text-cyan-400 transition-colors"
            >
              Privacy & GDPR
            </Link>
            <button className="text-sm font-semibold px-6 py-2.5 rounded-full bg-slate-100 text-slate-900 hover:bg-white transition-colors">
              Install Add-on
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex items-center justify-center p-2 text-slate-300 hover:text-white z-[60] transition-transform duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 7h16M4 12h16M4 17h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* APPLE-STYLE MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(32px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#020617]/80 flex flex-col justify-center px-8 md:hidden"
          >
            <motion.div
              variants={menuContainerVars}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-start gap-8"
            >
              <motion.div variants={menuItemVars}>
                <Link
                  href="/architecture"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-semibold tracking-tight text-slate-100 hover:text-cyan-400 transition-colors"
                >
                  Arhitectură
                </Link>
              </motion.div>

              <motion.div variants={menuItemVars}>
                <Link
                  href="/privacy"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-semibold tracking-tight text-slate-100 hover:text-cyan-400 transition-colors"
                >
                  Privacy & GDPR
                </Link>
              </motion.div>

              {/* Elegant Divider */}
              <motion.div
                variants={menuItemVars}
                className="w-12 h-[1px] bg-slate-700/50 my-2"
              />

              <motion.div variants={menuItemVars}>
                <button className="text-2xl font-medium tracking-tight text-cyan-400 flex items-center gap-3">
                  Install Add-on
                  <span className="text-[11px] uppercase tracking-wider font-bold border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 rounded-full">
                    Free
                  </span>
                </button>
              </motion.div>

              {/* Sub-links */}
              <motion.div
                variants={menuItemVars}
                className="flex gap-6 mt-6 text-sm font-medium text-slate-500"
              >
                <Link
                  href="#"
                  className="hover:text-slate-300 transition-colors"
                >
                  GitHub
                </Link>
                <Link
                  href="#"
                  className="hover:text-slate-300 transition-colors"
                >
                  Documentation
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <section className="relative z-10 pt-40 pb-20 md:pt-48 md:pb-32 px-4 md:px-6 max-w-5xl mx-auto text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl md:text-8xl font-extrabold tracking-tight mb-6 md:mb-8 text-white leading-[1.2] md:leading-[1.25]"
        >
          Securitate absolută.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Eficiență maximă.
          </span>
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-2xl text-slate-400 mb-10 md:mb-12 font-light leading-relaxed max-w-3xl mx-auto"
        >
          Analiză criptografică avansată. Detecție zero-day instantanee.
          Intimitate garantată prin design. ZephyrSec transformă cel mai complex
          scut cibernetic într-o experiență invizibilă, direct în Google
          Workspace.
        </motion.p>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4 md:gap-5"
        >
          <button className="px-8 py-4 rounded-xl md:rounded-full bg-cyan-500 text-slate-950 font-bold text-lg hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.25)]">
            Adaugă în Workspace
          </button>
          <Link
            href="/architecture"
            className="px-8 py-4 rounded-xl md:rounded-full border border-slate-700 bg-slate-800/30 hover:bg-slate-800 transition-colors font-medium text-lg text-slate-200"
          >
            Descoperă Tehnologia
          </Link>
        </motion.div>
      </section>

      {/* 2. THE PROBLEM */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUp}
        className="relative z-10 py-16 md:py-24 px-4 md:px-6 max-w-6xl mx-auto border-t border-slate-800/50"
      >
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-100 tracking-tight">
              Problema cu <i>"Click aici"</i>.
            </h2>
            <p className="text-base md:text-lg text-slate-400 mb-6 leading-relaxed">
              Filtrele clasice de spam ratează atacurile de tip{" "}
              <strong>Typosquatting</strong>. Un hacker nu va folosi un link
              evident malițios. Va scrie <i>"PayPal"</i> pe ecran, dar te va
              trimite către <i>"paypa1.com"</i>.
            </p>
            <p className="text-base md:text-lg text-slate-400 mb-8 leading-relaxed">
              Motorul nostru de detecție vizuală calculează distanța Levenshtein
              dinamică între textul ancorat și destinația reală. Discrepanțele
              majore sunt izolate instant.
            </p>
            <Link
              href="/architecture"
              className="text-cyan-400 font-medium hover:text-cyan-300 flex items-center gap-2 group w-fit"
            >
              Detalii despre algoritm{" "}
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
          <div className="lg:w-1/2 w-full">
            <ScannerAnimation />
          </div>
        </div>
      </motion.section>

      {/* 3. 3-COLUMN FEATURES */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUp}
        className="py-16 md:py-24 px-4 md:px-6 bg-[#040914] border-y border-slate-800/50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Ce verifică ZephyrSec
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              Analiză multi-strat efectuată automat în fundalul instanței tale
              de Gmail.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-[#020617] border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-cyan-500/50 transition-colors">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-4">
                Email Header Analysis
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-0.5">✓</span> Validare SPF
                  (Sender Policy)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-0.5">✓</span> Verificare
                  semnături DKIM
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-0.5">✓</span> Aliniere
                  politici DMARC
                </li>
              </ul>
            </div>
            <div className="bg-[#020617] border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-4">
                Link & OSINT Scanning
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-0.5">✓</span> Analiză
                  Levenshtein
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-0.5">✓</span> Verificare
                  Typosquatting
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-0.5">✓</span> Interogări API
                  în baze HIBP
                </li>
              </ul>
            </div>
            <div className="bg-[#020617] border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-purple-500/50 transition-colors">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-6">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-4">
                Local Zero-Day Defense
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-0.5">✓</span> Hashing
                  local (SHA-256)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-0.5">✓</span> Detecție
                  extensii duble ascunse
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-0.5">✓</span> Privacy by
                  Design
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. HOW IT WORKS - Scroll Individual Trigger */}
      <section className="py-24 md:py-40 px-4 md:px-6 max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          className="text-center mb-20 md:mb-32"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            3 Pași către un inbox protejat
          </h2>
          <p className="text-lg text-slate-400">
            Fără configurări complexe, integrat nativ în mediul tău de lucru.
          </p>
        </motion.div>

        <div className="space-y-24 md:space-y-40">
          {" "}
          {/* Am mărit spațiul între pași pentru a evidenția scroll-ul */}
          {/* PASUL 1 */}
          <motion.div
            variants={individualStepVars}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Trigger când 30% din pas e vizibil
            className="flex flex-col md:flex-row gap-8 md:gap-12 items-start group"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-3xl border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)] group-hover:bg-cyan-500/20 transition-all duration-700">
              1
            </div>
            <div className="pt-2">
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                Instalezi Add-on-ul în Workspace
              </h3>
              <p className="text-slate-400 leading-relaxed text-lg md:text-xl font-light">
                Adaugă extensia direct din marketplace. ZephyrSec se integrează
                perfect în interfața web Gmail, nefiind necesară instalarea de
                software adițional pe dispozitiv.
              </p>
            </div>
          </motion.div>
          {/* PASUL 2 */}
          <motion.div
            variants={individualStepVars}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col md:flex-row gap-8 md:gap-12 items-start group"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-3xl border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)] group-hover:bg-blue-500/20 transition-all duration-700">
              2
            </div>
            <div className="pt-2">
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                Motorul scanează invizibil
              </h3>
              <p className="text-slate-400 leading-relaxed text-lg md:text-xl font-light">
                La deschiderea oricărui email, rulăm algoritmii de verificare a
                headerelor și a link-urilor. Logurile de securitate sunt stocate
                temporar în Firestore cu un TTL strict de 30 de zile.
              </p>
            </div>
          </motion.div>
          {/* PASUL 3 */}
          <motion.div
            variants={individualStepVars}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col md:flex-row gap-8 md:gap-12 items-start group"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-3xl border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)] group-hover:bg-emerald-500/20 transition-all duration-700">
              3
            </div>
            <div className="pt-2">
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                Acționezi cu încredere
              </h3>
              <p className="text-slate-400 leading-relaxed text-lg md:text-xl font-light">
                Dacă un email pică testul de Trust Score sau conține o
                amenințare, injectăm vizual un banner de avertizare direct în
                email, blocând interacțiunea accidentală.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUp}
        className="py-16 md:py-24 px-4 md:px-6 bg-[#040914] border-t border-slate-800/50"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Întrebări Frecvente
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              Tot ce trebuie să știi despre arhitectură și privacy.
            </p>
          </div>
          <div className="border-t border-slate-800">
            <FAQItem
              question="Îmi stocați sau îmi citiți emailurile personale?"
              answer="Nu. ZephyrSec aplică principiul Privacy by Design. Nu stocăm conținutul (body-ul) emailurilor. Extragem doar headerele tehnice (SPF/DKIM) și link-urile. Metadatele scanărilor sunt trimise către Firestore doar pentru analiză și sunt șterse ireversibil după 30 de zile."
            />
            <FAQItem
              question="Ce se întâmplă cu fișierele atașate (Zero-Day defense)?"
              answer="Analiza atașamentelor se face strict local. Generăm un hash SHA-256 direct în instanța ta de browser și interogăm baze de date cu malware cunoscute folosind doar acea amprentă matematică. Fișierul tău fizic nu părăsește niciodată dispozitivul."
            />
            <FAQItem
              question="ZephyrSec funcționează și pe telefonul mobil?"
              answer="Da. ZephyrSec este pe deplin compatibil cu dispozitivele mobile și poate fi utilizat fără restricții pe telefon sau tabletă. Platforma oferă aceeași experiență de securitate și protecție indiferent de dispozitivul folosit, astfel încât utilizatorii beneficiază de monitorizare și funcționalități complete atât pe desktop, cât și pe mobil."
            />
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/50 bg-[#020617]">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-12 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm text-center md:text-left">
          <p>© 2026 ZephyrSec. Proiect de Licență - Securitate Cibernetică.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">
              GitHub Repository
            </a>
            <Link
              href="/privacy"
              className="hover:text-slate-300 transition-colors"
            >
              Politica de Confidențialitate
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
