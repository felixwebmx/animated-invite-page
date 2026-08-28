import { useState } from "react";
import { Check, Link2, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { invitacion, waLink } from "@/config/invitacion";

export function ShareBar() {
  const [titulo, setTitulo] = useState(invitacion.tituloEnlace);
  const [texto, setTexto] = useState(invitacion.mensajeWhatsapp);
  const [copiado, setCopiado] = useState(false);
  const [aviso, setAviso] = useState("");

  const url = typeof window !== "undefined" ? window.location.href : "";
  const mensaje = `${titulo ? `*${titulo}*\n\n` : ""}${texto}\n\n${url}`;
  const link = waLink(mensaje);

  const compartir = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: titulo, text: texto, url });
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
        <Label htmlFor="share-titulo" className="text-sm text-muted-foreground">
          Título del enlace
        </Label>
        <Input
          id="share-titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="min-h-11 text-base"
        />
      </div>

      <div className="space-y-2 text-left">
        <Label htmlFor="share-texto" className="text-sm text-muted-foreground">
          Mensaje de WhatsApp
        </Label>
        <Textarea
          id="share-texto"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={4}
          className="text-base"
        />
      </div>

      <div className="rounded-md border border-border bg-muted/40 p-4 text-left">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Vista previa
        </p>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">
          {mensaje}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button type="button" onClick={compartir} className="min-h-11 sm:px-8">
          <Share2 aria-hidden="true" />
          Compartir invitación
        </Button>

        <Button asChild variant="secondary" className="min-h-11 sm:px-8">
          <a href={link} target="_blank" rel="noopener noreferrer">
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
