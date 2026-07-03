"use client";

import { motion, useReducedMotion } from "motion/react";

export default function ConceptImage() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden border border-gold-border/20 shadow-[0_0_60px_rgba(6,182,212,0.08)]"
        >
          <img
            src="/cave-bg.jpg"
            alt="深海洞穴 - 亚特兰蒂斯概念"
            className="w-full h-auto max-h-[70vh] object-cover"
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent pointer-events-none" />
          {/* bottom caption */}
          <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
            <p className="text-gold-light text-sm tracking-wide">概念视觉 · 深海洞穴</p>
            <p className="text-text-muted text-xs mt-1">亚特兰蒂斯 · 从深渊仰望光</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
