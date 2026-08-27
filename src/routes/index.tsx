import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { useScrollY } from "@/hooks/use-reveal";
import portada from "@/assets/portada.png.asset.json";
import contenido1 from "@/assets/contenido1.png.asset.json";
import contenido2 from "@/assets/contenido2.png.asset.json";
import portadaFinal from "@/assets/portadafinal.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "2do Informe de Gobierno 2026 · Uriangato, Gto." },
      {
        name: "description",
        content:
          "Invitación al Segundo Informe de Gobierno del Presidente Municipal Juan Carlos Martínez Calderón. Viernes 11 de septiembre, 6:30 p.m., Atrio de la Parroquia de San Miguel Arcángel.",
      },
      { property: "og:title", content: "2do Informe de Gobierno 2026 · Uriangato, Gto." },
      {
        property: "og:description",
        content:
          "Le invitamos al Segundo Informe de Gobierno de Juan Carlos Martínez Calderón, viernes 11 de septiembre a las 6:30 p.m.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitacion,
});

const detalles = [
  { label: "Fecha", value: "Viernes 11 de septiembre" },
  { label: "Hora", value: "6:30 p.m." },
  { label: "Sede", value: "Atrio de la Parroquia de San Miguel Arcángel" },
  { label: "Convoca", value: "H. Ayuntamiento de Uriangato 2024 – 2027" },
];

function Invitacion() {
  const y = useScrollY();

  return (
    <main className="overflow-x-hidden bg-background text-foreground">
      {/* Portada */}
<section className="surface-sage relative flex min-h-screen items-center justify-center overflow-hidden">
  <Reveal variant="zoom" className="absolute inset-0">
    <img
      src={portada.url}
      alt="Segundo Informe de Gobierno, Presidente Municipal Juan Carlos Martínez Calderón, Uriangato Gto."
      className="h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/25" />
  </Reveal>

  <Reveal delay={500} className="absolute inset-x-0 bottom-24 z-10 px-6 text-center">
    <p className="font-sans text-[11px] uppercase tracking-[0.42em] text-cream/90">
      Uriangato, Guanajuato · 2026
    </p>
  </Reveal>

  <div className="animate-float absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
    <span className="block h-14 w-px bg-gold/70" />
  </div>
</section>


      {/* Convocatoria */}
      <section className="mx-auto max-w-5xl px-6 py-28 md:py-40">
        <Reveal className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.34em] text-secondary">
            El H. Ayuntamiento de Uriangato, Guanajuato
          </p>
          <h1 className="mt-6 text-balance font-display text-4xl leading-[1.1] text-primary md:text-6xl">
            Tiene el honor de invitarle al{" "}
            <span className="italic">Segundo Informe de Gobierno</span>
          </h1>
          <div className="mx-auto mt-8 h-px w-28 bg-gradient-to-r from-transparent via-accent to-transparent" />
          <p className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            Un encuentro con la ciudadanía para rendir cuentas del trabajo realizado y
            trazar juntos el rumbo de Uriangato.
          </p>
        </Reveal>
      </section>

      {/* Collage de labor */}
      <section className="relative overflow-hidden py-8 md:py-16">
        <Reveal variant="zoom">
          <img
            src={contenido1.url}
            alt="Momentos del trabajo del Presidente Municipal con la ciudadanía de Uriangato"
            className="mx-auto w-full"
            style={{ transform: `translateY(${Math.min(0, (y - 900) * -0.03)}px)` }}
          />
        </Reveal>
      </section>

      {/* Nombre y cargo */}
      <section className="px-6 py-24 md:py-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance font-display text-3xl uppercase tracking-[0.12em] text-primary md:text-5xl">
            Juan Carlos Martínez Calderón
          </h2>
          <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.4em] text-secondary">
            Presidente Municipal
          </p>
        </Reveal>
      </section>

      {/* Detalles */}
      <section className="surface-sage py-24 md:py-32">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-12 gap-y-12 px-6 sm:grid-cols-2">
          {detalles.map((d, i) => (
            <Reveal key={d.label} variant={i % 2 === 0 ? "left" : "right"} delay={i * 120}>
              <div className="border-l border-gold/50 pl-6">
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-cream/65">
                  {d.label}
                </p>
                <p className="mt-3 font-display text-2xl leading-snug text-cream md:text-3xl">
                  {d.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Invitación oficial */}
      <section className="px-6 py-28 md:py-40">
        <Reveal variant="zoom" className="mx-auto max-w-5xl">
          <img
            src={contenido2.url}
            alt="Invitación oficial al Segundo Informe de Gobierno 2026 de Uriangato, Guanajuato"
            className="w-full rounded-sm shadow-[var(--shadow-lift)]"
          />
        </Reveal>
      </section>

      {/* Cierre */}
      <section className="relative overflow-hidden">
        <img
          src={portadaFinal.url}
          alt=""
          aria-hidden="true"
          className="h-[70vh] w-full object-cover"
        />
        <div className="absolute inset-0 flex items-end justify-center bg-[linear-gradient(to_top,oklch(0.47_0.062_163/0.9),transparent_65%)] pb-16">
          <Reveal className="px-6 text-center">
            <p className="font-display text-3xl italic text-cream md:text-4xl">
              Le esperamos
            </p>
            <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.34em] text-cream/70">
              Uriangato · Gloria de Guanajuato
            </p>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          H. Ayuntamiento de Uriangato 2024 – 2027
        </p>
      </footer>
    </main>
  );
}
