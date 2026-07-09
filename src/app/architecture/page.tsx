"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

// --- COMPONENTA: Efectul de Decriptare (Cyber Scramble) ---
const DecryptedText = ({
  text,
  isHighlighted,
}: {
  text: string;
  isHighlighted?: boolean;
}) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "!<>-_\\/[]{}—=+*^?#_";

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const scramble = () => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) return char;
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join(""),
        );

        if (iteration >= text.length) clearInterval(interval);
        // AM ACCELERAT AICI: Itrează prin caractere mai repede (0.5 în loc de 0.33)
        iteration += 0.5;
      }, 25); // AM SCĂZUT TIMPUL: Cadrele se succed la 25ms în loc de 30ms
    };

    setDisplayText(chars.slice(0, text.length));
    setTimeout(scramble, 100); // Pauză mult mai mică înainte să înceapă decriptarea

    return () => clearInterval(interval);
  }, [text]);

  if (isHighlighted) {
    return (
      <span className="text-rose-500 font-bold underline decoration-rose-500 decoration-2">
        {displayText}
      </span>
    );
  }
  return <span>{displayText}</span>;
};

// Date pentru sliderul Levenshtein
const TYPO_EXAMPLES = [
  {
    anchor: "paypal.com",
    threat: "paypa1.com",
    dist: 1,
    prefix: "paypa",
    bad: "1",
    suffix: ".com",
  },
  {
    anchor: "microsoft.com",
    threat: "rnicrosoft.com",
    dist: 2,
    prefix: "",
    bad: "rn",
    suffix: "icrosoft.com",
  },
  {
    anchor: "binance.com",
    threat: "biriance.com",
    dist: 2,
    prefix: "bi",
    bad: "ri",
    suffix: "ance.com",
  },
  {
    anchor: "google.com",
    threat: "g00gle.com",
    dist: 2,
    prefix: "g",
    bad: "00",
    suffix: "gle.com",
  },
  {
    anchor: "netflix.com",
    threat: "netfIix.com",
    dist: 1,
    prefix: "netf",
    bad: "I",
    suffix: "ix.com",
  },
];

