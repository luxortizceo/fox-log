import { Bloom, DepthOfField, Vignette, EffectComposer, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

/** Cinematic post: bloom for gold reflections, shallow DOF for the macro-lens feel, vignette + grain. */
export function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <DepthOfField focusDistance={0.018} focalLength={0.045} bokehScale={3.2} height={480} />
      <Bloom intensity={0.55} luminanceThreshold={0.5} luminanceSmoothing={0.25} mipmapBlur radius={0.6} />
      <Vignette eskil={false} offset={0.25} darkness={0.85} />
      <Noise blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.035} />
    </EffectComposer>
  );
}
