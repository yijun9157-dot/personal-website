"use client";

import { useRef, useEffect } from "react";

export default function SonarRings() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const pulses: Pulse[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Pulse {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      speed: number;
      delay: number;
      elapsed: number;
      constructor() {
        // random position but biased toward lower portion of screen
        this.x = Math.random() * canvas.width;
        this.y = canvas.height * 0.3 + Math.random() * canvas.height * 0.7;
        this.maxRadius = 80 + Math.random() * 180;
        this.radius = 0;
        this.alpha = 0;
        this.speed = 0.3 + Math.random() * 0.6;
        this.delay = Math.random() * 3000;
        this.elapsed = 0;
      }
      update(dt: number) {
        this.elapsed += dt;
        if (this.elapsed < this.delay) return;
        const t = (this.elapsed - this.delay) * this.speed;
        this.radius = t % this.maxRadius;
        this.alpha = 0.15 * (1 - this.radius / this.maxRadius);
      }
      draw() {
        if (!ctx || this.alpha <= 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34, 211, 238, ${this.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // inner echo ring
        if (this.radius > 15) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 0.7, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(34, 211, 238, ${this.alpha * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height * 0.3 + Math.random() * canvas.height * 0.7;
        this.maxRadius = 80 + Math.random() * 180;
        this.speed = 0.3 + Math.random() * 0.6;
        this.delay = 1000 + Math.random() * 4000;
        this.elapsed = 0;
      }
    }

    for (let i = 0; i < 6; i++) pulses.push(new Pulse());

    let last = performance.now();
    function animate(now: number) {
      const dt = now - last;
      last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pulses.forEach((p) => {
        p.update(dt);
        p.draw();
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

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
