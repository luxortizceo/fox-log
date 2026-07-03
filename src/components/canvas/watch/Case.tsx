import type { WatchMaterials } from "./materials";

/** Brushed titanium case body, exhibition case-back window, and lugs. */
export function Case({ materials }: { materials: WatchMaterials }) {
  return (
    <group>
      {/* main case body — open-ended tube (no front/back caps) so the dial reads through the front
          opening and the exhibition case-back is visible from behind; axis rotated Y→Z to face the camera */}
      <mesh material={materials.titanium} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.58, 1.6, 0.62, 96, 1, true]} />
      </mesh>

      {/* case-back rim */}
      <mesh material={materials.titanium} position={[0, 0, -0.31]}>
        <torusGeometry args={[1.58, 0.05, 24, 96]} />
      </mesh>

      {/* exhibition sapphire case-back so the movement reads from behind */}
      <mesh material={materials.sapphireCrystal} position={[0, 0, -0.34]} rotation={[Math.PI, 0, 0]}>
        <circleGeometry args={[1.53, 96]} />
      </mesh>

      {/* lugs — top */}
      {[1, -1].map((sign) => (
        <group key={sign} position={[0, sign * 1.55, -0.05]} rotation={[sign > 0 ? -0.35 : 0.35, 0, 0]}>
          <mesh material={materials.titanium}>
            <boxGeometry args={[0.62, 0.55, 0.22]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
