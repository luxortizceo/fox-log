import { create } from "zustand";

/**
 * Transient store for scroll-driven animation.
 * `progress` (0..1) tracks how far the viewer has scrolled through the
 * cinematic hero sequence. Canvas components read it imperatively via
 * `getState()` inside useFrame (no React re-render); DOM overlays subscribe
 * directly to avoid re-rendering the whole tree on every scroll tick.
 */
interface ScrollState {
  /** raw progress through the pinned hero sequence, 0..1 */
  progress: number;
  /** overall page scroll in pixels, used for the nav bar transition */
  scrollY: number;
}

export const useScrollStore = create<ScrollState>(() => ({
  progress: 0,
  scrollY: 0,
}));

export const setHeroProgress = (progress: number) => {
  useScrollStore.setState({ progress });
};

export const setScrollY = (scrollY: number) => {
  useScrollStore.setState({ scrollY });
};
