import type { WatchMaterials } from "./materials";

/** Domed sapphire crystal covering the dial — a squashed sphere nested inside the bezel opening. */
export function Crystal({ materials }: { materials: WatchMaterials }) {
  return (
    <mesh material={materials.sapphireCrystal} position={[0, 0, 0.14]} scale={[1, 1, 0.22]}>
      <sphereGeometry args={[1.34, 64, 48]} />
    </mesh>
  );
}
