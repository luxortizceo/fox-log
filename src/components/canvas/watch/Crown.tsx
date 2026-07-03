import type { WatchMaterials } from "./materials";

/** Fluted gold crown protruding from the case side. */
export function Crown({ materials }: { materials: WatchMaterials }) {
  return (
    <group position={[1.72, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <mesh material={materials.gold}>
        <cylinderGeometry args={[0.22, 0.22, 0.32, 24]} />
      </mesh>
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        return (
          <mesh
            key={i}
            material={materials.polishedGold}
            position={[Math.cos(angle) * 0.22, Math.sin(angle) * 0.22, 0]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[0.02, 0.34, 0.03]} />
          </mesh>
        );
      })}
      <mesh material={materials.polishedGold} position={[0, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
      </mesh>
    </group>
  );
}
