import type React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { XeelLogo } from "../components/XeelLogo";
import { BRAND } from "../content";
import { easeInOut, easeOutExpo, prog } from "../motion";
import { colors } from "../theme";

const TILE = 330;

const centered = (size: number): React.CSSProperties => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  width: size,
  height: size,
  marginLeft: -size / 2,
  marginTop: -size / 2,
});

// Scene 1: shockwave rings, 3D logo flip-in, light sweep, then brand name.
export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 15, mass: 0.9, stiffness: 80 },
  });
  const lift = prog(frame, 52, 90, easeInOut) * -125;
  const glow = prog(frame, 6, 40);
  const shine = prog(frame, 34, 74, easeInOut);
  const lineW = prog(frame, 84, 112) * 520;
  const tagline = prog(frame, 92, 120);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      {[0, 1, 2].map((i) => {
        const p = prog(frame, 8 + i * 9, 75 + i * 9, easeOutExpo);
        const size = 260 + p * 1100;
        return (
          <div
            key={i}
            style={{
              ...centered(size),
              borderRadius: "50%",
              border: `2px solid ${i === 1 ? colors.blueBright : colors.cyan}`,
              opacity: p > 0 ? (1 - p) * 0.8 : 0,
            }}
          />
        );
      })}

      <div
        style={{
          ...centered(760),
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56,150,255,0.55) 0%, rgba(0,0,0,0) 65%)",
          opacity: glow * (0.85 + 0.15 * Math.sin(frame * 0.12)),
          transform: `translateY(${lift}px)`,
        }}
      />

      <XeelLogo
        size={TILE}
        shine={shine}
        style={{
          opacity: prog(frame, 10, 28),
          transform: `perspective(1400px) translateY(${lift}px) rotateY(${(1 - appear) * -75}deg) scale(${0.45 + 0.55 * appear})`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 640,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <AnimatedText
          text={BRAND.name}
          mode="letters"
          delay={58}
          stagger={2.5}
          style={{
            justifyContent: "center",
            fontSize: 124,
            fontWeight: 700,
            letterSpacing: "0.16em",
            lineHeight: 1,
            color: colors.text,
            textShadow: "0 0 60px rgba(80,150,255,0.6)",
          }}
        />
        <div
          style={{
            width: lineW,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${colors.cyan}, transparent)`,
          }}
        />
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: colors.muted,
            opacity: tagline,
            transform: `translateY(${(1 - tagline) * 24}px)`,
          }}
        >
          {BRAND.tagline}
        </div>
      </div>
    </AbsoluteFill>
  );
};
