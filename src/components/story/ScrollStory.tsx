import { useEffect, useRef } from "react";
import { useScrollStore } from "../../store/scrollStore";
import { windowOpacity } from "../../utils/easing";
import "./ScrollStory.css";

interface Beat {
  id: string;
  range: [number, number, number, number];
  className: string;
  content: React.ReactNode;
}

const BEATS: Beat[] = [
  {
    id: "scroll-cue",
    range: [0, 0.01, 0.05, 0.09],
    className: "story-beat scroll-cue",
    content: (
      <>
        <span className="scroll-cue__line" />
        <span>Desliza para comenzar</span>
      </>
    ),
  },
  {
    id: "logo",
    range: [0, 0.02, 0.1, 0.16],
    className: "story-beat story-logo",
    content: (
      <>
        <span className="story-logo__mark">LC</span>
        <h1>
          LUXO <span className="gold-text">CAPITAL</span>
        </h1>
        <p className="story-logo__tagline">Tiempo. Legado. Patrimonio.</p>
      </>
    ),
  },
  {
    id: "caption-1",
    range: [0.12, 0.18, 0.32, 0.38],
    className: "story-beat story-caption caption-left",
    content: (
      <>
        <span className="eyebrow">Escena I — Precisión</span>
        <h2>Un legado, medido con precisión suiza.</h2>
      </>
    ),
  },
  {
    id: "caption-2",
    range: [0.36, 0.42, 0.56, 0.62],
    className: "story-beat story-caption caption-right",
    content: (
      <>
        <span className="eyebrow">Escena II — Mecanismo</span>
        <h2>Cada engranaje, una decisión bien planeada.</h2>
      </>
    ),
  },
  { id: "kw-trust", range: [0.55, 0.6, 0.65, 0.69], className: "story-beat keyword kw-1", content: <span>Trust</span> },
  {
    id: "kw-security",
    range: [0.63, 0.67, 0.71, 0.75],
    className: "story-beat keyword kw-2",
    content: <span>Security</span>,
  },
  {
    id: "kw-legacy",
    range: [0.7, 0.74, 0.78, 0.82],
    className: "story-beat keyword kw-3",
    content: <span>Legacy</span>,
  },
  {
    id: "kw-planning",
    range: [0.77, 0.81, 0.85, 0.89],
    className: "story-beat keyword kw-4",
    content: <span>Planning</span>,
  },
  {
    id: "caption-5",
    range: [0.85, 0.89, 0.94, 0.97],
    className: "story-beat story-caption caption-center",
    content: (
      <>
        <span className="eyebrow">Escena III — Patrimonio</span>
        <h2>Tu patrimonio, en manos expertas.</h2>
      </>
    ),
  },
  {
    id: "cta",
    range: [0.95, 0.98, 1.01, 1.02],
    className: "story-beat story-cta",
    content: (
      <>
        <h2>
          Bienvenido a <span className="gold-text">Luxo Capital</span>
        </h2>
        <p>Pensiones · Retiro · IMSS · AFORE · INFONAVIT · Protección Patrimonial</p>
      </>
    ),
  },
];

export function ScrollStory() {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const apply = (progress: number) => {
      for (const beat of BEATS) {
        const el = refs.current[beat.id];
        if (!el) continue;
        const [a, b, c, d] = beat.range;
        const o = windowOpacity(progress, a, b, c, d);
        el.style.opacity = String(o);
        el.style.transform = `translateY(${(1 - o) * 14}px)`;
        el.style.pointerEvents = o > 0.4 ? "auto" : "none";
      }
    };
    apply(useScrollStore.getState().progress);
    return useScrollStore.subscribe((state) => apply(state.progress));
  }, []);

  return (
    <div className="story-overlay">
      {BEATS.map((beat) => (
        <div
          key={beat.id}
          ref={(el) => {
            refs.current[beat.id] = el;
          }}
          className={beat.className}
          style={{ opacity: 0 }}
        >
          {beat.content}
        </div>
      ))}
    </div>
  );
}
