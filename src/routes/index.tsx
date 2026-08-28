import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { RsvpForm } from "@/components/RsvpForm";
import { ShareBar } from "@/components/ShareBar";
import { useParallax } from "@/hooks/use-reveal";
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
  const heroRef = useParallax<HTMLImageElement>(40, { scale: 0.04 });
  const collageRef = useParallax<HTMLImageElement>(50);
  const oficialRef = useParallax<HTMLImageElement>(30);
  const cierreRef = useParallax<HTMLImageElement>(60);

  return (
    <main id="contenido" className="overflow-x-hidden bg-background text-foreground">
      <a
        href="#rsvp"
        className="sr-only rounded-sm bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Ir a confirmar asistencia
      </a>

      {/* Portada a pantalla completa */}
      <section
        aria-label="Portada de la invitación"
        className="surface-sage relative w-full overflow-hidden"
      >
        <img
          ref={heroRef}
          src={portada.url}
          alt="Segundo Informe de Gobierno, Presidente Municipal Juan Carlos Martínez Calderón, Uriangato Gto."
          className="block h-auto w-full will-change-transform"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,oklch(0.47_0.062_163/0.85),transparent)]" />
        <p className="absolute inset-x-0 bottom-8 z-10 text-center font-sans text-xs uppercase tracking-[0.35em] text-cream">
          Uriangato, Guanajuato · 2026
        </p>
      </section>

      {/* Convocatoria */}
      <section className="mx-auto max-w-5xl px-6 py-24 md:py-36">
        <Reveal className="text-center">
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-primary">
            El H. Ayuntamiento de Uriangato, Guanajuato
          </p>
          <h1 className="mt-6 text-balance font-display text-4xl leading-[1.12] text-primary md:text-6xl">
            Tiene el honor de invitarle al{" "}
            <span className="italic">Segundo Informe de Gobierno</span>
          </h1>
          <div className="mx-auto mt-8 h-px w-28 bg-gradient-to-r from-transparent via-accent to-transparent" />
          <p className="mx-auto mt-8 max-w-xl text-pretty text-lg leading-relaxed text-foreground/80">
            Un encuentro con la ciudadanía para rendir cuentas del trabajo realizado y
            trazar juntos el rumbo de Uriangato.
          </p>
        </Reveal>
      </section>

      {/* Collage de labor */}
      <section aria-label="Galería de labor" className="relative overflow-hidden">
        <img
          ref={collageRef}
          src={contenido1.url}
          alt="Momentos del trabajo del Presidente Municipal con la ciudadanía de Uriangato"
          className="h-auto w-full will-change-transform"
        />
      </section>

      {/* Nombre y cargo */}
      <section className="px-6 py-20 md:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance font-display text-3xl uppercase tracking-[0.1em] text-primary md:text-5xl">
            Juan Carlos Martínez Calderón
          </h2>
          <p className="mt-4 font-sans text-sm uppercase tracking-[0.35em] text-primary/80">
            Presidente Municipal
          </p>
        </Reveal>
      </section>

      {/* Detalles */}
      <section aria-label="Detalles del evento" className="surface-sage py-24 md:py-32">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-12 gap-y-12 px-6 sm:grid-cols-2">
          {detalles.map((d, i) => (
            <Reveal key={d.label} variant={i % 2 === 0 ? "left" : "right"} delay={i * 100}>
              <div className="border-l border-gold pl-6">
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-cream/90">
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
      <section aria-label="Invitación oficial" className="px-4 py-20 md:px-6 md:py-28">
        <Reveal className="mx-auto max-w-6xl">
          <img
            ref={oficialRef}
            src={contenido2.url}
            alt="Invitación oficial al Segundo Informe de Gobierno 2026 de Uriangato, Guanajuato"
            className="w-full rounded-sm shadow-[var(--shadow-lift)] will-change-transform"
          />
        </Reveal>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="surface-sage scroll-mt-8 py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal>
            <h2 className="text-center font-display text-3xl text-cream md:text-4xl">
              Confirme su asistencia
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center text-base leading-relaxed text-cream/90">
              Su respuesta nos ayuda a preparar un mejor encuentro.
            </p>
            <div className="mt-10">
              <RsvpForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Compartir */}
      <section aria-label="Compartir la invitación" className="px-6 py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-primary md:text-4xl">
            Comparta esta invitación
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-foreground/80">
            Envíela por WhatsApp o copie el enlace con el mensaje que usted defina.
          </p>
          <div className="mt-8">
            <ShareBar />
          </div>
        </Reveal>
      </section>

      {/* Cierre */}
      <section aria-label="Cierre" className="relative overflow-hidden">
        <img
          ref={cierreRef}
          src={portadaFinal.url}
          alt=""
          aria-hidden="true"
          className="h-[70vh] w-full scale-110 object-cover will-change-transform"
        />
        <div className="absolute inset-0 flex items-end justify-center bg-[linear-gradient(to_top,oklch(0.47_0.062_163/0.92),transparent_65%)] pb-16">
          <Reveal className="px-6 text-center">
            <p className="font-display text-3xl italic text-cream md:text-4xl">Le esperamos</p>
            <p className="mt-4 font-sans text-xs uppercase tracking-[0.3em] text-cream/90">
              Uriangato · Gloria de Guanajuato
            </p>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-foreground/70">
          H. Ayuntamiento de Uriangato 2024 – 2027
        </p>
      </footer>
    </main>
  );
}
