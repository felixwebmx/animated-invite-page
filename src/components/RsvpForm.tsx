import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { invitacion, waLink } from "@/config/invitacion";

type Estado = "idle" | "enviado";

export function RsvpForm() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [acompanantes, setAcompanantes] = useState("1");
  const [asistencia, setAsistencia] = useState<"si" | "no">("si");
  const [estado, setEstado] = useState<Estado>("idle");

  const mensaje = invitacion.plantillaConfirmacion({
    nombre,
    telefono,
    acompanantes,
    asistencia,
  });
  const enlace = waLink(mensaje, invitacion.numeroConfirmaciones);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.open(enlace, "_blank", "noopener,noreferrer");
    setEstado("enviado");
  };

  if (estado === "enviado") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-md border border-gold/50 bg-cream/10 p-8 text-center"
      >
        <p className="font-display text-2xl text-cream md:text-3xl">
          ¡Gracias, {nombre || "amigo"}!
        </p>
        <p className="mt-3 text-base leading-relaxed text-cream/90">
          {asistencia === "si"
            ? "Se abrió WhatsApp con su confirmación. Solo presione enviar para completarla."
            : "Se abrió WhatsApp con su respuesta. Solo presione enviar para completarla."}
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="min-h-11 bg-cream text-primary hover:bg-cream/90">
            <a href={enlace} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" />
              Abrir WhatsApp de nuevo
            </a>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="min-h-11 border-cream/60 bg-transparent text-cream hover:bg-cream/15 hover:text-cream"
            onClick={() => setEstado("idle")}
          >
            Enviar otra respuesta
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 text-left">
      <div className="space-y-2">
        <Label htmlFor="rsvp-nombre" className="text-sm text-cream">
          Nombre completo
        </Label>
        <Input
          id="rsvp-nombre"
          name="nombre"
          required
          autoComplete="name"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="min-h-11 border-cream/40 bg-cream/10 text-base text-cream placeholder:text-cream/60"
          placeholder="Su nombre"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rsvp-telefono" className="text-sm text-cream">
          Teléfono de WhatsApp
        </Label>
        <Input
          id="rsvp-telefono"
          name="telefono"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="min-h-11 border-cream/40 bg-cream/10 text-base text-cream placeholder:text-cream/60"
          placeholder="445 123 4567"
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm text-cream">¿Podrá acompañarnos?</legend>
        <RadioGroup
          value={asistencia}
          onValueChange={(v) => setAsistencia(v as "si" | "no")}
          className="flex flex-col gap-3 sm:flex-row sm:gap-8"
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem
              id="rsvp-si"
              value="si"
              className="size-5 border-cream/70 text-cream"
            />
            <Label htmlFor="rsvp-si" className="text-base text-cream">
              Sí, asistiré
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem
              id="rsvp-no"
              value="no"
              className="size-5 border-cream/70 text-cream"
            />
            <Label htmlFor="rsvp-no" className="text-base text-cream">
              No podré asistir
            </Label>
          </div>
        </RadioGroup>
      </fieldset>

      {asistencia === "si" && (
        <div className="space-y-2">
          <Label htmlFor="rsvp-acompanantes" className="text-sm text-cream">
            Número de personas que asisten
          </Label>
          <Input
            id="rsvp-acompanantes"
            name="acompanantes"
            type="number"
            min={1}
            max={20}
            value={acompanantes}
            onChange={(e) => setAcompanantes(e.target.value)}
            className="min-h-11 w-32 border-cream/40 bg-cream/10 text-base text-cream"
          />
        </div>
      )}

      <Button
        type="submit"
        className="min-h-11 w-full bg-cream text-primary hover:bg-cream/90 sm:w-auto sm:px-10"
      >
        <MessageCircle aria-hidden="true" />
        Confirmar por WhatsApp
      </Button>
      <p className="text-sm text-cream/80">
        Su confirmación se envía por WhatsApp; no se requiere correo electrónico.
      </p>
    </form>
  );
}
