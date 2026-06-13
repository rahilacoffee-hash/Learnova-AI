const testimonials = [
  {
    stars: 3,
    text: "I uploaded my entire semester of biochem notes and had a full quiz ready in under two minutes. Scored 87% on my exam — highest I've ever gotten.",
    name: "Amara Okonkwo",
    role: "Medical student, University of Lagos",
    initials: "AO",
    grad: "linear-gradient(135deg,#6366F1,#8B5CF6)",
  },
  {
    stars: 5,
    text: "The AI chat feature is insane. I asked it to explain a concept from my own lecture notes in simpler terms and it did it perfectly. It's like having a TA on call.",
    name: "Kelvin Musa",
    role: "Computer Science, ABU Zaria",
    initials: "KM",
    grad: "linear-gradient(135deg,#22D3EE,#6366F1)",
  },
  {
    stars: 4,
    text: "Flashcards used to take me hours to make manually. Now I upload my notes and they're auto-generated in seconds. I use it every day before exams.",
    name: "Fatima Ibrahim",
    role: "Law student, UNIABUJA",
    initials: "FI",
    grad: "linear-gradient(135deg,#F59E0B,#EF4444)",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative bg-[#0E1220] py-28 px-6 overflow-hidden">

      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.03) 1px,transparent 1px)",
          backgroundSize: "52px 52px"
        }}
      />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse,rgba(99,102,241,0.08) 0%,transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-4">Reviews</p>
          <h2 className="font-bold text-slate-100 leading-tight mb-4"
            style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-1.5px" }}>
            Students who stopped<br />pulling all-nighters
          </h2>
          <p className="text-slate-400 max-w-md mx-auto" style={{ fontSize: "clamp(15px,1.4vw,17px)" }}>
            Real feedback from people who study smarter with LearnOva every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name}
              className="relative rounded-2xl border border-slate-700/50 bg-[#131929] p-7 flex flex-col group hover:border-indigo-500/30 transition-all duration-300">

              {/* top shine */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.5),transparent)" }}
              />

              {/* stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>

              {/* big quote */}
              <div className="text-4xl leading-none font-bold text-indigo-500/40 mb-3"
                style={{ fontFamily: "'Space Grotesk',sans-serif" }}>"</div>

              <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-6">{t.text}</p>

              {/* author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ background: t.grad }}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-100"
                    style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}