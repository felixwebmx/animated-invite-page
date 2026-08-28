/**
 * ─────────────────────────────────────────────────────────────
 *  TEXTOS EDITABLES DE LA INVITACIÓN
 *  Cambie solo los valores entre comillas. No hace falta tocar
 *  ningún otro archivo.
 * ─────────────────────────────────────────────────────────────
 */

export const invitacion = {
  /** Título que aparece al compartir el enlace (share nativo). */
  tituloEnlace: "2do Informe de Gobierno · Uriangato, Gto.",

  /** Mensaje que se envía por WhatsApp al compartir la invitación. */
  mensajeWhatsapp:
    "Le comparto la invitación al Segundo Informe de Gobierno de Juan Carlos Martínez Calderón, Presidente Municipal de Uriangato. Viernes 11 de septiembre, 6:30 p.m., Atrio de la Parroquia de San Miguel Arcángel.",

  /**
   * Número de WhatsApp que RECIBE las confirmaciones de asistencia.
   * Formato internacional sin signos: 52 + LADA + número.
   * Ejemplo: "524451234567". Si se deja vacío, WhatsApp pedirá elegir contacto.
   */
  numeroConfirmaciones: "",

  /** Plantilla del mensaje de confirmación (RSVP). */
  plantillaConfirmacion: ({
    nombre,
    telefono,
    acompanantes,
    asistencia,
  }: {
    nombre: string;
    telefono: string;
    acompanantes: string;
    asistencia: "si" | "no";
  }) =>
    asistencia === "si"
      ? `Hola, confirmo mi asistencia al Segundo Informe de Gobierno.\n\nNombre: ${nombre}\nTeléfono: ${telefono || "—"}\nPersonas que asisten: ${acompanantes || "1"}`
      : `Hola, agradezco la invitación al Segundo Informe de Gobierno, pero no podré asistir.\n\nNombre: ${nombre}\nTeléfono: ${telefono || "—"}`,
} as const;

/** Construye un enlace wa.me con el texto indicado. */
export function waLink(texto: string, numero = "") {
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}
