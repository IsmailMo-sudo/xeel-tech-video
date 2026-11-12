// All copy lives here so it can be edited without touching animation code.

export type ServiceId = "design" | "video" | "event" | "social";

export type Service = {
  readonly id: ServiceId;
  readonly number: string;
  readonly title: readonly [string, string];
  readonly description: string;
  readonly bullets: readonly string[];
  readonly colorA: string;
  readonly colorB: string;
};

export const BRAND = {
  name: "XEEL TECH",
  tagline: "Digital Agency & Technology Solutions",
} as const;

export const SERVICES: readonly Service[] = [
  {
    id: "design",
    number: "01",
    title: ["Graphic Design", "& Branding"],
    description:
      "Logos, visual identities and print-ready creatives that make your brand instantly recognisable.",
    bullets: ["Logo Design", "Brand Identity", "Print & Packaging"],
    colorA: "#2f6bff",
    colorB: "#38d1ff",
  },
  {
    id: "video",
    number: "02",
    title: ["Video", "Editing"],
    description:
      "Cinematic edits, motion graphics and social-ready cuts that hold attention from the first frame.",
    bullets: ["Promo Videos", "Motion Graphics", "Reels & Shorts"],
    colorA: "#6d5bff",
    colorB: "#4f9bff",
  },
  {
    id: "event",
    number: "03",
    title: ["Event", "Branding"],
    description:
      "Stages, banners and on-site branding that turn every event into an unforgettable brand experience.",
    bullets: ["Stage & Backdrops", "Banners & Signage", "Event Identity"],
    colorA: "#00b8ff",
    colorB: "#2f6bff",
  },
  {
    id: "social",
    number: "04",
    title: ["Social Media", "Marketing"],
    description:
      "Strategy, content and campaigns that grow your audience and turn followers into customers.",
    bullets: ["Content Strategy", "Campaign Management", "Audience Growth"],
    colorA: "#4f7cff",
    colorB: "#8fd3ff",
  },
];

export type ContactIconName =
  | "whatsapp"
  | "email"
  | "facebook"
  | "instagram"
  | "tiktok";

export type ContactItem = {
  readonly icon: ContactIconName;
  readonly label: string;
  readonly value: string;
};

export const CONTACTS: readonly ContactItem[] = [
  { icon: "whatsapp", label: "WhatsApp", value: "+252 63-9495923" },
  { icon: "email", label: "Email", value: "xeeltech1@gmail.com" },
  { icon: "facebook", label: "Facebook", value: "Xeel Tech" },
  { icon: "instagram", label: "Instagram", value: "Xeel Tech" },
  { icon: "tiktok", label: "TikTok", value: "Xeel Tech" },
];
