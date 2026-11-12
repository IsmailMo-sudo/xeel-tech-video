import type React from "react";
import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";

const PARTICLES = Array.from({ length: 46 }, (_, i) => ({
  x: random(`px-${i}`) * 1920,
  y0: random(`py-${i}`) * 1080,
  size: 1.5 + random(`ps-${i}`) * 3.5,
  speed: 0.15 + random(`pv-${i}`) * 0.55,
  phase: random(`pp-${i}`) * Math.PI * 2,
  cyan: random(`pc-${i}`) > 0.5,
}));

const orb = (
  left: number,
  top: number,
  size: number,
  color: string,
): React.CSSProperties => ({
  position: "absolute",
  left,
  top,
  width: size,
  height: size,
  borderRadius: "50%",
  background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 65%)`,
});

// Persistent animated backdrop shared by every scene.
export const GradientBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;
  const beamX = ((frame % 300) / 300) * 3200 - 700;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 120%, ${colors.bg2} 0%, ${colors.bg1} 45%, ${colors.bg0} 100%)`,
      }}
    >
      <div
        style={orb(
          1250 + Math.sin(t * 0.5) * 120,
          -250 + Math.cos(t * 0.4) * 80,
          1200,
          "rgba(47,107,255,0.50)",
        )}
      />
      <div
        style={orb(
          -300 + Math.cos(t * 0.35) * 100,
          500 + Math.sin(t * 0.45) * 100,
          1000,
          "rgba(56,209,255,0.26)",
        )}
      />
      <div
        style={orb(
          600 + Math.sin(t * 0.3) * 80,
          720 + Math.cos(t * 0.5) * 40,
          900,
          "rgba(90,70,255,0.24)",
        )}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(120,170,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(120,170,255,0.07) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          backgroundPosition: `${frame * 0.4}px ${frame * 0.4}px`,
          maskImage:
            "radial-gradient(ellipse at center, black 15%, transparent 72%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: -400,
          left: beamX,
          width: 360,
          height: 2200,
          transform: "rotate(22deg)",
          background:
            "linear-gradient(90deg, transparent, rgba(150,200,255,0.07), transparent)",
        }}
      />

      {PARTICLES.map((p, i) => {
        const y = (((p.y0 - frame * p.speed * 1.2) % height) + height) % height;
        const twinkle = 0.5 + 0.5 * Math.sin(frame * 0.05 + p.phase);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: (p.x / 1920) * width,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: p.cyan ? colors.cyan : colors.ice,
              opacity: 0.2 + 0.45 * twinkle,
              boxShadow: `0 0 ${p.size * 3}px ${p.cyan ? colors.cyan : colors.ice}`,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
