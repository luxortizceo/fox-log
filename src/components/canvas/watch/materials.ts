import * as THREE from "three";
import { useMemo } from "react";
import { createBrushedRoughnessTexture, createDialTexture, createLeatherTexture } from "../../../utils/textures";

/** Shared PBR materials for the watch, memoized once per mount. */
export function useWatchMaterials() {
  return useMemo(() => {
    const brushedGold = createBrushedRoughnessTexture(0.28);
    const brushedTitanium = createBrushedRoughnessTexture(0.42);
    const dialTex = createDialTexture();
    const leatherTex = createLeatherTexture();

    const titanium = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#23262b"),
      metalness: 1,
      roughness: 0.55,
      roughnessMap: brushedTitanium,
      clearcoat: 0.15,
      clearcoatRoughness: 0.4,
      envMapIntensity: 1.4,
    });

    const gold = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#caa153"),
      metalness: 1,
      roughness: 0.25,
      roughnessMap: brushedGold,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2,
      envMapIntensity: 1.8,
    });

    const polishedGold = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#e9cf94"),
      metalness: 1,
      roughness: 0.12,
      clearcoat: 0.6,
      envMapIntensity: 2,
    });

    // A cheap, render-robust glass approximation (no `transmission`, which needs an
    // extra offscreen pass per object and renders inconsistently across GPUs/drivers).
    const sapphireCrystal = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#dfeeff"),
      metalness: 0,
      roughness: 0.04,
      opacity: 0.22,
      transparent: true,
      envMapIntensity: 2.2,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const dial = new THREE.MeshPhysicalMaterial({
      map: dialTex,
      metalness: 0.35,
      roughness: 0.42,
      clearcoat: 0.4,
      clearcoatRoughness: 0.3,
      envMapIntensity: 1,
    });

    const leather = new THREE.MeshPhysicalMaterial({
      map: leatherTex,
      color: new THREE.Color("#0c0908"),
      metalness: 0,
      roughness: 0.85,
      clearcoat: 0.15,
      clearcoatRoughness: 0.6,
    });

    const brass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#a97e3d"),
      metalness: 1,
      roughness: 0.38,
      envMapIntensity: 1.3,
    });

    const rubyJewel = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#8c1a2b"),
      metalness: 0,
      roughness: 0.15,
      transmission: 0.5,
      envMapIntensity: 1.2,
    });

    return { titanium, gold, polishedGold, sapphireCrystal, dial, leather, brass, rubyJewel };
  }, []);
}

export type WatchMaterials = ReturnType<typeof useWatchMaterials>;
