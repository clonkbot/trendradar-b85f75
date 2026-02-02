import { useState, useEffect } from 'react';
import { TrendCard } from './components/TrendCard';
import { GlitchText } from './components/GlitchText';
import { ScanLines } from './components/ScanLines';
import { DataStream } from './components/DataStream';

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

const mockTrends: Trend[] = [
  { id: 1, name: "Soap cutting ASMR remix", category: "ASMR", velocity: 847, views: "2.3M", timeToViral: "~4 hrs", confidence: 94, hashtags: ["#soapcutting", "#asmr", "#satisfying"] },
  { id: 2, name: "AI girlfriend breakup skits", category: "Comedy", velocity: 623, views: "890K", timeToViral: "~8 hrs", confidence: 87, hashtags: ["#ai", "#comedy", "#skit"] },
  { id: 3, name: "Subway Surfers POV runs", category: "Gaming", velocity: 512, views: "1.1M", timeToViral: "~6 hrs", confidence: 82, hashtags: ["#subwaysurfers", "#pov", "#gaming"] },
  { id: 4, name: "Capybara hot tub edits", category: "Animals", velocity: 489, views: "670K", timeToViral: "~12 hrs", confidence: 79, hashtags: ["#capybara", "#cute", "#animals"] },
  { id: 5, name: "Duolingo lore theories", category: "Education", velocity: 445, views: "540K", timeToViral: "~18 hrs", confidence: 73, hashtags: ["#duolingo", "#theory", "#learn"] },
  { id: 6, name: "Corporate gaslight tutorials", category: "Business", velocity: 398, views: "320K", timeToViral: "~24 hrs", confidence: 68, hashtags: ["#corporate", "#work", "#hustle"] },
];

function App() {
  const [loaded, setLoaded] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [trends, setTrends] = useState<Trend[]>([]);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 500);
    setTimeout(() => {
      setScanning(false);
      setTrends(mockTrends);
    }, 2000);
  }, []);

  const categories = ['ALL', 'ASMR', 'Comedy', 'Gaming', 'Animals', 'Education', 'Business'];
  const filteredTrends = activeFilter === 'ALL' ? trends : trends.filter(t => t.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden" style={{ fontFamily: "'Syne', sans-serif" }}>
      <ScanLines />
      <DataStream />

      {/* Gradient orbs */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-[#ff0066] rounded-full blur-[200px] opacity-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#00ffff] rounded-full blur-[180px] opacity-10 translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className={`mb-12 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-[#00ff88] rounded-full animate-pulse shadow-[0_0_20px_#00ff88]" />
            <span className="text-[#00ff88] text-xs tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Live Feed Active</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-4 leading-none">
            <GlitchText text="TREND" />
            <span className="text-[#ff0066]">RADAR</span>
          </h1>

          <p className="text-[#666] text-sm md:text-base max-w-xl" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Intercepting algorithm signals. Decoding viral patterns before they hit your FYP.
            <span className="text-[#00ffff] ml-2">[ BETA ACCESS ]</span>
          </p>
        </header>

        {/* Stats bar */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { label: 'TRENDS DETECTED', value: '2,847', color: '#00ff88' },
            { label: 'SCAN RADIUS', value: '48 HRS', color: '#00ffff' },
            { label: 'ACCURACY RATE', value: '94.2%', color: '#ff0066' },
            { label: 'LAST SYNC', value: 'NOW', color: '#ffff00' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#12121a] border border-[#1a1a25] rounded-lg p-4 relative overflow-hidden group hover:border-[#333] transition-colors">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <div className="text-[10px] tracking-wider text-[#444] mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{stat.label}</div>
              <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className={`flex flex-wrap gap-2 mb-8 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs tracking-wider transition-all ${
                activeFilter === cat
                  ? 'bg-[#ff0066] text-white shadow-[0_0_30px_rgba(255,0,102,0.3)]'
                  : 'bg-[#12121a] text-[#666] hover:text-white hover:bg-[#1a1a25] border border-[#1a1a25]'
              }`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Scanning state */}
        {scanning && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-32 h-32 mb-6">
              <div className="absolute inset-0 border-2 border-[#00ffff] rounded-full animate-ping opacity-20" />
              <div className="absolute inset-2 border-2 border-[#00ffff] rounded-full animate-ping opacity-30" style={{ animationDelay: '200ms' }} />
              <div className="absolute inset-4 border-2 border-[#ff0066] rounded-full animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-[#00ffff]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>SCANNING</span>
              </div>
            </div>
            <p className="text-sm text-[#444] animate-pulse" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Intercepting algorithm signals...</p>
          </div>
        )}

        {/* Trends grid */}
        {!scanning && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTrends.map((trend, i) => (
              <TrendCard key={trend.id} trend={trend} index={i} />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-[#1a1a25]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#333] text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <div className="flex items-center gap-4">
              <span className="text-[#ff0066]">TRENDRADAR</span>
              <span>v0.1.0-beta</span>
            </div>
            <div className="text-[10px] tracking-wide">
              Requested by <a href="https://twitter.com/speedrun26mil" target="_blank" rel="noopener noreferrer" className="text-[#444] hover:text-[#666] transition-colors">@speedrun26mil</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer" className="text-[#444] hover:text-[#666] transition-colors">@clonkbot</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;