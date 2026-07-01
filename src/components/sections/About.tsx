"use client";

import { motion, useReducedMotion } from "motion/react";

const stats = [
  { label: "AIGC 作品", value: 0, suffix: "+" },
  { label: "AI 工具精通", value: 0, suffix: "+" },
  { label: "项目经验", value: 0, suffix: " 年" },
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
          className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
        >
          关于我
        </motion.h2>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-muted text-lg leading-relaxed max-w-[65ch] mb-16"
        >
          专注于 AIGC 创作与 AI 应用开发，擅长用前沿 AI 工具将创意变为现实。
          从图像生成到视频制作，从音乐创作到 3D 建模，AI 是我的画笔，想象力是唯一的边界。
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
                {stat.value}
                <span className="text-2xl">{stat.suffix}</span>
              </div>
              <div className="text-text-muted text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
