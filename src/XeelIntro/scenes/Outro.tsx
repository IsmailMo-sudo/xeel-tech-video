import type React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { XeelLogo } from "../components/XeelLogo";
import { BRAND } from "../content";
import { easeInOut, prog } from "../motion";
import { colors } from "../theme";

// Final scene: logo lock-up, expanding halo, then fade to black.
export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: { damping: 16, stiffness: 90 },
  });
  const ring = prog(frame, 4, 60);
  const tagline = prog(frame, 30, 52);
  const toBlack = prog(frame, 57, 75, easeInOut);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 300 + ring * 900,
          height: 300 + ring * 900,
          marginLeft: -(300 + ring * 900) / 2,
          marginTop: -(300 + ring * 900) / 2 - 90,
          borderRadius: "50%",
          border: `2px solid ${colors.cyan}`,
          opacity: ring > 0 ? (1 - ring) * 0.7 : 0,
        }}
      />

      <XeelLogo
        size={260}
        shine={prog(frame, 14, 50, easeInOut)}
        style={{
          opacity: prog(frame, 4, 18),
          transform: `translateY(-90px) scale(${0.6 + 0.4 * appear})`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 660,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <AnimatedText
          text={BRAND.name}
          mode="letters"
          delay={16}
          stagger={2}
          style={{
            justifyContent: "center",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "0.16em",
            lineHeight: 1,
            color: colors.text,
            textShadow: "0 0 50px rgba(80,150,255,0.55)",
          }}
        />
        <div
          style={{
            fontSize: 26,
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: colors.muted,
            opacity: tagline,
            transform: `translateY(${(1 - tagline) * 20}px)`,
          }}
        >
          {BRAND.tagline}
        </div>
      </div>

      <AbsoluteFill style={{ background: "#000", opacity: toBlack }} />
    </AbsoluteFill>
  );
};
