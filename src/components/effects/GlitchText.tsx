"use client";

import { useEffect, useState } from "react";

export default function GlitchText() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150 + Math.random() * 200);
    };
    const schedule = () => {
      const delay = 2500 + Math.random() * 4000;
      return setTimeout(() => { trigger(); schedule(); }, delay);
    };
    const timer = schedule();
    return () => clearTimeout(timer);
  }, []);

  return (
    <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
      <span className="relative inline-block">
        <span className="block text-text">AI 创作</span>
        <span
          className={`absolute inset-0 block text-gold-light transition-opacity duration-75 ${glitch ? "opacity-70" : "opacity-0"}`}
          style={{ clipPath: glitch ? "inset(20% 0 40% 0)" : "inset(0 0 0 0)", transform: glitch ? "translate(-3px, -2px)" : "none" }}
          aria-hidden="true"
        >AI 创作</span>
        <span
          className={`absolute inset-0 block text-accent-glow transition-opacity duration-75 ${glitch ? "opacity-60" : "opacity-0"}`}
          style={{ clipPath: glitch ? "inset(50% 0 10% 0)" : "inset(0 0 0 0)", transform: glitch ? "translate(3px, 3px)" : "none" }}
          aria-hidden="true"
        >AI 创作</span>
      </span>
      <br />
      <span className="relative inline-block">
        <span className="block text-gold-light">重新定义可能</span>
        <span
          className={`absolute inset-0 block text-accent-glow transition-opacity duration-75 ${glitch ? "opacity-70" : "opacity-0"}`}
          style={{ clipPath: glitch ? "inset(10% 0 60% 0)" : "inset(0 0 0 0)", transform: glitch ? "translate(3px, -2px)" : "none" }}
          aria-hidden="true"
        >重新定义可能</span>
        <span
          className={`absolute inset-0 block text-text transition-opacity duration-75 ${glitch ? "opacity-50" : "opacity-0"}`}
          style={{ clipPath: glitch ? "inset(60% 0 5% 0)" : "inset(0 0 0 0)", transform: glitch ? "translate(-4px, 3px)" : "none" }}
          aria-hidden="true"
        >重新定义可能</span>
      </span>
    </h1>
  );
}
