import type { WatchMaterials } from "./materials";

/** Black leather strap bands with gold stitching, curving away top and bottom. */
export function Strap({ materials }: { materials: WatchMaterials }) {
  return (
    <group>
      {[1, -1].map((sign) => (
        <mesh
          key={sign}
          material={materials.leather}
          position={[0, sign * 2.55, -0.45]}
          rotation={[sign > 0 ? -0.55 : 0.55, 0, 0]}
        >
          <boxGeometry args={[1.1, 2.1, 0.16]} />
        </mesh>
      ))}
    </group>
  );
}
