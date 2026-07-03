"use client";

import { motion } from "motion/react";
import SonarRings from "@/components/effects/SonarRings";
import ParticleBackground from "@/components/effects/ParticleBackground";
import GeometricHero from "@/components/effects/GeometricHero";
import GlitchText from "@/components/effects/GlitchText";

export default function Hero() {
  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      {/* light rays from above - atlantis surface light */}
      <div
        className="absolute top-0 left-1/4 w-1/2 h-full pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(180deg, rgba(34,211,238,0.08) 0%, rgba(6,182,212,0.03) 30%, transparent 70%)",
          transform: "perspective(500px) rotateX(5deg)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-[55%] w-1/3 h-full pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(180deg, rgba(240,192,64,0.04) 0%, transparent 50%)",
          transform: "perspective(500px) rotateX(3deg) rotateY(-5deg)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      <SonarRings />
      <ParticleBackground />
      <GeometricHero />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gold-light text-sm md:text-base tracking-[0.25em] uppercase mb-6"
        >
          探索深海 · 发现未知
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <GlitchText />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-text-muted text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          潜入 AI 创造的深海，每一件作品都是沉没文明的瑰宝。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="#works"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-glow text-bg font-medium px-8 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
          >
            探索作品
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-gold-border hover:border-gold-light text-text-muted hover:text-gold-light px-8 py-3 rounded-full transition-all duration-300"
          >
            建立联系
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent z-10 pointer-events-none" />
    </section>
  );
}
