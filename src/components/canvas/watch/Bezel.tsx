import type { WatchMaterials } from "./materials";

/** Brushed gold bezel ring around the crystal, with a fine polished chamfer. */
export function Bezel({ materials }: { materials: WatchMaterials }) {
  return (
    <group position={[0, 0, 0.32]}>
      <mesh material={materials.gold} castShadow>
        <torusGeometry args={[1.52, 0.16, 32, 128]} />
      </mesh>
      <mesh material={materials.polishedGold} position={[0, 0, 0.03]}>
        <torusGeometry args={[1.52, 0.03, 16, 128]} />
      </mesh>
      {/* minute markers engraved into the bezel */}
      {Array.from({ length: 60 }).map((_, i) => {
        const angle = (i / 60) * Math.PI * 2;
        const isHour = i % 5 === 0;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.52, Math.sin(angle) * 1.52, 0.1]}
            rotation={[0, 0, angle]}
            material={materials.polishedGold}
          >
            <boxGeometry args={[isHour ? 0.03 : 0.014, isHour ? 0.09 : 0.05, 0.02]} />
          </mesh>
        );
      })}
    </group>
  );
}
