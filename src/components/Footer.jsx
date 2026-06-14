import {
  BarChart2,
  Brain,
  FileText,
  LayoutGrid,
  MessageCircle,
} from "lucide-react";
import { BiLogoGithub, BiLogoLinkedin, BiLogoTwitter } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Footer() {
  const quickLinks = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "About", href: "#about" },
    { label: "Reviews", href: "#testimonials" },
  ];

  const tools = [
    { icon: FileText, label: "Summaries", href: "#features" },
    { icon: Brain, label: "AI Quiz", href: "#features" },
    { icon: LayoutGrid, label: "Flashcards", href: "#features" },
    { icon: MessageCircle, label: "AI Chat", href: "#features" },
    { icon: BarChart2, label: "Dashboard", href: "#features" },
  ];

  const account = [
    { label: "Sign in", href: "/login" },
    { label: "Create account", href: "/register" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Profile", href: "/profile" },
  ];

  return (
    <footer className="relative bg-[#0A0D1A] border-t border-slate-700/40 overflow-hidden">
      {/* grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.03) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      {/* top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[180px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse,rgba(99,102,241,0.08) 0%,transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-slate-700/30">
          {/* brand col */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="font-bold text-xl text-slate-100 inline-block mb-4"
              style={{ fontFamily: "'Space Grotesk',sans-serif" }}
            >
              Learn<span className="text-indigo-400">ova</span> AI
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              AI-powered study tools built for students who want to study
              smarter — not longer.
            </p>

            {/* social */}
            <div className="flex gap-3">
              {[
                {
                  icon: BiLogoGithub,
                  href: "https://github.com",
                  label: "GitHub",
                },
                {
                  icon: BiLogoTwitter,
                  href: "https://twitter.com",
                  label: "Twitter",
                },
                {
                  icon: BiLogoLinkedin,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-slate-700/60 bg-slate-800/40 flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/40 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* quick links */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-5">
              Quick links
            </p>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-indigo-500/0 group-hover:bg-indigo-400 transition-all duration-200" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* tools */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-5">
              Tools
            </p>
            <ul className="flex flex-col gap-3">
              {tools.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                  >
                    <Icon
                      size={13}
                      className="text-slate-600 group-hover:text-indigo-400 transition-colors"
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* account */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-5">
              Account
            </p>
            <ul className="flex flex-col gap-3">
              {account.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-indigo-500/0 group-hover:bg-indigo-400 transition-all duration-200" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* cta pill */}
            <Link
              to="/register"
              className="inline-flex items-center gap-2 mt-6 px-4 py-2.5 rounded-xl text-xs font-semibold text-white transition-all hover:-translate-y-px"
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                background: "linear-gradient(135deg,#6366F1,#4F46E5)",
                boxShadow: "0 0 20px rgba(99,102,241,0.3)",
              }}
            >
              Get started free →
            </Link>
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="text-xs text-slate-600">
            © 2026 LearnOva AI. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Designed & built by{" "}
            <span className="text-indigo-400 font-medium">BYTECODE</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
