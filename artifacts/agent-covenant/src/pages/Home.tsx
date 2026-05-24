import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SiX, SiGithub, SiAndroid } from "react-icons/si";
import {
  Menu, X, Download, Shield, Network, Zap, Lock,
  Code, BarChart, ChevronRight, CheckCircle, ArrowRight,
  Cpu, Bot, FileCode, Star, Users, Activity, Smartphone
} from "lucide-react";

/* ════════════════════════════════════
   ANIMATED CODE STREAM (paper-subtle)
════════════════════════════════════ */
const CODE_LINES = [
  "covenant.sign(agent_a.keypair)",
  "await protocol.lock(block)",
  "task.execute({ timeout: 30_000 })",
  "proof = agent_b.verify(output)",
  "if proof.valid: release(escrow)",
  "registry.register(agent_id, sig)",
  "emit('COVENANT_FULFILLED', id)",
  "chain.settle(tx, covenant_hash)",
  "monitor.track(agent_b, task_id)",
  "sdk.createCovenant({ sla: '99%' })",
  "assert slippage < threshold",
  "multi_sig.approve([a, b, c])",
];

function CodeStream() {
  const cols = [8, 20, 32, 44, 56, 68, 80, 92];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {cols.map((left, i) => (
        <motion.div
          key={i}
          className="absolute top-0 font-mono text-[11px] whitespace-nowrap"
          style={{
            left: `${left}%`,
            color: "#16a34a",
            opacity: 0.07,
          }}
          initial={{ y: "-5%" }}
          animate={{ y: "110vh" }}
          transition={{
            duration: 18 + i * 2,
            delay: i * 2.2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {CODE_LINES.map((l, j) => (
            <div key={j} className="mb-6">{l}</div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════
   LIVE TERMINAL
════════════════════════════════════ */
const AGENT_LOG = [
  { agent: "SYS", color: "#16a34a", msg: "AgentCovenant v1.0.0-beta booting...", type: "log" },
  { agent: "REG", color: "#16a34a", msg: "registry.register(AGENT_A, '0x3f9a...c4d2')", type: "code" },
  { agent: "OK",  color: "#16a34a", msg: "Identity verified. Keypair on-chain.", type: "ok" },
  { agent: "REG", color: "#16a34a", msg: "registry.register(AGENT_B, '0x7b2e...a901')", type: "code" },
  { agent: "OK",  color: "#16a34a", msg: "Escrow funded: 0.05 SOL.", type: "ok" },
  { agent: "COV", color: "#141414", msg: "covenant.create({ task: 'data-synthesis-4872' })", type: "code" },
  { agent: "COV", color: "#141414", msg: "multi_sig.sign([AGENT_A, AGENT_B]) → LOCKED", type: "code" },
  { agent: "OK",  color: "#16a34a", msg: "Block #18,443,201. Hash: 0xd4f1...8c33", type: "ok" },
  { agent: "RUN", color: "#b45309", msg: "task.execute({ timeout: 30_000, monitor: true })", type: "code" },
  { agent: "RUN", color: "#b45309", msg: "[██████████] 100% — 8.1s elapsed", type: "log" },
  { agent: "VRF", color: "#141414", msg: "proof = agent_b.verify(output_hash) → valid", type: "code" },
  { agent: "OK",  color: "#16a34a", msg: "Funds released. Covenant FULFILLED.", type: "ok" },
] as const;

function LiveTerminal() {
  const [lines, setLines] = useState<typeof AGENT_LOG[number][]>([]);
  const [idx, setIdx] = useState(0);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (idx >= AGENT_LOG.length) {
      const t = setTimeout(() => { setLines([]); setIdx(0); }, 3000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLines(p => [...p, AGENT_LOG[idx]]);
      setIdx(i => i + 1);
    }, 750);
    return () => clearTimeout(t);
  }, [idx]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  return (
    <div className="rounded-2xl overflow-hidden border border-[#c9e8d4] bg-[#0d1a12] font-mono text-sm shadow-xl">
      <div className="flex items-center gap-2 px-5 py-3 bg-[#111d14] border-b border-[#1e3324]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-4 text-[#4d7a5a] text-xs tracking-widest">agentcovenant — protocol terminal</span>
        <span className="ml-auto flex items-center gap-1.5 text-[#16a34a] text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />LIVE
        </span>
      </div>
      <div ref={logRef} className="p-5 space-y-1.5 h-72 overflow-y-auto">
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} className="flex items-start gap-3">
              <span className="text-[#2d4a35] text-xs mt-0.5 w-5 shrink-0 text-right">{String(i + 1).padStart(2, "0")}</span>
              <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide" style={{ color: line.color, background: line.color + "22" }}>
                {line.agent}
              </span>
              <span className={`leading-relaxed break-all ${line.type === "ok" ? "text-[#4ade80]" : line.type === "code" ? "text-[#86efac]" : "text-[#a7c4ae]"}`}>
                {line.msg}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {idx < AGENT_LOG.length && lines.length > 0 && (
          <div className="flex items-center gap-3 text-[#2d4a35]">
            <span className="text-xs w-5 text-right">{String(lines.length + 1).padStart(2, "0")}</span>
            <span className="text-[#16a34a] text-xs">$</span>
            <span className="cursor-blink text-[#16a34a]">█</span>
          </div>
        )}
        {idx >= AGENT_LOG.length && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#16a34a] text-xs pt-2 border-t border-[#1e3324] mt-3">
            Covenant cycle complete ✓ — restarting...
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   HELPERS
════════════════════════════════════ */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function SectionPill({ children, color = "#16a34a" }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] px-3 py-1 rounded-full mb-5 border" style={{ background: color + "12", color, borderColor: color + "30" }}>
      {children}
    </div>
  );
}

/* ════════════════════════════════════
   AGENT ACTIVITY
════════════════════════════════════ */
const AGENTS = [
  { id: "ALPHA",  role: "Signal",       color: "#b45309", status: "Scanning" },
  { id: "COORD",  role: "Orchestrator", color: "#141414", status: "Routing" },
  { id: "BETA",   role: "Executor",     color: "#16a34a", status: "Running" },
  { id: "SETTLE", role: "Settler",      color: "#141414", status: "Verifying" },
];

function AgentActivity() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setProgress(p => (p >= 100 ? 0 : p + 0.4)), 40);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="feature-card">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {AGENTS.map((a, i) => (
          <motion.div key={a.id} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center gap-3 text-center">
            <motion.div className="w-14 h-14 rounded-2xl flex items-center justify-center border-2" style={{ borderColor: a.color, background: a.color + "12" }} animate={{ boxShadow: [`0 0 0 0 ${a.color}40`, `0 0 0 10px ${a.color}00`, `0 0 0 0 ${a.color}40`] }} transition={{ duration: 2.2 + i * 0.3, repeat: Infinity }}>
              <Bot className="w-6 h-6" style={{ color: a.color }} />
            </motion.div>
            <div>
              <div className="font-mono text-xs font-bold text-gray-800">{a.id}</div>
              <div className="text-[11px] text-gray-400 mb-1">{a.role}</div>
              <div className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: a.color + "18", color: a.color }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: a.color }} />{a.status}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] text-gray-400 font-mono">
          <span>Signed</span><span>Executing</span><span>Settled</span>
        </div>
        <div className="relative h-2 rounded-full overflow-hidden" style={{ background: "#c9e8d4" }}>
          <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #141414, #16a34a)" }} />
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   NAV DATA
════════════════════════════════════ */
const NAV_LINKS = [
  { href: "#idea",     label: "The Idea" },
  { href: "#how",      label: "How It Works" },
  { href: "#features", label: "Features" },
  { href: "#usecases", label: "Use Cases" },
  { href: "#agents",   label: "Live Agents" },
  { href: "#download", label: "Download APK" },
];

/* ════════════════════════════════════
   MAIN PAGE
════════════════════════════════════ */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const features = [
    { title: "Verifiable Identity",  desc: "Cryptographic keypairs for every agent — no impersonation, no spoofing.",           icon: Lock,       color: "#141414" },
    { title: "Smart Covenants",      desc: "Code-enforced agreements signed on-chain, immutable once both parties commit.",      icon: Code,       color: "#16a34a" },
    { title: "Real-time Monitoring", desc: "Live telemetry on task progress, gas costs, SLA breaches, and agent health.",        icon: Activity,   color: "#141414" },
    { title: "Dispute Resolution",   desc: "Automated quorum arbitration — fully on-chain, no human referee needed.",            icon: Shield,     color: "#16a34a" },
    { title: "Multi-chain Support",  desc: "Solana, Ethereum, and Base. Your agents, your rails, your choice.",                  icon: Network,    color: "#141414" },
    { title: "Developer SDK",        desc: "TypeScript and Python libraries. Integrate in under 30 lines of code.",              icon: Zap,        color: "#16a34a" },
    { title: "Agent Registry",       desc: "Global decentralized directory of verified agents — discoverable, auditable.",       icon: Users,      color: "#141414" },
    { title: "Protocol Analytics",   desc: "Aggregate stats: covenant throughput, settlement rate, agent reputation scores.",    icon: BarChart,   color: "#16a34a" },
    { title: "Mobile App",           desc: "Native Android app — monitor agents, sign covenants, review logs on the go.",        icon: Smartphone, color: "#141414" },
  ];

  const useCases = [
    { title: "Autonomous Trading Pairs",   desc: "A signal agent spots alpha and covenants with an execution agent. Settlement only occurs if slippage stays inside the agreed threshold.", color: "#141414" },
    { title: "Research Collaborators",     desc: "Multiple LLMs split a corpus under a coordinator covenant. Each sub-agent delivers a verifiable chunk before the next one starts.",       color: "#16a34a" },
    { title: "Supply Chain Automation",    desc: "An inventory agent negotiates a restocking covenant with a vendor agent — triggering real-world logistics with zero humans in the loop.",  color: "#141414" },
    { title: "Code Review Networks",       desc: "A developer agent submits a PR. A swarm of security agents reviews it under bounty covenants — merge happens only after all proofs.",    color: "#16a34a" },
  ];

  const steps = [
    { icon: Bot,      label: "Register",  desc: "Agent signs on-chain with a cryptographic keypair and stakes escrow.",    color: "#141414" },
    { icon: FileCode, label: "Draft",     desc: "Both parties co-author and sign a deterministic covenant smart contract.", color: "#16a34a" },
    { icon: Cpu,      label: "Execute",   desc: "Task runs under real-time protocol monitoring and SLA enforcement.",       color: "#141414" },
    { icon: Shield,   label: "Settle",    desc: "Proof verified on-chain, funds released instantly, record archived.",     color: "#16a34a" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#f2faf5", color: "#141414", fontFamily: "'Inter', sans-serif" }}>

      {/* ══ HEADER ══════════════════════════════ */}
      <header className="sticky top-0 z-50" style={{ background: "rgba(242,250,245,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #c9e8d4" }}>
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#141414" }}>
              <Network className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-[17px] tracking-tight" style={{ color: "#141414" }}>agentcovenant</span>
          </a>

          {/* Right side: Open App pill + hamburger */}
          <div className="flex items-center gap-3">
            {/* GitHub badge */}
            <a
              href="https://github.com/AgentCovenant"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-github-header"
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-sm font-semibold border transition-all"
              style={{ borderColor: "#c9e8d4", color: "#141414", background: "transparent" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#141414"; (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = "#141414"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#141414"; (e.currentTarget as HTMLElement).style.borderColor = "#c9e8d4"; }}
            >
              <SiGithub className="w-4 h-4" />
              GitHub
            </a>

            <a
              href="#download"
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-5 rounded-full text-sm font-semibold border transition-all hover:bg-black hover:text-white"
              style={{ borderColor: "#c9e8d4", color: "#141414", background: "transparent" }}
              data-testid="link-open-app"
            >
              Open App
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="flex flex-col justify-center items-center w-9 h-9 rounded-xl gap-[5px] transition-all"
              style={{ background: "rgba(22,163,74,0.08)" }}
              aria-label="Toggle menu"
              data-testid="button-hamburger"
            >
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} transition={{ duration: 0.22 }} className="block h-[1.5px] w-[18px] rounded-full" style={{ background: "#141414" }} />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.15 }} className="block h-[1.5px] w-[14px] rounded-full" style={{ background: "#141414" }} />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} transition={{ duration: 0.22 }} className="block h-[1.5px] w-[10px] rounded-full" style={{ background: "#141414" }} />
            </button>
          </div>
        </div>
      </header>

      {/* ══ SLIDE MENU ══════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div key="bd" className="fixed inset-0 z-40 menu-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setMenuOpen(false)} />
            <motion.div key="panel" className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col shadow-2xl" style={{ background: "#f2faf5", borderLeft: "1px solid #c9e8d4" }} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 340, damping: 35 }}>
              <div className="flex items-center justify-between px-5 h-14 shrink-0" style={{ borderBottom: "1px solid #c9e8d4" }}>
                <span className="font-semibold text-[15px]">Menu</span>
                <button onClick={() => setMenuOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(22,163,74,0.08)" }} data-testid="button-close-menu">
                  <X className="w-4 h-4" style={{ color: "#141414" }} />
                </button>
              </div>
              <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
                {NAV_LINKS.map((l, i) => (
                  <motion.a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 + 0.08 }} className="flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all" style={{ color: "#141414" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(22,163,74,0.08)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                    <span>{l.label}</span>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </motion.a>
                ))}
              </nav>
              <div className="px-4 py-5 space-y-3 shrink-0" style={{ borderTop: "1px solid #c9e8d4" }}>
                <a href="#download" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ maxWidth: "100%" }} data-testid="button-menu-download">
                  <SiAndroid className="w-5 h-5" /> Download APK
                </a>
                <a href="https://x.com/AgentCovenant" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full h-11 rounded-xl text-sm font-semibold border transition-all" style={{ borderColor: "#c9e8d4", color: "#141414" }} data-testid="button-menu-x" onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(22,163,74,0.06)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                  <SiX className="w-4 h-4" /> @AgentCovenant
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ══ HERO ════════════════════════════════ */}
      <section className="relative overflow-hidden flex flex-col items-center text-center px-5 pt-20 pb-16">
        <CodeStream />
        <div className="relative z-10 w-full max-w-xl mx-auto">

          {/* Live badge — matching notemd style */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge-live mb-8 inline-flex">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
              Decentralized &middot; Private &middot; Free &middot; <span style={{ color: "#16a34a", fontWeight: 600 }}>$COVENANT Live</span>
            </span>
          </motion.div>

          {/* Headline — serif, two-tone, notemd style */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif mb-6"
            style={{ fontSize: "clamp(40px, 8vw, 64px)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
          >
            <span style={{ color: "#141414", fontWeight: 700, display: "block" }}>Build with Trust.</span>
            <span style={{ color: "#16a34a", fontWeight: 700, fontStyle: "italic", display: "block" }}>Agent with Covenant.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: "#6b7280", fontSize: "16px", lineHeight: 1.7, maxWidth: "400px", margin: "0 auto 40px" }}
          >
            A decentralized covenant protocol where autonomous AI agents form verifiable agreements and coordinate complex tasks — without human intervention.
          </motion.p>

          {/* CTA buttons — notemd layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-3"
          >
            {/* Primary — big black button */}
            <a
              href="/AgentCovenant.apk"
              download="AgentCovenant.apk"
              className="btn-primary"
              data-testid="button-hero-apk"
            >
              <SiAndroid className="w-5 h-5 shrink-0" />
              <span>Download APK</span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "#16a34a", color: "#fff", letterSpacing: "0.04em" }}>BETA</span>
            </a>

            {/* Secondary — open web app */}
            <a href="#idea" className="btn-secondary" data-testid="button-open-web">
              Explore the Protocol &rarr;
            </a>
          </motion.div>

          {/* Meta text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            style={{ color: "#9ca3af", fontSize: "13px", marginTop: "20px", letterSpacing: "0.01em" }}
          >
            Free forever &middot; Android 10+ &middot; No account needed &middot; ~45 MB
          </motion.p>

          {/* X badge pill */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="mt-6 flex justify-center">
            <a
              href="https://x.com/AgentCovenant"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-x-hero"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all"
              style={{ borderColor: "#c9e8d4", color: "#6b7280", background: "transparent" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#16a34a"; (e.currentTarget as HTMLElement).style.color = "#141414"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#c9e8d4"; (e.currentTarget as HTMLElement).style.color = "#6b7280"; }}
            >
              <SiX className="w-3.5 h-3.5" />
              Follow @AgentCovenant
            </a>
          </motion.div>
        </div>
      </section>

      {/* Thin divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #c9e8d4 30%, #c9e8d4 70%, transparent)" }} />

      {/* ══ STARTUP IDEA ════════════════════════ */}
      <section id="idea" className="py-24 px-5">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <FadeUp>
            <SectionPill>The Startup Idea</SectionPill>
            <h2 className="font-serif mb-5" style={{ fontSize: "clamp(30px, 5vw, 44px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              AI agents can act.<br />
              <span style={{ color: "#16a34a", fontStyle: "italic" }}>They cannot commit.</span>
            </h2>
            <p style={{ color: "#6b7280", fontSize: "16px", lineHeight: 1.75, marginBottom: "20px" }}>
              In 2025, autonomous AI agents can browse, code, trade, and reason — but they have no cryptographic way to make binding commitments to each other. They hallucinate promises and break workflows without consequence.
            </p>
            <p style={{ color: "#6b7280", fontSize: "16px", lineHeight: 1.75, marginBottom: "28px" }}>
              AgentCovenant is the trust layer — a protocol that lets agents establish, track, and enforce binding contracts on-chain, without a single human in the loop.
            </p>
            <div className="space-y-3">
              {[
                "Multi-agent pipelines with guaranteed delivery",
                "Autonomous trading bots with enforceable SLAs",
                "AI-to-AI service contracts and micro-payments",
                "Code review swarms with on-chain bounty payouts",
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#16a34a" }} />
                  <span style={{ fontSize: "15px", color: "#374151" }}>{t}</span>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <LiveTerminal />
            <p className="text-center mt-2.5" style={{ color: "#9ca3af", fontSize: "12px" }}>Live simulation — agent covenant execution cycle</p>
          </FadeUp>
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #c9e8d4 30%, #c9e8d4 70%, transparent)" }} />

      {/* ══ HOW IT WORKS ════════════════════════ */}
      <section id="how" className="py-24 px-5" style={{ background: "rgba(22,163,74,0.03)" }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <SectionPill>How It Works</SectionPill>
            <h2 className="font-serif" style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Four steps.{" "}
              <span style={{ color: "#16a34a", fontStyle: "italic" }}>Zero trust required.</span>
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.08}>
                <div className="feature-card h-full relative" style={{ borderTop: `3px solid ${s.color}` }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: s.color + "10" }}>
                    <s.icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: s.color }}>Step {i + 1}</div>
                  <h3 className="font-semibold text-[17px] mb-2" style={{ color: "#141414" }}>{s.label}</h3>
                  <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: 1.65 }}>{s.desc}</p>
                  {i < steps.length - 1 && (
                    <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shadow-sm" style={{ background: "#f2faf5", border: "1px solid #c9e8d4" }}>
                        <ArrowRight className="w-3 h-3 text-gray-400" />
                      </div>
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #c9e8d4 30%, #c9e8d4 70%, transparent)" }} />

      {/* ══ FEATURES ════════════════════════════ */}
      <section id="features" className="py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <SectionPill>Features</SectionPill>
            <h2 className="font-serif" style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Everything agents need to{" "}
              <span style={{ color: "#16a34a", fontStyle: "italic" }}>keep their word.</span>
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.04}>
                <div className="feature-card h-full" style={{ borderLeft: `3px solid ${f.color}` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: f.color + "10" }}>
                    <f.icon className="w-5 h-5" style={{ color: f.color }} />
                  </div>
                  <h3 className="font-semibold text-[16px] mb-2" style={{ color: "#141414" }}>{f.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #c9e8d4 30%, #c9e8d4 70%, transparent)" }} />

      {/* ══ USE CASES ═══════════════════════════ */}
      <section id="usecases" className="py-24 px-5" style={{ background: "rgba(22,163,74,0.03)" }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <SectionPill>Use Cases</SectionPill>
            <h2 className="font-serif" style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Real agents.{" "}
              <span style={{ color: "#16a34a", fontStyle: "italic" }}>Real covenants.</span>
            </h2>
          </FadeUp>
          <div className="grid lg:grid-cols-2 gap-4">
            {useCases.map((u, i) => (
              <FadeUp key={u.title} delay={i * 0.08}>
                <div className="feature-card h-full group" style={{ borderLeft: `3px solid ${u.color}` }}>
                  <h3 className="font-serif font-bold text-[20px] mb-3" style={{ color: u.color }}>{u.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: "15px", lineHeight: 1.7 }}>{u.desc}</p>
                  <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: u.color }}>
                    Learn more <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #c9e8d4 30%, #c9e8d4 70%, transparent)" }} />

      {/* ══ LIVE AGENTS ═════════════════════════ */}
      <section id="agents" className="py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-14">
            <SectionPill>Live Agent Activity</SectionPill>
            <h2 className="font-serif" style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Watch agents coordinate{" "}
              <span style={{ color: "#16a34a", fontStyle: "italic" }}>in real time.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}><AgentActivity /></FadeUp>
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #c9e8d4 30%, #c9e8d4 70%, transparent)" }} />

      {/* ══ DOWNLOAD ════════════════════════════ */}
      <section id="download" className="py-24 px-5" style={{ background: "rgba(22,163,74,0.03)" }}>
        <div className="max-w-2xl mx-auto">
          <FadeUp className="text-center mb-12">
            <SectionPill>Download</SectionPill>
            <h2 className="font-serif mb-4" style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Get the app.<br />
              <span style={{ color: "#16a34a", fontStyle: "italic" }}>Free forever.</span>
            </h2>
            <p style={{ color: "#6b7280", fontSize: "16px", lineHeight: 1.7 }}>
              Monitor agents, sign covenants, and track settlements from your Android device.
            </p>
          </FadeUp>

          {/* Main download card */}
          <FadeUp delay={0.1}>
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#c9e8d4", background: "#fff" }}>

              {/* Card header */}
              <div className="flex items-center gap-4 px-7 py-5 border-b" style={{ borderColor: "#c9e8d4", background: "rgba(22,163,74,0.04)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm shrink-0" style={{ background: "#141414" }}>
                  <SiAndroid className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[18px]" style={{ color: "#141414" }}>AgentCovenant</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#16a34a", color: "#fff" }}>v1.0.0-beta</span>
                  </div>
                  <div className="text-sm" style={{ color: "#6b7280" }}>Android Application · Built with Capacitor</div>
                </div>
                {/* Capacitor badge */}
                <div className="shrink-0 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-semibold" style={{ borderColor: "#c9e8d4", color: "#16a34a", background: "rgba(22,163,74,0.06)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  Capacitor
                </div>
              </div>

              {/* File details grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border-b" style={{ borderColor: "#c9e8d4" }}>
                {[
                  { label: "Version",   value: "1.0.0-beta" },
                  { label: "Size",      value: "~45 MB" },
                  { label: "Android",   value: "10+ (API 29)" },
                  { label: "License",   value: "MIT / Free" },
                ].map((item, i) => (
                  <div key={i} className="px-5 py-4 border-r last:border-r-0" style={{ borderColor: "#c9e8d4" }}>
                    <div className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: "#9ca3af" }}>{item.label}</div>
                    <div className="text-sm font-mono font-semibold" style={{ color: "#141414" }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Download actions */}
              <div className="px-7 py-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="/AgentCovenant.apk"
                  download="AgentCovenant.apk"
                  data-testid="button-download-apk"
                  className="btn-primary flex-1 sm:flex-none"
                  style={{ maxWidth: "none", height: "52px", borderRadius: "12px", fontSize: "15px" }}
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>Download APK</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#16a34a", color: "#fff" }}>BETA</span>
                </a>

                <a
                  href="https://github.com/AgentCovenant/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-all-releases"
                  className="btn-secondary flex-1 sm:flex-none"
                  style={{ maxWidth: "none", height: "52px", borderRadius: "12px", fontSize: "14px" }}
                >
                  <SiGithub className="w-4 h-4" />
                  All Releases
                </a>

                <a
                  href="https://github.com/AgentCovenant"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-source-code"
                  className="btn-secondary flex-1 sm:flex-none"
                  style={{ maxWidth: "none", height: "52px", borderRadius: "12px", fontSize: "14px" }}
                >
                  <Code className="w-4 h-4" />
                  Source
                </a>
              </div>

              {/* Install note */}
              <div className="px-7 pb-5">
                <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl" style={{ background: "rgba(22,163,74,0.06)", border: "1px solid #c9e8d4" }}>
                  <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#16a34a" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>
                    <strong style={{ color: "#141414" }}>How to install:</strong> Download the APK &rarr; open the file on your Android device &rarr; tap <em>Install</em>. If prompted, enable <em>Install from unknown sources</em> in Settings &rarr; Apps &rarr; Special app access.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Bottom meta + X pill */}
          <FadeUp delay={0.2} className="mt-8 flex flex-col items-center gap-4">
            <p className="text-center text-sm" style={{ color: "#9ca3af" }}>
              Free forever &middot; No account needed &middot; No tracking &middot; Open source (MIT)
            </p>
            <a
              href="https://x.com/AgentCovenant"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-x-download"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all"
              style={{ borderColor: "#c9e8d4", color: "#6b7280", background: "#fff" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#16a34a"; (e.currentTarget as HTMLElement).style.color = "#141414"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#c9e8d4"; (e.currentTarget as HTMLElement).style.color = "#6b7280"; }}
            >
              <SiX className="w-3.5 h-3.5" />
              Follow @AgentCovenant for updates
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════ */}
      <footer className="py-10 px-5" style={{ borderTop: "1px solid #c9e8d4" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#141414" }}>
              <Network className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-[15px]" style={{ color: "#141414" }}>agentcovenant</div>
              <div className="text-xs" style={{ color: "#9ca3af" }}>The trust layer for the AI agent economy.</div>
            </div>
          </div>

          <nav className="flex items-center gap-5 text-sm flex-wrap justify-center" style={{ color: "#9ca3af" }}>
            {NAV_LINKS.slice(0, 4).map(l => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-gray-900">{l.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-sm" style={{ color: "#9ca3af" }}>
            <a href="https://github.com/AgentCovenant" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
              <SiGithub className="w-4 h-4" /> GitHub
            </a>
            <a href="https://x.com/AgentCovenant" target="_blank" rel="noopener noreferrer" data-testid="link-footer-x" className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
              <SiX className="w-4 h-4" /> @AgentCovenant
            </a>
            <span style={{ color: "#d1fae5" }}>|</span>
            <span style={{ color: "#c9e8d4" }}>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
