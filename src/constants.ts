export const WHATSAPP_NUMBER = "525655724405";

export const INTEREST_OPTIONS = [
  "Pensiones y Retiro",
  "AFORE",
  "IMSS",
  "INFONAVIT",
  "Protección Patrimonial",
  "Planeación Fiscal",
  "Bolsa de trabajo",
  "Otro",
] as const;

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
