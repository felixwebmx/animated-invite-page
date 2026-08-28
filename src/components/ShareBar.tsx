import { useState } from "react";
import { Check, Link2, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TEXTO_DEFAULT =
  "Le comparto la invitación al Segundo Informe de Gobierno de Juan Carlos Martínez Calderón, Presidente Municipal de Uriangato. Viernes 11 de septiembre, 6:30 p.m., Atrio de la Parroquia de San Miguel Arcángel.";

export function ShareBar() {
  const [texto, setTexto] = useState(TEXTO_DEFAULT);
  const [copiado, setCopiado] = useState(false);
  const [aviso, setAviso] = useState("");

  const url = typeof window !== "undefined" ? window.location.href : "";
  const mensaje = `${texto}\n\n${url}`;
  const waLink = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;

  const compartir = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "2do Informe de Gobierno · Uriangato", text: texto, url });
        setAviso("Invitación compartida.");
        return;
      } catch {
        /* cancelado por la persona usuaria */
      }
    }
    await copiar();
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(mensaje);
      setCopiado(true);
      setAviso("Mensaje y enlace copiados al portapapeles.");
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      setAviso("No fue posible copiar; seleccione el texto manualmente.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2 text-left">
        <Label htmlFor="share-texto" className="text-sm text-muted-foreground">
          Personalice el mensaje que enviará
        </Label>
        <Textarea
          id="share-texto"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={4}
          className="text-base"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button type="button" onClick={compartir} className="min-h-11 sm:px-8">
          <Share2 aria-hidden="true" />
          Compartir invitación
        </Button>

        <Button asChild variant="secondary" className="min-h-11 sm:px-8">
          <a href={waLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" />
            Enviar por WhatsApp
          </a>
        </Button>

        <Button type="button" variant="outline" onClick={copiar} className="min-h-11 sm:px-8">
          {copiado ? <Check aria-hidden="true" /> : <Link2 aria-hidden="true" />}
          {copiado ? "Copiado" : "Copiar enlace"}
        </Button>
      </div>

      <p role="status" aria-live="polite" className="min-h-5 text-sm text-muted-foreground">
        {aviso}
      </p>
    </div>
  );
}
