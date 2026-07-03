import { useMemo } from "react";
import * as THREE from "three";
import type { WatchMaterials } from "./materials";
import { createIndexShape, createLShape } from "../../../utils/shapes";
import { OPEN_HEART_POSITION, OPEN_HEART_RADIUS } from "./dialLayout";

const extrudeSettings = { depth: 0.03, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.01, bevelSegments: 2 };

function createDialShape() {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, 1.36, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(OPEN_HEART_POSITION[0], OPEN_HEART_POSITION[1], OPEN_HEART_RADIUS, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return shape;
}

export function Dial({ materials }: { materials: WatchMaterials }) {
  const indexGeometry = useMemo(() => new THREE.ExtrudeGeometry(createIndexShape(0.16, 0.05), extrudeSettings), []);
  const emblemGeometry = useMemo(() => new THREE.ExtrudeGeometry(createLShape(0.72), extrudeSettings), []);
  const dialGeometry = useMemo(() => new THREE.ShapeGeometry(createDialShape(), 96), []);

  return (
    <group position={[0, 0, 0.02]}>
      {/* dial face, pierced with an open-heart window over the balance wheel */}
      <mesh geometry={dialGeometry} material={materials.dial} />

      {/* polished rim around the open-heart window */}
      <mesh
        position={[OPEN_HEART_POSITION[0], OPEN_HEART_POSITION[1], 0.005]}
        material={materials.polishedGold}
      >
        <ringGeometry args={[OPEN_HEART_RADIUS - 0.012, OPEN_HEART_RADIUS, 48]} />
      </mesh>

      {/* hour indices */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 1.14;
        return (
          <mesh
            key={i}
            geometry={indexGeometry}
            material={materials.polishedGold}
            position={[Math.sin(angle) * r, Math.cos(angle) * r, 0.01]}
            rotation={[0, 0, -angle]}
          />
        );
      })}

      {/* Luxo Capital emblem, engraved center */}
      <mesh geometry={emblemGeometry} material={materials.polishedGold} position={[0, 0.32, 0.015]} />
    </group>
  );
}
