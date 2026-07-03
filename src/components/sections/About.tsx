"use client";

import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

const stats = [
  { label: "深海遗物", value: 0, suffix: "+" },
  { label: "远古技艺", value: 0, suffix: "+" },
  { label: "探索年数", value: 0, suffix: " 年" },
];

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-gold-light"
        >
          关于探索者
        </motion.h2>
        <div className="w-16 h-px bg-gradient-to-r from-gold-light to-transparent mb-6" />
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-muted text-lg leading-relaxed max-w-[65ch] mb-16"
        >
          潜入 AI 的深海，打捞被遗忘的创造之力。从图像到视频，从音乐到 3D，每一件作品都是沉没文明中浮现的珍宝。
        </motion.p>

        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-mono font-bold text-accent-glow mb-2">
                {stat.value}<span className="text-2xl">{stat.suffix}</span>
              </div>
              <div className="text-text-muted text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
