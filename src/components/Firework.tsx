import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  speed: number;
  opacity: number;
}

export const Firework = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const createFirework = () => {
      const x = Math.random() * 100;
      const y = Math.random() * 50 + 10;
      const colors = ["#FFD700", "#FF6B6B", "#FF8C00", "#FFE4B5", "#FFA500"];
      const newParticles: Particle[] = [];

      for (let i = 0; i < 12; i++) {
        newParticles.push({
          id: Date.now() + i,
          x,
          y,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 4 + 2,
          angle: (i * 30) * (Math.PI / 180),
          speed: Math.random() * 2 + 1,
          opacity: 1,
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
      }, 1500);
    };

    const interval = setInterval(createFirework, 2000);
    createFirework();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-ping"
          style={{
            left: `${particle.x + Math.cos(particle.angle) * particle.speed * 10}%`,
            top: `${particle.y + Math.sin(particle.angle) * particle.speed * 10}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
};
