import "./Process.css";

const STEPS = [
  { n: "01", title: "Diagnóstico", copy: "Revisamos tu situación patrimonial, Afore, semanas cotizadas y objetivos." },
  { n: "02", title: "Estrategia", copy: "Diseñamos una ruta de planeación a la medida, con escenarios claros." },
  { n: "03", title: "Implementación", copy: "Ejecutamos cada pieza: trámites, aportaciones, estructuras de protección." },
  { n: "04", title: "Acompañamiento", copy: "Revisiones periódicas para mantener el mecanismo funcionando con precisión." },
];

export function Process() {
  return (
    <section id="proceso" className="process">
      <div className="container">
        <header className="process__header">
          <span className="eyebrow">Cómo trabajamos</span>
          <h2>Un proceso tan preciso como un movimiento suizo</h2>
        </header>
        <ol className="process__list">
          {STEPS.map((step) => (
            <li key={step.n} className="process__step">
              <span className="process__n">{step.n}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
