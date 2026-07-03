"use client";

export default function CursorGlow() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        background:
          "radial-gradient(700px circle at var(--x, 50%) var(--y, 50%), rgba(6,182,212,0.06), rgba(34,211,238,0.03) 40%, transparent 70%)",
      }}
      ref={(el) => {
        if (!el || typeof window === "undefined") return;
        const onMove = (e: MouseEvent) => {
          el.style.setProperty("--x", `${e.clientX}px`);
          el.style.setProperty("--y", `${e.clientY}px`);
        };
        window.addEventListener("mousemove", onMove);
      }}
      aria-hidden="true"
    />
  );
}