export default function ArchitecturePage() {
  const [mounted, setMounted] = useState(false);
  const [score, setScore] = useState(0);
  const [hash, setHash] = useState("");
  const [typoIdx, setTypoIdx] = useState(0);

  useEffect(() => {
    setMounted(true);
    const randomScore = Math.floor(Math.random() * 69) + 30;

    let current = 0;
    const timer = setInterval(() => {
      current += 2;
      if (current >= randomScore) {
        setScore(randomScore);
        clearInterval(timer);
      } else {
        setScore(current);
      }
    }, 20);

    const chars = "0123456789abcdef";
    let randomHash = "";
    for (let i = 0; i < 64; i++)
      randomHash += chars[Math.floor(Math.random() * chars.length)];
    setHash(randomHash);

    // Rotatie la fiecare 5 secunde pentru Levenshtein
    const typoInterval = setInterval(() => {
      setTypoIdx((prev) => (prev + 1) % TYPO_EXAMPLES.length);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(typoInterval);
    };
  }, []);

  const isSafe = score >= 80;
  const isModerate = score >= 50 && score < 80;
  const scoreColor = isSafe
    ? "text-cyan-400"
    : isModerate
      ? "text-yellow-400"
      : "text-rose-500";
  const strokeDashoffset =
    2 * Math.PI * 42 - (score / 100) * (2 * Math.PI * 42);

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
    <main className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden pb-32">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-blue-900/15 to-transparent blur-[150px] rounded-full"></div>
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
            className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
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
            Înapoi la meniu
          </Link>
        </div>
      </nav>

      <section className="relative z-10 pt-32 pb-20 px-6 max-w-5xl mx-auto text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter mb-6 text-white">
            Anatomia unui <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Scut Digital.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-3xl mx-auto">
            Nu ne bazăm pe servere proxy greoaie. ZephyrSec folosește un model
            de calcul la margine (Edge Computing). Totul se întâmplă live,
            direct în ecosistemul Google Workspace.
          </p>
        </motion.div>
      </section>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-6 max-w-5xl mx-auto space-y-12"
      >
        {/* Card 1: Trust Score */}
        <motion.div
          variants={fadeUp}
          className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 backdrop-blur-sm relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="flex-1 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 text-xs font-mono mb-6">
              <span
                className={`w-2 h-2 rounded-full animate-pulse ${isSafe ? "bg-cyan-400" : isModerate ? "bg-yellow-400" : "bg-rose-500"}`}
              ></span>
              Live Analysis
            </div>
            <h2 className="text-3xl font-bold text-slate-100 mb-4 tracking-tight">
              Criptografie în timp real
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Fiecare email primit trece printr-o analiză criptografică
              tripartită. Verificăm semnăturile digitale și politicile
              domeniului. Datele pe care le vezi aici sunt generate live de
              algoritmul demonstrativ.
            </p>
            <div className="space-y-4 font-mono text-sm bg-[#020617] p-5 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-slate-500">SPF Auth</span>
                <span
                  className={`font-bold tracking-widest ${score >= 30 ? "text-cyan-400" : "text-rose-500"}`}
                >
                  {score >= 30 ? "PASS" : "FAIL"}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-slate-500">DKIM Sig</span>
                <span
                  className={`font-bold tracking-widest ${score >= 50 ? "text-cyan-400" : "text-rose-500"}`}
                >
                  {score >= 50 ? "PASS" : "FAIL"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">DMARC Alignment</span>
                <span
                  className={`font-bold tracking-widest ${isSafe ? "text-cyan-400" : "text-rose-500"}`}
                >
                  {isSafe ? "PASS" : "FAIL"}
                </span>
              </div>
            </div>
          </div>
          <div className="w-56 h-56 relative flex-shrink-0 z-10">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="3"
                fill="transparent"
                className="text-slate-800"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke={isSafe ? "#06B6D4" : isModerate ? "#FACC15" : "#F43F5E"}
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className={`text-6xl font-bold tracking-tighter transition-colors duration-500 ${scoreColor}`}
              >
                {score}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 mt-2 font-bold">
                {isSafe ? "Trust Validat" : isModerate ? "Moderat" : "Critic"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Visualizer Levenshtein (Corectat & Dinamic) */}
        <motion.div
          variants={fadeUp}
          className="bg-[#040914] border border-slate-800/60 rounded-3xl p-8 md:p-12 backdrop-blur-sm"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-slate-100 mb-4 tracking-tight">
              Motorul de vizualizare Levenshtein
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Typosquatting-ul păcălește ochiul uman, dar nu matematica.
              Algoritmul calculează numărul minim de operații necesare pentru a
              transforma vizualul într-un domeniu periculos.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 font-mono text-sm md:text-base">
            <div className="bg-slate-900 border border-slate-800 px-6 py-5 rounded-2xl flex flex-col items-center w-full md:w-auto shadow-inner">
              <span className="text-slate-500 text-xs mb-3 uppercase tracking-wider">
                Text Ancorat (Ce vezi)
              </span>
              <span className="text-white text-2xl tracking-wider font-semibold">
                {TYPO_EXAMPLES[typoIdx].anchor}
              </span>
            </div>

            {/* Fix suprapunere: Flex col curat, spatii corecte */}
            <div className="flex flex-col items-center justify-center text-cyan-400 px-2 py-4">
              <span className="text-[10px] uppercase tracking-widest mb-3 text-center opacity-80">
                Distanță
                <br />
                Calculată
              </span>
              <motion.div
                key={TYPO_EXAMPLES[typoIdx].dist}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#040914] border border-cyan-500/30 px-5 py-2 rounded-full font-bold text-2xl shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              >
                {TYPO_EXAMPLES[typoIdx].dist}
              </motion.div>
            </div>

            <div className="bg-rose-950/20 border border-rose-900/40 px-6 py-5 rounded-2xl flex flex-col items-center w-full md:w-auto">
              <span className="text-rose-400 text-xs mb-3 uppercase tracking-wider">
                Destinație Reală (Threat)
              </span>
              <span className="text-rose-200 text-2xl tracking-wider font-semibold">
                <DecryptedText text={TYPO_EXAMPLES[typoIdx].prefix} />
                <DecryptedText
                  text={TYPO_EXAMPLES[typoIdx].bad}
                  isHighlighted={true}
                />
                <DecryptedText text={TYPO_EXAMPLES[typoIdx].suffix} />
              </span>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Hashing Local */}
        <motion.div
          variants={fadeUp}
          className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-8 md:p-12 backdrop-blur-sm"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4 tracking-tight">
            Zero-Day Defense prin Hashing Local
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8 max-w-3xl">
            Soluțiile vechi trimit fișierele tale către serverele lor pentru
            analiză. Noi aplicăm funcția criptografică direct în instanța ta
            locală. La fiecare accesare a acestei pagini, sistemul tău a generat
            o nouă semnătură:
          </p>
          <div className="bg-[#020617] border border-slate-800 rounded-xl p-5 md:p-6 flex flex-col gap-3 group relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">
                Semnătură SHA-256 (Volatilă)
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#06B6D4]"></span>
            </div>
            <span className="font-mono text-sm md:text-lg text-cyan-400 break-all transition-all duration-300">
              {hash}
            </span>
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
}
