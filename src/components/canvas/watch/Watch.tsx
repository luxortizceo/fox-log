import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWatchMaterials } from "./materials";
import { Case } from "./Case";
import { Bezel } from "./Bezel";
import { Crystal } from "./Crystal";
import { Dial } from "./Dial";
import { Hands } from "./Hands";
import { Movement } from "./Movement";
import { Crown } from "./Crown";
import { Strap } from "./Strap";
import { useScrollStore } from "../../../store/scrollStore";
import { bump } from "../../../utils/easing";

/** Uniform scale applied to the whole watch assembly — keep CameraRig's lookAt targets in sync. */
export const WATCH_SCALE = 0.42;

/** The full watch assembly: orbits gently and tilts up during the scene-4 "keywords" beat. */
export function Watch() {
  const materials = useWatchMaterials();
  const groupRef = useRef<THREE.Group>(null);
  const smoothed = useRef(0);

  useFrame((_, delta) => {
    const target = useScrollStore.getState().progress;
    smoothed.current = THREE.MathUtils.damp(smoothed.current, target, 4.2, delta);
    const p = smoothed.current;

    if (groupRef.current) {
      // exactly one full turn across the whole scroll so scene 6 bookends scene 1 face-on,
      // instead of drifting to an arbitrary edge-on angle by the final shot
      groupRef.current.rotation.y = p * Math.PI * 2;
      groupRef.current.rotation.x = bump(p, 0.52, 0.62, 0.76, 0.86) * -0.55;
      groupRef.current.rotation.z = bump(p, 0.52, 0.62, 0.76, 0.86) * 0.08;
    }
  });

  return (
    <group ref={groupRef} scale={WATCH_SCALE}>
      <Case materials={materials} />
      <Bezel materials={materials} />
      <Crystal materials={materials} />
      <Dial materials={materials} />
      <Hands materials={materials} />
      <Movement materials={materials} />
      <Crown materials={materials} />
      <Strap materials={materials} />
    </group>
  );
}
