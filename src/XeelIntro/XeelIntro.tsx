import type React from "react";
import { AbsoluteFill } from "remotion";
import { GradientBackground } from "./components/GradientBackground";
import { SceneLayer } from "./components/SceneLayer";
import { SERVICES } from "./content";
import { Contact } from "./scenes/Contact";
import { LogoReveal } from "./scenes/LogoReveal";
import { Outro } from "./scenes/Outro";
import { ServiceScene } from "./scenes/ServiceScene";
import { colors, FONT, SCENES, serviceFrom } from "./theme";

// 30s brand intro: logo reveal -> 4 services -> contact -> outro.
export const XeelIntro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg0, fontFamily: FONT }}>
      <GradientBackground />

      <SceneLayer
        name="Logo reveal"
        from={SCENES.logo.from}
        duration={SCENES.logo.duration}
        fadeIn={false}
      >
        <LogoReveal />
      </SceneLayer>

      {SERVICES.map((service, i) => (
        <SceneLayer
          key={service.id}
          name={`Service ${service.number}`}
          from={serviceFrom(i)}
          duration={SCENES.serviceLen}
        >
          <ServiceScene service={service} index={i} total={SERVICES.length} />
        </SceneLayer>
      ))}

      <SceneLayer
        name="Contact"
        from={SCENES.contact.from}
        duration={SCENES.contact.duration}
      >
        <Contact />
      </SceneLayer>

      <SceneLayer
        name="Outro"
        from={SCENES.outro.from}
        duration={SCENES.outro.duration}
        fadeOut={false}
      >
        <Outro />
      </SceneLayer>
    </AbsoluteFill>
  );
};
