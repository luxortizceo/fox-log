# Luxo Capital — Cinematic Hero

A scroll-driven cinematic 3D hero for Luxo Capital, a luxury financial
consulting brand (pensiones, retiro, IMSS, AFORE, INFONAVIT, protección
patrimonial). Built with React, React Three Fiber and GSAP ScrollTrigger.

## The experience

A procedurally modeled luxury wristwatch — navy sunburst dial, brushed gold
bezel, titanium case, exhibition case-back with a moving skeleton movement —
floats in a dark studio-lit scene. The entire animation timeline (camera
path, watch rotation, hands, gear train, balance wheel) is a pure function of
scroll progress, so scrolling up reverses everything smoothly with no jumps.
Six cinematic beats unfold across the scroll: an opening logo reveal, a bezel
orbit, a macro push into the open-heart window, a vertical tilt with floating
keywords (Trust / Security / Legacy / Planning), an exit move, and a final
centered shot that hands off into the rest of the landing page.

Below the hero: services (Pensiones y Retiro, AFORE, IMSS, INFONAVIT,
Protección Patrimonial, Planeación Fiscal), a philosophy statement, a process
outline, and a contact CTA.

## Stack

- **React 19 + TypeScript + Vite**
- **@react-three/fiber** / **@react-three/drei** / **@react-three/postprocessing** — the 3D scene, camera rig, bloom/DOF/vignette
- **Lenis** + **GSAP ScrollTrigger** — smooth scroll driving a single `progress` value (0–1)
- **Zustand** — transient scroll-progress store read imperatively inside `useFrame`, avoiding React re-renders on every scroll tick

## Architecture notes

- `src/components/canvas/watch/` — the watch, built entirely from primitive
  geometry (no external 3D assets), so every part — hands, gear train,
  balance wheel — is independently animatable.
- `src/components/canvas/CameraRig.tsx` — six keyframed camera beats sampled
  by scroll progress via a Catmull-Rom spline (position) and eased
  segment-lerp (look-at / FOV).
- `src/hooks/useHeroProgress.ts` — turns the tall pinned hero track into a
  0–1 progress value via `ScrollTrigger`.
- `src/store/scrollStore.ts` — the shared progress value; canvas components
  read it with `getState()` inside `useFrame`, DOM overlays subscribe
  directly and mutate styles imperatively (no React re-render per frame).

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```
