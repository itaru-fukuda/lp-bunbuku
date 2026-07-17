"use client";

import { useEffect, useState } from "react";

type Particle = {
  id: number;
  type: "steam" | "leaf" | "sakura";
  left: string;
  size: string;
  delay: string;
  duration: string;
  drift: string;
  rotate?: string;
  opacity?: number;
};

export default function SteamBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate steam and falling elements only on client-side
    const isSmallScreen = window.matchMedia("(max-width: 640px)").matches;
    const particleCount = isSmallScreen ? 10 : 16;
    const sizeScale = isSmallScreen ? 0.75 : 1;
    const generated: Particle[] = Array.from({ length: particleCount }).map((_, i) => {
      const typeVal = i % 5 === 0 ? "steam" : i % 5 === 1 || i % 5 === 2 ? "leaf" : "sakura";
      const sizeVal = typeVal === "steam" 
        ? `${(60 + Math.random() * 80) * sizeScale}px` 
        : typeVal === "leaf" 
        ? `${(18 + Math.random() * 14) * sizeScale}px` 
        : `${(12 + Math.random() * 12) * sizeScale}px`;
      
      const leftVal = Math.random() * 100; // 0% to 100%
      const delayVal = Math.random() * 12; // 0s to 12s delay
      const durationVal = typeVal === "steam" 
        ? 12 + Math.random() * 10 
        : 16 + Math.random() * 12; // slow drift
      
      const driftVal = -150 + Math.random() * 300; // -150px to 150px drift
      const rotateVal = `${180 + Math.random() * 360}deg`;
      const opacityVal = typeVal === "steam" ? 0.25 + Math.random() * 0.2 : 0.3 + Math.random() * 0.25;

      return {
        id: i,
        type: typeVal,
        left: `${leftVal}%`,
        size: sizeVal,
        delay: `${delayVal}s`,
        duration: `${durationVal}s`,
        drift: `${driftVal}px`,
        rotate: rotateVal,
        opacity: opacityVal,
      };
    });

    const particleTimer = window.setTimeout(() => setParticles(generated), 0);
    return () => window.clearTimeout(particleTimer);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="steam-container">
      {particles.map((p) => {
        if (p.type === "steam") {
          return (
            <div
              key={p.id}
              className="steam-particle"
              style={
                {
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                  opacity: p.opacity,
                  "--steam-drift": p.drift,
                } as React.CSSProperties
              }
            />
          );
        } else {
          return (
            <div
              key={p.id}
              className="foliage-particle select-none"
              style={
                {
                  left: p.left,
                  fontSize: p.size,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                  opacity: p.opacity,
                  "--leaf-drift": p.drift,
                  "--leaf-rotate": p.rotate,
                } as React.CSSProperties
              }
            >
              {p.type === "leaf" ? "🍂" : "🌸"}
            </div>
          );
        }
      })}
    </div>
  );
}
