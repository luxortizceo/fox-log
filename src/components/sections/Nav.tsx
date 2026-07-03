import { useEffect, useRef } from "react";
import { useScrollStore } from "../../store/scrollStore";
import { useContactModalStore } from "../../store/contactModalStore";
import "./Nav.css";

const LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Filosofía", href: "#filosofia" },
  { label: "Proceso", href: "#proceso" },
  { label: "Bolsa de trabajo", href: "#carreras" },
  { label: "Contacto", href: "#contacto" },
];

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const openContactModal = useContactModalStore((s) => s.open);

  useEffect(() => {
    const apply = (scrollY: number) => {
      navRef.current?.classList.toggle("nav--solid", scrollY > window.innerHeight * 0.85);
    };
    apply(useScrollStore.getState().scrollY);
    return useScrollStore.subscribe((state) => apply(state.scrollY));
  }, []);

  return (
    <nav ref={navRef} className="site-nav">
      <div className="site-nav__inner container">
        <a href="#top" className="site-nav__brand">
          <span className="site-nav__mark">LC</span>
          LUXO CAPITAL
        </a>
        <ul className="site-nav__links">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <button type="button" className="site-nav__cta" onClick={() => openContactModal()}>
          Agenda tu consulta
        </button>
      </div>
    </nav>
  );
}
