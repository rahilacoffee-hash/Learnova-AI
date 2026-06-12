import { MdUploadFile, MdQuiz } from "react-icons/md";
import { GiStabbedNote } from "react-icons/gi";
import { IoChatboxOutline } from "react-icons/io5";
import ScrollStack, { ScrollStackItem } from "../layouts/ScrollStack";

const highlights = [
  {
    icon: MdUploadFile,
    title: "Upload Notes",
    description: "Upload PDF or TXT files and extract content instantly.",
    gradient: "from-blue-600 via-blue-500 to-indigo-600",
    accent: "bg-blue-400/20",
    tag: "Step 01",
  },
  {
    icon: GiStabbedNote,
    title: "AI Summaries",
    description: "Get accurate summaries of your study materials in seconds.",
    gradient: "from-violet-600 via-purple-500 to-fuchsia-600",
    accent: "bg-violet-400/20",
    tag: "Step 02",
  },
  {
    icon: MdQuiz,
    title: "Quiz Generation",
    description: "Generate quizzes automatically from your uploaded notes.",
    gradient: "from-pink-600 via-rose-500 to-red-500",
    accent: "bg-pink-400/20",
    tag: "Step 03",
  },
  {
    icon: IoChatboxOutline,
    title: "AI Chat",
    description: "Ask questions and get AI-generated answers based on your notes.",
    gradient: "from-emerald-600 via-teal-500 to-cyan-500",
    accent: "bg-emerald-400/20",
    tag: "Step 04",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020817]/80 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 px-6">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-5">
            Power Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Everything you need to{" "}
            <span className="font-serif italic font-normal bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              study smarter.
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 text-base">
            One platform. Four powerful tools. Zero wasted study time.
          </p>
        </div>

        {/* Scroll Stack */}
        <div className="w-full max-w-3xl mx-auto h-screen px-6">
          <ScrollStack
            className="scroll-stack-hide-bar"
            itemDistance={180}
            stackPosition="18%"
            baseScale={0.88}
            itemStackDistance={28}
            rotationAmount={0}
            blurAmount={1.5}
          >
            {highlights.map((feature, idx) => {
              let Icon = feature.icon;
              return (
                <ScrollStackItem
                  key={idx}
                  itemClassName={`bg-gradient-to-br ${feature.gradient} border border-white/10`}
                >
                  {/* Top row: tag + icon */}
                  <div className="flex items-start justify-between mb-8">
                    <span className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ${feature.accent} text-white/70`}>
                      {feature.tag}
                    </span>
                    <div className={`w-14 h-14 rounded-2xl ${feature.accent} flex items-center justify-center`}>
                      <Icon className="text-3xl text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-auto">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 text-base leading-relaxed max-w-sm">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom decorative line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-b-[40px]" />
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
};

export default Features;