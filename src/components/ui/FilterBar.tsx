"use client";

import { motion } from "motion/react";
import { categories, type Category } from "@/data/works";

interface Props { active: Category; onSelect: (cat: Category) => void; }

export default function FilterBar({ active, onSelect }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          onClick={() => onSelect(cat)}
          whileTap={{ scale: 0.95 }}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            active === cat
              ? "bg-accent text-bg shadow-[0_0_18px_rgba(34,211,238,0.3)]"
              : "bg-surface hover:bg-surface-hover text-text-muted hover:text-gold-light border border-border"
          }`}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  );
}
