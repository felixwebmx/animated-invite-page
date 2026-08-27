import { useEffect, useRef, useState } from "react";

/** true si el usuario pidió menos movimiento o el equipo es de bajo rendimiento. */
export function useReducedMotionOrLowPower() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowPower =
      (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) ||
      (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4);

    const update = () => setReduced(mq.matches || lowPower);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

/** Revela un elemento la primera vez que entra al viewport. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, shown };
}

/**
 * Parallax fluido basado en la posición del elemento en pantalla.
 * `speed` en px de desplazamiento máximo. Se desactiva con reduce motion / equipos lentos.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed = 60,
  { scale = 0 }: { scale?: number } = {},
) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotionOrLowPower();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.style.transform = "";
      return;
    }

    let raf = 0;
    let current = 0;
    let target = 0;
    let visible = true;

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver((entries) => {
            visible = entries[0]?.isIntersecting ?? true;
          }, {
            rootMargin: "20% 0px",
          })
        : null;
    io?.observe(el);

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 (abajo de la pantalla) .. 1 (arriba)
      const p = (vh / 2 - (rect.top + rect.height / 2)) / (vh / 2 + rect.height / 2);
      target = Math.max(-1, Math.min(1, p));
    };

    const tick = () => {
      if (visible) {
        current += (target - current) * 0.12;
        const s = scale ? 1 + scale * (1 - Math.abs(current)) : 1;
        el.style.transform = `translate3d(0, ${(current * speed).toFixed(2)}px, 0) scale(${s.toFixed(4)})`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => measure();
    measure();
    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      el.style.transform = "";
    };
  }, [speed, scale, reduced]);

  return ref;
}

/** Desplazamiento vertical de la ventana (para efectos ligeros). */
export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}
