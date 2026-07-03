"use client";

import { useRef, useEffect } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cw = canvas.width;
    let ch = canvas.height;
    let animId: number;
    const particles: Firefly[] = [];
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cw = canvas.width;
      ch = canvas.height;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    class Firefly {
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; pulsePhase: number; pulseSpeed: number; glowColor: string;
      constructor() {
        this.x = Math.random() * cw;
        this.y = Math.random() * ch;
        this.vx = (Math.random() - 0.5) * 0.12;
        this.vy = (Math.random() - 0.5) * 0.12 - 0.04;
        this.size = Math.random() * 2.2 + 0.6;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.006 + Math.random() * 0.018;
        const colors = [
          "6, 182, 212", "34, 211, 238", "45, 212, 191",
          "240, 192, 64", "249, 115, 22", "100, 200, 220",
        ];
        this.glowColor = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 0;
      }
      update() {
        this.pulsePhase += this.pulseSpeed;
        this.alpha = 0.2 + Math.sin(this.pulsePhase) * 0.35;
        this.x += this.vx + Math.sin(this.pulsePhase * 2) * 0.1;
        this.y += this.vy;
        const dx = mouse.x - this.x, dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) { this.x -= (dx / dist) * 0.25; this.y -= (dy / dist) * 0.25; }
        if (this.x < -20) this.x = cw + 20;
        if (this.x > cw + 20) this.x = -20;
        if (this.y < -20) this.y = ch + 20;
        if (this.y > ch + 20) this.y = -20;
      }
      draw() {
        if (!ctx) return;
        const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 8);
        glow.addColorStop(0, `rgba(${this.glowColor}, ${this.alpha})`);
        glow.addColorStop(0.3, `rgba(${this.glowColor}, ${this.alpha * 0.3})`);
        glow.addColorStop(1, `rgba(${this.glowColor}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha + 0.2})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 55; i++) particles.push(new Firefly());

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, cw, ch);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />;
}
