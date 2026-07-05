"use client";

import { motion, useReducedMotion } from "motion/react";

const stats = [
  { label: "AIGC 项目", value: 0, suffix: "+" },
  { label: "AI 工具链", value: 0, suffix: "+" },
  { label: "探索时长", value: 0, suffix: " 月" },
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
          建造者
        </motion.h2>
        <div className="w-16 h-px bg-gradient-to-r from-gold-light to-transparent mb-6" />
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-muted text-lg leading-relaxed max-w-[65ch] mb-16"
        >
          用 AI 作为创作引擎，将想象编译为现实。从静态图像到动态视频，从声音设计到三维空间 —— 每一个项目都是一次从无到有的建造。
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
