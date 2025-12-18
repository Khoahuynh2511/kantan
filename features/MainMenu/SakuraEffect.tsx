'use client';
import { useEffect, useState, useCallback } from 'react';

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  swayAmount: number;
}

const SakuraEffect = ({ count = 30 }: { count?: number }) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  const createPetal = useCallback((id: number): Petal => {
    return {
      id,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 8,
      size: 8 + Math.random() * 12,
      rotation: Math.random() * 360,
      swayAmount: 20 + Math.random() * 40
    };
  }, []);

  useEffect(() => {
    const initialPetals = Array.from({ length: count }, (_, i) => createPetal(i));
    setPetals(initialPetals);
  }, [count, createPetal]);

  return (
    <>
      <style>{`
        @keyframes sakura-fall {
          0% {
            transform: translateY(-10vh) translateX(0) rotate(0deg);
            opacity: 1;
          }
          25% {
            transform: translateY(22vh) translateX(var(--sway)) rotate(90deg);
          }
          50% {
            transform: translateY(50vh) translateX(calc(var(--sway) * -0.5)) rotate(180deg);
          }
          75% {
            transform: translateY(75vh) translateX(var(--sway)) rotate(270deg);
          }
          100% {
            transform: translateY(110vh) translateX(0) rotate(360deg);
            opacity: 0.3;
          }
        }

        .sakura-petal {
          position: absolute;
          pointer-events: none;
          animation: sakura-fall linear infinite;
          will-change: transform;
        }

        .sakura-petal::before {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #ffb7c5 0%, #ff69b4 50%, #ffb7c5 100%);
          border-radius: 50% 0 50% 50%;
          box-shadow: 0 0 10px rgba(255, 182, 193, 0.5);
        }
      `}</style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="sakura-petal"
            style={{
              left: `${petal.x}%`,
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
              '--sway': `${petal.swayAmount}px`
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
};

export default SakuraEffect;
