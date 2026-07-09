"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

// --- DATE MOCK PENTRU LIVE STREAM JSON ---
const PAYLOAD_SCENARIOS = [
  { spf: "pass", dkim: "pass", link: "https://paypal.com" },
  { spf: "fail", dkim: "fail", link: "http://update-cont-bancar.ro" },
  { spf: "softfail", dkim: "pass", link: "https://rnicrosoft.com/login" },
  { spf: "pass", dkim: "none", link: "https://amazon-support.net" },
  { spf: "pass", dkim: "pass", link: "https://github.com/password-reset" },
];

export default function PrivacyPage() {
  const [mounted, setMounted] = useState(false);
  const [days, setDays] = useState(0);
  const [isPurging, setIsPurging] = useState(false);
  const [payloadIdx, setPayloadIdx] = useState(0);

  // 1. Logica pentru TTL (Bara care se umple în 3 secunde)
  useEffect(() => {
    setMounted(true);
    let currentDay = 0;
    setIsPurging(false);

    const intervalId = setInterval(() => {
      currentDay += 1;
      setDays(currentDay);

      if (currentDay >= 30) {
        clearInterval(intervalId);
        setIsPurging(true);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  // 2. Logica pentru Live JSON Stream (Se schimbă la fiecare 3 secunde)
  useEffect(() => {
    const streamInterval = setInterval(() => {
      setPayloadIdx((prev) => (prev + 1) % PAYLOAD_SCENARIOS.length);
    }, 3000); // Se actualizează exact la 3000ms (3 secunde)

    return () => clearInterval(streamInterval);
  }, []);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-emerald-500/30 overflow-x-hidden pb-32">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-emerald-900/10 to-transparent blur-[120px] rounded-full"></div>
      </div>

      <nav className="relative z-50 border-b border-slate-800/40 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-sm text-slate-900 transition-transform group-hover:scale-105">
              Z
            </div>
            <span className="font-semibold text-lg tracking-tight text-slate-100">
              ZephyrSec
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Înapoi
          </Link>
        </div>
      </nav>

      <section className="relative z-10 pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            SOC2 & GDPR Aligned
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter mb-6 text-white">
            Privacy by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Design.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Securitatea cibernetică reală nu ar trebui să coste intimitatea
            utilizatorului. Am construit arhitectura în jurul principiului
            "Zero-Knowledge".
          </p>
        </motion.div>
      </section>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-6 max-w-4xl mx-auto space-y-12"
      >
        {/* Card 1: JSON Data Minimization (Live Stream) */}
        <motion.div
          variants={fadeUp}
          className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-8 md:p-12 backdrop-blur-sm overflow-hidden flex flex-col md:flex-row items-center gap-10"
        >
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-slate-100 mb-4 tracking-tight">
              1. Minimizarea Datelor Absolute
            </h3>
            <p className="text-slate-400 leading-relaxed mb-4">
              Conform <strong>Articolului 5(1)(c) din GDPR</strong>, procesăm
              doar datele strict necesare. Motorul nostru este „orb”
              intenționat. Extragem doar headerele și izolăm linkurile. Corpul
              emailului nu ajunge niciodată în server.
            </p>
          </div>

          {/* Cyber JSON Visualizer (Dinamic) */}
          <div className="w-full md:w-auto bg-[#020617] border border-slate-800 p-5 rounded-2xl font-mono text-[11px] md:text-xs text-left shadow-2xl flex-shrink-0">
            <div className="text-slate-500 mb-3 border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              // Intercepted Payload Stream
            </div>
            <div className="text-slate-300">{`{`}</div>
            <div className="pl-4 space-y-1">
              <div>
                <span className="text-emerald-400">"headers"</span>: {`{`}
              </div>
              <div className="pl-4 flex flex-col">
                <span>
                  <span className="text-slate-300">"spf": </span>
                  <motion.span
                    key={`spf-${payloadIdx}`}
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    className={`font-bold ${PAYLOAD_SCENARIOS[payloadIdx].spf === "pass" ? "text-cyan-300" : PAYLOAD_SCENARIOS[payloadIdx].spf === "fail" ? "text-rose-400" : "text-yellow-400"}`}
                  >
                    "{PAYLOAD_SCENARIOS[payloadIdx].spf}"
                  </motion.span>
                  ,
                </span>
                <span>
                  <span className="text-slate-300">"dkim": </span>
                  <motion.span
                    key={`dkim-${payloadIdx}`}
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    className={`font-bold ${PAYLOAD_SCENARIOS[payloadIdx].dkim === "pass" ? "text-cyan-300" : PAYLOAD_SCENARIOS[payloadIdx].dkim === "fail" ? "text-rose-400" : "text-yellow-400"}`}
                  >
                    "{PAYLOAD_SCENARIOS[payloadIdx].dkim}"
                  </motion.span>
                </span>
              </div>
              <div>{`},`}</div>
              <div className="flex flex-wrap">
                <span className="text-emerald-400 mr-2">
                  "extracted_links":
                </span>
                <span className="text-cyan-300 flex">
                  [
                  <motion.span
                    key={`link-${payloadIdx}`}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-cyan-300"
                  >
                    "{PAYLOAD_SCENARIOS[payloadIdx].link}"
                  </motion.span>
                  ],
                </span>
              </div>
              <div className="bg-rose-500/10 border border-rose-500/30 p-2 rounded mt-2">
                <span className="text-rose-500">"body_content"</span>:{" "}
                <span className="text-rose-400 font-bold px-1 rounded animate-pulse">
                  {"<REDACTED BY ZEPHYR>"}
                </span>
              </div>
            </div>
            <div className="text-slate-300">{`}`}</div>
          </div>
        </motion.div>

        {/* Card 2: Animație Bază de Date (TTL) */}
        <motion.div
          variants={fadeUp}
          className="bg-[#040914] border border-slate-800/60 rounded-3xl p-8 md:p-12 backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-slate-100 mb-4 tracking-tight">
                2. Dreptul de a fi uitat (Automat)
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                <strong>Articolul 17 GDPR.</strong> Baza noastră de date
                (Firestore) folosește o politică Time-To-Live (TTL) care
                distruge automat orice urmă a logurilor de securitate la exact
                30 de zile.
              </p>
            </div>

            <div className="w-full md:w-1/2 bg-[#020617] border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
              {isPurging && (
                <div className="absolute inset-0 bg-rose-500/20 z-0"></div>
              )}

              <div className="relative z-10 flex justify-between items-end mb-4">
                <span className="text-xs uppercase text-slate-500 font-bold tracking-wider">
                  Ciclu Retenție Date
                </span>
                <span
                  className={`text-xl font-mono font-bold ${isPurging ? "text-rose-500" : "text-emerald-400"}`}
                >
                  {isPurging ? "PURGED" : `Ziua ${days}`}
                </span>
              </div>

              <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden shadow-inner border border-slate-800 relative">
                <motion.div
                  animate={{
                    width: isPurging ? "100%" : `${(days / 30) * 100}%`,
                  }}
                  transition={{ duration: 0.1, ease: "linear" }}
                  className={`h-full rounded-full ${isPurging ? "bg-rose-500" : "bg-gradient-to-r from-emerald-500 to-cyan-400"}`}
                />
              </div>
              <p className="text-[10px] text-slate-500 text-center mt-4 font-mono uppercase tracking-widest">
                {isPurging
                  ? "Trigger TTL executat. Date șterse."
                  : "Acumulare metadate statistice..."}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
}
