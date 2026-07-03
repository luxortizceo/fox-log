import * as THREE from "three";

function makeCanvas(size: number) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  return { canvas, ctx };
}

function toTexture(canvas: HTMLCanvasElement, srgb = true) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

/** Deep navy sunburst dial with a fine radial brushed texture and printed minute track. */
export function createDialTexture() {
  const size = 1024;
  const { canvas, ctx } = makeCanvas(size);
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2;

  // base navy
  const base = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  base.addColorStop(0, "#141f38");
  base.addColorStop(0.55, "#0c1526");
  base.addColorStop(1, "#060a15");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);

  // sunburst rays
  ctx.save();
  ctx.translate(cx, cy);
  const rays = 240;
  for (let i = 0; i < rays; i++) {
    const angle = (i / rays) * Math.PI * 2;
    const alpha = 0.03 + (i % 2 === 0 ? 0.02 : 0);
    ctx.strokeStyle = `rgba(180,200,235,${alpha})`;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    ctx.stroke();
  }
  ctx.restore();

  // open-heart skeleton cutout guide (subtle darker rings hinting the movement window)
  ctx.save();
  ctx.translate(cx, cy * 1.18);
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.24, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.fill();
  ctx.strokeStyle = "rgba(201,166,100,0.6)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();

  // minute track
  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = "rgba(212,175,106,0.9)";
  for (let i = 0; i < 60; i++) {
    const angle = (i / 60) * Math.PI * 2;
    const isHour = i % 5 === 0;
    const inner = r * (isHour ? 0.86 : 0.9);
    const outer = r * 0.93;
    ctx.lineWidth = isHour ? 4 : 1.4;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
    ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
    ctx.stroke();
  }
  ctx.restore();

  // subtle brand text ring
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = "rgba(232,207,156,0.85)";
  ctx.font = `${size * 0.028}px Georgia, serif`;
  ctx.textAlign = "center";
  ctx.letterSpacing = "6px";
  ctx.fillText("LUXO CAPITAL", 0, -r * 0.42);
  ctx.font = `${size * 0.016}px Georgia, serif`;
  ctx.fillStyle = "rgba(180,190,210,0.6)";
  ctx.letterSpacing = "3px";
  ctx.fillText("SWISS MOVEMENT — SKELETON", 0, r * 0.5);
  ctx.restore();

  return toTexture(canvas);
}

/** Fine anisotropic brushed-metal roughness map (works for titanium case + gold bezel). */
export function createBrushedRoughnessTexture(baseRoughness = 0.35) {
  const size = 512;
  const { canvas, ctx } = makeCanvas(size);
  ctx.fillStyle = `rgb(${baseRoughness * 255},${baseRoughness * 255},${baseRoughness * 255})`;
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 4000; i++) {
    const y = Math.random() * size;
    const shade = 150 + Math.random() * 90;
    ctx.strokeStyle = `rgba(${shade},${shade},${shade},0.05)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y + (Math.random() - 0.5) * 6);
    ctx.stroke();
  }
  const tex = toTexture(canvas, false);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 1);
  return tex;
}

/** Dark leather grain normal-ish bump texture for the strap. */
export function createLeatherTexture() {
  const size = 512;
  const { canvas, ctx } = makeCanvas(size);
  ctx.fillStyle = "#0a0705";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 1.6;
    const shade = Math.random() * 40;
    ctx.fillStyle = `rgba(${20 + shade},${14 + shade * 0.7},${10 + shade * 0.5},0.4)`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  // gold stitch lines along both edges
  ctx.strokeStyle = "rgba(201,166,100,0.85)";
  ctx.lineWidth = 3;
  ctx.setLineDash([10, 8]);
  ctx.beginPath();
  ctx.moveTo(24, 0);
  ctx.lineTo(24, size);
  ctx.moveTo(size - 24, 0);
  ctx.lineTo(size - 24, size);
  ctx.stroke();
  const tex = toTexture(canvas, false);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/** Soft radial glow sprite used for dust particles. */
export function createGlowSprite() {
  const size = 128;
  const { canvas, ctx } = makeCanvas(size);
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(232,207,156,0.6)");
  g.addColorStop(1, "rgba(232,207,156,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return toTexture(canvas, false);
}

/** Soft tapered light-shaft gradient — wide/bright at the top, fading to a point. Used for fake volumetrics. */
export function createLightShaftTexture() {
  const w = 256;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "rgba(150,190,255,0.55)");
  grad.addColorStop(0.55, "rgba(150,190,255,0.18)");
  grad.addColorStop(1, "rgba(150,190,255,0)");
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(w * 0.5, h);
  ctx.lineTo(w * 0.08, 0);
  ctx.lineTo(w * 0.92, 0);
  ctx.closePath();
  ctx.clip();
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
  return toTexture(canvas, false);
}
