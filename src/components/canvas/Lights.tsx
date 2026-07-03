import { Environment, Lightformer } from "@react-three/drei";

/** Ultra-dark studio lighting: warm gold key, cool blue rim, and a procedural reflection environment. */
export function Lights() {
  return (
    <>
      <ambientLight intensity={0.04} />

      {/* warm gold key light, upper-front */}
      <spotLight
        position={[3.2, 3.6, 4]}
        angle={0.45}
        penumbra={0.7}
        intensity={9}
        color="#f3d9a8"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* cool blue rim / volumetric source, behind the watch */}
      <spotLight position={[-2.4, 1.2, -3.6]} angle={0.6} penumbra={1} intensity={14} color="#3f6fb8" />

      {/* soft fill so shadow side isn't pure black */}
      <pointLight position={[-2, -1.5, 2.5]} intensity={0.6} color="#8fa6c9" />

      {/* procedural environment for metal + sapphire reflections — no external HDRI fetch */}
      <Environment resolution={256} frames={1}>
        <group>
          <Lightformer form="rect" intensity={2.2} color="#f3d9a8" position={[3, 3, 4]} scale={[4, 4, 1]} />
          <Lightformer form="rect" intensity={1.4} color="#4f7fc9" position={[-4, 1, -3]} scale={[5, 3, 1]} />
          <Lightformer form="ring" intensity={0.8} color="#e8cf9c" position={[0, -3, 2]} scale={6} />
          <Lightformer form="circle" intensity={0.4} color="#0c1526" position={[0, 4, -6]} scale={10} />
        </group>
      </Environment>
    </>
  );
}
