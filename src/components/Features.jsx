import React, { useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
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
    description:
      "Generate quizzes automatically from your uploaded notes.",
  },
  {
    icon: IoChatboxOutline,
    title: "AI Chat",
    description:
      "Ask questions and get AI-generated answers based on your notes.",
  },
];

const Features = () => {
  const [activeTab, setActiveTab] = useState(0);

  const next = () => {
    setActiveTab((prev) => (prev + 1) % highlights.length);
  };

  const prevs = () => {
    setActiveTab(
      (prev) => (prev - 1 + highlights.length) % highlights.length
    );
  };

  const ActiveIcon = highlights[activeTab].icon;

  return (
    <section id="features" className="py-32 relative overflow-hidden ">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[#020817] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Power Features for Better Learning
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Everything you need to study smarter,
            <span className="font-serif italic font-normal text-white">
              {" "}
              all in one place.
            </span>
          </h2>
        </div>

        {/* Feature Card */}
        <div className="max-w-4xl mx-auto">
          <div className="glass p-8 md:p-12 rounded-3xl glow-border animate-fade-in animation-delay-200">
            <div className="flex flex-col items-center text-center">
              {/* Dynamic Icon */}
              <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <ActiveIcon className="text-5xl text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-secondary-foreground">
                {highlights[activeTab].title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground max-w-lg text-lg">
                {highlights[activeTab].description}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition"
              onClick={prevs}
            >
              <BiLeftArrow size={20} />
            </button>

            <div className="flex gap-2">
              {highlights.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeTab
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <button
              className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition"
              onClick={next}
            >
              <BiRightArrow size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;