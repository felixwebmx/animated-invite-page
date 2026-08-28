import type { ReactNode } from "react";
import { useReveal, useReducedMotionOrLowPower } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Variant = "up" | "zoom" | "left" | "right";

const hidden: Record<Variant, string> = {
  up: "opacity-0 translate-y-10",
  zoom: "opacity-0 scale-[1.05]",
  left: "opacity-0 -translate-x-10",
  right: "opacity-0 translate-x-10",
};

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const reduced = useReducedMotionOrLowPower();

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-[1000ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        shown ? "opacity-100 translate-x-0 translate-y-0 scale-100" : hidden[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}
