import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Estado = "idle" | "enviado";

export function RsvpForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [asistencia, setAsistencia] = useState("si");
  const [estado, setEstado] = useState<Estado>("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
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
            ? "Su confirmación ha sido registrada. Le esperamos el viernes 11 de septiembre a las 6:30 p.m."
            : "Agradecemos su respuesta. Lamentamos que no pueda acompañarnos en esta ocasión."}
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 min-h-11 border-cream/60 bg-transparent text-cream hover:bg-cream/15 hover:text-cream"
          onClick={() => setEstado("idle")}
        >
          Enviar otra respuesta
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 text-left" noValidate={false}>
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
        <Label htmlFor="rsvp-email" className="text-sm text-cream">
          Correo electrónico
        </Label>
        <Input
          id="rsvp-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-h-11 border-cream/40 bg-cream/10 text-base text-cream placeholder:text-cream/60"
          placeholder="correo@ejemplo.com"
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm text-cream">¿Podrá acompañarnos?</legend>
        <RadioGroup
          value={asistencia}
          onValueChange={setAsistencia}
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

      <Button
        type="submit"
        className="min-h-11 w-full bg-cream text-primary hover:bg-cream/90 sm:w-auto sm:px-10"
      >
        Confirmar asistencia
      </Button>
    </form>
  );
}
