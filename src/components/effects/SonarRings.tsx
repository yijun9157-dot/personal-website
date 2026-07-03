"use client";

import { useRef, useEffect } from "react";

export default function SonarRings() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cw = canvas.width;
    let ch = canvas.height;
    let animId: number;
    const pulses: Pulse[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cw = canvas.width;
      ch = canvas.height;
    };
    resize();
    window.addEventListener("resize", resize);

    class Pulse {
      x = 0; y = 0; radius = 0; maxRadius = 0; alpha = 0; speed = 0; delay = 0; elapsed = 0;
      constructor() {
        this.reset();
      }
      update(dt: number) {
        this.elapsed += dt;
        if (this.elapsed < this.delay) return;
        const t = (this.elapsed - this.delay) * this.speed;
        this.radius = t % this.maxRadius;
        this.alpha = 0.15 * (1 - this.radius / this.maxRadius);
      }
      reset() {
        this.x = Math.random() * cw;
        this.y = ch * 0.3 + Math.random() * ch * 0.7;
        this.maxRadius = 80 + Math.random() * 180;
        this.speed = 0.3 + Math.random() * 0.6;
        this.delay = Math.random() * 3000;
        this.elapsed = 0;
        this.radius = 0;
        this.alpha = 0;
      }
    }

    function drawPulse(p: Pulse) {
      if (p.alpha <= 0) return;
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx!.strokeStyle = `rgba(34, 211, 238, ${p.alpha})`;
      ctx!.lineWidth = 1;
      ctx!.stroke();
      if (p.radius > 15) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius * 0.7, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(34, 211, 238, ${p.alpha * 0.4})`;
        ctx!.lineWidth = 0.5;
        ctx!.stroke();
      }
    }

    for (let i = 0; i < 6; i++) pulses.push(new Pulse());

    let last = performance.now();
    function animate(now: number) {
      const dt = now - last;
      last = now;
      ctx!.clearRect(0, 0, cw, ch);
      pulses.forEach((p) => {
        p.update(dt);
        drawPulse(p);
        if (p.radius >= p.maxRadius) p.reset();
      });
      animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />;
}
