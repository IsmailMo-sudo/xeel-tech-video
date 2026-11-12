import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { easeInOut, pad2, prog } from "../motion";
import type { ServiceId } from "../content";

export type VisualProps = { readonly a: string; readonly b: string };

const Grad: React.FC<{ readonly id: string; readonly a: string; readonly b: string }> = ({
  id,
  a,
  b,
}) => (
  <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stopColor={a} />
    <stop offset="100%" stopColor={b} />
  </linearGradient>
);

const GLASS = "rgba(255,255,255,0.05)";
const EDGE = "rgba(160,200,255,0.28)";

const formatK = (n: number): string =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(Math.round(n));

// ───────────── 01 · Graphic Design & Branding ─────────────
const DesignVisual: React.FC<VisualProps> = ({ a, b }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = prog(frame, 18, 80, easeInOut);
  const pop = (delay: number): number =>
    spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 12, stiffness: 120 } });
  const float = (phase: number, amp: number): number =>
    Math.sin((frame / 30) * 1.6 + phase) * amp;
  const swatches = [a, b, "#ffffff", colors.brand, "#0b1b4d"];
  const path = "M110 400 C190 110 360 110 400 290 S540 450 590 170";

  return (
    <svg viewBox="0 0 700 700" width="100%" height="100%">
      <defs>
        <Grad id="dg" a={a} b={b} />
        <filter id="dblur">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      <rect x="40" y="40" width="620" height="440" rx="28" fill={GLASS} stroke={EDGE} strokeDasharray="6 8" />

      <g transform={`translate(0 ${float(0, 8)}) rotate(${float(1, 6)} 130 130)`} opacity={pop(10)}>
        <circle cx="130" cy="130" r="34" fill="url(#dg)" opacity="0.9" />
      </g>
      <g transform={`translate(0 ${float(2, 8)}) rotate(${float(3, 10)} 560 400)`} opacity={pop(18)}>
        <rect x="525" y="365" width="70" height="70" rx="18" fill="url(#dg)" opacity="0.85" />
      </g>
      <g transform={`translate(0 ${float(4, 8)}) rotate(${float(5, 8)} 250 420)`} opacity={pop(26)}>
        <path d="M250 392 L282 444 L218 444 Z" fill="rgba(255,255,255,0.8)" strokeLinejoin="round" stroke="rgba(255,255,255,0.8)" strokeWidth="10" />
      </g>

      <g opacity={prog(frame, 50, 80)} stroke="rgba(190,220,255,0.55)" strokeWidth="2" strokeDasharray="5 6">
        <line x1="110" y1="400" x2="190" y2="110" />
        <line x1="360" y1="110" x2="400" y2="290" />
        <line x1="400" y1="290" x2="440" y2="470" />
        <line x1="590" y1="170" x2="540" y2="450" />
      </g>

      <path d={path} pathLength={1} fill="none" stroke="url(#dg)" strokeWidth="22" strokeLinecap="round" strokeDasharray="1" strokeDashoffset={1 - draw} filter="url(#dblur)" opacity="0.6" />
      <path d={path} pathLength={1} fill="none" stroke="url(#dg)" strokeWidth="12" strokeLinecap="round" strokeDasharray="1" strokeDashoffset={1 - draw} />

      {[
        [110, 400],
        [400, 290],
        [590, 170],
      ].map(([x, y], i) => (
        <rect key={i} x={x - 8} y={y - 8} width="16" height="16" fill="#fff" stroke={a} strokeWidth="3" opacity={prog(frame, 30 + i * 18, 44 + i * 18)} />
      ))}
      {[
        [190, 110],
        [360, 110],
        [440, 470],
        [540, 450],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill="none" stroke="#fff" strokeWidth="3" opacity={prog(frame, 50, 80)} />
      ))}

      {swatches.map((c, i) => (
        <circle key={i} cx={110 + i * 125} cy="570" r={34 * pop(40 + i * 6)} fill={c} stroke={EDGE} strokeWidth="2" />
      ))}
      <text x="110" y="650" fill={colors.muted} fontSize="22" letterSpacing="5" opacity={prog(frame, 70, 90)}>
        BRAND PALETTE
      </text>
    </svg>
  );
};

