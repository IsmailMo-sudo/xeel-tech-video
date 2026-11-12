// Single place to tune the look and the timing of the XEEL TECH intro.

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION = 900; // 30 seconds @ 30fps

export const colors = {
  bg0: "#020617",
  bg1: "#050f2b",
  bg2: "#0a1f5c",
  blue: "#2f6bff",
  blueBright: "#5b9dff",
  cyan: "#38d1ff",
  ice: "#e6f1ff",
  text: "#f4f8ff",
  muted: "rgba(214, 228, 255, 0.70)",
  // Accent taken from the XEEL logo; used sparingly.
  brand: "#ff5508",
  glassBorder: "rgba(160, 200, 255, 0.24)",
} as const;

// Swap for "Inter" via @remotion/google-fonts later if you want it bundled.
export const FONT =
  '"Inter", "SF Pro Display", "Segoe UI", "Helvetica Neue", Arial, sans-serif';

// Frames where two scenes cross-fade.
export const OVERLAP = 15;

export const SCENES = {
  logo: { from: 0, duration: 135 },
  servicesFrom: 135,
  serviceLen: 135,
  contact: { from: 675, duration: 150 },
  outro: { from: 825, duration: 75 },
} as const;

export const serviceFrom = (index: number): number =>
  SCENES.servicesFrom + index * SCENES.serviceLen;
