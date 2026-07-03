"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { step: "01", title: "深渊凝视", desc: "潜入创意深海，捕捉灵感之光" },
  { step: "02", title: "古语编织", desc: "以 Prompt 为咒语，唤醒 AI 的造物之力" },
  { step: "03", title: "潮汐打磨", desc: "多轮迭代，潮水般反复冲刷，去芜存菁" },
  { step: "04", title: "遗物浮现", desc: "后期精炼，珍宝从深渊升向海面" },
];

export default function Process() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !wrapRef.current || !trackRef.current) return;
    const ctx = gsap.context(() => {
      const distance = trackRef.current!.scrollWidth - window.innerWidth;
      gsap.to(trackRef.current, {
        x: -distance, ease: "none",
        scrollTrigger: { trigger: wrapRef.current, start: "top top", end: () => `+=${distance}`, pin: true, scrub: 1, invalidateOnRefresh: true },
      });
    }, wrapRef);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="process" ref={wrapRef} className="relative overflow-hidden">
      <div ref={trackRef} className="flex h-dvh items-center">
        <div className="flex-shrink-0 w-[40vw] min-w-[300px] flex flex-col justify-center px-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2 text-gold-light">航行日志</h2>
          <div className="w-16 h-px bg-gradient-to-r from-gold-light to-transparent mb-4" />
          <p className="text-text-muted text-lg">从深渊到海面</p>
        </div>
        {steps.map((s) => (
          <div key={s.step} className="flex-shrink-0 w-[60vw] md:w-[40vw] lg:w-[30vw] min-w-[280px] px-6">
            <div className="bg-surface border border-gold-border/20 rounded-2xl p-8 md:p-10 h-full flex flex-col justify-center">
              <span className="text-accent-glow font-mono text-sm mb-4">{s.step}</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gold-light">{s.title}</h3>
              <p className="text-text-muted leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
        <div className="flex-shrink-0 w-[20vw]" />
      </div>
    </section>
  );
}
