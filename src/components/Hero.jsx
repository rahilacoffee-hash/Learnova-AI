import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const DEMO_TABS = ["Upload", "Summary", "Quiz", "Chat"];

const DemoScreens = ({ active }) => {
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    if (active === 0) {
      setBarWidth(0);
      const t = setTimeout(() => setBarWidth(100), 120);
      return () => clearTimeout(t);
    }
  }, [active]);

  return (
    <div className="relative" style={{ minHeight: 180 }}>

      {/* Upload */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${active === 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="border border-dashed border-indigo-500/40 rounded-xl p-6 text-center bg-indigo-500/5">
          <div className="text-3xl mb-2">📄</div>
          <p className="text-xs text-slate-400 font-mono">Chapter_3_Biology.pdf</p>
          <div className="mt-4 h-1 rounded-full bg-slate-700/60 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
              style={{ width: `${barWidth}%`, transition: "width 2s ease" }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2 font-mono">Uploading... {barWidth === 100 ? "done ✓" : ""}</p>
        </div>
      </div>

      {/* Summary */}
      <div className={`absolute inset-0 flex flex-col gap-2 transition-opacity duration-500 ${active === 1 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <span className="inline-block bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs px-2.5 py-1 rounded-md font-mono w-fit mb-1">✦ AI Summary</span>
        {[100, 82, 100, 65, 100, 78].map((w, i) => (
          <div key={i} className="h-2 rounded-full bg-indigo-500/15" style={{ width: `${w}%` }} />
        ))}
      </div>

      {/* Quiz */}
      <div className={`absolute inset-0 flex flex-col gap-2 transition-opacity duration-500 ${active === 2 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <p className="text-xs font-semibold text-slate-200 font-sans mb-1">How many daughter cells does mitosis produce?</p>
        {["A) 1", "B) 2 ✓", "C) 4", "D) 8"].map((opt, i) => (
          <div key={i} className={`px-3 py-1.5 rounded-lg border text-xs font-mono ${i === 1 ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-400" : "border-slate-700/60 text-slate-400"}`}>
            {opt}
          </div>
        ))}
      </div>

      {/* Chat */}
      <div className={`absolute inset-0 flex flex-col gap-3 transition-opacity duration-500 ${active === 3 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="flex gap-2 items-start">
          <div className="w-6 h-6 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">U</div>
          <div className="bg-indigo-500/10 border border-slate-700/50 rounded-xl px-3 py-2 text-xs text-slate-300 leading-relaxed">What's the difference between mitosis and meiosis?</div>
        </div>
        <div className="flex gap-2 items-start">
          <div className="w-6 h-6 rounded-md bg-cyan-500/15 text-cyan-300 text-xs font-bold flex items-center justify-center shrink-0">AI</div>
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl px-3 py-2 text-xs text-slate-300 leading-relaxed">Mitosis → 2 identical cells (growth). Meiosis → 4 unique cells (reproduction). Want me to go deeper on any stage?</div>
        </div>
      </div>

    </div>
  );
};

const Terminal = () => {
  const [lines, setLines] = useState([]);
  const [typing, setTyping] = useState("");
  const bodyRef = useRef(null);
  const timeoutRef = useRef([]);

  const LINES = [
    { type: "prompt", text: 'learnova analyze --file "chapter3.pdf"' },
    { type: "out",    text: "✦ Extracting text... done (2,847 words)" },
    { type: "out",    text: "✦ Identifying key concepts..." },
    { type: "out",    text: "✦ Found 14 core topics, 38 terms" },
    { type: "warn",   text: "✦ Generating quiz (difficulty: medium)" },
    { type: "out",    text: "✦ 10 questions generated ✓" },
    { type: "dim",    text: "✦ Building flashcard deck..." },
    { type: "out",    text: "✦ 18 flashcards ready ✓" },
    { type: "prompt", text: "learnova chat --context chapter3.pdf" },
    { type: "out",    text: "✦ AI tutor ready. Ask anything." },
  ];

  function clearTimers() { timeoutRef.current.forEach(clearTimeout); timeoutRef.current = []; }

  function runTerminal() {
    clearTimers();
    setLines([]);
    setTyping("");
    let delay = 500;

    LINES.forEach((line, idx) => {
      let t = setTimeout(() => {
        let i = 0;
        let speed = line.type === "prompt" ? 38 : 16;
        let iv = setInterval(() => {
          i++;
          if (i <= line.text.length) {
            setTyping(line.text.slice(0, i));
          } else {
            clearInterval(iv);
            setLines(prev => [...prev, line]);
            setTyping("");
            if (idx === LINES.length - 1) {
              let restart = setTimeout(runTerminal, 3000);
              timeoutRef.current.push(restart);
            }
          }
        }, speed);
        timeoutRef.current.push(iv);
      }, delay);
      timeoutRef.current.push(t);
      delay += line.type === "prompt" ? 900 : 550;
    });
  }

  useEffect(() => {
    runTerminal();
    return clearTimers;
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, typing]);

  let colorMap = { prompt: "text-indigo-400", out: "text-emerald-400", warn: "text-yellow-400", dim: "text-slate-500" };

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700/60 bg-[#080B14]/95">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-700/50 bg-slate-900/60">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        <span className="text-xs text-slate-500 font-mono ml-2">learnova ~ ai</span>
      </div>
      <div ref={bodyRef} className="p-4 font-mono text-xs leading-7 h-36 overflow-hidden">
        {lines.map((l, i) => (
          <div key={i} className="flex gap-2">
            {l.type === "prompt" && <span className="text-indigo-400">➜</span>}
            <span className={colorMap[l.type] || "text-slate-400"}>{l.text}</span>
          </div>
        ))}
        {typing && (
          <div className="flex gap-2">
            {(lines.length === 0 || lines[lines.length - 1]?.type !== "prompt") && LINES[lines.length]?.type === "prompt" && (
              <span className="text-indigo-400">➜</span>
            )}
            <span className={colorMap[LINES[lines.length]?.type] || "text-slate-400"}>
              {typing}<span className="inline-block w-1.5 h-3.5 bg-indigo-400 ml-0.5 animate-pulse align-text-bottom rounded-sm" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function HeroSection() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const [activeTab, setActiveTab] = useState(0);
  const autoRef = useRef(null);

  // Canvas: particles + morphing shape
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, morphT = 0;
    let animId;
    let particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = Math.random() * 1.8 + 0.3;
        this.vx = (Math.random() - 0.5) * 0.32;
        this.vy = (Math.random() - 0.5) * 0.32;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.hue = Math.random() > 0.5 ? 240 : 189;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0) this.x = W; if (this.x > W) this.x = 0;
        if (this.y < 0) this.y = H; if (this.y > H) this.y = 0;
        let dx = this.x - mouseRef.current.x;
        let dy = this.y - mouseRef.current.y;
        let d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) { let f = (110 - d) / 110; this.x += dx * f * 0.065; this.y += dy * f * 0.065; }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue},78%,68%,${this.alpha})`;
        ctx.fill();
      }
    }

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < 170; i++) particles.push(new Particle());
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let d = Math.sqrt(dx * dx + dy * dy);
          if (d < 88) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${(1 - d / 88) * 0.12})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    }

    function drawMorph(t) {
      const cx = W * 0.5, cy = H * 0.5;
      const base = Math.min(W, H) * 0.26;
      ctx.save(); ctx.beginPath();
      for (let i = 0; i <= 360; i++) {
        let a = (i / 360) * Math.PI * 2;
        let r = base
          + Math.sin(a * 2 + t * 0.7) * base * 0.15
          + Math.sin(a * 3 - t * 0.45) * base * 0.09
          + Math.sin(a * 7 + t * 1.1) * base * 0.04;
        let x = cx + Math.cos(a) * r;
        let y = cy + Math.sin(a) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      let g = ctx.createRadialGradient(cx, cy, 0, cx, cy, base * 1.4);
      g.addColorStop(0, "rgba(99,102,241,0.10)");
      g.addColorStop(0.5, "rgba(34,211,238,0.05)");
      g.addColorStop(1, "rgba(99,102,241,0)");
      ctx.fillStyle = g; ctx.fill();
      let sg = ctx.createLinearGradient(cx - base, cy, cx + base, cy);
      sg.addColorStop(0, "rgba(99,102,241,0.35)");
      sg.addColorStop(0.5, "rgba(34,211,238,0.45)");
      sg.addColorStop(1, "rgba(99,102,241,0.35)");
      ctx.strokeStyle = sg; ctx.lineWidth = 1; ctx.stroke();
      ctx.restore();
    }

    function render() {
      ctx.clearRect(0, 0, W, H);
      morphT += 0.01;
      drawMorph(morphT);
      drawConnections();
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(render);
    }

    resize();
    window.addEventListener("resize", resize);
    render();

    const handleMouse = e => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", handleMouse);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  // Auto-cycle demo tabs
  useEffect(() => {
    autoRef.current = setInterval(() => {
      setActiveTab(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(autoRef.current);
  }, []);

  let handleTab = (i) => {
    clearInterval(autoRef.current);
    setActiveTab(i);
    autoRef.current = setInterval(() => setActiveTab(prev => (prev + 1) % 4), 3000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080B14]">

      {/* canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />

      {/* grid */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.045) 1px,transparent 1px)",
          backgroundSize: "52px 52px"
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

        {/* ── LEFT ── */}
        <div className="flex-1 min-w-0">

          {/* badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/28 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-medium text-indigo-300">AI-powered study assistant</span>
          </div>

          {/* headline */}
          <h1 className="font-bold leading-none tracking-tight mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(42px,6vw,80px)", letterSpacing: "-2.5px" }}>
            <span className="text-slate-100 block">Your notes.</span>
            <span className="block" style={{
              background: "linear-gradient(90deg,#6366F1 0%,#22D3EE 25%,#A78BFA 50%,#22D3EE 75%,#6366F1 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradShift 3.5s linear infinite"
            }}>
              Your AI tutor.
            </span>
          </h1>

          <p className="text-slate-400 leading-relaxed mb-10 max-w-md" style={{ fontSize: "clamp(15px,1.5vw,18px)" }}>
            Upload any document and LearnOva instantly builds summaries, quizzes, and flashcards — then lets you chat with your notes like a tutor that read everything.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:-translate-y-0.5"
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                background: "linear-gradient(135deg,#6366F1,#4F46E5)",
                boxShadow: "0 0 36px rgba(99,102,241,0.4)"
              }}>
              Start for free →
            </Link>
            <a href="#how"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-slate-200 text-sm border border-slate-700/60 hover:border-indigo-500/50 hover:bg-indigo-500/7 transition-all"
              style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              See how it works
            </a>
          </div>

          {/* stats */}
          <div className="flex flex-wrap gap-10 mt-12 pt-10 border-t border-slate-700/40">
            {[["10x", "faster revision"], ["5+", "AI tools in one place"], ["100%", "based on your notes"]].map(([num, label]) => (
              <div key={label}>
                <div className="font-bold text-3xl text-white" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{num}</div>
                <div className="text-xs text-slate-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="flex-1 min-w-0 w-full max-w-md flex flex-col gap-4">

          {/* DEMO CARD */}
          <div className="rounded-2xl overflow-hidden border border-slate-700/60 bg-[#0E1220]/90 group hover:border-indigo-500/40 transition-colors duration-300">

            {/* topbar */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-700/50 bg-slate-900/50">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-slate-500 font-mono ml-2">learnova-ai</span>
            </div>

            {/* tabs */}
            <div className="flex gap-1.5 px-4 pt-3 pb-2">
              {DEMO_TABS.map((tab, i) => (
                <button key={tab} onClick={() => handleTab(i)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-mono border transition-all ${activeTab === i
                    ? "border-indigo-500/40 text-indigo-400 bg-indigo-500/10"
                    : "border-transparent text-slate-500 hover:text-slate-300"}`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* screens */}
            <div className="px-4 pb-5">
              <DemoScreens active={activeTab} />
            </div>

            {/* hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
              style={{ background: "rgba(8,11,20,0.25)" }}>
              <div className="w-12 h-12 rounded-full bg-indigo-500/80 flex items-center justify-center text-white text-lg backdrop-blur-sm shadow-lg shadow-indigo-500/30">
                ▶
              </div>
            </div>
          </div>

          {/* TERMINAL */}
          <Terminal />
        </div>
      </div>

      {/* gradient keyframe */}
      <style>{`
        @keyframes gradShift {
          0% { background-position: 0% center }
          100% { background-position: 200% center }
        }
      `}</style>
    </section>
  );
}