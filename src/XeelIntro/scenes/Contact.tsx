import type React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { GlassCard } from "../components/GlassCard";
import { XeelLogo } from "../components/XeelLogo";
import { CONTACTS, type ContactIconName } from "../content";
import { prog } from "../motion";
import { colors } from "../theme";

const stroke = {
  fill: "none",
  stroke: "#ffffff",
  strokeWidth: 2.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// Generic, original glyphs (not platform logos).
const ContactIcon: React.FC<{ readonly name: ContactIconName }> = ({ name }) => {
  return (
    <svg viewBox="0 0 40 40" width={40} height={40}>
      {name === "whatsapp" ? (
        <>
          <path
            {...stroke}
            d="M20 5C11.7 5 5 11.7 5 20c0 2.8.8 5.4 2.1 7.6L5 35l7.6-2c2.1 1.2 4.6 2 7.4 2 8.3 0 15-6.7 15-15S28.3 5 20 5Z"
          />
          <circle cx="13.5" cy="20" r="1.6" fill="#fff" />
          <circle cx="20" cy="20" r="1.6" fill="#fff" />
          <circle cx="26.5" cy="20" r="1.6" fill="#fff" />
        </>
      ) : null}
      {name === "email" ? (
        <>
          <rect {...stroke} x="6" y="10" width="28" height="20" rx="4" />
          <polyline {...stroke} points="7.5,12.5 20,22 32.5,12.5" />
        </>
      ) : null}
      {name === "facebook" ? (
        <>
          <circle {...stroke} cx="15" cy="14" r="5" />
          <path {...stroke} d="M5.5 31c0-5.2 4.2-8.5 9.5-8.5s9.5 3.3 9.5 8.5" />
          <circle {...stroke} cx="27.5" cy="16" r="4" />
          <path {...stroke} d="M27 23.5c4.4 0 7.5 2.7 7.5 7" />
        </>
      ) : null}
      {name === "instagram" ? (
        <>
          <rect {...stroke} x="5" y="12" width="30" height="21" rx="5" />
          <path {...stroke} d="M14 12l2-4h8l2 4" />
          <circle {...stroke} cx="20" cy="22.5" r="6" />
        </>
      ) : null}
      {name === "tiktok" ? (
        <>
          <circle {...stroke} cx="14" cy="29" r="5" />
          <path {...stroke} d="M19 29V8l11 4" />
        </>
      ) : null}
    </svg>
  );
};

// Scene 6: heading + five contact rows that glide in one after another.
export const Contact: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sub = prog(frame, 44, 70);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 0,
          bottom: 0,
          width: 760,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 34,
        }}
      >
        <XeelLogo
          size={120}
          style={{
            opacity: prog(frame, 2, 18),
            transform: `scale(${0.8 + 0.2 * prog(frame, 2, 22)})`,
          }}
        />
        <div>
          <AnimatedText
            text="Let's Create"
            delay={8}
            style={{ fontSize: 100, fontWeight: 700, lineHeight: 1.04, color: colors.text }}
          />
          <AnimatedText
            text="Something"
            delay={16}
            style={{ fontSize: 100, fontWeight: 700, lineHeight: 1.04, color: colors.text }}
          />
          <AnimatedText
            text="Remarkable"
            delay={24}
            style={{ fontSize: 100, fontWeight: 700, lineHeight: 1.04 }}
            partStyle={{
              background: `linear-gradient(90deg, ${colors.blueBright}, ${colors.cyan})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              paddingBottom: "0.14em",
              marginBottom: "-0.14em",
            }}
          />
        </div>
        <div
          style={{
            fontSize: 30,
            lineHeight: 1.5,
            color: colors.muted,
            maxWidth: 620,
            opacity: sub,
            transform: `translateY(${(1 - sub) * 24}px)`,
          }}
        >
          Tell us about your project and let&apos;s bring it to life.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 980,
          top: 0,
          bottom: 0,
          width: 810,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 18,
        }}
      >
        {CONTACTS.map((item, i) => {
          const p = spring({
            frame: Math.max(0, frame - 12 - i * 7),
            fps,
            config: { damping: 18, stiffness: 90 },
          });
          return (
            <GlassCard
              key={item.label}
              radius={28}
              style={{
                height: 118,
                display: "flex",
                alignItems: "center",
                gap: 28,
                padding: "0 34px",
                opacity: p,
                transform: `translateX(${(1 - p) * 90}px)`,
              }}
            >
              <div
                style={{
                  width: 74,
                  height: 74,
                  borderRadius: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `linear-gradient(135deg, ${colors.blue}, ${colors.cyan})`,
                  boxShadow: "0 10px 30px rgba(47,107,255,0.45)",
                  flexShrink: 0,
                }}
              >
                <ContactIcon name={item.icon} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div
                  style={{
                    fontSize: 20,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: colors.muted,
                  }}
                >
                  {item.label}
                </div>
                <div style={{ fontSize: 42, fontWeight: 600, color: colors.text }}>
                  {item.value}
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
