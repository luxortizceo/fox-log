import { buildWhatsAppLink } from "../constants";
import "./WhatsAppButton.css";

const DEFAULT_MESSAGE = "Hola, me gustaría más información sobre los servicios de Luxo Capital.";

export function WhatsAppButton() {
  return (
    <a
      className="whatsapp-fab"
      href={buildWhatsAppLink(DEFAULT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.01 3C9.38 3 4 8.38 4 15.01c0 2.38.7 4.6 1.9 6.46L4 29l7.73-1.86a11.94 11.94 0 0 0 4.28.8c6.63 0 12.01-5.38 12.01-12.01C28.02 8.38 22.64 3 16.01 3Zm0 21.83c-1.5 0-2.96-.4-4.24-1.15l-.3-.18-4.58 1.1 1.12-4.48-.2-.31a9.79 9.79 0 0 1-1.5-5.19c0-5.44 4.42-9.86 9.7-9.86 5.29 0 9.7 4.42 9.7 9.86 0 5.45-4.41 9.86-9.7 9.86Zm5.34-7.36c-.29-.15-1.73-.86-2-.96-.27-.1-.46-.15-.66.15-.2.29-.75.95-.92 1.15-.17.19-.34.22-.63.07-.29-.15-1.23-.46-2.34-1.46-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.66-1.62-.9-2.22-.24-.58-.48-.5-.66-.51h-.56c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.43 0 1.43 1.05 2.82 1.2 3.01.15.19 2.06 3.19 5 4.47.7.3 1.24.48 1.66.62.7.22 1.34.19 1.84.12.56-.08 1.73-.71 1.98-1.4.24-.68.24-1.27.17-1.4-.07-.13-.26-.2-.55-.34Z"
        />
      </svg>
    </a>
  );
}
