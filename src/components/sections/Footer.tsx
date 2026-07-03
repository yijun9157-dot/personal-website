"use client";

import { motion, useReducedMotion } from "motion/react";

const socials = [
  { label: "GitHub", href: "#" },
  { label: "微信", href: "#" },
  { label: "Email", href: "mailto:#" },
];

export default function Footer() {
  const reduce = useReducedMotion();

  return (
    <footer id="contact" className="relative py-24 px-6 border-t border-gold-border/30">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-gold-light"
        >
          建立联系
        </motion.h2>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-light to-transparent mx-auto mb-4" />
        <p className="text-text-muted mb-10 max-w-md mx-auto">
          有 AI 探险计划？发出信号
        </p>

        <motion.a
          href="mailto:#"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-glow text-bg font-medium px-10 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] mb-16"
        >
          发送信号
        </motion.a>

        <div className="flex items-center justify-center gap-8 mb-8">
          {socials.map((s) => (
            <a key={s.label} href={s.href} className="text-text-muted hover:text-gold-light transition-colors duration-300 text-sm">
              {s.label}
            </a>
          ))}
        </div>

        <p className="text-text-muted text-xs">沉没于深渊 · 以 AI 之力重建</p>
      </div>
    </footer>
  );
}