// ───────────── 02 · Video Editing ─────────────
const VideoVisual: React.FC<VisualProps> = ({ a, b }) => {
  const frame = useCurrentFrame();
  const sec = Math.floor(frame / 30);
  const ff = frame % 30;
  const playX = interpolate(frame, [28, 128], [60, 640], {
    easing: easeInOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tracks: ReadonlyArray<ReadonlyArray<readonly [number, number]>> = [
    [[40, 150], [200, 220], [430, 230]],
    [[110, 190], [310, 120], [440, 200]],
    [[40, 260], [310, 350]],
  ];
  const fills = ["url(#vg)", "rgba(150,200,255,0.5)", "rgba(255,85,8,0.55)"];
  const bars = Array.from({ length: 45 }, (_, k) => k);

  return (
    <svg viewBox="0 0 700 700" width="100%" height="100%">
      <defs>
        <Grad id="vg" a={a} b={b} />
        <clipPath id="vclip">
          <rect x="40" y="40" width="620" height="340" rx="24" />
        </clipPath>
        <linearGradient id="vshade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(5,15,40,0)" />
          <stop offset="100%" stopColor="rgba(5,15,40,0.75)" />
        </linearGradient>
      </defs>

      <g opacity={prog(frame, 0, 18)}>
        <rect x="40" y="40" width="620" height="340" rx="24" fill="url(#vg)" opacity="0.85" />
        <g clipPath="url(#vclip)">
          <g transform={`translate(${-frame * 0.9} 0)`}>
            <path d="M0 380 L120 250 L220 330 L340 190 L470 340 L560 270 L700 380 L820 250 L920 330 L1040 190 L1170 340 L1260 270 L1400 380Z" fill="rgba(255,255,255,0.2)" />
            <circle cx="520" cy="130" r="46" fill="rgba(255,255,255,0.35)" />
          </g>
          <rect x="40" y="40" width="620" height="340" fill="url(#vshade)" />
        </g>
        <circle cx="350" cy="210" r={52 + 5 * Math.sin(frame * 0.14)} fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
        <path d="M336 186 L376 210 L336 234 Z" fill="#fff" />
        <circle cx="76" cy="76" r="7" fill="#ff4d4d" opacity={frame % 30 < 18 ? 1 : 0.25} />
        <text x="94" y="83" fill="#fff" fontSize="20" letterSpacing="3">
          REC
        </text>
        <text x="500" y="83" fill="#fff" fontSize="20" letterSpacing="2" opacity="0.85">
          {`00:${pad2(sec)}:${pad2(ff)}`}
        </text>
        {[
          "M60 100 V60 H100",
          "M640 100 V60 H600",
          "M60 320 V360 H100",
          "M640 320 V360 H600",
        ].map((d) => (
          <path key={d} d={d} fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="3" strokeLinecap="round" />
        ))}
      </g>

      {tracks.map((clips, t) =>
        clips.map(([x, w], i) => {
          const slide = prog(frame, 10 + t * 8 + i * 5, 40 + t * 8 + i * 5);
          return (
            <g key={`${t}-${i}`} opacity={slide} transform={`translate(${(1 - slide) * -240} 0)`}>
              <rect x={x} y={430 + t * 65} width={w - 8} height="52" rx="12" fill={fills[t]} stroke={EDGE} />
              {t === 2
                ? bars.map((k) => {
                    const bx = x + 14 + k * 7;
                    if (bx > x + w - 22) return null;
                    const h = 6 + 24 * Math.abs(Math.sin(k * 0.7 + frame * 0.12));
                    return <rect key={k} x={bx} y={456 - h / 2 + 0} width="3.5" height={h} rx="1.75" fill="rgba(255,255,255,0.85)" />;
                  })
                : null}
            </g>
          );
        }),
      )}

      <g opacity={prog(frame, 26, 36)}>
        <rect x={playX - 1.5} y="410" width="3" height="210" fill="#fff" />
        <rect x={playX - 1.5} y="410" width="3" height="210" fill="#fff" filter="url(#vglow)" opacity="0.6" />
        <path d={`M${playX - 11} 400 H${playX + 11} V414 L${playX} 426 L${playX - 11} 414 Z`} fill="#fff" />
      </g>
      <defs>
        <filter id="vglow">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
    </svg>
  );
};

// ───────────── 03 · Event Branding ─────────────
const EventVisual: React.FC<VisualProps> = ({ a, b }) => {
  const frame = useCurrentFrame();
  const beams = [150, 350, 550];
  const crowd = Array.from({ length: 10 }, (_, k) => k);

  return (
    <svg viewBox="0 0 700 700" width="100%" height="100%">
      <defs>
        <Grad id="eg" a={a} b={b} />
        <linearGradient id="ebeam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.40)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      <g opacity={prog(frame, 0, 20)}>
        <rect x="90" y="110" width="520" height="340" rx="20" fill={GLASS} stroke={EDGE} />
        {Array.from({ length: 6 }, (_, r) =>
          Array.from({ length: 10 }, (_, c) => (
            <circle key={`${r}-${c}`} cx={125 + c * 50} cy={140 + r * 52} r="2.5" fill="rgba(190,220,255,0.35)" />
          )),
        )}
      </g>

      <g opacity={prog(frame, 14, 40)} transform={`translate(0 ${(1 - prog(frame, 14, 44)) * 30})`}>
        <rect x="170" y="190" width="360" height="170" rx="20" fill="url(#eg)" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={i} x1={200 + i * 60} y1="190" x2={140 + i * 60} y2="360" stroke="rgba(255,255,255,0.12)" strokeWidth="14" />
        ))}
        <text x="350" y="290" textAnchor="middle" fill="#fff" fontSize="42" fontWeight="800" letterSpacing="3">
          YOUR EVENT
        </text>
        <rect x="300" y="312" width="100" height="5" rx="2.5" fill={colors.brand} />
      </g>

      {[60, 570].map((x, i) => {
        const up = prog(frame, 20 + i * 8, 50 + i * 8);
        return (
          <g key={x} opacity={up} transform={`translate(0 ${(1 - up) * 60})`}>
            <rect x={x} y="190" width="70" height="330" rx="10" fill="url(#eg)" opacity="0.9" />
            <circle cx={x + 35} cy="250" r="16" fill="rgba(255,255,255,0.85)" />
            <rect x={x + 14} y="290" width="42" height="6" rx="3" fill="rgba(255,255,255,0.7)" />
            <rect x={x + 14} y="308" width="30" height="6" rx="3" fill="rgba(255,255,255,0.45)" />
          </g>
        );
      })}

      <rect x="40" y="515" width="620" height="38" rx="10" fill="rgba(120,170,255,0.18)" stroke={EDGE} />
      <ellipse cx="350" cy="560" rx="300" ry="34" fill="rgba(120,170,255,0.10)" />

      {beams.map((x, i) => {
        const sway = Math.sin(frame * 0.045 + i * 1.7) * 70;
        const on = prog(frame, 10 + i * 6, 34 + i * 6);
        return (
          <g key={x} opacity={on * (0.75 + 0.25 * Math.sin(frame * 0.1 + i))}>
            <polygon points={`${x - 12},0 ${x + 12},0 ${x + sway + 120},540 ${x + sway - 120},540`} fill="url(#ebeam)" />
            <circle cx={x} cy="6" r="14" fill="#fff" />
          </g>
        );
      })}

      {crowd.map((k) => {
        const bob = Math.sin(frame * 0.12 + k * 1.3) * 5;
        const x = 70 + k * 62;
        return (
          <g key={k} opacity={0.4 * prog(frame, 30 + k * 2, 60 + k * 2)} transform={`translate(0 ${bob})`}>
            <circle cx={x} cy="618" r="14" fill="#cfe2ff" />
            <rect x={x - 18} y="636" width="36" height="60" rx="16" fill="#cfe2ff" />
          </g>
        );
      })}
    </svg>
  );
};

