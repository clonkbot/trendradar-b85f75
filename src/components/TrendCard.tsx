import { useState } from 'react';

interface Trend {
  id: number;
  name: string;
  category: string;
  velocity: number;
  views: string;
  timeToViral: string;
  confidence: number;
  hashtags: string[];
}

interface TrendCardProps {
  trend: Trend;
  index: number;
}

export function TrendCard({ trend, index }: TrendCardProps) {
  const [hovered, setHovered] = useState(false);

  const getVelocityColor = (v: number) => {
    if (v > 700) return '#00ff88';
    if (v > 500) return '#00ffff';
    if (v > 400) return '#ffff00';
    return '#ff6600';
  };

  return (
    <div
      className="group relative bg-[#0d0d12] border border-[#1a1a25] rounded-xl p-5 overflow-hidden transition-all duration-500 hover:border-[#ff0066]/50 hover:shadow-[0_0_60px_rgba(255,0,102,0.1)]"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'fadeSlideUp 0.6s ease-out forwards',
        opacity: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glitch effect on hover */}
      <div className={`absolute inset-0 bg-[#ff0066]/5 transition-opacity duration-200 ${hovered ? 'opacity-100' : 'opacity-0'}`} />

      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-2 py-1 bg-[#1a1a25] rounded text-[10px] text-[#666] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {trend.category}
        </span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: getVelocityColor(trend.velocity), boxShadow: `0 0 10px ${getVelocityColor(trend.velocity)}` }} />
          <span className="text-xs" style={{ color: getVelocityColor(trend.velocity), fontFamily: "'JetBrains Mono', monospace" }}>
            +{trend.velocity}%
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold mb-3 leading-tight group-hover:text-[#ff0066] transition-colors" style={{ fontFamily: "'Syne', sans-serif" }}>
        {trend.name}
      </h3>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <div className="text-[9px] text-[#444] uppercase tracking-wider mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Views</div>
          <div className="text-sm font-bold text-[#00ffff]">{trend.views}</div>
        </div>
        <div>
          <div className="text-[9px] text-[#444] uppercase tracking-wider mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Goes Viral</div>
          <div className="text-sm font-bold text-[#ffff00]">{trend.timeToViral}</div>
        </div>
        <div>
          <div className="text-[9px] text-[#444] uppercase tracking-wider mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Confidence</div>
          <div className="text-sm font-bold text-[#00ff88]">{trend.confidence}%</div>
        </div>
      </div>

      {/* Confidence bar */}
      <div className="h-1 bg-[#1a1a25] rounded-full overflow-hidden mb-4">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${trend.confidence}%`,
            background: `linear-gradient(90deg, #ff0066, #00ffff)`,
            boxShadow: '0 0 10px rgba(255,0,102,0.5)',
          }}
        />
      </div>

      {/* Hashtags */}
      <div className="flex flex-wrap gap-2">
        {trend.hashtags.map((tag, i) => (
          <span
            key={i}
            className="text-[10px] text-[#00ffff]/70 hover:text-[#00ffff] transition-colors cursor-pointer"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Scan line effect */}
      <div
        className={`absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00ffff]/30 to-transparent transition-opacity ${hovered ? 'opacity-100' : 'opacity-0'}`}
        style={{
          top: hovered ? '100%' : '0%',
          animation: hovered ? 'scanDown 1s linear infinite' : 'none',
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ff0066]/30 rounded-tl-xl" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00ffff]/30 rounded-br-xl" />

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scanDown {
          from { top: 0; }
          to { top: 100%; }
        }
      `}</style>
    </div>
  );
}