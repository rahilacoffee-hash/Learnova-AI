export default function About() {
  const stats = [
    { num: "10x", label: "Faster revision" },
    { num: "5+", label: "AI-powered tools" },
    { num: "100%", label: "Based on your notes" },
    { num: "Free", label: "To get started" },
  ];

  const team = [
    {
      initials: "FG",
      name: "Fred Abraham",
      role: "Founder & Frontend Developer",
      grad: "linear-gradient(135deg,#045919,#0000)",
      bio: "Built LearnOva AI  to help students study smarter using the power of AI.",
    },

    {
      initials: "GJ",
      name: "Glory Judah Garuba",
      role: "Founder & Backend Developer",
      grad: "linear-gradient(135deg,#540303,#260000)",
      bio: "Built LearnOva AI  to help students study smarter using the power of AI.",
    },
  ];

  return (
    <section
      id="about"
      className="relative bg-[#080B14] py-28 px-6 overflow-hidden"
    >
      {/* grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      {/* left glow */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse,rgba(99,102,241,0.10) 0%,transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* header */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-4">
            About
          </p>
          <h2
            className="font-bold text-slate-100 leading-tight mb-4"
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(28px,4vw,52px)",
              letterSpacing: "-1.5px",
            }}
          >
            Built by a student,
            <br />
            <span
              style={{
                background: "linear-gradient(90deg,#6366F1,#22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              for every student.
            </span>
          </h2>
          <p
            className="text-slate-400 max-w-lg mx-auto"
            style={{ fontSize: "clamp(15px,1.4vw,17px)" }}
          >
            LearnOva AI was born from one frustration — spending more time
            organising notes than actually studying. We built the tool we always
            wished we had.
          </p>
        </div>

        {/* two col — story + stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          {/* story */}
          <div className="rounded-2xl border border-slate-700/50 bg-[#0E1220] p-8 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(99,102,241,0.5),transparent)",
              }}
            />
            <div className="text-3xl mb-4">🎓</div>
            <h3
              className="font-bold text-slate-100 text-xl mb-4"
              style={{ fontFamily: "'Space Grotesk',sans-serif" }}
            >
              Our Story
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              LearnOva AI started as a Team project. The
              idea was simple — what if you could upload your lecture notes and
              have an AI instantly create quizzes, summaries, and flashcards
              tailored to exactly what you're studying?
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              What started as a project  became something much bigger.
              Students who tried it started using it every day. The feedback was
              clear — people needed this.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Today, LearnOva AI is built and maintained under the{" "}
              <span className="text-indigo-400 font-medium">BYTECODE</span>{" "}
              brand — with a mission to make intelligent studying accessible to
              every student, everywhere.
            </p>
          </div>

          {/* stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-slate-700/50 bg-[#0E1220] p-6 text-center group hover:border-indigo-500/40 transition-all duration-300 relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,rgba(99,102,241,0.5),transparent)",
                  }}
                />
                <div
                  className="font-bold text-4xl mb-2"
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    background: "linear-gradient(135deg,#6366F1,#22D3EE)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.num}
                </div>
                <div className="text-slate-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* mission banner */}
        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-8 text-center mb-16 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%,rgba(99,102,241,0.12),transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-3">
              Our Mission
            </p>
            <p
              className="text-slate-200 text-lg leading-relaxed max-w-2xl mx-auto"
              style={{ fontFamily: "'Space Grotesk',sans-serif" }}
            >
              "To help every student — regardless of their background or
              resources — study with the same intelligence as AI-powered tools
              that were once only available to the privileged few."
            </p>
          </div>
        </div>

        {/* team */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-2">
            The Team
          </p>
          <h3
            className="font-bold text-slate-100 text-2xl"
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              letterSpacing: "-0.5px",
            }}
          >
            Who built this
          </h3>
        </div>

        <div className="flex justify-center gap-5">
          {team.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-slate-700/50 bg-[#0E1220] p-8 max-w-sm w-full text-center group hover:border-indigo-500/40 transition-all duration-300 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    "linear-gradient(90deg,transparent,rgba(99,102,241,0.5),transparent)",
                }}
              />
              <div
                className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
                style={{
                  background: t.grad,
                  fontFamily: "'Space Grotesk',sans-serif",
                }}
              >
                {t.initials}
              </div>
              <h4
                className="font-bold text-slate-100 text-lg mb-1"
                style={{ fontFamily: "'Space Grotesk',sans-serif" }}
              >
                {t.name}
              </h4>
              <p className="text-indigo-400 text-xs font-medium mb-4 tracking-wide">
                {t.role}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">{t.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
