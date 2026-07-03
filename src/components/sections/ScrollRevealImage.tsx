"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export default function ScrollRevealImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Brightness: dark → bright
  const brightness = useTransform(scrollYProgress, [0, 0.25, 0.5], [0.15, 0.4, 1]);
  const saturate = useTransform(scrollYProgress, [0, 0.4], [0.3, 0.7]);
  // Blur: blurry → sharp
  const blur = useTransform(scrollYProgress, [0, 0.35], [8, 0]);
  // 3D rotateX: slight tilt
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.6], [3, 1, 0]);
  // Scale: slight zoom
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);

  // Text overlay opacity
  const textOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.25, 0.45], [40, 0]);

  return (
    <section ref={containerRef} className="relative h-[150vh]">
      <div className="sticky top-0 h-dvh flex items-center justify-center overflow-hidden">
        {/* Background gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/80 to-bg z-[1] pointer-events-none" />

        {/* Image with 3D transform */}
        <motion.div
          className="absolute inset-0 z-0"
          style={reduce ? {} : {
            filter: `brightness(${brightness.get()}) saturate(${saturate.get()}) blur(${blur.get()}px)`,
            transform: `perspective(1000px) rotateX(${rotateX.get()}deg) scale(${scale.get()})`,
          }}
        >
          <img
            src="/cave-bg.jpg"
            alt="深海洞穴 - 从深渊仰望光"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Text overlay */}
        <motion.div
          className="relative z-[2] text-center px-6"
          style={reduce ? {} : {
            opacity: textOpacity,
            y: textY,
          }}
        >
          <p className="text-gold-light text-sm tracking-[0.2em] uppercase mb-4">
            概念视觉
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4">
            <span className="text-text">深海</span>{" "}
            <span className="text-accent-glow">洞穴</span>
          </h2>
          <p className="text-text-muted text-lg max-w-lg mx-auto">
            从深渊仰望光，每一次下潜都是对未知的探索
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-gold-light/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
