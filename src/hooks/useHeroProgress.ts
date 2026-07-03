import { useEffect, type RefObject } from "react";
import { ScrollTrigger } from "../lib/smoothScroll";
import { setHeroProgress } from "../store/scrollStore";

/**
 * Drives `progress` (0..1) from how far the viewer has scrolled through the
 * tall pinned hero track. Backed by ScrollTrigger's scrub, which recomputes
 * progress from absolute scroll position every update — so scrolling up
 * reverses the whole sequence smoothly with no jumps or drift.
 */
export function useHeroProgress(trackRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => setHeroProgress(self.progress),
    });

    return () => trigger.kill();
  }, [trackRef]);
}
