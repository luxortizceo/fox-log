import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { CameraRig } from "./CameraRig";
import { Lights } from "./Lights";
import { Watch } from "./watch/Watch";
import { Particles } from "./Particles";
import { VolumetricLight } from "./VolumetricLight";
import { Effects } from "./Effects";

/** The full cinematic 3D scene, mounted once and driven entirely by scroll progress. */
export function SceneCanvas() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.25, 5.4], fov: 30 }}
    >
      <color attach="background" args={["#04060c"]} />
      <fog attach="fog" args={["#04060c", 5, 13]} />
      <Suspense fallback={null}>
        <CameraRig />
        <Lights />
        <Watch />
        <VolumetricLight />
        <Particles />
        <Effects />
      </Suspense>
    </Canvas>
  );
}
