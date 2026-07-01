"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Work } from "@/data/works";

interface Props {
  work: Work;
  index: number;
}

export default function WorkCard({ work, index }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300"
    >
      {/* image placeholder */}
      <div className="aspect-[4/3] bg-surface-hover flex items-center justify-center text-text-muted text-sm">
        {work.image ? (
          <img src={work.image} alt={work.title} className="w-full h-full object-cover" />
        ) : (
          <span>AIGC 作品占位</span>
        )}
      </div>

      {/* overlay on hover */}
      <div className="absolute inset-0 bg-bg/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">{work.title}</h3>
        <p className="text-text-muted text-sm mb-4 line-clamp-3">{work.description}</p>
        <span className="text-xs px-3 py-1 rounded-full border border-accent/40 text-accent-glow">
          {work.category}
        </span>
      </div>
    </motion.div>
  );
}
