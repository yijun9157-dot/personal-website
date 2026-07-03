"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { label: "遗物", href: "#works" },
  { label: "航行", href: "#process" },
  { label: "技艺", href: "#tech" },
  { label: "信号", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-bg/90 backdrop-blur-xl border-b border-gold-border/20" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <a href="#" className="font-bold text-lg tracking-tight text-gold-light flex items-center gap-2">
          <span className="text-accent-glow">◈</span> Atlantis
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-text-muted hover:text-gold-light transition-colors duration-200 text-sm">
              {l.label}
            </a>
          ))}
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
          <span className={`block w-5 h-px bg-text transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
          <span className={`block w-5 h-px bg-text transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-text transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-bg/95 backdrop-blur-xl border-b border-gold-border/20 overflow-hidden">
            <div className="flex flex-col gap-4 px-6 py-6">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-text-muted hover:text-gold-light text-lg transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
