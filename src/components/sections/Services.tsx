import { useContactModalStore } from "../../store/contactModalStore";
import "./Services.css";

const SERVICES = [
  {
    title: "Pensiones y Retiro",
    copy: "Estrategias personalizadas para maximizar tu pensión y asegurar un retiro con el mismo estándar de vida que construiste.",
  },
  {
    title: "AFORE",
    copy: "Análisis y optimización de tu Afore: aportaciones voluntarias, régimen y proyección de saldo a largo plazo.",
  },
  {
    title: "IMSS",
    copy: "Navega la Ley 73 y Ley 97 con claridad. Te ayudamos a identificar la modalidad de pensión más favorable.",
  },
  {
    title: "INFONAVIT",
    copy: "Uso estratégico de tu crédito y subcuenta de vivienda como parte de una planeación patrimonial integral.",
  },
  {
    title: "Protección Patrimonial",
    copy: "Estructuras de protección de activos, seguros y planeación sucesoria para resguardar tu legado familiar.",
  },
  {
    title: "Planeación Fiscal",
    copy: "Eficiencia fiscal en cada etapa: acumulación, retiro y transmisión patrimonial.",
  },
];

export function Services() {
  const openContactModal = useContactModalStore((s) => s.open);

  return (
    <section id="servicios" className="services">
      <div className="container">
        <header className="services__header">
          <span className="eyebrow">Nuestras especialidades</span>
          <h2>
            Precisión en cada <span className="gold-text">mecanismo financiero</span>
          </h2>
          <p>
            Igual que un movimiento de relojería, tu patrimonio depende de que cada pieza —pensión, vivienda,
            protección— funcione en conjunto, con exactitud.
          </p>
          <p className="services__remote">Atendemos 100% remoto en toda la República Mexicana.</p>
        </header>

        <div className="services__grid">
          {SERVICES.map((service, i) => (
            <article key={service.title} className="service-card" style={{ animationDelay: `${i * 60}ms` }}>
              <span className="service-card__index">{String(i + 1).padStart(2, "0")}</span>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <button
                type="button"
                className="service-card__link"
                onClick={() => openContactModal(service.title)}
              >
                Solicitar información →
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
