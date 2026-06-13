

export default function Footer() {
  return (
    <section id="cta" className="relative bg-[#080B14] py-32 px-6 overflow-hidden text-center">

      {/* grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px)",
          backgroundSize: "52px 52px"
        }}
      />

      {/* center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none rounded-full"
        style={{ background: "radial-gradient(ellipse,rgba(99,102,241,0.16) 0%,rgba(34,211,238,0.05) 50%,transparent 70%)" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-6">Ready?</p>

        <h2 className="font-bold text-slate-100 leading-tight mb-5"
          style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(32px,5vw,62px)", letterSpacing: "-2px" }}>
          Your notes deserve<br />
          <span style={{
            background: "linear-gradient(90deg,#6366F1 0%,#22D3EE 50%,#A78BFA 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            better tools.
          </span>
        </h2>

        <p className="text-slate-400 mb-10 max-w-md mx-auto" style={{ fontSize: "clamp(15px,1.4vw,17px)" }}>
          Join students who already study smarter with LearnOva AI. Free to start — no credit card needed.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <a href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              background: "linear-gradient(135deg,#6366F1,#4F46E5)",
              boxShadow: "0 0 48px rgba(99,102,241,0.45)"
            }}>
            Create free account →
          </a>
          <a href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-slate-200 text-sm border border-slate-700/60 hover:border-indigo-500/50 hover:bg-indigo-500/7 transition-all"
            style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
            Sign in
          </a>
        </div>
      </div>
    </section>
  );
}
