import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createLightShaftTexture } from "../../utils/textures";

/** Fake volumetric blue light shafts — additive-blended tapered planes, cheap and robust. */
export function VolumetricLight() {
  const texture = useMemo(() => createLightShaftTexture(), []);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.03;
    }
  });

  const shafts = [
    { pos: [-2.6, 3, -2.5] as const, rot: [0, 0, -0.35] as const, scale: 7 },
    { pos: [3, 2.6, -3.2] as const, rot: [0, 0, 0.42] as const, scale: 6 },
  ];

  return (
    <group ref={groupRef}>
      {shafts.map((s, i) => (
        <mesh key={i} position={s.pos} rotation={s.rot} scale={s.scale}>
          <planeGeometry args={[1, 2]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
