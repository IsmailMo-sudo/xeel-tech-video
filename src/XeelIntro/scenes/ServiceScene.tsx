import type React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { GlassCard } from "../components/GlassCard";
import type { Service } from "../content";
import { prog } from "../motion";
import { colors, SCENES } from "../theme";
import { VISUALS } from "./ServiceVisuals";

type ServiceSceneProps = {
  readonly service: Service;
  readonly index: number;
  readonly total: number;
};

// Reusable showcase scene: copy on the left, animated glass card on the right.
export const ServiceScene: React.FC<ServiceSceneProps> = ({
  service,
  index,
  total,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const Visual = VISUALS[service.id];

  const cardIn = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: { damping: 18, stiffness: 70, mass: 1 },
  });
  const float = Math.sin((frame / 30) * 1.4) * 8;
  const desc = prog(frame, 26, 52);
  const gradientText: React.CSSProperties = {
    background: `linear-gradient(90deg, ${service.colorA}, ${service.colorB})`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    // keep descenders (g, p) inside the clipped gradient box
    paddingBottom: "0.14em",
    marginBottom: "-0.14em",
  };

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 1010 - 140,
          top: 150 - 140,
          width: 780 + 280,
          height: 780 + 280,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${service.colorA}55 0%, rgba(0,0,0,0) 62%)`,
          opacity: cardIn,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 130,
          top: 0,
          bottom: 0,
          width: 800,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: prog(frame, 2, 22),
            transform: `translateX(${(1 - prog(frame, 2, 24)) * -40}px)`,
          }}
        >
          <div
            style={{
              padding: "8px 22px",
              borderRadius: 999,
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#fff",
              background: `linear-gradient(90deg, ${service.colorA}, ${service.colorB})`,
              boxShadow: `0 10px 30px ${service.colorA}66`,
            }}
          >
            {service.number}
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: colors.muted,
            }}
          >
            Our Services
          </div>
        </div>

        <div>
          <AnimatedText
            text={service.title[0]}
            delay={8}
            style={{ fontSize: 104, fontWeight: 700, lineHeight: 1.04, color: colors.text }}
          />
          <AnimatedText
            text={service.title[1]}
            delay={16}
            style={{ fontSize: 104, fontWeight: 700, lineHeight: 1.04 }}
            partStyle={gradientText}
          />
        </div>

        <div
          style={{
            fontSize: 32,
            lineHeight: 1.5,
            color: colors.muted,
            maxWidth: 700,
            opacity: desc,
            transform: `translateY(${(1 - desc) * 26}px)`,
          }}
        >
          {service.description}
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {service.bullets.map((label, i) => {
            const p = prog(frame, 40 + i * 6, 62 + i * 6);
            return (
              <GlassCard
                key={label}
                radius={999}
                glow={service.colorA}
                style={{
                  padding: "14px 28px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  fontSize: 24,
                  fontWeight: 600,
                  color: colors.text,
                  opacity: p,
                  transform: `translateY(${(1 - p) * 24}px)`,
                }}
              >
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${service.colorA}, ${service.colorB})`,
                    boxShadow: `0 0 14px ${service.colorB}`,
                  }}
                />
                {label}
              </GlassCard>
            );
          })}
        </div>
      </div>

      <GlassCard
        radius={44}
        glow={service.colorA}
        style={{
          position: "absolute",
          left: 1010,
          top: 150,
          width: 780,
          height: 780,
          padding: 40,
          opacity: cardIn,
          transform: `perspective(1600px) translate(${(1 - cardIn) * 140}px, ${float}px) rotateY(${(1 - cardIn) * -14}deg)`,
        }}
      >
        <Visual a={service.colorA} b={service.colorB} />
      </GlassCard>

      <div
        style={{
          position: "absolute",
          left: 130,
          bottom: 84,
          display: "flex",
          gap: 12,
        }}
      >
        {Array.from({ length: total }, (_, i) => {
          const fill =
            i < index ? 1 : i === index ? prog(frame, 0, SCENES.serviceLen, (t) => t) : 0;
          return (
            <div
              key={i}
              style={{
                width: 90,
                height: 6,
                borderRadius: 3,
                background: "rgba(160,200,255,0.2)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${fill * 100}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, ${service.colorA}, ${service.colorB})`,
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
