import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setScrollY } from "../store/scrollStore";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wires Lenis smooth-scroll into GSAP's ticker/ScrollTrigger so every
 * scroll-driven animation in the app reads from the same buttery-smooth,
 * fully reversible scroll position. Mount once at the app root.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: reduceMotion ? 0.1 : 1.35,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: !reduceMotion,
      syncTouch: false,
      touchMultiplier: 1.6,
      wheelMultiplier: 0.9,
    });

    lenis.on("scroll", (e: { scroll: number }) => {
      setScrollY(e.scroll);
      ScrollTrigger.update();
    });

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);
}

export { gsap, ScrollTrigger };
