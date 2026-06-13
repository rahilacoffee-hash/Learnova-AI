const steps = [
  {
    num: "01",
    title: "Upload your notes",
    desc: "Drop in any PDF,  or text file. LearnOva reads and processes it instantly.",
    color: "#6366F1",
    glow: "rgba(99,102,241,0.25)",
  },
  {
    num: "02",
    title: "AI extracts key ideas",
    desc: "The AI identifies core concepts, definitions, and relationships in your material.",
    color: "#22D3EE",
    glow: "rgba(34,211,238,0.25)",
  },
  {
    num: "03",
    title: "Choose your study tool",
    desc: "Generate a summary, quiz, or flashcard deck — or open the AI chat to ask questions.",
    color: "#A78BFA",
    glow: "rgba(167,139,250,0.25)",
  },
  {
    num: "04",
    title: "Study and track progress",
    desc: "Review performance on the dashboard, spot weak areas, and keep your streak going.",
    color: "#34D399",
    glow: "rgba(52,211,153,0.25)",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative bg-[#080B14] py-28 px-6 overflow-hidden">

      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px)",
          backgroundSize: "52px 52px"
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        <div className="text-center mb-20">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-4">How it works</p>
          <h2 className="font-bold text-slate-100 leading-tight mb-4"
            style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-1.5px" }}>
            From notes to mastery<br />in four steps
          </h2>
          <p className="text-slate-400 max-w-md mx-auto" style={{ fontSize: "clamp(15px,1.4vw,17px)" }}>
            No setup. No learning curve. Just upload and let the AI do the heavy lifting.
          </p>
        </div>

        {/* steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.3),rgba(34,211,238,0.4),rgba(167,139,250,0.3),transparent)" }}
          />

          {steps.map((s, i) => (
            <div key={s.num} className="flex flex-col items-center text-center relative">

              {/* circle */}
              <div className="relative w-20 h-20 rounded-full border border-slate-700/60 bg-[#0E1220] flex items-center justify-center mb-6 z-10"
                style={{ boxShadow: `0 0 28px ${s.glow}` }}>
                <span className="font-bold text-xl" style={{ fontFamily: "'Space Grotesk',sans-serif", color: s.color }}>
                  {s.num}
                </span>
              </div>

              <h3 className="font-semibold text-slate-100 mb-2"
                style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16 }}>
                {s.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-[220px]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}