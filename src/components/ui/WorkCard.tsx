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
      {/* atlantis border - teal to gold flow */}
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

      <div className="relative z-[1] m-[1px] rounded-[15px] aspect-[4/3] bg-surface-hover flex items-center justify-center text-text-muted text-sm overflow-hidden">
        {work.image ? (
          <img src={work.image} alt={work.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gold-light">✦ 深海遗物 ✦</span>
        )}
      </div>

      <div className="relative z-[1] m-[1px] rounded-b-[15px] absolute inset-0 bg-bg/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-lg font-semibold mb-2 text-gold-light">{work.title}</h3>
        <p className="text-text-muted text-sm mb-4 line-clamp-3">{work.description}</p>
        <span className="text-xs px-3 py-1 rounded-full border border-accent/40 text-accent-glow">
          {work.category}
        </span>
      </div>
    </motion.div>
  );
}
