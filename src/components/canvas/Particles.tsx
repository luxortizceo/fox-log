import { Sparkles } from "@react-three/drei";

/** Floating dust motes catching the key and rim light. */
export function Particles() {
  return (
    <>
      <Sparkles count={140} scale={[9, 6, 9]} size={2.2} speed={0.15} opacity={0.35} color="#e8cf9c" noise={1} />
      <Sparkles count={80} scale={[7, 5, 7]} size={1.4} speed={0.1} opacity={0.25} color="#7fa4d9" noise={1.4} />
    </>
  );
}
