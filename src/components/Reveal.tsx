import type { ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Variant = "up" | "zoom" | "left" | "right";

const hidden: Record<Variant, string> = {
  up: "opacity-0 translate-y-12",
  zoom: "opacity-0 scale-[1.08]",
  left: "opacity-0 -translate-x-12",
  right: "opacity-0 translate-x-12",
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

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-[1100ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        shown ? "opacity-100 translate-x-0 translate-y-0 scale-100" : hidden[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}
