import type React from "react";
import { Img, staticFile } from "remotion";

type XeelLogoProps = {
  readonly size?: number;
  // 0..1 position of a light sweep across the tile (outside 0..1 = hidden).
  readonly shine?: number;
  readonly style?: React.CSSProperties;
};

// The real XEEL logo (public/xeel-logo.png), untouched, on a bright glass tile
// so both the orange and the black halves stay readable on the dark scene.
export const XeelLogo: React.FC<XeelLogoProps> = ({
  size = 330,
  shine = -1,
  style,
}) => {
  const showShine = shine > 0 && shine < 1;
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: size * 0.26,
        overflow: "hidden",
        background: "linear-gradient(145deg, #ffffff 0%, #eaf2ff 100%)",
        boxShadow:
          "0 40px 100px rgba(0,0,0,0.55), 0 0 120px rgba(56,150,255,0.55), inset 0 2px 0 rgba(255,255,255,0.9)",
        ...style,
      }}
    >
      <Img
        src={staticFile("xeel-logo.png")}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
      {showShine ? (
        <div
          style={{
            position: "absolute",
            top: "-20%",
            bottom: "-20%",
            width: "40%",
            left: `${-40 + shine * 180}%`,
            transform: "rotate(18deg)",
            background:
              "linear-gradient(90deg, transparent, rgba(70,140,255,0.38), transparent)",
          }}
        />
      ) : null}
    </div>
  );
};
