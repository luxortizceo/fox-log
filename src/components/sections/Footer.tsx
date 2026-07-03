import { buildWhatsAppLink, WHATSAPP_NUMBER } from "../../constants";
import "./Footer.css";

const displayNumber = `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2, 4)} ${WHATSAPP_NUMBER.slice(4, 8)} ${WHATSAPP_NUMBER.slice(8)}`;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__col">
          <div className="site-footer__brand">
            <span className="site-nav__mark">LC</span>
            LUXO CAPITAL
          </div>
          <p className="site-footer__legal">
            © {new Date().getFullYear()} Luxo Capital. Asesoría financiera independiente. Pensiones, retiro, IMSS,
            AFORE e INFONAVIT. Trabajamos 100% remoto en toda la República Mexicana. Todos los derechos reservados.
          </p>
        </div>

        <div className="site-footer__col">
          <span className="site-footer__heading">Contacto</span>
          <a
            className="site-footer__whatsapp"
            href={buildWhatsAppLink("Hola, me gustaría más información sobre los servicios de Luxo Capital.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp: {displayNumber}
          </a>
        </div>

        <ul className="site-footer__links">
          <li>
            <a href="#servicios">Servicios</a>
          </li>
          <li>
            <a href="#filosofia">Filosofía</a>
          </li>
          <li>
            <a href="#carreras">Bolsa de trabajo</a>
          </li>
          <li>
            <a href="#contacto">Contacto</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
