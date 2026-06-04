import React from "react";
import { BiCode, BiRocket, BiUser } from "react-icons/bi";
import { BsLightbulb } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { GiStabbedNote } from "react-icons/gi";
import { MdUploadFile, MdQuiz } from "react-icons/md";
import { IoChatboxOutline } from "react-icons/io5";
const highlights = [
  {
    icon: MdUploadFile,
    title: "Upload Notes",
    description: "Upload PDF or TXT files and extract content instantly.",
  },
  {
    icon: GiStabbedNote,
    title: "AI Summaries",
    description: "Get accurate summaries of your study materials.",
  },
  {
    icon: MdQuiz,
    title: "Quiz Generation",
    description: "Generate quizzes automatically from your uploaded notes.",
  },
  {
    icon: IoChatboxOutline,
    title: "AI Chat",
    description:
      "Ask questions and get AI-generated answers based on your notes.",
  },
];
const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden bg-[#020817]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* left */}
          <div className="space-y-8">
            <div className="animate-fade-in ">
              <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                About Us
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
              Building the future
              <span className="font-serif italic font-normal text-white">
                {" "}
                One componet at a time.
              </span>
            </h2>
            <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200">
              <p className="text-white/50 text-sm md:text-base leading-relaxed text-justify">
                A highly performance AI Called Learn
                <span className="text-primary">ova AI</span> that allow user to
                Upload notes or pdf, Answer quizzes ,and get Summaries about the
                note they uploaded , and the ability to ask Learnova to explain
                the note or pdf
              </p>
            </div>

            <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
              <p className="text-lg font-medium italic text-foreground">
                "Study Smarter Not Harder."
              </p>
            </div>
          </div>

          {/* right */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="glass p-6 rounded-2xl animate-fade-in animation-delay-400"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 ">{item.title}</h3>
                <p className="text-sm text-muted-foreground ">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
