import type React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

type AnimatedTextProps = {
  readonly text: string;
  readonly delay?: number;
  readonly stagger?: number;
  readonly mode?: "words" | "letters";
  readonly style?: React.CSSProperties;
  readonly partStyle?: React.CSSProperties;
};

// Staggered word/letter reveal: rise + un-blur + fade, driven by springs.
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  stagger = 3,
  mode = "words",
  style,
  partStyle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const parts = mode === "letters" ? text.split("") : text.split(" ");

  return (
    <div style={{ display: "flex", flexWrap: "wrap", ...style }}>
      {parts.map((part, i) => {
        const p = spring({
          frame: Math.max(0, frame - delay - i * stagger),
          fps,
          durationInFrames: 24, // explicit length: damping 200 alone settles slowly
          config: { damping: 200 },
        });
        const isLast = i === parts.length - 1;
        return (
          <span
            key={`${part}-${i}`}
            style={{
              display: "inline-block",
              opacity: p,
              transform: `translateY(${(1 - p) * 46}px)`,
              filter: p < 0.995 ? `blur(${(1 - p) * 14}px)` : undefined,
              marginRight: mode === "words" && !isLast ? "0.28em" : 0,
              whiteSpace: "pre",
              ...partStyle,
            }}
          >
            {part === " " ? " " : part}
          </span>
        );
      })}
    </div>
  );
};
