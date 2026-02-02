import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
}

export function GlitchText({ text }: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block mr-3">
      <span className={`relative z-10 ${glitching ? 'animate-glitch' : ''}`}>
        {text}
      </span>
      {glitching && (
        <>
          <span className="absolute top-0 left-0 text-[#00ffff] z-0 animate-glitch-1" aria-hidden="true">
            {text}
          </span>
          <span className="absolute top-0 left-0 text-[#ff0066] z-0 animate-glitch-2" aria-hidden="true">
            {text}
          </span>
        </>
      )}
      <style>{`
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); clip-path: inset(20% 0 60% 0); }
          20% { transform: translate(-3px, 0); clip-path: inset(30% 0 50% 0); }
          40% { transform: translate(3px, 0); clip-path: inset(10% 0 70% 0); }
          60% { transform: translate(-3px, 0); clip-path: inset(40% 0 40% 0); }
          80% { transform: translate(3px, 0); clip-path: inset(50% 0 30% 0); }
        }
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); clip-path: inset(60% 0 20% 0); }
          20% { transform: translate(3px, 0); clip-path: inset(70% 0 10% 0); }
          40% { transform: translate(-3px, 0); clip-path: inset(50% 0 30% 0); }
          60% { transform: translate(3px, 0); clip-path: inset(80% 0 5% 0); }
          80% { transform: translate(-3px, 0); clip-path: inset(40% 0 40% 0); }
        }
        .animate-glitch {
          animation: glitch 0.2s ease-in-out;
        }
        .animate-glitch-1 {
          animation: glitch-1 0.2s ease-in-out;
        }
        .animate-glitch-2 {
          animation: glitch-2 0.2s ease-in-out;
        }
      `}</style>
    </span>
  );
}