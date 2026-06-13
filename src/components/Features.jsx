import { FileText, Brain, LayoutGrid, MessageCircle, BarChart2, Cloud } from "lucide-react";

const features = [
  {
    icon: FileText,
    color: "rgba(99,102,241,0.12)",
    iconColor: "#818CF8",
    title: "Smart Summaries",
    desc: "Get concise, well-structured summaries of any document. Key concepts extracted and organised automatically — no skimming required.",
  },
  {
    icon: Brain,
    color: "rgba(34,211,238,0.10)",
    iconColor: "#22D3EE",
    title: "AI Quiz Generator",
    desc: "Generate multiple-choice quizzes from your notes in seconds. Choose difficulty, get instant feedback, and track your score.",
  },
  {
    icon: LayoutGrid,
    color: "rgba(251,191,36,0.10)",
    iconColor: "#FBBF24",
    title: "Flashcard Builder",
    desc: "Automatically extract key terms and definitions as flashcards. Study with spaced repetition and track what you've mastered.",
  },
  {
    icon: MessageCircle,
    color: "rgba(52,211,153,0.10)",
    iconColor: "#34D399",
    title: "Chat With Your Notes",
    desc: "Ask questions about your material in plain English. LearnOva answers from your uploaded notes — like a tutor who read everything.",
  },
  {
    icon: BarChart2,
    color: "rgba(239,68,68,0.10)",
    iconColor: "#F87171",
    title: "Progress Dashboard",
    desc: "See your quiz scores, study streaks, and activity over time. Know exactly where you're strong and where to focus next.",
  },
  {
    icon: Cloud,
    color: "rgba(167,139,250,0.10)",
    iconColor: "#A78BFA",
    title: "Upload notes, Anywhere",
    desc: "Upload PDFs, or plain text. Your notes and generated content are saved and accessible on any device.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative bg-[#0E1220] py-28 px-6 overflow-hidden">

      {/* subtle grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.03) 1px,transparent 1px)",
          backgroundSize: "52px 52px"
        }}
      />

      {/* glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse,rgba(99,102,241,0.10) 0%,transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-4">Features</p>
          <h2 className="font-bold text-slate-100 leading-tight mb-4"
            style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-1.5px" }}>
            Everything you need to<br />ace any subject
          </h2>
          <p className="text-slate-400 max-w-md mx-auto" style={{ fontSize: "clamp(15px,1.4vw,17px)" }}>
            One upload. Five AI-powered tools that turn your notes into a complete study system.
          </p>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => {
            let Icon = f.icon;
            return (
              <div key={f.title}
                className="relative group rounded-2xl border border-slate-700/50 bg-[#131929] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 overflow-hidden cursor-default">

                {/* top shine on hover */}
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.6),transparent)" }}
                />

                {/* icon */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: f.color }}>
                  <Icon size={20} style={{ color: f.iconColor }} />
                </div>

                <h3 className="font-semibold text-slate-100 mb-2 text-base"
                  style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                  {f.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}