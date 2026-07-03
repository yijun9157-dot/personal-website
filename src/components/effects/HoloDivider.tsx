"use client";

export default function HoloDivider() {
  const dots = Array.from({ length: 5 });

  return (
    <div className="relative flex items-center justify-center py-4">
      {/* golden glow line */}
      <div className="absolute left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gold-light to-transparent opacity-50" />

      {/* ornate dots - atlantean pillars */}
      <div className="relative flex items-center gap-12">
        {dots.map((_, i) => (
          <div key={i} className="relative flex flex-col items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-gold-light shadow-[0_0_8px_rgba(240,192,64,0.8)] animate-pulse" />
            <div className="w-px h-3 bg-gradient-to-b from-gold-light/50 to-transparent" />
            {/* center diamond */}
            <div
              className="w-1.5 h-1.5 rotate-45 bg-accent-glow shadow-[0_0_6px_rgba(34,211,238,0.6)]"
              style={{ animation: "float 3s ease-in-out infinite", animationDelay: `${i * 0.3}s` }}
            />
            <div className="w-px h-3 bg-gradient-to-t from-gold-light/50 to-transparent" />
            <div className="w-1 h-1 rounded-full bg-gold-light shadow-[0_0_8px_rgba(240,192,64,0.8)] animate-pulse" />
          </div>
        ))}
      </div>

      <div
        className="absolute left-0 right-0 h-px bg-accent-glow/20"
        style={{ animation: "dividerScan 3s ease-in-out infinite" }}
      />
    </div>
  );
}
