import { useMemo } from "react";

interface PetalConfig {
  id: number;
  left: string;
  width: string;
  height: string;
  duration: string;
  delay: string;
  driftX: string;
  driftEnd: string;
  maxOpacity: number;
}

const PETAL_COUNT = 14;

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export default function FloatingPetals() {
  const petals = useMemo<PetalConfig[]>(() => {
    return Array.from({ length: PETAL_COUNT }, (_, i) => ({
      id: i,
      left: `${randomBetween(0, 100)}%`,
      width: `${randomBetween(8, 18)}px`,
      height: `${randomBetween(10, 22)}px`,
      duration: `${randomBetween(10, 22)}s`,
      delay: `${randomBetween(0, 15)}s`,
      driftX: `${randomBetween(-80, 80)}px`,
      driftEnd: `${randomBetween(-120, 120)}px`,
      maxOpacity: randomBetween(0.25, 0.55),
    }));
  }, []);

  return (
    <div className="floating-petals-container" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="floating-petal"
          style={{
            left: p.left,
            width: p.width,
            height: p.height,
            ["--duration" as string]: p.duration,
            ["--delay" as string]: p.delay,
            ["--drift-x" as string]: p.driftX,
            ["--drift-end" as string]: p.driftEnd,
            ["--max-opacity" as string]: p.maxOpacity,
          }}
        />
      ))}
    </div>
  );
}
