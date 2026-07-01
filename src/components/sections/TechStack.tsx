"use client";

import { motion, useReducedMotion } from "motion/react";

const tools = [
  "ComfyUI",
  "Stable Diffusion",
  "Midjourney",
  "DALL-E",
  "Runway",
  "Pika",
  "Suno AI",
  "Remotion",
  "Three.js",
  "Next.js",
  "Python",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Figma",
];

export default function TechStack() {
  const reduce = useReducedMotion();

  return (
    <section id="tech" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
        >
          技术栈
        </motion.h2>
        <p className="text-text-muted mb-16 max-w-xl mx-auto">
          AI 工具 × 开发框架，这是我的创作武器库
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {tools.map((tool, i) => (
            <motion.span
              key={tool}
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ scale: 1.08, borderColor: "rgba(124,58,237,0.6)" }}
              className="px-5 py-2.5 rounded-full bg-surface border border-border text-text-muted hover:text-text hover:bg-surface-hover transition-all duration-300 text-sm font-medium cursor-default"
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
