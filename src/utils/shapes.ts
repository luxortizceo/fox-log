import * as THREE from "three";

/** A chunky, geometric "L" monogram — the Luxo Capital emblem, engraved into the dial. */
export function createLShape(scale = 1) {
  const shape = new THREE.Shape();
  const w = 0.34 * scale; // stroke width
  const h = 0.62 * scale; // total height
  const barW = 0.5 * scale; // base bar width

  shape.moveTo(-barW / 2, -h / 2);
  shape.lineTo(-barW / 2 + w, -h / 2);
  shape.lineTo(-barW / 2 + w, h / 2 - w);
  shape.lineTo(barW / 2, h / 2 - w);
  shape.lineTo(barW / 2, h / 2);
  shape.lineTo(-barW / 2, h / 2);
  shape.closePath();
  return shape;
}

/** A tapered sword-style watch hand, pivoted at the origin. */
export function createHandShape(length: number, baseWidth: number, tipWidth: number, tailLength = 0) {
  const shape = new THREE.Shape();
  shape.moveTo(-baseWidth / 2, 0);
  shape.lineTo(-tipWidth / 2, length * 0.82);
  shape.lineTo(0, length);
  shape.lineTo(tipWidth / 2, length * 0.82);
  shape.lineTo(baseWidth / 2, 0);
  if (tailLength > 0) {
    shape.lineTo(baseWidth / 3, -tailLength);
    shape.lineTo(-baseWidth / 3, -tailLength);
  }
  shape.closePath();
  return shape;
}

/** A simple index/hour marker — a tapered rectangle. */
export function createIndexShape(length: number, width: number) {
  const shape = new THREE.Shape();
  shape.moveTo(-width / 2, 0);
  shape.lineTo(width / 2, 0);
  shape.lineTo(width / 2, length);
  shape.lineTo(-width / 2, length);
  shape.closePath();
  return shape;
}

/** A gear silhouette with `teeth` triangular teeth around a ring. */
export function createGearShape(innerRadius: number, outerRadius: number, teeth: number) {
  const shape = new THREE.Shape();
  const toothDepth = outerRadius - innerRadius;
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a0 = i * step;
    const a1 = a0 + step * 0.3;
    const a2 = a0 + step * 0.5;
    const a3 = a0 + step * 0.8;
    const pts = [
      [Math.cos(a0) * innerRadius, Math.sin(a0) * innerRadius],
      [Math.cos(a1) * outerRadius, Math.sin(a1) * outerRadius],
      [Math.cos(a2) * outerRadius, Math.sin(a2) * outerRadius],
      [Math.cos(a3) * innerRadius, Math.sin(a3) * innerRadius],
    ];
    pts.forEach(([x, y], idx) => {
      if (i === 0 && idx === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
  }
  shape.closePath();

  const hole = new THREE.Path();
  hole.absarc(0, 0, innerRadius * 0.35, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  void toothDepth;
  return shape;
}
