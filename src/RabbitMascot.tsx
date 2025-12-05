import { useEffect, useRef, useState } from 'react';

export default function RabbitMascot() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [target, setTarget] = useState({ x: 100, y: 100 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const moveToRandomPosition = () => {
      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 80;
      setTarget({
        x: Math.random() * Math.max(maxX, 100),
        y: Math.random() * Math.max(maxY, 100)
      });
    };

    const interval = setInterval(moveToRandomPosition, 8000);
    moveToRandomPosition();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animate = () => {
      setPosition(prev => {
        const dx = target.x - prev.x;
        const dy = target.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 1) return prev;

        const speed = 0.02;
        return {
          x: prev.x + dx * speed,
          y: prev.y + dy * speed
        };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target]);

  return (
    <div
      className="rabbit-mascot fixed pointer-events-none z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '80px',
        height: '80px',
        transition: 'none'
      }}
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <linearGradient id="rabbitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#e0e0e0" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="laptopGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
          </linearGradient>
        </defs>

        <g className="rabbit-body">
          <ellipse cx="22" cy="15" rx="3" ry="8" fill="url(#rabbitGradient)" className="ear-left" />
          <ellipse cx="22" cy="14" rx="1.5" ry="5" fill="#14b8a6" opacity="0.3" className="ear-left" />

          <ellipse cx="38" cy="15" rx="3" ry="8" fill="url(#rabbitGradient)" className="ear-right" />
          <ellipse cx="38" cy="14" rx="1.5" ry="5" fill="#14b8a6" opacity="0.3" className="ear-right" />

          <ellipse cx="30" cy="28" rx="12" ry="11" fill="url(#rabbitGradient)" className="head" />

          <circle cx="26" cy="27" r="1.5" fill="#1a1a1a" className="eye-left" />
          <circle cx="34" cy="27" r="1.5" fill="#1a1a1a" className="eye-right" />

          <path d="M 29 30 L 30 31 L 31 30" stroke="#14b8a6" strokeWidth="0.8" fill="none" className="nose" />

          <ellipse cx="30" cy="45" rx="14" ry="13" fill="url(#rabbitGradient)" className="body" />

          <ellipse cx="22" cy="54" rx="4" ry="3" fill="#e0e0e0" className="arm-left" />
          <ellipse cx="38" cy="54" rx="4" ry="3" fill="#e0e0e0" className="arm-right" />

          <rect x="18" y="58" width="24" height="8" rx="2" fill="url(#laptopGlow)" className="laptop-screen" opacity="0.9" />
          <rect x="18" y="58" width="24" height="1" fill="#ffffff" opacity="0.6" />

          <rect x="16" y="66" width="28" height="3" rx="1" fill="#64748b" className="laptop-base" />
          <rect x="18" y="66" width="24" height="1" fill="#94a3b8" opacity="0.5" />
        </g>

        <g className="eyes-closed" opacity="0">
          <line x1="24" y1="27" x2="28" y2="27" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" className="eye-closed-left" />
          <line x1="32" y1="27" x2="36" y2="27" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" className="eye-closed-right" />
        </g>
      </svg>

      <style>{`
        .rabbit-mascot {
          filter: drop-shadow(0 0 12px rgba(20, 184, 166, 0.4));
        }

        .body {
          animation: breathe 3s ease-in-out infinite;
        }

        .head {
          animation: breathe 3s ease-in-out infinite 0.1s;
        }

        .ear-left {
          animation: ear-wiggle-left 4s ease-in-out infinite;
          transform-origin: 22px 20px;
        }

        .ear-right {
          animation: ear-wiggle-right 4s ease-in-out infinite 0.2s;
          transform-origin: 38px 20px;
        }

        .laptop-screen {
          animation: laptop-glow 2s ease-in-out infinite;
        }

        .eye-left, .eye-right {
          animation: blink 5s ease-in-out infinite;
        }

        .eyes-closed {
          animation: blink-show 5s ease-in-out infinite;
        }

        @keyframes breathe {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-1px);
          }
        }

        @keyframes ear-wiggle-left {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(3deg);
          }
        }

        @keyframes ear-wiggle-right {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(5deg);
          }
          75% {
            transform: rotate(-3deg);
          }
        }

        @keyframes laptop-glow {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes blink {
          0%, 92%, 100% {
            opacity: 1;
          }
          94%, 96% {
            opacity: 0;
          }
        }

        @keyframes blink-show {
          0%, 92%, 100% {
            opacity: 0;
          }
          94%, 96% {
            opacity: 1;
          }
        }

        .nose {
          animation: nose-twitch 2s ease-in-out infinite;
        }

        @keyframes nose-twitch {
          0%, 90%, 100% {
            transform: scale(1);
          }
          92%, 94% {
            transform: scale(1.15);
          }
        }
      `}</style>
    </div>
  );
}
