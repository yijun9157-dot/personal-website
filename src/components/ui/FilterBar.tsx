"use client";

import { motion } from "motion/react";
import { categories, type Category } from "@/data/works";

interface Props {
  active: Category;
  onSelect: (cat: Category) => void;
}

export default function FilterBar({ active, onSelect }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          onClick={() => onSelect(cat)}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            active === cat
              ? "bg-accent text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]"
              : "bg-surface hover:bg-surface-hover text-text-muted hover:text-text border border-border"
          }`}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  );
}
