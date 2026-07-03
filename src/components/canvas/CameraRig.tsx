import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useScrollStore } from "../../store/scrollStore";
import { smoothstep, lerp, clamp01 } from "../../utils/easing";
import { OPEN_HEART_POSITION } from "./watch/dialLayout";
import { WATCH_SCALE } from "./watch/Watch";

interface SceneKeyframe {
  t: number;
  pos: THREE.Vector3;
  lookAt: THREE.Vector3;
  fov: number;
}

/**
 * Six cinematic beats the camera travels through as the viewer scrolls:
 * 1. Watch floating in darkness, logo only.
 * 2. Orbit around the bezel as gears begin turning.
 * 3. Macro push into the open-heart window — visible mechanism.
 * 4. Pull back while the watch tilts vertically; keywords float in space.
 * 5. Exit move, full watch, illuminated logo.
 * 6. Final centered hero shot, handing off to the page below.
 */
const SCENES: SceneKeyframe[] = [
  { t: 0, pos: new THREE.Vector3(0, 0.25, 5.4), lookAt: new THREE.Vector3(0, 0, 0), fov: 30 },
  { t: 0.2, pos: new THREE.Vector3(2.7, 0.7, 3.3), lookAt: new THREE.Vector3(0, 0.05, 0.15), fov: 28 },
  {
    t: 0.45,
    pos: new THREE.Vector3(0.25, -0.24, 1.05),
    lookAt: new THREE.Vector3(
      OPEN_HEART_POSITION[0] * WATCH_SCALE,
      OPEN_HEART_POSITION[1] * WATCH_SCALE,
      0.03,
    ),
    fov: 20,
  },
  { t: 0.65, pos: new THREE.Vector3(0, 0.5, 4.5), lookAt: new THREE.Vector3(0, 0, 0), fov: 29 },
  { t: 0.85, pos: new THREE.Vector3(-2.3, 0.85, 4.6), lookAt: new THREE.Vector3(0, 0.1, 0), fov: 29 },
  { t: 1, pos: new THREE.Vector3(0, 0.05, 5.7), lookAt: new THREE.Vector3(0, 0, 0), fov: 33 },
];

function sampleScalar(p: number, key: "fov") {
  for (let i = 0; i < SCENES.length - 1; i++) {
    const a = SCENES[i];
    const b = SCENES[i + 1];
    if (p >= a.t && p <= b.t) {
      const u = smoothstep(0, 1, clamp01((p - a.t) / (b.t - a.t || 1)));
      return lerp(a[key], b[key], u);
    }
  }
  return SCENES[SCENES.length - 1][key];
}

function sampleVector(p: number, key: "lookAt", out: THREE.Vector3) {
  for (let i = 0; i < SCENES.length - 1; i++) {
    const a = SCENES[i];
    const b = SCENES[i + 1];
    if (p >= a.t && p <= b.t) {
      const u = smoothstep(0, 1, clamp01((p - a.t) / (b.t - a.t || 1)));
      return out.copy(a[key]).lerp(b[key], u);
    }
  }
  return out.copy(SCENES[SCENES.length - 1][key]);
}

export function CameraRig() {
  const camRef = useRef<THREE.PerspectiveCamera>(null);
  const smoothed = useRef(0);
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(SCENES.map((s) => s.pos), false, "catmullrom", 0.55),
    [],
  );
  const lookAtVec = useMemo(() => new THREE.Vector3(), []);
  const posVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const target = useScrollStore.getState().progress;
    smoothed.current = THREE.MathUtils.damp(smoothed.current, target, 3.4, delta);
    const p = smoothed.current;

    curve.getPoint(clamp01(p), posVec);
    sampleVector(p, "lookAt", lookAtVec);
    const fov = sampleScalar(p, "fov");

    // subtle handheld-cinematic drift so the frame never feels perfectly static
    const t = state.clock.elapsedTime;
    const driftX = Math.sin(t * 0.32) * 0.02;
    const driftY = Math.cos(t * 0.24) * 0.015;

    if (camRef.current) {
      camRef.current.position.set(posVec.x + driftX, posVec.y + driftY, posVec.z);
      camRef.current.lookAt(lookAtVec);
      if (Math.abs(camRef.current.fov - fov) > 0.01) {
        camRef.current.fov = fov;
        camRef.current.updateProjectionMatrix();
      }
    }
  });

  return <PerspectiveCamera ref={camRef} makeDefault fov={30} near={0.1} far={50} position={[0, 0.25, 5.4]} />;
}
