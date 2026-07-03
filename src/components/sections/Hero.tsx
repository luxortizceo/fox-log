import { useRef } from "react";
import { SceneCanvas } from "../canvas/SceneCanvas";
import { ScrollStory } from "../story/ScrollStory";
import { useHeroProgress } from "../../hooks/useHeroProgress";
import "./Hero.css";

/**
 * The cinematic hero: a tall scroll track pins the 3D canvas + story overlay
 * in place while the viewer scrolls, then releases naturally into the page
 * content below (position: sticky, no manual opacity juggling needed).
 */
export function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  useHeroProgress(trackRef);

  return (
    <section ref={trackRef} className="hero-track">
      <div className="hero-stage">
        <SceneCanvas />
        <ScrollStory />
        <div className="hero-vignette" />
      </div>
    </section>
  );
}
