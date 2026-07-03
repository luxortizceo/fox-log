export function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Trapezoidal 0→1→0 window: fades in between fadeInStart/fadeInEnd, holds, fades out between fadeOutStart/fadeOutEnd. */
export function windowOpacity(
  p: number,
  fadeInStart: number,
  fadeInEnd: number,
  fadeOutStart: number,
  fadeOutEnd: number,
) {
  const rise = smoothstep(fadeInStart, fadeInEnd, p);
  const fall = 1 - smoothstep(fadeOutStart, fadeOutEnd, p);
  return Math.min(rise, fall);
}

/** Smooth bump that peaks at 1 between `start` and `end`, zero outside. */
export function bump(p: number, start: number, peak0: number, peak1: number, end: number) {
  return windowOpacity(p, start, peak0, peak1, end);
}
