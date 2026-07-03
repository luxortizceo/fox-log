import { useContactModalStore } from "../../store/contactModalStore";
import { buildWhatsAppLink } from "../../constants";
import "./CTA.css";

export function CTA() {
  const openContactModal = useContactModalStore((s) => s.open);

  return (
    <section id="contacto" className="cta">
      <div className="cta__glow" aria-hidden />
      <div className="container cta__inner">
        <span className="eyebrow">Comienza hoy</span>
        <h2>
          Protege tu patrimonio con la <span className="gold-text">precisión que merece.</span>
        </h2>
        <p>
          Agenda una consulta privada con un asesor de Luxo Capital y descubre cómo alinear cada pieza de tu retiro,
          vivienda y legado. Trabajamos de forma 100% remota en todo México, así que sin importar en qué estado te
          encuentres, podemos acompañarte.
        </p>
        <div className="cta__actions">
          <button type="button" className="cta__button" onClick={() => openContactModal()}>
            Agenda tu consulta privada
          </button>
          <a
            className="cta__whatsapp"
            href={buildWhatsAppLink("Hola, me gustaría más información sobre los servicios de Luxo Capital.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            o escríbenos por WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
