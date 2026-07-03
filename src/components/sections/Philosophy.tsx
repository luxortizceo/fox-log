import "./Philosophy.css";

export function Philosophy() {
  return (
    <section id="filosofia" className="philosophy">
      <div className="philosophy__glow" aria-hidden />
      <div className="container philosophy__inner">
        <span className="eyebrow">Nuestra filosofía</span>
        <blockquote>
          "El tiempo no se recupera. Se planea. Cada decisión financiera de hoy es un engranaje que mueve el legado
          de mañana."
        </blockquote>
        <div className="philosophy__pillars">
          {[
            { title: "Tiempo", copy: "Cada estrategia se calibra al ritmo exacto de tu vida financiera." },
            { title: "Legado", copy: "Construimos patrimonio pensado para trascender generaciones." },
            { title: "Confianza", copy: "Relaciones de largo plazo, con la discreción de un consejero personal." },
          ].map((p) => (
            <div key={p.title} className="pillar">
              <h3 className="gold-text">{p.title}</h3>
              <p>{p.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
