export function ScanLines() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* CRT scan lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.3) 2px,
            rgba(0, 0, 0, 0.3) 4px
          )`,
        }}
      />

      {/* Moving scan line */}
      <div
        className="absolute left-0 right-0 h-[100px] opacity-[0.02]"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.1), transparent)',
          animation: 'scanMove 8s linear infinite',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <style>{`
        @keyframes scanMove {
          0% { top: -100px; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}