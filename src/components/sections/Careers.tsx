import { useContactModalStore } from "../../store/contactModalStore";
import "./Careers.css";

const ROLES = [
  {
    title: "Asesor(a) Patrimonial",
    modality: "Remoto · Todo México",
    copy: "Acompaña a clientes en pensiones, Afore y protección patrimonial. Buscamos experiencia en asesoría financiera o seguros.",
  },
  {
    title: "Especialista en Trámites IMSS / INFONAVIT",
    modality: "Remoto · Todo México",
    copy: "Gestiona y da seguimiento a trámites de pensión y crédito de vivienda con precisión y atención al detalle.",
  },
  {
    title: "Ejecutivo(a) de Nuevos Negocios",
    modality: "Remoto · Todo México",
    copy: "Desarrolla y da seguimiento a nuevas relaciones comerciales para Luxo Capital en todo el país.",
  },
];

export function Careers() {
  const openContactModal = useContactModalStore((s) => s.open);

  return (
    <section id="carreras" className="careers">
      <div className="container">
        <header className="careers__header">
          <span className="eyebrow">Bolsa de trabajo</span>
          <h2>
            Únete al <span className="gold-text">equipo Luxo Capital</span>
          </h2>
          <p>
            Somos un equipo 100% remoto que trabaja en todo México. Si te apasiona la planeación financiera y quieres
            construir el legado de otros, queremos conocerte — con o sin una vacante abierta en este momento.
          </p>
        </header>

        <ul className="careers__list">
          {ROLES.map((role) => (
            <li key={role.title} className="careers__role">
              <div>
                <h3>{role.title}</h3>
                <span className="careers__modality">{role.modality}</span>
              </div>
              <p>{role.copy}</p>
            </li>
          ))}
        </ul>

        <div className="careers__cta">
          <button type="button" className="careers__button" onClick={() => openContactModal("Bolsa de trabajo")}>
            Postúlate con nosotros
          </button>
          <span>También aceptamos candidaturas espontáneas.</span>
        </div>
      </div>
    </section>
  );
}
