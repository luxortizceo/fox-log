import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { WatchMaterials } from "./materials";
import { createGearShape } from "../../../utils/shapes";
import { useScrollStore } from "../../../store/scrollStore";

const extrude = { depth: 0.05, bevelEnabled: true, bevelSize: 0.006, bevelThickness: 0.006, bevelSegments: 1 };

function useGearGeometry(inner: number, outer: number, teeth: number) {
  return useMemo(() => new THREE.ExtrudeGeometry(createGearShape(inner, outer, teeth), extrude), [inner, outer, teeth]);
}

interface GearProps {
  position: [number, number, number];
  inner: number;
  outer: number;
  teeth: number;
  material: THREE.Material;
  speed: number; // rotation per unit progress, signed
  progressRef: React.MutableRefObject<number>;
}

function Gear({ position, inner, outer, teeth, material, speed, progressRef }: GearProps) {
  const geo = useGearGeometry(inner, outer, teeth);
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.z = progressRef.current * speed;
  });
  return <mesh ref={ref} geometry={geo} material={material} position={position} />;
}

/** Exposed skeleton movement: gear train, mainspring barrel and oscillating balance wheel. */
export function Movement({ materials }: { materials: WatchMaterials }) {
  const progressRef = useRef(0);
  const balanceRef = useRef<THREE.Group>(null);
  const barrelRef = useRef<THREE.Mesh>(null);
  const smoothed = useRef(0);

  useFrame((_, delta) => {
    const targetProgress = useScrollStore.getState().progress;
    smoothed.current = THREE.MathUtils.damp(smoothed.current, targetProgress, 5, delta);
    progressRef.current = smoothed.current;

    if (balanceRef.current) {
      balanceRef.current.rotation.z = Math.sin(smoothed.current * 46) * 0.55;
    }
    if (barrelRef.current) {
      barrelRef.current.rotation.z = smoothed.current * 3.2;
    }
  });

  return (
    <group position={[0, 0, -0.14]}>
      {/* bridges */}
      <mesh material={materials.gold} position={[0.1, -0.05, -0.02]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[1.5, 0.14, 0.03]} />
      </mesh>
      <mesh material={materials.gold} position={[-0.1, 0.5, -0.02]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[1.1, 0.12, 0.03]} />
      </mesh>

      <Gear position={[0, 0, 0]} inner={0.32} outer={0.5} teeth={14} material={materials.brass} speed={1.4} progressRef={progressRef} />
      <Gear position={[0.62, 0.32, 0.02]} inner={0.18} outer={0.3} teeth={10} material={materials.gold} speed={-2.6} progressRef={progressRef} />
      <Gear position={[-0.55, 0.42, 0.02]} inner={0.13} outer={0.22} teeth={8} material={materials.brass} speed={4.1} progressRef={progressRef} />

      {/* mainspring barrel */}
      <mesh ref={barrelRef} material={materials.brass} position={[-0.42, -0.55, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.09, 32]} />
      </mesh>

      {/* balance wheel assembly — aligned under the dial's open-heart window */}
      <group position={[0, -0.57, 0.12]}>
        <mesh material={materials.rubyJewel} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.06, 16]} />
        </mesh>
        <group ref={balanceRef}>
          <mesh material={materials.gold}>
            <torusGeometry args={[0.3, 0.02, 8, 32]} />
          </mesh>
          {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((a) => (
            <mesh key={a} material={materials.gold} rotation={[0, 0, a]}>
              <boxGeometry args={[0.58, 0.02, 0.02]} />
            </mesh>
          ))}
        </group>
        {/* hairspring hint */}
        <mesh material={materials.gold} position={[0, 0, 0.02]}>
          <torusGeometry args={[0.14, 0.006, 6, 24, Math.PI * 1.6]} />
        </mesh>
      </group>
    </group>
  );
}
