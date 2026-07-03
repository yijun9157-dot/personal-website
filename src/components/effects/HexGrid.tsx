"use client";

import { useRef, useEffect } from "react";

export default function HexGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const hexSize = 28;
    const hexWidth = hexSize * Math.sqrt(3);
    const hexHeight = hexSize * 2;
    let offset = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    function drawHex(x: number, y: number, alpha: number) {
      if (!ctx) return;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const hx = x + hexSize * Math.cos(angle);
        const hy = y + hexSize * Math.sin(angle);
        i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }

    function drawGrid() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / hexWidth) + 2;
      const rows = Math.ceil(canvas.height / (hexHeight * 0.75)) + 2;

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * hexWidth + (row % 2 === 0 ? 0 : hexWidth / 2);
          const y = row * hexHeight * 0.75;

          // pulse alpha based on position + time
          const dist = Math.sqrt(
            (x - canvas.width / 2) ** 2 + (y - canvas.height / 2) ** 2
          );
          const maxDist = Math.sqrt(
            (canvas.width / 2) ** 2 + (canvas.height / 2) ** 2
          );
          const centerFactor = 1 - dist / maxDist;
          const pulse = Math.sin(dist * 0.01 + offset) * 0.3 + 0.7;
          const alpha = Math.max(0.01, pulse * centerFactor * 0.08);

          drawHex(x, y, alpha);
        }
      }
    }

    function animate() {
      offset += 0.005;
      drawGrid();
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[0]"
      aria-hidden="true"
    />
  );
}
