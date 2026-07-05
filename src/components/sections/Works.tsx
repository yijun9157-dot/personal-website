"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { works, type Category } from "@/data/works";
import FilterBar from "@/components/ui/FilterBar";
import WorkCard from "@/components/ui/WorkCard";

export default function Works() {
  const [active, setActive] = useState<Category>("全部");
  const reduce = useReducedMotion();
  const filtered = active === "全部" ? works : works.filter((w) => w.category === active);

  return (
    <section id="works" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-center text-gold-light"
        >
          建造记录
        </motion.h2>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-light to-transparent mx-auto mb-4" />
        <p className="text-text-muted text-center mb-12 max-w-xl mx-auto">
          每一次生成都是一次建造，每一帧都是编译的结果
        </p>
        <FilterBar active={active} onSelect={setActive} />
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-text-muted">
            <p className="text-lg mb-2 text-gold-light">✦ 待建造 ✦</p>
            <p className="text-sm">在 src/data/works.ts 中添加你的项目</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((work, i) => (
                <motion.div key={work.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
                  <WorkCard work={work} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
