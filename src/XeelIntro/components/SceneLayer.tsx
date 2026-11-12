import type React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { OVERLAP } from "../theme";

type SceneLayerProps = {
  readonly from: number;
  readonly duration: number;
  readonly name: string;
  readonly fadeIn?: boolean;
  readonly fadeOut?: boolean;
  readonly children: React.ReactNode;
};

type FadeProps = {
  readonly duration: number;
  readonly fadeIn: boolean;
  readonly fadeOut: boolean;
  readonly children: React.ReactNode;
};

const clampOpts = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

// Cross-fade with a touch of scale + blur so cuts feel cinematic.
const Fade: React.FC<FadeProps> = ({ duration, fadeIn, fadeOut, children }) => {
  const frame = useCurrentFrame();
  const inP = fadeIn ? interpolate(frame, [0, OVERLAP], [0, 1], clampOpts) : 1;
  const outP = fadeOut
    ? interpolate(frame, [duration, duration + OVERLAP], [1, 0], clampOpts)
    : 1;
  const scale = 0.985 + 0.015 * inP + (1 - outP) * 0.02;
  const blur = (1 - inP) * 10 + (1 - outP) * 10;

  return (
    <AbsoluteFill
      style={{
        opacity: inP * outP,
        transform: `scale(${scale})`,
        filter: blur > 0.05 ? `blur(${blur}px)` : undefined,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// A Sequence that overlaps the next scene by OVERLAP frames for the cross-fade.
export const SceneLayer: React.FC<SceneLayerProps> = ({
  from,
  duration,
  name,
  fadeIn = true,
  fadeOut = true,
  children,
}) => {
  return (
    <Sequence
      from={from}
      durationInFrames={duration + (fadeOut ? OVERLAP : 0)}
      name={name}
    >
      <Fade duration={duration} fadeIn={fadeIn} fadeOut={fadeOut}>
        {children}
      </Fade>
    </Sequence>
  );
};
