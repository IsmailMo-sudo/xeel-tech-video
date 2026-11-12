import { Easing, interpolate } from "remotion";

export const easeOutExpo = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

// 0 -> 1 between two frames, clamped, with a cinematic ease-out by default.
export const prog = (
  frame: number,
  start: number,
  end: number,
  easing: (t: number) => number = easeOutExpo,
): number =>
  interpolate(frame, [start, end], [0, 1], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const pad2 = (n: number): string => (n < 10 ? "0" : "") + String(n);
