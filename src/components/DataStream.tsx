import { useEffect, useState } from 'react';

interface StreamItem {
  id: number;
  x: number;
  char: string;
  delay: number;
  duration: number;
}

export function DataStream() {
  const [streams, setStreams] = useState<StreamItem[]>([]);

  useEffect(() => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>{}[]';
    const newStreams: StreamItem[] = [];

    for (let i = 0; i < 30; i++) {
      newStreams.push({
        id: i,
        x: Math.random() * 100,
        char: chars[Math.floor(Math.random() * chars.length)],
        delay: Math.random() * 10,
        duration: 5 + Math.random() * 10,
      });
    }

    setStreams(newStreams);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {streams.map((stream) => (
        <div
          key={stream.id}
          className="absolute text-[#00ff88]/10 font-mono text-xs"
          style={{
            left: `${stream.x}%`,
            animation: `dataFall ${stream.duration}s linear ${stream.delay}s infinite`,
          }}
        >
          {stream.char}
        </div>
      ))}

      <style>{`
        @keyframes dataFall {
          0% {
            top: -20px;
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            top: 100vh;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}