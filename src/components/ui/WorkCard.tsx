"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Work } from "@/data/works";

interface Props { work: Work; index: number; }

export default function WorkCard({ work, index }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative bg-surface rounded-2xl overflow-hidden transition-all duration-300"
    >
      {/* animated border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: "linear-gradient(90deg, #06b6d4, #f0c040, #22d3ee, #06b6d4)",
          backgroundSize: "300% 100%",
          animation: "borderFlow 4s linear infinite",
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* video or image */}
      <div className="relative z-[1] m-[1px] rounded-[15px] aspect-[16/9] bg-surface-hover flex items-center justify-center text-text-muted text-sm overflow-hidden">
        {work.video ? (
          <>
            <video
              src={work.video}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="metadata"
            />
            {/* click to open externally */}
            <a
              href={work.video}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center bg-bg/0 group-hover:bg-bg/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </a>
          </>
        ) : work.image ? (
          <a
            href={work.image}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <img src={work.image} alt={work.title} className="w-full h-full object-cover" />
            {/* zoom icon */}
            <div className="absolute inset-0 flex items-center justify-center bg-bg/0 group-hover:bg-bg/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
                </svg>
              </div>
            </div>
          </a>
        ) : (
          <span className="text-gold-light">✦ 待建造 ✦</span>
        )}
      </div>

      {/* hover overlay */}
      <div className="relative z-[1] m-[1px] rounded-b-[15px] absolute inset-0 bg-bg/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
        <h3 className="text-lg font-semibold mb-2 text-gold-light">{work.title}</h3>
        <p className="text-text-muted text-sm mb-4 line-clamp-3">{work.description}</p>
        <span className="text-xs px-3 py-1 rounded-full border border-accent/40 text-accent-glow">
          {work.category}
        </span>
      </div>
    </motion.div>
  );
}
