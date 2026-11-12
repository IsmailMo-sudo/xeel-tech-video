import type React from "react";
import { colors } from "../theme";

type GlassCardProps = {
  readonly children?: React.ReactNode;
  readonly style?: React.CSSProperties;
  readonly radius?: number;
  readonly glow?: string;
};

// Frosted-glass panel: translucent fill, bright top edge, soft coloured glow.
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  radius = 32,
  glow = colors.blue,
}) => {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: radius,
        background:
          "linear-gradient(135deg, rgba(150,190,255,0.17), rgba(80,120,255,0.05))",
        border: `1px solid ${colors.glassBorder}`,
        boxShadow: `0 30px 80px rgba(0,0,0,0.45), 0 0 90px ${glow}33, inset 0 1px 0 rgba(255,255,255,0.30), inset 0 0 40px rgba(120,170,255,0.06)`,
        backdropFilter: "blur(24px)",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 35%)",
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
};
