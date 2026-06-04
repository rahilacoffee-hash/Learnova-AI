import React, { useEffect, useState } from "react";
import ToggleAfter from "./ToggleAfter";
import ToggleBefore from "./ToggleBefore";
import Button from "./Button";
import { Link } from "react-router-dom";


const navLinks = [
  { href: "#", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#howitworks", label: "How it works" },
  { href: "#about", label: "About" },
];

const Navbar = () => {
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled (window.scrollY > 50)
    };

    window.addEventListener("scroll",handleScroll);

    return () => window.removeEventListener("scroll", handleScroll)
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 ${scrolled ? "glass py-3" : "bg-transparent  py-5"} transition-all duration-500  z-50`}>
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-bold tracking-tight hover:text-primary"
        >
          Learn<span className="text-primary">ova AI</span>
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
        </div>

        <div className="hidden md:block">
         <Link to="/dashboard" className="rounded-xl bg-emerald-500 px-5 py-2 text-sm font-medium text-black transition hover:bg-emrerald-400">
          Get Started
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
                onClick={() => setMobile(false) }
                className="text-lg text-muted-foreground hover:text-foreground py-2"
              >
                {link.label}
              </a>
            ))}

            <Link to="/dashboard"  className="rounded-xl bg-emerald-500 px-5 py-2 text-sm font-medium text-black transition hover:bg-emrerald-400">
          Get Started
         </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