// ───────────── 04 · Social Media Marketing ─────────────
const heart = "M0 14 C-22 -2 -20 -22 -6 -22 C-2 -22 0 -19 0 -17 C0 -19 2 -22 6 -22 C20 -22 22 -2 0 14 Z";

const Bubble: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly label: string;
  readonly value: string;
  readonly delay: number;
  readonly a: string;
  readonly b: string;
}> = ({ x, y, label, value, delay, a, b }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 14, stiffness: 110 } });
  const float = Math.sin((frame / 30) * 1.5 + delay) * 7;
  return (
    <g opacity={p} transform={`translate(${x} ${y + float}) scale(${0.7 + 0.3 * p})`}>
      <rect width="200" height="86" rx="24" fill="rgba(8,20,60,0.82)" stroke={EDGE} />
      <rect x="14" y="16" width="54" height="54" rx="16" fill={`url(#sg-${a.slice(1)}-${b.slice(1)})`} />
      <text x="82" y="38" fill={colors.muted} fontSize="15" letterSpacing="1.5">
        {label.toUpperCase()}
      </text>
      <text x="82" y="68" fill="#fff" fontSize="30" fontWeight="700">
        {value}
      </text>
    </g>
  );
};

const SocialVisual: React.FC<VisualProps> = ({ a, b }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const likesP = prog(frame, 30, 115, easeInOut);
  const like = spring({ frame: Math.max(0, frame - 36), fps, config: { damping: 8, stiffness: 160 } });
  const bubbleGrad = `sg-${a.slice(1)}-${b.slice(1)}`;
  const risers = Array.from({ length: 7 }, (_, k) => k);

  return (
    <svg viewBox="0 0 700 700" width="100%" height="100%">
      <defs>
        <Grad id="sg" a={a} b={b} />
        <Grad id={bubbleGrad} a={a} b={b} />
      </defs>

      <g opacity={prog(frame, 0, 18)} transform={`translate(0 ${(1 - prog(frame, 0, 24)) * 40})`}>
        <rect x="215" y="30" width="270" height="640" rx="48" fill="rgba(5,15,40,0.92)" stroke="rgba(160,200,255,0.45)" strokeWidth="3" />
        <rect x="313" y="46" width="74" height="18" rx="9" fill="rgba(160,200,255,0.25)" />

        <circle cx="262" cy="108" r="26" fill="none" stroke="url(#sg)" strokeWidth="4" />
        <circle cx="262" cy="108" r="17" fill="url(#sg)" opacity="0.8" />
        <rect x="302" y="94" width="110" height="10" rx="5" fill="rgba(255,255,255,0.7)" />
        <rect x="302" y="114" width="70" height="8" rx="4" fill="rgba(255,255,255,0.35)" />

        <rect x="238" y="150" width="224" height="240" rx="22" fill="url(#sg)" opacity="0.9" />
        <circle cx={330 + Math.sin(frame * 0.05) * 20} cy="230" r="38" fill="rgba(255,255,255,0.35)" />
        <path d="M238 390 L320 300 L380 350 L430 310 L462 340 V368 a22 22 0 0 1 -22 22 H260 a22 22 0 0 1 -22 -22 Z" fill="rgba(5,15,40,0.35)" />

        <g transform={`translate(268 432) scale(${0.9 + 0.5 * like})`}>
          <path d={heart} fill={`url(#sg)`} stroke="#fff" strokeWidth="2" opacity={prog(frame, 34, 42)} />
        </g>
        <path d="M312 420 h28 a10 10 0 0 1 10 10 v10 a10 10 0 0 1 -10 10 h-16 l-10 8 v-8 a10 10 0 0 1 -2 -10 Z" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" strokeLinejoin="round" transform="translate(0 -4)" />
        <path d="M388 432 l36 -12 l-12 38 l-8 -14 Z" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" strokeLinejoin="round" />

        <text x="240" y="500" fill="#fff" fontSize="26" fontWeight="700">
          {`${formatK(likesP * 12400)} likes`}
        </text>
        <rect x="240" y="522" width="200" height="9" rx="4.5" fill="rgba(255,255,255,0.45)" />
        <rect x="240" y="545" width="150" height="9" rx="4.5" fill="rgba(255,255,255,0.25)" />
        <rect x="240" y="585" width="220" height="40" rx="20" fill="url(#sg)" opacity="0.9" />
        <text x="350" y="612" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="700" letterSpacing="2">
          FOLLOW
        </text>
      </g>

      {risers.map((k) => {
        const t = ((frame * 0.9 + k * 16) % 112) / 112;
        const start = 40 + k * 4;
        return (
          <g
            key={k}
            opacity={frame > start ? (1 - t) * 0.9 : 0}
            transform={`translate(${290 + Math.sin(t * 6 + k) * 40 + (k - 3) * 14} ${430 - t * 280}) scale(${0.45 + (1 - t) * 0.35})`}
          >
            <path d={heart} fill={k % 2 === 0 ? colors.brand : a} />
          </g>
        );
      })}

      <Bubble x={8} y={150} label="Followers" value={formatK(prog(frame, 40, 120, easeInOut) * 8200)} delay={34} a={a} b={b} />
      <Bubble x={502} y={290} label="Reach" value={formatK(prog(frame, 46, 126, easeInOut) * 120000)} delay={46} a={a} b={b} />
      <Bubble x={8} y={440} label="Growth" value={`+${(prog(frame, 52, 128, easeInOut) * 9.4).toFixed(1)}%`} delay={58} a={a} b={b} />
    </svg>
  );
};

export const VISUALS: Record<ServiceId, React.FC<VisualProps>> = {
  design: DesignVisual,
  video: VideoVisual,
  event: EventVisual,
  social: SocialVisual,
};
