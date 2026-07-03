import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { WatchMaterials } from "./materials";
import { createHandShape } from "../../../utils/shapes";
import { useScrollStore } from "../../../store/scrollStore";

const extrudeSettings = { depth: 0.025, bevelEnabled: true, bevelSize: 0.008, bevelThickness: 0.008, bevelSegments: 1 };

export function Hands({ materials }: { materials: WatchMaterials }) {
  const hourRef = useRef<THREE.Group>(null);
  const minuteRef = useRef<THREE.Group>(null);
  const secondRef = useRef<THREE.Group>(null);
  const smoothed = useRef(0);

  const hourGeo = useMemo(() => new THREE.ExtrudeGeometry(createHandShape(0.62, 0.09, 0.04), extrudeSettings), []);
  const minuteGeo = useMemo(() => new THREE.ExtrudeGeometry(createHandShape(0.95, 0.07, 0.03), extrudeSettings), []);
  const secondGeo = useMemo(
    () => new THREE.ExtrudeGeometry(createHandShape(1.05, 0.02, 0.01, 0.28), extrudeSettings),
    [],
  );

  useFrame((_, delta) => {
    const target = useScrollStore.getState().progress;
    smoothed.current = THREE.MathUtils.damp(smoothed.current, target, 5, delta);
    const p = smoothed.current;

    if (hourRef.current) hourRef.current.rotation.z = -p * Math.PI * 2 * 0.45;
    if (minuteRef.current) minuteRef.current.rotation.z = -p * Math.PI * 2 * 1.6;
    if (secondRef.current) secondRef.current.rotation.z = -p * Math.PI * 2 * 6.2;
  });

  return (
    <group position={[0, 0, 0.08]}>
      <group ref={hourRef}>
        <mesh geometry={hourGeo} material={materials.polishedGold} />
      </group>
      <group ref={minuteRef} position={[0, 0, 0.012]}>
        <mesh geometry={minuteGeo} material={materials.polishedGold} />
      </group>
      <group ref={secondRef} position={[0, 0, 0.024]}>
        <mesh geometry={secondGeo} material={materials.gold} />
      </group>
      <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]} material={materials.polishedGold}>
        <cylinderGeometry args={[0.045, 0.045, 0.04, 24]} />
      </mesh>
    </group>
  );
}
