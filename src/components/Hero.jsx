import React from "react";
import { TbArrowRight, TbSparkles } from "react-icons/tb";
import { GrGithub, GrInstagram } from "react-icons/gr";
import { FcDown } from "react-icons/fc";
import { BsFileText, BsTiktok } from "react-icons/bs";
import { CgMoveDown } from "react-icons/cg";
import { FaBrain, FaDownload } from "react-icons/fa";
import Button from "./Button";
import { Link } from "react-router-dom";

const skills = [
  "Learnova AI",
  "Learnova AI",
  "Learnova AI",
  "Learnova AI",
  "Learnova AI",
  "Learnova AI",
  "Learnova AI",
  "Learnova AI",
  "Learnova AI",
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#020817]">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-yellow-500/20 blur-[180px]" />

        <div className="absolute right-0 top-1/2 h-[500px] w-[500px]  rounded-full bg-emerald-500/20 blur-[180px]" />
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-event-none ">
        {[...Array(30)].map((_, i) => (
          <div
            className="absolute w-1.5 h-1.5 rounded-full opacity-60"
            style={{
              backgroundColor: "#20b2a6",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `slow-drift ${15 + Math.random() * 20}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* left */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rouned-full glass text-sm text-primary">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse " />
                AI Powered Learing Platfrom
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100">
                Study <span className="text-primary glow-text"> Smarter</span>
                <br />
                Not 
               
                <span className="font-serif italic font-normal ml-5 text-white">
                   Harder.
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
                Upload your notes and PDFs.Generate summaries,quizzes, flashcard
                and ask AI questions based on your study materials
              </p>
            </div>

            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
              <Link to="/dashboard"  className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-black transition hover:bg-emerald-400">
                Start Studying
              </Link>
            </div>

            {/* stats */}
          </div>
          {/* right */}
          <div className="flex-1">
            <div className="rounded-[32px] border border-white/5 bg-[#0b1426]/70 p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-muted-foreground">
                  Dashboard Overview
                </h3>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                  Live
                </span>
              </div>
              {/* card */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-2xl bg-slate-900/50 p-5">
                  <p className="text-slate-400 text-sm">Total Notes</p>
                  <h2 className="mt-2 text-3xl font-bold text-white">128</h2>
                  <span className="text-sm text-primary">+12%</span>
                </div>

                <div className="rounded-2xl bg-slate-900/50 p-5">
                  <p className="text-slate-400 text-sm">Quizzes</p>
                  <h2 className="mt-2 text-3xl font-bold text-white">45</h2>
                  <span className="text-sm text-primary">+8%</span>
                </div>

                <div className="rounded-2xl bg-slate-900/50 p-5">
                  <p className="text-slate-400 text-sm">Score</p>
                  <h2 className="mt-2 text-3xl font-bold text-white">86%</h2>
                  <span className="text-sm text-primary">+5%</span>
                </div>
              </div>
              {/* activity */}
              <div className="mt-8">
                <h4 className="mb-4 text-white font-medium">Recent Activity</h4>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl bg-slate-900/40 p-4">
                    <div className="flex items-center gap-3">
                      <BsFileText size={18} className="text-cyan-400" />
                      <span className="text-slate-300">Machine Learning</span>
                    </div>
                    <span className="text-slate-500 text-sm">2m ago</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-900/40 p-4">
                    <div className="flex items-center gap-3">
                      <FaBrain size={18} className="text-emerald-400" />
                      <span className="text-slate-300">AI Summary</span>
                    </div>
                    <span className="text-slate-500 text-sm">5m ago</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-900/40 p-4">
                    <div className="flex items-center gap-3">
                      <TbSparkles size={18} className="text-yellow-400" />
                      <span className="text-slate-300">Quiz Completed</span>
                    </div>
                    <span className="text-slate-500 text-sm">12m ago</span>
                  </div>
                </div>
              </div>
              {/* bottom features card */}
            </div>
          </div>
        </div>

        {/*  */}
        <div className="mt-20 animate-fade-in animation-delay-600 ">
        
          <div className="relative overflow-hidden ">
            <div className="flex animate-marquee ">
              {[...skills, ...skills].map((skill, idx) => (
                <div key={idx} className="flex-shrink-0 px-8 py-4">
                  <span className="text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors  ">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
