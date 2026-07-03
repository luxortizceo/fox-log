import { useEffect, useRef, useState } from "react";
import { useContactModalStore } from "../store/contactModalStore";
import { INTEREST_OPTIONS, buildWhatsAppLink } from "../constants";
import "./ContactModal.css";

export function ContactModal() {
  const { isOpen, presetInterest, close } = useContactModalStore();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [interest, setInterest] = useState<string>(INTEREST_OPTIONS[0]);
  const [message, setMessage] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setInterest(presetInterest ?? INTEREST_OPTIONS[0]);
    }
  }, [isOpen, presetInterest]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "Hola, me gustaría agendar una consulta con Luxo Capital.",
      `Nombre: ${name || "—"}`,
      `Contacto: ${contact || "—"}`,
      `Interés: ${interest}`,
      message.trim() ? `Mensaje: ${message.trim()}` : null,
    ].filter(Boolean);
    window.open(buildWhatsAppLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    close();
    setName("");
    setContact("");
    setMessage("");
  };

  return (
    <div
      className="contact-modal__backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" ref={dialogRef}>
        <button type="button" className="contact-modal__close" onClick={close} aria-label="Cerrar">
          ×
        </button>

        <span className="eyebrow">Agenda tu consulta</span>
        <h2 id="contact-modal-title">Cuéntanos qué necesitas</h2>
        <p className="contact-modal__intro">
          Completa el formulario y lo enviaremos directo por WhatsApp a un asesor de Luxo Capital. Trabajamos de
          forma remota en todo México.
        </p>

        <form className="contact-modal__form" onSubmit={handleSubmit}>
          <label>
            Nombre
            <input
              ref={firstFieldRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre completo"
              required
            />
          </label>

          <label>
            Teléfono o correo
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="¿Dónde te contactamos?"
              required
            />
          </label>

          <label>
            ¿Qué información buscas?
            <select value={interest} onChange={(e) => setInterest(e.target.value)}>
              {INTEREST_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            Cuéntanos tu situación o duda
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ej. Quiero saber si me conviene pensionarme bajo Ley 73 o Ley 97…"
              rows={4}
            />
          </label>

          <button type="submit" className="contact-modal__submit">
            Enviar por WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
