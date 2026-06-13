import React, { useEffect, useState } from "react";
import ToggleAfter from "./ToggleAfter";
import ToggleBefore from "./ToggleBefore";
import Button from "./Button";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#howitworks", label: "How it works" },
  { href: "#about", label: "About" },
];

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");

      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");

      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 ${scrolled ? "glass py-3" : "bg-transparent  py-5"} transition-all duration-500  z-50`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-bold tracking-tight hover:text-primary"
        >
          Learn<span className="text-indigo-400 ">ova AI</span>
        </a>

        <div className=" hidden md:flex  items-center gap-1">
          <div className="glass rounded-full px-2 py-1 flex items-center gap-1 ">
            {navLinks.map((link) => (
              <a
                href={link.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-surface"
              >
                {link.label}
              </a>
            ))}
          </div>
           {/* theme toggle */}
            <div className="hidden md:block">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="
            relative
            w-18
            h-12
            rounded-full
            bg-black/5
            dark:bg-white/10
            border
            border-black/10
            dark:border-white/10
            transition-all
            duration-300
            flex
            items-center
            px-1
            overflow-hidden
            "
          >
            {/* GLOW */}

            <div
              className={`
              absolute
              inset-0
              rounded-full
              ${darkMode ? "bg-[#E11D48]/10" : "bg-primary-400/10"}
              `}
            />

            {/* SLIDER */}

            <div
              className={`
              absolute
              
              top-1
              w-9
              h-9
              rounded-full
              flex
              items-center
              justify-center
              shadow-md
              z-10
              transition-all
              duration-300
              ${
                darkMode
                  ? "translate-x-7 bg-primary"
                  : "translate-x-0 bg-white"
              }
              `}
            >
              {darkMode ? (
                <Moon className="text-white text-sm" />
              ) : (
                <Sun className="text-primary text-sm" />
              )}
            </div>
          </button>
        </div>
        </div>
       
      
        <div className="hidden md:block  ">
          <Link to="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:-translate-y-0.5"
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                background: "linear-gradient(135deg,#6366F1,#4F46E5)",
                boxShadow: "0 0 36px rgba(99,102,241,0.4)"
              }}>
              Start for free →
            </Link>
        </div>

        <button
          className="md:hidden p-2 text-foreground cursor-pointer"
          onClick={() => setMobile((prev) => !prev)}
        >
          {mobile ? <ToggleAfter size={24} /> : <ToggleBefore size={24} />}
        </button>
      </nav>
      {mobile && (
        <div className="md:hidden glass-strong animate-fade-in ">
          <div className=" container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                href={link.href}
                onClick={() => setMobile(false)}
                className="text-lg text-muted-foreground hover:text-foreground py-2"
              >
                {link.label}
              </a>
            ))}
  <div className="">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="
            relative
            w-16
            h-9
            rounded-full
            bg-black/5
            dark:bg-white/10
            border
            border-black/10
            dark:border-white/10
            transition-all
            duration-300
            flex
            items-center
            px-1
            overflow-hidden
            "
          >
            {/* GLOW */}

            <div
              className={`
              absolute
              inset-0
              rounded-full
              ${darkMode ? "bg-[#E11D48]/10" : "bg-yellow-400/10"}
              `}
            />

            {/* SLIDER */}

            <div
              className={`
              absolute
              top-1
              w-7
              h-7
              rounded-full
              flex
              items-center
              justify-center
              shadow-md
              z-10
              transition-all
              duration-300
              ${
                darkMode
                  ? "translate-x-7 bg-[#cf0e31]"
                  : "translate-x-0 bg-white"
              }
              `}
            >
              {darkMode ? (
                <Moon className="text-white text-sm" />
              ) : (
                <Sun className="text-yellow-500 text-sm" />
              )}
            </div>
          </button>
        </div>
              <Link to="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:-translate-y-0.5"
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                background: "linear-gradient(135deg,#6366F1,#4F46E5)",
                boxShadow: "0 0 36px rgba(99,102,241,0.4)"
              }}>
              Start for free →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
