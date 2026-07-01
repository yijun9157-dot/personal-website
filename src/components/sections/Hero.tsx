"use client";

import { motion } from "motion/react";
import ParticleBackground from "@/components/effects/ParticleBackground";

export default function Hero() {
  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-accent-glow text-sm md:text-base tracking-[0.2em] uppercase mb-6"
        >
          AI Creator Portfolio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-6"
        >
          <span className="text-text">AI 创作</span>
          <br />
          <span className="text-accent-glow">重新定义可能</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-text-muted text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          用 AI 探索创意的边界，图像、视频、音乐、3D，每一次生成都是一次新的可能。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="#works"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-glow text-white font-medium px-8 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
          >
            浏览作品
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-border hover:border-accent text-text-muted hover:text-text px-8 py-3 rounded-full transition-all duration-300"
          >
            联系我
          </a>
        </motion.div>
      </div>

      {/* bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent z-10 pointer-events-none" />
    </section>
  );
}
