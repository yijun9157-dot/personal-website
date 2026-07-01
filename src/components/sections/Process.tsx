"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { step: "01", title: "想法", desc: "捕捉灵感，定义创作方向与风格参考" },
  { step: "02", title: "Prompt", desc: "精心设计提示词，调教 AI 的输出精度" },
  { step: "03", title: "迭代", desc: "多轮优化，筛选最佳结果，微调细节" },
  { step: "04", title: "成品", desc: "后期处理 + 整合，打磨最终作品" },
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
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrapRef);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="process" ref={wrapRef} className="relative overflow-hidden">
      <div ref={trackRef} className="flex h-dvh items-center">
        {/* title card */}
        <div className="flex-shrink-0 w-[40vw] min-w-[300px] flex flex-col justify-center px-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            创作流程
          </h2>
          <p className="text-text-muted text-lg">从灵感到成品</p>
        </div>

        {/* step cards */}
        {steps.map((s) => (
          <div
            key={s.step}
            className="flex-shrink-0 w-[60vw] md:w-[40vw] lg:w-[30vw] min-w-[280px] px-6"
          >
            <div className="bg-surface border border-border rounded-2xl p-8 md:p-10 h-full flex flex-col justify-center">
              <span className="text-accent-glow font-mono text-sm mb-4">{s.step}</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{s.title}</h3>
              <p className="text-text-muted leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}

        {/* spacer at end for smooth stop */}
        <div className="flex-shrink-0 w-[20vw]" />
      </div>
    </section>
  );
}
